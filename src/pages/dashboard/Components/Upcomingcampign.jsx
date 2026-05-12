import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";

// images
import Eventimg from "../../../Assets/images/eventimg.png";
import Avatar from "../../../Component/ui/Avatar";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_UPCOMING_EVENTS } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import moment from "moment/moment";
import { eventTypeOptions } from "../../../Utilities/const";
import Nodata from "../../../Component/ui/Nodata";

const EveentSkeleton = () => {
  return (
    <div className="ConstituencyCard activity_list p-3 d-flex align-items-center gap-3">
      <Skeleton shape="circle" width="46px" height="46px" />

      <div className="activity_list_content w-100">
        <div className="eventinfo d-flex align-items-center gap-2 mb-1">
          <Skeleton width="180px" height="18px" />
          <Skeleton width="60px" height="14px" />
        </div>

        <Skeleton width="120px" height="14px" />
      </div>
    </div>
  );
};

const Upcomingcampign = () => {
  const {
    data: upcomingEvents,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const res = await DASHBOARD_UPCOMING_EVENTS();

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
    <div className="campaignactivity commonCard shadow-sm">
      <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
        <h5 className="commonCardHead m-0">Upcoming Campaign Activities</h5>

        <Link
          href="/dashboard/events"
          className="seeall theme_text fw-semibold text-decoration-none fs-18"
        >
          See All
        </Link>
      </div>

      <div className="alltopvoters p-3">
        <ul className="m-0 p-0">
          {isFetching || isLoading
            ? [...Array(upcomingEvents?.length || 5)].map((_, idx) => (
                <li key={idx}>
                  <EveentSkeleton />
                </li>
              ))
            : upcomingEvents?.map((item, idx) => {
                return (
                  <li key={idx}>
                    <div className="ConstituencyCard  activity_list p-3 d-flex align-items-center gap-3">
                      {/* <Avatar
                        src={item?.eventimg}
                        alt="eventimg"
                        width={100}
                        height={100}
                      /> */}
                      <div className="activity_list_content">
                        <div className="eventinfo d-flex align-items-center gap-2">
                          <h5 className="mb-1">{item?.title}</h5> &middot;
                          <p className="m-0 eventtype theme_text">
                            {
                              eventTypeOptions.find(
                                (opt) => opt.value === item?.type,
                              )?.label
                            }
                          </p>
                        </div>

                        <p className="m-0">
                          Date :{" "}
                          {moment(item?.eventDate).format("MMM DD, YYYY")}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
          {!isFetching && upcomingEvents?.length === 0 && <Nodata />}
        </ul>
      </div>
    </div>
  );
};

export default Upcomingcampign;
