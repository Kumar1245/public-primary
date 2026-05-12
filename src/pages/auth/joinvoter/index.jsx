import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import Buttontheme from "../../../Component/ui/Buttontheme";

// images
import Authbg from "../../../Assets/images/authbg.png";
import Authlayout from "../../../Layout/Authlayout";

import Textfield from "../../../Component/ui/Formfields/Textfield";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  registerno: Yup.string().required("Registration number is required"),
});

const Joinvoter = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      registerno: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    return
    router.push("/auth/login");
  };
  return (
    <>
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
              <h2>Voter Registration</h2>
            </div>

            <div className="authformWrap">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="authform mt-4">
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Controller
                          name="registerno"
                          control={control}
                          render={({ field }) => (
                            <div className="position-relative">
                              <Textfield
                                {...field}
                                type="text"
                                label="Voter registration number"
                                value={{ ...field }.value || ""}
                                placeholder="Enter registration number to become a  verified voter"
                                error={errors.registerno?.message}
                              />
                            </div>
                          )}
                        />
                        <small className="fs-14 mt-1 d-block">
                          Without voter registration, you can view and submit
                          ideas but cannot pledge votes.
                        </small>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="infoText mb-3">
                        <p className="m-0">
                          Your account will be reviewed by admin after
                          submission. You will receive a notification once
                          approved.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Login Button */}
                <div className="d-flex align-items-center gap-3 mt-3">
                  <Buttontheme type="submit" className="w-100 ">
                    Submit
                  </Buttontheme>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Joinvoter;

Joinvoter.getLayout = function getLayout(page) {
  return <Authlayout>{page}</Authlayout>;
};
