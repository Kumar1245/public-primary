import Link from "next/link";
import React, { useState } from "react";
import { FETCH_TERM_CONDITION } from "../../../../services/ApiCalls";
import WebViewPage from "../../../webview";

const TermCondition = () => {
  return (
    <div className="PrivacyPolicysec">
      <div className=" cardCommon p-4">
        <div className="suportHead text-start">
          <h4 className="mb-3 theme_text fw-bold">Terms & Conditions</h4>
        </div>

        <WebViewPage url={FETCH_TERM_CONDITION} />
      </div>
    </div>
  );
};

export default TermCondition;
