import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

import { DeleteBankIcon, Modalclose } from "../../../../Assets/svg/Allsvgicons";
import Buttontheme from "../../../../Component/ui/Buttontheme";

// image

const DeleteBankMod = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal deletebankmod"
    >
      <Modal.Body>
        {/* <Button onClick={props.onhide} className="modal_close">
          <Modalclose />
        </Button> */}

        <div className="authinner_content text-center">
          <div className="backdeleteicon mb-3">
            <DeleteBankIcon />
          </div>
          <h4 className="text-white">Delete Bank Account</h4>
          <p>
            Are you sure you want to delete this bank account. This action
            cannot be undone.
          </p>

          <div className="d-flex flex-column justify-content-end align-items-center gap-3">
            <Buttontheme type="submit" className="deleteBtn w-100">
              Yes, Delete
            </Buttontheme>
            <Buttontheme
              type="submit"
              className="cancelWhiteBtn w-100"
              onClick={props.onhide}
            >
              Cancel
            </Buttontheme>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteBankMod;

// svg
