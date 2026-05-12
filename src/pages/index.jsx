import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Homelayout from "../Layout/Homelayout";
import Homepage from "./home";

export default function Home() {

  return (
    <>
      <Homepage />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Homelayout>{page}</Homelayout>;
};
