import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardSidebar from "../../Component/DashboardComp/DashboardSidebar";
import Dashboardheader from "../../Component/DashboardComp/Dashboardheader";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { user, token, authReady } = useAuth();
  const [togglemenu, setTogglemenu] = useState(false);
  const handleTogglemenu = () => {
    setTogglemenu((prev) => !prev);
  };

  useEffect(() => {
    if (!authReady) return;

    if (!token || !user) {
      router.replace("/auth/login");
      return;
    }

    if (user.role !== "CANDIDATE") {
      router.replace("/");
    }
  }, [authReady, token, user, router]);

  useEffect(() => {
    setTogglemenu(false);
  }, [router.pathname]);

  if (!authReady) {
    return null;
  }

  if (!user || user.role !== "CANDIDATE") {
    return null;
  }

  return (
    <section className="Main_dassboardWrap fillterContentWrap d-flex align-items-start">
      <div className={`dashboardSiderbar ${togglemenu ? "show" : ""}`}>
        <DashboardSidebar handleTogglemenu={handleTogglemenu} />
      </div>

      {togglemenu && (
        <button
          type="button"
          className="dashboardBackdrop"
          onClick={handleTogglemenu}
          aria-label="Close dashboard menu"
        />
      )}

      <div className={`dashboardContent ${togglemenu ? "paddshow" : ""}`}>
        <Dashboardheader
          togglemenu={togglemenu}
          handleTogglemenu={handleTogglemenu}
        />
        <div className="dashboardContentInner p-3">{children}</div>
      </div>
    </section>
  );
};

export default DashboardLayout;
