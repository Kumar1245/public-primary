import React from "react";
import Homelayout from "../../Layout/Homelayout";
import { Container } from "reactstrap";
import { FETCH_TERM_CONDITION } from "../../services/ApiCalls";
import WebViewPage from "../webview";

const Termsandconditions = () => {
  return (
    <section className="policay_page">
      <Container className="px-lg-5 p-0">
        <div className="suportHead text-start">
          <h3 className="mb-3 theme_text fw-bold">Terms & Conditions</h3>
        </div>

        <WebViewPage url={FETCH_TERM_CONDITION} />
      </Container>
    </section>
  );
};

export default Termsandconditions;

Termsandconditions.getLayout = function getLayout(page) {
  return <Homelayout>{page}</Homelayout>;
};
