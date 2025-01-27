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
              'url("/images/backgroundImages/homePageBackgroundImageDesktop.png")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex xl:top-[343px] lg:top-[247px] sm:top-[157px] top-[157px] justify-center">
          <div className="text-center text-white flex flex-col items-center">
            <h1 className="sm:text-[40px] md:text-[80px] text-[40px] font-freightNeoSemibold lg:text-[100px] leading-none">
              Building Wholesome
            </h1>
            <h1 className="sm:text-[40px] md:text-[80px] text-[40px] font-freightNeoSemibold lg:text-[100px]  leading-none md:pt-[28px] pt-0">
              Living Spaces
            </h1>
          </div>
        </div>
      </div>
      <div className="pt-[64px] leading-[1] sm:pt-[64px] md:pt-[84px] lg:pt-[104px] xl:pt-[128px] pb-[60px] md:pb-[111px] xl:px-[386px]   sm:px-[30px] px-[30px] text-center">
        <div>
          <Typography
            variant="custom"
            className="font-freightNeoMedium font text-[#040707CC] pb-6  sm:text-[22px] md:text-[18px] text-[16px] px-7 md:px-0"
          >
            We create thoughtfully designed spaces that blend modern aesthetics
            with lasting quality.
          </Typography>
        </div>
        <div>
          <Typography
            variant="custom"
            className="lg:text-[56px] sm:text-[24px] md:text-[40px] text-[24px] font-freightNeoMedium text-customBrown px-7 md:px-0"
          >
            Where Modern Design Meets Enduring Quality
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
