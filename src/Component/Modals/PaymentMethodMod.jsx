import { Modal, Button } from "react-bootstrap";
import { Modalclose } from "../../Assets/svg/Allsvgicons";
import StripePayForm from "../payment/StripePayForm";

const PaymentMethodMod = ({ show, onHide, amount, onPaid }) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Body className="p-0">
        <div className="p-4 border-bottom d-flex justify-content-between">
          <h5 className="fw-semibold">Pay Application Fee</h5>
          <Button className="flexedclose" onClick={onHide}>
            <Modalclose />
          </Button>
        </div>

        <div className="p-4">
          <StripePayForm
            amount={amount}
            onSuccess={(paymentIntent) => {
              onPaid(paymentIntent);
              onHide();
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentMethodMod;
