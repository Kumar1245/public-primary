// import React, { useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
// import { useForm, Controller, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import Textareafield from "../../../../Component/ui/Formfields/Textareafield";
// import Image from "next/image";
// import Settingname from "../../../../Assets/images/settingname.png";
// import Placeholdeuser from "../../../../Assets/images/user.png";
// import {
//   Bluecheckicon,
//   Editprofileicon,
//   VerifyIcon,
//   ViewIcon,
// } from "../../../../Assets/svg/Allsvgicons";
// import EditprofilebioMod from "../Modal/EditprofilebioMod";
// import Buttontheme from "../../../../Component/ui/Buttontheme";
// import {
//   getMetaValue,
//   getSafeMetaImage,
// } from "../../../../Utilities/extractMeta";
// import ResumeCard from "./ResumeCard";
// import ResumeCardEditComp from "./ResumeCardEditComp";
// import { Skeleton } from "primereact/skeleton";
// import PreviewMod from "../Modal/PreviewMod";

// const schema = Yup.object().shape({
//   description: Yup.string().required("Description is required"),
// });

// const getProfileImageSrc = (profileImage) => {
//   if (!profileImage) return Placeholdeuser;
//   if (typeof profileImage === "string") {
//     return Placeholdeuser;
//   }
//   return profileImage.link || Placeholdeuser;
// };

// const Profileaccount = ({
//   data,
//   userLoading,
//   refetch,
//   isFetching,
//   isLoading,
// }) => {
//   const [editbio, setEditbio] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     dateOfBirth: "",
//     address: "",
//     description: "",
//     profileImage: "",
//   });
//   const [resumeedit, setResumeedit] = useState(false);
//   const [previewmodal, setPreviewmodal] = useState(false);

//   const [previewMedia, setPreviewMedia] = useState(null);

//   const handleToggleEdit = () => {
//     setResumeedit((prev) => !prev);
//   };

//   const methods = useForm({
//     mode: "onTouched",

//     defaultValues: {
//       // Step 1
//       seat: null,
//       name: "",
//       email: "",
//       password: "",
//       dob: null,
//       address: "",

//       // Step 2
//       governmentIdImages: [],
//       voterNumber: "",
//       faceScanImage: null,

//       // Step 3
//       resume: [],
//       verifiername: "",
//       verifiercontact: "",
//       introductoryVideo: null,
//       campaignVideo: null,

//       // Step 4
//       disclose: false,
//       agree: false,
//     },
//   });

//   const allData = methods.watch();

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       description: "",
//       profileImage: "",
//     },
//   });

//   useEffect(() => {
//     if (!data) return;

//     setProfileData({
//       name: data?.name || "",
//       email: data?.email || "",
//       dateOfBirth: data?.dateOfBirth || "",
//       address: data?.address || "",
//       userData: data?.meta_data || [],
//       description:
//         data?.meta_data?.find(
//           (item) => item.key === "permanent_introductory_video",
//         )?.value || "",
//       profileImage: data?.profileImage || "",
//     });
//   }, [data]);

//   const handleSaveProfile = (formData) => {
//     console.log("Updated bio:", formData.description);

//     setProfileData((prev) => ({
//       ...prev,
//       description: formData.description,
//       profileImage: formData.profileImage,
//     }));
//   };

//   const handleModalClose = (updatedData) => {
//     if (updatedData) {
//       setProfileData((prev) => ({
//         ...prev,
//         description: updatedData.description,
//         profileImage: updatedData.profileImage,
//       }));
//       reset({
//         description: updatedData.description,
//         profileImage: updatedData.profileImage,
//       });
//     }
//     setEditbio(false);
//   };

//   return (
//     <>
//       <EditprofilebioMod
//         show={editbio}
//         onhide={handleModalClose}
//         initialData={profileData}
//         userLoading={userLoading}
//         refetch={refetch}
//       />

