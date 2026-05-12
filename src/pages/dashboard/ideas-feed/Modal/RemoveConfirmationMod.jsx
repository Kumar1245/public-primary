import React from "react";
import { Modal } from "react-bootstrap";
import Image from "next/image";

// image
import Deletegif from "../../../../Assets/images/deletegif.gif";
import Buttontheme from "../../../../Component/ui/Buttontheme";

const RemoveConfirmationMod = ({
  show,
  onhide,
  onConfirm, // ✅ added
}) => {
  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal successmodal"
      onHide={onhide}
    >
      <Modal.Body>
        <div className="authinner_content text-center">
          <div className="backdeleteicon mb-3">
            <Image
              src={Deletegif}
              alt="delete confirmation"
              width={150}
              height={150}
            />
          </div>

          <h3 className="text-black fw-bold">Remove From Platform</h3>
          <p>
            Are you sure you want to remove this idea from the platform? This
            action cannot be undone.
          </p>

          <div className="d-flex flex-column justify-content-end align-items-center gap-3">
            {/* ✅ CONFIRM REMOVE */}
            <Buttontheme
              type="button"
              className="yesRedbtn w-100"
              onClick={onConfirm}
            >
              Yes, Remove
            </Buttontheme>

            {/* ❌ JUST CLOSE */}
            <Buttontheme
              type="button"
              className="cancelWhiteBtn w-100"
              onClick={onhide}
            >
              Cancel
            </Buttontheme>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveConfirmationMod;
