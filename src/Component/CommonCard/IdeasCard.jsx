import React, { useState } from "react";
import { Adoptedcheckicon, Starfill } from "../../Assets/svg/Allsvgicons";
import Image from "next/image";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import { maskIdentity, truncateTextByWords } from "../../lib/helper";
import User from "../../Assets/images/user.png";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const IdeasCard = ({ data, onRatingClick }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { isAuthenticated, authReady } = useAuth();

  const handleReadMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  // Handle authentication check for adopted user links
  const handleAdoptedUserClick = (e, userId) => {
    if (!authReady) {
      e.preventDefault();
      return;
    }

    if (!isAuthenticated) {
      e.preventDefault();
      sessionStorage.setItem(
        "redirectAfterLogin",
        `/constituencies/candidate-view/${userId}`,
      );
      router.push("/auth/login");
    }
  };

  return (
    <>
      <div className="ideaCard">
        <div className="ideaCard_head p-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <h4 className="m-0">{data?.category?.name}</h4>
            {data?.adoptedBy?.length > 0 && (
              <UncontrolledDropdown>
                <DropdownToggle
                  tag="div"
                  className="greeentag m-0 cursor-pointer d-flex align-items-center gap-2 text-white cursor-pointer"
                  style={{
                    background: "#00832c",
                    borderRadius: "12px",
                    padding: "1px 10px",
                    fontSize: "12px",
                    lineHeight: "28px",
                    cursor: "pointer",
                  }}
                >
                  <Adoptedcheckicon />
                  Adopted
                </DropdownToggle>

                <DropdownMenu>
                  {data?.adoptedBy?.map((item, idx) => {
                    const userId = item?._id;
                    const userName =
                      typeof item?.name === "string"
                        ? item?.name
                        : item?.name?.[0] || "";

                    const imageSrc = item?.profileImage?.link?.startsWith(
                      "http",
                    )
                      ? item?.profileImage?.link
                      : User;

                    return (
                      <DropdownItem key={`adopted-${idx}`}>
                        <Link
                          href={
                            isAuthenticated
                              ? `/constituencies/candidate-view/${userId}`
                              : "#"
                          }
                          onClick={(e) => handleAdoptedUserClick(e, userId)}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <div className="auditimg">
                              <Image
                                src={imageSrc}
                                alt="adopteduser"
                                width={40}
                                height={40}
                              />
                            </div>
                            <p className="m-0">{maskIdentity(userName)}</p>
                          </div>
                        </Link>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </div>

          {/* {data?.judgedBy?.length > 0 && (
            <div className="audit">
              <UncontrolledDropdown>
                <DropdownToggle>Audit</DropdownToggle>

                <DropdownMenu>
                  {data?.judgedBy?.map((item, idx) => {
                    const userId = item?._id?.[0];
                    const userName =
                      typeof item?.name === "string"
                        ? item?.name
                        : item?.name?.[0] || "";

                    const imageSrc = item?.profileImage?.[0]?.startsWith("http")
                      ? item?.profileImage?.[0]
                      : User;

                    return (
                      <DropdownItem key={idx}>
                        <Link
                          href={`/constituencies/candidate-view/${userId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <div className="auditimg">
                              <Image
                                src={imageSrc}
                                alt="audituser"
                                width={40}
                                height={40}
                              />
                            </div>
                            <p className="m-0">{maskIdentity(userName)}</p>
                          </div>
                        </Link>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )} */}
          {data?.judgedBy?.length > 0 && (
            <div className="audit">
              <UncontrolledDropdown>
                <DropdownToggle>Audit</DropdownToggle>

                <DropdownMenu>
                  {data?.judgedBy?.map((item, idx) => {
                    const userId = item?._id?.[0] || "";
                    const userName =
                      typeof item?.name === "string"
                        ? item?.name
                        : item?.name?.[0] || "";

                    const imageSrc = item?.profileImage?.[0]?.startsWith("http")
                      ? item?.profileImage?.[0]
                      : User;

                    const userRating = item?.rating || 1;

                    const shortId =
                      userId.length > 4 ? `...${userId.slice(-4)}` : userId;

                    return (
                      <DropdownItem
                        key={idx}
                        style={{ cursor: "default" }}
                        className="disabled"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div className="auditimg">
                            <Image
                              src={imageSrc}
                              alt="audituser"
                              width={40}
                              height={40}
                            />
                          </div>

                          <p className="m-0 d-flex align-items-center gap-2">
                            <span className="text fw-bold">
                              {userRating} ⭐
                            </span>

                            <span>{maskIdentity(userName)}</span>
                          </p>
                        </div>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
        </div>

        <div className="ideaCard_innner p-3">
          <h5 className="fw-bold">{data?.title}</h5>
          <p className="m-0">
            {truncateTextByWords(data?.description, 200)}
            {data?.description?.length > 200 && (
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

        <div className="ideaCard_footer border-top d-flex align-items-center">
          <div
            className="idearating"
            onClick={onRatingClick ? () => onRatingClick(data) : undefined}
            style={{ cursor: onRatingClick ? "pointer" : "default" }}
          >
            <p className="m-0 d-flex align-items-center gap-2 p-3">
              <Starfill width={20} height={20} color="#FFB420" />
              {data?.rating} ({data?.ratingsCount} Ratings)
            </p>
          </div>
          {data?.judged !== "yes" && (
            <div className="notjudgeyet text-center">
              <p className="m-0 p-3">Not yet judged</p>
            </div>
          )}
        </div>
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
          <Modal.Title>{data?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="font-normal description-text">{data?.description}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default IdeasCard;
