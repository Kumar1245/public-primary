import React from "react";
import classnames from "classnames";
import {
  Attendeesicon,
  CommentEditicon,
  Deleteicon,
  Eventcalicon,
  Eventclockicon,
  Eventlocationicon,
} from "../../Assets/svg/Allsvgicons";
import { Progress } from "reactstrap";
import { eventTypeOptions } from "../../Utilities/const";
import { getTimeAgo } from "../../lib/helper";

const EventsCard = ({ data, onEditClick, onCancelClick }) => {

  const adaptedData = {
    ...data,
    category: data.category || data.type,
    date: data.date || new Date(data.eventDate).toLocaleDateString(),
    time: data.time || `${data.startTime} - ${data.endTime}`,
    location: data.location?.address || "",
    status: data?.status,
    attendees: data.maxAttendees,
  };

  return (
    <div className="ConstituencyCard commonCard p-3">
      <div className="ConstituencyCardtop d-flex align-items-start gap-2 mb-2 justify-content-between">
        <div className="leftcontent">
          <div className="leftcontentHead d-flex align-items-center gap-2 mb-2">
            <h5 className="fw-semibold m-0">{adaptedData.title}</h5>
            <p className="bluetagborder m-0">
              {
                eventTypeOptions.find(
                  (opt) => opt.value === adaptedData?.category,
                )?.label
              }
            </p>
          </div>

          <p className="m-0">{adaptedData.description}</p>

          <p className="submited m-0">
            Submitted by {adaptedData.submittedBy || "You"} &middot;{" "}
            {adaptedData.date_created_utc
              ? getTimeAgo(adaptedData.date_created_utc)
              : "just now"}
          </p>
        </div>

        <div className="rightstatus">
          <p
            className={classnames(
              "statusstatus m-0 text-capitalize",
              adaptedData.status,
            )}
          >
            {adaptedData.status}
          </p>
        </div>
      </div>

      <div className="datesection d-flex align-items-start gap-lg-5 gap-md-3 gap-2 my-3 flex-wrap">
        <div className="d-flex align-items-start gap-2">
          <Eventcalicon />
          <p className="fw-semibold m-0">{adaptedData.date}</p>
        </div>

        <div className="d-flex align-items-start gap-2">
          <Eventclockicon />
          <p className="fw-semibold m-0">{adaptedData.time}</p>
        </div>

        <div className="d-flex align-items-start gap-2">
          <Eventlocationicon />
          <p className="fw-semibold m-0">{adaptedData.location}</p>
        </div>
      </div>

      {/* {adaptedData.status === "upcoming" && ( */}
      <div>
        <div className="attendees p-2">
          {/* Top row */}
          <div className="d-flex justify-content-between align-items-center">
            <p className="m-0 d-flex align-items-center fs-14 text-black">
              <Attendeesicon className="me-2" />
              <span className="px-2">
                {adaptedData?.attendees?.current ?? 0} /{" "}
                {adaptedData?.attendees ?? 0} Attendees
              </span>
            </p>

            <p className="m-0 fs-14 text-muted">
              {adaptedData?.attendees?.total > 0
                ? Math.round(
                    (Number(adaptedData.attendees.current || 0) /
                      Number(adaptedData.attendees)) *
                      100,
                  )
                : 0}
              % capacity
            </p>
          </div>

          {/* Progress bar */}
          <Progress
            className="mt-2"
            value={
              (adaptedData.attendees.current / adaptedData.attendees.total) *
              100
            }
            max={100}
            style={{ background: "#fff", height: "5px" }}
          />
        </div>
        {adaptedData.status === "upcoming" && (
          <div className="actionBtns d-flex aling-items-center gap-3 mt-3">
            <button className="editactbtn btncommon" onClick={onEditClick}>
              <CommentEditicon /> Edit Event
            </button>
            <button className="removeactbtn btncommon" onClick={onCancelClick}>
              <Deleteicon /> Cancel Event
            </button>
          </div>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default EventsCard;
