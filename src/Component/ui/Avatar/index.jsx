import React from "react";
import Image from "next/image";

const Avatar = ({ src, alt, width, height, className }) => {
  return (
    <div className="AvatarCommon">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </div>
  );
};

export default Avatar;
