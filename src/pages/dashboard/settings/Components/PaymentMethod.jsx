import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddNewCardMod from "../../../../Component/Modals/AddNewCardMod";

const PaymentMethod = () => {
  const [addnewcardmodal, setAddnewcardmodal] = useState(false);
  return (
    <div>
      <AddNewCardMod
        show={addnewcardmodal}
        onhide={() => setAddnewcardmodal(false)}
      />
      <div class="card-wrapper">
        <Row>
          <Col lg={4} md={6} sm={12}>
            <div class="card add-card" onClick={() => setAddnewcardmodal(true)}>
              <div class="add-icon">+</div>
              <p>Add New Card</p>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div class="card credit-card blue position-relative overflow-hidden">
              <div className="whitecircleone whitecirclecommon"></div>
              <div className="whitecircletwo whitecirclecommon"></div>

              <div class="card-top">
                <span>XXXX XXXX XXXX 7644</span>
              </div>

              <div class="card-middle">
                <small>Valid Till</small>
                <strong>05/28</strong>
              </div>

              <div class="card-bottom">
                <span>William Smith</span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="visa"
                />
              </div>
            </div>
          </Col>

          <Col lg={4} md={6} sm={12}>
            <div class="card credit-card orange position-relative overflow-hidden">
              <div className="whitecircleone whitecirclecommon"></div>
              <div className="whitecircletwo whitecirclecommon"></div>
              <div class="card-top">
                <span>XXXX XXXX XXXX 3222</span>
              </div>

              <div class="card-middle">
                <small>Valid Till</small>
                <strong>02/27</strong>
              </div>

              <div class="card-bottom">
                <span>Mila James</span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="mastercard"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentMethod;
