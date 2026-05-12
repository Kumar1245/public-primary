import React, { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import {
  Ideaicon,
  SingleUserIcon,
  Vedioicon,
  VerifyIcon,
  Viewdetailsicon,
  Voteicon,
  VotesIcon,
  VotesStatusIcon,
} from "../../Assets/svg/Allsvgicons";
import Link from "next/link";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useRouter } from "next/router";
import User from "../../Assets/images/user.png";
import { maskIdentity } from "../../lib/helper";
import { getMetaValue } from "../../Utilities/extractMeta";
import PeadgeVoteMod from "../../pages/constituencies/Modal/PeadgeVoteMod";
import { useAuth } from "../../context/AuthContext";
import { CANDIDATE_DETAIL } from "../../services/ApiCalls";
import { checkResponse } from "../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";

const IndependentCard = (props) => {
  const router = useRouter();
  const { data } = props;
  const { user, isAuthenticated, authReady } = useAuth();
  const [votePledgeAdded, setVotePledgeAdded] = useState(false);
  const [pledgeMod, setPledgeMod] = useState(false);


  const handleProtectedAction = (action) => {
    if (!authReady) return;
    
    if (!isAuthenticated) {
      // Store the intended action to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/auth/login');
      return;
    }
    
    action();
  };

  const { data: candidateDetails, isLoading: candidateLoading } = useQuery({
    queryKey: ["candidate-detail", data?._id],
    queryFn: async () => {
      const res = await CANDIDATE_DETAIL(data?._id);
      const success = checkResponse({ res });
      if (success) {
        return res?.data?.data;
      } else {
        return null;
      }
    },
    keepPreviousData: true,
    enabled: !!data?._id && pledgeMod,
  });

  const pledgeCandidate = candidateDetails || data;

  const hasUserPledged = pledgeCandidate?.isVotePledge || false;

  return (
    <>
      {pledgeCandidate && (
        <PeadgeVoteMod
          show={pledgeMod}
          onhide={() => setPledgeMod(false)}
          candidate={pledgeCandidate}
          setVotePledgeAdded={setVotePledgeAdded}
          isLoading={candidateLoading}
        />
      )}

      <div className="ideaCard resumeCard ">
        <div className="resumeCard_head p-3 gap-2 d-flex align-items-center justify-content-between">
          <h4 className="m-0 text-white d-flex align-items-center gap-2">
            {data?.name}
            {data?.status === "active" && (
              <VerifyIcon
                height={28}
                width={28}
                checkcolor="#1E3A8A"
                iconcolor="#fff"
              />
            )}
          </h4>

          <div className="d-flex align-items-center gap-3">
            {/* Audit Dropdown */}
            {data?.ideasAdoptedFor?.length > 0 && (
              <div className="audit candidateAudit">
                <UncontrolledDropdown>
                  <DropdownToggle>Audit</DropdownToggle>
                  <DropdownMenu>
                    {data?.ideasAdoptedFor?.map((item, idx) => {
                      return (
                        <DropdownItem key={idx}>
                          <div className="d-flex align-items-center gap-2">
                            <div className="auditimg">
                              <Image
                                src={item?.profileImage?.link || User}
                                alt="audituser"
                                width={40}
                                height={40}
                              />
                            </div>
                            <p className="m-0">
                              {maskIdentity(
                                item?.name,
                                getMetaValue(
                                  item?.meta_data,
                                  "voter_registeration_number",
                                ),
                              )}
                            </p>
                          </div>
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            )}

            {
              <>
                {hasUserPledged ? (
                  <div className="d-flex align-items-center gap-2">
                    <VotesStatusIcon />
                    {/* <span className="text-white">Pledged</span> */}
                  </div>
                ) : (
                  <Button
                    variant=""
                    onClick={() => handleProtectedAction(() => setPledgeMod(true))}
                    className="d-flex align-items-center gap-2"
                  >
                    <VotesIcon color="#ffff" />
                    {/* Pledge Vote */}
                  </Button>
                )}
              </>
            }
          </div>
        </div>

        <div className="independentCard_innner  d-flex align-items-center gap-2">
          <div className="pledgedata">
            <div className="indepedentUser">
              <Image
                src={data?.profileImage?.link || User}
                alt="user"
                width={60}
                height={60}
              />
            </div>
          </div>
          <div className="pledgedata">
            <h3 className="theme_text m-0">
              {data?.pledgeCount || 0}({data?.pledgeCountPercent || 0}%)
            </h3>
            <p className="m-0">Pledge Count</p>
          </div>
        </div>

        <div className="resumeCard_footer border-top p-3 d-flex align-items-center gap-2 justify-content-center">
          <Link
            href={`/constituencies/candidate-view/${data?._id}`}
            className="viewfull_details d-flex align-items-center"
          >
            <span className="me-2">
              <SingleUserIcon />
            </span>
            View Candidate Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default IndependentCard;
