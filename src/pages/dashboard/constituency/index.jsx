import React from "react";
import DashboardLayout from "../../../Layout/Dashboardlayout";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import BreadCrumb from "../../../Component/Common/BreadCrumb";
import ConstituencyCard from "./Components/ConstituencyCard";
import Jobduties from "./Components/Jobduties";
import { CONSTITUENCY_DETAIL } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";

const Constituency = () => {
  const { user } = useAuth();

  const {
    data: constituency,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["constituency-detail", user?.constituency],
    queryFn: async () => {
      const res = await CONSTITUENCY_DETAIL(user?.constituency);

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  return (
    <section className="Constituencypage">
      <Container fluid>
        <div className="sectionheadings">
          <h3 className="fw-bold">Constituency</h3>
          <BreadCrumb />
        </div>

        <Row>
          <Col lg={12}>
            <ConstituencyCard data={constituency} />
          </Col>

          <Col lg={12} md={12} sm={12}>
            <Jobduties data={constituency} isFetching={isFetching} />
          </Col>

          {/* <Col lg={6} md={6} sm={12}>
            <RulesandPolicy />
          </Col> */}
        </Row>
      </Container>
    </section>
  );
};

export default Constituency;

Constituency.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
