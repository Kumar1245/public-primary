// import {
//   CardCvcElement,
//   CardExpiryElement,
//   CardNumberElement,
//   Elements,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useEffect, useMemo, useState } from "react";
// import { Button, Col, Modal, Row } from "react-bootstrap";
// import { Controller, useFormContext } from "react-hook-form";
// import { Arrowbackicon, Modalclose } from "../../../../Assets/svg/Allsvgicons";
// import Buttontheme from "../../../../Component/ui/Buttontheme";
// import URLS from "../../../../services/URLS";
// import { errorToast, successToast } from "../../../../Utilities/toastsMessages";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
// );

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#212529",
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#6c757d",
//       },
//     },
//     invalid: {
//       color: "#dc3545",
//       iconColor: "#dc3545",
//     },
//   },
// };

// const ApplicationFeeModal = ({
//   show,
//   amount,
//   userData,
//   onClose,
//   onSuccess,
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({
//     cardNumber: "",
//     expiry: "",
//     cvc: "",
//     general: "",
//   });

//   const [cardComplete, setCardComplete] = useState({
//     cardNumber: false,
//     expiry: false,
//     cvc: false,
//   });

//   const formattedAmount = useMemo(
//     () => Number(amount || 0).toFixed(2),
//     [amount],
//   );

//   const handleInputChange = (type, event) => {
//     if (event.error) {
//       setErrors((prev) => ({
//         ...prev,
//         [type]: event.error.message,
//       }));
//     } else {
//       setErrors((prev) => ({
//         ...prev,
//         [type]: "",
//       }));
//     }

//     if (type === "cardNumber") {
//       setCardComplete((prev) => ({
//         ...prev,
//         cardNumber: event.complete,
//       }));
//     } else if (type === "expiry") {
//       setCardComplete((prev) => ({
//         ...prev,
//         expiry: event.complete,
//       }));
//     } else if (type === "cvc") {
//       setCardComplete((prev) => ({
//         ...prev,
//         cvc: event.complete,
//       }));
//     }
//   };

//   const validateForm = () => {
//     let hasError = false;
//     const newErrors = { cardNumber: "", expiry: "", cvc: "", general: "" };

//     if (!cardComplete.cardNumber) {
//       newErrors.cardNumber = "Please enter a valid card number.";
//       hasError = true;
//     }

//     if (!cardComplete.expiry) {
//       newErrors.expiry = "Please enter a valid expiry date.";
//       hasError = true;
//     }

//     if (!cardComplete.cvc) {
//       newErrors.cvc = "Please enter a valid CVV.";
//       hasError = true;
//     }

//     if (hasError) {
//       setErrors(newErrors);
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     setErrors({ cardNumber: "", expiry: "", cvc: "", general: "" });
//     setLoading(true);

//     const authToken =
//       typeof window !== "undefined" ? localStorage.getItem("authToken") : "";
//     const headers = {
//       "Content-Type": "application/json",
//       ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
//     };

//     try {
//       const cardNumberElement = elements.getElement(CardNumberElement);
//       const { token, error: tokenError } = await stripe.createToken(
//         cardNumberElement,
//         {
//           name: userData.name?.trim(),
//           email: userData.email?.trim(),
//         },
//       );

//       if (tokenError) {
//         setErrors({ ...errors, general: tokenError.message });
//         throw new Error(tokenError.message);
//       }

//       console.log("Token created:", token);
//       const response = await fetch(
//         `${URLS?.API_URL}api/v1/user/applicationFee/pay`,
//         {
//           method: "POST",
//           headers,
//           body: JSON.stringify({
//             name: userData.name?.trim(),
//             email: userData.email?.trim(),
//             token: token.id,
//           }),
//         },
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message ||
//             data.error ||
//             "Unable to process application fee payment.",
//         );
//       }

//       console.log("Payment response:", data);

//       if (data.status === "success") {
//         successToast("Application fee paid successfully!");

//         if (elements) {
//           elements.getElement(CardNumberElement).clear();
//           elements.getElement(CardExpiryElement).clear();
//           elements.getElement(CardCvcElement).clear();
//         }

//         onClose();

//         const transactionId = data?.data?.transaction?._id;
//         const paidAmount =
//           data?.data?.applicationFee?.amount ||
//           data?.data?.transaction?.amount ||
//           amount;

//         onSuccess({
//           status: "paid",
//           amount: paidAmount,
//           transactionId: transactionId,
//           transaction: data?.data?.transaction,
//           applicationFee: data?.data?.applicationFee,
//           paymentCompleted: true,
//         });
//         return;
//       }

//       throw new Error(data.message || "Payment did not complete.");
//     } catch (submissionError) {
//       setErrors({
//         ...errors,
//         general: submissionError.message || "Payment failed.",
//       });
//       errorToast(
//         submissionError.message || "Payment failed. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       centered
//       show={show}
//       onHide={onClose}
//       contentClassName="rounded-5 overflow-hidden"
//     >
//       <Modal.Body className="p-0">
//         <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
//           <div>
//             <h5 className="fw-semibold mb-1">Pay Application Fee</h5>
//             <p className="text-muted mb-0">
//               Pay your application fee to complete registration.
//             </p>
//           </div>
//           <Button className="flexedclose" onClick={onClose}>
//             <Modalclose />
//           </Button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-4">
//           <div className="mb-4">
//             <div className="bg-primary bg-opacity-10 p-3 rounded text-center">
//               <p className="mb-1 text-muted">Amount to Pay</p>
//               <h3 className="fw-bold mb-0">${formattedAmount}</h3>
//             </div>
//           </div>

//           <Row>
//             <Col lg={12}>
//               <div className="mb-3">
//                 <label className="mb-1 fw-semibold">Card Number</label>
//                 <div
//                   className="card-element-container"
//                   style={{
//                     border: errors.cardNumber
//                       ? "1px solid #dc3545"
//                       : "1px solid #ced4da",
//                     borderRadius: "4px",
//                     padding: "12px 14px",
//                     backgroundColor: "#fff",
//                     minHeight: "48px",
//                   }}
//                 >
//                   <CardNumberElement
//                     options={CARD_ELEMENT_OPTIONS}
//                     onChange={(e) => handleInputChange("cardNumber", e)}
//                   />
//                 </div>
//                 {errors.cardNumber && (
//                   <p
//                     className="text-danger mt-1 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     {errors.cardNumber}
//                   </p>
//                 )}
//               </div>
//             </Col>
//             <Col lg={6}>
//               <div className="mb-3">
//                 <label className="mb-1 fw-semibold">Expiry Date</label>
//                 <div
//                   className="card-element-container"
//                   style={{
//                     border: errors.expiry
//                       ? "1px solid #dc3545"
//                       : "1px solid #ced4da",
//                     borderRadius: "4px",
//                     padding: "12px 14px",
//                     backgroundColor: "#fff",
//                     minHeight: "48px",
//                   }}
//                 >
//                   <CardExpiryElement
//                     options={CARD_ELEMENT_OPTIONS}
//                     onChange={(e) => handleInputChange("expiry", e)}
//                   />
//                 </div>
//                 {errors.expiry && (
//                   <p
//                     className="text-danger mt-1 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     {errors.expiry}
//                   </p>
//                 )}
//               </div>
//             </Col>

//             <Col lg={6}>
//               <div className="mb-3">
//                 <label className="mb-1 fw-semibold">CVV</label>
//                 <div
//                   className="card-element-container"
//                   style={{
//                     border: errors.cvc
//                       ? "1px solid #dc3545"
//                       : "1px solid #ced4da",
//                     borderRadius: "4px",
//                     padding: "12px 14px",
//                     backgroundColor: "#fff",
//                     minHeight: "48px",
//                   }}
//                 >
//                   <CardCvcElement
//                     options={CARD_ELEMENT_OPTIONS}
//                     onChange={(e) => handleInputChange("cvc", e)}
//                   />
//                 </div>
//                 {errors.cvc && (
//                   <p
//                     className="text-danger mt-1 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     {errors.cvc}
//                   </p>
//                 )}
//               </div>
//             </Col>
//           </Row>

//           {errors.general && (
//             <p className="text-danger mt-3 mb-0" style={{ fontSize: "14px" }}>
//               {errors.general}
//             </p>
//           )}

//           <div className="d-flex gap-2 mt-4">
//             <Buttontheme
//               type="submit"
//               className="w-100"
//               disabled={!stripe || loading}
//             >
//               {loading ? "Processing..." : `Pay $${formattedAmount}`}
//             </Buttontheme>

//             <Buttontheme
//               type="button"
//               className="cancelWhiteBtn w-100"
//               onClick={onClose}
//               disabled={loading}
//             >
//               Cancel
//             </Buttontheme>
//           </div>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// const Step4 = ({ onBack, onSubmit }) => {
//   const {
//     control,
//     formState: { errors },
//     getValues,
//     setValue,
//     watch,
//   } = useFormContext();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
//   const [paymentData, setPaymentData] = useState(null);
//   const [applicationFee, setApplicationFee] = useState(null);
//   const [loadingFee, setLoadingFee] = useState(true);


//   const isCandidateForOtherSeats = watch("isCandidateForOtherSeats");
//   const hasMetRequirements = watch("hasMetRequirements");

 
//   const isEligibleToPay =
//     isCandidateForOtherSeats === "no" && hasMetRequirements === "yes";

//   const formValues = getValues();
//   const userData = {
//     name: formValues.name || "",
//     email: formValues.email || "",
//   };

//   useEffect(() => {
//     const fetchApplicationFee = async () => {
//       try {
//         const response = await fetch(
//           `${URLS?.API_URL}/api/v1/user/donation/details`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           },
//         );

//         if (response.ok) {
//           const data = await response.json();
//           const feeAmount = data?.data?.applicationPrice || data?.price || 50;
//           setApplicationFee(feeAmount);
//         } else {
//           setApplicationFee(50);
//         }
//       } catch (error) {
//         setApplicationFee(50);
//       } finally {
//         setLoadingFee(false);
//       }
//     };

//     fetchApplicationFee();
//   }, []);

//   const handlePaymentSuccess = (data) => {
//     console.log("Payment success data:", data);
//     setIsPaymentCompleted(true);
//     setPaymentData({
//       status: data.status,
//       amount: data.amount,
//       transactionId: data.transactionId,
//       transaction: data.transaction,
//       applicationFee: data.applicationFee,
//       paymentCompleted: true,
//     });
//   };

//   const handlePayButtonClick = () => {
//     if (isCandidateForOtherSeats === "yes") {
//       errorToast(
//         "You cannot pay the application fee as you are currently a candidate for another seat.",
//       );
//       return;
//     }

//     if (hasMetRequirements === "no") {
//       errorToast(
//         "You cannot pay the application fee as you have not met all the requirements set for the by the state and county election commissions.",
//       );
//       return;
//     }

//     if (!isCandidateForOtherSeats || !hasMetRequirements) {
//       errorToast(
//         "Please answer both eligibility questions before proceeding with payment.",
//       );
//       return;
//     }

//     setIsModalOpen(true);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted, paymentData:", paymentData);
//     console.log("isPaymentCompleted:", isPaymentCompleted);

//     if (isPaymentCompleted && paymentData) {
//       const submitData = {
//         ...formValues,
//         applicationFeeStatus: "paid",
//         applicationFee: paymentData.amount,
//         paymentDetails: {
//           ...paymentData,
//           status: "paid",
//           paidAmount: paymentData.amount,
//           transactionId: paymentData.transactionId,
//         },

//         isCandidateForOtherSeats: isCandidateForOtherSeats,
//         hasMetRequirements: hasMetRequirements,
//       };

//       console.log("Submitting data to parent:", submitData);
//       onSubmit(submitData);
//     } else {
//       errorToast("Please complete the payment first");
//     }
//   };

//   if (loadingFee) {
//     return (
//       <div className="authformWrap">
//         <div className="text-center py-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-2">Loading fee details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
//         <Elements stripe={stripePromise}>
//           <ApplicationFeeModal
//             show={isModalOpen}
//             amount={applicationFee || 50}
//             userData={userData}
//             onClose={() => setIsModalOpen(false)}
//             onSuccess={handlePaymentSuccess}
//           />
//         </Elements>
//       ) : null}

//       <div className="authformWrap">
//         <form onSubmit={handleFormSubmit}>
//           <div className="authform mt-4">
//             <div className="mb-4 p-3 bg-light rounded">
//               {/* <h6 className="fw-semibold mb-3">Eligibility Verification</h6> */}

//               <div className="mb-3">
//                 <label className="fw-semibold mb-2 d-block">
//                   1. Are you currently a candidate for any other seats?
//                 </label>
//                 <div className="d-flex gap-3">
//                   <label className="me-3">
//                     <Controller
//                       name="isCandidateForOtherSeats"
//                       control={control}
//                       rules={{ required: "Please select an option" }}
//                       render={({ field }) => (
//                         <input
//                           type="radio"
//                           {...field}
//                           value="yes"
//                           checked={field.value === "yes"}
//                           onChange={(e) => field.onChange(e.target.value)}
//                           className="me-1"
//                         />
//                       )}
//                     />
//                     Yes
//                   </label>
//                   <label>
//                     <Controller
//                       name="isCandidateForOtherSeats"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           type="radio"
//                           {...field}
//                           value="no"
//                           checked={field.value === "no"}
//                           onChange={(e) => field.onChange(e.target.value)}
//                           className="me-1"
//                         />
//                       )}
//                     />
//                     No
//                   </label>
//                 </div>
//                 {errors.isCandidateForOtherSeats && (
//                   <p
//                     className="text-danger mt-1 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     {errors.isCandidateForOtherSeats.message}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-2">
//                 <label className="fw-semibold mb-2 d-block">
//                   2. Have you met all the requirements set for the by the state
//                   and county election commissions for this particular elected
//                   seat?
//                 </label>
//                 <div className="d-flex gap-3">
//                   <label className="me-3">
//                     <Controller
//                       name="hasMetRequirements"
//                       control={control}
//                       rules={{ required: "Please select an option" }}
//                       render={({ field }) => (
//                         <input
//                           type="radio"
//                           {...field}
//                           value="yes"
//                           checked={field.value === "yes"}
//                           onChange={(e) => field.onChange(e.target.value)}
//                           className="me-1"
//                         />
//                       )}
//                     />
//                     Yes
//                   </label>
//                   <label>
//                     <Controller
//                       name="hasMetRequirements"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           type="radio"
//                           {...field}
//                           value="no"
//                           checked={field.value === "no"}
//                           onChange={(e) => field.onChange(e.target.value)}
//                           className="me-1"
//                         />
//                       )}
//                     />
//                     No
//                   </label>
//                 </div>
//                 {errors.hasMetRequirements && (
//                   <p
//                     className="text-danger mt-1 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     {errors.hasMetRequirements.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Application Fee Section */}
//             <div className="mb-4">
//               <div className="applicationFee">
//                 <p className="mb-2">
//                   Application Fee:{" "}
//                   <span className="theme_text fw-bold">
//                     ${(applicationFee || 50).toFixed(2)}
//                   </span>
//                 </p>
//                 <p className="mb-2">
//                   To complete your registration, you must pay the application
//                   fee.
//                 </p>

//                 {!isPaymentCompleted ? (
//                   <Buttontheme
//                     type="button"
//                     className="w-100 mt-2"
//                     onClick={handlePayButtonClick}
//                     disabled={
//                       !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
//                       !isCandidateForOtherSeats ||
//                       !hasMetRequirements ||
//                       isCandidateForOtherSeats === "yes" ||
//                       hasMetRequirements === "no"
//                     }
//                   >
//                     Pay Application Fee
//                   </Buttontheme>
//                 ) : (
//                   <div className="alert alert-success mt-2">
//                     ✓ Application fee paid successfully! ($
//                     {paymentData?.amount?.toFixed(2)})
//                   </div>
//                 )}

//                 {isCandidateForOtherSeats === "yes" && (
//                   <p
//                     className="text-danger mt-2 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     You are not eligible to pay the application fee as you are
//                     currently a candidate for another seat.
//                   </p>
//                 )}

//                 {hasMetRequirements === "no" && (
//                   <p
//                     className="text-danger mt-2 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     You are not eligible to pay the application fee as you have
//                     not met all the requirements.
//                   </p>
//                 )}

//                 {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
//                   <p
//                     className="text-danger mt-2 mb-0"
//                     style={{ fontSize: "13px" }}
//                   >
//                     Stripe key missing. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
//                     in `.env`.
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="mb-3">
//               <div className="step4checkbox">
//                 <Controller
//                   name="disclose"
//                   control={control}
//                   render={({ field }) => (
//                     <label>
//                       <input
//                         type="checkbox"
//                         {...field}
//                         checked={field.value || false}
//                       />
//                       I disclose any past party affiliation or lobbyist
//                       association.
//                     </label>
//                   )}
//                 />
//               </div>
//             </div>

//             <div className="mb-3">
//               <div className="step4checkbox">
//                 <Controller
//                   name="agree"
//                   control={control}
//                   rules={{ required: "You must agree before submitting" }}
//                   render={({ field }) => (
//                     <label>
//                       <input
//                         type="checkbox"
//                         {...field}
//                         checked={field.value || false}
//                       />{" "}
//                       I agree to platform rules, election laws, and code of
//                       conduct.
//                     </label>
//                   )}
//                 />
//                 {errors.agree && (
//                   <p className="text-danger m-0">{errors.agree.message}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="d-flex align-items-center gap-3 mt-3">
//             <Button type="button" className="arroowBack" onClick={onBack}>
//               <Arrowbackicon />
//             </Button>

//             <Buttontheme
//               type="submit"
//               className="w-100"
//               disabled={!isPaymentCompleted}
//             >
//               Submit
//             </Buttontheme>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Step4;

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import { Arrowbackicon, Modalclose } from "../../../../Assets/svg/Allsvgicons";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import URLS from "../../../../services/URLS";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";

const stripePromise = loadStripe(
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
};

const ApplicationFeeModal = ({
  show,
  amount,
  userData,
  onClose,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    general: "",
  });

  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    expiry: false,
    cvc: false,
  });

  const formattedAmount = useMemo(
    () => Number(amount || 0).toFixed(2),
    [amount],
  );

  const handleInputChange = (type, event) => {
    if (event.error) {
      setErrors((prev) => ({
        ...prev,
        [type]: event.error.message,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [type]: "",
      }));
    }

    if (type === "cardNumber") {
      setCardComplete((prev) => ({
        ...prev,
        cardNumber: event.complete,
      }));
    } else if (type === "expiry") {
      setCardComplete((prev) => ({
        ...prev,
        expiry: event.complete,
      }));
    } else if (type === "cvc") {
      setCardComplete((prev) => ({
        ...prev,
        cvc: event.complete,
      }));
    }
  };

  const validateForm = () => {
    let hasError = false;
    const newErrors = { cardNumber: "", expiry: "", cvc: "", general: "" };

    if (!cardComplete.cardNumber) {
      newErrors.cardNumber = "Please enter a valid card number.";
      hasError = true;
    }

    if (!cardComplete.expiry) {
      newErrors.expiry = "Please enter a valid expiry date.";
      hasError = true;
    }

    if (!cardComplete.cvc) {
      newErrors.cvc = "Please enter a valid CVV.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setErrors({ cardNumber: "", expiry: "", cvc: "", general: "" });
    setLoading(true);

    const authToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : "";
    const headers = {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    };

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);
      const { token, error: tokenError } = await stripe.createToken(
        cardNumberElement,
        {
          name: userData.name?.trim(),
          email: userData.email?.trim(),
        },
      );

      if (tokenError) {
        setErrors({ ...errors, general: tokenError.message });
        throw new Error(tokenError.message);
      }

      console.log("Token created:", token);
      const response = await fetch(
        `${URLS?.API_URL}api/v1/user/applicationFee/pay`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            name: userData.name?.trim(),
            email: userData.email?.trim(),
            token: token.id,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to process application fee payment.",
        );
      }

      console.log("Payment response:", data);

      if (data.status === "success") {
        successToast("Application fee paid successfully!");

        if (elements) {
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
        }

        onClose();

        const transactionId = data?.data?.transaction?._id;
        const paidAmount =
          data?.data?.applicationFee?.amount ||
          data?.data?.transaction?.amount ||
          amount;

        onSuccess({
          status: "paid",
          amount: paidAmount,
          transactionId: transactionId,
          transaction: data?.data?.transaction,
          applicationFee: data?.data?.applicationFee,
          paymentCompleted: true,
        });
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
            <h5 className="fw-semibold mb-1">Pay Application Fee</h5>
            <p className="text-muted mb-0">
              Pay your application fee to complete registration.
            </p>
          </div>
          <Button className="flexedclose" onClick={onClose}>
            <Modalclose />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <div className="bg-primary bg-opacity-10 p-3 rounded text-center">
              <p className="mb-1 text-muted">Amount to Pay</p>
              <h3 className="fw-bold mb-0">${formattedAmount}</h3>
            </div>
          </div>

          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <label className="mb-1 fw-semibold">Card Number</label>
                <div
                  className="card-element-container"
                  style={{
                    border: errors.cardNumber
                      ? "1px solid #dc3545"
                      : "1px solid #ced4da",
                    borderRadius: "4px",
                    padding: "12px 14px",
                    backgroundColor: "#fff",
                    minHeight: "48px",
                  }}
                >
                  <CardNumberElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => handleInputChange("cardNumber", e)}
                  />
                </div>
                {errors.cardNumber && (
                  <p
                    className="text-danger mt-1 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    {errors.cardNumber}
                  </p>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <label className="mb-1 fw-semibold">Expiry Date</label>
                <div
                  className="card-element-container"
                  style={{
                    border: errors.expiry
                      ? "1px solid #dc3545"
                      : "1px solid #ced4da",
                    borderRadius: "4px",
                    padding: "12px 14px",
                    backgroundColor: "#fff",
                    minHeight: "48px",
                  }}
                >
                  <CardExpiryElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => handleInputChange("expiry", e)}
                  />
                </div>
                {errors.expiry && (
                  <p
                    className="text-danger mt-1 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    {errors.expiry}
                  </p>
                )}
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <label className="mb-1 fw-semibold">CVV</label>
                <div
                  className="card-element-container"
                  style={{
                    border: errors.cvc
                      ? "1px solid #dc3545"
                      : "1px solid #ced4da",
                    borderRadius: "4px",
                    padding: "12px 14px",
                    backgroundColor: "#fff",
                    minHeight: "48px",
                  }}
                >
                  <CardCvcElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => handleInputChange("cvc", e)}
                  />
                </div>
                {errors.cvc && (
                  <p
                    className="text-danger mt-1 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    {errors.cvc}
                  </p>
                )}
              </div>
            </Col>
          </Row>

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

