"use client";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Modalclose } from "../../Assets/svg/Allsvgicons";
import URLS from "../../services/URLS";
import { errorToast, successToast } from "../../Utilities/toastsMessages";
import Buttontheme from "../ui/Buttontheme";
import Textfield from "../ui/Formfields/Textfield";

export const donationStripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#212529",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#6c757d",
      },
    },
    invalid: {
      color: "#dc3545",
      iconColor: "#dc3545",
    },
  },
  hidePostalCode: true,
};

const isDonationPaymentSuccessful = (data) => {
  if (!data) return false;

  const normalizedStatus = (data.status || "").toString().toLowerCase();
  const transactionStatus = (
    data.data?.transaction?.status ||
    data.transaction?.status ||
    ""
  )
    .toString()
    .toLowerCase();

  return (
    normalizedStatus === "success" ||
    normalizedStatus === "succeeded" ||
    transactionStatus === "success" ||
    transactionStatus === "succeeded"
  );
};

export const DonationCheckoutModal = ({
  show,
  amount,
  donor,
  onClose,
  onSuccess,
  onDonorChange,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    card: "",
    general: "",
  });

  const formattedAmount = useMemo(
    () => Number(amount || 0).toFixed(2),
    [amount],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setErrors({ name: "", email: "", card: "", general: "" });

    let hasError = false;
    const newErrors = { name: "", email: "", card: "", general: "" };

    if (!donor.name.trim()) {
      newErrors.name = "Please enter your full name.";
      hasError = true;
    }

    if (!donor.email.trim()) {
      newErrors.email = "Please enter your email address.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(donor.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    const authToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : "";
    const headers = {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    };

    try {
      const { token, error: tokenError } = await stripe.createToken(
        elements.getElement(CardElement),
        {
          name: donor.name.trim(),
          email: donor.email.trim(),
        },
      );

      console.log(token, "token=== data have comes");
      if (tokenError) {
        setErrors({ ...errors, card: tokenError.message });
        throw new Error(tokenError.message);
      }

      const cardId = token.id;

      console.log("Full token object:", token);
      console.log("Card ID being sent:", cardId);

      const response = await fetch(`${URLS?.API_URL}api/v1/user/donation/pay`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          amount: Number(amount),
          currency: "usd",
          name: donor.name.trim(),
          email: donor.email.trim(),
          token: cardId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to process donation payment.",
        );
      }

      console.log(data, "status comes -- success");

      if (isDonationPaymentSuccessful(data)) {
        successToast("Donation Sent successful! Thank you for your support.");
        onClose();

        setTimeout(() => {
          onSuccess();
        }, 100);

        return;
      }

      throw new Error(data.message || "Payment did not complete.");
    } catch (submissionError) {
      setErrors({
        ...errors,
        general: submissionError.message || "Payment failed.",
      });

      errorToast(
        submissionError.message || "Payment failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      show={show}
      onHide={onClose}
      contentClassName="rounded-5 overflow-hidden"
    >
      <Modal.Body className="p-0">
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
          <div>
            <h5 className="fw-semibold mb-1">Complete Your Donation</h5>
            <p className="text-muted mb-0">
              Enter your details and pay securely.
            </p>
          </div>
          <Button className="flexedclose" onClick={onClose}>
            <Modalclose />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <Textfield
              label="Full Name"
              value={donor.name}
              onChange={(event) => {
                onDonorChange("name", event.target.value);
                setErrors({ ...errors, name: "", general: "" });
              }}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-danger mt-1 mb-0" style={{ fontSize: "13px" }}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="mb-3">
            <Textfield
              label="Email"
              type="email"
              value={donor.email}
              onChange={(event) => {
                onDonorChange("email", event.target.value);
                setErrors({ ...errors, email: "", general: "" });
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-danger mt-1 mb-0" style={{ fontSize: "13px" }}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="mb-1">Card Details</label>
            <div
              className="card-element-container"
              style={{
                border: errors.card ? "1px solid #dc3545" : "1px solid #ced4da",
                borderRadius: "4px",
                padding: "12px 14px",
                backgroundColor: "#fff",
                minHeight: "48px",
              }}
            >
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={(e) => {
                  if (e.error) {
                    setErrors({ ...errors, card: e.error.message });
                  } else {
                    setErrors({ ...errors, card: "" });
                  }
                }}
              />
            </div>
            {errors.card && (
              <p className="text-danger mt-1 mb-0" style={{ fontSize: "13px" }}>
                {errors.card}
              </p>
            )}
            <p className="text-muted mb-0 mt-2" style={{ fontSize: "13px" }}>
              Enter card number, expiry date, and CVC.
            </p>
          </div>

          {errors.general && (
            <p className="text-danger mt-3 mb-0" style={{ fontSize: "14px" }}>
              {errors.general}
            </p>
          )}

          <div className="d-flex gap-2 mt-4">
            <Buttontheme
              type="submit"
              className="w-100"
              disabled={!stripe || loading}
            >
              {loading ? "Processing..." : `Pay $${formattedAmount}`}
            </Buttontheme>

            <Buttontheme
              type="button"
              className="cancelWhiteBtn w-100"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Buttontheme>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const DonationCard = () => {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [donor, setDonor] = useState({
    name: "",
    email: "",
  });

  const openDonationModal = () => {
    const value = Number(amount);

    if (!amount || Number.isNaN(value) || value < 5 || value > 20) {
      setAmountError("Please enter a valid amount between $5 and $20.");
      return;
    }

    setAmountError("");
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setIsSuccess(true);
    setAmount("");
    setDonor({
      name: "",
      email: "",
    });
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
        <Elements stripe={donationStripePromise}>
          <DonationCheckoutModal
            show={isModalOpen}
            amount={amount}
            donor={donor}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
            onDonorChange={(field, value) =>
              setDonor((previous) => ({ ...previous, [field]: value }))
            }
          />
        </Elements>
      ) : null}

      {/* <div className="donationCardComp d-flex align-items-center gap-3">
        <div className="donationCardImg">
          <Image
            src={Donationimg}
            width={400}
            height={400}
            alt="donation"
            className="img-fluid"
          />
        </div>

        <div className="">
          <div className="donationCard_head my-2">
            <h4 className="fw-bold text-white m-0">Make a Contribution</h4>
            <p className="my-2 text-white">
              Support candidates and causes you believe in with full
              transparency.
            </p>
          </div>

          <input
            type="number"
            min="5"
            max="20"
            step="1"
            placeholder="Enter amount between $5 - $20"
            value={amount}
            onChange={(event) => {
              const value = event.target.value;
              setAmount(value);
              setAmountError("");
            }}
            onKeyDown={(e) => {
              if (
                e.key === "." ||
                e.key === "e" ||
                e.key === "E" ||
                e.key === "-"
              ) {
                e.preventDefault();
              }
            }}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(253, 246, 246, 0.99)",
              color: "#000",
              marginBottom: "8px",
            }}
          />

          {amountError ? (
            <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px" }}>
              {amountError}
            </p>
          ) : null}

          {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
            <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px" }}>
              Stripe key missing. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in
              `.env`.
            </p>
          ) : null}

          {isSuccess ? (
            <p className="text-white mt-2 mb-0">
              Donation sent successfully. Thank you for your support.
            </p>
          ) : null}

          <Buttontheme
            className="w-100 mt-3 donationBtn"
            type="button"
            onClick={openDonationModal}
            disabled={!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          >
            Donate Now <Donationicon />
          </Buttontheme>
        </div>
      </div> */}
    </>
  );
};

export default DonationCard;
