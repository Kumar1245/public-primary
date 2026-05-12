import React from "react";
import { Skeleton } from "primereact/skeleton";

const CustomerBookingCardSkeleton = () => {
  return (
    <div className="BookingCard p-3 d-flex align-items-start gap-3">
      {/* Image Skeleton */}
      <div className="BookingCardImg">
        <Skeleton width="128px" height="128px" borderRadius="8px" />
      </div>

      <div className="BookingCardImg_content ">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between gap-2">
          <div className="BookingCardImg_head">
            <Skeleton width="140px" height="18px" />
            <Skeleton width="100px" height="14px" className="mt-2" />
          </div>

          <Skeleton width="70px" height="22px" />
        </div>

        {/* List */}
        <ul className="m-0 p-0 d-flex align-items-center flex-wrap gap-3 mt-3">
          {[1, 2, 3, 4].map((item) => (
            <li key={item} className="d-flex flex-column">
              <Skeleton width="70px" height="14px" />
              <Skeleton width="90px" height="16px" className="mt-1" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerBookingCardSkeleton;
