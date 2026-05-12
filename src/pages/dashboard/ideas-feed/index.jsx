import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DashboardLayout from "../../../Layout/Dashboardlayout";
import BreadCrumb from "../../../Component/Common/BreadCrumb";
import AvailableideaComp from "./Components/AvailableideaComp";
import AdoptedideaComp from "./Components/AdoptedideaComp";

const Ideasfeed = () => {
  const [activeTab, setActiveTab] = useState("availableideas");

  const tabs = [
    { id: "availableideas", label: "Available Ideas" },
    { id: "adoptedideas", label: "My Adopted Ideas" },
  ];

  return (
    <>
      <section className="Constituency_ideas">
        <Container fluid>
          <div className="sectionheadings">
            <h3 className="fw-bold">Constituency Ideas</h3>
            <BreadCrumb />
          </div>

          <div className="tab-frame Constituencytab">
            <div className="clearfix">
              {tabs.map((tab) => (
                <React.Fragment key={tab.id}>
                  <input
                    type="radio"
                    name="tab"
                    id={tab.id}
                    checked={activeTab === tab.id}
                    onChange={() => setActiveTab(tab.id)}
                  />
                  <label htmlFor={tab.id}>{tab.label}</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          {activeTab === "availableideas" && (
            <div className="availableideas mt-4">
              <AvailableideaComp />
            </div>
          )}

          {activeTab === "adoptedideas" && (
            <div className="adoptedideas mt-4">
              <AdoptedideaComp />
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Ideasfeed;

Ideasfeed.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
