import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  Constituencyicon,
  Dashcampaingnicon,
  Dasheventsicon,
  Dashhomeicon,
  Dashideafeedicon,
  Dashnotificationicon,
  Dashsetting,
  Dashsubscriptionicon,
  Dsahlogout,
} from "../../Assets/svg/Allsvgicons";
import { useAuth } from "../../context/AuthContext";

// svg

const Dashmenudata = [
  {
    menutitle: "Dashboard",
    menuIcon: <Dashhomeicon width={20} height={21} color="#fff" />,
    menulink: "/dashboard",
  },

  {
    menutitle: "Constituency",
    menuIcon: <Constituencyicon width={20} height={20} color="#fff" />,
    menulink: "/dashboard/constituency",
  },

  {
    menutitle: "Ideas Feed",
    menuIcon: <Dashideafeedicon />,
    menulink: "/dashboard/ideas-feed",
  },

  {
    menutitle: "Events",
    menuIcon: <Dasheventsicon width={20} height={20} color="#fff" />,
    menulink: "/dashboard/events",
  },

  {
    menutitle: "Campaign Media",
    menuIcon: <Dashcampaingnicon />,
    menulink: "/dashboard/campaign-media",
  },

  // {
  //   menutitle: "Subscription",
  //   menuIcon: <Dashsubscriptionicon />,
  //   menulink: "/dashboard/subscription",
  // },

  {
    menutitle: "Notifications",
    menuIcon: <Dashnotificationicon width={20} height={20} color="#fff" />,
    menulink: "/dashboard/notifications",
  },

  {
    menutitle: "Settings",
    menuIcon: <Dashsetting width={20} height={20} color="#fff" />,
    menulink: "/dashboard/settings",
  },
];

const DashboardSidebar = (props) => {
  const { handleTogglemenu } = props;
  const pathname = useRouter().pathname;
  const { logout } = useAuth();

  return (
    <div className="dashcompSidebarDiv">
      <div className="dashlogo">
        <h2 className="text-center">Public Primary</h2>
      </div>
      <ul className="sidebar_menuList">
        {Dashmenudata.map((menu, idx) => {
          return (
            <li key={idx} onClick={handleTogglemenu}>
              <Link
                href={menu?.menulink}
                className={`singleMenu d-flex  align-items-center gap-3 ${
                  pathname === menu?.menulink && "activeMenu"
                }`}
              >
                <div className="menuIcon">{menu?.menuIcon}</div>
                <p className="m-0">{menu?.menutitle}</p>
              </Link>
            </li>
          );
        })}

        <li>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
              handleTogglemenu?.();
            }}
          >
            <div className="singleMenu d-flex align-items-center gap-3">
              <div className="menuIcon">
                <Dsahlogout width={20} height={20} color="#FF383C" />
              </div>
              <p className="m-0 text_red">Logout</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
