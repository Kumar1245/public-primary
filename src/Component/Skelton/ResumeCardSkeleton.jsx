import React from "react";
import { Skeleton } from "primereact/skeleton";

const ResumeCardSkeleton = () => {
  return (
    <div className="ideaCard resumeCard overflow-hidden">
      {/* Header */}
      <div className="resumeCard_head p-3 gap-2 d-flex align-items-center">
        <Skeleton shape="circle" size="40px" />
        <Skeleton width="150px" height="1.2rem" />
      </div>

      {/* Inner Content */}
      <div className="ResumeCard_innner p-3">
        {/* Position */}
        <div className="sidebyside d-flex gap-2 mb-2">
          <Skeleton width="120px" height="1rem" />
          <Skeleton width="160px" height="1rem" />
        </div>

        {/* Age */}
        <div className="sidebyside d-flex gap-2 mb-2">
          <Skeleton width="50px" height="1rem" />
          <Skeleton width="40px" height="1rem" />
        </div>

        {/* Experience */}
        <div className="experience d-flex flex-column gap-2 mt-3">
          <Skeleton width="120px" height="1rem" />
          <Skeleton width="100%" height="0.9rem" />
          <Skeleton width="90%" height="0.9rem" />
          <Skeleton width="80%" height="0.9rem" />
        </div>
      </div>

      {/* Footer */}
      <div className="resumeCard_footer border-top p-3">
        <Skeleton width="180px" height="40px" borderRadius="20px" />
      </div>
    </div>
  );
};

export default ResumeCardSkeleton;
