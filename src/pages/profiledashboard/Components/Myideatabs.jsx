import React, { useState, useEffect } from "react";
import Nodata from "../../../Component/ui/Nodata";
import CommonProfilehead from "../../../Component/ui/CommonProfilehead";
import Alltab from "./MyideatabsComponents/alltab";
import { MY_IDEAS_LIST } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";

const Myideatabs = (props) => {
  const { userId } = props;
  const [activeTab, setActiveTab] = useState("mostpopular");
  const [ideasAdded, setIdeasAdded] = useState(false);
  const tabs = [
    { id: "all", label: "All" },
    { id: "mostpopular", label: "Most Popular" },
    // { id: "recent", label: "Recently Added" },
    // { id: "judged", label: "Not Yet Judged" },
    // { id: "adopted", label: "Adopted" },
  ];

  const {
    data: ideas,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["ideas", activeTab],
    queryFn: async () => {
      const res = await MY_IDEAS_LIST({ type: activeTab });

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!userId,
  });

  useEffect(() => {
    if (ideasAdded) {
      refetch();
    }
  }, [ideasAdded]);
  return (
    <div>
      <div className="my-3">
        <CommonProfilehead
          title="My Ideas"
          subtitle="View your all ideas submission."
        />
      </div>

      <div className="tab-frame ideainnerframe">
        <div className="clearfix">
          {tabs?.map((tab) => (
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
        <div className="all mt-4">
          <Alltab
            ideas={ideas}
            isLoading={isLoading}
            isFetching={isFetching}
            setIdeasAdded={setIdeasAdded}
          />
        </div>
      </div>
    </div>
  );
};

export default Myideatabs;
