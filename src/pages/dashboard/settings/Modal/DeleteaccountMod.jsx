import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import Image from "next/image";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Accoutdelgif from "../../../../Assets/images/accoutdelgif.gif";

const DeleteaccountMod = ({ show, onhide, onConfirm, loading = false }) => {
  return (
    <Modal
      show={show}
      onHide={onhide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      className="authmodal deletebankmod"
    >
      <Modal.Body>
        <div className="authinner_content text-center">
          <div className="backdeleteicon mb-3">
            <Image
              src={Accoutdelgif}
              alt="Delete account"
              width={150}
              height={150}
            />
          </div>

          <h4 className="text-black">Delete Account?</h4>
          <p>
            Are you sure you want to permanently delete your account? This
            action cannot be undone.
          </p>

          <div className="d-flex flex-column gap-3">
            <Buttontheme
              type="button"
              className="deleteBtn w-100"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Deleting...
                </>
              ) : (
                "Yes, Delete Account"
              )}
            </Buttontheme>

            <Buttontheme
              type="button"
              className="cancelWhiteBtn w-100"
              onClick={onhide}
              disabled={loading}
            >
              Cancel
            </Buttontheme>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteaccountMod;
