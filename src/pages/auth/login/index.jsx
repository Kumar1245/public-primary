import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import Buttontheme from "../../../Component/ui/Buttontheme";
import Authbg from "../../../Assets/images/authbg.png";
import Authlayout from "../../../Layout/Authlayout";
import { Eyeclose, Eyeopen } from "../../../Assets/svg/Allsvgicons";
import Textfield from "../../../Component/ui/Formfields/Textfield";
import ForgotpasswordMod from "./Modal/ForgotpasswordMod";
import { useAuth } from "../../../context/AuthContext";
import { useFirebase } from "../../../firebase/firebase";

const schema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotpasswordModal, setForgotpasswordModal] = useState(false);
  const { token, message } = useFirebase();
  const { login, loginLoading } = useAuth();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    login({
      email: data.email,
      password: data.password,
      loginType: "email",
      firebaseToken: token,
    });
  };

  return (
    <>
      <ForgotpasswordMod
        show={forgotpasswordModal}
        onhide={() => setForgotpasswordModal(false)}
      />

      <section
        className="authFormSection position-relative"
        style={{ backgroundImage: `url(${Authbg.src})` }}
      >
        <div className="authLogo">
          <Link href="/" className="text-decoration-none text-black">
            <h3>Public Primary</h3>
          </Link>
        </div>

        <div className="authFormInner">
          <div className="authFormInner_bg">
            <div className="authheader text-center">
              <h2>Login Your Account</h2>
            </div>

            <div className="authformWrap mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="authform">
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <Textfield
                              {...field}
                              type="email"
                              label="Email Address"
                              placeholder="Enter email address"
                              error={errors.email?.message}
                            />
                          )}
                        />
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-3">
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => (
                            <div className="position-relative">
                              <Textfield
                                {...field}
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="Enter your password"
                                error={errors.password?.message}
                              />
                              <Button
                                type="button"
                                className="eyeIcon"
                                onClick={handleShowPassword}
                              >
                                {showPassword ? <Eyeopen /> : <Eyeclose />}
                              </Button>
                            </div>
                          )}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input me-2" />
                    Remember me
                  </label>

                  <Link
                    href="#"
                    className="forgotpassword"
                    onClick={() => setForgotpasswordModal(true)}
                  >
                    Forgot password?
                  </Link>
                </div>

                <Buttontheme
                  type="submit"
                  className="w-100 mt-3"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Logging in..." : "Login"}
                </Buttontheme>
              </form>
            </div>
          </div>

          <div className="alreadyMember text-center mt-4">
            <p>
              New member? <Link href="/auth/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page) {
  return <Authlayout>{page}</Authlayout>;
};
