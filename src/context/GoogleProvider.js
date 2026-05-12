"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { createContext, useContext } from "react";

export const GoogleContext = createContext();

const libraries = ["maps", "places"];

export const GoogleProvider = ({ children }) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries,
  });

  return (
    <GoogleContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleContext.Provider>
  );
};

export const useGoogleProvider = () => useContext(GoogleContext);
