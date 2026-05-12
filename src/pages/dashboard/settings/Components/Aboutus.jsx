import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FETCH_ABOUT_US } from "../../../../services/ApiCalls";
import WebViewPage from "../../../webview";

const Aboutus = () => {
  return (
    <div className="PrivacyPolicysec">
      <div className=" cardCommon p-4">
        <div className="suportHead text-start">
          <h4 className="mb-3 theme_text fw-bold">About Us</h4>
        </div>
        <WebViewPage url={FETCH_ABOUT_US} />
      </div>
    </div>
  );
};

export default Aboutus;
