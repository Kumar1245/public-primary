import React, { useState, useEffect } from "react";
import ConstituencyCard from "../../../../../Component/CommonCard/ConstituencyCard";
import ConstituencyCardSkeleton from "../../../../../Component/Skelton/ConstituencyCardSkeleton";
import User from "../../../../../Assets/images/user.png";
import ReportMod from "../../Modal/ReportMod";
import CommnetMod from "../../../../../Component/Modals/CommnetMod";
import {
  IDEASCOMMITMENET,
  IDEASREPORT,
} from "../../../../../services/ApiCalls";
import {
  successToast,
  errorToast,
} from "../../../../../Utilities/toastsMessages";
import { useAuth } from "../../../../../context/AuthContext";
import { useRouter } from "next/router";

const commentsData = [
  {
    id: 1,
    user: {
      name: "Olivia Harris",
      avatar: User,
    },
    rating: 5,
    time: "58 minutes ago",
    comment:
      "Great data! It's impossible to find chargers during weekend travel along Highway 1.",
  },
];

const Alltab = ({ data = [], refetch, isFetching }) => {
  const [loading, setLoading] = useState(true);
  const [commentModal, setCommentModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [submittingReport, setSubmittingReport] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { isAuthenticated, authReady } = useAuth();

  // Handle authentication check for protected actions

  const handleProtectedAction = (action) => {
    if (!authReady) return;
    
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/auth/login');
      return;
    }
    
    action();
  };

  const mapdataToCardData = (item) => ({
    id: item?._id,
    title: item?.title || "",
    tag: item?.category?.name || "General",
    description: item?.description || "",
    submittedby: item?.submittedByName || "Unknown",
    submitteddate: item?.submittedOn
      ? new Date(item.submittedOn).toLocaleDateString()
      : "",
    rating: item?.rating || 0,
    ratingcount: item?.ratingsCount || 0,
    commets: item?.commentsCount || 0,
    adopted: item?.adopted,
    adoptedby: item?.adopted === "yes" ? [item?.submittedByName] : [],
    action: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleReportClick = (idea) => {
    handleProtectedAction(() => {
      setSelectedIdea(idea);
      setReportModal(true);
    });
  };

  const handleReportSubmit = async (formData) => {
    const payload = {
      ideaId: selectedIdea.id,
      reason: formData.reason,
      ...(formData.comment && { comment: formData.comment }),
    };

    try {
      const res = await IDEASREPORT(payload);

      if (res?.data?.status === "success") {
        successToast(res.data.message);
        setReportModal(false);
        setSelectedIdea(null);
      } else {
        errorToast(res?.data?.message);
      }
    } catch (err) {
      errorToast("Server error. Please try again");
    }
  };

  const handleCommentClick = (idea) => {
    handleProtectedAction(() => {
      setSelectedIdea(idea);
      setCommentModal(true);
    });
  };

  const handleAddCommitment = async (formData) => {
    if (!selectedIdea?.id || !formData?.commitment?.trim()) {
      errorToast("Commitment is required");
      return;
    }

    try {
      setSubmitting(true);
      const res = await IDEASCOMMITMENET({
        ideaId: selectedIdea.id,
        commitment: formData.commitment,
      });

      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Commitment added successfully");
        setCommentModal(false);
      } else {
        errorToast(res?.data?.message || "Something went wrong");
      }
    } catch {
      errorToast("Server error. Please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CommnetMod
        show={commentModal}
        onhide={() => setCommentModal(false)}
        comment={selectedIdea}
        commentsData={commentsData}
        onSubmit={handleAddCommitment}
        loading={submitting}
      />

      <ReportMod
        show={reportModal}
        onhide={() => setReportModal(false)}
        onSubmit={handleReportSubmit}
        loading={submittingReport}
      />

      <div className="alltopvoters pe-3">
        <ul className="m-0 p-0">
          {loading || isFetching
            ? [...Array(4)].map((_, idx) => (
                <li key={idx}>
                  <ConstituencyCardSkeleton />
                </li>
              ))
            : data.map((item, idx) => {
                const cardData = mapdataToCardData(item);
                return (
                  <li key={cardData.id || idx}>
                    <ConstituencyCard
                      data={cardData}
                      onCommentClick={() => handleCommentClick(cardData)}
                      onReportClick={() => handleReportClick(cardData)}
                      refetch={refetch}
                    />
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
};

export default Alltab;
