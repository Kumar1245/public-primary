import { useMutation, useQueryClient } from "@tanstack/react-query";
import { State } from "country-state-city";
import { Check, Flag } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useMemo, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { Spinner } from "reactstrap";
import User from "../../../Assets/images/user.png";
import { useAuth } from "../../../context/AuthContext";
import {
  formatNumber,
  getConstituencySeatLabel,
  truncateTextByWords,
} from "../../../lib/helper";
import { USER_UPDATE_CONSTITUENCY_DETAIL } from "../../../services/ApiCalls";
import { checkResponse } from "../../../Utilities/commonFunc";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";
import EditConstituencyDetailsModal from "../Modal/EditConstituencyDetailsModal";

const DetailsCard = (props) => {
  const { data, isLoading, isFetching } = props;
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editableDetails, setEditableDetails] = useState({
    electionDate: "",
    lastElectionVotes: "",
    description: "",
  });

  useEffect(() => {
    setEditableDetails({
      electionDate: data?.electionDate
        ? moment(data.electionDate).format("YYYY-MM-DD")
        : "",
      lastElectionVotes:
        data?.lastElectionVotes !== undefined &&
        data?.lastElectionVotes !== null
          ? data.lastElectionVotes
          : "",
      description: data?.description || "",
    });
  }, [data?.description, data?.electionDate, data?.lastElectionVotes]);

  const handleReadMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const electionDate = editableDetails.electionDate
    ? moment(editableDetails.electionDate).format("DD MMM YYYY")
    : "NA";

  const normalizedLevel =
    data?.level?.toString()?.trim()?.toLowerCase?.() || "";
  const normalizedBranchType =
    data?.constituencyBranchType?.toString()?.trim()?.toLowerCase?.() || "";

  const disputeMode = useMemo(() => {
    if (normalizedLevel === "local") return "community";

    if (
      [
        "county",
        "borough_mayor",
        "city_mayor",
        "township",
        "ward",
        "precinct",
        "parish",
        "school_board",
        "municipal",
      ].includes(normalizedBranchType)
    ) {
      return "community";
    }

    return "admin";
  }, [normalizedBranchType, normalizedLevel]);

  const isCommunityReviewedConstituency = disputeMode === "community";

  const disputeButtonLabel =
    disputeMode === "community" ? "Dispute details" : "Raise dispute";

  const disputeHelpText =
    disputeMode === "community"
      ? "On the county and below, the information gets changed by confirmation of future users."
      : "State-level disputes are reviewed by admin, and only admin can make final updates.";

  const currentUserId = user?._id?.toString?.() || "";

  const pendingDispute = useMemo(() => {
    const candidates = [
      data?.pendingDispute,
      data?.currentDispute,
      data?.latestDispute,
      data?.activeDispute,
      data?.userPreference,
      data?.pendingPreference,
      Array.isArray(data?.disputes) ? data.disputes.find((item) => item) : null,
      Array.isArray(data?.preferences)
        ? data.preferences.find((item) => item)
        : null,
    ].filter(Boolean);

    return candidates[0] || null;
  }, [
    data?.activeDispute,
    data?.currentDispute,
    data?.disputes,
    data?.latestDispute,
    data?.pendingDispute,
    data?.pendingPreference,
    data?.preferences,
    data?.userPreference,
  ]);

  const getUserIdList = (value) => {
    if (!value) return [];

    const items = Array.isArray(value) ? value : [value];

    return items
      .map((item) => {
        if (!item) return "";
        if (typeof item === "string") return item;
        return (
          item?._id?.toString?.() ||
          item?.userId?.toString?.() ||
          item?.id?.toString?.() ||
          ""
        );
      })
      .filter(Boolean);
  };

  const disputeOwnerId = useMemo(() => {
    return (
      pendingDispute?.userId?.toString?.() ||
      pendingDispute?.createdBy?._id?.toString?.() ||
      pendingDispute?.createdBy?.toString?.() ||
      pendingDispute?.user?._id?.toString?.() ||
      pendingDispute?.user?._id ||
      ""
    );
  }, [pendingDispute]);

  const confirmerIds = useMemo(
    () =>
      getUserIdList(
        pendingDispute?.confirmations ||
          pendingDispute?.confirmedBy ||
          pendingDispute?.votes ||
          pendingDispute?.voters,
      ),
    [pendingDispute],
  );

  const userHasDisputed = useMemo(() => {
    if (
      data?.hasUserDisputed === true ||
      data?.isDisputedByCurrentUser === true
    ) {
      return true;
    }

    if (currentUserId && disputeOwnerId && currentUserId === disputeOwnerId) {
      return true;
    }

    const myDisputes = Array.isArray(data?.myDisputes) ? data.myDisputes : [];
    return myDisputes.some((item) => {
      const ownerId =
        item?.userId?.toString?.() ||
        item?.createdBy?._id?.toString?.() ||
        item?.createdBy?.toString?.() ||
        "";
      return ownerId && ownerId === currentUserId;
    });
  }, [
    currentUserId,
    data?.hasUserDisputed,
    data?.isDisputedByCurrentUser,
    data?.myDisputes,
    disputeOwnerId,
  ]);

  const userHasConfirmed = useMemo(() => {
    if (
      data?.hasUserConfirmed === true ||
      data?.isConfirmedByCurrentUser === true
    ) {
      return true;
    }

    return Boolean(
      currentUserId && confirmerIds.some((id) => id === currentUserId),
    );
  }, [
    confirmerIds,
    currentUserId,
    data?.hasUserConfirmed,
    data?.isConfirmedByCurrentUser,
  ]);

  const canConfirmCountyDispute =
    disputeMode === "community" &&
    Boolean(pendingDispute) &&
    !userHasDisputed &&
    !userHasConfirmed;

  const submittedStatusLabel =
    disputeMode === "community" ? "Pending" : "Under Review";

  const stateName = useMemo(() => {
    if (!data?.state) return "United States";
    const matchedState = State.getStatesOfCountry("US").find(
      (item) => item.isoCode === data.state,
    );
    return matchedState?.name || data.state;
  }, [data?.state]);

  const seatLabel = useMemo(
    () => getConstituencySeatLabel(data, stateName),
    [data, stateName],
  );

  const infoItems = [
    ...(seatLabel ? [{ label: "Seat", value: seatLabel }] : []),
    { value: `${data?.terms || "NA"} Years Term` },
    // {
    //   label: "Last Election Votes",
    //   value: formatNumber(data?.lastElectionVotes || 0),
    // },
    {
      label: "Election",
      value:
        electionDate === "NA"
          ? "NA"
          : moment(editableDetails.electionDate).format("MMM DD YYYY"),
    },
  ];

  const description = editableDetails.description || "";

  const { mutate: updateConstituencyDetail, isPending: isUpdating } =
    useMutation({
      mutationFn: async (payload) => {
        const res = await USER_UPDATE_CONSTITUENCY_DETAIL(payload);
        const success = checkResponse({ res });

        if (!success) {
          throw new Error(res?.data?.message || "Failed to update details");
        }

        return res;
      },
      onSuccess: (res) => {
        successToast(
          res?.data?.message ||
            (isCommunityReviewedConstituency
              ? "Dispute submitted. It will update after community confirmation."
              : "Dispute submitted. An admin will review the requested change."),
        );
        queryClient.invalidateQueries({
          queryKey: ["constituency-detail", data?._id],
        });
        setShowEditModal(false);
      },
      onError: (err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
      },
    });

  const { mutate: confirmConstituencyDispute, isPending: isConfirming } =
    useMutation({
      mutationFn: async (payload) => {
        const res = await USER_UPDATE_CONSTITUENCY_DETAIL(payload);
        const success = checkResponse({ res });

        if (!success) {
          throw new Error(res?.data?.message || "Failed to confirm dispute");
        }

        return res;
      },
      onSuccess: (res) => {
        successToast(
          res?.data?.message || "Confirmation submitted successfully",
        );
        queryClient.invalidateQueries({
          queryKey: ["constituency-detail", data?._id],
        });
      },
      onError: (err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
      },
    });

  const handleSaveDetails = (formValues) => {
    if (!data?._id) {
      errorToast("Constituency details are unavailable");
      return;
    }

    const payload = {
      constituencyId: data?._id,
      disputeType: formValues.disputeType || "",
    };

    if (disputeMode === "community") {
      if (
        formValues.disputeType === "election_date" ||
        formValues.disputeType === "both"
      ) {
        payload.electionDate = formValues.electionDate || "";
      }

      if (
        formValues.disputeType === "description" ||
        formValues.disputeType === "both"
      ) {
        payload.description = formValues.description || "";
      }
    }

    if (formValues.disputeType === "last_election_votes") {
      payload.lastElectionVotes =
        formValues.lastElectionVotes === ""
          ? ""
          : Number(formValues.lastElectionVotes);
    }

    updateConstituencyDetail(payload);
  };

  const handleConfirmDispute = () => {
    if (!data?._id || !pendingDispute) {
      errorToast("No dispute is available to confirm");
      return;
    }

    confirmConstituencyDispute({
      constituencyId: data?._id,
      disputeId:
        pendingDispute?._id ||
        pendingDispute?.id ||
        pendingDispute?.preferenceId ||
        "",
      action: "confirm",
      confirm: true,
    });
  };

  return (
    <>
      <div className="detailsCard_comp p-4 position-relative">
        {!isFetching &&
          isAuthenticated &&
          !isLoading &&
          data?.constituencyBranchType !== "US_PRESIDENT" && (
            <>
              {userHasDisputed ? (
                <div
                  className="btn btn-light position-absolute d-flex align-items-center justify-content-center gap-2 border-warning text-warning"
                  style={{
                    top: "18px",
                    right: "18px",
                    minWidth: "148px",
                    height: "42px",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  <Flag size={16} />
                  <span>{submittedStatusLabel}</span>
                </div>
              ) : canConfirmCountyDispute ? (
                <button
                  type="button"
                  className="btn btn-light position-absolute d-flex align-items-center justify-content-center gap-2 border-success text-success"
                  style={{
                    top: "18px",
                    right: "18px",
                    minWidth: "148px",
                    height: "42px",
                    zIndex: 2,
                  }}
                  onClick={handleConfirmDispute}
                  disabled={isConfirming}
                  aria-label="Confirm these details"
                >
                  <Check size={16} />
                  <span>
                    {isConfirming ? "Confirming..." : "Confirm These Details"}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-absolute"
                  style={{
                    top: "18px",
                    right: "18px",
                    width: "42px",
                    height: "42px",
                    zIndex: 2,
                  }}
                  onClick={() => setShowEditModal(true)}
                  title={disputeButtonLabel}
                  aria-label={disputeButtonLabel}
                >
                  <Flag size={18} />
                </button>
              )}
            </>
          )}
        <Row className="align-items-center">
          <Col lg={5} md={5} sm={12}>
            <div className="detailsCard_comp_left">
              {isFetching || isLoading ? (
                <>
                  <Skeleton width="100%" />
                  <br></br>
                  <Skeleton width="100%" />
                </>
              ) : (
                <>
                  <h4 className="text-white">{data?.name}</h4>
                  <div className="d-flex align-items-center gap-2">
                    <div className="detailsCard_comp_img">
                      <Image
                        src={data?.image?.link || User}
                        alt="user"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="detailsCard_comp_content">
                      <p className="text-white m-0">State: {stateName}</p>
                      <p className="text-white m-0">
                        Type: {data?.type || "Government"}
                      </p>
                      {/* <p className="text-white m-0">Code: {data?.code || "NA"}</p> */}
                      <p className="text-white m-0">
                        Level: {data?.level || "NA"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
          <Col lg={2} md={2} sm={12}>
            <div className="detailsCard_comp_center p-2 text-center">
              {isFetching || isLoading ? (
                <>
                  <div className="loader d-flex justify-content-center align-items-center py-2">
                    <Spinner animation="border" />
                  </div>
                </>
              ) : (
                <>
                  <h3 className="m-0 theme_text fw-bold constituencyVotesCount">
                    {formatNumber(data?.lastElectionVotes || 0)}
                  </h3>
                  <small className="m-0 theme_text constituencyVotesLabel">
                    Total votes for last election
                  </small>
                </>
              )}
            </div>
          </Col>
          <Col lg={5} md={5} sm={12}>
            <div className="detailsCard_comp_right text-start">
              {isFetching || isLoading ? (
                <>
                  <Skeleton width="100%" />
                  <br></br>
                  <Skeleton width="100%" />
                  <br></br>
                  <Skeleton width="100%" />
                </>
              ) : (
                <>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {infoItems.map((item) => (
                      <span
                        key={item.label || item.value}
                        className="bg-white rounded-pill px-3 py-2 small fw-semibold text-dark"
                      >
                        {item.label && `${item.label}: `}
                        {item.value}
                      </span>
                    ))}
                  </div>
                  {isAuthenticated && (
                    <p className="small text-white-50 mb-3">
                      {disputeHelpText}
                    </p>
                  )}
                  <p className="m-0 text-white text-start">
                    {truncateTextByWords(description, 200)}
                  </p>
                  {description.split(" ").length > 200 && (
                    <span
                      className="text-primary ms-1 fw-semibold"
                      role="button"
                      onClick={handleReadMore}
                    >
                      Read more
                    </span>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        scrollable
        contentClassName="rounded-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{data?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-2">
            <strong>State:</strong> {stateName}
          </p>
          <p className="mb-2">
            <strong>Type:</strong> {data?.type || "Government"}
          </p>
          <p className="mb-2">
            <strong>Code:</strong> {data?.code || "NA"}
          </p>
          <p className="mb-2">
            <strong>Level:</strong> {data?.level || "NA"}
          </p>
          {seatLabel && (
            <p className="mb-2">
              <strong>Seat:</strong> {seatLabel}
            </p>
          )}
          <p className="mb-2">
            <strong>Terms:</strong> {data?.terms || "NA"}
          </p>
          <p className="mb-2">
            <strong>Election Date:</strong> {electionDate}
          </p>
          {/* <p className="mb-2">
            <strong>Created:</strong> {createdDate}
          </p> */}
          {/* <p className="mb-2">
            <strong>Last Election Votes:</strong> {formatNumber(data?.lastElectionVotes || 0)}
          </p> */}
          <p className="font-normal description-text mb-0">{description}</p>
        </Modal.Body>
      </Modal>

      <EditConstituencyDetailsModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        initialElectionDate={editableDetails.electionDate}
        initialLastElectionVotes={editableDetails.lastElectionVotes}
        initialDescription={editableDetails.description}
        constituencyName={data?.name}
        disputeMode={disputeMode}
        onSave={handleSaveDetails}
        isPending={isUpdating}
      />
    </>
  );
};

export default DetailsCard;
