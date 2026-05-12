import React from "react";
import Image from "next/image";

// images
import Flagimg from "../../../Assets/images/flagimg.png";
import { DASHBOARD_CONSTITUENCY_SNAP } from "../../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../../Utilities/commonFunc";

const Constituencysnapshot = () => {
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
    <div className="SnapshotCard commonCard shadow-sm">
      <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
        <h5 className="commonCardHead m-0">Constituency Snapshot</h5>
      </div>

      <div className="SnapshotCard_flag d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
        <h4>{constituencySnap?.name}</h4>

        <div className="flagimg">
          <Image
            src={constituencySnap?.image?.link || Flagimg}
            alt="flag"
            width={100}
            height={100}
            className="img-fluid"
          />
        </div>
      </div>

      <div className="SnapshotCard_four">
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
        </ul>
      </div>

      {/* <div className=" p-4 border-top">
        <h5 className="commonCardHead m-0">Robert Johnson</h5>
        <p className="m-0">Current Office Holder</p>
      </div> */}
    </div>
  );
};

export default Constituencysnapshot;
