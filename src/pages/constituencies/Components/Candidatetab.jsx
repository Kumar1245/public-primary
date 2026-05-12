import { useEffect, useState } from "react";
import IndependentCard from "../../../Component/CommonCard/IndependentCard";
import IndependentCardSkelton from "../../../Component/Skelton/IndependentCardSkelton";

// images
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "react-bootstrap";
import User from "../../../Assets/images/user.png";
import Nodata from "../../../Component/ui/Nodata";
import { CANDIDATE_LIST } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";

const auditdata = [
  {
    id: 1,
    name: "John Carter",
    image: User,
  },
  {
    id: 2,
    name: "Emily Watson",
    image: User,
  },
  {
    id: 3,
    name: "Michael Brooks",
    image: User,
  },
  {
    id: 4,
    name: "Sophia Turner",
    image: User,
  },
  {
    id: 5,
    name: "Daniel Harris",
    image: User,
  },
  {
    id: 6,
    name: "Olivia Martinez",
    image: User,
  },
  {
    id: 7,
    name: "James Anderson",
    image: User,
  },
];

const IndependentCarddata = {
  id: 1,
  user: {
    name: "Sarah Martinez",
    image: User,
  },
  pledgecount: "12,500",
  pledgecountpercent: "39.9%",
  audit: true,
  verified: true,
};

const IndependentCarddatalist = [
  IndependentCarddata,
  IndependentCarddata,
  IndependentCarddata,
  IndependentCarddata,
  IndependentCarddata,
  IndependentCarddata,
];

const Candidatetab = (props) => {
  const { constituency } = props;
  const [totalCount, setTotalCount] = useState(0);
  const [body, setBody] = useState({
    page: 1,
    limit: 8,
    constituency: "",
  });

  useEffect(() => {
    if (constituency) {
      setBody((prev) => ({ ...prev, constituency: constituency }));
    }
  }, [constituency]);

  const {
    data: candidates,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["candidate-list", body.page, body.constituency],
    queryFn: async () => {
      const res = await CANDIDATE_LIST(body);

      const success = checkResponse({ res, setTotal: setTotalCount });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!body.constituency,
  });

  console.log(candidates,"v----")
  return (
    <div className="alltabsshow">
      <Row>
        {isFetching || isLoading
          ? [...Array(candidates?.length || 6)].map((_, idx) => (
              <Col lg={4} md={6} sm={12} key={idx}>
                <IndependentCardSkelton />
              </Col>
            ))
          : candidates?.map((item, idx) => {
              return (
                <Col lg={4} md={6} sm={12} key={idx}>
                  {<IndependentCard data={item} auditdata={auditdata} candidates={candidates} />}
                </Col>
              );
            })}
        {!isFetching && candidates?.length === 0 && <Nodata />}
      </Row>
    </div>
  );
};

export default Candidatetab;
