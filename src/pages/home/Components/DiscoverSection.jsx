import React from "react";
import { Container } from "react-bootstrap";

// images
import Discoverbanner from "../../../Assets/images/discoverbanner.png";

const DiscoverSection = () => {
  return (
    <section className="discoverSection">
      <Container className="px-lg-5">
        <div className="discoverSection_head text-center">
          <h2 className="p-0">
            <span>Discover Your Democracy</span> — Engage Actively or Simply
            Watch It Unfold.
          </h2>
          <p>
            Every vote begins with awareness. Our platform helps you explore
            every constituency — from the national stage to your local district
            — with real-time pledge counts, verified candidate profiles, and
            transparent audit tracking.{" "}
          </p>

          <p>
            Whether you’re a voter, volunteer, or candidate, we make civic
            participation easy, secure, and open to all. Join a movement built
            on accountability and community-driven change. Every vote begins
            with awareness. Our platform helps you explore every constituency —
            from the national stage to your local district — with real-time
            pledge counts, verified candidate profiles, and transparent audit
            tracking.{" "}
          </p>

          <p>
            Whether you’re a voter, volunteer, or candidate, we make civic
            participation easy, secure, and open to all. Join a movement built
            on accountability and community-driven change.
          </p>
        </div>
      </Container>

      <div
        className="discoverfull_banner position-relative"
        style={{
          backgroundImage: `url(${Discoverbanner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "500px",
          width: "100%",
        }}
      >
        <div className="discoverfull_bannercontent">
          <h4>
            Bringing Democracy Online, One Click at a Time. Digital Democracy
            for the Modern Citizen.
          </h4>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
