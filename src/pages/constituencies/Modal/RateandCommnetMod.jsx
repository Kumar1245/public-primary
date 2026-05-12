import React from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Buttontheme from "../../../Component/ui/Buttontheme";
import {
  Modalclose,
  Starfade,
  Starfill,
} from "../../../Assets/svg/Allsvgicons";
import Textareafield from "../../../Component/ui/Formfields/Textareafield";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { IDEASJUDEGED } from "../../../services/ApiCalls";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";
import { useQueryClient } from "@tanstack/react-query";
import user from "../../../Assets/images/user.png"
const schema = Yup.object().shape({
  rating: Yup.number().min(1, "Please select rating").required(),
  comment: Yup.string().required("Comments is required"),
});

const RateandCommnetMod = ({
  idea,
  commentsdata = {},
  isLoading,
  onhide,
  ...props
}) => {
  const queryClient = useQueryClient();
  const isJudged = idea?.judged === "yes";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ideaId: idea?._id,
        decision: "yes",
        rating: formData.rating,
        comment: formData.comment,
      };

      const res = await IDEASJUDEGED(payload);

      if (res?.data?.status === "success") {
        successToast(res?.data?.message);


        queryClient.invalidateQueries({ queryKey: ["ideas"] });


        queryClient.invalidateQueries({
          queryKey: ["commentList", idea?._id],
        });

        reset();
        onhide();
      } else {
        errorToast(res?.data?.message);
      }
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  if (!idea) return null;

  const commentsList = commentsdata?.comments || [];
  const commentsCount = commentsdata?.commentsCount || 0;



  console.log(commentsList,"commentsList==7777777777")

  return (
    <Modal
      {...props}
      size="md"
      centered
      className="authmodal rateandcommentmod"
    >
      <Modal.Body>
        <Button onClick={onhide} className="modal_close">
          <Modalclose />
        </Button>

        <div className="authinner_content">
          <div className="innnerModalhead text-start">
            <h5 className="fw-bold">Rate & Comment this idea</h5>
            <p>
              Show your support — rate this idea from 1 to 5 stars to help it
              rise in community rankings!
            </p>
          </div>

        
          {!isJudged && (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg={12}>
                    <div className="mb-3 field_class">
                      <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Rating
                              onClick={(rate) => field.onChange(rate)}
                              initialValue={field.value}
                            />
                            {errors.rating && (
                              <small className="text-danger">
                                {errors.rating.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </Col>

                  <Col lg={12}>
                    <div className="mb-3 field_class">
                      <Controller
                        name="comment"
                        control={control}
                        render={({ field }) => (
                          <Textareafield
                            {...field}
                            type="text"
                            value={field.value || ""}
                            placeholder="Add Comments..."
                            error={errors.comment?.message}
                          />
                        )}
                      />
                    </div>
                  </Col>
                </Row>

                <Buttontheme type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Buttontheme>
              </form>

              <hr />
            </>
          )}

     
          <div className="commmentlistShow">
            <h5 className="fw-semibold">
              Comments{" "}
              <Badge className="theme_badge rounded-pill">
                {isLoading ? 0 : commentsCount}
              </Badge>
            </h5>

            <ul className="commmentList mb-0 mt-4 p-0">
              {isLoading ? (
      
                [...Array(3)].map((_, idx) => (
                  <li key={idx}>
                    <div className="commmentListItem d-flex align-items-start gap-3">
                      <div
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          background: "#e0e0e0",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            height: 12,
                            width: "40%",
                            background: "#e0e0e0",
                            marginBottom: 8,
                          }}
                        />
                        <div
                          style={{
                            height: 10,
                            width: "80%",
                            background: "#f0f0f0",
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))
              ) : commentsList.length > 0 ? (
                commentsList.map((item) => (
                  <li key={item._id}>
                    <div className="commmentListItem d-flex align-items-start gap-3">
                      <div className="commmentUser">
                        <Image
                          src={
                            item?.user?.profileImage?.link ||user
                          
                          }
                          alt="user"
                          width={50}
                          height={50}
                          className="rounded-circle img-fluid"
                        />
                      </div>

                      <div className="commmentContent">
                        <div className="d-flex align-items-center gap-2">
                          <p className="m-0">
                            <span className="text-black fw-semibold">
                              {item?.user?.name || "Anonymous"}
                            </span>
                          </p>
                          <div className="commmentTime">
                            <small className="m-0">
                              {new Date(item?.judgedAt).toLocaleString()}
                            </small>
                          </div>
                        </div>

                        <div className="ratingreview d-flex align-items-center gap-1 my-1">
                          {[...Array(5)].map((_, starIndex) =>
                            starIndex < Number(item?.rating) ? (
                              <Starfill
                                key={starIndex}
                                width={14}
                                height={14}
                                color="#FF993D"
                              />
                            ) : (
                              <Starfade
                                key={starIndex}
                                width={14}
                                height={14}
                                color="#eee"
                              />
                            )
                          )}
                        </div>

                        <p className="m-0 text-black commentline fs-14">
                          {item?.comment}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-muted mt-3">No comments yet</p>
              )}
            </ul>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RateandCommnetMod;
