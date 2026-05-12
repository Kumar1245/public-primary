import React from "react";

// images
import Votebanner from "../../Assets/images/votebanner.png";
import Buttontheme from "../../Component/ui/Buttontheme";
import Homelayout from "../../Layout/Homelayout";
import { Inviteicon } from "../../Assets/svg/Allsvgicons";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

const Becomecandidate = () => {
  const router = useRouter();

  const handleBecomeCandidate = () => {
    router.push("/auth/createaccount");
  };
  return (
    <section className="becomeCandidate">
      <div
        className="constitBanner position-relative"
        style={{
          backgroundImage: `url(${Votebanner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "300px",
          width: "100%",
        }}
      >
        <div className="becomecandidate text-center">
          <h2>Become a Candidate for Your Constituency</h2>

          <Buttontheme
            className="inviteButton mt-3"
            onClick={handleBecomeCandidate}
          >
            <span className="me-2">
              <Inviteicon />
            </span>
            Become a Candidate
          </Buttontheme>
        </div>
      </div>

      <div className="candidateContent">
        <Container className="px-lg-5">
          <div className="candidatecard p-4 mb-4">
            <h3>Prerequisites & Eligibility</h3>
            <p>
              To submit your candidacy, ensure you meet the following
              eligibility criteria and prepare the required documents.
            </p>

            <p>Eligibility Requirements</p>

            <ul>
              <li>Minimum age as defined by local election rules</li>
              <li>Verified citizenship or residency proof</li>
              <li>Clean legal record & compliance with civic standards</li>
              <li>
                No conflict of interest with government-restricted positions
              </li>
              <li>Ability to commit to campaign guidelines</li>
            </ul>

            <p>Required Documents</p>

            <ul>
              <li>Valid Government ID</li>
              <li>Address Proof</li>
              <li>Updated Resume / CV</li>
              <li>Professional Photograph</li>
              <li>Supporting Documents (if any)</li>
            </ul>
          </div>

          <div className="candidatecard p-4 mb-4">
            <h3>Pricing & Fees</h3>
            <p>Application Fee:</p>
            <p>Covers administrative screening and system processing.</p>

            <p>Resume Verification Fee:</p>

            <p>
              Includes fact-checking, formatting, and certification for public
              display.
            </p>

            <p>Optional Premium Package (If Applicable):</p>

            <ul>
              <li>Professional resume rewriting</li>
              <li>Priority review</li>
              <li>Personal candidate advisor</li>
              <li>Enhanced visibility in constituency feed</li>
            </ul>

            <p>
              Note: All payments are secure and non-refundable once verification
              begins.
            </p>
          </div>

          <div className="candidatecard p-4 mb-4">
            <h3>Verified Resume Service</h3>
            <p>
              Your resume is thoroughly checked, formatted, and prepared for
              public display so voters can trust your background.
            </p>
            <p>Verification Includes:</p>

            <ul>
              <li>Identity validation</li>
              <li>Experience & education verification</li>
              <li>Professional formatting</li>
              <li>Public Primary Verified Badge</li>
              <li>Publication-ready candidate profile</li>
            </ul>
          </div>

          <div className="candidatecard p-4 mb-4">
            <h3>What You Get as a Candidate</h3>
            <p>Public Primary Supports You With:</p>

            <ul>
              <li>Verified and official candidate profile</li>
              <li>Public visibility to your entire constituency</li>
              <li>Tools to share your vision, experience, and agenda</li>
              <li>Campaign engagement tools</li>
              <li>Voter interaction modules</li>
              <li>Notifications & updates</li>
              <li>Analytics dashboard</li>
              <li>Document checks and compliance support</li>
              <li>Dedicated candidate helpdesk</li>
            </ul>

            <p>
              This ensures your candidacy is trusted, validated, and
              professionally presented to your voters.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Becomecandidate;

Becomecandidate.getLayout = function getLayout(page) {
  return <Homelayout>{page}</Homelayout>;
};
