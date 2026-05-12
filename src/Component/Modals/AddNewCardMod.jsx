import React, { useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textfield from "../../Component/ui/Formfields/Textfield";
import { Modalclose } from "../../Assets/svg/Allsvgicons";

import Textareafield from "../../Component/ui/Formfields/Textareafield";
import Buttontheme from "../ui/Buttontheme";
import { Calendar } from "primereact/calendar";

const schema = Yup.object().shape({
  holdername: Yup.string().required("Card holder name is required"),

  cardnumber: Yup.string()
    .required("Card number is required")
    .min(12, "Invalid card number"),

  expirydate: Yup.date().required("Expiry date is required").nullable(),

  cvv: Yup.string()
    .required("CVV is required")
    .min(3, "Invalid CVV")
    .max(4, "Invalid CVV"),
});

const AddNewCardMod = (props) => {
  const { onhide, paymentsuccessMod } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      holdername: "",
      cardnumber: "",
      expirydate: null,
      cvv: "",
    },
  });

  const onSubmit = (data) => {
    console.log("NEW CARD DATA 👉", data);
    onhide();
    paymentsuccessMod();
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
              <h4 className="fw-semibold">Payment Method</h4>
              <p className="m-0">Fill in the details below </p>
            </div>
            <Button onClick={onhide} className="flexedclose">
              <Modalclose />
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="forminner p-4">
              <Row>
                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="holdername"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="text"
                            label="Card Holder Name"
                            value={{ ...field }.value || ""}
                            placeholder="Enter card holder name"
                            error={errors.holdername?.message}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="cardnumber"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="number"
                            label="Card Number"
                            value={{ ...field }.value || ""}
                            placeholder="Enter card number"
                            error={errors.cardnumber?.message}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <div className="mb-3 field_class">
                    <label className="form-label">Expiry Date </label>
                    <Controller
                      name="expirydate"
                      control={control}
                      render={({ field }) => (
                        <div className="dobCalender position-relative">
                          <Calendar
                            value={field.value}
                            onChange={(e) => field.onChange(e.value)}
                            appendTo={document.body}
                            placeholder="Select your date of birth"
                            showIcon
                            className="w-100 text_input p-0"
                          />
                          {errors.expirydate && (
                            <span className="error">
                              {errors.expirydate.message}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <div className="mb-3 field_class">
                    <Controller
                      name="cvv"
                      control={control}
                      render={({ field }) => (
                        <div className="position-relative">
                          <Textfield
                            {...field}
                            type="number"
                            label="CVV"
                            value={{ ...field }.value || ""}
                            placeholder="CVV"
                            error={errors.cvv?.message}
                          />
                        </div>
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="flexedfooter p-3 border-top">
              <Buttontheme type="submit" className="w-100 mt-3">
                Save
              </Buttontheme>

              <Buttontheme
                type="submit"
                className="cancelWhiteBtn w-100 mt-3"
                onClick={onhide}
              >
                Cancel
              </Buttontheme>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewCardMod;

