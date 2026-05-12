import React, { useState, useEffect } from "react";
import Buttontheme from "../../../../Component/ui/Buttontheme";
import { Button } from "react-bootstrap";
import {
  Bankcarddeleteicn,
  Bankcardedit,
  Bankicon,
} from "../../../../Assets/svg/Allsvgicons";
import BankCardSkeleton from "../../../../Component/Skelton/BankCardSkeleton";
import AddnewBankMod from "../Modal/AddnewBankMod";
import EditBankMod from "../Modal/EditBankMod";
import DeleteBankMod from "../Modal/DeleteBankMod";

const payoutcarddata = [
  {
    bankicon: <Bankicon />,
    bankname: "JPMorgan Chase Bank",
    routingno: "123456789",
    accoutno: "123456789",
    holdername: "John Doe",
  },
  {
    bankicon: <Bankicon />,
    bankname: "Wells Fargo Bank",
    routingno: "123456789",
    accoutno: "123456789",
    holdername: "John Doe",
  },
];

const PayoutinnerCards = ({ data }) => {
  const [editbankmodal, setEditbankmodal] = useState(false);
  const [deletebankmodal, setDeletebankmodal] = useState(false);

  return (
    <>
      <EditBankMod
        show={editbankmodal}
        onhide={() => setEditbankmodal(false)}
      />
      <DeleteBankMod
        show={deletebankmodal}
        onhide={() => setDeletebankmodal(false)}
      />

      <div className="innpayoutCard  p-3 ">
        <div className="banknameShow d-flex align-items-center gap-2 justify-content-between w-100">
          <div className="banktitle d-flex align-items-center gap-2">
            <div className="bankicon d-flex align-items-center justify-content-center rounded-circle">
              {data.bankicon}
            </div>
            <h4>{data.bankname}</h4>
          </div>
          <div className="cardActions d-flex align-items-center gap-3">
            <Button onClick={() => setEditbankmodal(true)}>
              <Bankcardedit />
            </Button>
            <Button onClick={() => setDeletebankmodal(true)}>
              <Bankcarddeleteicn />
            </Button>
          </div>
        </div>

        <div className="banklistdetails mt-3">
          <ul>
            <li>
              <p>Routing Number :</p>
              <p>{data.routingno}</p>
            </li>
            <li>
              <p>Account Number :</p>
              <p>{data.accoutno}</p>
            </li>
            <li>
              <p>Holder Name :</p>
              <p>{data.holdername}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const PayoutAccount = () => {
  const [addnewbankmodal, setAddnewbankmodal] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <AddnewBankMod
        show={addnewbankmodal}
        onhide={() => setAddnewbankmodal(false)}
      />

      <div className="payouthead d-flex align-items-center justify-content-between">
        <h4 className="m-0 text-white ">Payout Account</h4>
        <Buttontheme
          className="updateBtn mt-3"
          onClick={() => setAddnewbankmodal(true)}
        >
          + Add New
        </Buttontheme>
      </div>

      <div className="payoutCards">
        <ul>
          {loading
            ? [...Array(payoutcarddata.length)].map((_, idx) => (
                <li key={idx}>
                  <BankCardSkeleton />
                </li>
              ))
            : payoutcarddata.map((item, idx) => {
                return (
                  <li key={idx}>
                    <PayoutinnerCards data={item} />
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
};

export default PayoutAccount;
