import React from "react";
import { Skeleton } from "primereact/skeleton";

const MediaCardSkeleton = () => {
  return (
    <div className="mediaCard commonCard p-4 h-100">
      {/* Image skeleton */}
      <div className="mediaImage mb-3">
        <Skeleton shape="rect" width="100%" height="200px" />
      </div>

      <div className="mediaContent">
        {/* Title skeleton */}
        <h5 className="text-black fw-bold m-0">
          <Skeleton width="80%" height="1.5rem" />
        </h5>

        {/* Date skeleton */}
        <p className="datecol m-1">
          <Skeleton width="40%" height="1rem" />
        </p>

        {/* Status & button skeleton */}
        <div className="cardFooter d-flex align-items-center gap-3 mt-2">
          <span className="statuscommon">
            <Skeleton width="60px" height="1.2rem" />
          </span>
          <Skeleton width="70px" height="30px" />
        </div>
      </div>
    </div>
  );
};

export default MediaCardSkeleton;
