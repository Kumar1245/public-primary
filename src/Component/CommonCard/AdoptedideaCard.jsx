import React from "react";
import {
  Adoptedcheckicon,
  CommentEditicon,
  Commentsicon,
  Deleteicon,
  Optiondoticon,
  Starfill,
} from "../../Assets/svg/Allsvgicons";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const AdoptedideaCard = (props) => {
  const { data, onCommentClick, onReportClick, onRemoveClick, onEditClick } =
    props;
  return (
    <div className="ConstituencyCard commonCard p-3">
      <div className="d-flex align-items-center gap-2 mb-2 justify-content-between">
        <div className="d-flex align-items-center gap-2 mb-2">
          <h5 className="fw-semibold m-0">{data.title}</h5>
          <p className="bluetag m-0">{data.tag}</p>
          {data.adopted && (
            <p className="greeentag m-0 d-flex align-items-center gap-2">
              <Adoptedcheckicon />
              Adopted
            </p>
          )}
        </div>

        {data.action && (
          <div className="optionsactiondropdown d-flex align-items-center gap-2 mb-2">
            <UncontrolledDropdown>
              <DropdownToggle>
                <Optiondoticon />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="text_red" onClick={onReportClick}>
                  Report
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </div>

      <p className="m-0">{data.description}</p>

      <p className="submited m-0">
        Originally submitted by {data.submittedby} &middot; {data.submitteddate}
      </p>

      <div className="d-flex align-items-center gap-4 my-3">
        <p className="m-0 d-flex align-items-center gap-2">
          <Starfill width={20} height={20} color="#FFB420" />
          {data.rating}({data.ratingcount} Ratings)
        </p>
      </div>

      <div className="adopted p-3 ">
        <small className="m-0 text-black">Your Commitment: </small>
        <ul className="adoptedlist d-flex align-items-center gap-2 m-0 p-0">
          <li>
            <p className="m-0">{data.commitment}</p>
          </li>
        </ul>
      </div>

      <div className="actionBtns d-flex aling-items-center gap-3 mt-3">
        {/* <button className="editactbtn btncommon" onClick={onEditClick}>
          <CommentEditicon />
          Edit Comment
        </button> */}
        <button className="removeactbtn btncommon" onClick={onRemoveClick}>
          <Deleteicon />
          Remove from platform
        </button>
      </div>
    </div>
  );
};

export default AdoptedideaCard;
