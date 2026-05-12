// import React, { useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import Buttontheme from "../../../../Component/ui/Buttontheme";
// import { Row, Col, Button } from "react-bootstrap";
// import {
//   Arrowbackicon,
//   Cameraicon,
//   GallaryUploadicn,
//   Removeicon,
// } from "../../../../Assets/svg/Allsvgicons";
// import Textfield from "../../../../Component/ui/Formfields/Textfield";
// import Image from "next/image";

// const schema = Yup.object().shape({
//   upload: Yup.array()
//     .min(2, "Please upload front and back images")
//     .required("Government ID is required"),
// });

// const Step2 = (props) => {
//   const { onNext, onBack } = props;
//   const profileInputRef = useRef(null);
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const handleProfileClick = () => profileInputRef.current?.click();

//   const onRemove = (index) => {
//     const updatedFiles = [...files];
//     const updatedPreviews = [...previews];

//     updatedFiles.splice(index, 1);
//     updatedPreviews.splice(index, 1);

//     setFiles(updatedFiles);
//     setPreviews(updatedPreviews);
//   };
//   // ------------ Image Upload Handler ------------
//   const handleImageSelect = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (!selectedFiles.length) return;
//     const combinedFiles = [...files, ...selectedFiles];
//     if (combinedFiles.length > 2) {
//       alert("Only front & back images allowed");
//       return;
//     }
//     setFiles(combinedFiles);
//     const combinedPreviews = combinedFiles.map((file) =>
//       URL.createObjectURL(file)
//     );
//     setPreviews(combinedPreviews);
//   };

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       upload: "",
//       registerno: "",
//     },
//   });

//   const onSubmit = (data) => {
//     console.log("Form Submitted:", data);
//     onNext();
//   };
//   return (
//     <div className="authformWrap">
//       <form onSubmit={handleSubmit(onSubmit)} className="">
//         <div className="authform mt-4">
//           <Row>
//             <Col lg={12}>
//               <div className="mb-3">
//                 <label>Upload government ID (Front & Back)</label>

//                 <div
//                   className="buttonWraperMod d-flex align-items-center justify-content-center position-relative"
//                   style={{ cursor: "pointer" }}
//                   onClick={handleProfileClick}
//                 >
//                   <div className="d-flex flex-column align-items-center justify-content-center gap-2">
//                     <div className="outlineIcon">
//                       <GallaryUploadicn />
//                     </div>
//                     <div className="ClickContent text-center">
//                       <p>
//                         Drop your image or{" "}
//                         <span
//                           style={{ cursor: "pointer" }}
//                           className="theme_text fw-semibold"
//                         >
//                           browse
//                         </span>
//                       </p>
//                       <p className="m-0">JPG, PNG, GIF allowed</p>
//                     </div>
//                   </div>
//                 </div>

//                 <Controller
//                   name="upload"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       ref={profileInputRef}
//                       type="file"
//                       accept="image/png, image/jpeg, image/jpg"
//                       style={{ display: "none" }}
//                       multiple
//                       onChange={(e) => {
//                         handleImageSelect(e);
//                         field.onChange(Array.from(e.target.files));
//                       }}
//                     />
//                   )}
//                 />

//                 {/* Preview */}
//                 {previews.length > 0 && (
//                   <div className="images_list d-flex gap-2 mt-3">
//                     {previews.map((img, index) => (
//                       <div key={index} className="image_item position-relative">
//                         <Image
//                           src={img}
//                           alt={`Preview ${index}`}
//                           className="object-fit-contain"
//                           width={500}
//                           height={500}
//                         />
//                         <Button
//                           type="button"
//                           className="removebtn"
//                           onClick={() => onRemove(index)}
//                         >
//                           <Removeicon />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Validation */}
//                 {errors.banner && (
//                   <p className="text-danger m-0 mt-1">
//                     {errors.banner.message}
//                   </p>
//                 )}
//               </div>
//             </Col>

//             <Col lg={12}>
//               <div className="mb-3">
//                 <Controller
//                   name="registerno"
//                   control={control}
//                   render={({ field }) => (
//                     <div className="position-relative">
//                       <Textfield
//                         {...field}
//                         type="text"
//                         label="Voter registration number"
//                         value={{ ...field }.value || ""}
//                         placeholder="Enter registration number"
//                         error={errors.registerno?.message}
//                       />
//                     </div>
//                   )}
//                 />
//               </div>
//             </Col>

