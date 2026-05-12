"use client";
import React, { useState } from "react";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Buttontheme from "../../../../Component/ui/Buttontheme";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import { Eyeclose, Eyeopen } from "../../../../Assets/svg/Allsvgicons";
import { CHANGEPASSWORD } from "../../../../services/ApiCalls";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";
import { useAuth } from "../../../../context/AuthContext";

const schema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  password: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .required("Please enter a password")
    .matches(/[A-Z]/, "New password must contain at least one uppercase letter")
    .matches(/[a-z]/, "New password must contain at least one lowercase letter")
    .matches(/[0-9]/, "New password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "New password must contain at least one special character",
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const PasswordChange = () => {
  const { logout } = useAuth();

  const [password, setPassword] = useState({
    showPassword: false,
    showNewPassword: false,
    showcPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const togglePassword = (key) => {
    setPassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await CHANGEPASSWORD(data);

      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Password changed successfully");

        reset();

        logout();
        // router.push("/login");
      } else {
        errorToast(res?.data?.message || "Failed to change password");
      }
    } catch (error) {
      errorToast("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settingFormWrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="settingform">
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field }) => (
                    <div className="position-relative field_class">
                      <Textfield
                        {...field}
                        type={password.showPassword ? "text" : "password"}
                        label="Current Password"
                        placeholder="Enter current password"
                        error={errors.currentPassword?.message}
                      />
                      <Button
                        type="button"
                        className="eyeIcon"
                        onClick={() => togglePassword("showPassword")}
                      >
                        {password.showPassword ? <Eyeopen /> : <Eyeclose />}
                      </Button>
                    </div>
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
                    <div className="position-relative field_class">
                      <Textfield
                        {...field}
                        type={password.showNewPassword ? "text" : "password"}
                        label="New Password"
                        placeholder="Enter new password"
                        error={errors.password?.message}
                      />
                      <Button
                        type="button"
                        className="eyeIcon"
                        onClick={() => togglePassword("showNewPassword")}
                      >
                        {password.showNewPassword ? <Eyeopen /> : <Eyeclose />}
                      </Button>
                    </div>
                  )}
                />
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <div className="position-relative field_class">
                      <Textfield
                        {...field}
                        type={password.showcPassword ? "text" : "password"}
                        label="Re-enter password"
                        placeholder="Re-enter password"
                        error={errors.confirmPassword?.message}
                      />
                      <Button
                        type="button"
                        className="eyeIcon"
                        onClick={() => togglePassword("showcPassword")}
                      >
                        {password.showcPassword ? <Eyeopen /> : <Eyeclose />}
                      </Button>
                    </div>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>

        <Buttontheme type="submit" className="mt-3 w-100" disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Buttontheme>
      </form>
    </div>
  );
};

export default PasswordChange;
