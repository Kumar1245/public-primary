// import React, { useEffect, useRef, useState } from "react";
// import {
//   Controller,
//   useFormContext,
//   useFieldArray,
//   useForm,
// } from "react-hook-form";
// import Buttontheme from "../../../../Component/ui/Buttontheme";
// import { Row, Col, Button } from "react-bootstrap";
// import { Dropdown } from "primereact/dropdown";

// import {
//   Arrowbackicon,
//   GallaryUploadicn,
//   Removeicon,
// } from "../../../../Assets/svg/Allsvgicons";
// import Textfield from "../../../../Component/ui/Formfields/Textfield";
// import Image from "next/image";
// import fileUploader from "../../../../Utilities/FileUpload.js";
// import PhoneInput from "react-phone-input-2";
// import { getMetaValue } from "../../../../Utilities/extractMeta.js";
// import moment from "moment";
// import { UPDATE_RESUME } from "../../../../services/ApiCalls.js";
// import {
//   errorToast,
//   successToast,
// } from "../../../../Utilities/toastsMessages.js";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// const ResumeCardEditComp = (props) => {
//   const { candidate, setResumeedit, refetch } = props;
//   const resumeDetail = candidate?.resume;
//   const [isFormLoading, setFormLoading] = useState(false);

//   const resumeSchema = Yup.object({
//     resumeName: Yup.string().required("Full name is required"),
//     verifiername: Yup.string().required("Enter Verified By is required"),
//     verificationType: Yup.string()
//       .oneOf(["self", "company"])
//       .required("Verification type is required"),

//     meetsRequirements: Yup.boolean()
//       .nullable()
//       .required("Please confirm eligibility"),

//     politicalPartyAssociated: Yup.boolean()
//       .nullable()
//       .required("Please select political association"),

//     businessAssociation: Yup.boolean()
//       .nullable()
//       .required("Please select business association"),

//     education: Yup.array()
//       .of(
//         Yup.object({
//           degree: Yup.string().required("Degree is required"),
//           university: Yup.string().required("University is required"),
//           startYear: Yup.number()
//             .typeError("Start year must be a number")
//             .required("Start year is required"),
//           endYear: Yup.number()
//             .typeError("End year must be a number")
//             .min(
//               Yup.ref("startYear"),
//               "End year must be greater than start year",
//             )
//             .required("End year is required"),
//         }),
//       )
//       .min(1, "At least one education entry is required"),

//     workHistory: Yup.array()
//       .of(
//         Yup.object({
//           description: Yup.string().required("Work description is required"),
//         }),
//       )
//       .min(1, "At least one work history entry is required"),

//     // keyPriorities: Yup.array()
//     //   .of(
//     //     Yup.object({
//     //       description: Yup.string().required("Priority is required"),
//     //     }),
//     //   )
//     //   .min(1, "At least one key priority is required"),

//     achievements: Yup.array()
//       .of(
//         Yup.object({
//           description: Yup.string().required("Achievement is required"),
//         }),
//       )
//       .min(1, "At least one achievement is required"),

//     drugTest: Yup.object({
//       result: Yup.string().required("Drug test result is required"),
//       date: Yup.date().nullable().required("Drug test date is required"),
//       company: Yup.string().required("Testing company is required"),
//     }),

//     competencyTest: Yup.object({
//       result: Yup.string().required("Competency test result is required"),
//       date: Yup.date().nullable().required("Competency test date is required"),
//       company: Yup.string().required("Testing company is required"),
//     }),
//   });

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//     resolver: yupResolver(resumeSchema),
//     defaultValues: {
//       resumeName: "",
//       verificationType: "self",

//       meetsRequirements: null,
//       politicalPartyAssociated: null,
//       businessAssociation: null,
//       education: [
//         {
//           degree: "",
//           university: "",
//           startYear: "",
//           endYear: "",
//         },
//       ],
//       workHistory: [
//         {
//           description: "",
//         },
//       ],
//       keyPriorities: [
//         {
//           description: "",
//         },
//       ],
//       achievements: [
//         {
//           description: "",
//         },
//       ],
//       drugTest: {
//         result: "",
//         date: null,
//         company: "",
//       },
//       competencyTest: {
//         result: "",
//         date: null,
//         company: "",
//       },
//     },
//   });

//   const {
//     fields: educationFields,
//     append: addEducation,
//     remove: removeEducation,
//   } = useFieldArray({
//     control,
//     name: "education",
//   });

//   // Work History
//   const {
//     fields: workFields,
//     append: addWork,
//     remove: removeWork,
//   } = useFieldArray({
//     control,
//     name: "workHistory",
//   });

//   const {
//     fields: keyPrioritiesFields,
//     append: addkeyPriorities,
//     remove: removekeyPriorities,
//   } = useFieldArray({
//     control,
//     name: "keyPriorities",
//   });

//   const {
//     fields: achievementsFields,
//     append: addAchievements,
//     remove: removeAchievements,
//   } = useFieldArray({
//     control,
//     name: "achievements",
//   });

