import React from "react";
import { getCountyOptionsByState } from "../../Utilities/const";

const CountySelect = ({
  stateCode,
  value,
  onChange,
  placeholder = "Select County",
  name,
  disabled = false,
  className = "",
}) => {
  const countyOptions = React.useMemo(
    () => getCountyOptionsByState(stateCode),
    [stateCode]
  );

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled || !stateCode}
      className={`form-select ${className}`}
    >
      <option value="">{placeholder}</option>
      {countyOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CountySelect;