//             <Col lg={12}>
//               <div className="buttonWraperMod d-flex align-items-center justify-content-center position-relative my-3">
//                 <div className="d-flex flex-column align-items-center justify-content-center gap-2">
//                   <div className="outlineIcon">
//                     <Cameraicon />
//                   </div>
//                   <div className="ClickContent text-center">
//                     <p>Enable webcam for face scan</p>
//                   </div>
//                   <Button type="button" className="facescanbutton px-3 px-2">
//                     Start Face Scan
//                   </Button>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </div>

//         {/* Login Button */}
//         <div className="d-flex align-items-center gap-3 mt-3">
//           <Button className="arroowBack" onClick={onBack}>
//             <Arrowbackicon />
//           </Button>
//           <Buttontheme type="submit" className="w-100 " onClick={onSubmit}>
//             Save & Next
//           </Buttontheme>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Step2;

// import React, { useRef, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import Buttontheme from "../../../../Component/ui/Buttontheme";
// import { Row, Col, Button } from "react-bootstrap";
// import {
//   Arrowbackicon,
//   Cameraicon,
//   GallaryUploadicn,
//   Removeicon,
// } from "../../../../Assets/svg/Allsvgicons";
// import Textfield from "../../../../Component/ui/Formfields/Textfield";
// import Image from "next/image";

// const uploadImageAPI = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const res = await fetch("/api/upload", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Upload failed");

//   return res.json();
// };

// const Step2 = ({ onNext, onBack }) => {
//   const profileInputRef = useRef(null);

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const handleProfileClick = () => profileInputRef.current?.click();

//   const onRemove = (index) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     const updatedPreviews = previews.filter((_, i) => i !== index);

//     setFiles(updatedFiles);
//     setPreviews(updatedPreviews);

//     setValue("upload", updatedFiles, { shouldValidate: true });
//   };

//   const handleImageSelect = async (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (!selectedFiles.length) return;

//     const combinedFiles = [...files, ...selectedFiles];
//     if (combinedFiles.length > 2) {
//       alert("Only front & back images allowed");
//       return;
//     }

//     setUploading(true);

//     try {
//       const uploadedResults = [];

//       for (const file of selectedFiles) {
//         const response = await uploadImageAPI(file);
//         uploadedResults.push(response.data.url);
//       }

//       const updatedFiles = [...files, ...uploadedResults];
//       setFiles(updatedFiles);
//       setPreviews(updatedFiles);
//       setValue("upload", updatedFiles, { shouldValidate: true });
//     } catch (err) {
//       console.error(err);
//       alert("Image upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSubmit = () => {
//     onNext();
//   };

//   return (
//     <div className="authformWrap">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="authform mt-4">
//           <Row>
//             <Col lg={12}>
//               <div className="mb-3">
//                 <label>Upload government ID (Front & Back)</label>

//                 <div
//                   className="buttonWraperMod d-flex align-items-center justify-content-center position-relative"
//                   style={{ cursor: "pointer" }}
//                   onClick={handleProfileClick}
//                 >
//                   <div className="d-flex flex-column align-items-center justify-content-center gap-2">
//                     <div className="outlineIcon">
//                       <GallaryUploadicn />
//                     </div>
//                     <div className="ClickContent text-center">
//                       <p>
//                         Drop your image or{" "}
//                         <span className="theme_text fw-semibold">browse</span>
//                       </p>
//                       <p className="m-0">JPG, PNG, GIF allowed</p>
//                     </div>
//                   </div>
//                 </div>

//                 <Controller
//                   name="upload"
//                   control={control}
//                   rules={{
//                     required: "Government ID is required",
//                     validate: (v) =>
//                       v?.length === 2 || "Please upload front & back images",
//                   }}
//                   render={() => (
//                     <input
//                       ref={profileInputRef}
//                       type="file"
//                       accept="image/png, image/jpeg, image/jpg"
//                       style={{ display: "none" }}
//                       multiple
//                       onChange={handleImageSelect}
//                     />
//                   )}
//                 />

//                 {previews.length > 0 && (
//                   <div className="images_list d-flex gap-2 mt-3">
//                     {previews.map((img, index) => (
//                       <div key={index} className="image_item position-relative">
//                         <Image
//                           src={img}
//                           alt={`Preview ${index}`}
//                           className="object-fit-contain"
//                           width={500}
//                           height={500}
//                         />
//                         <Button
//                           type="button"
//                           className="removebtn"
//                           onClick={() => onRemove(index)}
//                         >
//                           <Removeicon />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {errors.upload && (
//                   <p className="text-danger m-0 mt-1">
//                     {errors.upload.message}
//                   </p>
//                 )}
//               </div>
//             </Col>