//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     setValue("resumeName", resumeDetail?.name);
//     setValue(
//       "verifiername",
//       getMetaValue(candidate?.meta_data, "verifier_name"),
//     );
//     setValue("verificationType", resumeDetail?.verificationType);
//     setValue("meetsRequirements", resumeDetail?.meetsStateCountyRequirements);
//     setValue(
//       "politicalPartyAssociated",
//       resumeDetail?.politicalPartyAssociated,
//     );
//     setValue("businessAssociation", resumeDetail?.businessOrLobbyAssociation);
//     setValue("education", resumeDetail?.education);
//     setValue("workHistory", resumeDetail?.workHistory);
//     setValue("keyPriorities", resumeDetail?.keyPriorities);
//     setValue("achievements", resumeDetail?.achievements);
//     setValue("drugTest", resumeDetail?.drugTest);
//     setValue(
//       "drugTest.date",
//       moment(resumeDetail?.drugTest?.date).format("YYYY-MM-DD"),
//     );
//     setValue("competencyTest", resumeDetail?.competencyTest);
//     setValue(
//       "competencyTest.date",
//       moment(resumeDetail?.competencyTest?.date).format("YYYY-MM-DD"),
//     );
//     setValue(
//       "campaignVideo",
//       getMetaValue(candidate?.meta_data, "current_campaign_video"),
//     );
//     setValue(
//       "introductoryVideo",
//       getMetaValue(candidate?.meta_data, "permanent_introductory_video"),
//     );
//   }, [candidate]);

//   const onSubmit = async (data) => {
//     const payload = {
//       resumeName: data?.resumeName,
//       verificationType: data?.verificationType,

//       meetsRequirements: data?.meetsRequirements,
//       politicalPartyAssociated: data?.politicalPartyAssociated,
//       businessAssociation: data?.businessAssociation,

//       // 🔹 Dynamic arrays
//       education: data?.education,
//       workHistory: data?.workHistory,

//       keyPriorities: data?.keyPriorities,
//       achievements: data?.achievements,

//       // 🔹 Drug Test
//       drugTest: data?.drugTest,

//       // 🔹 Competency Test
//       competencyTest: data?.competencyTest,
//     };

//     try {
//       setFormLoading(true);
//       let res = await UPDATE_RESUME(payload);
//       console.log(res, "data======<> registeration");
//       if (res?.data?.status === "success") {
//         successToast(res?.data?.message);
//         refetch();
//         setResumeedit(false);
//         setFormLoading(false);
//       } else {
//         errorToast(res?.data?.message);
//         setFormLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="resumeEditForm mt-4">
//           <Row>
//             <Col lg={6} md={6} sm={12} className="mt-2">
//               <Controller
//                 name="resumeName"
//                 control={control}
//                 rules={{ required: "Full name is required" }}
//                 render={({ field }) => (
//                   <Textfield
//                     {...field}
//                     label="Full Name"
//                     placeholder="Enter Full Name"
//                   />
//                 )}
//               />
//               {errors.resumeName && (
//                 <p className="text-danger mt-1">{errors.resumeName.message}</p>
//               )}
//             </Col>
//             <Col lg={6} md={6} sm={12} className="mt-2">
//               <Controller
//                 name="verifiername"
//                 control={control}
//                 render={({ field }) => (
//                   <Textfield
//                     {...field}
//                     label="Verified By"
//                     placeholder="Enter Verified By"
//                   />
//                 )}
//               />
//               {errors.verifiername && (
//                 <p className="text-danger mt-1">
//                   {errors.verifiername.message}
//                 </p>
//               )}
//             </Col>
//             <Col lg={6} md={6} sm={12} className="mt-2">
//               <label className="form-label">Select Verification Type</label>
//               <Controller
//                 name="verificationType"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="position-relative">
//                     <Dropdown
//                       {...field}
//                       placeholder="Verification Type"
//                       optionLabel="label"
//                       optionValue="value"
//                       options={[
//                         { label: "Self Verified", value: "self" },
//                         { label: "Company Verified", value: "company" },
//                       ]}
//                       className="w-100 text_input"
//                     />
//                   </div>
//                 )}
//               />
//               {errors.verificationType && (
//                 <p className="text-danger mt-1">
//                   {errors.verificationType.message}
//                 </p>
//               )}
//             </Col>
//             <Col lg={6} md={6} sm={12} className="mt-2">
//               <label className="form-label">
//                 Have you met minimum state and county requirements to run for
//                 this office?
//               </label>

//               <Controller
//                 name="meetsRequirements"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="position-relative">
//                     <Dropdown
//                       {...field}
//                       placeholder="Meets State & County Requirements"
//                       optionLabel="label"
//                       optionValue="value"
//                       options={[
//                         { label: "Yes", value: true },
//                         { label: "No", value: false },
//                       ]}
//                       className="w-100 text_input"
//                     />
//                   </div>
//                 )}
//               />
//               {errors.meetsRequirements && (
//                 <p className="text-danger mt-1">
//                   {errors.meetsRequirements.message}
//                 </p>
//               )}
//             </Col>
//             <Col lg={6} md={6} sm={12} className="mt-2">
//               <label className="form-label">
//                 Are you associated with a political party? Do not include which
//                 party if associated.
//               </label>

//               <Controller
//                 name="politicalPartyAssociated"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="position-relative">
//                     <Dropdown
//                       {...field}
//                       placeholder="Political Party Association"
//                       optionLabel="label"
//                       optionValue="value"
//                       options={[
//                         { label: "Yes", value: true },
//                         { label: "No", value: false },
//                       ]}
//                       className="w-100 text_input"
//                     />
//                   </div>
//                 )}
//               />
//               {errors.politicalPartyAssociated && (
//                 <p className="text-danger mt-1">
//                   {errors.politicalPartyAssociated.message}
//                 </p>
//               )}
//             </Col>
//             <Col lg={6} md={6} sm={12} className="mt-2">
//               <label className="form-label">
//                 Are you associated with any business or lobby that could benefit
//                 financially?
//               </label>

