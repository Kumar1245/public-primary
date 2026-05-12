import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Image from "next/image";

// image
import Deletegif from "../../../../Assets/images/deletegif.gif";
import Buttontheme from "../../../../Component/ui/Buttontheme";

const CanceleventMod = ({ eventData, handleCancelEvent, onhide, ...props }) => {
  return (
    <Modal {...props} size="sm" centered className="authmodal successmodal">
      <Modal.Body>
        <div className="authinner_content text-center">
          <div className="backdeleteicon mb-3">
            <Image src={Deletegif} alt="cancel" width={150} height={150} />
          </div>

          <h3 className="text-black fw-bold">Cancel Event</h3>
          <p>
            Are you sure you want to cancel <b>{eventData?.title}</b>? This
            action cannot be undone.
          </p>

          <div className="d-flex flex-column gap-3">
            <Buttontheme className="cancelWhiteBtn w-100" onClick={onhide}>
              Keep Event
            </Buttontheme>

            <Buttontheme
              className="yesRedbtn w-100"
              onClick={() => handleCancelEvent(eventData)}
            >
              Yes, Cancel
            </Buttontheme>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CanceleventMod;

// svg
