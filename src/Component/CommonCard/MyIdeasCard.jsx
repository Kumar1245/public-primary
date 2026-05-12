import React from "react";
import { Adoptedcheckicon, Starfill } from "../../Assets/svg/Allsvgicons";
import Image from "next/image";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import { maskIdentity } from "../../lib/helper";
import { getMetaValue } from "../../Utilities/extractMeta";
import User from "../../Assets/images/user.png";

const MyIdeasCard = (props) => {
  const { data, onRatingClick } = props;

  console.log(data, "data====== my ideas cards== judged ata");
  return (
    <div className="ideaCard ">
      <div className="ideaCard_head p-3 border-bottom d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <h4 className="m-0">{data?.category?.name}</h4>
          {data?.adoptedBy?.length > 0 && (
            <p className="greeentag m-0 d-flex align-items-center gap-2 text-white">
              <Adoptedcheckicon />
              Adopted
            </p>
          )}
        </div>
      </div>

      <div className="ideaCard_innner p-3">
        <h5 className="fw-bold">{data?.title}</h5>
        <p className="m-0">{data?.description}</p>
      </div>

      <div className="ideaCard_footer border-top d-flex align-items-center">
        <div
          className="idearating"
          onClick={onRatingClick ? () => onRatingClick(data) : undefined}
          style={{ cursor: onRatingClick ? "pointer" : "default" }}
        >
          <p className="m-0 d-flex align-items-center gap-2 p-3 ">
            <Starfill width={20} height={20} color="#FFB420" />
            {data?.rating}({data?.ratingsCount} Ratings)
          </p>
        </div>

        {data?.judged !== "yes" && (
          <div className="notjudgeyet text-center">
            <p className="m-0 p-3">Not yet judged</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIdeasCard;
