// import React, { useState } from "react";
// import { Button, Row, Col } from "react-bootstrap";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import Link from "next/link";
// import Buttontheme from "../../../Component/ui/Buttontheme";
// import Authbg from "../../../Assets/images/authbg.png";
// import Authlayout from "../../../Layout/Authlayout";
// import { Eyeclose, Eyeopen } from "../../../Assets/svg/Allsvgicons";
// import Textfield from "../../../Component/ui/Formfields/Textfield";
// import { useAuth } from "../../../context/AuthContext";

// const schema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { login, loginLoading } = useAuth();
//   const handleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleShowConfirmPassword = () => {
//     setShowConfirmPassword((prev) => !prev);
//   };

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (data) => {
//     login({
//       email: data.email,
//       password: data.password,
//       loginType: "email",
//     });
//   };

//   return (
//     <>
//       <section
//         className="authFormSection position-relative"
//         style={{ backgroundImage: `url(${Authbg.src})` }}
//       >
//         <div className="authLogo">
//           <Link href="/" className="text-decoration-none text-black">
//             <h3>Public Primary</h3>
//           </Link>
//         </div>

//         <div className="authFormInner">
//           <div className="authFormInner_bg">
//             <div className="authheader text-center">
//               <h2>Reset Your Password</h2>
//             </div>

//             <div className="authformWrap mt-4">
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="authform">
//                   <Row>
//                     <Col lg={12}>
//                       <div className="mb-3">
//                         <Controller
//                           name="email"
//                           control={control}
//                           render={({ field }) => (
//                             <Textfield
//                               {...field}
//                               type="email"
//                               label="Email Address"
//                               placeholder="Enter email address"
//                               error={errors.email?.message}
//                             />
//                           )}
//                         />
//                       </div>
//                     </Col>

//                     <Col lg={12}>
//                       <div className="mb-3">
//                         <Controller
//                           name="password"
//                           control={control}
//                           render={({ field }) => (
//                             <div className="position-relative">
//                               <Textfield
//                                 {...field}
//                                 type={showPassword ? "text" : "password"}
//                                 label="Password"
//                                 placeholder="Enter your password"
//                                 error={errors.password?.message}
//                               />
//                               <Button
//                                 type="button"
//                                 className="eyeIcon"
//                                 onClick={handleShowPassword}
//                               >
//                                 {showPassword ? <Eyeopen /> : <Eyeclose />}
//                               </Button>
//                             </div>
//                           )}
//                         />
//                       </div>
//                     </Col>

//                     <Col lg={12}>
//                       <div className="mb-3">
//                         <Controller
//                           name="confirmPassword"
//                           control={control}
//                           render={({ field }) => (
//                             <div className="position-relative">
//                               <Textfield
//                                 {...field}
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 label="Confirm Password"
//                                 placeholder="Enter your confirm password"
//                                 error={errors.confirmPassword?.message}
//                               />
//                               <Button
//                                 type="button"
//                                 className="eyeIcon"
//                                 onClick={handleShowConfirmPassword}
//                               >
//                                 {showConfirmPassword ? (
//                                   <Eyeopen />
//                                 ) : (
//                                   <Eyeclose />
//                                 )}
//                               </Button>
//                             </div>
//                           )}
//                         />
//                       </div>
//                     </Col>
//                   </Row>
//                 </div>

//                 <Buttontheme
//                   type="submit"
//                   className="w-100 mt-3"
//                   disabled={loginLoading}
//                 >
//                   {loginLoading ? "Logging in..." : "Submit"}
//                 </Buttontheme>
//               </form>
//             </div>
//           </div>

//           <div className="alreadyMember text-center mt-4">
//             <p>
//               Already have an account? <Link href="/auth/login">Login</Link>
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;

// Login.getLayout = function getLayout(page) {
//   return <Authlayout>{page}</Authlayout>;
// };

import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import Buttontheme from "../../../Component/ui/Buttontheme";
import Authbg from "../../../Assets/images/authbg.png";
import Authlayout from "../../../Layout/Authlayout";
import { Eyeclose, Eyeopen } from "../../../Assets/svg/Allsvgicons";
import Textfield from "../../../Component/ui/Formfields/Textfield";
import { toast } from "react-toastify";
import { RESET_PASSWORD } from "../../../services/ApiCalls";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";

const schema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter a password")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character",
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }
    const payload = {
      password: data?.password,
      confirmPassword: data?.confirmPassword,
    };
    try {
      setLoading(true);

      const res = await RESET_PASSWORD(payload);
      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Password reset successfully");
        return;
        router.push("/auth/login");
      } else {
        errorToast(res?.data?.message || "Reset Password Fail");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            <h2>Reset Your Password</h2>
            <p>Create a new secure password</p>
          </div>

          <div className="authformWrap mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative mb-3">
                        <Textfield
                          {...field}
                          type={showPassword ? "text" : "password"}
                          label="New Password"
                          placeholder="Enter new password"
                          error={errors.password?.message}
                        />
                        <Button
                          type="button"
                          className="eyeIcon"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eyeopen /> : <Eyeclose />}
                        </Button>
                      </div>
                    )}
                  />
                </Col>

                <Col lg={12}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative mb-3">
                        <Textfield
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          label="Confirm Password"
                          placeholder="Re-enter password"
                          error={errors.confirmPassword?.message}
                        />
                        <Button
                          type="button"
                          className="eyeIcon"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <Eyeopen /> : <Eyeclose />}
                        </Button>
                      </div>
                    )}
                  />
                </Col>
              </Row>

              <Buttontheme
                type="submit"
                className="w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Buttontheme>
            </form>
          </div>
        </div>

        <div className="alreadyMember text-center mt-4">
          <p>
            Back to <Link href="/auth/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

ResetPassword.getLayout = function getLayout(page) {
  return <Authlayout>{page}</Authlayout>;
};
