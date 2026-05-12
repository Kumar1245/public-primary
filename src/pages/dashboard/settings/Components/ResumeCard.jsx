// import React from "react";
// import { Row, Col } from "react-bootstrap";
// import Image from "next/image";
// import { Bluecheckicon, VerifyIcon } from "../../../../Assets/svg/Allsvgicons";

// // images
// import Resume from "../../../../Assets/images/resume.png";
// import moment from "moment";
// import { getMetaValue } from "../../../../Utilities/extractMeta";
// import { Skeleton } from "primereact/skeleton";
// import { Spinner } from "reactstrap";
// import Nodata from "../../../../Component/ui/Nodata";

// const ResumeCard = (props) => {
//   const { candidate, isFetching, isLoading } = props;
//   const resume = candidate?.resume;

//   console.log(resume,"resume======<>")

//   return (
//     <>
//       {isFetching || isLoading ? (
//         <div className="loader d-flex justify-content-center align-items-center py-4">
//           <Spinner animation="border" />
//         </div>
//       ) : (
//         <>
//           {resume ? (
//             <div className="resumeCard_details p-3">
//               <div className="resumeCard_header mb-3 bg-white p-3 rounded d-flex align-items-center justify-content-between">
//                 <div className="">
//                   <h4 className="m-0 theme_text fw-bold d-flex align-items-center gap-2">
//                     {resume?.name}
//                     <VerifyIcon
//                       height={28}
//                       width={28}
//                       checkcolor="#fff"
//                       iconcolor="#1E3A8A"
//                     />
//                   </h4>
//                   <p className="m-0">
//                     Verified By{" "}
//                     {getMetaValue(candidate?.meta_data, "verifier_name")}{" "}
//                   </p>
//                 </div>

//                 <div className="resumeCard_img" style={{ opacity: "0.2" }}>
//                   <Image
//                     src={Resume}
//                     alt="profile"
//                     width={50}
//                     height={50}
//                     className="img-fluid"
//                   />
//                 </div>
//               </div>

//               <div className="position-relative centerborder mt-4">
//                 <Row>
//                   <Col lg={6} md={6} sm={12}>
//                     {/* experience */}
//                     <div className="resumeCard_experience mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Experience
//                       </h5>

//                       <ul className="m-0 p-0">
//                         {resume?.workHistory?.map((workHistory) => {
//                           return (
//                             <>
//                               <li className="d-flex gap-2 align-items-start">
//                                 <span className="">
//                                   <Bluecheckicon />
//                                 </span>
//                                 <p className="m-0">
//                                   {workHistory?.description}
//                                 </p>
//                               </li>
//                             </>
//                           );
//                         })}
//                       </ul>
//                     </div>

//                     {/* education */}
//                     <div className="resumeCard_education mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Education
//                       </h5>

//                       <ul className="m-0 p-0">
//                         {resume?.education?.map((education) => {
//                           return (
//                             <>
//                               <li className="d-flex gap-2 align-items-start">
//                                 <span className="">
//                                   <Bluecheckicon />
//                                 </span>
//                                 <p className="m-0">{education?.degree}</p>{" "}
//                                 {" -"}
//                                 <p className="m-0">{education?.university}</p>
//                               </li>
//                             </>
//                           );
//                         })}
//                       </ul>
//                     </div>

//                     {/* key priorities */}
//                     {/* <div className="resumeCard_keypriorities mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Key Priorities
//                       </h5>

//                       <ul className="m-0 p-0">
//                         {resume?.keyPriorities?.map((keyPriority) => {
//                           return (
//                             <>
//                               <li className="d-flex gap-2 align-items-start">
//                                 <span className="">
//                                   <Bluecheckicon />
//                                 </span>
//                                 <p className="m-0">
//                                   {keyPriority?.description}
//                                 </p>
//                               </li>
//                             </>
//                           );
//                         })}
//                       </ul>
//                     </div> */}

//                     {/* achievements */}
//                     <div className="resumeCard_achievements mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Achievements
//                       </h5>

//                       <ul className="m-0 p-0">
//                         {resume?.achievements?.map((achievement) => {
//                           return (
//                             <>
//                               <li className="d-flex gap-2 align-items-start">
//                                 <span className="">
//                                   <Bluecheckicon />
//                                 </span>
//                                 <p className="m-0">
//                                   {achievement?.description}
//                                 </p>
//                               </li>
//                             </>
//                           );
//                         })}
//                       </ul>
//                     </div>
//                   </Col>

//                   <Col lg={6} md={6} sm={12} className="ps-lg-5">
//                     {/* Have you met minimum state and county requirements to run for this office? */}
//                     <div className="resumeCard_achievements mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Have you met minimum state and county requirements to
//                         run for this office?
//                       </h5>

