import React from "react";
import { Accordion, Spinner } from "react-bootstrap";
import { FAQ_LIST } from "../../../../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { checkResponse } from "../../../../Utilities/commonFunc";

const Faq = () => {
  const { data: faqs, isFetching } = useQuery({
    queryKey: ["faq-list"],
    queryFn: async () => {
      const res = await FAQ_LIST();

      const success = checkResponse({ res });

      if (success) {
        return res?.data?.data;
      } else {
        return [];
      }
    },
    keepPreviousData: true,
  });

  return (
    <div className="settingFormWrap">
      <div className="FaqModacc">
        <Accordion defaultActiveKey="0">
          {isFetching ? (
            <div className="loader d-flex justify-content-center align-items-center">
              <Spinner animation="border" />
            </div>
          ) : (
            faqs?.map((item, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{item?.question}</Accordion.Header>
                <Accordion.Body
                  dangerouslySetInnerHTML={{ __html: item?.answer }}
                />
              </Accordion.Item>
            ))
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
