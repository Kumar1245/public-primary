import { useEffect, useState } from "react";
import { fallBackLocation } from "../Utilities/const";

const UseUserCurrentLocation = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lng: position?.coords?.longitude,
            lat: position?.coords?.latitude,
          });
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
          setUserLocation(fallBackLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds
          maximumAge: 0,
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
      setUserLocation(fallBackLocation);
    }
  }, []);

  return { userLocation };
};

export default UseUserCurrentLocation;
