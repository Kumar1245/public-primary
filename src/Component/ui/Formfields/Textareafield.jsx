import React from "react";

const Textareafield = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error = "",
  required = false,
  className = "",
  row,
  maxLength,
}) => {
  return (
    <div className="d-flex flex-column gap-1 w-100">
      {label && (
        <label>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <textarea
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={`text_input ${className}`}
        rows={row || 3}
      />

      {error && <p className="text-danger m-0 fs-6">{error}</p>}
    </div>
  );
};

export default Textareafield;
