import React from "react";
import Image from "next/image";
import { LocakimgIcon } from "../../../../Assets/svg/Allsvgicons";
import { renderMedia } from "../../../../lib/helper";
import moment from "moment";

const MediaCard = (props) => {
  const { data, statusConfig, onImageprev, handleChangeCampaign } = props;
  return (
    <div className="mediaCard commonCard p-4 h-100">
      <div
        className="mediaImage"
        onClick={() => onImageprev(data?.media?.link)}
      >
        {data?.media?.link && renderMedia(data?.media?.link) || ""}
      </div>

      <div className="mediaContent mt-3 " >

        <div className="">
        <h5 className="text-black fw-bold m-0 onelineclamp">{data?.title}</h5>

        {data?.date_created_utc && (
          <p className="datecol m-0">
            {moment(data?.date_created_utc).format("DD MMM YYYY")}
          </p>
        )}
        </div>

        <div className="cardFooter d-flex align-items-center gap-3 mt-2">
          <span className={`statuscommon ${data?.status}`}>
            {data?.status === "locked" && <LocakimgIcon />}
            {data?.status && statusConfig[data?.status]?.label}
          </span>

          {data?.status === "pending" && (
            <button className="replaceBtn" onClick={handleChangeCampaign}>
              Replace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
