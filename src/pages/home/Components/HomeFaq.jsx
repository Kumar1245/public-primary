import { useQuery } from "@tanstack/react-query";
import React from "react";

import { Accordion, Container } from "react-bootstrap";
import { checkResponse } from "../../../Utilities/commonFunc";
import { FAQ_LIST } from "../../../services/ApiCalls";

const HomeFaq = () => {
  const { data: faqs } = useQuery({
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
    <div className="Homefaq">
      <Container className="px-lg-5 px-0">
        <div className="faq_head text-center">
          <h2 className="mb-3 text-black ">Frequently Asked Questions</h2>
          <p>
            Find clear answers about how our platform works — from viewing
            constituencies to pledging votes and ensuring transparent elections.
          </p>
        </div>

        <div className="FaqModacc">
          <Accordion defaultActiveKey="0">
            {faqs?.map((item, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{item?.question}</Accordion.Header>
                <Accordion.Body
                  dangerouslySetInnerHTML={{ __html: item?.answer }}
                />
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default HomeFaq;
