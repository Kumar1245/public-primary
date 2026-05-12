import React, { forwardRef } from "react";

const Textfield = (
  {
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    error = "",
    required = false,
    className = "",
    readOnly = false,
    ...inputProps
  },
  ref,
) => {
  return (
    <div className="d-flex flex-column gap-1 w-100">
      {label && (
        <label>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`text_input ${className}`}
        readOnly={readOnly}
        ref={ref}
        {...inputProps}
      />

      {error && <p className="text-danger m-0 fs-6">{error}</p>}
    </div>
  );
};

export default forwardRef(Textfield);
