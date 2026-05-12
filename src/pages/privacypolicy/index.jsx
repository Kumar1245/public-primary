import React from "react";
import Homelayout from "../../Layout/Homelayout";
import { Container } from "reactstrap";
import { FETCH_PRIVACY_POLICY } from "../../services/ApiCalls";
import WebViewPage from "../webview";

const Privacypolicy = () => {
  return (
    <section className="policay_page">
      <Container className="px-lg-5 p-0">
        <div className="suportHead text-start">
          <h3 className="mb-3 theme_text fw-bold">Privacy Policy</h3>
        </div>
        <WebViewPage url={FETCH_PRIVACY_POLICY} />
      </Container>
    </section>
  );
};

export default Privacypolicy;

Privacypolicy.getLayout = function getLayout(page) {
  return <Homelayout>{page}</Homelayout>;
};
