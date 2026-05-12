import React, { useState } from "react";
import Buttontheme from "../../../Component/ui/Buttontheme";
import Ideastab from "./Ideastab";
import Candidatetab from "./Candidatetab";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/AuthContext";

const DetailTabbingComp = (props) => {
  const { constituency, constituencyData } = props;
  const { user } = useAuth();
  console.log("id", constituency);
  const rotuer = useRouter();
  const [activeTab, setActiveTab] = useState("ideas");

  const onInvite = () => {
    rotuer.push("/auth/createaccount");
  };

  const tabs = [
    { id: "ideas", label: "Ideas" },
    { id: "candidates", label: "Candidates" },
  ];

  return (
    <div className="DetailTabbingComp_sec">
      <div className="tab-frame authTab_frame">
        <div className="clearfix d-flex justify-content-between align-items-center">
          <div className="lefttab_side">
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
          {!user && (
            <div className="righttab_side">
              {activeTab === "candidates" && (
                <Buttontheme className="tabheadbtn" onClick={onInvite}>
                  We invite you to become a candidate
                </Buttontheme>
              )}
            </div>
          )}
        </div>
      </div>

      {activeTab === "ideas" && (
        <div className="mt-3">
          <Ideastab
            constituency={constituency}
            constituencyDetailData={constituencyData}
          />
        </div>
      )}

      {activeTab === "candidates" && (
        <div className="mt-3">
          <Candidatetab constituency={constituency} />
        </div>
      )}
    </div>
  );
};

export default DetailTabbingComp;
