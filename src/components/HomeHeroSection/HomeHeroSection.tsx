import React from "react";
import Typography from "../Typography/Typography";

const HomeHeroSection: React.FC = () => {
  return (
    <div>
      <div className="relative xl:h-[1080px] lg:h-[1026px] sm:h-[568px] h-[568px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("/images/backgroundImages/HomePageBackgroundImageDesktop.png")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex xl:top-[343px] justify-center">
          <div className="text-center text-white flex flex-col items-center">
            <h1 className="font-freightNeoSemibold lg:text-[100px] leading-none">
              Building Wholesome
            </h1>
            <h1 className="font-freightNeoSemibold lg:text-[100px] leading-none pt-[28px]">
              Living Spaces
            </h1>
          </div>
        </div>
      </div>
      <div className="pt-[128px] pb-[111px] px-[386px] text-center">
        <div>
          <Typography
            variant="h3"
            fontWeight="font-medium"
            className="font-freightNeoMedium font text-[#040707CC] pb-6 text-2xl"
          >
            We create thoughtfully designed spaces that blend modern aesthetics
            with lasting quality.
          </Typography>
        </div>
        <div>
          <Typography   variant="custom" className="text-[56px] font-freightNeoMedium text-customBrown">
            Where Modern Design Meets Enduring Quality
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
