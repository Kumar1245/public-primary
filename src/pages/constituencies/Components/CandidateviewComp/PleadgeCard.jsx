import React, { useState } from "react";
import { VotesIcon, VotesStatusIcon } from "../../../../Assets/svg/Allsvgicons";
import PeadgeVoteMod from "../../Modal/PeadgeVoteMod";
import { formatNumber } from "../../../../lib/helper";
import { useAuth } from "../../../../context/AuthContext";
import { Spinner } from "reactstrap";
import { useRouter } from "next/router";

const PleadgeCard = (props) => {
  const router = useRouter();
  const { user, isAuthenticated, authReady } = useAuth();
  const { candidate, setVotePledgeAdded, isFetching, isLoading } = props;
  const [pledgeMod, setPledgeMod] = useState(false);

  const handleProtectedAction = (action) => {
    if (!authReady) return;

    if (!isAuthenticated) {
      sessionStorage.setItem(
        "redirectAfterLogin",
        `/constituencies/candidate-view/${candidate?._id}`,
      );
      router.push("/auth/login");
      return;
    }

    action();
  };

  return (
    <>
      <PeadgeVoteMod
        show={pledgeMod}
        onhide={() => setPledgeMod(false)}
        candidate={candidate}
        setVotePledgeAdded={setVotePledgeAdded}
      />
      <div className="PleadgeCardShow  d-flex align-items-center flex-wrap gap-2 justify-content-center">
        {isFetching || isLoading ? (
          <div className="loader d-flex justify-content-center align-items-center py-4 my-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <div className="commonpledge orangeCard">
              <h3 className="fw-bold ">
                {formatNumber(candidate?.voterTurnoutLastElection || 0)}
              </h3>
              <p className="m-0">Voter Turnout (Last Election)</p>
            </div>
            <div className="commonpledge blueCard">
              <h3 className="fw-bold">
                {" "}
                {formatNumber(candidate?.currentPledgeVotes || 0)}
              </h3>
              <p className="m-0">Current Pledge Votes</p>
            </div>
            {user?.role === "VOTER" && (
              <>
                {candidate?.isVotePledge ? (
                  <div className="commonpledge lightBlueCard">
                    <h3>
                      <VotesStatusIcon />
                    </h3>
                    <p className="m-0">Vote already pledged</p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleProtectedAction(() => setPledgeMod(true))}
                    className="text-decoration-none border-0 bg-transparent p-0"
                  >
                    <div className="commonpledge lightBlueCard">
                      <h3>
                        <VotesIcon />
                      </h3>
                      <p className="m-0">Pledge Your Vote here</p>
                    </div>
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PleadgeCard;
