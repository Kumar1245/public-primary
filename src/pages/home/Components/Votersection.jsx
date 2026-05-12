import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Image from "next/image";
import Buttontheme from "../../../Component/ui/Buttontheme";

// images
import Vendorimg from "../../../Assets/images/vendorimg.png";
import { useAuth } from "../../../context/AuthContext";

const Votersection = () => {
  const { user } = useAuth();

  return (
    <section className="Votersection">
      <Container className="px-lg-5 p-0">
        <Row>
          <Col lg={6} md={6} sm={12} className="p-lg-0 order-2 order-lg-1">
            <div className="candidate_img">
              <Image
                src={Vendorimg}
                alt="candidate"
                width={500}
                height={500}
                className="img-fluid"
              />
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="p-lg-0 order-1 order-lg-2">
            <div className="candidate_Content">
              <h3>
                <span>Replace</span> Ideology With Ideas
              </h3>
              <p>
                Every vote begins with your pre-electoral process. Here a Public
                Primary, we are a nonpartisan service that allows constituencies
                to find commonality and unity in the form of idea sharing and
                judging. Our write in candidates adopt popular ideas from the
                list to put together a comprehensive and responsible mandate for
                you to also judge. Show these candidates support using a pledge
                vote system, change your pledge at anytime. Vent ideas and
                candidates for every elected position you vote for using all the
                time between elections from the President to your local HOA. 
              </p>
              {!user && <Buttontheme>Become a Voter</Buttontheme>}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Votersection;
