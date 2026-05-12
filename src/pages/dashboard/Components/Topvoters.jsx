import React, { useState, useEffect } from "react";
import Link from "next/link";
import ConstituencyCardSkeleton from "../../../Component/Skelton/ConstituencyCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_TOP_IDEAS } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import IdeaCard from "../../../Component/CommonCard/IdeaCard";
import Nodata from "../../../Component/ui/Nodata";

const Topvoters = () => {
  const {
    data: topIdeas,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["top-ideas"],
    queryFn: async () => {
      const res = await DASHBOARD_TOP_IDEAS();

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
    <div className="topvoters commonCard shadow-sm">
      <div className="d-flex align-items-center justify-content-between p-4 border-bottom">
        <h5 className="commonCardHead m-0">
          Top Voter Ideas in Your Constituency
        </h5>

        <Link
          href="/dashboard/ideas-feed"
          className="seeall theme_text fw-semibold text-decoration-none fs-18"
        >
          See All
        </Link>
      </div>

      <div className="alltopvoters p-3">
        <ul className="m-0 p-0">
          {isFetching || isLoading
            ? [...Array(topIdeas?.length || 5)].map((_, idx) => (
                <li key={idx}>
                  <ConstituencyCardSkeleton />
                </li>
              ))
            : topIdeas?.map((item, idx) => {
                return (
                  <li key={idx}>
                    <IdeaCard data={item} />
                  </li>
                );
              })}
          {!isFetching && topIdeas?.length === 0 && <Nodata />}
        </ul>
      </div>
    </div>
  );
};

export default Topvoters;
