import React from "react";
import { Skeleton } from "primereact/skeleton";

const EventsCardSkeleton = () => {
  return (
    <div className="ConstituencyCard commonCard p-3">
      <div className="d-flex align-items-start justify-content-between mb-2">
        <div className="leftcontent w-75">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Skeleton width="18rem" height="1.2rem" />
            <Skeleton width="5rem" height="1.1rem" borderRadius="16px" />
          </div>

          <Skeleton width="100%" height="0.9rem" className="mb-2" />
          <Skeleton width="70%" height="0.9rem" />

          <Skeleton width="50%" height="0.8rem" className="mt-2" />
        </div>

        <Skeleton width="5rem" height="1.4rem" borderRadius="12px" />
      </div>

      <div className="datesection d-flex gap-lg-5 gap-md-3 gap-2 my-3 flex-wrap">
        <div className="d-flex align-items-center gap-2">
          <Skeleton shape="circle" size="1.5rem" />
          <Skeleton width="6rem" height="0.9rem" />
        </div>

        <div className="d-flex align-items-center gap-2">
          <Skeleton shape="circle" size="1.5rem" />
          <Skeleton width="6rem" height="0.9rem" />
        </div>

        <div className="d-flex align-items-center gap-2">
          <Skeleton shape="circle" size="1.5rem" />
          <Skeleton width="10rem" height="0.9rem" />
        </div>
      </div>

      <div className="attendees p-2">
        <Skeleton width="12rem" height="0.9rem" className="mb-2" />
        <Skeleton width="12rem" height="0.9rem" className="mb-2" />
      </div>
      <div className="actionBtns d-flex gap-3 mt-3">
        <Skeleton width="7rem" height="2.4rem" borderRadius="8px" />
        <Skeleton width="9rem" height="2.4rem" borderRadius="8px" />
      </div>
    </div>
  );
};

export default EventsCardSkeleton;
