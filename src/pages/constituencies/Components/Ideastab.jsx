import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Buttontheme from "../../../Component/ui/Buttontheme";
import { useAuth } from "../../../context/AuthContext";
import {
  CountdownLabel,
  useIdeaSubmissionStatus,
} from "../../../hooks/useIdeasSubmissionStatus";
import { IDEAS_CATEGORY_LIST, IDEAS_LIST } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import SubmitNewdataMod from "../Modal/SubmitNewdataMod";
import Alltabs from "./ideastabscomponent/Alltabs";

const Ideastab = (props) => {
  const { constituency, constituencyDetailData } = props;
  const { user, isAuthenticated } = useAuth();
  const [ideasAdded, setIdeasAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [addnewdataModal, setAddnewdataModal] = useState(false);
  const [category, setCategory] = useState(null);
  const tabs = [
    { id: "all", label: "All" },
    { id: "categories", label: "Categories", dropdown: true },
    { id: "popular", label: "Most Popular" },
  ];

  const { data: ideasCategories } = useQuery({
    queryKey: ["ideas-category", constituency],
    queryFn: async () => {
      const res = await IDEAS_CATEGORY_LIST();

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
    enabled: !!constituency,
  });

  const { data: userIdeas = [] } = useQuery({
    queryKey: ["ideas", constituency],
    queryFn: async () => {
      const res = await IDEAS_LIST({
        userId: user?._id,
        constituency: constituency,
        category: category?._id,
      });

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data || [];
      }

      return [];
    },
    enabled: !!user && !!constituency,
  });

  const submissionStatus = useIdeaSubmissionStatus({
    userIdeas,
    level: constituencyDetailData?.level,
  });

  return (
    <div className="">
      <SubmitNewdataMod
        show={addnewdataModal}
        onhide={() => setAddnewdataModal(false)}
        constituency={constituency}
        level={constituencyDetailData?.level}
        setIdeasAdded={setIdeasAdded}
      />
      <div className="ideasTab d-flex align-items-center justify-content-between">
        <div className="recentTabs d-flex align-items-center gap-2">
          {tabs.map((tab) => {
            if (tab.dropdown) {
              return (
                <UncontrolledDropdown key={tab.id}>
                  <DropdownToggle
                    tag="button"
                    className={`tabPill ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    caret
                  >
                    {category?.catName || tab.label}
                  </DropdownToggle>

                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => setCategory({ catName: "Categories" })}
                    >
                      All
                    </DropdownItem>

                    {ideasCategories?.map((item, idx) => (
                      <>
                        <DropdownItem divider />
                        <DropdownItem
                          key={idx}
                          onClick={() => setCategory(item)}
                        >
                          {item?.catName}
                        </DropdownItem>
                      </>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              );
            }

            return (
              <button
                key={tab.id}
                className={`tabPill ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {isAuthenticated &&
          (submissionStatus.allowed ? (
            <Buttontheme
              onClick={() => {
                if (!submissionStatus.allowed) return;
                setAddnewdataModal(true);
              }}
              style={{
                opacity: submissionStatus.allowed ? 1 : 0.7,
                cursor: submissionStatus.allowed ? "pointer" : "not-allowed",
              }}
            >
              Add New Idea
            </Buttontheme>
          ) : (
            <CountdownLabel breakdown={submissionStatus.breakdown} />
          ))}
      </div>

      <div className="tabContentData">
        <div className="mt-3">
          <Alltabs
            constituency={constituency}
            type={activeTab}
            category={category?._id}
            ideasAdded={ideasAdded}
          />
        </div>
      </div>
    </div>
  );
};

export default Ideastab;
