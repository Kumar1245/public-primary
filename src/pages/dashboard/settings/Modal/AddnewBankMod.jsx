import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Link from "next/link";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import {
  Eyeclose,
  Eyeopen,
  Modalclose,
} from "../../../../Assets/svg/Allsvgicons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import { Dropdown } from "primereact/dropdown";

const schema = Yup.object().shape({
  routingno: Yup.string().required("Routing number is required"),
  accoutno: Yup.string().required("Account number is required"),
  holdername: Yup.string().required("Account holder name is required"),
  bankname: Yup.string().required("Bank name is required"),
});

const AddnewBankMod = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      routingno: "",
      accoutno: "",
      holdername: "",
      bankname: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Bank account added:", data);
    props.onhide();
  };

  const banklist = [
    { name: "JPMorgan Chase Bank" },
    { name: "Wells Fargo Bank" },
  ];

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

        <div className="authinner_content">
          <div className="thememodal_head">
            <h4>Add New Bank Account</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Controller
                    name="routingno"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative field_class">
                        <Textfield
                          {...field}
                          type="text"
                          label="Routing Number"
                          placeholder="Enter"
                          error={errors.routingno?.message}
                        />
                      </div>
                    )}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <Controller
                    name="accoutno"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative field_class">
                        <Textfield
                          {...field}
                          type="text"
                          label="Account Number"
                          placeholder="Enter"
                          error={errors.accoutno?.message}
                        />
                      </div>
                    )}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3">
                  <Controller
                    name="holdername"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative field_class">
                        <Textfield
                          {...field}
                          type="text"
                          label="Account Holder Name"
                          placeholder="Enter"
                          error={errors.holdername?.message}
                        />
                      </div>
                    )}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3 field_class">
                  <label className="form-label">Bank Name</label>
                  <Controller
                    name="bankname"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative">
                        <Dropdown
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          options={banklist}
                          optionLabel="name"
                          placeholder="Select..."
                          className="w-100 text_input"
                        />
                        {errors.bankname && (
                          <span className="error">
                            {errors.bankname.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>
              </Col>

              <Col lg={12}>
                <Buttontheme type="submit" className="w-100">
                  Save
                </Buttontheme>
              </Col>
            </Row>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddnewBankMod;
