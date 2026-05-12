import React from "react";

const CommonProfilehead = ({ title, subtitle }) => {
  return (
    <div className="profilecomomHead">
      <h4 className="m-0 fw-bold">{title}</h4>
      <p className="m-0">{subtitle}</p>
    </div>
  );
};

export default CommonProfilehead;
