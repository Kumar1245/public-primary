import React from "react";

const PlanCard = (props) => {
  const { data } = props;
  return (
    <div className="PlanCardsingle p-4 shadow-sm">
      <div className="titlearea text-center">
        <h4 className="fw-bold m-0">{data?.title}</h4>
        <p className="m-0">Expire on: {data?.expiryOn}</p>
      </div>

      <div className="plaininsideCard position-relative">
        <p className="statusplan m-0"> {data?.status?.label}</p>

        <div className="plancontent text-center mt-3 mb-4">
          <h2 className="fw-bold theme_text ">
            {data?.pricing?.amount} {data?.pricing?.currency}
          </h2>

          <h3 className="fw-semibold">{data?.pricing?.duration}</h3>
          <h5 className="theme_text">{data?.pricing?.planName}</h5>
        </div>

        <div className="features_list">
          <ul className="list-unstyled">
            {data?.features?.map((feature, index) => (
              <li key={index} className="mb-2">
                ✅ {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
