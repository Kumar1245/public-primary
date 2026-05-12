import React from "react";
import { Skeleton } from "primereact/skeleton";

const QuickoverviewSkelton = () => {
  return (
    <div className="singleQuickOverview d-flex align-items-center justify-content-between">
      {/* LEFT SECTION */}
      <div className="singleQuickOverview_left d-flex align-items-center gap-2">
        {/* Icon Skeleton */}
        <Skeleton shape="circle" width="40px" height="40px" />

        {/* Text Skeleton */}
        <div className="singleQuick_content">
          <Skeleton width="100px" height="14px" className="mb-2" />
          <Skeleton width="70px" height="12px" />
        </div>
      </div>

      {/* RIGHT SECTION (Total Value) */}
      <div className="singleQuickOverview_right">
        <Skeleton width="50px" height="20px" />
      </div>
    </div>
  );
};

export default QuickoverviewSkelton;
