import React from "react";
import { Spinner } from "react-bootstrap";

const Jobduties = (props) => {
  const { data, isFetching } = props;

  return (
    <div className="constituency_blue_card commonCard shadow-sm overflow-hidden">
      <div className="blueHeader p-3">
        <h4 className="commonCardHead m-0 text-white">Description</h4>
      </div>
      {isFetching ? (
        <div className="loader d-flex justify-content-center align-items-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {data?.description ? (
            <div
              className="blueHeader_card_content p-3 description-text"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
          ) : (
            <div className="text-center my-4">No description found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobduties;
