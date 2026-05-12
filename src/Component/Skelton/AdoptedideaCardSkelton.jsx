import React from "react";
import { Skeleton } from "primereact/skeleton";

const AdoptedideaCardSkelton = () => {
  return (
    <div className="ConstituencyCard commonCard p-3">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <Skeleton width="260px" height="20px" />
          <Skeleton width="80px" height="20px" borderRadius="12px" />
          <Skeleton width="90px" height="20px" borderRadius="12px" />
        </div>

        <Skeleton shape="circle" size="24px" />
      </div>

      {/* Description */}
      <Skeleton width="100%" height="14px" className="mb-2" />
      <Skeleton width="85%" height="14px" className="mb-2" />

      {/* Submitted info */}
      <Skeleton width="220px" height="12px" className="mb-3" />

      {/* Rating */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <Skeleton width="140px" height="16px" />
      </div>

      {/* Commitment box */}
      <div className="adopted p-3 mb-3">
        <Skeleton width="120px" height="12px" className="mb-2" />
        <Skeleton width="200px" height="14px" />
      </div>

      {/* Action buttons */}
      <div className="actionBtns d-flex align-items-center gap-3 mt-3">
        <Skeleton width="140px" height="36px" borderRadius="8px" />
        <Skeleton width="180px" height="36px" borderRadius="8px" />
      </div>
    </div>
  );
};

export default AdoptedideaCardSkelton;
