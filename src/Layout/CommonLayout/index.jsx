import React from "react";

import { PrimeReactProvider } from "primereact/api";

const CommonLayout = ({ children }) => {
  return (
    <>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </>
  );
};

export default CommonLayout;
