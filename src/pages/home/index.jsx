import React from "react";
import Homebanner from "./Components/Homebanner";
import Explorejudge from "./Components/Cardsections";
import Candidatesection from "./Components/Candidatesection";
import Votersection from "./Components/Votersection";
import DiscoverSection from "./Components/DiscoverSection";
import HomeFaq from "./Components/HomeFaq";

const Homepage = () => {
  return (
    <div>
      <Homebanner />
      <Explorejudge />
      <Candidatesection />
      <Votersection />
      <DiscoverSection />
      <HomeFaq />
    </div>
  );
};

export default Homepage;
