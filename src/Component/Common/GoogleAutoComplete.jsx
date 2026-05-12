import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useGoogleProvider } from "../../context/GoogleProvider";

const GoogleAutocomplete = (props) => {
  const { isLoaded, loadError } = useGoogleProvider();
  const {
    address,
    lat,
    lng,
    onChange,
    label,
    className,
    margin,
    type,
    errors,
    helperText,
    name,
  } = props;
  const handleChange = (address) => {
    if (address == "") {
      onChange({ address: address, lat: 0, lng: 0 });
    } else {
      onChange({ address: address, lat: lat, lng: lng });
    }
  };
  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then(async (results) => {
        const latLng = await getLatLng(results[0]);
        return {
          latLng,
          addressP: results,
          placedId: results[0].place_id,
        };
      })
      .then(({ latLng, addressP, placedId }) => {
        const data = {
          address: address,
          lat: latLng.lat,
          lng: latLng.lng,
          placedId,
        };

        addressP?.length > 0 &&
          addressP[0]["address_components"]?.map((ad, i) => {
            if (ad.types.includes("locality")) {
              data.city = ad.long_name;
            }
            if (ad.types.includes("administrative_area_level_1")) {
              data.state = ad.long_name;
            }
            if (ad.types.includes("administrative_area_level_1")) {
              data.state = ad.long_name;
            }
            if (ad.types.includes("country")) {
              data.country = ad.long_name;
            }
            if (ad.types.includes("postal_code")) {
              data.postal_code = ad.long_name;
            }
          });

        onChange({
          ...data,
        });
      })
      .catch((error) => {
        onChange({
          address: "NA",
          lat: 0,
          lng: 0,
        });
      });
  };

  if (loadError) {
    return (
      <input
        type={type}
        value={address || ""}
        onChange={(e) =>
          onChange({
            address: e.target.value,
            lat: lat || 0,
            lng: lng || 0,
          })
        }
        placeholder="Search Places ..."
        className={`form-control text_input ${className}`}
      />
    );
  }

  if (!isLoaded) {
    return (
      <input
        type={type}
        value={address || ""}
        readOnly
        placeholder="Loading places..."
        className={`form-control text_input ${className}`}
      />
    );
  }

  return (
    <PlacesAutocomplete
      value={address}
      onSelect={handleSelect}
      onChange={handleChange}
      // searchOptions={{
      //   componentRestrictions: { country: ["dz", "in"] },
      // }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div className="position-relative">
          <input
            label={label}
            type={type}
            fullWidth
            error={errors[name] && errors[name]?.length > 0 ? true : false}
            helperText={
              errors[name] && errors[name]?.length > 0
                ? errors[name]
                : helperText
            }
            className={className}
            margin={margin}
            {...getInputProps({
              placeholder: "Search Places ...",
              className: `form-control text_input ${className}`,
            })}
          />
          <div
            className="autocomplete-dropdown-container  bg-white position-absolute "
            style={{
              top: "46px",
              overflowY: "auto",
              maxHeight: "120px",
              width: "100%",
            }}
          >
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#ffffff", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <div className="google-select-pop p-2 border-bottom">
                    {suggestion.description}
                  </div>
                  {/* <span></span> */}
                  {/* <div className="border-bottom border-dark2"></div> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
GoogleAutocomplete.defaultProps = {
  type: "text",
  className: "input-text",
  label: "Text Input",
  margin: "normal",
  errors: {},
  helperText: "",
};
export default GoogleAutocomplete;
