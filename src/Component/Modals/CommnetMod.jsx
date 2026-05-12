import React from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Buttontheme from "../ui/Buttontheme";
import { Modalclose, Starfade, Starfill } from "../../Assets/svg/Allsvgicons";
import Textareafield from "../ui/Formfields/Textareafield";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

const schema = Yup.object().shape({
  commitment: Yup.string().required("Comments is required"),
});
const CommnetMod = ({ show, onhide, comment, commentsData = [], onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      commitment: "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  if (!comment) return null;

  return (
    <Modal
      show={show}
      centered
      onHide={onhide}
      className="authmodal rateandcommentmod"
    >
      <Modal.Body>
        <Button onClick={onhide} className="modal_close">
          <Modalclose />
        </Button>

        <div className="authinner_content">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row>
              <Col lg={12}>
                <div className="mb-3 field_class">
                  <Controller
                    name="commitment"
                    control={control}
                    render={({ field }) => (
                      <div className="position-relative">
                        
                        <Textareafield
                          {...field}
                          placeholder="Add Comments..."
                          error={errors.commitment?.message}
                          row={4}
                        />

                        <Buttontheme type="submit" className="submitComent">
                          Submit
                        </Buttontheme>
                      </div>
                    )}
                  />
                </div>
              </Col>
            </Row>
          </form>
       

          {/* <div className="commmentlistShow">
            <h5 className="fw-semibold">
              Comments{" "}
              <Badge className="theme_badge rounded-pill">
                {commentsData.length}
              </Badge>
            </h5>

            <ul className="commmentList mb-0 mt-4 p-0">
              {commentsData.map((item, idx) => (
                <li key={idx}>
                  <div className="commmentListItem d-flex gap-3">
                    <Image
                      src={item.user.avatar}
                      alt="user"
                      width={50}
                      height={50}
                      className="rounded-circle"
                    />
                    <div>
                      <div className="d-flex gap-2">
                        <strong>{item.user.name}</strong>
                        <small>{item.time}</small>
                      </div>
                      <p className="m-0">{item.comment}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CommnetMod;
