import React from "react";
import Avatar from "../../../../Component/ui/Avatar";

// images
import Presimg from "../../../../Assets/images/presimg.png";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_CONSTITUENCY_SNAP } from "../../../../services/ApiCalls";
import { checkResponse } from "../../../../Utilities/commonFunc";

const ConstituencyCard = (props) => {
  const { data } = props;
  const { data: constituencySnap, isFetching } = useQuery({
    queryKey: ["constituency-snap"],
    queryFn: async () => {
      const res = await DASHBOARD_CONSTITUENCY_SNAP();

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  return (
    <div className="Constituency_presidential commonCard">
      <div className="presidential_user d-flex align-items-center gap-2 p-4 border-bottom">
        <Avatar src={Presimg} alt="user" width={100} height={100} />
        <h4 className="fw-bold m-0 theme_text">{data?.name}</h4>
      </div>

      <div className="Constituency_presidential_four">
        <ul className="m-0 p-0">
          <li>
            <div className="inner_box">
              <h4>{constituencySnap?.totalVoters}</h4>
              <p>Total Registered Voters</p>
            </div>
          </li>
          <li>
            <div className="inner_box">
              <h4>{constituencySnap?.lastElectionTurnout}</h4>
              <p>Last Election Turnout</p>
            </div>
          </li>
          <li>
            <div className="inner_box">
              <h4>{constituencySnap?.activeVoterIdeas}</h4>
              <p>Active Voter Ideas</p>
            </div>
          </li>

          <li>
            <div className="inner_box">
              <h4>{constituencySnap?.rivalCandidates}</h4>
              <p>Rival Candidates</p>
            </div>
          </li>
          {/* <li>
            <div className="inner_box">
              <h4>Robert Johnson</h4>
              <p>Current Office Holder</p>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ConstituencyCard;
