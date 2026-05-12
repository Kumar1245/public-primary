import React from "react";
import { VerifyBlackIcon } from "../../../Assets/svg/Allsvgicons";
import { useAuth } from "../../../context/AuthContext";

const WelcomeCard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="welcomeCard p-4 d-flex align-items-start justify-content-between">
      <div className="leftWelcome_content">
        <h3>
          Welcome, {user?.name} <span className="wave">👋</span>
        </h3>
        <p>Here’s a summary of your campaign performance.</p>

        {/* <h5>Running for Mayor - District 5</h5> */}
      </div>
      {user?.status === "active" && (
        <p className="verifiedCandidate m-0 d-flex align-items-center gap-2">
          Verified Candidate{" "}
          <span>
            <VerifyBlackIcon />
          </span>
        </p>
      )}
    </div>
  );
};

export default WelcomeCard;
