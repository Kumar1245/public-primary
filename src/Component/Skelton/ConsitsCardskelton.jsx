import React from "react";
import { Skeleton } from "primereact/skeleton";

const ConsitsCardskelton = () => {
  return (
    <div className="ideaCard resumeCard overflow-hidden">
      {/* Header */}
      <div className="resumeCard_head p-3">
        <Skeleton width="60%" height="1.2rem" className="mb-2" />
        <Skeleton width="40%" height="0.9rem" />
      </div>

      {/* Body */}
      <div className="ResumeCard_innner px-2 py-3">
        {/* Profile */}
        <div className="profileUser d-flex align-items-center gap-2">
          <Skeleton shape="circle" size="44px" />
          <div className="flex-grow-1">
            <Skeleton width="70%" height="1rem" className="mb-1" />
            <Skeleton width="50%" height="0.8rem" />
          </div>
        </div>

        {/* Level */}
        <div className="d-flex align-items-center gap-2 mt-3">
          <Skeleton width="50px" height="0.9rem" />
          <Skeleton width="80px" height="0.9rem" />
        </div>

        {/* Description */}
        <Skeleton width="100%" height="0.9rem" className="mt-3" />
        <Skeleton width="90%" height="0.9rem" className="mt-2" />
        <Skeleton width="70%" height="0.9rem" className="mt-2" />
      </div>

      {/* Candidate list */}
      <div className="canddidatelist d-flex align-items-center pb-3 px-2 gap-2">
        {[1, 2, 3].map((_, idx) => (
          <Skeleton key={idx} shape="circle" size="44px" />
        ))}
        <Skeleton width="90px" height="0.9rem" />
      </div>
    </div>
  );
};

export default ConsitsCardskelton;
