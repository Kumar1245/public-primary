import React from "react";
import { Skeleton } from "primereact/skeleton";

const IndependentCardSkelton = () => {
  return (
    <div className="ideaCard resumeCard overflow-hidden">
      {/* Header */}
      <div className="resumeCard_head p-3 gap-2 d-flex align-items-center justify-content-between">
        <Skeleton width="160px" height="1.5rem" />
        <Skeleton shape="circle" size="40px" />
      </div>

      {/* Inner Section */}
      <div className="independentCard_innner d-flex align-items-center gap-2 p-3 justify-content-between">
        {/* User Image */}
        <div className="pledgedata mx-auto">
          <Skeleton shape="circle" size="60px" />
        </div>
        {/* Pledge Data */}
        <div className="pledgedata text-center">
          <Skeleton width="90px" height="1.4rem" className="mb-1" />
          <Skeleton width="110px" height="0.9rem" />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="resumeCard_footer border-top p-3 d-flex align-items-center gap-2 justify-content-center">
        <Skeleton width="160px" height="40px" borderRadius="20px" />
        <Skeleton width="160px" height="40px" borderRadius="20px" />
      </div>
    </div>
  );
};

export default IndependentCardSkelton;
