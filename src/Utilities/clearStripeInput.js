 const clearStripeInputs = () => {
  if (!elements) return;

  const numberEl = elements.getElement(CardNumberElement);
  const expiryEl = elements.getElement(CardExpiryElement);
  const cvcEl = elements.getElement(CardCvcElement);

  numberEl?.clear();
  expiryEl?.clear();
  cvcEl?.clear();
};

export default clearStripeInputs;
