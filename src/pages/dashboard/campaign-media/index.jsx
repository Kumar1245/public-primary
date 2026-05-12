import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DashboardLayout from "../../../Layout/Dashboardlayout";

import BreadCrumb from "../../../Component/Common/BreadCrumb";
import Buttontheme from "../../../Component/ui/Buttontheme";
import MediaCard from "./Components/MediaCard";

// images
import Mediaimg from "../../../Assets/images/mediaimg.png";
import Mediaimggif from "../../../Assets/images/prevmod.gif";

import ImageprevMod from "./Modal/ImageprevMod";
import AddnewvedioMod from "./Modal/AddnewvedioMod";
import MediaCardSkeleton from "../../../Component/Skelton/MediaCardSkeleton";
import { CAMPAIGNMEDIA, GETPROFILE } from "../../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../../Utilities/commonFunc";
import Nodata from "../../../Component/ui/Nodata";

const videoCards = [
  {
    id: 1,
    title: "Permanent Introductory Video",
    thumbnail: Mediaimg,
    date: null,
    status: "locked",
    actions: [],
  },
  {
    id: 2,
    title: "Current Campaign Video",
    thumbnail: Mediaimggif,
    date: "12 Aug 2025",
    status: "approved",
    actions: ["replace"],
  },
  {
    id: 3,
    title: "Current Campaign Video",
    thumbnail: Mediaimg,
    date: "12 Aug 2025",
    status: "pending",
    actions: ["replace"],
  },
];

const statusConfig = {
  locked: { label: "Locked", className: "status-locked", icon: true },
  approved: { label: "Approved", className: "status-approved" },
  pending: { label: "Pending", className: "status-pending" },
};

const Campaignmedia = () => {
  const [loading, setLoading] = useState(true);
  const [imageprev, setImageprev] = useState(false);
  const [imageprevData, setImageprevData] = useState(null);
  const [addvideo, setAddvideo] = useState(false);
  const [id, setId] = useState(false);

  const [body, setBody] = useState({
    page: 1,
    limit: 8,
    state: "",
    country: "US",
  });

  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / body.limit);

  const {
    data: campaigns,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["campaign-list", body.page],
    queryFn: async () => {
      const res = await CAMPAIGNMEDIA(body);

      const success = checkResponse({ res, setTotal: setTotalCount });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleimageprev = (data) => {
    setImageprevData(data);
    setImageprev(true);
  };

  console.log(campaigns, "data====<>");

  return (
    <>
      <ImageprevMod
        show={imageprev}
        onhide={() => setImageprev(false)}
        data={imageprevData}
      />

      <AddnewvedioMod
        show={addvideo}
        onhide={() => setAddvideo(false)}
        id={id}
        refetch={refetch}
      />
      <section className="Constituency_ideas">
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
            <div className="sectionheadings">
              <h3 className="fw-bold">Campaign Media</h3>
              <BreadCrumb />
            </div>

            <div className="eventshandlebtn d-flex align-items-center gap-2">
              <Buttontheme
                className="eventtBtn"
                onClick={() => setAddvideo(true)}
              >
                + New Video
              </Buttontheme>
            </div>
          </div>

          <div className="campaignCard">
            <Row>
              {loading || isFetching
                ? [...Array(campaigns?.length || 4)].map((_, idx) => (
                    <Col key={idx} lg={3} md={4} sm={6}>
                      <MediaCardSkeleton />
                    </Col>
                  ))
                : campaigns?.map((item, idx) => {
                    return (
                      <Col key={idx} lg={3} md={4} sm={6} className="p-3">
                        <MediaCard
                          data={item}
                          statusConfig={statusConfig}
                          onImageprev={handleimageprev}
                          handleChangeCampaign={() => {
                            setAddvideo(true);
                            setId(item?._id);
                          }}
                        />
                      </Col>
                    );
                  })}
              {!loading && campaigns?.length === 0 && <Nodata />}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Campaignmedia;

Campaignmedia.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
