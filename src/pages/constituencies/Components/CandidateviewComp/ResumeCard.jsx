import React from "react";
import { Bluecheckicon, VerifyIcon } from "../../../../Assets/svg/Allsvgicons";
import { getMetaValue } from "../../../../Utilities/extractMeta";
import { Skeleton } from "primereact/skeleton";
import Nodata from "../../../../Component/ui/Nodata";

const profileData = {
  name: "Sarah Martinez",
  age: 34,
  verified: true,
  verifiedBy: "Mr. William",

  experience: [
    {
      title: "12+ years in public administration",
    },
    {
      title: "Former City Council Member",
      duration: "2016–2024",
    },
    {
      title: "Led infrastructure & smart-city development projects",
    },
  ],

  education: [
    {
      degree: "Master’s in Public Policy",
      university: "Columbia University",
    },
    {
      degree: "Bachelor’s in Economics",
      university: "State University",
    },
  ],

  keyPriorities: [
    "Smart infrastructure",
    "Job creation & local business growth",
    "Affordable housing",
    "Clean & safe neighborhoods",
  ],

  achievements: [
    "Reduced city traffic congestion by 22%",
    "Launched 'Green Springfield' sustainability program",
    "Increased municipal transparency through open-data portal",
  ],
};

const ResumeCard = (props) => {
  const { candidate, isFetching, isLoading } = props;
  console.log(candidate,"candidate=================")
  
  const resume = candidate?.resume;

  return (
    <div className="resumeCard commongrey">
      <h5 className="text-black fw-bold fs-22 p-3 border-bottom">Resume</h5>
      {isFetching || isLoading ? (
        <Skeleton width="100%" />
      ) : (
        <>
          {resume ? (
            <div className="resumeCard_details p-3">
              <div className="resumeCard_header mb-3">
                <h4 className="m-0 theme_text fw-bold d-flex align-items-center gap-2">
                  {resume?.name}
                  {candidate?.status == "active" && (
                    <VerifyIcon
                      height={28}
                      width={28}
                      checkcolor="#fff"
                      iconcolor="#1E3A8A"
                    />
                  )}
                </h4>
                <p className="m-0">
                  Verified By{" "}
                  {getMetaValue(candidate?.meta_data, "verifier_name")}
                </p>
              </div>

              {/* experience */}
              <div className="resumeCard_experience mb-3">
                <h5 className="text-black fw-bold fs-18 mb-1">Experience</h5>

                <ul className="m-0 p-0">
                  {resume?.workHistory?.map((item, idx) => (
                    <li key={idx} className="d-flex gap-2 align-items-start">
                      <span className="">
                        <Bluecheckicon />
                      </span>
                      <p className="m-0">{item?.description}</p>
                      {/* {item.duration && <p className="m-0">{item.duration}</p>} */}
                    </li>
                  ))}
                  {resume?.workHistory?.length === 0 && (
                    <li className="text-center">No experience found.</li>
                  )}
                </ul>
              </div>

              {/* education */}
              <div className="resumeCard_education mb-3">
                <h5 className="text-black fw-bold fs-18 mb-1">Education</h5>

                <ul className="m-0 p-0">
                  {resume?.education?.map((item, idx) => (
                    <li key={idx} className="d-flex gap-2 align-items-start">
                      <span className="">
                        <Bluecheckicon />
                      </span>
                      <p className="m-0">{item.degree}</p> {" -"}
                      <p className="m-0">{item.university}</p>
                    </li>
                  ))}
                  {resume?.education?.length === 0 && (
                    <li className="text-center">No education found.</li>
                  )}
                </ul>
              </div>

              {/* key priorities */}
              {/* <div className="resumeCard_keypriorities mb-3">
                <h5 className="text-black fw-bold fs-18 mb-1">
                  Key Priorities
                </h5>

                <ul className="m-0 p-0">
                  {resume?.keyPriorities?.map((item, idx) => (
                    <li key={idx} className="d-flex gap-2 align-items-start">
                      <span className="">
                        <Bluecheckicon />
                      </span>
                      <p className="m-0">{item?.description}</p>
                    </li>
                  ))}
                  {resume?.keyPriorities?.length === 0 && (
                    <li className="text-center">No key priorities found.</li>
                  )}
                </ul>
              </div> */}

              {/* achievements */}
              <div className="resumeCard_achievements mb-3">
                <h5 className="text-black fw-bold fs-18 mb-1">Achievements</h5>

                <ul className="m-0 p-0">
                  {resume?.achievements?.map((item, idx) => (
                    <li key={idx} className="d-flex gap-2 align-items-start">
                      <span className="">
                        <Bluecheckicon />
                      </span>
                      <p className="m-0">{item?.description}</p>
                    </li>
                  ))}
                  {resume?.achievements?.length === 0 && (
                    <li className="text-center">No achievements found.</li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <Nodata />
          )}
        </>
      )}
    </div>
  );
};

export default ResumeCard;
