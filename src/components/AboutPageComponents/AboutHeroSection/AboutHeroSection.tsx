import CTAButtonIcon from "@/components/Icons/Icons";
import React from "react";


const AboutHeroSection = () => {
  return (
    <div className="relative h-[35.5rem] sm:h-[35.5rem] lg:h-[64.125rem] xl:h-[67.5rem] 2xl:h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            'url("/images/backgroundImages/aboutPageBackgroundImageDesktop.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="top-[9.8125rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[34.375rem] relative flex justify-center h-full">
        <div className="flex flex-col items-center text-center text-white">
          <h1 className=" sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] lg2:text-[6.25rem] 2xl:text-[9.375rem] font-freightNeoSemibold leading-none">
            Building Wholesome
          </h1>
          <h1 className=" sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] lg2:text-[6.25rem] 2xl:text-[9.375rem] font-freightNeoSemibold  leading-none md:pt-[28px] pt-0">
            Living Spaces
          </h1>
          <button
            className="mt-8 2xl:pt-4 2xl   2xl:pb-4 2xl:pr-4 bg-[#815C46] text-white pr-1  pl-[18px] py-[3px] rounded-full flex items-center justify-center gap-[11px] 2xl:text-[2rem] text-base font-freightNeoMedium"
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
