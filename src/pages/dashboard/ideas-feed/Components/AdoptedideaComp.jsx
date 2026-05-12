import React, { useState } from "react";
import AdoptedideaCard from "../../../../Component/CommonCard/AdoptedideaCard";
import ReportMod from "../Modal/ReportMod";
import AdoptedideaCardSkelton from "../../../../Component/Skelton/AdoptedideaCardSkelton";
import RemoveConfirmationMod from "../Modal/RemoveConfirmationMod";
import EditcommentMod from "../Modal/EditcommentMod";
import usePaginatedList from "../../../../hooks/usePaginatedList";
import {
  IDEASREMOVE,
  IDEASREPORT,
  MYADOPTEDIDEAS,
} from "../../../../services/ApiCalls";
import { successToast, errorToast } from "../../../../Utilities/toastsMessages";
import { useQueryClient } from "@tanstack/react-query";
import Nodata from "../../../../Component/ui/Nodata";

const AdoptedideaComp = () => {
  const queryClient = useQueryClient();

  const [reportModal, setReportModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [submittingReport, setSubmittingReport] = useState(false);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePaginatedList({
      queryKey: ["MyAdoptedIdeas"],
      fetchFn: async ({ page, limit }) => {
        const res = await MYADOPTEDIDEAS({
          page,
          limit: 10,
          order: -1,
        });
        return res?.data;
      },
    });

  const MyAdoptedIdeaData = data?.pages?.flatMap((p) => p?.data || []) || [];

  const handleRemoveClick = (idea) => {
    setSelectedIdea(idea);
    setRemoveModal(true);
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

  const handleConfirmRemove = async () => {
    console.log(selectedIdea);
    if (!selectedIdea?._id) return;

    try {
      const res = await IDEASREMOVE({
        ideaId: selectedIdea._id,
      });

      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Idea removed successfully");

        setRemoveModal(false);
        setSelectedIdea(null);

        queryClient.invalidateQueries(["MyAdoptedIdeas"]);
      } else {
        errorToast(res?.data?.message || "Unable to remove idea");
      }
    } catch (error) {
      console.error(error);
      errorToast("Server error. Please try again");
    }
  };

  const handleEditClick = (idea) => {
    setSelectedIdea(idea);
    setEditModal(true);
  };

  const handleReportClick = (idea) => {
    setSelectedIdea(idea);
    setReportModal(true);
  };

  const mapAdoptedIdeaToCardData = (idea) => {
    return {
      _id: idea?._id,
      title: idea?.title || "",
      tag: idea?.category?.name || "General",
      adopted: idea?.adopted === "yes",
      description: idea?.description || "",
      submittedby: idea?.submittedByName || "Unknown",
      submitteddate: idea?.submittedOn
        ? new Date(idea.submittedOn).toLocaleDateString()
        : "",
      rating: idea?.rating || 0,
      ratingcount: idea?.ratingsCount || 0,
      commitment:
        "I commit to implementing this idea as part of my public campaign.",
      action: true,
    };
  };

  return (
    <div>
      <RemoveConfirmationMod
        show={removeModal}
        data={selectedIdea}
        onConfirm={handleConfirmRemove}
        onhide={() => setRemoveModal(false)}
      />

      <ReportMod
        show={reportModal}
        data={selectedIdea}
        onhide={() => setReportModal(false)}
        onSubmit={handleReportSubmit}
        loading={submittingReport}
      />

      <EditcommentMod
        show={editModal}
        data={selectedIdea}
        onhide={() => setEditModal(false)}
      />

      <div className="text-start my-4">
        <h4 className="theme_text fw-bold mb-1">
          My Adopted Ideas ({MyAdoptedIdeaData.length})
        </h4>
        <p className="m-0">
          Ideas you've adopted are part of your public campaign platform and
          visible to all voters.
        </p>
      </div>

      <div className="alltopvoters pe-3">
        <ul className="m-0 p-0">
          {isLoading &&
            [...Array(3)].map((_, idx) => (
              <li key={idx}>
                <AdoptedideaCardSkelton />
              </li>
            ))}

          {!isLoading &&
            MyAdoptedIdeaData.map((item, idx) => (
              <li key={item?._id || idx}>
                <AdoptedideaCard
                  data={mapAdoptedIdeaToCardData(item)}
                  onReportClick={() => handleReportClick(item)}
                  onRemoveClick={() => handleRemoveClick(item)}
                  onEditClick={() => handleEditClick(item)}
                />
              </li>
            ))}

          {!isLoading && MyAdoptedIdeaData.length === 0 && (
            <Nodata />
          )}
        </ul>
      </div>

      {hasNextPage && (
        <div className="text-center my-3">
          <button
            className="btn btn-outline-primary"
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdoptedideaComp;
