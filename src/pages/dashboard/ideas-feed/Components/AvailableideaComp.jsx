import React, { useState } from "react";
import Alltab from "./AvailabletabComp/alltab";
import Nodata from "../../../../Component/ui/Nodata";
import usePaginatedList from "../../../../hooks/usePaginatedList";
import { AVAILABLE_IDEAS_LIST } from "../../../../services/ApiCalls";

const TAB_TYPE_MAP = {
  all: undefined,
  mostpopular: "popular",
  recent: "recent",
  judged: "not_judged",
};

const AvailableideaComp = () => {
  const [activeTab, setActiveTab] = useState("mostpopular");
  const apiType = TAB_TYPE_MAP[activeTab];

  const { data, isLoading, isFetching, refetch } = usePaginatedList({
    queryKey: ["IdeasList", apiType || "all"],
    fetchFn: async ({ page, limit }) => {
      const payload = {
        page,
        limit: 10,
        order: -1,
      };

      if (apiType) payload.type = apiType;

      const res = await AVAILABLE_IDEAS_LIST(payload);
      return res?.data;
    },
  });

  const IdeaData = data?.pages?.flatMap((p) => p?.data || []) || [];

  const tabs = [
    { id: "all", label: "All" },
    { id: "mostpopular", label: "Most Popular" },
    // { id: "recent", label: "Recently Added" },
    // { id: "judged", label: "Not Yet Judged" },
  ];

  return (
    <div className="AvailableideaComp_section">
      <div className="tab-frame aviinnerframe">
        <div className="clearfix">
          {tabs.map((tab) => (
            <React.Fragment key={tab.id}>
              <input
                type="radio"
                name="tabinner"
                id={tab.id}
                checked={activeTab === tab.id}
                onChange={() => setActiveTab(tab.id)}
              />
              <label htmlFor={tab.id}>{tab.label}</label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="innnertabcontent mt-4">
        {!isLoading && IdeaData.length === 0 && <Nodata />}

        {IdeaData.length > 0 && (
          <Alltab
            data={IdeaData}
            loading={isLoading}
            refetch={refetch}
            isFetching={isFetching}
          />
        )}
      </div>
    </div>
  );
};

export default AvailableideaComp;
