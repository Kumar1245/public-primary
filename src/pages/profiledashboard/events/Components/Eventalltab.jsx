import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

// images

import UpcomingeventsCardSkelton from "../../../../Component/Skelton/UpcomingeventsCardSkelton";
import UpcomingeventsCard from "../../../../Component/CommonCard/UpcomingeventsCard";
import { ALL_EVENT_LIST_API } from "../../../../services/ApiCalls";
import { checkResponse } from "../../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";
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

const Eventalltab = (props) => {
  const { status } = props;
  const [body, setBody] = useState({
    page: 1,
    limit: 8,
    status: "",
  });

  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / body.limit);

  const {
    data: events,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["all-event-list", body.page, status],
    queryFn: async () => {
      const res = await ALL_EVENT_LIST_API({ ...body, status });

      const success = checkResponse({ res, setTotal: setTotalCount });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  return (
    <div>
      <div className="alltideas pe-3">
        <div className="UpcomingEvents">
          <Row>
            {isFetching || isLoading
              ? [...Array(events?.length || 3)].map((_, idx) => (
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
    </div>
  );
};

export default Eventalltab;
