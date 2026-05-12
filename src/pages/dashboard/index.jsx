import React from "react";
import DashboardLayout from "../../Layout/Dashboardlayout";
import { Col, Container, Row } from "react-bootstrap";
import ActivityCards from "./Components/ActivityCards";
import RevenueTrend from "./Components/RevenueTrend";
import WelcomeCard from "./Components/WelcomeCard";
import Constituencysnapshot from "./Components/Constituencysnapshot";
import Topvoters from "./Components/Topvoters";
import Upcomingcampign from "./Components/Upcomingcampign";

const Dashboard = () => {
  

  return (
    <section className="dashboardWrap">
      <Container fluid>
        <Row>
          <Col lg={12}>
            <WelcomeCard />
          </Col>
          <Col lg={12}>
            <ActivityCards />
          </Col>

          <Col lg={8} md={12} sm={12}>
            <RevenueTrend />
          </Col>

          <Col lg={4} md={12} sm={12}>
            <Constituencysnapshot />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Topvoters />
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Upcomingcampign />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
