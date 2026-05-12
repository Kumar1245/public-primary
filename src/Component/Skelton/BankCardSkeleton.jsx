import React from "react";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";

const BankCardSkeleton = () => {
  return (
    <div className="innpayoutCard p-3">
      {/* Top Section */}
      <div className="banknameShow d-flex align-items-center justify-content-between w-100">
        {/* Bank icon + title */}
        <div className="banktitle d-flex align-items-center gap-2">
          <div className="bankicon d-flex align-items-center justify-content-center rounded-circle">
            <Skeleton shape="circle" size="2.5rem" />
          </div>
          <Skeleton width="120px" height="16px" />
        </div>

        {/* Action buttons */}
        <div className="cardActions d-flex align-items-center gap-3">
          <Skeleton shape="circle" size="2rem" />
          <Skeleton shape="circle" size="2rem" />
        </div>
      </div>

      {/* Details list */}
      <div className="banklistdetails mt-3">
        <ul>
          <li className="d-flex align-items-center justify-content-between mb-3">
            <Skeleton width="140px" height="14px" />
            <Skeleton width="100px" height="14px" />
          </li>
          <li className="d-flex align-items-center justify-content-between mb-3">
            <Skeleton width="140px" height="14px" />
            <Skeleton width="120px" height="14px" />
          </li>
          <li className="d-flex align-items-center justify-content-between mb-3">
            <Skeleton width="140px" height="14px" />
            <Skeleton width="110px" height="14px" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BankCardSkeleton;
