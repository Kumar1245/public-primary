import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DONATION_CANCEL } from "../../../services/ApiCalls";
import Buttontheme from "../../../Component/ui/Buttontheme";
import { errorToast, successToast } from "../../../Utilities/toastsMessages";

const getSubscriptionId = (record) =>
  record?.subscriptionId ||
  record?.subscription_id ||
  record?.stripeSubscriptionId ||
  "";

const getDisplayAmount = (record) => {
  const amount =
    record?.amount ??
    record?.price ??
    record?.donationAmount ??
    record?.planAmount ??
    record?.transaction?.amount;

  return typeof amount === "number" ? amount.toFixed(2) : amount;
};

const getDisplayCurrency = (record) =>
  (record?.currency ||
    record?.transaction?.currency ||
    record?.planCurrency ||
    "usd"
  ).toUpperCase();

const getStatus = (record) =>
  (
    record?.status ||
    record?.subscriptionStatus ||
    "active"
  ).toString();

const formatDateTime = (value) => {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
};

const DonationStatusCard = ({ profileData, isLoading, isFetching }) => {
  const queryClient = useQueryClient();
  const donationRecord = profileData?.currentSubscription || null;
  const subscriptionId = getSubscriptionId(donationRecord);
  const hasActiveDonation = Boolean(donationRecord?.isActive && subscriptionId);

  const cancelDonationMutation = useMutation({
    mutationFn: DONATION_CANCEL,
    onSuccess: (res) => {
      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Subscription canceled successfully.");
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        return;
      }

      errorToast(res?.data?.message || "Unable to cancel subscription.");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || "Unable to cancel subscription.",
      );
    },
  });

  const handleCancelDonation = () => {
    if (!subscriptionId) {
      errorToast("Subscription ID is missing.");
      return;
    }

    cancelDonationMutation.mutate({ subscriptionId });
  };

  return (
    <div className="bg-white rounded-4 shadow-sm p-4 mt-4">
      <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
        <div>
          <h5 className="fw-semibold mb-1">Donation</h5>
          <p className="text-muted mb-0">
            View and manage your current donation .
          </p>
        </div>
        {hasActiveDonation ? (
          <span className="badge text-bg-success text-capitalize px-3 py-2">
            {getStatus(donationRecord)}
          </span>
        ) : (
          <span className="badge text-bg-secondary px-3 py-2">
            No active donation
          </span>
        )}
      </div>

      {isLoading || isFetching ? (
        <p className="text-muted mt-3 mb-0">Loading donation details...</p>
      ) : hasActiveDonation ? (
        <>
          <div className="row g-3">
       
            <div className="col-md-6">
              <div className="border rounded-3 p-3 h-100">
                <small className="text-muted d-block mb-1">Amount</small>
                <div className="fw-semibold">
                  {getDisplayCurrency(donationRecord)} {getDisplayAmount(donationRecord) || "-"}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-3 p-3 h-100">
                <small className="text-muted d-block mb-1">Created On</small>
                <div className="fw-semibold">
                  {formatDateTime(donationRecord?.dateCreatedUTC)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Buttontheme
              type="button"
              className="cancelWhiteBtn"
              onClick={handleCancelDonation}
              disabled={cancelDonationMutation.isPending}
            >
              {cancelDonationMutation.isPending
                ? "Canceling..."
                : "Cancel Donation"}
            </Buttontheme>
          </div>
        </>
      ) : (
        <p className="text-muted mt-3 mb-0">
          No active donation Donation is available right now.
        </p>
      )}
    </div>
  );
};

export default DonationStatusCard;
