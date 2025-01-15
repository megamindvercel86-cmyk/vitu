import React from "react";
import SubHeading from "../Common/SubHeding";
import Heading from "../Common/Heading";
import Button from "../Common/Button";
import { CTAButtonIcon } from "../Icons/Icons";

const AboutHeroSection = () => {
  return (
    <div className="relative xl:h-[1080px] lg:h-[1026px] sm:h-[568px] h-[568px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/images/backgroundImages/aboutPageBackgroundImageDesktop.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white flex flex-col items-center">
          <h1 className="font-freightNeoSemibold lg:text-[100px] leading-none">
            Building Wholesome
          </h1>
          <h1 className="font-freightNeoSemibold lg:text-[100px] leading-none pt-[28px]">
            Living Spaces
          </h1>
          <button
            className="mt-8 bg-[#815C46] text-white pr-1  pl-[18px] py-[3px] rounded-full flex items-center justify-center gap-[11px] text-base font-freightNeoMedium"
            onClick={() => console.log("Button clicked")}
          >
            Discover our Vision
            <CTAButtonIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
