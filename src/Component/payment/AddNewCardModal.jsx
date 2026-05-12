import { Modal, Button } from "react-bootstrap";
import { Modalclose } from "../../Assets/svg/Allsvgicons";
import StripeCardForm from "./StripeCardForm";

const AddNewCardModal = ({ show, onHide, onCardAdded }) => {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Body className="p-0">
        <div className="p-4 border-bottom d-flex justify-content-between">
          <h5 className="fw-semibold">Add New Card</h5>
          <Button className="flexedclose" onClick={onHide}>
            <Modalclose />
          </Button>
        </div>

        <div className="p-4">
          <StripeCardForm
            onSuccess={(paymentMethod) => {
              onCardAdded(paymentMethod);
              onHide();
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewCardModal;
