import { Skeleton } from "primereact/skeleton";

const ConstituencyCardSkeleton = () => {
  return (
    <div className="ConstituencyCard commonCard p-3">
      {/* TITLE + TAG */}
      <div className="d-flex align-items-center gap-2 mb-2">
        <Skeleton width="180px" height="20px" />
        <Skeleton width="60px" height="18px" borderRadius="12px" />
      </div>

      {/* DESCRIPTION */}
      <div className="mb-2">
        <Skeleton width="100%" height="14px" className="mb-1" />
        <Skeleton width="90%" height="14px" />
      </div>

      {/* SUBMITTED INFO */}
      <Skeleton width="220px" height="12px" className="mb-3" />

      {/* RATING + COMMENTS */}
      <div className="d-flex align-items-center gap-4 my-3">
        <div className="d-flex align-items-center gap-2">
          <Skeleton shape="circle" size="20px" />
          <Skeleton width="90px" height="14px" />
        </div>

        <div className="d-flex align-items-center gap-2">
          <Skeleton shape="circle" size="20px" />
          <Skeleton width="110px" height="14px" />
        </div>
      </div>

      {/* ADOPTED BY */}
      <div className="adopted p-3 d-flex align-items-center gap-2">
        <Skeleton width="80px" height="14px" />

        <div className="d-flex align-items-center gap-2">
          <Skeleton width="60px" height="14px" />
          <Skeleton width="60px" height="14px" />
          <Skeleton width="60px" height="14px" />
        </div>
      </div>
    </div>
  );
};

export default ConstituencyCardSkeleton;
