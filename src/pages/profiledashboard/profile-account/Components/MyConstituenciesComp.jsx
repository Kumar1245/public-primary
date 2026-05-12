import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ConsitsCard from "../../../../Component/CommonCard/ConsitsCard";
import ConsitsCardskelton from "../../../../Component/Skelton/ConsitsCardskelton";
import CommonProfilehead from "../../../../Component/ui/CommonProfilehead";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import User from "../../../../Assets/images/user.png";
import AddConsitutencyMod from "../../../../Component/Modals/AddConsitutencyMod";
import Nodata from "../../../../Component/ui/Nodata";
import { CONSTITUENCY_REMOVE, MY_CONSTITUENCY_LIST } from "../../../../services/ApiCalls";
import { checkResponse } from "../../../../Utilities/commonFunc";
import { errorToast, successToast } from "../../../../Utilities/toastsMessages";

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

const MyConstituenciesComp = () => {
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
      const res = await MY_CONSTITUENCY_LIST(body);

      const success = checkResponse({ res, setTotal: setTotalCount });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  const { mutate: mutateRemoveConstituency, isPending } = useMutation({
    mutationFn: CONSTITUENCY_REMOVE,

    onSuccess: () => {
      successToast("Constituency removed successfully");
      refetch();
    },

    onError: (err) => {
      errorToast(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleRemoveConstituency = (id) => {
    mutateRemoveConstituency(id);
  };

  return (
    <>
      <AddConsitutencyMod
        show={addConstituencyModal}
        onhide={() => setAddConstituencyModal(false)}
        refetch={refetch}
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
                      <ConsitsCard
                        data={item}
                        action={true}
                        handleRemoveConstituency={handleRemoveConstituency}
                        isPending={isPending}
                      />
                    </Col>
                  );
                })}
            {!isFetching && constituencies?.length === 0 && <Nodata />}
          </Row>
        </div>
      </div>
    </>
  );
};

export default MyConstituenciesComp;
