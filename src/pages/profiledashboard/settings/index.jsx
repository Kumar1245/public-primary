import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import VoterProfilelayout from "../../../Layout/VoterProfilelayout";
import NotificationSetting from "./Components/NotificationSetting";
import PasswordChange from "./Components/PasswordChange";
import { GETPROFILE } from "../../../services/ApiCalls";
import { useAuth } from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const Settings = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("notification");

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
    { id: "notification", label: "Notification" },
    { id: "changepassword", label: "Change Password" },
  ];

  return (
    <section className="profilesettingpage p-3">
      <div className="mb-3">
        <div className="sectionheadings">
          <h3 className="fw-bold fs-22">Settings</h3>
        </div>
      </div>

      <div className="profilesettingTab mt-4">
        <div className="tab-frame profileTab_frame">
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

        {activeTab === "notification" && (
          <div className="notificationTab mt-4">
            <NotificationSetting userLoading={userLoading} data={profileData} />
          </div>
        )}

        {activeTab === "changepassword" && (
          <div className="changepasswordTab  mt-4">
            <PasswordChange />
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page) {
  return <VoterProfilelayout>{page}</VoterProfilelayout>;
};