//       <PreviewMod
//         show={previewmodal}
//         onhide={() => setPreviewmodal(false)}
//         media={previewMedia}
//       />

//       <div className="settingFormWrap">
//         <div className="settingform">
//           <Row className="">
//             <Col lg={12}>
//               <div className="settingProfileCard d-flex align-items-start justify-content-between gap-3 mb-3">
//                 {isFetching || isLoading ? (
//                   <>
//                     <Skeleton width="100%" height="250px" />
//                   </>
//                 ) : (
//                   <div className="d-flex align-items-start gap-3">
//                     <div className="settingProfileCard_img">
//                       <Image
//                         src={getProfileImageSrc(profileData.profileImage)}
//                         alt="profile"
//                         width={100}
//                         height={100}
//                         className="img-fluid"
//                       />
//                     </div>

//                     <div className="settingProfileCard_Content">
//                       <h4 className="fw-bold m-0">{profileData.name}</h4>
//                       <ul className="m-0 p-0 mt-2">
//                         <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ minWidth: "120px" }}
//                           >
//                             Email:
//                           </p>
//                           <p className="mb-0">{profileData.email}</p>
//                         </li>
//                         <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ minWidth: "120px" }}
//                           >
//                             Date of Birth:
//                           </p>
//                           <p className="mb-0">{profileData.dateOfBirth}</p>
//                         </li>

//                         <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ minWidth: "120px" }}
//                           >
//                             Gender:
//                           </p>
//                           <p className="mb-0">{data?.gender}</p>
//                         </li>
//                         <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ minWidth: "120px" }}
//                           >
//                             Address:
//                           </p>
//                           <p className="mb-0">{profileData.address}</p>
//                         </li>

//                         <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ maxWidth: "120px" }}
//                           >
//                             Contact Number:
//                           </p>
//                           <p className="mb-0">
//                             {" "}
//                             {getMetaValue(
//                               profileData?.userData,
//                               "voter_registeration_number",
//                             ) || "N/A"}
//                           </p>
//                         </li>
//                         {/* <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ minWidth: "120px" }}
//                           >
//                             Voter Registeration:
//                           </p>
//                           <p className="mb-0">
//                             {" "}
//                             {getMetaValue(
//                               profileData?.userData,
//                               "voter_registeration_number",
//                             ) || "N/A"}
//                           </p>
//                         </li> */}
//                         {/* <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ minWidth: "120px" }}
//                           >
//                             Verify Name:
//                           </p>
//                           <p className="mb-0">
//                             {" "}
//                             {getMetaValue(
//                               profileData?.userData,
//                               "verifier_name",
//                             ) || "N/A"}
//                           </p>
//                         </li> */}

//                         <li className="d-flex align-items-center gap-2 mb-2">
//                           <p
//                             className="fw-semibold mb-0"
//                             style={{ minWidth: "120px" }}
//                           >
//                             Status
//                           </p>
//                           <p className="mb-0">
//                             {data?.status
//                               ? data.status.charAt(0).toUpperCase() +
//                                 data.status.slice(1)
//                               : "N/A"}
//                           </p>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 )}
//                 {/* Edit Profile Button on Right Side */}
//                 <div>
//                   <Buttontheme
//                     type="button"
//                     className="editProfileBtn py-2"
//                     onClick={() => setEditbio(true)}
//                   >
//                     Edit
//                   </Buttontheme>
//                 </div>
//               </div>
//             </Col>
//             {/* 
//               {data?.meta_data?.map((item, index) => (
//                 <Col lg={6} md={6} sm={12} key={index}>
//                   <div>{item.value}</div>
//                 </Col>
//               ))} */}

//             <Col lg={12}>
//               <div className="resumeCard p-3 ">
//                 <div className="d-flex align-items-center justify-content-between gap-3">
//                   <h4 class="fw-bold m-0">Resume</h4>
//                   <Buttontheme
//                     type="button"
//                     className="editProfileBtn py-2"
//                     onClick={handleToggleEdit}
//                   >
//                     {resumeedit ? "Back" : data?.resume ? "Edit" : "Add"}
//                   </Buttontheme>
//                 </div>

