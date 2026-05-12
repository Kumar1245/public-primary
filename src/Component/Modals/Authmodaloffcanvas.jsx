import React from "react";
import { Button, Offcanvas, Tab, Tabs } from "react-bootstrap";
import Login from "../AuthComp/Login";
import Signup from "../AuthComp/Signup";

const Authmodaloffcanvas = (props) => {
  return (
    <Offcanvas {...props} placement="bottom" className="auth-offcanvas-full">
      <Button onClick={props.onhide} className="closeicon">
        {deleteicon}
      </Button>

      <Offcanvas.Body>
        <div className="authinner_content">
          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="signup" title="Sign Up">
              <Signup />
            </Tab>
          </Tabs>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Authmodaloffcanvas;


const deleteicon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 0C4.42857 0 0 4.42857 0 10C0 15.5714 4.42857 20 10 20C15.5714 20 20 15.5714 20 10C20 4.42857 15.5714 0 10 0ZM13.8571 15L10 11.1429L6.14286 15L5 13.8571L8.85714 10L5 6.14286L6.14286 5L10 8.85714L13.8571 5L15 6.14286L11.1429 10L15 13.8571L13.8571 15Z"
      fill="#0042a4"
    />
  </svg>
);
