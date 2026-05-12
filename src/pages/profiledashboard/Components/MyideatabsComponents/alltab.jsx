import React, { useState, useEffect } from "react";

// images
import User from "../../../../Assets/images/user.png";
import Pledemodimg from "../../../../Assets/images/pledemodimg.png";

import PresidentialCard from "../../../../Component/CommonCard/PresidentialCard";
import CommnetMod from "../../../../Component/Modals/CommnetMod";
import PresidentialCardSkelton from "../../../../Component/Skelton/PresidentialCardSkelton";
import EditideaMod from "../../Modal/EditideaMod";
import DeleteideaMod from "../../Modal/DeleteideaMod";
import Nodata from "../../../../Component/ui/Nodata";

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
      "Great idea! It's impossible to find chargers during weekend travel along Highway 1. This would really encourage more EV adoption.",
  },
  {
    id: 2,
    user: {
      name: "David Chen",
      avatar: User,
    },
    rating: 5,
    time: "58 minutes ago",
    comment:
      "I support this but suggest partnering with local businesses for shared charging spots to reduce installation costs.",
  },

  {
    id: 3,
    user: {
      name: "David Chen",
      avatar: User,
    },
    rating: 5,
    time: "58 minutes ago",
    comment:
      "I support this but suggest partnering with local businesses for shared charging spots to reduce installation costs.",
  },
];

const Alltab = (props) => {
  const { ideas, isLoading, isFetching, setIdeasAdded } = props;
  const [commentModal, setCommentModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const handleCommentClick = (idea) => {
    setSelectedComment(idea);
    setCommentModal(true);
  };
  const handleReportClick = (idea) => {
    setReportModal(true);
  };
  const handleEditClick = (idea) => {
    setEditModal(true);
  };

  const handleDeleteClick = (idea) => {
    setDeleteModal(true);
  };
  return (
    <div>
      <CommnetMod
        show={commentModal}
        onhide={() => setCommentModal(false)}
        comment={selectedComment}
        commentsData={commentsData}
      />

      <EditideaMod
        show={editModal}
        onhide={() => setEditModal(false)}
        idea={selectedIdea}
        setIdeasAdded={setIdeasAdded}
      />

      <DeleteideaMod show={deleteModal} onhide={() => setDeleteModal(false)} />

      <div className="alltideas pe-3">
        <ul className="m-0 p-0">
          {isLoading || isFetching
            ? [...Array(ideas?.length || 6)].map((_, idx) => (
                <li key={idx}>
                  <PresidentialCardSkelton />
                </li>
              ))
            : ideas?.map((item, idx) => {
                return (
                  <li key={idx}>
                    <PresidentialCard
                      data={item}
                      onCommentClick={handleCommentClick}
                      onReportClick={handleReportClick}
                      onEditClick={handleEditClick}
                      setSelectedIdea={setSelectedIdea}
                      onDeleteClick={handleDeleteClick}
                    />
                  </li>
                );
              })}
          {!isFetching && ideas?.length === 0 && <Nodata />}
        </ul>
      </div>
    </div>
  );
};

export default Alltab;
