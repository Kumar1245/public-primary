import React, { useState } from "react";
import IdeaCardSkeleton from "../../../../Component/Skelton/IdeaCardSkeleton";
import IdeasCard from "../../../../Component/CommonCard/IdeasCard";
import { Row, Col } from "react-bootstrap";
import RateandCommnetMod from "../../Modal/RateandCommnetMod";
import { useQuery } from "@tanstack/react-query";
import { IDEAS_LIST, IDEASCOMMENTSLIST } from "../../../../services/ApiCalls";
import { checkResponse } from "../../../../Utilities/commonFunc";
import Nodata from "../../../../Component/ui/Nodata";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/router";

const Alltabs = ({ constituency, type, category, ideasAdded }) => {
  const [rateandcommentModal, setRateandcommentModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const router = useRouter();
  const { isAuthenticated, authReady } = useAuth();

  const handleRatingClick = (idea) => {
    if (!authReady) return;

    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push("/auth/login");
      return;
    }

    setSelectedIdea(idea);
    setRateandcommentModal(true);
  };

  const {
    data: ideas = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["ideas", constituency, type, category, ideasAdded],
    queryFn: async () => {
      const res = await IDEAS_LIST({ constituency, type, category });
      const success = checkResponse({ res });
      return success ? res?.data?.data || [] : [];
    },
    enabled: !!constituency,
    keepPreviousData: true,
  });

  const {
    data: commentData = {},
    isLoading: isCommentLoading,
    isFetching: isCommentFetching,
  } = useQuery({
    queryKey: ["commentList", selectedIdea?._id],
    queryFn: async () => {
      const res = await IDEASCOMMENTSLIST({
        ideaId: selectedIdea?._id,
      });
      const success = checkResponse({ res });
      return success ? res?.data?.data || {} : {};
    },
    enabled: !!selectedIdea?._id,
    keepPreviousData: false,
  });

  return (
    <div className="alltabsshow">
      <RateandCommnetMod
        show={rateandcommentModal}
        onhide={() => setRateandcommentModal(false)}
        idea={selectedIdea}
        commentsdata={commentData}
        isLoading={isCommentLoading || isCommentFetching}
      />

      <Row>
        {isFetching || isLoading ? (
          [...Array(6)].map((_, idx) => (
            <Col lg={4} md={6} sm={12} key={idx}>
              <IdeaCardSkeleton />
            </Col>
          ))
        ) : ideas.length > 0 ? (
          ideas.map((item, idx) => (
            <Col lg={4} md={6} sm={12} key={idx}>
              <IdeasCard data={item} onRatingClick={handleRatingClick} />
            </Col>
          ))
        ) : (
          <Col lg={12}>
            <Nodata />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Alltabs;
