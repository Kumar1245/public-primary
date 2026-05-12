import React from "react";
import { Button } from "react-bootstrap";

const Buttontheme = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled,
}) => {
  return (
    <Button
      type={type}
      className={`theme_btn ${className}`}
      disabled={disabled}
      {...(type !== "submit" && { onClick })}
    >
      {children}
    </Button>
  );
};

export default Buttontheme;

