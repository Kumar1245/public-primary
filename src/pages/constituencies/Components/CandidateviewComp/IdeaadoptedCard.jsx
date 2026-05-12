// import React, { useState, useEffect } from "react";
// import RateandCommnetMod from "../../Modal/RateandCommnetMod";
// import IdeaCardSkeleton from "../../../../Component/Skelton/IdeaCardSkeleton";
// import IdeasCard from "../../../../Component/CommonCard/IdeasCard";

// // images
// import User from "../../../../Assets/images/user.png";
// import { Col, Row } from "react-bootstrap";
// import { IDEAS_LIST, IDEASCOMMENTSLIST } from "../../../../services/ApiCalls";
// import { checkResponse } from "../../../../Utilities/commonFunc";
// import { useQuery } from "@tanstack/react-query";

// const IdeasCarddata = {
//   id: 1,
//   category: "Transportation",
//   title: "Expand Public Transit Routes to Underserved Areas",
//   para: "Proposal to add 3 new bus routes connecting residential areas to job centers. Proposal to add 3 new bus routes connecting residential areas to job centers.",
//   rating: 4.5,
//   ratings: 245,
//   adopted: true,
// };

// const commentsData = [
//   {
//     id: 1,
//     user: {
//       name: "Olivia Harris",
//       avatar: User,
//     },
//     rating: 5,
//     time: "58 minutes ago",
//     comment:
//       "Great idea! It's impossible to find chargers during weekend travel along Highway 1. This would really encourage more EV adoption.",
//   },
//   {
//     id: 2,
//     user: {
//       name: "David Chen",
//       avatar: User,
//     },
//     rating: 5,
//     time: "58 minutes ago",
//     comment:
//       "I support this but suggest partnering with local businesses for shared charging spots to reduce installation costs.",
//   },
// ];

// const IdeaadoptedCard = (props) => {
//   const { id } = props;
//   const [rateandcommentModal, setRateandcommentModal] = useState(false);
//   const [selectedIdea, setSelectedIdea] = useState(null);

//   const handleRatingClick = (idea) => {
//     setSelectedIdea(idea);
//     setRateandcommentModal(true);
//   };

//   const {
//     data: ideas,
//     isLoading,
//     isFetching,
//   } = useQuery({
//     queryKey: ["ideas", id],
//     queryFn: async () => {
//       const res = await IDEAS_LIST({ userid: id });

//       const success = checkResponse({ res });

//       if (success) {
//         return res?.data?.data;
//       } else {
//         return [];
//       }
//     },
//     keepPreviousData: true,
//     enabled: !!id,
//   });

//   const {
//     data: commentData = [],
//     isLoading: isCommentLoading,
//     isFetching: isCommentFetching,
//   } = useQuery({
//     queryKey: ["commentList", selectedIdea?._id],
//     queryFn: async () => {
//       const res = await IDEASCOMMENTSLIST({
//         ideaId: selectedIdea?._id,
//       });

//       const success = checkResponse({ res });
//       return success ? res?.data?.data || [] : [];
//     },
//     enabled: !!selectedIdea?._id,
//     keepPreviousData: false,
//   });

//   console.log(commentData, "commentData ideasadopted");

//   return (
//     <>
//       <RateandCommnetMod
//         show={rateandcommentModal}
//         onhide={() => setRateandcommentModal(false)}
//         idea={selectedIdea}
//         commentsdata={commentData}
//         isLoading={isCommentLoading || isCommentFetching}
//       />
//       <div className="IdeaadoptedCard commongrey">
//         <h5 className="text-black fw-bold fs-22 p-3 border-bottom">
//           Ideas Adopted
//         </h5>

//         <div className="ideaadopted p-3">
//           <Row>
//             {isFetching || isLoading
//               ? [...Array(ideas?.length || 6)].map((_, idx) => (
//                   <Col lg={12} key={idx}>
//                     <IdeaCardSkeleton />
//                   </Col>
//                 ))
//               : ideas?.map((item, idx) => {
//                   return (
//                     <Col lg={12} key={idx}>
//                       {
//                         <IdeasCard
//                           data={item}
//                           onRatingClick={handleRatingClick}
//                         />
//                       }
//                     </Col>
//                   );
//                 })}
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// };

// export default IdeaadoptedCard;

import React, { useState } from "react";
import RateandCommnetMod from "../../Modal/RateandCommnetMod";
import IdeaCardSkeleton from "../../../../Component/Skelton/IdeaCardSkeleton";
import IdeasCard from "../../../../Component/CommonCard/IdeasCard";
import { Col, Row } from "react-bootstrap";
import { IDEAS_LIST, IDEASCOMMENTSLIST } from "../../../../services/ApiCalls";
import { checkResponse } from "../../../../Utilities/commonFunc";
import { useQuery } from "@tanstack/react-query";

const IdeaadoptedCard = ({ id }) => {
  const [rateandcommentModal, setRateandcommentModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const handleRatingClick = (idea) => {
    if (idea?.judged === "yes") return;
    setSelectedIdea(idea);
    setRateandcommentModal(true);
  };

  const {
    data: ideas = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["ideas", id],
    queryFn: async () => {
      const res = await IDEAS_LIST({ userid: id });
      const success = checkResponse({ res });
      return success ? res?.data?.data || [] : [];
    },
    enabled: !!id,
    keepPreviousData: true,
  });

  const {
    data: commentData = {},
    isLoading: isCommentLoading,
    isFetching: isCommentFetching,
  } = useQuery({
    queryKey: ["commentList", selectedIdea?._id],
    queryFn: async () => {
      const res = await IDEASCOMMENTSLIST({
        ideaId: selectedIdea?._id,
      });
      const success = checkResponse({ res });
      return success ? res?.data?.data || {} : {};
    },
    enabled: !!selectedIdea?._id,
    keepPreviousData: false,
  });

  return (
    <>
      <RateandCommnetMod
        show={rateandcommentModal}
        onhide={() => setRateandcommentModal(false)}
        idea={selectedIdea}
        commentsdata={commentData}
        isLoading={isCommentLoading || isCommentFetching}
      />

      <div className="IdeaadoptedCard commongrey">
        <h5 className="text-black fw-bold fs-22 p-3 border-bottom">
          Ideas Adopted
        </h5>

        <div className="ideaadopted p-3">
          <Row>
            {isFetching || isLoading ? (
              [...Array(6)].map((_, idx) => (
                <Col lg={12} key={idx}>
                  <IdeaCardSkeleton />
                </Col>
              ))
            ) : ideas.length > 0 ? (
              ideas.map((item, idx) => (
                <Col lg={12} key={idx}>
                  <IdeasCard data={item} onRatingClick={handleRatingClick} />
                </Col>
              ))
            ) : (
              <Col lg={12}>
                <p className="text-center text-muted">No Ideas Found</p>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default IdeaadoptedCard;
