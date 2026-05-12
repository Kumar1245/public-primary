import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Buttontheme from "../ui/Buttontheme";

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "14px",
      color: "#32325d",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#fa755a" },
  },
};

const StripePayForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    const res = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await res.json();
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      onSuccess(result.paymentIntent);
    }
  };

  return (
    <form onSubmit={handlePay}>
      <div className="mb-3">
        <label className="form-label">Card Details</label>
        <div className="form-control p-2">
          <CardElement options={CARD_STYLE} />
        </div>
      </div>

      <Buttontheme type="submit" className="w-100">
        Pay Fee
      </Buttontheme>
    </form>
  );
};

export default StripePayForm;