//               <Controller
//                 name="businessAssociation"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="position-relative">
//                     <Dropdown
//                       {...field}
//                       placeholder="Business / Lobby Association"
//                       optionLabel="label"
//                       optionValue="value"
//                       options={[
//                         { label: "Yes", value: true },
//                         { label: "No", value: false },
//                       ]}
//                       className="w-100 text_input"
//                     />
//                   </div>
//                 )}
//               />
//               {errors.businessAssociation && (
//                 <p className="text-danger mt-1">
//                   {errors.businessAssociation.message}
//                 </p>
//               )}
//             </Col>

//             {/* <Col lg={12} className="mt-4">
//               <h5>Education</h5>
//             </Col> */}
//             {educationFields.map((item, index) => (
//               <React.Fragment key={item.id}>
//                 <Col
//                   lg={12}
//                   className="mt-4 d-flex align-items-center gap-3 justify-content-between"
//                 >
//                   <h4>Education</h4>
//                   <Button
//                     variant="outline-danger"
//                     size="md"
//                     className=" py-2 removeBtn"
//                     onClick={() => removeEducation(index)}
//                   >
//                     Remove Education
//                   </Button>
//                 </Col>
//                 <Col lg={6} md={6} sm={12}>
//                   <Controller
//                     name={`education.${index}.degree`}
//                     control={control}
//                     render={({ field }) => (
//                       <Textfield
//                         {...field}
//                         label="Degree"
//                         placeholder="Enter Degree"
//                       />
//                     )}
//                   />
//                   {errors.education?.[index]?.degree && (
//                     <p className="text-danger mt-1">
//                       {errors.education[index].degree.message}
//                     </p>
//                   )}
//                 </Col>

//                 <Col lg={6} md={6} sm={12}>
//                   <Controller
//                     name={`education.${index}.university`}
//                     control={control}
//                     render={({ field }) => (
//                       <Textfield
//                         {...field}
//                         label="University / Institution"
//                         placeholder="Enter University / Institution"
//                       />
//                     )}
//                   />
//                   {errors.education?.[index]?.university && (
//                     <p className="text-danger mt-1">
//                       {errors.education[index].university.message}
//                     </p>
//                   )}
//                 </Col>

//                 <Col llg={6} md={6} sm={12}>
//                   <Controller
//                     name={`education.${index}.startYear`}
//                     control={control}
//                     render={({ field }) => (
//                       <Textfield
//                         {...field}
//                         label="Start Year"
//                         type="number"
//                         placeholder="Enter Start Year"
//                       />
//                     )}
//                   />
//                   {errors.education?.[index]?.startYear && (
//                     <p className="text-danger mt-1">
//                       {errors.education[index].startYear.message}
//                     </p>
//                   )}
//                 </Col>

//                 <Col lg={6} md={6} sm={12}>
//                   <Controller
//                     name={`education.${index}.endYear`}
//                     control={control}
//                     render={({ field }) => (
//                       <Textfield
//                         {...field}
//                         label="End Year"
//                         type="number"
//                         placeholder="Enter End Year"
//                       />
//                     )}
//                   />
//                   {errors.education?.[index]?.endYear && (
//                     <p className="text-danger mt-1">
//                       {errors.education[index].endYear.message}
//                     </p>
//                   )}
//                 </Col>

//                 {/* <Col lg={12} className="text-end mt-2">
                  
//                 </Col> */}
//               </React.Fragment>
//             ))}

//             <Col lg={12} className="text-end mt-2">
//               <Button
//                 variant="outline-primary"
//                 size="md"
//                 className=" py-2 theme_border theme_text rounded font-semibold"
//                 onClick={() =>
//                   addEducation({
//                     degree: "",
//                     field: "",
//                     university: "",
//                     startYear: "",
//                     endYear: "",
//                   })
//                 }
//               >
//                 + Add Education
//               </Button>
//             </Col>

//             {workFields.map((item, index) => (
//               <React.Fragment key={item.id}>
//                 <Col
//                   lg={12}
//                   className="mt-4 d-flex align-items-center gap-3 justify-content-between"
//                 >
//                   <h4>Work History</h4>
//                   <Button
//                     variant="outline-danger"
//                     size="md"
//                     className="py-2 removeBtn"
//                     onClick={() => removeWork(index)}
//                   >
//                     Remove Work
//                   </Button>
//                 </Col>
//                 <Col lg={12}>
//                   <Controller
//                     name={`workHistory.${index}.description`}
//                     control={control}
//                     render={({ field }) => (
//                       <Textfield
//                         {...field}
//                         label={`Work ${index + 1}`}
//                         placeholder="Enter Work History"
//                       />
//                     )}
//                   />
//                   {errors.workHistory?.[index]?.description && (
//                     <p className="text-danger mt-1">
//                       {errors.workHistory[index].description.message}
//                     </p>
//                   )}
//                 </Col>
//               </React.Fragment>
//             ))}
//             <Col lg={12} className="text-end mt-2">
//               <Button
//                 variant="outline-primary"
//                 size="md"
//                 className="py-2 theme_border theme_text rounded font-semibold"
//                 onClick={() =>
//                   addWork({
//                     description: "",
//                   })
//                 }
//               >
//                 + Add Work History
//               </Button>
//             </Col>

