import React, { useState } from "react";
import {
  Commentsicon,
  Optiondoticon,
  Starfill,
} from "../../Assets/svg/Allsvgicons";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { IDEASADOPTEDADD } from "../../services/ApiCalls";
import { errorToast, successToast } from "../../Utilities/toastsMessages";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const ConstituencyCard = ({ data, onCommentClick, onReportClick, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [adoptedLocal, setAdoptedLocal] = useState(false);
  const router = useRouter();
  const { isAuthenticated, authReady } = useAuth();

  // Handle authentication check for protected actions
  const handleProtectedAction = (action) => {
    if (!authReady) return;
    
    if (!isAuthenticated) {
      // Store the intended action to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/auth/login');
      return;
    }
    
    action();
  };

  // const isAdopted = adoptedLocal || data?.adopted === "yes";

  const handleAdoptIdeas = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        ideaId: data?.id,
      };

      const res = await IDEASADOPTEDADD(payload);

      if (res?.data?.status === "success") {
        successToast(res?.data?.message || "Idea Adopted Successfully");
        setAdoptedLocal(true);
        refetch();
      } else {
        errorToast(res?.data?.message || "Unable to adopt idea");
      }
    } catch (error) {
      console.error("Adopt idea error:", error);
      errorToast("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ConstituencyCard commonCard p-3">
      <div className="d-flex align-items-start justify-content-between mb-2">
        <div className="iteaCardtittle d-flex align-items-center gap-2">
          <h5 className="fw-semibold m-0">{data?.title}</h5>
          <p className="bluetag m-0">{data?.tag}</p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* {!isAdopted && ( */}
          <button
            onClick={() => handleProtectedAction(handleAdoptIdeas)}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #21437a, #335fac)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "4px 12px",
              fontSize: "13px",
              fontWeight: "400",
              cursor: loading ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(46, 125, 255, 0.3)",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Adopting..." : "Adopt"}
          </button>
          {/* )} */}

          {data?.action && (
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
      </div>

      <p className="m-0">{data?.description}</p>

      <p className="submited m-0">
        Submitted by {data?.submittedby} &middot; {data?.submitteddate}
      </p>

      <div className="d-flex align-items-center gap-4 my-3">
        <p className="m-0 d-flex align-items-center gap-2">
          <Starfill width={20} height={20} color="#FFB420" />
          {data?.rating} ({data?.ratingcount} Ratings)
        </p>

        <p
          className="m-0 d-flex align-items-center gap-2"
          onClick={onCommentClick ? () => onCommentClick(data) : undefined}
          style={{ cursor: onCommentClick ? "pointer" : "default" }}
        >
          <Commentsicon /> ({data?.commets} Comments)
        </p>
      </div>

      {data?.adoptedby?.length > 0 && (
        <div className="adopted p-3 d-flex align-items-center gap-2">
          <p className="m-0">Adopted by :</p>
          <ul className="adoptedlist d-flex align-items-center gap-2 m-0 p-0">
            {data.adoptedby.map((item, idx) => (
              <li key={idx}>
                <p className="m-0">
                  {item}
                  {idx !== data.adoptedby.length - 1 && ", "}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConstituencyCard;
