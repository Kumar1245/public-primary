import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import Textareafield from "../../../../Component/ui/Formfields/Textareafield";
import { AuthUploadicon } from "../../../../Assets/svg/Allsvgicons";

const schema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Please enter a valid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const Helpandsuport = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };
  return (
    <div className="settingFormWrap">
      <div className="payouthead d-flex align-items-center justify-content-between">
        <h4 className="mb-3 text-white ">Help & Support</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="settingform">
          <Row>
            <Col lg={12}>
              {/* Full name */}
              <div className="mb-3">
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => (
                    <div className="position-relative field_class">
                      <Textfield
                        {...field}
                        type="text"
                        label="Full Name"
                        value={{ ...field }.value || ""}
                        placeholder="Enter full name"
                        error={errors.fullname?.message}
                      />
                    </div>
                  )}
                />
              </div>
            </Col>

            <Col lg={12}>
              {/* Email */}
              <div className="mb-3">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div className="position-relative field_class">
                      <Textfield
                        {...field}
                        type="email"
                        label="Full Name"
                        value={{ ...field }.value || ""}
                        placeholder="Enter email"
                        error={errors.email?.message}
                      />
                    </div>
                  )}
                />
              </div>
            </Col>

            <Col lg={12}>
              {/* address */}
              <div className="mb-3">
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <div className="position-relative field_class">
                      <Textareafield
                        {...field}
                        type="textarea"
                        label="Message"
                        value={{ ...field }.value || ""}
                        placeholder="Enter your message"
                        error={errors.message?.message}
                      />
                    </div>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Login Button */}
        <Buttontheme type="submit" className="w-100 mt-3">
          Send
        </Buttontheme>
      </form>
    </div>
  );
};

export default Helpandsuport;
