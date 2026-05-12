import React, { useState, useEffect } from "react";

import VoterProfilelayout from "../../../Layout/VoterProfilelayout";
import CommonProfilehead from "../../../Component/ui/CommonProfilehead";
import Eventalltab from "./Components/Eventalltab";
import Nodata from "../../../Component/ui/Nodata";
import { Eventcaladericon } from "../../../Assets/svg/Allsvgicons";
import Buttontheme from "../../../Component/ui/Buttontheme";
import { useRouter } from "next/router";

const Events = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    // { id: "upcomingtendays", label: "Upcoming in 10 days" },
  ];
  return (
    <section className="Eventspage p-3">
      <div>
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div className="my-3">
            <CommonProfilehead title="Events" subtitle="" />
          </div>
          <Buttontheme
            className="calendarBtn"
            onClick={() => router.push("/profiledashboard/events/calendar")}
          >
            <span>
              <Eventcaladericon />
            </span>
            Calendar
          </Buttontheme>
        </div>

        <div className="tab-frame ideainnerframe">
          <div className="clearfix">
            {tabs.map((tab) => (
              <React.Fragment key={tab.id}>
                <input
                  type="radio"
                  name="tabinner"
                  id={tab.id}
                  checked={activeTab === tab.id}
                  onChange={() => setActiveTab(tab.id)}
                />
                <label htmlFor={tab.id}>{tab.label}</label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="innnertabcontent mt-4">
          <div className="eventall mt-4">
            <Eventalltab status={activeTab} />
          </div>

          {/* {activeTab === "upcomingtwodays" && (
            <div className="upconming mt-4">
              <Nodata />
            </div>
          )}

          {activeTab === "upcomingtendays" && (
            <div className="upconming mt-4">
              <Nodata />
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default Events;

Events.getLayout = function getLayout(page) {
  return <VoterProfilelayout>{page}</VoterProfilelayout>;
};
