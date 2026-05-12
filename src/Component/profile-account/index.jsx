import React, { useState } from "react";
import VoterProfilelayout from "../../../Layout/VoterProfilelayout";
import EditprofileComp from "./Components/EditprofileComp";
import MyConstituenciesComp from "./Components/MyConstituenciesComp";
import { GETPROFILE } from "../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../Utilities/commonFunc";

const Profileaccount = () => {
  const {
    data: profileData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await GETPROFILE();
      const success = checkResponse({ res });
      if (success) {
        return res?.data?.data;
      } else {
        return null;
      }
    },
    enabled: !!isAuthenticated,
    retry: false,
  });

  return (
    <>
      <section className="Profileaccount">
        <EditprofileComp
          profileData={profileData}
          isFetching={isFetching}
          isLoading={isLoading}
        />
        <MyConstituenciesComp />
      </section>
    </>
  );
};

export default Profileaccount;

Profileaccount.getLayout = function getLayout(page) {
  return <VoterProfilelayout>{page}</VoterProfilelayout>;
};
