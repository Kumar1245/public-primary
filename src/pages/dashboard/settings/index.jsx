import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import DashboardLayout from "../../../Layout/Dashboardlayout";
import Profileaccount from "./Components/Profileaccount";
import Helpandsuport from "./Components/Helpandsuport";
import Faq from "./Components/Faq";
import NotificationSetting from "./Components/NotificationSetting";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermCondition from "./Components/TermCondition";
import Aboutus from "./Components/Aboutus";
import BreadCrumb from "../../../Component/Common/BreadCrumb";
import PayoutAccount from "./Components/PayoutAccount";
import PaymentMethod from "./Components/PaymentMethod";
import { useAuth } from "../../../context/AuthContext";
import { GETPROFILE } from "../../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";

const Settings = () => {
  const route = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("profileaccount");
  const {
    data: profileData,
    isLoading: userLoading,
    isFetching,
    refetch,
    isError: userError,
    error: userErrorObj,
  } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await GETPROFILE();
      return res.data.data;
    },
    enabled: !!isAuthenticated,
    retry: false,
  });
  const tabs = [
    { id: "profileaccount", label: "Profile Account" },
    // { id: "paymentmethod", label: "Payment Method" },
    { id: "accountsetting", label: "Account Settings" },
    { id: "faq", label: "FAQ" },
    { id: "aboutus", label: "About Us" },
    { id: "privacypolicy", label: "Privacy Policy" },
    { id: "termscontions", label: "Terms & Conditions" },
  ];

  console.log(profileData, "profileData====<>");

  return (
    <section className="settingpage commonBgdashboard">
      <Container fluid>
        <div className="mb-3">
          <div className="sectionheadings">
            <h3 className="fw-bold">Setting</h3>
            <BreadCrumb />
          </div>
        </div>

        <div className="settingTab mt-4">
          <div className="tab-frame">
            <div className="clearfix">
              {tabs.map((tab) => (
                <React.Fragment key={tab.id}>
                  <input
                    type="radio"
                    name="tab"
                    id={tab.id}
                    checked={activeTab === tab.id}
                    onChange={() => setActiveTab(tab.id)}
                  />
                  <label htmlFor={tab.id}>{tab.label}</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          {activeTab === "profileaccount" && (
            <div className="profileaccountTab commonSettingtab mt-4 commonCard p-3">
              <Profileaccount
                userLoading={userLoading}
                data={profileData}
                refetch={refetch}
                isFetching={isFetching}
                isLoading={userLoading}
              />
            </div>
          )}

          {activeTab === "paymentmethod" && (
            <div className="paymentmethodTab commonSettingtab mt-4  ">
              <PaymentMethod />
            </div>
          )}

          {activeTab === "accountsetting" && (
            <div className="notificationSetting commonSettingtab mt-4 commonCard p-3">
              <NotificationSetting
                userLoading={userLoading}
                data={profileData}
              />
            </div>
          )}

          {activeTab === "faq" && (
            <div className="faq commonSettingtab mt-4 p-3">
              <Faq />
            </div>
          )}

          {activeTab === "aboutus" && (
            <div className="aboutusTab commonSettingtab mt-4 commonCard p-3">
              <Aboutus />
            </div>
          )}

          {activeTab === "privacypolicy" && (
            <div className="privacyPolicy commonSettingtab mt-4 commonCard p-3">
              <PrivacyPolicy />
            </div>
          )}

          {activeTab === "termscontions" && (
            <div className="termsConditions commonSettingtab mt-4 commonCard p-3">
              <TermCondition />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
