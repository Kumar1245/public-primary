import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Buttontheme from "../ui/Buttontheme";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      color: "#32325d",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#fa755a" },
  },
};

const StripeCardForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // 🔹 Send paymentMethod.id to backend
    onSuccess(paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Card Details</label>
        <div className="form-control p-2">
          <CardElement options={CARD_OPTIONS} />
        </div>
      </div>

      <Buttontheme type="submit" className="w-100">
        Save Card
      </Buttontheme>
    </form>
  );
};

export default StripeCardForm;