//             {/* {keyPrioritiesFields.map((item, index) => (
//               <React.Fragment key={item.id}>
//                 <Col
//                   lg={12}
//                   className="mt-4 d-flex align-items-center gap-3 justify-content-between"
//                 >
//                   <h4>Key Priorities</h4>
//                   <Button
//                     variant="outline-danger"
//                     size="md"
//                     className="py-2 removeBtn"
//                     onClick={() => removekeyPriorities(index)}
//                   >
//                     Remove Key Priority
//                   </Button>
//                 </Col>
//                 <Col lg={12}>
//                   <Controller
//                     name={`keyPriorities.${index}.description`}
//                     control={control}
//                     render={({ field }) => (
//                       <Textfield
//                         {...field}
//                         label={`Key ${index + 1}`}
//                         placeholder="Enter Key Priority"
//                       />
//                     )}
//                   />
//                   {errors.keyPriorities?.[index]?.description && (
//                     <p className="text-danger mt-1">
//                       {errors.keyPriorities[index].description.message}
//                     </p>
//                   )}
//                 </Col>
//               </React.Fragment>
//             ))} */}
//             <Col lg={12} className="text-end mt-2">
//               <Button
//                 variant="outline-primary"
//                 size="md"
//                 className="py-2 theme_border theme_text  rounded font-semibold"
//                 onClick={() =>
//                   addkeyPriorities({
//                     description: "",
//                   })
//                 }
//               >
//                 + Add Key Priorities
//               </Button>
//             </Col>

//             {achievementsFields.map((item, index) => (
//               <React.Fragment key={item.id}>
//                 <Col
//                   lg={12}
//                   className="mt-4 d-flex align-items-center gap-3 justify-content-between"
//                 >
//                   <h4>Achievements</h4>
//                   <Button
//                     variant="outline-danger"
//                     size="md"
//                     className="py-2 removeBtn"
//                     onClick={() => removeAchievements(index)}
//                   >
//                     Remove achievements
//                   </Button>
//                 </Col>
//                 <Col lg={12}>
//                   <Controller
//                     name={`achievements.${index}.description`}
//                     control={control}
//                     render={({ field }) => (
//                       <Textfield
//                         {...field}
//                         label={`Key ${index + 1}`}
//                         placeholder="Enter Achievements"
//                       />
//                     )}
//                   />
//                   {errors.achievements?.[index]?.description && (
//                     <p className="text-danger mt-1">
//                       {errors.achievements[index].description.message}
//                     </p>
//                   )}
//                 </Col>
//               </React.Fragment>
//             ))}
//             <Col lg={12} className="text-end mt-2">
//               <Button
//                 variant="outline-primary"
//                 size="md"
//                 className="py-2 theme_border theme_text rounded font-semibold"
//                 onClick={() =>
//                   addAchievements({
//                     description: "",
//                   })
//                 }
//               >
//                 + Add achievements
//               </Button>
//             </Col>

//             {/* ================= DRUG TEST ================= */}
//             <Col lg={12} className="mt-4">
//               <h5 className="fw-semibold">Drug Test</h5>
//             </Col>
//             <Col lg={4}>
//               <label className="form-label">Select Result</label>
//               <Controller
//                 name="drugTest.result"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="position-relative">
//                     <Dropdown
//                       placeholder="Result"
//                       optionLabel="label"
//                       optionValue="value"
//                       options={[
//                         { label: "Passed", value: "passed" },
//                         { label: "Failed", value: "failed" },
//                       ]}
//                       value={field.value}
//                       onChange={field.onChange}
//                       className="w-100 text_input"
//                     />
//                   </div>
//                 )}
//               />
//               {errors.drugTest?.result && (
//                 <p className="text-danger mt-1">
//                   {errors.drugTest.result.message}
//                 </p>
//               )}
//             </Col>

//             <Col lg={4}>
//               <Controller
//                 name="drugTest.date"
//                 control={control}
//                 render={({ field }) => (
//                   <Textfield {...field} label="Date" type="date" />
//                 )}
//               />
//               {errors.drugTest?.date && (
//                 <p className="text-danger mt-1">
//                   {errors.drugTest.date.message}
//                 </p>
//               )}
//             </Col>
//             <Col lg={4}>
//               <Controller
//                 name="drugTest.company"
//                 control={control}
//                 render={({ field }) => (
//                   <Textfield
//                     {...field}
//                     label="Company"
//                     placeholder="Lab or Organization name"
//                   />
//                 )}
//               />
//               {errors.drugTest?.company && (
//                 <p className="text-danger mt-1">
//                   {errors.drugTest.company.message}
//                 </p>
//               )}
//             </Col>
//             {/* ================= COMPETENCY TEST ================= */}
//             <Col lg={12} className="mt-4">
//               <h5 className="fw-semibold">Competency Test</h5>
//             </Col>

//             <Col lg={4}>
//               <label className="form-label">Select Result</label>
//               <Controller
//                 name="competencyTest.result"
//                 control={control}
//                 render={({ field }) => (
//                   <div className="position-relative">
//                     <Dropdown
//                       placeholder="Result"
//                       optionLabel="label"
//                       optionValue="value"
//                       options={[
//                         { label: "Passed", value: "passed" },
//                         { label: "Failed", value: "failed" },
//                       ]}
//                       value={field.value}
//                       onChange={field.onChange}
//                       className="w-100 text_input"
//                     />
//                   </div>
//                 )}
//               />
//               {errors.competencyTest?.result && (
//                 <p className="text-danger mt-1">
//                   {errors.competencyTest.result.message}
//                 </p>
//               )}
//             </Col>

//             <Col lg={4}>
//               <Controller
//                 name="competencyTest.date"
//                 control={control}
//                 render={({ field }) => (
//                   <Textfield {...field} label="Date" type="date" />
//                 )}
//               />
//               {errors.competencyTest?.date && (
//                 <p className="text-danger mt-1">
//                   {errors.competencyTest.date.message}
//                 </p>
//               )}
//             </Col>
//             <Col lg={4}>
//               <Controller
//                 name="competencyTest.company"
//                 control={control}
//                 render={({ field }) => (
//                   <Textfield
//                     {...field}
//                     label="Company"
//                     placeholder="Agency or Organization name"
//                   />
//                 )}
//               />
//               {errors.competencyTest?.company && (
//                 <p className="text-danger mt-1">
//                   {errors.competencyTest.company.message}
//                 </p>
//               )}
//             </Col>