//                       <ul className="m-0 p-0">
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             {resume?.has_met_requirements
//                               ? "Yes"
//                               : "No"}
//                           </p>
//                         </li>
//                       </ul>
//                     </div>

//                     {/* Are you associated with a political party? Do not include which party if associated. */}
//                     <div className="resumeCard_achievements mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Are you associated with a political party? Do not
//                         include which party if associated.
//                       </h5>

//                       <ul className="m-0 p-0">
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             {resume?.politicalPartyAssociated ? "Yes" : "No"}
//                           </p>
//                         </li>
//                       </ul>
//                     </div>

//                     {/* Are you associated with any business or lobby that could benefit financially? */}
//                     <div className="resumeCard_achievements mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Are you associated with any business or lobby that could
//                         benefit financially?
//                       </h5>

//                       <ul className="m-0 p-0">
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             {resume?.businessOrLobbyAssociation ? "Yes" : "No"}
//                           </p>
//                         </li>
//                       </ul>
//                     </div>

//                     {/* Drug Test */}
//                     <div className="resumeCard_achievements mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Drug Test
//                       </h5>

//                       <ul className="m-0 p-0">
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             Result : {resume?.drugTest?.result || "N/A"}
//                           </p>
//                         </li>
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             Date :{" "}
//                             {resume?.drugTest?.date
//                               ? moment(resume?.drugTest?.date).format(
//                                   "MM/DD/YYYY",
//                                 )
//                               : "N/A"}
//                           </p>
//                         </li>
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             Company : {resume?.drugTest?.company || "N/A"}
//                           </p>
//                         </li>
//                       </ul>
//                     </div>

//                     {/* Competency Test */}
//                     <div className="resumeCard_achievements mb-3">
//                       <h5 className="text-black fw-bold fs-18 mb-1">
//                         Competency Test
//                       </h5>

//                       <ul className="m-0 p-0">
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             Result : {resume?.competencyTest?.result || "N/A"}
//                           </p>
//                         </li>
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             Date :{" "}
//                             {resume?.competencyTest?.date
//                               ? moment(resume?.competencyTest?.date).format(
//                                   "MM/DD/YYYY",
//                                 )
//                               : "N/A"}
//                           </p>
//                         </li>
//                         <li className="d-flex gap-2 align-items-start">
//                           <span className="">
//                             <Bluecheckicon />
//                           </span>
//                           <p className="m-0">
//                             Company : {resume?.competencyTest?.company || "N/A"}
//                           </p>
//                         </li>
//                       </ul>
//                     </div>
//                   </Col>
//                 </Row>
//               </div>
//             </div>
//           ) : (
//             <Nodata />
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default ResumeCard;

import React from "react";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import { Bluecheckicon, VerifyIcon } from "../../../../Assets/svg/Allsvgicons";

// images
import Resume from "../../../../Assets/images/resume.png";
import moment from "moment";
import { getMetaValue } from "../../../../Utilities/extractMeta";
import { Skeleton } from "primereact/skeleton";
import { Spinner } from "reactstrap";
import Nodata from "../../../../Component/ui/Nodata";

const ResumeCard = (props) => {
  const { candidate, isFetching, isLoading } = props;
  const resume = candidate?.resume;

  // Helper function to get meta values
  const getMetaValueFromData = (key, defaultValue = "N/A") => {
    if (!candidate?.meta_data) return defaultValue;
    const metaItem = candidate.meta_data.find((item) => item.key === key);
    return metaItem?.value || defaultValue;
  };

  console.log(resume, "resume======<>");
  console.log("Meta Data:", candidate?.meta_data);

  // Get eligibility values from meta_data
  const isCandidateForOtherSeats = getMetaValueFromData(
    "is_candidate_for_other_seats",
  );
  const hasMetRequirements = getMetaValueFromData("has_met_requirements");

  return (
    <>
      {isFetching || isLoading ? (
        <div className="loader d-flex justify-content-center align-items-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {resume ? (
            <div className="resumeCard_details p-3">
              <div className="resumeCard_header mb-3 bg-white p-3 rounded d-flex align-items-center justify-content-between">
                <div className="">
                  <h4 className="m-0 theme_text fw-bold d-flex align-items-center gap-2">
                    {resume?.name}
                    <VerifyIcon
                      height={28}
                      width={28}
                      checkcolor="#fff"
                      iconcolor="#1E3A8A"
                    />
                  </h4>
                  <p className="m-0">
                    Verified By{" "}
                    {getMetaValue(candidate?.meta_data, "verifier_name")}{" "}
                  </p>
                </div>

                <div className="resumeCard_img" style={{ opacity: "0.2" }}>
                  <Image
                    src={Resume}
                    alt="profile"
                    width={50}
                    height={50}
                    className="img-fluid"
                  />
                </div>
              </div>

              <div className="position-relative centerborder mt-4">
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    {/* experience */}
                    <div className="resumeCard_experience mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Experience
                      </h5>

                      <ul className="m-0 p-0">
                        {resume?.workHistory?.map((workHistory, index) => {
                          return (
                            <li
                              key={index}
                              className="d-flex gap-2 align-items-start"
                            >
                              <span className="">
                                <Bluecheckicon />
                              </span>
                              <p className="m-0">{workHistory?.description}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* education */}
                    <div className="resumeCard_education mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Education
                      </h5>

                      <ul className="m-0 p-0">
                        {resume?.education?.map((education, index) => {
                          return (
                            <li
                              key={index}
                              className="d-flex gap-2 align-items-start"
                            >
                              <span className="">
                                <Bluecheckicon />
                              </span>
                              <p className="m-0">{education?.degree}</p> {" -"}
                              <p className="m-0">{education?.university}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* achievements */}
                    <div className="resumeCard_achievements mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Achievements
                      </h5>

                      <ul className="m-0 p-0">
                        {resume?.achievements?.map((achievement, index) => {
                          return (
                            <li
                              key={index}
                              className="d-flex gap-2 align-items-start"
                            >
                              <span className="">
                                <Bluecheckicon />
                              </span>
                              <p className="m-0">{achievement?.description}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Col>

                  <Col lg={6} md={6} sm={12} className="ps-lg-5">
                    {/* Eligibility Section - New */}
                    <div className="resumeCard_eligibility mb-4">
                      <h5 className="text-black fw-bold fs-18 mb-2">
                        Eligibility Status
                      </h5>

                      {/* Are you currently a candidate for any other seats? */}
                      <div className="mb-3">
                        <h6 className="fw-semibold fs-14 mb-1">
                          Are you currently a candidate for any other seats?
                        </h6>
                        <ul className="m-0 p-0">
                          <li className="d-flex gap-2 align-items-start">
                            <span className="">
                              <Bluecheckicon />
                            </span>
                            <p className="m-0 fw-medium">
                              {isCandidateForOtherSeats === "yes" ? (
                                <span className="text-danger">Yes</span>
                              ) : isCandidateForOtherSeats === "no" ? (
                                <span className="text-success">No</span>
                              ) : (
                                "N/A"
                              )}
                            </p>
                          </li>
                        </ul>
                      </div>

                      {/* Have you met all the requirements? */}
                      <div className="mb-3">
                        <h6 className="fw-semibold fs-14 mb-1">
                          Have you met all the requirements set by the state and
                          county election commissions?
                        </h6>
                        <ul className="m-0 p-0">
                          <li className="d-flex gap-2 align-items-start">
                            <span className="">
                              <Bluecheckicon />
                            </span>
                            <p className="m-0 fw-medium">
                              {hasMetRequirements === "yes" ? (
                                <span className="text-success">Yes</span>
                              ) : hasMetRequirements === "no" ? (
                                <span className="text-danger">No</span>
                              ) : (
                                "N/A"
                              )}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Have you met minimum state and county requirements to run for this office? */}
                    <div className="resumeCard_achievements mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Have you met minimum state and county requirements to
                        run for this office?
                      </h5>

                      <ul className="m-0 p-0">
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            {resume?.meetsStateCountyRequirements
                              ? "Yes"
                              : "No"}
                          </p>
                        </li>
                      </ul>
                    </div>

                    {/* Are you associated with a political party? */}
                    <div className="resumeCard_achievements mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Are you associated with a political party? Do not
                        include which party if associated.
                      </h5>

                      <ul className="m-0 p-0">
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            {resume?.politicalPartyAssociated ? "Yes" : "No"}
                          </p>
                        </li>
                      </ul>
                    </div>

                    {/* Are you associated with any business or lobby that could benefit financially? */}
                    <div className="resumeCard_achievements mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Are you associated with any business or lobby that could
                        benefit financially?
                      </h5>

                      <ul className="m-0 p-0">
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            {resume?.businessOrLobbyAssociation ? "Yes" : "No"}
                          </p>
                        </li>
                      </ul>
                    </div>

                    {/* Drug Test */}
                    <div className="resumeCard_achievements mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Drug Test
                      </h5>

                      <ul className="m-0 p-0">
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            Result : {resume?.drugTest?.result || "N/A"}
                          </p>
                        </li>
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            Date :{" "}
                            {resume?.drugTest?.date
                              ? moment(resume?.drugTest?.date).format(
                                  "MM/DD/YYYY",
                                )
                              : "N/A"}
                          </p>
                        </li>
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            Company : {resume?.drugTest?.company || "N/A"}
                          </p>
                        </li>
                      </ul>
                    </div>

                    {/* Competency Test */}
                    <div className="resumeCard_achievements mb-3">
                      <h5 className="text-black fw-bold fs-18 mb-1">
                        Competency Test
                      </h5>

                      <ul className="m-0 p-0">
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            Result : {resume?.competencyTest?.result || "N/A"}
                          </p>
                        </li>
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            Date :{" "}
                            {resume?.competencyTest?.date
                              ? moment(resume?.competencyTest?.date).format(
                                  "MM/DD/YYYY",
                                )
                              : "N/A"}
                          </p>
                        </li>
                        <li className="d-flex gap-2 align-items-start">
                          <span className="">
                            <Bluecheckicon />
                          </span>
                          <p className="m-0">
                            Company : {resume?.competencyTest?.company || "N/A"}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <Nodata />
          )}
        </>
      )}
    </>
  );
};

export default ResumeCard;
