import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Image from "next/image";
import { Modalclose } from "../../../../Assets/svg/Allsvgicons";
import { renderMedia } from "../../../../lib/helper";

const ImageprevMod = (props) => {
  const { data } = props;
  if (!data) return null;

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal prevmodal"
    >
      <Modal.Body>
        <Button onClick={props.onhide} className="prev_close">
          <Modalclose />
        </Button>
        <div className="prevmodalImg">
          {/* <Image
            src={data.thumbnail}
            alt="media"
            width={500}
            height={500}
            className="img-fluid"
          /> */}
          {renderMedia(data)}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageprevMod;