//             {/* <Col lg={12} className="mt-2">
//               <label>Permanent Introductory Video</label>

//               <div
//                 className="buttonWraperMod d-flex justify-content-center"
//                 onClick={() => introVideoRef.current?.click()}
//               >
//                 <GallaryUploadicn />
//               </div>

//               <Controller
//                 name="introductoryVideo"
//                 control={control}
//                 rules={{ required: "Introductory video is required" }}
//                 render={() => (
//                   <input
//                     ref={introVideoRef}
//                     type="file"
//                     accept="video/*"
//                     hidden
//                     onChange={handleIntroVideo}
//                   />
//                 )}
//               />

//               {introPreview && (
//                 <div className="video_preview position-relative mt-3">
//                   <video src={introPreview} controls className="w-100" />
//                   <Button
//                     type="button"
//                     className="removebtn"
//                     onClick={removeIntroVideo}
//                   >
//                     <Removeicon />
//                   </Button>
//                 </div>
//               )}

//               {errors.introductoryVideo && (
//                 <p className="text-danger mt-1">
//                   {errors.introductoryVideo.message}
//                 </p>
//               )}
//             </Col>
//             <Col lg={12} className="mt-2">
//               <label>Current Campaign Video</label>

//               <div
//                 className="buttonWraperMod d-flex justify-content-center"
//                 onClick={() => campaignVideoRef.current?.click()}
//               >
//                 <GallaryUploadicn />
//               </div>

//               <Controller
//                 name="campaignVideo"
//                 control={control}
//                 rules={{ required: "Campaign video is required" }}
//                 render={() => (
//                   <input
//                     ref={campaignVideoRef}
//                     type="file"
//                     accept="video/*"
//                     hidden
//                     onChange={handleCampaignVideo}
//                   />
//                 )}
//               />

//               {campaignPreview && (
//                 <div className="video_preview position-relative mt-3">
//                   <video src={campaignPreview} controls className="w-100" />
//                   <Button
//                     type="button"
//                     className="removebtn"
//                     onClick={removeCampaignVideo}
//                   >
//                     <Removeicon />
//                   </Button>
//                 </div>
//               )}

//               {errors.campaignVideo && (
//                 <p className="text-danger mt-1">
//                   {errors.campaignVideo.message}
//                 </p>
//               )}
//             </Col> */}
//           </Row>
//         </div>

//         <div className="d-flex align-items-center gap-3 mt-3">
//           <Buttontheme
//             type="submit"
//             className="mx-auto"
//             disabled={uploading || isFormLoading}
//           >
//             {isFormLoading ? "Loading..." : "Submit"}
//           </Buttontheme>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResumeCardEditComp;

import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  Controller,
  useFieldArray,
  useForm
} from "react-hook-form";
import * as Yup from "yup";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Textfield from "../../../../Component/ui/Formfields/Textfield";
import { UPDATE_RESUME, UPDATE_USER_META } from "../../../../services/ApiCalls.js";
import { getMetaValue } from "../../../../Utilities/extractMeta.js";
import {
  errorToast,
  successToast,
} from "../../../../Utilities/toastsMessages.js";

