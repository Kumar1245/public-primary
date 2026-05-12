import React from "react";
import styles from "./Homelayout.module.scss";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";

const Homelayout = ({ children }) => {
  return (
    <main
      className={`${styles.Homelayout} Homelayout main position-relative ms-auto`}
    >
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default Homelayout;
