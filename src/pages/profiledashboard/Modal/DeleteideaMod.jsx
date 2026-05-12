import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Image from "next/image";

// image
import Deletegif from "../../../Assets/images/deletegif.gif";
import Buttontheme from "../../../Component/ui/Buttontheme";

const DeleteideaMod = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal successmodal"
    >
      <Modal.Body>
        <div className="authinner_content text-center">
          <div className="backdeleteicon mb-3">
            <Image src={Deletegif} alt="doublecheck" width={150} height={150} />
          </div>
          <h3 className="text-black fw-bold">Delete Idea</h3>
          <p>
            Are you sure you want to delete this idea? This action cannot be
            undone.
          </p>

          <div className="d-flex flex-column justify-content-end align-items-center gap-3">
            <Buttontheme
              type="submit"
              className="cancelWhiteBtn w-100"
              onClick={props.onhide}
            >
              Keep Idea
            </Buttontheme>
            <Buttontheme
              type="submit"
              className="yesRedbtn w-100"
              onClick={props.onhide}
            >
              Yes, Remove
            </Buttontheme>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteideaMod;

// svg
