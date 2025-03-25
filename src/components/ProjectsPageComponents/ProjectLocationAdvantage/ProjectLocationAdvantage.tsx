import React from "react";
import beachBgImage from "../../../../public/images/backgroundImages/vaikuntamBACK.png";
import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";

const LocationAdvantage = () => {
  return (
    <div className="relative w-full  h-screen">
      <Image src={beachBgImage} alt="Background" className="absolute object-cover w-full h-full md:object-center object-[-720px]" />
      <div className="absolute bottom-[390px] sm:bottom-[330px] md:bottom-[500px] lg:bottom-[290px] lg2:bottom-[400px] left-4 sm:left-20 inset-0 flex flex-col justify-center items-start px-4 sm:px-12 text-[#4F6B94]">
        <h1 className="text-lg md:text-lg text-[#4F3737] font-medium text-center uppercase tracking-wide font-FreightNeoProNormal">
          Location Advantage
        </h1>
        <h1 className=" text-sm md:text-5xl text-[#4F3737] font-[400] max-w-xl font-FreightNeoProNormal leading-tight">Built for Life's Moments</h1>
        <p className="mt-1 inline-block md:text-lg text-sm text-[#4F373799] max-w-md font-FreightNeoProNormal font-[400]">
          Enjoy the soothing sounds of the waves & the convenience of a beachside retreat right at your doorstep.
        </p>

        <div className="relative group cursor-pointer ">
          <button
            type="button"
            className="
      relative group
      mt-4
      flex items-center justify-center
      gap-[0.6875rem]
      rounded-full
      pl-[10px] pr-[1rem] py-[0.1px] lg:py-[0.100rem]  /* Increased right padding */
      text-base font-freightNeoMedium text-white
      2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]  /* Adjusted for larger screens */
      overflow-hidden  z-100
    "
          >
            {/* Default background */}
            <div className="absolute inset-0 bg-[#AE856666] rounded-full"></div>

            {/* Hover effect starts from the icon */}
            <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
              {/* Expanding hover background */}
              <div
                className="
          absolute w-0 h-0 bg-[#AE856666] rounded-full
          group-hover:w-[30rem] group-hover:h-[30rem] 
          transition-all duration-500 ease-out
        "
              ></div>

              {/* Icon stays above the expanding background */}
              <div className="relative z-20">
                <CTAButtonIcon fill="#AE856666" direction="right" />{" "}
              </div>
            </div>

            {/* Button text (added margin-right for spacing) */}
            <span className="relative z-20 mt-[3px] md:mt-0 text-[#4F3737] ">More about the Location</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationAdvantage;