//             <Col lg={12}>
//               <div className="mb-3">
//                 <Controller
//                   name="registerno"
//                   control={control}
//                   rules={{ required: "Registration number is required" }}
//                   render={({ field }) => (
//                     <Textfield
//                       {...field}
//                       type="text"
//                       label="Voter registration number"
//                       value={field.value || ""}
//                       placeholder="Enter registration number"
//                       error={errors.registerno?.message}
//                     />
//                   )}
//                 />
//               </div>
//             </Col>

//             <Col lg={12}>
//               <div className="buttonWraperMod d-flex align-items-center justify-content-center position-relative my-3">
//                 <div className="d-flex flex-column align-items-center justify-content-center gap-2">
//                   <div className="outlineIcon">
//                     <Cameraicon />
//                   </div>
//                   <div className="ClickContent text-center">
//                     <p>Enable webcam for face scan</p>
//                   </div>
//                   <Button type="button" className="facescanbutton px-3 px-2">
//                     Start Face Scan
//                   </Button>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </div>

//         <div className="d-flex align-items-center gap-3 mt-3">
//           <Button type="button" className="arroowBack" onClick={onBack}>
//             <Arrowbackicon />
//           </Button>

//           <Buttontheme type="submit" className="w-100" disabled={uploading}>
//             {uploading ? "Uploading..." : "Save & Next"}
//           </Buttontheme>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Step2;

// import React, { useRef, useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import Buttontheme from "../../../../Component/ui/Buttontheme";
// import { Row, Col, Button } from "react-bootstrap";
// import {
//   Arrowbackicon,
//   Cameraicon,
//   GallaryUploadicn,
//   Removeicon,
// } from "../../../../Assets/svg/Allsvgicons";
// import Textfield from "../../../../Component/ui/Formfields/Textfield";
// import Image from "next/image";
// import FaceScan from "./Facescan.jsx";
// import fileUploader from "../../../../Utilities/FileUpload.js";

// const Step2 = ({ onNext, onBack }) => {
//   const profileInputRef = useRef(null);

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useFormContext();

//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [showFaceScan, setShowFaceScan] = useState(false);

//   const handleProfileClick = () => profileInputRef.current?.click();

//   const onRemove = (index) => {
//     const updatedFiles = files.filter((_, i) => i !== index);
//     setFiles(updatedFiles);
//     setPreviews(updatedFiles);
//     setValue("upload", updatedFiles, { shouldValidate: true });
//   };

//   const handleImageSelect = async (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (!selectedFiles.length) return;

//     if (files.length + selectedFiles.length > 2) {
//       alert("Only front & back images allowed");
//       return;
//     }

//     setUploading(true);

//     try {
//       const uploadedUrls = [];

//       for (const file of selectedFiles) {
//         const res = await fileUploader(file);
//         if (res?.link) {
//           uploadedUrls.push(res.link);
//         }
//       }

//       const updatedFiles = [...files, ...uploadedUrls];
//       setFiles(updatedFiles);
//       setPreviews(updatedFiles);
//       setValue("upload", updatedFiles, { shouldValidate: true });
//     } catch (error) {
//       console.error("Upload error:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFaceCapture = async (blob) => {
//     setUploading(true);
//     try {
//       const file = new File([blob], "face-scan.jpg", { type: "image/jpeg" });
//       const res = await fileUploader(file);
//       if (res?.url) {
//         setValue("faceScanImage", res.link, { shouldValidate: true });
//       }
//     } catch (error) {
//       console.error("Face upload failed:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSubmit = () => onNext();

//   return (
//     <div className="authformWrap">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="authform mt-4">
//           <Row>
//             <Col lg={12}>
//               <div className="mb-3">
//                 <label>Upload government ID (Front & Back)</label>

//                 <div
//                   className="buttonWraperMod d-flex align-items-center justify-content-center position-relative"
//                   style={{ cursor: "pointer" }}
//                   onClick={handleProfileClick}
//                 >
//                   <div className="d-flex flex-column align-items-center justify-content-center gap-2">
//                     <div className="outlineIcon">
//                       <GallaryUploadicn />
//                     </div>
//                     <div className="ClickContent text-center">
//                       <p>
//                         Drop your image or{" "}
//                         <span className="theme_text fw-semibold">browse</span>
//                       </p>
//                       <p className="m-0">JPG, PNG, GIF allowed</p>
//                     </div>
//                   </div>
//                 </div>

