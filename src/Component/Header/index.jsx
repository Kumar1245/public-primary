import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { Button, Form, FormGroup, Input } from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useRouter } from "next/router";
import Placeholdeuser from "../../Assets/images/placeholdeuser.png";
import {
  CarotheaderIcon,
  Headerlogout,
  Headerprofileicn,
} from "../../Assets/svg/Allsvgicons";
import { useAuth } from "../../context/AuthContext";
import User from "../../Assets/images/user.png";

const getTextValue = (...values) => {
  const value = values.find(
    (item) => item !== undefined && item !== null && String(item).trim(),
  );

  return value !== undefined ? String(value).trim() : "";
};

const formatCountyDisplay = (value) => {
  const county = getTextValue(value);

  if (!county) return "";

  if (/^\d+$/.test(county)) {
    return `County ${county.padStart(3, "0")}`;
  }

  if (/\b(county|borough|parish|municipality|census area)\b/i.test(county)) {
    return county;
  }

  return `${county} County`;
};

const formatStateDisplay = (value) => {
  const state = getTextValue(value);

  if (!state) return "";

  return state.replace(/\s+County$/i, "");
};

export default function Header(props) {
  const route = useRouter();
  const pathname = route.pathname;
  const isHomeRoute = pathname === "/";
  const isConstituenciesRoute = pathname.startsWith("/constituencies");
  const [nav, setNav] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const toggleRef = useRef(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeDropdown = () => {
    toggleRef.current?.click();
  };

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (nav) {
      document.body.classList.add("bodyfix");
    } else {
      document.body.classList.remove("bodyfix");
    }
    return () => {
      document.body.classList.remove("bodyfix");
    };
  }, [nav]);

  const handleLogout = (e) => {
    e.preventDefault();
    closeDropdown();
    logout();
  };

  const headerState = formatStateDisplay(
    getTextValue(
    user?.state,
    user?.stateName,
    user?.location?.state,
    ),
  );
  const headerCounty = formatCountyDisplay(
    getTextValue(
      user?.countyName,
      user?.county_name,
      user?.county,
      user?.boroughName,
      user?.borough,
      user?.location?.county,
      user?.location?.borough,
    ),
  );
  const headerLocationParts = [headerState, headerCounty].filter(Boolean);
  const userProfileHref = "/profiledashboard/profile-account";
  const headerSubtitleParts = isAuthenticated
    ? [user?.name, "Home Page", ...headerLocationParts].filter(Boolean)
    : [];

  return (
    <>
      {/* <Authmodaloffcanvas show={authmodal} onhide={() => setAuthmodal(false)} /> */}

      <section
        className={
          scroll ? "header-main fixed-header" : `header-main ${props.nobanner}`
        }
      >
        <Container className="p-0">
          <div className="header">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <Link href="/" className="navbar-brand">
                  <div className="brandBlock">
                    <h4 className="fw-bold m-0">Public Primary</h4>
                    {headerSubtitleParts.length ? (
                      <p className="brandSubtitle m-0">
                        <Link
                          href={userProfileHref}
                          className="brandSubtitleLink"
                        >
                          {headerSubtitleParts[0]}
                        </Link>
                        {headerSubtitleParts
                          .slice(1)
                          .map((part) => ` • ${part}`)}
                      </p>
                    ) : null}
                  </div>
                </Link>

                <button
                  className={`navbar-toggler ${nav ? "" : "menu_click"}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setNav(!nav)}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </button>
                <div
                  className={
                    nav
                      ? "collapse navbar-collapse show"
                      : "collapse navbar-collapse"
                  }
                  id="navbarSupportedContent"
                >
                  <div className="mobileMenu_overlay"></div>
                  <ul className="navbar-nav scroll-menu m-auto mb-2 mb-lg-0">
                    <Button
                      onClick={() => setNav(false)}
                      className="close-menu"
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--gg"
                        width="28"
                        height="28"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586L6.225 4.81Z"
                        />
                      </svg>
                    </Button>

                    <li className="nav-item">
                      <Link
                        href={"/"}
                        className={`${isHomeRoute ? "active" : ""} nav-link`}
                        aria-current={isHomeRoute ? "page" : undefined}
                        onClick={() => setNav(false)}
                      >
                        Home
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        href={"/constituencies"}
                        className={`${
                          isConstituenciesRoute ? "active" : ""
                        } nav-link`}
                        aria-current={isConstituenciesRoute ? "page" : undefined}
                        onClick={() => setNav(false)}
                      >
                        Constituencies
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="add-wallet-wrap profile_dropdown">
              {isAuthenticated ? (
                <div className="userProfileWrap desktop-profile">
                  <UncontrolledDropdown>
                    <DropdownToggle innerRef={toggleRef}>
                      <div className="user_profile position-relative">
                        {user?.profileImage?.link ? (
                          <Image
                            src={user?.profileImage?.link || User}
                            alt="user"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover", borderRadius: "50%" }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <h3 className="m-0 text-center text-black">
                              {user?.name?.slice(0, 1)}
                            </h3>
                          </div>
                        )}
                      </div>

                      <div className="customcaret">
                        <CarotheaderIcon />
                      </div>
                    </DropdownToggle>

                    <DropdownMenu className="headerDropdownMenu">
                      <div className="userCardshow p-3 pb-0">
                        <div className="user_profile_card ">
                          {user?.profileImage?.link ? (
                            <Image
                              src={user?.profileImage?.link || User}
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
                                {user?.name?.slice(0, 1)}
                              </h3>
                            </div>
                          )}
                        </div>
                        <Link
                          href={userProfileHref}
                          className="mb-0 text-truncate usenamedesktop"
                          onClick={closeDropdown}
                        >
                          {user?.name}
                        </Link>
                      </div>

                      <ul className="userDropdownList p-3 m-0">
                        <li onClick={closeDropdown}>
                          <Link href={userProfileHref}>
                            <span className="me-2">
                              <Headerprofileicn />
                            </span>
                            Dashboard
                          </Link>
                        </li>

                        <div className="divider my-2"></div>

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
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="nav-link login_link desktoplinks"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    className="nav-link register_link desktoplinks"
                  >
                    Register
                  </Link>
                </>
              )}
              {/* <div className="userProfileWrap mobileuserProfile">
                <UncontrolledDropdown>
                  <DropdownToggle innerRef={toggleRef}>
                    <div className="user_profile position-relative ">
                      {isAuthenticated && user?.profileImage?.link ? (
                        <Image
                          src={user?.profileImage?.link}
                          alt="user"
                          width={40}
                          height={40}
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        <Image
                          src={Placeholdeuser}
                          alt="user"
                          width={40}
                          height={40}
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      )}
                    </div>

                    <div className="customcaret">
                      <CarotheaderIcon />
                    </div>
                  </DropdownToggle>

                  <DropdownMenu>
                    {isAuthenticated ? (
                      <ul className="userDropdownList p-3 m-0">
                        <li onClick={closeDropdown}>
                          <Link href="/profiledashboard">
                            <span className="me-2">
                              <Headerprofileicn />
                            </span>
                            Dashboard
                          </Link>
                        </li>

                        <div className="divider my-2"></div>

                        <li onClick={handleLogout}>
                          <Link href="#">
                            <span className="me-2">
                              <Headerlogout />
                            </span>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      <ul className="userDropdownList p-3 m-0">
                        <li onClick={closeDropdown}>
                          <Link
                            href="/auth/login"
                            className="nav-link login_link"
                          >
                            Login
                          </Link>
                        </li>

                        <div className="divider my-1"></div>

                        <li onClick={closeDropdown}>
                          <Link
                            href="/auth/register"
                            className="nav-link register_link"
                          >
                            Register
                          </Link>
                        </li>
                      </ul>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div> */}
              <div className="userProfileWrap mobileuserProfile mobile-profile">
                <UncontrolledDropdown>
                  <DropdownToggle innerRef={toggleRef}>
                    <div className="user_profile position-relative">
                      {isAuthenticated ? (
                        user?.profileImage?.link ? (
                          <Image
                            src={user?.profileImage?.link}
                            alt="user"
                            width={40}
                            height={40}
                            style={{ objectFit: "cover", borderRadius: "50%" }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <h3 className="m-0 text-center text-black">
                              {user?.name?.slice(0, 1)}
                            </h3>
                          </div>
                        )
                      ) : (
                        <Image
                          src={Placeholdeuser}
                          alt="user"
                          width={40}
                          height={40}
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      )}
                    </div>

                    <div className="customcaret">
                      <CarotheaderIcon />
                    </div>
                  </DropdownToggle>

                  <DropdownMenu className="headerDropdownMenu">
                    {isAuthenticated ? (
                      <>
                        <div className="userCardshow p-3 pb-0">
                          <div className="user_profile_card">
                            {user?.profileImage?.link ? (
                              <Image
                                src={user?.profileImage?.link}
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
                                  {user?.name?.slice(0, 1)}
                                </h3>
                              </div>
                            )}
                          </div>
                          <Link
                            href={userProfileHref}
                            className="mb-0 text-truncate usenamedesktop"
                            onClick={closeDropdown}
                          >
                            {user?.name}
                          </Link>
                        </div>

                        <ul className="userDropdownList p-3 m-0">
                          <li onClick={closeDropdown}>
                            <Link href={userProfileHref}>
                              <span className="me-2">
                                <Headerprofileicn />
                              </span>
                              Dashboard
                            </Link>
                          </li>

                          <div className="divider my-2"></div>

                          <li onClick={handleLogout}>
                            <Link href="#">
                              <span className="me-2">
                                <Headerlogout />
                              </span>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <ul className="userDropdownList p-3 m-0">
                        <li onClick={closeDropdown}>
                          <Link
                            href="/auth/login"
                            className="nav-link login_link"
                          >
                            Login
                          </Link>
                        </li>

                        <div className="divider my-1"></div>

                        <li onClick={closeDropdown}>
                          <Link
                            href="/auth/register"
                            className="nav-link register_link"
                          >
                            Register
                          </Link>
                        </li>
                      </ul>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
