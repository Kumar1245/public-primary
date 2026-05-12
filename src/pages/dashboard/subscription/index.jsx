import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DashboardLayout from "../../../Layout/Dashboardlayout";

import BreadCrumb from "../../../Component/Common/BreadCrumb";
import PlanCard from "./Components/PlanCard";

const subscriptionPlan = {
  title: "Subscription Plan",
  expiryOn: "30 Oct 2025",
  status: {
    label: "My Plan",
    active: true,
  },
  pricing: {
    amount: 50,
    currency: "$",
    duration: "Monthly Plan",
    planName: "Basic Plan",
  },
  features: [
    "Limited media uploads",
    "Standard visibility",
    "Basic profile access",
    " Access to public content",
    "Basic event participation",
  ],
};

const Subscription = () => {
  return (
    <>
      <section className="Subscriptionsection ">
        <Container fluid>
          <div className="sectionheadings">
            <h3 className="fw-bold">Subscription</h3>
            <BreadCrumb />
          </div>

          <div className="mySubscriptionplan mt-5">
            <Row>
              <Col lg={4} md={6} sm={12}>
                <PlanCard data={subscriptionPlan} />
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Subscription;

Subscription.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
