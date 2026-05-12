import React from "react";
import VoterSidebar from "../../pages/profiledashboard/Components/VoterSidebar";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import { Container } from "react-bootstrap";

const VoterProfilelayout = ({ children }) => {
  return (
    <section className="Voterprofilelayout">
      <Header />

      <div className="voterprofileWrap">
        <Container className="px-lg-5">
          <h4 className="fw-bold fs-22 mb-3">Your Dashboard</h4>
          <div className="voterprofileWrap_inner">
            <div className="Voterprofile_Sidebar">
              <VoterSidebar />
            </div>

            <div className="Voterprofile_sidebar_content">
              <div className="VoterprofileInner">{children}</div>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </section>
  );
};

export default VoterProfilelayout;