//                 {resumeedit ? (
//                   <FormProvider {...methods}>
//                     <ResumeCardEditComp
//                       candidate={data}
//                       setResumeedit={setResumeedit}
//                       refetch={refetch}
//                     />
//                   </FormProvider>
//                 ) : (
//                   <ResumeCard
//                     candidate={data}
//                     isLoading={isLoading}
//                     isFetching={isFetching}
//                   />
//                 )}
//               </div>
//             </Col>

//             <Col lg={6} md={6} sm={12} className="mb-4">
//               {isFetching || isLoading ? (
//                 <>
//                   <Skeleton width="100%" height="300px" />
//                 </>
//               ) : (
//                 <>
//                   <h5 className="fw-bold theme_text">Introductory Video</h5>
//                   <div className="metadataShow card position-relative">
//                     <video
//                       src={getSafeMetaImage(
//                         profileData?.userData,
//                         "permanent_introductory_video",
//                       )}
//                       controls
//                       autoPlay={false}
//                       muted
//                       style={{ width: "100%", height: "auto" }}
//                     />

//                     <div className="card_overlay">
//                       <button
//                         className="viewicon"
//                         onClick={() => {
//                           setPreviewmodal(true);
//                           setPreviewMedia(
//                             getSafeMetaImage(
//                               profileData?.userData,
//                               "permanent_introductory_video",
//                             ),
//                           );
//                         }}
//                       >
//                         <ViewIcon />
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </Col>

//             <Col lg={6} md={6} sm={12} className="mb-4">
//               {isFetching || isLoading ? (
//                 <>
//                   <Skeleton width="100%" height="300px" />
//                 </>
//               ) : (
//                 <>
//                   <h5 className="fw-bold theme_text">Current Campaign Video</h5>
//                   <div className="metadataShow card position-relative">
//                     <video
//                       src={getSafeMetaImage(
//                         profileData?.userData,
//                         "current_campaign_video",
//                       )}
//                       controls
//                       autoPlay={false}
//                       muted
//                       style={{ width: "100%", height: "auto" }}
//                     />

//                     <div className="card_overlay">
//                       <button
//                         className="viewicon"
//                         onClick={() => {
//                           setPreviewmodal(true);
//                           setPreviewMedia(
//                             getSafeMetaImage(
//                               profileData?.userData,
//                               "current_campaign_video",
//                             ),
//                           );
//                         }}
//                       >
//                         <ViewIcon />
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </Col>

//             <Col lg={6} md={6} sm={12} className="mb-4">
//               {isFetching || isLoading ? (
//                 <>
//                   <Skeleton width="100%" height="300px" />
//                 </>
//               ) : (
//                 <>
//                   <h5 className="fw-bold theme_text">Government id Front</h5>

//                   <div className="metadataShow card position-relative">
//                     <Image
//                       src={getSafeMetaImage(
//                         profileData?.userData,
//                         "government_id_front",
//                       )}
//                       alt=""
//                       height={500}
//                       width={500}
//                       className="img-fluid"
//                     />
//                     <div className="card_overlay">
//                       <button
//                         className="viewicon"
//                         onClick={() => {
//                           setPreviewmodal(true);
//                           setPreviewMedia(
//                             getSafeMetaImage(
//                               profileData?.userData,
//                               "government_id_front",
//                             ),
//                           );
//                         }}
//                       >
//                         <ViewIcon />
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </Col>

//             <Col lg={6} md={6} sm={12} className="mb-4">
//               {isFetching || isLoading ? (
//                 <>
//                   <Skeleton width="100%" height="300px" />
//                 </>
//               ) : (
//                 <>
//                   <h5 className="fw-bold theme_text">Government id Back</h5>

