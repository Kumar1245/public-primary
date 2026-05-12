import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import { Skeleton } from "primereact/skeleton";

// image
import Vedioimg from "../../../../Assets/images/mediaimg.png";
import { renderMedia } from "../../../../lib/helper";
import { getMetaValue } from "../../../../Utilities/extractMeta";

const vedioslist = [
  {
    id: 1,
    image: Vedioimg,
    title: "Permanent Video",
    key: "permanent_introductory_video",
  },
  {
    id: 2,
    image: Vedioimg,
    title: "Current Video",
    key: "current_campaign_video",
  },
];

const VedioCard = (props) => {
  const { candidate } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="candidate_veiw_vediocard d-flex  gap-4">
      {loading
        ? [...Array(vedioslist.length)].map((_, idx) => (
            <div key={idx}>
              <div className="vediocard_set text-center">
                <div className="vediothumbnail mb-2">
                  <Skeleton width="200px" height="150px" borderRadius="8px" />
                </div>
                <Skeleton
                  width="70%"
                  height="0.9rem"
                  className="mx-auto mt-2"
                />
              </div>
            </div>
          ))
        : vedioslist.map((item, idx) => {
            return (
              <div key={idx} className="vediocard_set text-center ">
                <div className="vediothumbnail">
                  {renderMedia(getMetaValue(candidate?.meta_data, item?.key))}
                  {/* <Image
                    src={item.image}
                    alt="img"
                    width={200}
                    height={150}
                    className="img-fluid"
                  /> */}
                </div>
                <p className="mb-0 fw-semibold text-black fs-14 mt-2">
                  {item.title}
                </p>
              </div>
            );
          })}
    </div>
  );
};

export default VedioCard;