const ResumeCardEditComp = (props) => {
  const { candidate, setResumeedit, refetch } = props;
  const resumeDetail = candidate?.resume;
  const [isFormLoading, setFormLoading] = useState(false);

  const resumeSchema = Yup.object({
    resumeName: Yup.string().required("Full name is required"),
    verifiername: Yup.string().required("Enter Verified By is required"),
    verificationType: Yup.string()
      .oneOf(["self", "company"])
      .required("Verification type is required"),

    meetsRequirements: Yup.boolean()
      .nullable()
      .required("Please confirm eligibility"),

    politicalPartyAssociated: Yup.boolean()
      .nullable()
      .required("Please select political association"),

    businessAssociation: Yup.boolean()
      .nullable()
      .required("Please select business association"),

    // Add eligibility fields to schema
    isCandidateForOtherSeats: Yup.string()
      .oneOf(["yes", "no"])
      .required("Please select an option"),

    hasMetRequirements: Yup.string()
      .oneOf(["yes", "no"])
      .required("Please select an option"),

    education: Yup.array()
      .of(
        Yup.object({
          degree: Yup.string().required("Degree is required"),
          university: Yup.string().required("University is required"),
          startYear: Yup.number()
            .typeError("Start year must be a number")
            .required("Start year is required"),
          endYear: Yup.number()
            .typeError("End year must be a number")
            .min(
              Yup.ref("startYear"),
              "End year must be greater than start year",
            )
            .required("End year is required"),
        }),
      )
      .min(1, "At least one education entry is required"),

    workHistory: Yup.array()
      .of(
        Yup.object({
          description: Yup.string().required("Work description is required"),
        }),
      )
      .min(1, "At least one work history entry is required"),

    achievements: Yup.array()
      .of(
        Yup.object({
          description: Yup.string().required("Achievement is required"),
        }),
      )
      .min(1, "At least one achievement is required"),

    drugTest: Yup.object({
      result: Yup.string().required("Drug test result is required"),
      date: Yup.date().nullable().required("Drug test date is required"),
      company: Yup.string().required("Testing company is required"),
    }),

    competencyTest: Yup.object({
      result: Yup.string().required("Competency test result is required"),
      date: Yup.date().nullable().required("Competency test date is required"),
      company: Yup.string().required("Testing company is required"),
    }),
  });

  const { 
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(resumeSchema),
    defaultValues: {
      resumeName: "",
      verificationType: "self",

      meetsRequirements: null,
      politicalPartyAssociated: null,
      businessAssociation: null,
      
      // Eligibility fields default values
      isCandidateForOtherSeats: "",
      hasMetRequirements: "",
      
      education: [
        {
          degree: "",
          university: "",
          startYear: "",
          endYear: "",
        },
      ],
      workHistory: [
        {
          description: "",
        },
      ],
      keyPriorities: [
        {
          description: "",
        },
      ],
      achievements: [
        {
          description: "",
        },
      ],
      drugTest: {
        result: "",
        date: null,
        company: "",
      },
      competencyTest: {
        result: "",
        date: null,
        company: "",
      },
    },
  });

  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: workFields,
    append: addWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "workHistory",
  });

  const {
    fields: keyPrioritiesFields,
    append: addkeyPriorities,
    remove: removekeyPriorities,
  } = useFieldArray({
    control,
    name: "keyPriorities",
  });

  const {
    fields: achievementsFields,
    append: addAchievements,
    remove: removeAchievements,
  } = useFieldArray({
    control,
    name: "achievements",
  });

  const [uploading, setUploading] = useState(false);

  const getMetaValueFromData = (key, defaultValue = "") => {
    if (!candidate?.meta_data) return defaultValue;
    const metaItem = candidate.meta_data.find(item => item.key === key);
    return metaItem?.value || defaultValue;
  };

  useEffect(() => {
    // Set resume values
    setValue("resumeName", resumeDetail?.name);
    setValue(
      "verifiername",
      getMetaValue(candidate?.meta_data, "verifier_name"),
    );
    setValue("verificationType", resumeDetail?.verificationType);
    setValue("meetsRequirements", resumeDetail?.meetsStateCountyRequirements);
    setValue(
      "politicalPartyAssociated",
      resumeDetail?.politicalPartyAssociated,
    );
    setValue("businessAssociation", resumeDetail?.businessOrLobbyAssociation);
    
    // Set eligibility values from meta_data
    setValue("isCandidateForOtherSeats", getMetaValueFromData("is_candidate_for_other_seats"));
    setValue("hasMetRequirements", getMetaValueFromData("has_met_requirements"));
    
    setValue("education", resumeDetail?.education);
    setValue("workHistory", resumeDetail?.workHistory);
    setValue("keyPriorities", resumeDetail?.keyPriorities);
    setValue("achievements", resumeDetail?.achievements);
    setValue("drugTest", resumeDetail?.drugTest);
    setValue(
      "drugTest.date",
      resumeDetail?.drugTest?.date ? moment(resumeDetail?.drugTest?.date).format("YYYY-MM-DD") : "",
    );
    setValue("competencyTest", resumeDetail?.competencyTest);
    setValue(
      "competencyTest.date",
      resumeDetail?.competencyTest?.date ? moment(resumeDetail?.competencyTest?.date).format("YYYY-MM-DD") : "",
    );
    setValue(
      "campaignVideo",
      getMetaValue(candidate?.meta_data, "current_campaign_video"),
    );
    setValue(
      "introductoryVideo",
      getMetaValue(candidate?.meta_data, "permanent_introductory_video"),
    );
  }, [candidate, resumeDetail]);

  const onSubmit = async (data) => {
    // Prepare resume payload
    const resumePayload = {
      resumeName: data?.resumeName,
      verificationType: data?.verificationType,

      meetsRequirements: data?.meetsRequirements,
      politicalPartyAssociated: data?.politicalPartyAssociated,
      businessAssociation: data?.businessAssociation,

      // Dynamic arrays
      education: data?.education, 
      workHistory: data?.workHistory,

      keyPriorities: data?.keyPriorities,
      achievements: data?.achievements,

      // Drug Test
      drugTest: data?.drugTest,

      // Competency Test
      competencyTest: data?.competencyTest,
    };

    // Prepare meta data payload for eligibility fields
    const metaPayload = {
      meta_data: [
        {
          key: "is_candidate_for_other_seats",
          value: data?.isCandidateForOtherSeats,
        },
        {
          key: "has_met_requirements",
          value: data?.hasMetRequirements,
        },
      ],
    };

    try {
      setFormLoading(true);
      let resumeRes = await UPDATE_RESUME(resumePayload);
      if (resumeRes?.data?.status === "success") {
        try {
          let metaRes = await UPDATE_USER_META(metaPayload);
          if (metaRes?.data?.status === "success") {
            successToast("Profile updated successfully!");
            refetch();
            setResumeedit(false);
          } else {
            errorToast(metaRes?.data?.message || "Failed to update eligibility status");
          }
        } catch (metaError) {
          console.error("Meta update error:", metaError);
          errorToast("Resume updated but failed to update eligibility status");
        }
      } else {
        errorToast(resumeRes?.data?.message || "Failed to update resume");
      }
      
      setFormLoading(false);
    } catch (error) {
      console.log(error);
      errorToast("Update failed. Please try again.");
      setFormLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="resumeEditForm mt-4">
          <Row>
            <Col lg={6} md={6} sm={12} className="mt-2">
              <Controller
                name="resumeName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Full Name"
                    placeholder="Enter Full Name"
                  />
                )}
              />
              {errors.resumeName && (
                <p className="text-danger mt-1">{errors.resumeName.message}</p>
              )}
            </Col>
            <Col lg={6} md={6} sm={12} className="mt-2">
              <Controller
                name="verifiername"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Verified By"
                    placeholder="Enter Verified By"
                  />
                )}
              />
              {errors.verifiername && (
                <p className="text-danger mt-1">
                  {errors.verifiername.message}
                </p>
              )}
            </Col>
            
            <Col lg={12} className="mt-4">
              <h5 className="fw-semibold">Eligibility Status</h5>
              <hr className="my-2" />
            </Col>
            
            <Col lg={6} md={6} sm={12} className="mt-2">
              <label className="form-label fw-semibold">
                Are you currently a candidate for any other seats?
              </label>
              <Controller
                name="isCandidateForOtherSeats"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Select an option"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.isCandidateForOtherSeats && (
                <p className="text-danger mt-1">
                  {errors.isCandidateForOtherSeats.message}
                </p>
              )}
            </Col>

            <Col lg={6} md={6} sm={12} className="mt-2">
              <label className="form-label fw-semibold">
                Have you met all the requirements set by the state and county election commissions?
              </label>
              <Controller
                name="hasMetRequirements"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Select an option"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.hasMetRequirements && (
                <p className="text-danger mt-1">
                  {errors.hasMetRequirements.message}
                </p>
              )}
            </Col>
            
            <Col lg={12} className="mt-4">
              <h5 className="fw-semibold">Verification & Associations</h5>
              <hr className="my-2" />
            </Col>
            
            <Col lg={6} md={6} sm={12} className="mt-2">
              <label className="form-label">Select Verification Type</label>
              <Controller
                name="verificationType"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Verification Type"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Self Verified", value: "self" },
                        { label: "Company Verified", value: "company" },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.verificationType && (
                <p className="text-danger mt-1">
                  {errors.verificationType.message}
                </p>
              )}
            </Col>
            <Col lg={6} md={6} sm={12} className="mt-2">
              <label className="form-label">
                Have you met minimum state and county requirements to run for
                this office?
              </label>

              <Controller
                name="meetsRequirements"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Meets State & County Requirements"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.meetsRequirements && (
                <p className="text-danger mt-1">
                  {errors.meetsRequirements.message}
                </p>
              )}
            </Col>
            <Col lg={6} md={6} sm={12} className="mt-2">
              <label className="form-label">
                Are you associated with a political party? Do not include which
                party if associated.
              </label>

              <Controller
                name="politicalPartyAssociated"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Political Party Association"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.politicalPartyAssociated && (
                <p className="text-danger mt-1">
                  {errors.politicalPartyAssociated.message}
                </p>
              )}
            </Col>
            <Col lg={6} md={6} sm={12} className="mt-2">
              <label className="form-label">
                Are you associated with any business or lobby that could benefit
                financially?
              </label>

              <Controller
                name="businessAssociation"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      {...field}
                      placeholder="Business / Lobby Association"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.businessAssociation && (
                <p className="text-danger mt-1">
                  {errors.businessAssociation.message}
                </p>
              )}
            </Col>

            {/* Education Section */}
            {educationFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col
                  lg={12}
                  className="mt-4 d-flex align-items-center gap-3 justify-content-between"
                >
                  <h4>Education</h4>
                  <Button
                    variant="outline-danger"
                    size="md"
                    className=" py-2 removeBtn"
                    onClick={() => removeEducation(index)}
                  >
                    Remove Education
                  </Button>
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Controller
                    name={`education.${index}.degree`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="Degree"
                        placeholder="Enter Degree"
                      />
                    )}
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-danger mt-1">
                      {errors.education[index].degree.message}
                    </p>
                  )}
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Controller
                    name={`education.${index}.university`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="University / Institution"
                        placeholder="Enter University / Institution"
                      />
                    )}
                  />
                  {errors.education?.[index]?.university && (
                    <p className="text-danger mt-1">
                      {errors.education[index].university.message}
                    </p>
                  )}
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Controller
                    name={`education.${index}.startYear`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="Start Year"
                        type="number"
                        placeholder="Enter Start Year"
                      />
                    )}
                  />
                  {errors.education?.[index]?.startYear && (
                    <p className="text-danger mt-1">
                      {errors.education[index].startYear.message}
                    </p>
                  )}
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <Controller
                    name={`education.${index}.endYear`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label="End Year"
                        type="number"
                        placeholder="Enter End Year"
                      />
                    )}
                  />
                  {errors.education?.[index]?.endYear && (
                    <p className="text-danger mt-1">
                      {errors.education[index].endYear.message}
                    </p>
                  )}
                </Col>
              </React.Fragment>
            ))}

            <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="md"
                className=" py-2 theme_border theme_text rounded font-semibold"
                onClick={() =>
                  addEducation({
                    degree: "",
                    field: "",
                    university: "",
                    startYear: "",
                    endYear: "",
                  })
                }
              >
                + Add Education
              </Button>
            </Col>

            {/* Work History Section */}
            {workFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col
                  lg={12}
                  className="mt-4 d-flex align-items-center gap-3 justify-content-between"
                >
                  <h4>Work History</h4>
                  <Button
                    variant="outline-danger"
                    size="md"
                    className="py-2 removeBtn"
                    onClick={() => removeWork(index)}
                  >
                    Remove Work
                  </Button>
                </Col>
                <Col lg={12}>
                  <Controller
                    name={`workHistory.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label={`Work ${index + 1}`}
                        placeholder="Enter Work History"
                      />
                    )}
                  />
                  {errors.workHistory?.[index]?.description && (
                    <p className="text-danger mt-1">
                      {errors.workHistory[index].description.message}
                    </p>
                  )}
                </Col>
              </React.Fragment>
            ))}
            <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="md"
                className="py-2 theme_border theme_text rounded font-semibold"
                onClick={() =>
                  addWork({
                    description: "",
                  })
                }
              >
                + Add Work History
              </Button>
            </Col>

            {keyPrioritiesFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col
                  lg={12}
                  className="mt-4 d-flex align-items-center gap-3 justify-content-between"
                >
                  <h4>Key Priorities</h4>
                  <Button
                    variant="outline-danger"
                    size="md"
                    className="py-2 removeBtn"
                    onClick={() => removekeyPriorities(index)}
                  >
                    Remove Key Priority
                  </Button>
                </Col>
                <Col lg={12}>
                  <Controller
                    name={`keyPriorities.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label={`Key Priority ${index + 1}`}
                        placeholder="Enter Key Priority"
                      />
                    )}
                  />
                  {errors.keyPriorities?.[index]?.description && (
                    <p className="text-danger mt-1">
                      {errors.keyPriorities[index].description.message}
                    </p>
                  )}
                </Col>
              </React.Fragment>
            ))}
            <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="md"
                className="py-2 theme_border theme_text  rounded font-semibold"
                onClick={() =>
                  addkeyPriorities({
                    description: "",
                  })
                }
              >
                + Add Key Priorities
              </Button>
            </Col>


            {achievementsFields.map((item, index) => (
              <React.Fragment key={item.id}>
                <Col
                  lg={12}
                  className="mt-4 d-flex align-items-center gap-3 justify-content-between"
                >
                  <h4>Achievements</h4>
                  <Button
                    variant="outline-danger"
                    size="md"
                    className="py-2 removeBtn"
                    onClick={() => removeAchievements(index)}
                  >
                    Remove achievements
                  </Button>
                </Col>
                <Col lg={12}>
                  <Controller
                    name={`achievements.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textfield
                        {...field}
                        label={`Achievement ${index + 1}`}
                        placeholder="Enter Achievements"
                      />
                    )}
                  />
                  {errors.achievements?.[index]?.description && (
                    <p className="text-danger mt-1">
                      {errors.achievements[index].description.message}
                    </p>
                  )}
                </Col>
              </React.Fragment>
            ))}
            <Col lg={12} className="text-end mt-2">
              <Button
                variant="outline-primary"
                size="md"
                className="py-2 theme_border theme_text rounded font-semibold"
                onClick={() =>
                  addAchievements({
                    description: "",
                  })
                }
              >
                + Add achievements
              </Button>
            </Col>


            <Col lg={12} className="mt-4">
              <h5 className="fw-semibold">Drug Test</h5>
            </Col>
            <Col lg={4}>
              <label className="form-label">Select Result</label>
              <Controller
                name="drugTest.result"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      placeholder="Result"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Passed", value: "passed" },
                        { label: "Failed", value: "failed" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.drugTest?.result && (
                <p className="text-danger mt-1">
                  {errors.drugTest.result.message}
                </p>
              )}
            </Col>

            <Col lg={4}>
              <Controller
                name="drugTest.date"
                control={control}
                render={({ field }) => (
                  <Textfield {...field} label="Date" type="date" />
                )}
              />
              {errors.drugTest?.date && (
                <p className="text-danger mt-1">
                  {errors.drugTest.date.message}
                </p>
              )}
            </Col>
            <Col lg={4}>
              <Controller
                name="drugTest.company"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Company"
                    placeholder="Lab or Organization name"
                  />
                )}
              />
              {errors.drugTest?.company && (
                <p className="text-danger mt-1">
                  {errors.drugTest.company.message}
                </p>
              )}
            </Col>
            
            {/* Competency Test Section */}
            <Col lg={12} className="mt-4">
              <h5 className="fw-semibold">Competency Test</h5>
            </Col>

            <Col lg={4}>
              <label className="form-label">Select Result</label>
              <Controller
                name="competencyTest.result"
                control={control}
                render={({ field }) => (
                  <div className="position-relative">
                    <Dropdown
                      placeholder="Result"
                      optionLabel="label"
                      optionValue="value"
                      options={[
                        { label: "Passed", value: "passed" },
                        { label: "Failed", value: "failed" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-100 text_input"
                    />
                  </div>
                )}
              />
              {errors.competencyTest?.result && (
                <p className="text-danger mt-1">
                  {errors.competencyTest.result.message}
                </p>
              )}
            </Col>

            <Col lg={4}>
              <Controller
                name="competencyTest.date"
                control={control}
                render={({ field }) => (
                  <Textfield {...field} label="Date" type="date" />
                )}
              />
              {errors.competencyTest?.date && (
                <p className="text-danger mt-1">
                  {errors.competencyTest.date.message}
                </p>
              )}
            </Col>
            <Col lg={4}>
              <Controller
                name="competencyTest.company"
                control={control}
                render={({ field }) => (
                  <Textfield
                    {...field}
                    label="Company"
                    placeholder="Agency or Organization name"
                  />
                )}
              />
              {errors.competencyTest?.company && (
                <p className="text-danger mt-1">
                  {errors.competencyTest.company.message}
                </p>
              )}
            </Col>
          </Row>
        </div>

        <div className="d-flex align-items-center gap-3 mt-3">
          <Buttontheme
            type="submit"
            className="mx-auto"
            disabled={uploading || isFormLoading}
          >
            {isFormLoading ? "Loading..." : "Submit"}
          </Buttontheme>
        </div>
      </form>
    </div>
  );
};

export default ResumeCardEditComp;