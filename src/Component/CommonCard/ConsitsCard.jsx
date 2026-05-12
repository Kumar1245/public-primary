// import React, { useMemo, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button, Modal } from "react-bootstrap";
// import moment from "moment/moment";
// import { State } from "country-state-city";
// import User from "../../Assets/images/user.png";
// import { truncateTextByWords } from "../../lib/helper";
// import { useAuth } from "../../context/AuthContext";

// const ConsitsCard = (props) => {
//   const {
//     data,
//     action = false,
//     handleRemoveConstituency = null,
//     isPending = false,
//   } = props;
//   const { user } = useAuth();
//   const [showModal, setShowModal] = useState(false);

//   const handleReadMore = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowModal(true);
//   };

//   const createdDate = data?.date_created_utc
//     ? moment(data.date_created_utc).format("DD MMM YYYY")
//     : "NA";
//   const electionDate = data?.electionDate
//     ? moment(data.electionDate).format("DD MMM YYYY")
//     : "NA";
//   const stateLabel = useMemo(() => {
//     if (!data?.state) return "United States";
//     const matchedState = State.getStatesOfCountry("US").find(
//       (item) => item.isoCode === data.state,
//     );
//     return matchedState?.name || data.state;
//   }, [data?.state]);
//   const typeLabel = data?.type || "Government";
//   const codeLabel = data?.code || "NA";
//   const seatLabel = data?.electedSeat || data?.seatType || "NA";

//   return (
//     <>
//       <Link
//         href={`/constituencies/constituencies_detail/${data?._id}`}
//         className="text-decoration-none"
//       >
//         <div className="ideaCard resumeCard overflow-hidden">
//           <div className="resumeCard_head align-items-center p-3">
//             <h5 className="m-0 text-white fw-semibold text-truncate">
//               {truncateTextByWords(data?.name, 90, false)}
//             </h5>
//             <span className="d-flex justify-content-between justify-content-center align-items-center mt-3">
//               <p className="m-0 text-white font-normal">{stateLabel}</p>
//               <p className="bg-white rounded-pill m-0 px-3 py-1 small fw-semibold text-dark">
//                 <strong>Seat:</strong> {seatLabel}
//               </p>
//             </span>
//           </div>

//           <div className="ResumeCard_innner constituency-card-inner px-3 py-3">
//             <div className="profileUser d-flex align-items-center gap-2 mb-3">
//               <div className="profileUser_img">
//                 <Image
//                   src={data?.image?.link || User}
//                   alt="user"
//                   width={44}
//                   height={44}
//                 />
//               </div>
//               <div className="profileUser_content">
//                 <p className="fw-semibold text-truncate m-0">{typeLabel}</p>
//                 <p className="font-normal m-0">Level: {data?.level || "NA"}</p>
//               </div>
//             </div>

//             <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-2">
//               <p className="mb-0 cardText font-normal">
//                 <strong>Election:</strong> {electionDate}
//               </p>
//             </div>

//             <p className="mt-2 mb-0 cardText font-normal">
//               {truncateTextByWords(data?.description, 150)}
//               {data?.description?.split(" ").length > 150 && (
//                 <span
//                   className="text-primary ms-1 fw-semibold"
//                   role="button"
//                   onClick={handleReadMore}
//                 >
//                   Read more
//                 </span>
//               )}
//             </p>
//           </div>

//           {action === true && data?.createdBy === user?._id && (
//             <>
//               <hr className="m-0" />
//               <Button
//                 className="clearAll"
//                 type="button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   if (handleRemoveConstituency) {
//                     handleRemoveConstituency(data?._id);
//                   }
//                 }}
//                 disabled={isPending}
//               >
//                 {isPending ? "Removing..." : "Remove Constituency"}
//               </Button>
//             </>
//           )}
//         </div>
//       </Link>
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         size="lg"
//         scrollable
//         contentClassName="rounded-modal"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{data?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p className="mb-2">
//             <strong>State:</strong> {stateLabel}
//           </p>
//           <p className="mb-2">
//             <strong>Code:</strong> {codeLabel}
//           </p>
//           <p className="mb-2">
//             <strong>Type:</strong> {typeLabel}
//           </p>
//           <p className="mb-2">
//             <strong>Level:</strong> {data?.level || "NA"}
//           </p>
//           <p className="mb-2">
//             <strong>Seat:</strong> {seatLabel}
//           </p>
//           <p className="mb-2">
//             <strong>Election Date:</strong> {electionDate}
//           </p>
//           <p className="font-normal description-text mb-0">
//             {data?.description}
//           </p>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default ConsitsCard;

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import moment from "moment/moment";
import { State } from "country-state-city";
import User from "../../Assets/images/user.png";
import {
  getConstituencySeatLabel,
  truncateTextByWords,
} from "../../lib/helper";
import { useAuth } from "../../context/AuthContext";

