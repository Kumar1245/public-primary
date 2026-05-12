import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Row, Col, Button } from "react-bootstrap";
import Textfield from "../../ui/Formfields/Textfield";
import { Arrowbackicon } from "../../../Assets/svg/Allsvgicons";
import Buttontheme from "../../ui/Buttontheme";

const Step2 = ({ onNext, onBack, activeTab }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = () => onNext();

  return (
    <div className="authformWrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="authform mt-4">
          <Row>
            {activeTab === "voterparticipant" ? (
              <Col lg={12}>
                <div className="mb-3">
                  <Controller
                    name="voter_registeration_number"
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        type="text"
                        label="Voter Registration Number"
                        placeholder="Enter registration number to become a verified voter"
                        error={errors.voter_registeration_number?.message}
                      />
                    )}
                  />
                </div>
              </Col>
            ) : (
              <Col lg={12}>
                <div className="mb-3">
                  <Controller
                    name="state_or_driving_license_number"
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        type="text"
                        label="State ID / Driving License Number"
                        placeholder="Enter your State ID or Driving License number"
                        error={errors.state_or_driving_license_number?.message}
                      />
                    )}
                  />
                </div>
              </Col>
            )}

          </Row>
        </div>

        <div className="d-flex align-items-center gap-3 mt-3">
          <Button className="arroowBack" type="button" onClick={onBack}>
            <Arrowbackicon />
          </Button>
          <Buttontheme type="submit" className="w-100">
            Save & Next
          </Buttontheme>
        </div>
      </form>
    </div>
  );
};

export default Step2;
