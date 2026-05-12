import React from "react";

const RulesandPolicy = () => {
  return (
    <div className="constituency_blue_card commonCard shadow-sm overflow-hidden">
      <div className="blueHeader p-3">
        <h4 className="commonCardHead m-0 text-white">Rules & Policies</h4>
      </div>

      <div className="blueHeader_card_content p-3">
        <p>
          Every elected representative in this district must follow federal,
          state, and local election laws designed to ensure transparency, fair
          representation, and ethical conduct. Below are key rules and legal
          references guiding campaigns and public office responsibilities.
        </p>

        <p>📘 1. Federal Election Regulations</p>

        <ul>
          <li>Source: Federal Election Commission (FEC)</li>
          <li>
            <p className="m-0">
              Summary: The FEC oversees campaign financing, contribution limits,
              and public disclosure requirements.
            </p>

            <p className="m-0">
              Candidates must file quarterly financial reports and disclose all
              political donations over $200.
            </p>
          </li>
          <li>
            <p className="m-0">
              Penalty Example: Failure to report funds accurately may result in
              fines up to $50,000 or disqualification.
            </p>
          </li>
        </ul>

        <p>🧾 2. California Election Code – Title 9 (Political Reform Act)</p>

        <ul>
          <li>
            <p className="m-0">
              Source: California Fair Political Practices Commission (FPPC)
            </p>
          </li>

          <li>
            <p className="m-0">
              Summary:Regulates candidate ethics, transparency in advertising,
              and lobbying disclosure. All campaign materials must include a
              clear “Paid for by” statement.
            </p>
          </li>

          <li>
            <p className="m-0">
              Penalty Example: False or misleading campaign ads can result in
              suspension or investigation by FPPC.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RulesandPolicy;
