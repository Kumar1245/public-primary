import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import UpcomingeventsCard from "../../../../Component/CommonCard/UpcomingeventsCard";
import UpcomingeventsCardSkelton from "../../../../Component/Skelton/UpcomingeventsCardSkelton";
import { checkResponse } from "../../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";
import { CANDIDATE_UPCOMING_EVENT_LIST } from "../../../../services/ApiCalls";
import Nodata from "../../../../Component/ui/Nodata";

const eventsData = [
  {
    id: 1,
    title: "Meet & Greet with Voters",
    category: "Meet & Greet",
    status: "Upcoming",
    description:
      "Join me for an informal evening to discuss your concerns and ideas",
    submittedBy: "John Doe",
    submittedTime: "2 weeks ago",
    date: "11/20/2025",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, 123 Main St",
    attendees: {
      current: 45,
      total: 100,
      capacityPercent: 45,
    },
  },
  {
    id: 2,
    title: "Meet & Greet with Voters",
    category: "Meet & Greet",
    status: "Upcoming",
    description:
      "Join me for an informal evening to discuss your concerns and ideas",
    submittedBy: "John Doe",
    submittedTime: "2 weeks ago",
    date: "11/20/2025",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, 123 Main St",
    attendees: {
      current: 45,
      total: 100,
      capacityPercent: 45,
    },
  },
  {
    id: 3,
    title: "Neighborhood Walkabout",
    category: "Door-to-Door",
    status: "Completed",
    description: "Walking through the neighborhood to meet residents",
    submittedBy: "John Doe",
    submittedTime: "2 weeks ago",
    date: "11/20/2025",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, 123 Main St",
    attendees: {
      current: 0,
      total: 0,
      capacityPercent: 0,
    },
  },
];

const Upcomingevent = (props) => {
  const { id } = props;
  const {
    data: events,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const res = await CANDIDATE_UPCOMING_EVENT_LIST({ userid: id });

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });

  return (
    <div>
      <h5 className="text-black fw-bold fs-22 py-2">Upcoming Events</h5>
      <div className="UpcomingEvents">
        <Row>
          {isFetching || isLoading
            ? [...Array(events?.length || 6)].map((_, idx) => (
                <Col lg={12} key={idx}>
                  <UpcomingeventsCardSkelton />
                </Col>
              ))
            : events?.map((item, idx) => {
                return (
                  <Col lg={12} key={idx}>
                    <UpcomingeventsCard data={item} />
                  </Col>
                );
              })}
          {!isFetching && events?.length === 0 && <Nodata />}
        </Row>
      </div>
    </div>
  );
};

export default Upcomingevent;
