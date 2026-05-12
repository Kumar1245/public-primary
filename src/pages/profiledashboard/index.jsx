import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import VoterProfilelayout from "../../Layout/VoterProfilelayout";
import WelcomeCard from "./Components/WelcomeCard";
import Myideatabs from "./Components/Myideatabs";
import { GETPROFILE } from "../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

const Voterprofile = () => {
  const { isAuthenticated } = useAuth();

  const {
    data: profileData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await GETPROFILE();
      return res.data.data;
    },
    enabled: !!isAuthenticated,
    retry: false,
  });

  return (
    <section className="Voterprofile p-3">
      <WelcomeCard
        profileData={profileData}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <Myideatabs userId={profileData?._id} />
    </section>
  );
};

export default Voterprofile;

Voterprofile.getLayout = function getLayout(page) {
  return <VoterProfilelayout>{page}</VoterProfilelayout>;
};
