import React from "react";
import { Skeleton } from "primereact/skeleton";

const IdeaCardSkeleton = () => {
  return (
    <div className="ideaCard">
      {/* Header */}
      <div className="ideaCard_head p-3 border-bottom">
        <Skeleton width="40%" height="1.5rem" />
      </div>

      {/* Content */}
      <div className="ideaCard_innner p-3">
        <Skeleton width="80%" height="1.5rem" className="mb-2" />
        <Skeleton width="100%" height="1.5rem" className="mb-2" />
        <Skeleton width="90%" height="1.5rem" className="mb-2" />
        <Skeleton width="90%" height="1.5rem" className="mb-2" />
        <Skeleton width="90%" height="1.4rem" className="mb-2" />
        <Skeleton width="90%" height="0.9rem" className="mb-2" />
      </div>

      {/* Footer */}
      <div className="ideaCard_footer border-top d-flex align-items-center justify-content-between">
        <div className="idearating p-3 d-flex align-items-center gap-2">
          <Skeleton shape="circle" size="1.25rem" />
          <Skeleton width="120px" height="1.5rem" />
        </div>

        <div className="notjudgeyet p-3">
          <Skeleton width="90px" height="1.5rem" />
        </div>
      </div>
    </div>
  );
};

export default IdeaCardSkeleton;
