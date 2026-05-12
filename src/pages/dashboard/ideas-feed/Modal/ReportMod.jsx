import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Modalclose } from "../../../../Assets/svg/Allsvgicons";
import Buttontheme from "../../../../Component/ui/Buttontheme";

const schema = Yup.object().shape({
  reason: Yup.string().required("Please select a reason"),
  comment: Yup.string().when("reason", {
    is: "other",
    then: (schema) => schema.required("Please provide more details"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const reportReasons = [
  { id: "duplicate", label: "Duplicate submission" },
  { id: "offensive", label: "Offensive content" },
  { id: "spam", label: "Spam or irrelevant content" },
  { id: "misinformation", label: "Misinformation" },
  { id: "other", label: "Other" },
];

const ReportMod = ({ onhide, onSubmit, loading, ...props }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "",
      comment: "",
    },
  });

  const selectedReason = watch("reason");

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <Modal {...props} centered className="authmodal nobodypad">
      <Modal.Body>
        <div className="authinner_content">
          <div className="flexedheader p-3 border-bottom d-flex justify-content-between">
            <div>
              <h4 className="fw-semibold">Report This Idea</h4>
              <p className="m-0">Help us keep the community constructive.</p>
            </div>
            <Button onClick={onhide} className="flexedclose">
              <Modalclose />
            </Button>
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="forminner p-4">
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <>
                    {reportReasons?.map((item) => (
                      <div key={item.id} className="d-flex gap-2 mb-2">
                        <input
                          type="radio"
                          value={item.id}
                          checked={field.value === item.id}
                          onChange={() => field.onChange(item.id)}
                        />
                        <label>{item.label}</label>
                      </div>
                    ))}
                  </>
                )}
              />
              {errors.reason && (
                <p className="text-danger mt-2">{errors.reason.message}</p>
              )}

              {selectedReason === "other" && (
                <div className="mt-3">
                  <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="form-control"
                        rows={3}
                        placeholder="Please describe the issue"
                      />
                    )}
                  />
                  {errors.comment && (
                    <p className="text-danger mt-2">{errors.comment.message}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flexedfooter p-3 border-top">
              <Buttontheme
                type="submit"
                className="w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Buttontheme>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReportMod;
