import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Buttontheme from "../ui/Buttontheme";
import Image from "next/image";

import Doublecheck from "../../Assets/images/doublecheck.gif";

const PaymentSuccessMod = (props) => {
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
            <Image
              src={Doublecheck}
              alt="doublecheck"
              width={150}
              height={150}
            />
          </div>
          <h3 className="text-black fw-bold">Payment Successful!</h3>
          <p>Thank you for your purchase! Your payment has been received.</p>

          <div className="d-flex flex-column justify-content-end align-items-center gap-3">
            <Buttontheme
              type="submit"
              className=" w-100"
              onClick={props.onhide}
            >
              Ok
            </Buttontheme>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentSuccessMod;

