import React from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import User from "../../Assets/images/user.png";
import { Viewdetailsicon } from "../../Assets/svg/Allsvgicons";
import { useRouter } from "next/router";
import moment from "moment";
import { useAuth } from "../../context/AuthContext";

const ResumeCard = (props) => {
  const { data } = props;
  const route = useRouter();
  const { isAuthenticated, authReady } = useAuth();

  // Handle authentication check for protected actions
  const handleViewCandidate = () => {
    if (!authReady) return;
    
    if (!isAuthenticated) {
      // Store the intended destination to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', `/constituencies/candidate-view/${data?._id}`);
      route.push('/auth/login');
      return;
    }
    route.push(`/constituencies/candidate-view/${data?._id}`);
  };

  return (
    <div className="ideaCard resumeCard overflow-hidden">
      <div className="resumeCard_head p-3 gap-2 d-flex align-items-center">
        <div className="resumeCard_user">
          <Image
            src={data.profileImage?.link || User}
            alt="user"
            width={40}
            height={40}
          />
        </div>
        <h4 className="m-0 text-white">{data?.name}</h4>
      </div>

      <div className="ResumeCard_innner p-3">
        {/* <div className="sidebyside d-flex">
          <p>Position Contesting:</p>
          <p>
            <strong className="theme_text">{data?.position}</strong>
          </p>
        </div> */}
        <div className="sidebyside d-flex">
          <p>Age:</p>
          <p>
            <strong>
              {" "}
              {moment().diff(moment(data?.dateOfBirth), "years")}
            </strong>
          </p>
        </div>

        <div className="sidebyside experience d-flex flex-column gap-0">
          <p>Experience:</p>
          {data?.resume?.workHistory?.map((workHistory, index) => {
            if (index < 2) {
              return <p key={index}>{workHistory?.description}</p>;
            }
            return null;
          })}

          {/* <p>{data?.councilmember}</p>
          <p>{data?.projects}</p> */}
        </div>
      </div>

      <div className="resumeCard_footer border-top p-3">
        <Button
          className="viewfull_details d-flex align-items-center "
          onClick={handleViewCandidate}
        >
          <span className="me-2">
            <Viewdetailsicon />
          </span>
          View Full Detail
        </Button>
      </div>
    </div>
  );
};

export default ResumeCard;
