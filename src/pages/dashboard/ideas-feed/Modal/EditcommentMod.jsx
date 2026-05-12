import React, { useState } from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import {
  Modalclose,
  Starfade,
  Starfill,
} from "../../../../Assets/svg/Allsvgicons";
import Textareafield from "../../../../Component/ui/Formfields/Textareafield";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

// image

const schema = Yup.object().shape({
  rating: Yup.number().min(1, "Please select rating").required(),
  comments: Yup.string().required("Comments is required"),
});

const EditcommentMod = (props) => {
  const { comment, commentsData, onhide } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comments: "",
    },
  });

  const onSubmit = (data) => {
    console.log("FORM DATA 👉", data);
    onhide();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="authmodal rateandcommentmod"
    >
      <Modal.Body>
        <Button onClick={props.onhide} className="modal_close">
          <Modalclose />
        </Button>

        <div className="authinner_content ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col lg={12}>
                <div className="mb-3 field_class">
                  <Controller
                    name="comments"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative">
                        <Textareafield
                          {...field}
                          type="text"
                          label=""
                          value={{ ...field }.value || ""}
                          placeholder=""
                          error={errors.comments?.message}
                          row={4}
                        />
                      </div>
                    )}
                  />
                </div>
              </Col>
              <Buttontheme type="submit" className="mt-4">
                Save
              </Buttontheme>
            </Row>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditcommentMod;

// svg
