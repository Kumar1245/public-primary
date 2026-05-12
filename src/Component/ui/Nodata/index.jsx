import React from "react";
import Image from "next/image";

// images
import Nodataimg from "../../../Assets/images/nodatafound.jpg";

const Nodata = () => {
  return (
    <div className="Nodataimg text-center">
      <Image src={Nodataimg} alt="nodata" width={400} height={400} />
    </div>
  );
};

export default Nodata;
