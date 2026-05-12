import React from "react";
import { Container } from "react-bootstrap";

// css
import styles from "./Authlayout.module.scss";

const Authlayout = ({ children }) => {
  return (
    <>
      <main
        className={`${styles.MainLayout} MainLayout main position-relative ms-auto`}
      >
        {children}
      </main>
    </>
  );
};

export default Authlayout;
