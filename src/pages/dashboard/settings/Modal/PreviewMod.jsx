import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Modalclose } from "../../../../Assets/svg/Allsvgicons";
import { renderMedia } from "../../../../lib/helper";

const PreviewMod = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal fullscreen_preview"
    >
      <Modal.Body>
        <div className="authinner_content text-center">
          <Button onClick={props.onhide} className="previewclose">
            <Modalclose />
          </Button>
          <div className="render_mediaShow">
            {props?.media && renderMedia(props?.media)}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PreviewMod;
