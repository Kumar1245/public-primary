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
import moment from "moment";
import { eventTypeOptions } from "../../Utilities/const";

const UpcomingeventsCard = (props) => {
  const { data } = props;
  return (
    <div className="ConstituencyCard commonCard p-3">
      <div className="d-flex align-items-start gap-2 mb-2 justify-content-between">
        <div className="leftcontent">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h5 className="fw-semibold m-0">{data?.title}</h5>
            <p className="bluetagborder m-0">
              {eventTypeOptions.find((opt) => opt.value === data?.type)?.label}
            </p>
          </div>

          <p className="m-0">{data?.description}</p>

          {/* <p className="submited m-0">
            Submitted by {data.submittedBy} &middot; {data.submittedTime}
          </p> */}
        </div>
      </div>

      <div className="datesection d-flex align-items-start gap-3  gap-2 mt-3 flex-wrap">
        <div className="d-flex align-items-start gap-2">
          <span>
            <Eventcalicon />
          </span>
          <p className="fw-semibold m-0">
            {data?.eventDate && moment(data?.eventDate).format("MM/DD/YYYY")}
          </p>
        </div>
        <div className="d-flex align-items-start gap-2">
          <span>
            <Eventclockicon />
          </span>
          <p className="fw-semibold m-0">
            {data?.startTime}-{data?.endTime}
          </p>
        </div>
        <div className="d-flex align-items-start gap-2">
          <span>
            <Eventlocationicon />
          </span>
          <p className="fw-semibold m-0">{data?.location?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingeventsCard;
