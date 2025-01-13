import React from "react";
import SubHeading from "../Common/SubHeding";
import Heading from "../Common/Heading";
import Button from "../Common/Button";

const AboutHeroSection = () => {
  return (
    <div className="relative xl:h-[1080px] lg:h-[1026px] sm:h-[568px] h-[568px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/images/backgroundImages/aboutPageBackgroundImage.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-24">
        <div className="w-full">

        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