const Step4 = ({ onBack, onSubmit }) => {
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useFormContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [applicationFee, setApplicationFee] = useState(null);
  const [loadingFee, setLoadingFee] = useState(true);

  const isCandidateForOtherSeats = watch("isCandidateForOtherSeats");
  const hasMetRequirements = watch("hasMetRequirements");

  const isEligibleToPay =
    isCandidateForOtherSeats === "no" && hasMetRequirements === "yes";

  const formValues = getValues();
  const userData = {
    name: formValues.name || "",
    email: formValues.email || "",
  };

  useEffect(() => {
    const fetchApplicationFee = async () => {
      try {
        const response = await fetch(
          `${URLS?.API_URL}/api/v1/user/donation/details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          const feeAmount = data?.data?.applicationPrice || data?.price || 50;
          setApplicationFee(feeAmount);
        } else {
          setApplicationFee(50);
        }
      } catch (error) {
        setApplicationFee(50);
      } finally {
        setLoadingFee(false);
      }
    };

    fetchApplicationFee();
  }, []);

  const handlePaymentSuccess = (data) => {
    console.log("Payment success data:", data);
    setIsPaymentCompleted(true);
    setPaymentData({
      status: data.status,
      amount: data.amount,
      transactionId: data.transactionId,
      transaction: data.transaction,
      applicationFee: data.applicationFee,
      paymentCompleted: true,
    });
  };

  const handlePayButtonClick = () => {
    if (isCandidateForOtherSeats === "yes") {
      errorToast(
        "You cannot pay the application fee as you are currently a candidate for another seat.",
      );
      return;
    }

    if (hasMetRequirements === "no") {
      errorToast(
        "You cannot pay the application fee as you have not met all the requirements set for the by the state and county election commissions.",
      );
      return;
    }

    if (!isCandidateForOtherSeats || !hasMetRequirements) {
      errorToast(
        "Please answer both eligibility questions before proceeding with payment.",
      );
      return;
    }

    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted, paymentData:", paymentData);
    console.log("isPaymentCompleted:", isPaymentCompleted);

    if (isPaymentCompleted && paymentData) {
      const submitData = {
        ...formValues,
        applicationFeeStatus: "paid",
        applicationFee: paymentData.amount,
        paymentDetails: {
          ...paymentData,
          status: "paid",
          paidAmount: paymentData.amount,
          transactionId: paymentData.transactionId,
        },
        // These will be sent as "yes"/"no" in meta_data
        isCandidateForOtherSeats: isCandidateForOtherSeats,
        hasMetRequirements: hasMetRequirements,
      };

      console.log("Submitting data to parent:", submitData);
      onSubmit(submitData);
    } else {
      errorToast("Please complete the payment first");
    }
  };

  if (loadingFee) {
    return (
      <div className="authformWrap">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading fee details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
        <Elements stripe={stripePromise}>
          <ApplicationFeeModal
            show={isModalOpen}
            amount={applicationFee || 50}
            userData={userData}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      ) : null}

      <div className="authformWrap">
        <form onSubmit={handleFormSubmit}>
          <div className="authform mt-4">
            <div className="mb-4 p-3 bg-light rounded">
              <div className="mb-3">
                <label className="fw-semibold mb-2 d-block">
                  1. Are you currently a candidate for any other seats?
                </label>
                <div className="d-flex gap-3">
                  <label className="me-3">
                    <Controller
                      name="isCandidateForOtherSeats"
                      control={control}
                      rules={{ required: "Please select an option" }}
                      render={({ field }) => (
                        <input
                          type="radio"
                          {...field}
                          value="yes"
                          checked={field.value === "yes"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="me-1"
                        />
                      )}
                    />
                    Yes
                  </label>
                  <label>
                    <Controller
                      name="isCandidateForOtherSeats"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          {...field}
                          value="no"
                          checked={field.value === "no"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="me-1"
                        />
                      )}
                    />
                    No
                  </label>
                </div>
                {errors.isCandidateForOtherSeats && (
                  <p
                    className="text-danger mt-1 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    {errors.isCandidateForOtherSeats.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label className="fw-semibold mb-2 d-block">
                  2. Have you met all the requirements set for the by the state
                  and county election commissions for this particular elected
                  seat?
                </label>
                <div className="d-flex gap-3">
                  <label className="me-3">
                    <Controller
                      name="hasMetRequirements"
                      control={control}
                      rules={{ required: "Please select an option" }}
                      render={({ field }) => (
                        <input
                          type="radio"
                          {...field}
                          value="yes"
                          checked={field.value === "yes"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="me-1"
                        />
                      )}
                    />
                    Yes
                  </label>
                  <label>
                    <Controller
                      name="hasMetRequirements"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          {...field}
                          value="no"
                          checked={field.value === "no"}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="me-1"
                        />
                      )}
                    />
                    No
                  </label>
                </div>
                {errors.hasMetRequirements && (
                  <p
                    className="text-danger mt-1 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    {errors.hasMetRequirements.message}
                  </p>
                )}
              </div>
            </div>

            {/* Application Fee Section */}
            <div className="mb-4">
              <div className="applicationFee">
                <p className="mb-2">
                  Application Fee:{" "}
                  <span className="theme_text fw-bold">
                    ${(applicationFee || 50).toFixed(2)}
                  </span>
                </p>
                <p className="mb-2">
                  To complete your registration, you must pay the application
                  fee.
                </p>

                {!isPaymentCompleted ? (
                  <Buttontheme
                    type="button"
                    className="w-100 mt-2"
                    onClick={handlePayButtonClick}
                    disabled={
                      !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
                      !isCandidateForOtherSeats ||
                      !hasMetRequirements ||
                      isCandidateForOtherSeats === "yes" ||
                      hasMetRequirements === "no"
                    }
                  >
                    Pay Application Fee
                  </Buttontheme>
                ) : (
                  <div className="alert alert-success mt-2">
                    ✓ Application fee paid successfully! ($
                    {paymentData?.amount?.toFixed(2)})
                  </div>
                )}

                {isCandidateForOtherSeats === "yes" && (
                  <p
                    className="text-danger mt-2 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    You are not eligible to pay the application fee as you are
                    currently a candidate for another seat.
                  </p>
                )}

                {hasMetRequirements === "no" && (
                  <p
                    className="text-danger mt-2 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    You are not eligible to pay the application fee as you have
                    not met all the requirements.
                  </p>
                )}

                {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
                  <p
                    className="text-danger mt-2 mb-0"
                    style={{ fontSize: "13px" }}
                  >
                    Stripe key missing. Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
                    in `.env`.
                  </p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="step4checkbox">
                <Controller
                  name="disclose"
                  control={control}
                  render={({ field }) => (
                    <label>
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                      />
                      I disclose any past party affiliation or lobbyist
                      association.
                    </label>
                  )}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="step4checkbox">
                <Controller
                  name="agree"
                  control={control}
                  rules={{ required: "You must agree before submitting" }}
                  render={({ field }) => (
                    <label>
                      <input
                        type="checkbox"
                        {...field}
                        checked={field.value || false}
                      />{" "}
                      I agree to platform rules, election laws, and code of
                      conduct.
                    </label>
                  )}
                />
                {errors.agree && (
                  <p className="text-danger m-0">{errors.agree.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mt-3">
            <Button type="button" className="arroowBack" onClick={onBack}>
              <Arrowbackicon />
            </Button>

            <Buttontheme
              type="submit"
              className="w-100"
              disabled={!isPaymentCompleted}
            >
              Submit
            </Buttontheme>
          </div>
        </form>
      </div>
    </>
  );
};

export default Step4;