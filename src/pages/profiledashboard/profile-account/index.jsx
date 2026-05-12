import React, { useState } from "react";
import VoterProfilelayout from "../../../Layout/VoterProfilelayout";
import EditprofileComp from "./Components/EditprofileComp";
import MyConstituenciesComp from "./Components/MyConstituenciesComp";
import DonationStatusCard from "../Components/DonationStatusCard";
import { GETPROFILE } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";

const Profileaccount = () => {
  const { isAuthenticated } = useAuth();
  const [profileUpdated, setProfileUpdated] = useState(false);

  const {
    data: profileData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["authUser", profileUpdated],

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
          setProfileUpdated={setProfileUpdated}
        />
        <DonationStatusCard
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
