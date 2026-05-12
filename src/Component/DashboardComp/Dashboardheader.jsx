import React, { useRef } from "react";
import Link from "next/link";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Image from "next/image";
import User from "../../Assets/images/user.png";
import { useRouter } from "next/router";
import {
  CarotheaderIcon,
  Headerprofileicn,
  Headerlogout,
  Menubaricon,
  Menubarcloseicon,
} from "../../Assets/svg/Allsvgicons";
import { useAuth } from "../../context/AuthContext";

const Dashboardheader = ({ togglemenu, handleTogglemenu }) => {
  const toggleRef = useRef(null);
  const { user, logout } = useAuth();

  const closeDropdown = () => {
    toggleRef.current?.click();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    closeDropdown();
    logout();
  };

  const userName = user?.name || user?.fullName || "User";
  const userImage = user?.profileImage?.link || User;
  return (
    <div className="Dashheader d-flex align-items-center justify-content-between p-3">
      <div className="d-flex align-items-center gap-3">
        <button className="menubaricon" onClick={handleTogglemenu}>
          {togglemenu ? <Menubarcloseicon /> : <Menubaricon />}
        </button>

        {/* <div className="headerSearch position-relative">
          <input type="search" placeholder="Search..." />
          <span className="searchicon">
            <HeaderSearchicn />
          </span>
        </div> */}
      </div>

      <div className="headerRight d-flex align-items-center gap-3">
        <div className="userProfileWrap">
          <UncontrolledDropdown>
            <DropdownToggle innerRef={toggleRef}>
              <div className="user_profile position-relative">
                {userImage ? (
                  <Image
                    src={userImage || User}
                    alt="user"
                    width={40}
                    height={40}
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <h3 className="m-0 text-center text-black">
                      {userName?.slice(0, 1)}
                    </h3>
                  </div>
                )}
              </div>
              <div className="customcaret">
                <CarotheaderIcon />
              </div>
            </DropdownToggle>

            <DropdownMenu>
              <div className="userCardshow text-center p-3">
                <div className="user_profile_card">
                  {userImage ? (
                    <Image
                      src={userImage || User}
                      alt="user"
                      width={40}
                      height={40}
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <h3 className="m-0 text-center text-black">
                        {userName?.slice(0, 1)}
                      </h3>
                    </div>
                  )}
                </div>
                <h5 className="mt-3 mb-0">{userName}</h5>
              </div>

              <div className="divider"></div>

              <ul className="userDropdownList p-3 m-0">
                <li onClick={closeDropdown}>
                  <Link href="/dashboard/settings">
                    <span className="me-2">
                      <Headerprofileicn />
                    </span>
                    Profile
                  </Link>
                </li>

                <li onClick={handleLogout}>
                  <Link href="#">
                    <span className="me-2">
                      <Headerlogout />
                    </span>
                    Logout
                  </Link>
                </li>
              </ul>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </div>
  );
};

export default Dashboardheader;