//                   <div className="metadataShow card position-relative">
//                     <Image
//                       src={getSafeMetaImage(
//                         profileData?.userData,
//                         "government_id_back",
//                       )}
//                       alt=""
//                       height={500}
//                       width={500}
//                       className="img-fluid"
//                     />
//                     <div className="card_overlay">
//                       <button
//                         className="viewicon"
//                         onClick={() => {
//                           setPreviewmodal(true);
//                           setPreviewMedia(
//                             getSafeMetaImage(
//                               profileData?.userData,
//                               "government_id_back",
//                             ),
//                           );
//                         }}
//                       >
//                         <ViewIcon />
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </Col>

//             {/* <Col lg={3} md={6} sm={12} className="mb-4">
//                 <h5 className="fw-bold theme_text">Resume</h5>
//                 <div className="metadataShow card">
//                   <Image
//                     src={getSafeMetaImage(profileData?.userData, "resume")}
//                     alt=""
//                     height={500}
//                     width={500}
//                     className="img-fluid"
//                   />
//                 </div>
//               </Col> */}
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profileaccount;

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Textareafield from "../../../../Component/ui/Formfields/Textareafield";
import Image from "next/image";
import Settingname from "../../../../Assets/images/settingname.png";
import Placeholdeuser from "../../../../Assets/images/user.png";
import {
  Bluecheckicon,
  Editprofileicon,
  VerifyIcon,
  ViewIcon,
} from "../../../../Assets/svg/Allsvgicons";
import EditprofilebioMod from "../Modal/EditprofilebioMod";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import {
  getMetaValue,
  getSafeMetaImage,
} from "../../../../Utilities/extractMeta";
import ResumeCard from "./ResumeCard";
import ResumeCardEditComp from "./ResumeCardEditComp";
import { Skeleton } from "primereact/skeleton";
import PreviewMod from "../Modal/PreviewMod";

const schema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
});

const getProfileImageSrc = (profileImage) => {
  if (!profileImage) return Placeholdeuser;
  if (typeof profileImage === "string") {
    return Placeholdeuser;
  }
  return profileImage.link || Placeholdeuser;
};