const ConsitsCard = (props) => {
  const {
    data,
    action = false,
    handleRemoveConstituency = null,
    isPending = false,
  } = props;
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleReadMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const createdDate = data?.date_created_utc
    ? moment(data.date_created_utc).format("DD MMM YYYY")
    : "NA";
  const electionDate = data?.electionDate
    ? moment(data.electionDate).format("DD MMM YYYY")
    : "NA";

  // Check if constituency is US President
  const isUSPresident =
    data?.name?.toLowerCase() === "us president" ||
    data?.name?.toLowerCase() === "president" ||
    data?.seatType?.toLowerCase() === "president";

  const stateLabel = useMemo(() => {
    if (!data?.state) return "United States";
    const matchedState = State.getStatesOfCountry("US").find(
      (item) => item.isoCode === data.state,
    );
    return matchedState?.name || data.state;
  }, [data?.state]);

  const typeLabel = data?.type || "Government";
  const codeLabel = data?.code || "NA";
  const seatLabel = useMemo(
    () => getConstituencySeatLabel(data, stateLabel),
    [data, stateLabel],
  );

  return (
    <>
      <Link
        href={`/constituencies/constituencies_detail/${data?._id}?subId=${data?.cloneId}`}
        className="text-decoration-none"
      >
        <div className="ideaCard resumeCard overflow-hidden">
          <div className="resumeCard_head align-items-center p-3">
            <h5 className="m-0 text-white fw-semibold text-truncate">
              {truncateTextByWords(data?.name, 90, false)}
            </h5>
            <span className="d-flex justify-content-between justify-content-center align-items-center mt-3">
              {/* Only show state if NOT US President */}
              {!isUSPresident && (
                <p className="m-0 text-white font-normal">{stateLabel}</p>
              )}
              {/* {seatLabel && (
                <p className="bg-white rounded-pill m-0 px-3 py-1 small fw-semibold text-dark">
                  {` ${seatLabel} `}
                </p>
              )} */}
            </span>
          </div>

          <div className="ResumeCard_innner constituency-card-inner px-3 py-3">
            <div className="profileUser d-flex align-items-center gap-2 mb-3">
              <div className="profileUser_img">
                <Image
                  src={data?.image?.link || User}
                  alt="user"
                  width={44}
                  height={44}
                />
              </div>
              <div className="profileUser_content">
                <p className="fw-semibold text-truncate m-0">{typeLabel}</p>
                <p className="font-normal m-0">Level: {data?.level || "NA"}</p>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mb-2">
              <p className="mb-0 cardText font-normal">
                <strong>Election:</strong>{" "}
                {moment(electionDate).format("YYYY MMM DD")}
              </p>
            </div>

            <p className="mt-2 mb-0 cardText font-normal">
              {truncateTextByWords(data?.description, 150)}
              {data?.description?.split(" ").length > 150 && (
                <span
                  className="text-primary ms-1 fw-semibold"
                  role="button"
                  onClick={handleReadMore}
                >
                  Read more
                </span>
              )}
            </p>
          </div>

          {action === true && data?.createdBy === user?._id && (
            <>
              <hr className="m-0" />
              <Button
                className="clearAll"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (handleRemoveConstituency) {
                    handleRemoveConstituency(data?._id);
                  }
                }}
                disabled={isPending}
              >
                {isPending ? "Removing..." : "Remove Constituency"}
              </Button>
            </>
          )}
        </div>
      </Link>
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
          {/* Only show state in modal if NOT US President */}
          {!isUSPresident && (
            <p className="mb-2">
              <strong>State:</strong> {stateLabel}
            </p>
          )}
          <p className="mb-2">
            <strong>Code:</strong> {codeLabel}
          </p>
          <p className="mb-2">
            <strong>Type:</strong> {typeLabel}
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
            <strong>Election Date:</strong> {electionDate}
          </p>
          <p className="font-normal description-text mb-0">
            {data?.description}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConsitsCard;
