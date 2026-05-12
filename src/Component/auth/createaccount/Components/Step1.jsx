import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";
import * as Yup from "yup";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import Textareafield from "../../../../Component/ui/Formfields/Textareafield";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import "react-phone-input-2/lib/style.css";
import { CONSTITUENCY_LIST } from "../../../../services/ApiCalls";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import GoogleAutocomplete from "../../../../Component/Common/GoogleAutoComplete";
import { Eyeclose, Eyeopen } from "../../../../Assets/svg/Allsvgicons";

const Step1 = (props) => {
  const { activeTab, onNext } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const {
    data: constituencyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["CONSTITUENCY"],
    queryFn: async () => {
      const res = await CONSTITUENCY_LIST();

      return res.data.data;
    },

    keepPreviousData: true,
  });

  const seatoptions =
    constituencyData?.map((item) => ({
      label: item.name,
      value: item._id,
    })) || [];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const onSubmit = () => {
    onNext();
  };

  const addressChangeHandler = (data) => {
    if (!data) return;

    setValue("address", data.address, { shouldValidate: true });
    setValue("lat", data.lat);
    setValue("lng", data.lng);
  };
  return (
    <div className="authformWrap">
      {activeTab === "participantonly" && (
        <div className="infoText mb-3">
          <p className="m-0">
            You can share and judge ideas but you can’t pledge votes for
            government judge.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="authform">
          <Row>
            <Col lg={12}>
              <div className="mb-3 field_class">
                <label className="form-label">Select Constituency</label>

                <Controller
                  name="seat"
                  control={control}
                  rules={{ required: "Please select your constituency" }}
                  render={({ field }) => (
                    <div className="position-relative">
                      <Dropdown
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={seatoptions}
                        optionLabel="label"
                        optionValue="value"
                        placeholder={
                          isLoading
                            ? "Loading constituencies..."
                            : "Choose constituency"
                        }
                        className="w-100 text_input"
                        disabled={isLoading || isError}
                      />

                      {errors.seat && (
                        <span className="error text-danger">
                          {errors.seat.message}
                        </span>
                      )}

                      {isError && (
                        <span className="error">
                          Failed to load constituency list
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="mb-3">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Please enter your name" }}
                  render={({ field }) => (
                    <Textfield
                      {...field}
                      type="text"
                      label="Full Name"
                      value={field.value || ""}
                      placeholder="Enter your full name"
                      error={errors.name?.message}
                    />
                  )}
                />
              </div>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <div className="mb-3 field_class">
                <label className="form-label">Date of Birth</label>

                <Controller
                  name="dob"
                  control={control}
                  rules={{
                    required: "Please enter your date of birth",
                    validate: (value) => {
                      if (!value) return "Please enter your date of birth";

                      const today = new Date();
                      const minDOB = new Date(
                        today.getFullYear() - 18,
                        today.getMonth(),
                        today.getDate(),
                      );

                      return (
                        value <= minDOB || "You must be at least 18 years old"
                      );
                    },
                  }}
                  render={({ field }) => {
                    const today = new Date();
                    const maxDOB = new Date(
                      today.getFullYear() - 18,
                      today.getMonth(),
                      today.getDate(),
                    );

                    return (
                      <div className="dobCalender position-relative">
                        <Calendar
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          placeholder="Select your date of birth"
                          showIcon
                          className="w-100 text_input p-0"
                          maxDate={maxDOB}
                          dateFormat="dd/mm/yy"
                        />
                        <p className="note text-danger">
                          You must be 18+ to create an account
                        </p>
                        {errors.dob && (
                          <span className="error text-danger">
                            {errors.dob.message}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <div className="mb-3">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email",
                    },
                  }}
                  render={({ field }) => (
                    <Textfield
                      {...field}
                      type="email"
                      label="Email Address"
                      value={field.value || ""}
                      placeholder="Enter email address"
                      error={errors.email?.message}
                    />
                  )}
                />
              </div>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <div className="mb-3">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <div className="position-relative">
                      <Textfield
                        {...field}
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        placeholder="Enter Password"
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

            <Col lg={12} className="my-2">
              <div className="">
                <label className="form-label fw-sbold text-muted ps-2 m-0">
                  Address
                </label>
                <GoogleAutocomplete
                  address={watch("address")}
                  onChange={addressChangeHandler}
                />
                {errors.address && (
                  <p className="text-danger m-0">{errors.address.message}</p>
                )}
              </div>
            </Col>
          </Row>
        </div>

        <Buttontheme type="submit" className="w-100 mt-3">
          Save & Next
        </Buttontheme>
      </form>
    </div>
  );
};

export default Step1;
