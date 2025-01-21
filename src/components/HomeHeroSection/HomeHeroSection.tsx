import React from "react";

const HomeHeroSection = () => {
  return (
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
  );
};

export default HomeHeroSection;
