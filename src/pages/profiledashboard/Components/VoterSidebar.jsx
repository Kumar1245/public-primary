import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Constituencyicon,
  Dasheventsicon,
  Dashhomeicon,
  Dashnotificationicon,
  Dashsetting,
  Dashsubscriptionicon,
  Dsahlogout,
} from "../../../Assets/svg/Allsvgicons";
import { useAuth } from "../../../context/AuthContext";

const Dashmenudata = [
  {
    menutitle: "Dashboard",
    menuIcon: <Dashhomeicon width={20} height={21} color="#333333" />,
    menulink: "/profiledashboard",
  },

  {
    menutitle: "Profile Account",
    menuIcon: <Constituencyicon width={20} height={21} color="#333333" />,
    menulink: "/profiledashboard/profile-account",
  },

  {
    menutitle: "Events",
    menuIcon: <Dasheventsicon width={20} height={20} color="#333333" />,
    menulink: "/profiledashboard/events",
    menulink2: "/profiledashboard/events/calendar",
  },

  {
    menutitle: "Notifications",
    menuIcon: <Dashnotificationicon width={20} height={20} color="#333333" />,
    menulink: "/profiledashboard/notifications",
  },

  {
    menutitle: "Donation",
    menuIcon: <Dashsubscriptionicon width={20} height={20} color="#333333"/>,
    menulink: "/profiledashboard/transactions",
  },

  {
    menutitle: "Settings",
    menuIcon: <Dashsetting width={20} height={20} color="#333333" />,
    menulink: "/profiledashboard/settings",
  },
];

const VoterSidebar = () => {
  const pathname = useRouter().pathname;
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="dashcompSidebarDiv">
      <ul className="sidebar_menuList">
        {Dashmenudata?.map((menu, idx) => {
          return (
            <li key={idx}>
              <Link
                href={menu?.menulink}
                className={`singleMenu d-flex  align-items-center gap-3 ${
                  pathname === menu?.menulink || pathname === menu?.menulink2
                    ? "activeMenu"
                    : ""
                }`}
              >
                <div className="menuIcon">{menu?.menuIcon}</div>
                <p className="m-0">{menu?.menutitle}</p>
              </Link>
            </li>
          );
        })}

        <li>
          <Link href="#" onClick={handleLogout}>
            <div className="singleMenu d-flex  align-items-center gap-3">
              <div className="menuIcon">
                <Dsahlogout width={20} height={20} color="#333333" />
              </div>
              <p className="m-0">Logout</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default VoterSidebar;
