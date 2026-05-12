import React from "react";
import { Skeleton } from "primereact/skeleton";

const PresidentialCardSkelton = () => {
  return (
    <div className="ConstituencyCard commonCard">
      {/* Header */}
      <div className="fulldetailsHeader p-3 border-bottom d-flex align-items-center justify-content-between">
        <div>
          <Skeleton width="220px" height="1.5rem" className="mb-3" />

          <div className="d-flex align-items-center gap-2">
            <Skeleton width="52px" height="52px" borderRadius="100px" />
            <div>
              <Skeleton width="160px" height="1rem" className="mb-2" />
              <Skeleton width="120px" height="1rem" />
            </div>
          </div>
        </div>

        <Skeleton width="90px" height="1rem" />
      </div>

      {/* Body */}
      <div className="p-3">
        {/* Title + Tag */}
        <div className="d-flex align-items-center gap-2 mb-3 justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <Skeleton width="200px" height="1.2rem" />
            <Skeleton width="60px" height="1rem" />
          </div>

          <Skeleton width="24px" height="24px" borderRadius="50%" />
        </div>

        {/* Description */}
        <Skeleton width="100%" height="0.9rem" className="mb-2" />
        <Skeleton width="95%" height="0.9rem" className="mb-2" />
        <Skeleton width="80%" height="0.9rem" />

        {/* Submitted info */}
        <Skeleton width="220px" height="0.8rem" className="mt-2" />

        {/* Rating & Comments */}
        <div className="d-flex align-items-center gap-4 my-3">
          <Skeleton width="140px" height="1rem" />
          <Skeleton width="160px" height="1rem" />
        </div>

        {/* Adopted By */}
        <div className="adopted p-3 d-flex align-items-center gap-2">
          <Skeleton width="90px" height="1rem" />
          <Skeleton width="200px" height="1rem" />
        </div>
      </div>
    </div>
  );
};

export default PresidentialCardSkelton;
