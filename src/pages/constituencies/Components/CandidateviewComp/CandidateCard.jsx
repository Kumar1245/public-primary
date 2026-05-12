import React from "react";
import Image from "next/image";

// image
import Candidateuser from "../../../../Assets/images/candidateuser.png";
import { VerifyIcon } from "../../../../Assets/svg/Allsvgicons";
import moment from "moment";
import { Skeleton } from "primereact/skeleton";

const CandidateCard = (props) => {
  const { candidate, isFetching, isLoading } = props;
  return (
    <div className="CandidateCardWrap p-3 d-flex align-items-center justify-content-start gap-3">
      <div className="CandidateCard_img">
        {isFetching || isLoading ? (
          <Skeleton width="100%" height="200px" />
        ) : (
          <>
            <Image
              src={candidate?.profileImage?.link || Candidateuser}
              alt="user"
              width={400}
              height={400}
              className="img-fluid"
            />
          </>
        )}
      </div>
      <div className="CandidateCard_content">
        {isFetching || isLoading ? (
          <>
            <Skeleton width="50%" />
            <br></br>
            <Skeleton width="50%" />
            <br></br>
            <Skeleton width="50%" />
            <br></br>
            <Skeleton width="50%" />
          </>
        ) : (
          <>
            <h4 className="text-white fw-bold d-flex align-items-center gap-2">
              {candidate?.name}{" "}
              <VerifyIcon
                height={28}
                width={28}
                checkcolor="#1E3A8A"
                iconcolor="#fff"
              />
            </h4>
            <ul className="m-0 p-0">
              <li>
                <strong>Email:</strong> {candidate?.email}
              </li>
              {/* <li>
            <strong>Phone Number:</strong> +1 368 736 7362
          </li> */}
              {candidate?.dateOfBirth && (
                <li>
                  <strong>DOB:</strong>{" "}
                  {moment(candidate?.dateOfBirth).format("MMMM DD, YYYY")} (Age:{" "}
                  {moment().diff(moment(candidate?.dateOfBirth), "years")})
                </li>
              )}
              <li>
                <strong>Address:</strong> {candidate?.address}
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
