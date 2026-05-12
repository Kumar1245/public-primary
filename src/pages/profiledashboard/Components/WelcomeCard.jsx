import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import React from "react";
import { Button } from "reactstrap";

const WelcomeCard = (props) => {
  const { profileData, isLoading, isFetching } = props;
  return (
    <div className="welocomeCard_voter">
      <div className="welocomeCard_voter_left">
        {isFetching || isLoading ? (
          <>
            <Skeleton width="100%" />
            <br></br>
            <Skeleton width="50%" />
          </>
        ) : (
          <>
            <h4 className="text-white">Welcome Back, {profileData?.name}</h4>
            {profileData?.role === "VOTER" && (
              // <p className="text-white">District 5 • Verified Voter</p>
              <p className="text-white">Verified Voter</p>
            )}
          </>
        )}
        {profileData?.role === "USER" && (
          <div className="general_user mt-3">
            You're currently a General User. To pledge votes and fully
            participate in elections, please verify your voter registration in
            your profile settings.
          </div>
        )}
      </div>
      {profileData?.role === "USER" && (
        <Link
          href="/auth/joinvoter"
          className="joinasvoter text-decoration-none"
        >
          Join as Voter
        </Link>
      )}
    </div>
  );
};

export default WelcomeCard;
