import Link from "next/link";
import React, { useState } from "react";
import WebViewPage from "../../../webview";
import { FETCH_PRIVACY_POLICY } from "../../../../services/ApiCalls";

const PrivacyPolicy = () => {
  return (
    <div className="PrivacyPolicysec">
      <div className=" cardCommon p-4">
        <div className="suportHead text-start">
          <h4 className="mb-3 theme_text fw-bold">Privacy Policy</h4>
        </div>
        <WebViewPage url={FETCH_PRIVACY_POLICY} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
