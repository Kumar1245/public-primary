import React from "react";
import {
  Commentsicon,
  DeleteIcon,
  Editicon,
  Optiondoticon,
  Starfill,
} from "../../Assets/svg/Allsvgicons";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { getTimeAgo } from "../../lib/helper";
import user  from "../../Assets/images/user.png"

const PresidentialCard = (props) => {
  const {
    data,
    onCommentClick,
    onEditClick,
    onDeleteClick,
    setSelectedIdea,
    setIdeasAdded,
  } = props;

  return (
    <div className="ConstituencyCard commonCard">
      <div className="fulldetailsHeader p-3 border-bottom d-flex align-items-center gap-2 justify-content-between">
        <div className="fulldetailsHeader_left">
          <h4 className="theme_text fw-bold">{data?.constituency?.name}</h4>

          <div className="d-flex align-items-center gap-2 mt-3">
            <div className="constituency_img">
              <Image
                src={data?.constituency?.image?.link||user}
                alt="img"
                height={100}
                width={100}
                className="img-fluid"
              />
            </div>
            <div className="constituency_img_content">
              <h5 className="fs-18 fw-semibold">
                United States — {data?.constituency?.type}
              </h5>
              <h5 className="fs-18 fw-semibold m-0">
                {data.constituency?.code}
              </h5>
            </div>
          </div>
        </div>
        <div className="fulldetailsHeader_right">
          <Link
            href={`/constituencies/constituencies_detail/${data?.constituency?._id}`}
            className="full_detail"
          >
            Full Detail
          </Link>
        </div>
      </div>

      <div className="p-3">
        <div className="d-flex align-items-center gap-2 mb-2 justify-content-between">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h5 className="fw-semibold m-0">{data?.title}</h5>
            <p className="bluetag m-0">{data?.category?.name}</p>
          </div>

          {data?.adoptedBy?.length == 0 && (
            <div className="optionsactiondropdown d-flex align-items-center gap-2 mb-2">
              <UncontrolledDropdown>
                <DropdownToggle>
                  <Optiondoticon />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      onEditClick();
                      setSelectedIdea(data);
                    }}
                  >
                    <span className="me-2">
                      <Editicon />
                    </span>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={onDeleteClick}>
                    <span className="me-2">
                      <DeleteIcon />
                    </span>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
        </div>

        <p className="m-0">{data?.description}</p>

        <p className="submited m-0">
          Submitted On: {data?.submittedOn && getTimeAgo(data?.submittedOn)}
        </p>

        <div className="d-flex align-items-center gap-4 my-3">
          <p className="m-0 d-flex align-items-center gap-2">
            <Starfill width={20} height={20} color="#FFB420" />
            {data?.rating}({data?.ratingsCount} Ratings)
          </p>

          <p
            className="m-0 d-flex align-items-center gap-2"
            onClick={onCommentClick ? () => onCommentClick(data) : undefined}
            style={{ cursor: onCommentClick ? "pointer" : "default" }}
          >
            <Commentsicon />({data?.commentsCount} Comments)
          </p>
        </div>
        {data?.adoptedBy?.length > 0 && (
          <div className="adopted p-3 d-flex align-items-center gap-2">
            <p className="m-0">Adopted by : </p>
            <ul className="adoptedlist d-flex align-items-center gap-2 m-0 p-0">
              {data?.adoptedBy?.map((item, idx) => {
                return (
                  <li key={idx}>
                    <p className="m-0">
                      {item?.name[idx]}{" "}
                      {idx !== data?.adoptedBy?.length - 1 && ", "}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresidentialCard;
