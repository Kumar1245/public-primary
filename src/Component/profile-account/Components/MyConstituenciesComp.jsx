import React, { useState, useEffect } from "react";
import CommonProfilehead from "../../../../Component/ui/CommonProfilehead";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import ConsitsCardskelton from "../../../../Component/Skelton/ConsitsCardskelton";
import ConsitsCard from "../../../../Component/CommonCard/ConsitsCard";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import User from "../../../../Assets/images/user.png";
import Link from "next/link";
import AddConsitutencyMod from "../../../../Component/Modals/AddConsitutencyMod";
import { CONSTITUENCY_LIST } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";

const ConsitsCarddata = {
  id: 1,
  title: "Presidential Constituency",
  date: "30 Nov 2025",
  profileuser: {
    name: "United States — Presidential Race",
    image: User,
    number: "S004",
  },
  level: "National",
  description:
    "Represents the region in the state assembly. Focused on regional infrastructure, education, and health policies.",
  candidate: {
    image: [User, User, User],
  },
  action: true,
};

const ConsitsCarddatalist = [
  ConsitsCarddata,
  ConsitsCarddata,
  ConsitsCarddata,
  ConsitsCarddata,
  ConsitsCarddata,
  ConsitsCarddata,
  ConsitsCarddata,
  ConsitsCarddata,
  ConsitsCarddata,
];

const MyConstituenciesComp = (props) => {
 
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [addConstituencyModal, setAddConstituencyModal] = useState(false);
  const [body, setBody] = useState({
    page: 1,
    limit: 8,
    state: "",
    country: "US",
  });

  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / body.limit);

  const {
    data: constituencies,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["constituency-list", body.page],
    queryFn: async () => {
      const res = await CONSTITUENCY_LIST(body);

      const success = checkResponse({ res, setTotal: setTotalCount });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  return (
    <>
      <AddConsitutencyMod
        show={addConstituencyModal}
        onhide={() => setAddConstituencyModal(false)}
      />
      <div className="MyConstituenciesComp p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <CommonProfilehead title="My Constituencies" />

          <Link
            href="#"
            className="editprofile_btn"
            onClick={() => setAddConstituencyModal(true)}
          >
            Add Constituency
          </Link>
        </div>

        <div className="Consistlist_Show">
          <Row>
            {isLoading || isFetching
              ? [...Array(constituencies?.length || 6)].map((_, idx) => (
                  <Col lg={4} md={6} sm={12} key={idx}>
                    <ConsitsCardskelton />
                  </Col>
                ))
              : constituencies?.map((item, idx) => {
                  return (
                    <Col lg={4} md={6} sm={12} key={idx}>
                      <ConsitsCard data={item} />
                    </Col>
                  );
                })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default MyConstituenciesComp;
