import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

import Sliderone from "../../../Assets/images/homesliderone.png";
import Slidertwo from "../../../Assets/images/homeslidertwo.png";
import Sliderthree from "../../../Assets/images/homesliderthree.png";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";

const Homebannerdata = [Sliderone, Slidertwo, Sliderthree];

const Homebanner = () => {
  const { user } = useAuth();
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="homebannerSlider position-relative">
      <div className="bannerContent">
        <h1>Exercise Your Democracy or Simply Observe.</h1>
        <p>
          View any U.S. constituency, learn about candidates, and pledge your
          support transparently.
        </p>

        <div className="bannerButton d-flex  align-items-center justify-content-center mt-4 gap-3">
          <div className="d-flex gap-3  justify-content-center align-items-center ">
            <Link href="/constituencies" className="btnwhite">
              Visit a Constituency
            </Link>
            {!user && (
              <Link href="/auth/register" className="btnwhite">
                Create an account
              </Link>
            )}

            {!user && (
              <Link href="/auth/login" className="btnwhite">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <Slider {...settings}>
        {Homebannerdata?.map((item, key) => (
          <div key={key} className="Homelslider_bannerwrap">
            <Image
              src={item}
              alt="banner"
              height={500}
              width={1000}
              className="img-fluid"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Homebanner;
