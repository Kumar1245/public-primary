


import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Row, Col, Button } from "react-bootstrap";
import { Arrowbackicon, Cameraicon } from "../../../Assets/svg/Allsvgicons";
import Buttontheme from "../../ui/Buttontheme";
import FaceScan from "../facescanSignup";
import fileUploader from "../../../Utilities/FileUpload";
import { errorToast } from "../../../Utilities/toastsMessages";

const Step3 = ({ onBack, onSubmit, isFormLoading }) => {
  const { handleSubmit, setValue, watch } = useFormContext();

  const [showFaceScan, setShowFaceScan]   = useState(false);
  const [noCamera, setNoCamera]           = useState(false);
  const [uploading, setUploading]         = useState(false);
  const [faceCaptured, setFaceCaptured]   = useState(false);

  const fileInputRef = useRef(null);
  const faceScanImage = watch("faceScanImage");

  // ── Upload helpers ───────────────────────────────────────────

  const uploadFaceBlob = async (blob) => {
    setUploading(true);
    try {
      const file = new File([blob], "face-scan.jpg", { type: "image/jpeg" });
      const res  = await fileUploader(file);
      if (res?.link) {
        setValue("faceScanImage", res.link, { shouldValidate: true });
        setValue("faceScan", true,          { shouldValidate: true });
        setFaceCaptured(true);
      } else {
        errorToast("Face scan upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Face upload failed:", err);
      errorToast("Face scan upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleManualUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await fileUploader(file);
      if (res?.link) {
        setValue("faceScanImage", res.link, { shouldValidate: true });
        setValue("faceScan", true,          { shouldValidate: true });
        setFaceCaptured(true);
      } else {
        errorToast("Face image upload failed. Please try again.");
      }
    } catch {
      errorToast("Face image upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleNoCamera = () => {
    setNoCamera(true);
    setShowFaceScan(false);
    errorToast("No camera detected. Please upload a face image instead.");
    fileInputRef.current?.click();
  };

  const handleRetake = () => {
    setValue("faceScanImage", "", { shouldValidate: false });
    setValue("faceScan", false,   { shouldValidate: false });
    setFaceCaptured(false);
    setShowFaceScan(false);
    setNoCamera(false);
  };

  return (
    <div className="authformWrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="authform">
          <Row>
            <Col lg={12}>

              {/* ── Already captured ── */}
              {faceCaptured && faceScanImage ? (
                <div className="mb-3">
                  <div
                    className="p-3 rounded text-center"
                    style={{ border: "1.5px solid #1D9E75", background: "#E1F5EE" }}
                  >
                    <p className="mb-2 fw-semibold" style={{ fontSize: 14, color: "#085041" }}>
                      ✓ Face scan captured
                    </p>
                    {/* Show thumbnail */}
                    <img
                      src={faceScanImage}
                      alt="Face scan preview"
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "2px solid #1D9E75",
                        display: "block",
                        margin: "0 auto 12px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRetake}
                      style={{
                        background: "none",
                        border: "1px solid #D85A30",
                        color: "#D85A30",
                        borderRadius: 6,
                        padding: "6px 16px",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Retake scan
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* ── Webcam scan UI ── */}
                  {!noCamera && (
                    <div className="buttonWraperMod d-flex align-items-center justify-content-center position-relative my-3">
                      <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                        <div className="outlineIcon">
                          <Cameraicon />
                        </div>
                        <div className="ClickContent text-center">
                          <p>Enable webcam for face verification</p>
                          <p className="text-muted" style={{ fontSize: 12 }}>
                            Make sure your face is clearly visible and well lit.
                          </p>
                        </div>
                        <Button
                          type="button"
                          className="facescanbutton px-4 py-2"
                          disabled={uploading}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowFaceScan(true);
                          }}
                        >
                          {uploading ? "Uploading…" : "Start Face Scan"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* ── No camera fallback ── */}
                  {noCamera && (
                    <div
                      className="mb-3 p-3 rounded text-center"
                      style={{ border: "1px solid #EF9F27", background: "#fffaf0" }}
                    >
                      <p className="mb-2" style={{ fontSize: 13, color: "#854F0B" }}>
                        No camera detected. Please upload a clear face photo instead.
                      </p>
                      <Button
                        type="button"
                        variant="outline-warning"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        {uploading ? "Uploading…" : "Upload face photo"}
                      </Button>
                    </div>
                  )}

                  {/* ── FaceScan webcam component ── */}
                  {showFaceScan && !noCamera && (
                    <div className="mb-3">
                      <FaceScan
                        onCapture={async (blob) => {
                          setShowFaceScan(false);
                          await uploadFaceBlob(blob);
                        }}
                        onNoCamera={handleNoCamera}
                      />
                    </div>
                  )}

                  {/* ── Manual upload option (always visible as fallback) ── */}
                  {!noCamera && !showFaceScan && (
                    <div className="text-center mb-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#6c757d",
                          fontSize: 12,
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {uploading ? "Uploading…" : "No camera? Upload a photo instead"}
                      </button>
                    </div>
                  )}

                  {/* Hidden file input for manual upload */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    hidden
                    onChange={handleManualUpload}
                  />
                </>
              )}
            </Col>

            {/* ── Info note ── */}
            <Col lg={12}>
              <div className="infoText mb-3">
                <p className="m-0" style={{ fontSize: 13 }}>
                  Your account will be reviewed by an admin after submission. You
                  will receive a notification once approved.
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="d-flex align-items-center gap-3 mt-3">
          <Button className="arroowBack" type="button" onClick={onBack}>
            <Arrowbackicon />
          </Button>
          <Buttontheme
            type="submit"
            className="w-100"
            disabled={!!isFormLoading || uploading}
          >
            {isFormLoading ? "Submitting…" : uploading ? "Uploading…" : "Submit"}
          </Buttontheme>
        </div>
      </form>
    </div>
  );
};

export default Step3;