import React from "react";

// import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";

const Layout = ({ Component, pageProps }) => {
  console.log(Component.authRoute, "authRoute");
  return (
    <>
      {/* {Component.authRoute ? (
        <AuthLayout Component={Component} pageProps={pageProps} />
      ) : (
        <MainLayout Component={Component} pageProps={pageProps} />
      )} */}

      <MainLayout Component={Component} pageProps={pageProps} />
    </>
  );
};

export default Layout;
