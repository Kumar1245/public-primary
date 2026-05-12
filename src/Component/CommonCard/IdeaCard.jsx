import React, { useState } from "react";
import {
  Commentsicon,
  Optiondoticon,
  Starfill,
} from "../../Assets/svg/Allsvgicons";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import moment from "moment";
import { getTimeAgo } from "../../lib/helper";

const IdeaCard = ({ data, onCommentClick, onReportClick }) => {
  return (
    <div className="ConstituencyCard commonCard p-3">
      <div className="d-flex align-items-start gap-2 mb-2 justify-content-between">
        <div className="iteaCardtittle d-flex align-items-center gap-2 mb-2">
          <h5 className="fw-semibold m-0">{data.title}</h5>
          <p className="bluetag m-0">{data?.category?.name}</p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {data?.action && (
            <UncontrolledDropdown>
              <DropdownToggle>
                <Optiondoticon />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="text_red" onClick={onReportClick}>
                  Report
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </div>
      </div>

      <p className="m-0">{data?.description}</p>

      <p className="submited m-0">
        Submitted by {data?.submittedByName} &middot;{" "}
        {data?.submittedOn ? getTimeAgo(data?.submittedOn) : "just now"}
      </p>

      <div className="d-flex align-items-center gap-4 my-3">
        <p className="m-0 d-flex align-items-center gap-2">
          <Starfill width={20} height={20} color="#FFB420" />
          {data?.rating}({data?.ratingsCount} Ratings)
        </p>

        <p
          className="m-0 d-flex align-items-center gap-2"
          onClick={onCommentClick ? () => onCommentClick(data) : undefined}
          style={{ cursor: onCommentClick ? "pointer" : "default" }}
        >
          <Commentsicon />({data?.commentsCount || 0} Comments)
        </p>
      </div>
      {data?.adoptedby?.length > 0 && (
        <div className="adopted p-3 d-flex align-items-center gap-2">
          <p className="m-0">Adopted by : </p>
          <ul className="adoptedlist d-flex align-items-center gap-2 m-0 p-0">
            {data?.adoptedby?.map((item, idx) => {
              return (
                <li key={idx}>
                  <p className="m-0">
                    {item} {idx !== data?.adoptedby?.length - 1 && ", "}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IdeaCard;
