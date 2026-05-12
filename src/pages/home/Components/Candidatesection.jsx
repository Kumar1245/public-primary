import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Image from "next/image";
import Buttontheme from "../../../Component/ui/Buttontheme";
import { useRouter } from "next/router";

// images
import Candidateimg from "../../../Assets/images/candidateimg.png";
import { useAuth } from "../../../context/AuthContext";

const Candidatesection = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <section className="Candidatesection">
      <Container className="px-lg-5">
        <Row>
          <Col lg={6} md={12} sm={12} className="p-lg-0">
            <div className="candidate_Content">
              <h3>
                <span>Influence</span> and Vote
              </h3>
              <p>
                Get election-ready with tools and products designed for
                meaningful impact. From campaign merchandise and digital
                outreach kits to verified analytics dashboards — we provide
                everything candidates and supporters need to stand out with
                authenticity.{" "}
              </p>

              <p>
                Build trust, engage your community, and represent your cause
                with confidence through transparent, data-backed campaigns.
              </p>
              {!user && (
                <Buttontheme onClick={() => router.push("/auth/createaccount")}>
                  Become a Candidate
                </Buttontheme>
              )}
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} className="p-lg-0">
            <div className="candidate_img">
              <Image
                src={Candidateimg}
                alt="candidate"
                width={500}
                height={500}
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Candidatesection;
