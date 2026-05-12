import React, { useState } from "react";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import Image from "next/image";
import Edituser from "../../../../Assets/images/edituser.png";
import { VerifiedShieldicon } from "../../../../Assets/svg/Allsvgicons";
import EditprofileMod from "../Modal/EditprofileMod";
import moment from "moment";
import { maskIdentity } from "../../../../lib/helper";
import { getMetaValue } from "../../../../Utilities/extractMeta";
import { Skeleton } from "primereact/skeleton";
import { Spinner } from "reactstrap";

const EditprofileComp = (props) => {
  const { profileData, isFetching, isLoading, setProfileUpdated } = props;
  const [editModal, setEditModal] = useState(false);
  return (
    <>
      <EditprofileMod
        show={editModal}
        onhide={() => setEditModal(false)}
        profileData={profileData}
        setProfileUpdated={setProfileUpdated}
      />
      <div className="Editprofile">
        <div className="editprofileCover"></div>
        <div className="editprofileContent_wrap px-4">
          {isFetching || isLoading ? (
            <>
              <Skeleton width="30%" />
              <br></br>
              <Skeleton width="30%" />
            </>
          ) : (
            <div className="editprofile_header d-flex align-items-end justify-content-between">
              <div className="editprofile_user">
                <Image
                  src={profileData?.profileImage?.link || Edituser}
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
          )}
          <div className="bio_details">
            {isFetching || isLoading ? (
              <div className="loader d-flex justify-content-center align-items-center py-4 my-4">
                <Spinner animation="border" />
              </div>
            ) : (
              <ul className="my-3 ">
                <li>
                  <p>Constituency :</p>
                  <p>{profileData?.constituency?.name}</p>
                </li>
                <li>
                  <p>Full Name :</p>
                  <p>{profileData?.name}</p>
                </li>
                <li>
                  <p>Email Address :</p>
                  <p>{profileData?.email}</p>
                </li>
                {/* <li>
                  <p>Phone Number :</p>
                  <p>{profileData?.mobileNumber}</p>
                </li> */}

                <li>
                  <p>Date of Birth :</p>
                  <p>
                    {moment(profileData?.dateOfBirth)?.format("DD-MM-YYYY")}
                  </p>
                </li>

                {/* <li>
                  <p>Address :</p>
                  <p>{profileData?.address}</p>
                </li> */}

                <li>
                  <p>State :</p>
                  <p>{profileData?.state || "N/A"}</p>
                </li>

                <li>
                  <p>County :</p>
                  <p>{profileData?.county || "N/A"}</p>
                </li>
                <li>
                  <p>City :</p>
                  <p>{profileData?.city || "N/A"}</p>
                </li>
              </ul>
            )}
          </div>
          {getMetaValue(
            profileData?.meta_data,
            "voter_registeration_number",
          ) && (
            <div className="verified_Voter d-flex align-items-start gap-2 mt-3">
              <span className="me-2">
                <VerifiedShieldicon />
              </span>
              <div className="">
                <h5 className="fs-18 fw-bold mb-1">
                  Verified Voter Registration:{" "}
                  {getMetaValue(
                    profileData?.meta_data,
                    "voter_registeration_number",
                  )}
                </h5>
                <p className="fs-16 m-0 text-black">
                  You can pledge votes and participate fully in elections{" "}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditprofileComp;
