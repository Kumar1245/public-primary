import React from "react";
import { Skeleton } from "primereact/skeleton";

const UpcomingeventsCardSkelton = () => {
  return (
    <div className="ConstituencyCard commonCard p-3">
      {/* Header */}
      <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
        <div className="leftcontent w-100">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Skeleton width="40%" height="2.25rem" />
            <Skeleton width="80px" height="2rem" borderRadius="12px" />
          </div>

          <Skeleton width="100%" height="1.9rem" className="mb-2" />
          <Skeleton width="85%" height="1.9rem" className="mb-2" />

          <Skeleton width="60%" height="0.8rem" />
        </div>
      </div>

      {/* Date / Time / Location */}
      <div className="datesection d-flex align-items-start gap-3 mt-3 flex-wrap">
        <div className="d-flex align-items-start gap-2">
          <Skeleton shape="circle" size="1.25rem" />
          <Skeleton width="90px" height="1.9rem" />
        </div>

        <div className="d-flex align-items-start gap-2">
          <Skeleton shape="circle" size="1.25rem" />
          <Skeleton width="70px" height="1.9rem" />
        </div>

        <div className="d-flex align-items-start gap-2">
          <Skeleton shape="circle" size="1.25rem" />
          <Skeleton width="120px" height="1.9rem" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingeventsCardSkelton;
