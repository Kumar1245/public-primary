import React from "react";
import { Skeleton } from "primereact/skeleton";

const InnerSingleCardSkeleton = () => {
  return (
    <div className="innersinglecardSec commonCard p-3 ">
      <div className="innersinglecardSec_left">
        <Skeleton width="60%" height="2rem" className="mb-5" />

        <div className="d-flex align-items-center gap-2">
          <Skeleton width="52px" height="3.5rem" />
          <Skeleton width="50px" height="1.2rem" />
        </div>
      </div>
    </div>
  );
};

export default InnerSingleCardSkeleton;