const Profileaccount = ({
  data,
  userLoading,
  refetch,
  isFetching,
  isLoading,
}) => {
  const [editbio, setEditbio] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    address: "",
    description: "",
    profileImage: "",
  });
  const [resumeedit, setResumeedit] = useState(false);
  const [previewmodal, setPreviewmodal] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);

  // Helper function to get meta value
  const getMetaValueFromData = (key, defaultValue = "N/A") => {
    if (!data?.meta_data) return defaultValue;
    const metaItem = data.meta_data.find(item => item.key === key);
    return metaItem?.value || defaultValue;
  };

  const handleToggleEdit = () => {
    setResumeedit((prev) => !prev);
  };

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      seat: null,
      name: "",
      email: "",
      password: "",
      dob: null,
      address: "",
      governmentIdImages: [],
      voterNumber: "",
      faceScanImage: null,
      resume: [],
      verifiername: "",
      verifiercontact: "",
      introductoryVideo: null,
      campaignVideo: null,
      disclose: false,
      agree: false,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      profileImage: "",
    },
  });

  useEffect(() => {
    if (!data) return;

    setProfileData({
      name: data?.name || "",
      email: data?.email || "",
      dateOfBirth: data?.dateOfBirth || "",
      address: data?.address || "",
      userData: data?.meta_data || [],
      description:
        data?.meta_data?.find(
          (item) => item.key === "permanent_introductory_video",
        )?.value || "",
      profileImage: data?.profileImage || "",
    });
  }, [data]);

  const handleSaveProfile = (formData) => {
    console.log("Updated bio:", formData.description);

    setProfileData((prev) => ({
      ...prev,
      description: formData.description,
      profileImage: formData.profileImage,
    }));
  };

  const handleModalClose = (updatedData) => {
    if (updatedData) {
      setProfileData((prev) => ({
        ...prev,
        description: updatedData.description,
        profileImage: updatedData.profileImage,
      }));
      reset({
        description: updatedData.description,
        profileImage: updatedData.profileImage,
      });
    }
    setEditbio(false);
  };

  return (
    <>
      <EditprofilebioMod
        show={editbio}
        onhide={handleModalClose}
        initialData={profileData}
        userLoading={userLoading}
        refetch={refetch}
      />

      <PreviewMod
        show={previewmodal}
        onhide={() => setPreviewmodal(false)}
        media={previewMedia}
      />

      <div className="settingFormWrap">
        <div className="settingform">
          <Row className="">
            <Col lg={12}>
              <div className="settingProfileCard d-flex align-items-start justify-content-between gap-3 mb-3">
                {isFetching || isLoading ? (
                  <>
                    <Skeleton width="100%" height="250px" />
                  </>
                ) : (
                  <div className="d-flex align-items-start gap-3">
                    <div className="settingProfileCard_img">
                      <Image
                        src={getProfileImageSrc(profileData.profileImage)}
                        alt="profile"
                        width={100}
                        height={100}
                        className="img-fluid"
                      />
                    </div>

                    <div className="settingProfileCard_Content">
                      <h4 className="fw-bold m-0">{profileData.name}</h4>
                      <ul className="m-0 p-0 mt-2">
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Email:
                          </p>
                          <p className="mb-0">{profileData.email}</p>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Date of Birth:
                          </p>
                          <p className="mb-0">{profileData.dateOfBirth}</p>
                        </li>

                        <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Gender:
                          </p>
                          <p className="mb-0">{data?.gender || "N/A"}</p>
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Address:
                          </p>
                          <p className="mb-0">{profileData.address}</p>
                        </li>

                        <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ maxWidth: "120px" }}
                          >
                            Contact Number:
                          </p>
                          <p className="mb-0">
                            {getMetaValue(
                              profileData?.userData,
                              "voter_registeration_number",
                            ) || "N/A"}
                          </p>
                        </li>

                        {/* Display isCandidateForOtherSeats from meta_data */}
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Application fee Status:
                          </p>
                          <p className="mb-0">
                            {getMetaValueFromData("application_fee_status") === "paid" ? (
                              <span className="text-success">Paid</span>
                            ) : getMetaValueFromData("application_fee_paid_amount") === "pending" ? (
                              <span className="text-danger">Pending</span>
                            ) : "N/A"}
                          </p>
                        </li>

                        {/* Display hasMetRequirements from meta_data */}
                        {/* <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Met Requirements:
                          </p>
                          <p className="mb-0">
                            {getMetaValueFromData("has_met_requirements") === "yes" ? (
                              <span className="text-success">Yes</span>
                            ) : getMetaValueFromData("has_met_requirements") === "no" ? (
                              <span className="text-danger">No</span>
                            ) : "N/A"}
                          </p>
                        </li> */}

                        <li className="d-flex align-items-center gap-2 mb-2">
                          <p
                            className="fw-semibold mb-0"
                            style={{ minWidth: "120px" }}
                          >
                            Status
                          </p>
                          <p className="mb-0">
                            {data?.status
                              ? data.status.charAt(0).toUpperCase() +
                                data.status.slice(1)
                              : "N/A"}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {/* Edit Profile Button on Right Side */}
                <div>
                  <Buttontheme
                    type="button"
                    className="editProfileBtn py-2"
                    onClick={() => setEditbio(true)}
                  >
                    Edit
                  </Buttontheme>
                </div>
              </div>
            </Col>

            <Col lg={12}>
              <div className="resumeCard p-3 ">
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <h4 className="fw-bold m-0">Resume</h4>
                  <Buttontheme
                    type="button"
                    className="editProfileBtn py-2"
                    onClick={handleToggleEdit}
                  >
                    {resumeedit ? "Back" : data?.resume ? "Edit" : "Add"}
                  </Buttontheme>
                </div>

                {resumeedit ? (
                  <FormProvider {...methods}>
                    <ResumeCardEditComp
                      candidate={data}
                      setResumeedit={setResumeedit}
                      refetch={refetch}
                    />
                  </FormProvider>
                ) : (
                  <ResumeCard
                    candidate={data}
                    isLoading={isLoading}
                    isFetching={isFetching}
                  />
                )}
              </div>
            </Col>

            <Col lg={6} md={6} sm={12} className="mb-4">
              {isFetching || isLoading ? (
                <>
                  <Skeleton width="100%" height="300px" />
                </>
              ) : (
                <>
                  <h5 className="fw-bold theme_text">Introductory Video</h5>
                  <div className="metadataShow card position-relative">
                    <video
                      src={getSafeMetaImage(
                        profileData?.userData,
                        "permanent_introductory_video",
                      )}
                      controls
                      autoPlay={false}
                      muted
                      style={{ width: "100%", height: "auto" }}
                    />

                    <div className="card_overlay">
                      <button
                        className="viewicon"
                        onClick={() => {
                          setPreviewmodal(true);
                          setPreviewMedia(
                            getSafeMetaImage(
                              profileData?.userData,
                              "permanent_introductory_video",
                            ),
                          );
                        }}
                      >
                        <ViewIcon />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Col>

            <Col lg={6} md={6} sm={12} className="mb-4">
              {isFetching || isLoading ? (
                <>
                  <Skeleton width="100%" height="300px" />
                </>
              ) : (
                <>
                  <h5 className="fw-bold theme_text">Current Campaign Video</h5>
                  <div className="metadataShow card position-relative">
                    <video
                      src={getSafeMetaImage(
                        profileData?.userData,
                        "current_campaign_video",
                      )}
                      controls
                      autoPlay={false}
                      muted
                      style={{ width: "100%", height: "auto" }}
                    />

                    <div className="card_overlay">
                      <button
                        className="viewicon"
                        onClick={() => {
                          setPreviewmodal(true);
                          setPreviewMedia(
                            getSafeMetaImage(
                              profileData?.userData,
                              "current_campaign_video",
                            ),
                          );
                        }}
                      >
                        <ViewIcon />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Col>

            <Col lg={6} md={6} sm={12} className="mb-4">
              {isFetching || isLoading ? (
                <>
                  <Skeleton width="100%" height="300px" />
                </>
              ) : (
                <>
                  <h5 className="fw-bold theme_text">Government id Front</h5>

                  <div className="metadataShow card position-relative">
                    <Image
                      src={getSafeMetaImage(
                        profileData?.userData,
                        "government_id_front",
                      )}
                      alt=""
                      height={500}
                      width={500}
                      className="img-fluid"
                    />
                    <div className="card_overlay">
                      <button
                        className="viewicon"
                        onClick={() => {
                          setPreviewmodal(true);
                          setPreviewMedia(
                            getSafeMetaImage(
                              profileData?.userData,
                              "government_id_front",
                            ),
                          );
                        }}
                      >
                        <ViewIcon />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Col>

            <Col lg={6} md={6} sm={12} className="mb-4">
              {isFetching || isLoading ? (
                <>
                  <Skeleton width="100%" height="300px" />
                </>
              ) : (
                <>
                  <h5 className="fw-bold theme_text">Government id Back</h5>

                  <div className="metadataShow card position-relative">
                    <Image
                      src={getSafeMetaImage(
                        profileData?.userData,
                        "government_id_back",
                      )}
                      alt=""
                      height={500}
                      width={500}
                      className="img-fluid"
                    />
                    <div className="card_overlay">
                      <button
                        className="viewicon"
                        onClick={() => {
                          setPreviewmodal(true);
                          setPreviewMedia(
                            getSafeMetaImage(
                              profileData?.userData,
                              "government_id_back",
                            ),
                          );
                        }}
                      >
                        <ViewIcon />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Profileaccount;