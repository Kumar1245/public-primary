import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

import IdeasCard from "../../../Component/CommonCard/IdeasCard";
import IdeaCardSkeleton from "../../../Component/Skelton/IdeaCardSkeleton";
import ResumeCard from "../../../Component/CommonCard/ResumeCard";
import ResumeCardSkeleton from "../../../Component/Skelton/ResumeCardSkeleton";
import IndependentCardSkelton from "../../../Component/Skelton/IndependentCardSkelton";
import IndependentCard from "../../../Component/CommonCard/IndependentCard";
import User from "../../../Assets/images/user.png";
import { Col, Row } from "reactstrap";
import { Arrowsmaallicon } from "../../../Assets/svg/Allsvgicons";
import {
  CANDIDATE_LIST,
  CANDIDATE_WITH_RESUME_LIST,
  IDEAS_LIST,
} from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";

const Cardsections = () => {
  var ideassettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 799,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  var resumesettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 799,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  var independentsettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 799,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const {
    data: ideas,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["ideas"],
    queryFn: async () => {
      const res = await IDEAS_LIST({judge: "yes"});

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  const {
    data: candidatesWithResume,
    isLoading: isCandidateWithResumeLoading,
    isFetching: isCandidateWithResumeFetching,
  } = useQuery({
    queryKey: ["candidate-with-resume-list"],
    queryFn: async () => {
      const res = await CANDIDATE_WITH_RESUME_LIST();

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  const {
    data: candidates,
    isLoading: isCandidateLoading,
    isFetching: isCandidateFetching,
  } = useQuery({
    queryKey: ["candidate-list"],
    queryFn: async () => {
      const res = await CANDIDATE_LIST();

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
    <section className="explore_judgeseciton">
      <div className="explore_judgeseciton ">
        <Row>
          <Col lg={3} md={12}>
            <div className="sidehead">
              <h4 className="fw-bold text-black judgesecitonComp_head m-0">
                Judge <br></br> Ideas
              </h4>
              <p>
                Explore Jugde Ideas <Arrowsmaallicon />
              </p>
            </div>
          </Col>

          <Col lg={9} md={12}>
            <div className="datalistSliderWrap">
              <Slider {...ideassettings}>
                {isFetching || isLoading
                  ? [...Array(ideas?.length || 6)].map((_, idx) => (
                      <div key={idx}>
                        <IdeaCardSkeleton />
                      </div>
                    ))
                  : ideas?.map((item, idx) => {
                      return <IdeasCard key={idx} data={item} candidates={candidates} />;
                    })}
              </Slider>
            </div>
          </Col>
        </Row>
      </div>

      <div className="explore_judgeseciton my-5">
        <Row>
          <Col lg={3} md={12}>
            <div className="sidehead">
              <h4 className="fw-bold text-black judgesecitonComp_head m-0">
              
                Candidates <br></br> Resume

              </h4>
              <p>
                Explore Candidates Resumes <Arrowsmaallicon />
              </p>
            </div>
          </Col>

          <Col lg={9} md={12}>
            <div className="datalistSliderWrap">
              <Slider {...resumesettings}>
                {isCandidateWithResumeFetching || isCandidateWithResumeLoading
                  ? [...Array(candidatesWithResume?.length || 6)].map(
                      (_, idx) => (
                        <div key={idx}>
                          <ResumeCardSkeleton />
                        </div>
                      ),
                    )
                  : candidatesWithResume?.map((item, idx) => {
                      return <ResumeCard key={idx} data={item} />;
                    })}
              </Slider>
            </div>
          </Col>
        </Row>
      </div>

      <div className="explore_judgeseciton">
        <Row>
          <Col lg={3} md={12}>
            <div className="sidehead">
              <h4 className="fw-bold text-black judgesecitonComp_head m-0">
                Show <br></br> Support
              </h4>
              <p>
                Explore support for independants <Arrowsmaallicon />
              </p>
              <p></p>
            </div>
          </Col>
          <Col lg={9} md={12}>
            <div className="datalistSliderWrap">
              <Slider {...independentsettings}>
                {isCandidateFetching || isCandidateLoading
                  ? [...Array(candidates?.length || 6)].map((_, idx) => (
                      <div key={idx}>
                        <IndependentCardSkelton />
                      </div>
                    ))
                  : candidates?.map((item, idx) => {
                      return <IndependentCard key={idx} data={item}  />;
                    })}
              </Slider>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Cardsections;
