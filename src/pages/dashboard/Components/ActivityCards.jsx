import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Activebookingicon,
  Montlyrevueicon,
  TodayrevnueIcon,
  TotaluserIcon,
} from "../../../Assets/svg/Allsvgicons";
import InnerSingleCardSkeleton from "../../../Component/Skelton/InnerSingleCardSkeleton ";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../../Utilities/commonFunc";
import { DASHBOARD_SUMMARY } from "../../../services/ApiCalls";

let carddata = [
  {
    icon: <TotaluserIcon />,
    cardhead: "Total Pledges",
    bgcolor: "#E6EEFF",
    customer: true,
    key: "totalPledges",
  },

  {
    icon: <Activebookingicon />,
    cardhead: "Current Rank",
    bgcolor: "#FFF2CF",
    active: true,
    key: "currentRank",
  },

  {
    icon: <TodayrevnueIcon />,
    cardhead: "Ideas Adopted",
    bgcolor: "#D7FFE3",
    revenue: true,
    key: "ideasAdopted",
  },

  {
    icon: <Montlyrevueicon />,
    cardhead: "Upcoming Events",
    bgcolor: "#FFE6E6",
    monthlurevenue: true,
    key: "upcomingEvents",
  },
];

const InnerSingleCard = ({ data, value }) => {
  return (
    <div className="innersinglecardSec commonCard p-3 shadow-sm">
      <div className="innersinglecardSec_left">
        <h6>{data.cardhead}</h6>

        <div className="d-flex align-items-center gap-2">
          <div
            className="cardicon d-flex align-items-center justify-content-center"
            style={{ backgroundColor: data.bgcolor }}
          >
            {data.icon}
          </div>
          <h4 className="totalcustomer m-0 fw-bold">{value}</h4>
        </div>
      </div>
    </div>
  );
};

const ActivityCards = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const { data: dashboardSummary, isFetching } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await DASHBOARD_SUMMARY();

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
    <div className="">
      <Row>
        {loading
          ? [...Array(carddata.length)].map((_, idx) => (
              <Col lg={3} md={6} sm={12} key={idx}>
                <InnerSingleCardSkeleton />
              </Col>
            ))
          : carddata.map((item, idx) => {
              return (
                <Col lg={3} md={6} sm={12} key={idx}>
                  <InnerSingleCard
                    data={item}
                    value={dashboardSummary?.[item.key]}
                  />
                </Col>
              );
            })}
      </Row>
    </div>
  );
};

export default ActivityCards;
