// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { Button, Alert } from "react-bootstrap";

// const FaceScan = ({ onCapture }) => {
//   const webcamRef = useRef(null);
//   const [error, setError] = useState("");
//   const [captured, setCaptured] = useState(false);

//   const captureFace = async () => {
//     setError("");

//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (!imageSrc) {
//       setError("Camera not ready. Please allow camera access.");
//       return;
//     }

//     // convert base64 → Blob
//     const blob = await fetch(imageSrc).then((res) => res.blob());

//     setCaptured(true);
//     onCapture(blob);
//   };

//   return (
//     <div className="faceScanWrap">
//       <Webcam
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         videoConstraints={{ facingMode: "user" }}
//         mirrored
//         className="w-100 rounded"
//       />

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Button
//         type="button"
//         className="facescanbutton mt-2"
//         onClick={captureFace}
//         disabled={captured}
//       >
//         {captured ? "Face Captured ✔" : "Capture Face"}
//       </Button>
//     </div>
//   );
// };

// export default FaceScan;

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "react-bootstrap";

const FaceScan = ({ onCapture, onNoCamera }) => {
  const webcamRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(null);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideo = devices.some((device) => device.kind === "videoinput");

        setHasCamera(hasVideo);

        if (!hasVideo && onNoCamera) {
          onNoCamera();
        }
      } catch {
        setHasCamera(false);
        onNoCamera?.();
      }
    };

    checkCamera();
  }, [onNoCamera]);

  if (hasCamera === false) {
    return (
      <div className="text-center text-danger">
        <p>No camera detected on this device.</p>
        <p>Please upload a face image instead.</p>
      </div>
    );
  }

  if (hasCamera === null) {
    return <p className="text-center">Checking camera…</p>;
  }

  const captureFace = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    const blob = await fetch(imageSrc).then((res) => res.blob());
    onCapture(blob);
  };

  return (
    <div className="faceScanWrap">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "user" }}
        className="w-100 rounded"
      />

      <Button
        type="button"
        className="facescanbutton mt-2"
        onClick={captureFace}
      >
        Capture Face
      </Button>
    </div>
  );
};

export default FaceScan;
