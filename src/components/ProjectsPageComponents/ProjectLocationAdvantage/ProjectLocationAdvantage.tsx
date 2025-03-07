import React from "react";
import beachBgImage from "../../../../public/images/backgroundImages/projectPageBg-2.png";
import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";

const LocationAdvantage = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={beachBgImage}
        alt="Background"
        className="absolute object-cover w-full h-full"
      />
      <div className="absolute bottom-[400px] left-4 sm:left-20 inset-0 flex flex-col justify-center items-start px-4 sm:px-12 text-[#4F6B94]">
        <h4 className="text-lg text-[#4F6B94] font-medium text-center uppercase tracking-wide font-FreightNeoProNormal">
          Location Advantage
        </h4>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#4F6B94] font-[400] max-w-xl font-FreightNeoProNormal leading-tight">
          Built for Life’s Moments
        </h1>
        <p className="mt-1 inline-block text-lg sm:text-xl text-[#4F6B9499] max-w-md font-FreightNeoProNormal font-[400]">
          Enjoy the soothing sounds of the waves & the convenience of a
          beachside retreat right at your doorstep.
        </p>

        <div className="relative group cursor-pointer mt-4">
          <button
            type="button"
            className={`
          relative group
          flex items-center justify-center
          gap-2 sm:gap-[0.6875rem]
          rounded-full
          pl-4 sm:pl-[1.125rem] pr-1 sm:pr-[0.0625rem] py-1 sm:py-[0.1875rem]
          text-base sm:text-lg font-freightNeoMedium text-white
          overflow-hidden
        `}
          >
            <div className="absolute inset-0 bg-[#A0BCAE] rounded-full"></div>
            <span className="relative z-10">More about the Location</span>
            <div className="absolute inset-0 bg-[#4B9480] rounded-full transform scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"></div>
            <CTAButtonIcon fill="#4B9480" direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationAdvantage;
