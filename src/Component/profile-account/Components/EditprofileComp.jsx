import React, { useState } from "react";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";

// images
import Edituser from "../../../../Assets/images/edituser.png";
import { VerifiedShieldicon } from "../../../../Assets/svg/Allsvgicons";
import EditprofileMod from "../Modal/EditprofileMod";

const EditprofileComp = (props) => {
  const { profileData, isFetching, isLoading } = props;
  const [editModal, setEditModal] = useState(false);
  return (
    <>
      <EditprofileMod show={editModal} onhide={() => setEditModal(false)} />
      <div className="Editprofile">
        <div className="editprofileCover"></div>
        <div className="editprofileContent_wrap px-4">
          <div className="editprofile_header d-flex align-items-end justify-content-between">
            <div className="editprofile_user">
              <Image
                src={Edituser}
                alt="img"
                width={400}
                height={400}
                className="img-fluid"
              />
            </div>
            <Buttontheme
              className="editprofile_btn"
              onClick={() => setEditModal(true)}
            >
              Edit Profile
            </Buttontheme>
          </div>

          <div className="bio_details">
            <ul className="my-3 ">
              <li>
                <p>Constituency :</p>
                <p>District 5</p>
              </li>
              <li>
                <p>Full Name :</p>
                <p>{profileData?.name}</p>
              </li>
              <li>
                <p>Email Address :</p>
                <p>{profileData?.email}</p>
              </li>
              <li>
                <p>Phone Number :</p>
                <p>{profileData?.mobileNumber}</p>
              </li>

              <li>
                <p>Date of Birth :</p>
                <p>{profileData?.dateOfBirth}</p>
              </li>

              <li>
                <p>Address :</p>
                <p>{profileData?.address}</p>
              </li>
            </ul>
          </div>

          <div className="verified_Voter d-flex align-items-start gap-2 mt-3">
            <span className="me-2">
              <VerifiedShieldicon />
            </span>
            <div className="">
              <h5 className="fs-18 fw-bold mb-1">
                Verified Voter Registration: VR123456789
              </h5>
              <p className="fs-16 m-0 text-black">
                You can pledge votes and participate fully in elections{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditprofileComp;
