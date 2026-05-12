import React, { useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import CandidateCard from "../Components/CandidateviewComp/CandidateCard";
import Homelayout from "../../../Layout/Homelayout";
import ResumeCard from "../Components/CandidateviewComp/ResumeCard";
import MyIdeaadoptedCard from "../Components/CandidateviewComp/MyIdeaadoptedCard";
import PleadgeCard from "../Components/CandidateviewComp/PleadgeCard";
import VedioCard from "../Components/CandidateviewComp/VedioCard";
import Upcomingevent from "../Components/CandidateviewComp/Upcomingevent";
import { CANDIDATE_DETAIL } from "../../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../../Utilities/commonFunc";

const Candidateview = () => {
  const router = useRouter();
  const { index: id } = router.query;
  const [votePledgeAdded, setVotePledgeAdded] = useState(false);

  const {
    data: candidate,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["candidate-detail", id, votePledgeAdded],
    queryFn: async () => {
      const res = await CANDIDATE_DETAIL(id);

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!id,
  });

  return (
    <section className="Candidateview_viewer">
      <Container className="px-lg-5">
        <div className="mb-4">
          <CandidateCard
            candidate={candidate}
            isFetching={isFetching}
            isLoading={isLoading}
          />

        </div>

        <div className="threrowContent">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <ResumeCard
                candidate={candidate}
                isFetching={isFetching}
                isLoading={isLoading}
              />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <MyIdeaadoptedCard id={candidate?._id} />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="d-flex flex-column gap-2">
                <PleadgeCard
                  candidate={candidate}
                  setVotePledgeAdded={setVotePledgeAdded}
                  isFetching={isFetching}
                  isLoading={isLoading}
                />
                <VedioCard candidate={candidate} />
                <Upcomingevent id={candidate?._id} />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Candidateview;

Candidateview.getLayout = function getLayout(page) {
  return <Homelayout>{page}</Homelayout>;
};
