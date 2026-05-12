import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Link from "next/link";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import { Modalclose } from "../../../../Assets/svg/Allsvgicons";

const VerifyCodemod = (props) => {
  const route = useRouter();
  const [otp, setOtp] = useState("");

  const verifyCode = (e) => {
    e.preventDefault();
    console.log("OTP:", otp);
    props.onhide();
    setTimeout(() => {
      route.push("/dashboard");
    }, 500);
  };
  
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal verfycodemod"
    >
      <Modal.Body>
        <Button onClick={props.onhide} className="modal_close">
          <Modalclose />
        </Button>

        <div className="authinner_content text-center">
          <div className="HeadingModal">
            <h4>Verify Your Identity</h4>
            <p>
              We’ve sent a One Time Password (OTP) via SMS to your mobile number
              +1 *** *** 1234.
            </p>
          </div>

          <div className="d-flex justify-content-center my-3">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "60px",
                height: "60px",
                fontSize: "24px",
                textAlign: "center",
                borderRadius: "14px",
                background: "#f4f4f414",
                border: "1px solid #f4f4f414",
                color: "#fff",
              }}
              focusStyle={{
                borderColor: "#ffb420",
              }}
            />
          </div>

          <Buttontheme
            type="submit"
            className="w-100 mt-3"
            onClick={verifyCode}
          >
            Verify Code
          </Buttontheme>

          <div className="alreadyMember text-center mt-4">
            <p>
              Didn’t receive? <Link href="/auth/login">Resend OTP</Link>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VerifyCodemod;

// svg
