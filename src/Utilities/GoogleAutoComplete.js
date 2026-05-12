"use client";
import { Autocomplete } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useGoogleProvider } from "../context/GoogleProvider";

const GoogleAutoComplete = ({
  onChange,
  onPlaceSelected,
  placeholder = "Enter Address",
  className,
  value = "",
  resetForm,
}) => {
  const { isLoaded, loadError } = useGoogleProvider();

  const [inputValue, setInputValue] = useState(value);

  const autocompleteRef = React.useRef(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      onPlaceSelected(place);
    }
  };

  useEffect(() => {
    if (resetForm) {
      setInputValue("");
    }
  }, [resetForm]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  if (loadError) {
    return <p>Error loading maps: {loadError.message}</p>;
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceChanged}
      className="w-100"
    >
      <input
        type="text"
        placeholder={placeholder}
        className={`w-100 ${className}`}
        id="address"
        style={{paddingLeft: 10}}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange?.(e);
        }}
      />
    </Autocomplete>
  );
};

export default GoogleAutoComplete;
