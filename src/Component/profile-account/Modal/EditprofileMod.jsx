import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import {
  Cameranewicon,
  Eventclockformicon,
  Modalclose,
} from "../../../../Assets/svg/Allsvgicons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Calendar } from "primereact/calendar";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";
import Link from "next/link";

// image

const schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  dob: Yup.date().required("Date of birth is required").nullable(),
  address: Yup.string().required("Address is required"),
});

const EditprofileMod = (props) => {
  const { onhide } = props;
  const [file, setFile] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      file: null,
      fullname: "",
      phone: "",
      email: "",
      dob: null,
      address: "",
    },
  });

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = (data) => {
    console.log("NEW CARD DATA 👉", data);
    onhide();
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal  nobodypad"
    >
      <Modal.Body>
        <div className="authinner_content ">
          <div className="flexedheader p-3 border-bottom d-flex align-items-start justify-content-between">
            <div className="innnerModalhead text-start">
              <h4 className="fw-semibold">Edit Profile</h4>
              <p className="m-0">Fill in the details below</p>
            </div>
            <Button onClick={props.onhide} className="flexedclose">
              <Modalclose />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="forminner p-4">
              <Row>
                <Col lg={12}>
                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <div className="user_upload position-relative">
                        <label htmlFor="fileshow">
                          <input
                            type="file"
                            id="fileshow"
                            accept="image/*"
                            hidden
                            onChange={(e) => {
                              const selectedFile = e.target.files[0];
                              field.onChange(selectedFile);
                              setFile(URL.createObjectURL(selectedFile));
                            }}
                          />
                          <Cameranewicon />
                        </label>

                        {file && (
                          <Image
                            src={file}
                            alt="Profile"
                            width={400}
                            height={400}
                          />
                        )}
                      </div>
                    )}
                  />
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="fullname"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="text"
                            label="Full Name"
                            value={{ ...field }.value || ""}
                            placeholder=""
                            error={errors.fullname?.message}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  {/* Phone Number */}
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <div className="phoneNumber position-relative">
                          <PhoneInput
                            {...field}
                            placeholder="Enter phone number"
                            value={field.value}
                            onChange={field.onChange}
                            country="us"
                          />
                        </div>
                      )}
                    />
                    {errors.phone && (
                      <p className="text-danger">{errors.phone.message}</p>
                    )}
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="text"
                            label="Email Address"
                            value={{ ...field }.value || ""}
                            placeholder=""
                            error={errors.email?.message}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <label className="form-label">Date of Birth</label>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <div className="dobCalender position-relative">
                          <Calendar
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            appendTo={document.body}
                            placeholder="Select"
                            showIcon
                            className="w-100 text_input p-0"
                          />
                          {errors.dob && (
                            <span className="error">{errors.dob.message}</span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="text"
                            label="Location"
                            value={{ ...field }.value || ""}
                            placeholder="Address or venue name"
                            error={errors.address?.message}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="flexedfooter px-3 pb-3 border-top d-flex align-items-center justify-content-center gap-3">
              <Buttontheme type="submit" className="w-100 mt-3">
                Save
              </Buttontheme>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditprofileMod;

// svg
