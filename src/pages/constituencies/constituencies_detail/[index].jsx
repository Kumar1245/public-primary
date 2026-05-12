import React from "react";
import Homelayout from "../../../Layout/Homelayout";
import { Container } from "react-bootstrap";
import DetailsCard from "../Components/DetailsCard";
import DetailTabbingComp from "../Components/DetailTabbingComp";
import { useRouter } from "next/router";
import { CONSTITUENCY_DETAIL } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";

const Constituenciesdetail = () => {
  const router = useRouter();
  const { index: id, subId } = router.query;

  const {
    data: constituency,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["constituency-detail", id],
    queryFn: async () => {
      const res = await CONSTITUENCY_DETAIL(`${id}?subId=${subId}`);

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
    <section className="Constituenciesdetail_page">
      <Container className="px-lg-5">
        <div className="mb-4">
          <DetailsCard
            data={constituency}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        </div>

        <div className="">
          <DetailTabbingComp
            constituencyData={constituency}
            constituency={id}
          />
        </div>
      </Container>
    </section>
  );
};

export default Constituenciesdetail;

Constituenciesdetail.getLayout = function getLayout(page) {
  return <Homelayout>{page}</Homelayout>;
};
