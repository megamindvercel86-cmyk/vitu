import React from "react";
import beachBgImage from "../../../../public/images/backgroundImages/projectPageBg-2.png";
import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";

const LocationAdvantage = () => {
  return (
    <div className="relative w-full  h-screen">
      
      <Image
        src={beachBgImage}
        alt="Background"
        className="absolute object-cover w-full h-full"
      />
      <div className="absolute bottom-[390px] sm:bottom-[330px] md:bottom-[500px] lg:bottom-[290px] lg2:bottom-[400px] left-4 sm:left-20 inset-0 flex flex-col justify-center items-start px-4 sm:px-12 text-[#4F6B94]">
        <h4 className="text-lg md:text-lg text-[#4F6B94] font-medium text-center uppercase tracking-wide font-FreightNeoProNormal">
          Location Advantage
        </h4>
        <h1 className=" text-sm md:text-5xl text-[#4F6B94] font-[400] max-w-xl font-FreightNeoProNormal leading-tight">
          Built for Life’s Moments
        </h1>
        <p className="mt-1 inline-block md:text-lg text-sm text-[#4F6B9499] max-w-md font-FreightNeoProNormal font-[400]">
          Enjoy the soothing sounds of the waves & the convenience of a
          beachside retreat right at your doorstep.
        </p>

        {/* <div className="relative group cursor-pointer mt-4 mb-11">
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
           
          </button>
        </div> */}

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
      overflow-hidden
    "
  >
    {/* Default background */}
    <div className="absolute inset-0 bg-[#A0BCAE] rounded-full"></div>

    {/* Hover effect starts from the icon */}
    <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
      {/* Expanding hover background */}
      <div
        className="
          absolute w-0 h-0 bg-[#4B9480] rounded-full
          group-hover:w-[30rem] group-hover:h-[30rem]
          transition-all duration-500 ease-out
        "
      ></div>

      {/* Icon stays above the expanding background */}
      <div className="relative z-20">
      <CTAButtonIcon fill="#4B9480" direction="right" />      </div>
    </div>

    {/* Button text (added margin-right for spacing) */}
    <span className="relative z-20 ">More about the Location</span>
  </button>
</div>


        
      </div>
    </div>
  );
};

export default LocationAdvantage;
