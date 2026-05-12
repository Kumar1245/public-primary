import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DashboardLayout from "../../../Layout/Dashboardlayout";
import BreadCrumb from "../../../Component/Common/BreadCrumb";
import { Eventcaladericon } from "../../../Assets/svg/Allsvgicons";
import NeweventTabComp from "./Components/NeweventTabComp";
import CalendertabComp from "./Components/CalendertabComp";
import Buttontheme from "../../../Component/ui/Buttontheme";
import AddeventMod from "./Modal/AddeventMod";
import usePaginatedList from "../../../hooks/usePaginatedList";
import { EVENTLISTAPI } from "../../../services/ApiCalls";

const Events = () => {
  const [addModal, setAddModal] = useState(false);
  const [status, setStatus] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePaginatedList({
      queryKey: ["EventList", status],

      fetchFn: async ({ page, limit }) => {
        const res = await EVENTLISTAPI({
          status, 
          page,
          limit: 10,
          order: -1,
        });
        return res?.data;
      },
    });

  const EventData = data?.pages?.flatMap((p) => p?.data || []) || [];

  return (
    <>
      <AddeventMod show={addModal} onhide={() => setAddModal(false)} />

      <section className="Constituency_ideas">
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
            <div className="sectionheadings">
              <h3 className="fw-bold">Events</h3>
              <BreadCrumb />
            </div>

            <div className="eventshandlebtn d-flex align-items-center gap-2">
              <Buttontheme
                className="eventtBtn"
                onClick={() => setAddModal(true)}
              >
                + New Event
              </Buttontheme>
            </div>
          </div>

          <NeweventTabComp data={EventData} setStatus={setStatus} />
        </Container>
      </section>
    </>
  );
};

export default Events;

Events.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
