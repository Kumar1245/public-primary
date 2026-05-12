import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Row, Col, Spinner } from "react-bootstrap";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Textfield from "../../../../Component/ui/Formfields/Textfield";
import {
  GallaryUploadicn,
  Removeicon,
} from "../../../../Assets/svg/Allsvgicons";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import fileUploader from "../../../../Utilities/FileUpload";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";
import {
  CAMPAGINDETAIL,
  CAMPAIGNADD,
  CAMPAIGNMEDIA,
} from "../../../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../../../Utilities/commonFunc";

const schema = Yup.object().shape({
  upload: Yup.array()
    .min(1, "Please upload at least one video")
    .required("Video is required"),
});

const AddnewvedioMod = ({ onhide, ...props }) => {
  const profileInputRef = useRef(null);
  const { id, refetch, show } = props;
  const [files, setFiles] = useState([]);

  const [previews, setPreviews] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  const {
    data: campaign,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["campaign-detail", id],
    queryFn: async () => {
      const res = await CAMPAGINDETAIL(id);

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      eventtitle: "",
      upload: [],
    },
  });

  const reset = () => {
    setValue("eventtitle", "");
    setValue("upload", []);
    setFiles([]);
    setPreviews([]);
  };

  useEffect(() => {
    reset();
  }, [onhide, show]);

  console.log("sddsadsa", watch("eventtitle"));
  useEffect(() => {
    if (campaign) {
      setValue("eventtitle", campaign?.title || "");
      setValue("upload", [campaign?.media?._id] || []);
      setFiles(
        [{ _id: campaign?.media?._id, link: campaign?.media?.link }] || [],
      );
      setPreviews([campaign?.media?.link] || []);
    }
  }, [campaign]);

  console.log("errors", errors);

  const handleProfileClick = () => {
    if (!uploading) profileInputRef.current?.click();
  };

  const handleMediaSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    const invalid = selectedFiles.find(
      (file) => !file.type.startsWith("video/"),
    );
    if (invalid) {
      errorToast("Only MP4 video files are allowed");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);
      const uploaded = [];

      for (const file of selectedFiles) {
        const res = await fileUploader(file, { isVideoType: true });
        if (res?._id) uploaded.push(res);
      }

      const merged = [...uploaded];

      setFiles(merged);
      setPreviews(merged.map((f) => f.link));
      setValue("upload", merged, { shouldValidate: true });

      e.target.value = "";
    } catch (err) {
      console.error(err);
      errorToast("Video upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onRemove = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    setPreviews(updated.map((f) => f.link));
    setValue("upload", updated, { shouldValidate: true });
  };

  const openPreview = (src) => {
    setPreviewSrc(src);
    setPreviewOpen(true);
  };

  console.log("files", files);

  const onSubmit = async (data) => {
    if (!files.length) return;
    setSubmitting(true);
    let payload = {
      title: data?.eventtitle,
      media: files[0]._id,
      type: "CAMPAIGN_VIDEO",
    };

    if (campaign?._id) {
      payload = { ...payload, _id: campaign?._id };
    }

    try {
      const res = await CAMPAIGNADD(payload);
      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Video added successfully");
        onhide();
        refetch();
        setSubmitting(false);
      } else {
        errorToast(res?.data?.message);
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal {...props} size="md" centered className="authmodal nobodypad">
        <Modal.Body>
          <div className="authinner_content">
            <div className="flexedheader p-3 border-bottom text-center">
              <h4 className="fw-semibold">Add New Video</h4>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="authform p-4">
                <Row>
                  <Col lg={12}>
                    <Controller
                      name="eventtitle"
                      control={control}
                      render={({ field }) => (
                        <Textfield
                          {...field}
                          label="Event Title"
                          placeholder="Enter title"
                        />
                      )}
                    />
                  </Col>

                  <Col lg={12} className="mt-3">
                    <label>Video</label>

                    <div
                      className="buttonWraperMod d-flex align-items-center justify-content-center"
                      onClick={handleProfileClick}
                      style={{ cursor: uploading ? "not-allowed" : "pointer" }}
                    >
                      <div className="d-flex flex-column align-items-center gap-2">
                        {uploading || isFetching ? (
                          <Spinner animation="border" />
                        ) : (
                          <div className="outlineIcon">
                            <GallaryUploadicn />
                          </div>
                        )}
                        <p>
                          Drop your video or{" "}
                          <span className="theme_text fw-semibold">browse</span>
                        </p>
                        <p className="m-0">MP4 allowed</p>
                      </div>
                    </div>

                    <Controller
                      name="upload"
                      control={control}
                      render={() => (
                        <input
                          ref={profileInputRef}
                          type="file"
                          accept="video/mp4"
                          style={{ display: "none" }}
                          multiple={false}
                          onChange={handleMediaSelect}
                          disabled={uploading}
                        />
                      )}
                    />

                    {errors.upload && (
                      <p className="text-danger mt-1">
                        {errors.upload.message}
                      </p>
                    )}

                    {/* Thumbnails */}
                    {previews.length > 0 && (
                      <div className="images_list d-flex gap-2 mt-3">
                        {previews.map((src, index) => (
                          <div
                            key={index}
                            className="image_item position-relative"
                          >
                            <video
                              src={src}
                              onClick={() => openPreview(src)}
                              style={{ cursor: "pointer" }}
                            />

                            <Button
                              type="button"
                              className="removebtn"
                              onClick={() => onRemove(index)}
                            >
                              <Removeicon />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Col>
                </Row>
              </div>

              <div className="flexedfooter px-3 py-3 border-top d-flex gap-3">
                <Buttontheme
                  type="button"
                  className="cancelWhiteBtn w-100"
                  onClick={onhide}
                  disabled={uploading}
                >
                  Cancel
                </Buttontheme>
                <Buttontheme
                  type="submit"
                  className="w-100"
                  disabled={
                    uploading || submitting || isFetching ? true : false
                  }
                >
                  {submitting ? "Loading..." : "Submit for Request"}
                </Buttontheme>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={previewOpen}
        onHide={() => setPreviewOpen(false)}
        centered
        size="lg"
        className="authmodal"
      >
        <Modal.Body className="text-center">
          <video
            src={previewSrc}
            controls
            autoPlay
            style={{ width: "100%", maxHeight: "70vh" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddnewvedioMod;
