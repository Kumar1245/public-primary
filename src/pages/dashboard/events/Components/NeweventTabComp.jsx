import React, { useState, useEffect } from "react";
import Eventall from "./Neweventtabs/Eventall";

const NeweventTabComp = ({ data = [], setStatus }) => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    setStatus(tabId === "all" ? "" : tabId);
  };

  return (
    <div>
      <div className="tab-frame aviinnerframe">
        <div className="clearfix">
          {tabs.map((tab) => (
            <React.Fragment key={tab.id}>
              <input
                type="radio"
                name="tabinner"
                id={tab.id}
                checked={activeTab === tab.id}
                onChange={() => handleTabChange(tab.id)}
              />
              <label htmlFor={tab.id}>{tab.label}</label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="innnertabcontent mt-4">
        <Eventall data={data} />
      </div>
    </div>
  );
};

export default NeweventTabComp;