//                 <Controller
//                   name="upload"
//                   control={control}
//                   rules={{
//                     required: "Government ID is required",
//                     validate: (v) =>
//                       v?.length === 2 || "Please upload front & back images",
//                   }}
//                   render={() => (
//                     <input
//                       ref={profileInputRef}
//                       type="file"
//                       accept="image/png, image/jpeg, image/jpg"
//                       hidden
//                       multiple
//                       onChange={handleImageSelect}
//                     />
//                   )}
//                 />

//                 {previews.length > 0 && (
//                   <div className="images_list d-flex gap-2 mt-3">
//                     {previews.map((img, index) => (
//                       <div key={index} className="image_item position-relative">
//                         <Image
//                           src={img}
//                           alt={`Preview ${index}`}
//                           width={500}
//                           height={500}
//                           className="object-fit-contain"
//                         />
//                         <Button
//                           type="button"
//                           className="removebtn"
//                           onClick={() => onRemove(index)}
//                         >
//                           <Removeicon />
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {errors.upload && (
//                   <p className="text-danger m-0 mt-1">
//                     {errors.upload.message}
//                   </p>
//                 )}
//               </div>
//             </Col>

//             <Col lg={12}>
//               <div className="mb-3">
//                 <Controller
//                   name="registerno"
//                   control={control}
//                   rules={{ required: "Registration number is required" }}
//                   render={({ field }) => (
//                     <Textfield
//                       {...field}
//                       type="text"
//                       label="Voter registration number"
//                       placeholder="Enter registration number"
//                       error={errors.registerno?.message}
//                     />
//                   )}
//                 />
//               </div>
//             </Col>

//             <Col lg={12}>
//               <div className="buttonWraperMod d-flex align-items-center justify-content-center position-relative my-3">
//                 <div className="d-flex flex-column align-items-center justify-content-center gap-2">
//                   <div className="outlineIcon">
//                     <Cameraicon />
//                   </div>
//                   <div className="ClickContent text-center">
//                     <p>Enable webcam for face scan</p>
//                   </div>
//                   <Button
//                     type="button"
//                     className="facescanbutton px-3 px-2"
//                     onClick={() => setShowFaceScan(true)}
//                   >
//                     Start Face Scan
//                   </Button>
//                 </div>
//               </div>

//               {showFaceScan && (
//                 <FaceScan
//                   onCapture={async (blob) => {
//                     await handleFaceCapture(blob);
//                     setShowFaceScan(false);
//                   }}
//                 />
//               )}
//             </Col>
//           </Row>
//         </div>

//         <div className="d-flex align-items-center gap-3 mt-3">
//           <Button type="button" className="arroowBack" onClick={onBack}>
//             <Arrowbackicon />
//           </Button>

//           <Buttontheme type="submit" className="w-100" disabled={uploading}>
//             {uploading ? "Uploading..." : "Save & Next"}
//           </Buttontheme>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Step2;

import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import { Row, Col, Button } from "react-bootstrap";
import {
  Arrowbackicon,
  Cameraicon,
  GallaryUploadicn,
  Removeicon,
} from "../../../../Assets/svg/Allsvgicons";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import Image from "next/image";
import dynamic from "next/dynamic";
import fileUploader from "../../../../Utilities/FileUpload.js";

const FaceScan = dynamic(() => import("./Facescan.jsx"), {
  ssr: false,
});

const Step2 = ({ onNext, onBack }) => {
  const profileInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadingType, setUploadingType] = useState(null);
  const [showFaceScan, setShowFaceScan] = useState(false);
  const [noCamera, setNoCamera] = useState(false);

  // ---------------- CLICK FILE INPUT ----------------
  const handleProfileClick = () => profileInputRef.current?.click();

  // ---------------- REMOVE IMAGE ----------------
  const onRemove = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    setPreviews(updated);
    setValue("governmentIdImages", updated, { shouldValidate: true });
  };

  // ---------------- GOVERNMENT ID UPLOAD ----------------
  const handleImageSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    if (files.length + selectedFiles.length > 2) {
      alert("Only front & back images allowed");
      return;
    }

    setUploading(true);
    setUploadingType("id");

    try {
      const uploadedUrls = [];

      for (const file of selectedFiles) {
        const res = await fileUploader(file);
        if (res?.link) {
          uploadedUrls.push(res.link);
        }
      }

      const updated = [...files, ...uploadedUrls];
      setFiles(updated);
      setPreviews(updated);
      setValue("governmentIdImages", updated, { shouldValidate: true });
    } catch (err) {
      console.error("Document upload failed:", err);
    } finally {
      setUploading(false);
      setUploadingType(null);
    }
  };

  // ---------------- FACE SCAN UPLOAD ----------------
  const handleFaceCapture = async (blob) => {
    setUploading(true);
    setUploadingType("face");

    try {
      const file = new File([blob], "face-scan.jpg", {
        type: "image/jpeg",
      });

      const res = await fileUploader(file);
      if (res?.link) {
        setValue("faceScanImage", res.link, { shouldValidate: true });
      }
    } catch (err) {
      console.error("Face upload failed:", err);
    } finally {
      setUploading(false);
      setUploadingType(null);
    }
  };

  // ---------------- SUBMIT ----------------
  const onSubmit = () => onNext();

  return (
    <div className="authformWrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="authform mt-4">
          <Row>
            {/* ================= GOV ID ================= */}
            <Col lg={12}>
              <div className="mb-3">
                <label>Upload government ID (Front & Back)</label>

                <div
                  className="buttonWraperMod d-flex align-items-center justify-content-center position-relative"
                  style={{ cursor: "pointer" }}
                  onClick={handleProfileClick}
                >
                  <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                    <div className="outlineIcon">
                      <GallaryUploadicn />
                    </div>
                    <div className="ClickContent text-center">
                      <p>
                        Drop your image or{" "}
                        <span className="theme_text fw-semibold">browse</span>
                      </p>
                      <p className="m-0">JPG, PNG, GIF allowed</p>
                    </div>
                  </div>
                </div>

                <Controller
                  name="governmentIdImages"
                  control={control}
                  rules={{
                    required: "Please upload your government ID",
                    validate: (v) =>
                      v?.length === 2 || "Please upload front & back images",
                  }}
                  render={() => (
                    <input
                      ref={profileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      hidden
                      multiple
                      onChange={handleImageSelect}
                    />
                  )}
                />

                {previews.length > 0 && (
                  <div className="images_list d-flex gap-2 mt-3">
                    {previews.map((img, index) => (
                      <div key={index} className="image_item position-relative">
                        <Image
                          src={img}
                          alt={`Preview ${index}`}
                          width={500}
                          height={500}
                          className="object-fit-contain"
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

                {errors.governmentIdImages && (
                  <p className="text-danger m-0 mt-1">
                    {errors.governmentIdImages.message}
                  </p>
                )}
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3">
                <Controller
                  name="voterNumber"
                  control={control}
                  rules={{ required: "Registration number is required" }}
                  render={({ field }) => (
                    <Textfield
                      {...field}
                      type="text"
                      label="Voter registration number"
                      placeholder="Enter registration number"
                      error={errors.voterNumber?.message}
                    />
                  )}
                />
              </div>
            </Col>

            {/* ================= FACE SCAN ================= */}
            <Col lg={12}>
              <div className="buttonWraperMod d-flex align-items-center justify-content-center position-relative my-3">
                <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                  <div className="outlineIcon">
                    <Cameraicon />
                  </div>
                  <div className="ClickContent text-center">
                    <p>Enable webcam for face scan</p>
                  </div>
                  <Button
                    type="button"
                    className="facescanbutton px-3 px-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowFaceScan(true);
                    }}
                  >
                    Start Face Scan
                  </Button>
                </div>
              </div>

              {showFaceScan && !noCamera && (
                <FaceScan
                  onCapture={async (blob) => {
                    await handleFaceCapture(blob);
                    setShowFaceScan(false);
                  }}
                  onNoCamera={() => {
                    setNoCamera(true);
                    setShowFaceScan(false);
                  }}
                />
              )}
            </Col>
          </Row>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="d-flex align-items-center gap-3 mt-3">
          <Button type="button" className="arroowBack" onClick={onBack}>
            <Arrowbackicon />
          </Button>

          <Buttontheme type="submit" className="w-100" disabled={uploading}>
            {uploading
              ? uploadingType === "face"
                ? "Uploading Face Scan..."
                : "Uploading Documents..."
              : "Save & Next"}
          </Buttontheme>
        </div>
      </form>
    </div>
  );
};

export default Step2;
