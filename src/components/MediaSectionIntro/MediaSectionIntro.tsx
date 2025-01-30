import React from "react";
import Typography from "../Typography/Typography";
import { Download } from "../Icons/Icons";
import Image from "next/image";

function MediaSectionIntro() {
  return (
    <>
      <div className="hidden md:block relative mx-4 md:mx-[40px] lg:mx-[133px] xl:mx-[210px] 
        mt-16 md:mt-[137px] xl:mt-[200px] 
        mb-[168px] xl:mb-[223px]">
        {/* Image overlay */}
        <Image
          src={"/images/mediakit.png"}
          className="absolute right-0 lg:right-[101px] rounded-[24px] z-10
            w-[280px] md:w-[300px] lg:w-[480px] xl:max-w-[584px]
            h-[450px] md:h-[550px] lg:h-[724px] xl:h-[724px]
            top-[-40px] md:top-[-60px] lg:top-[-99px]"
          alt="new"
          width={584}
          height={724}
        />
        {/* Background div */}
        <div className="relative w-full bg-[#AE8566] rounded-[24px] z-0
          h-[400px] md:h-[450px] lg:h-[500px] xl:h-[526px]
          px-6 md:px-[67px] xl:px-[105px]
          py-8 md:py-[40px] lg:py-[106px]">
          <div className="w-full md:w-[439px] xl:w-[667px]">
            <Typography
              variant="custom"
              className="text-[32px] md:text-[45px] lg:max-w-[100%] lg:text-[60px] font-freightNeoMedium text-white leading-tight"
            >
              Need our logo or a quick intro to who we are?
            </Typography>
            <Typography
              variant="custom"
              className="text-lg md:text-xl lg:text-2xl font-freightNeoMedium text-white mt-4"
            >
              Grab our brand assets & get to know us <br /> in just a few clicks!
            </Typography>
            <button className="flex items-center justify-center gap-4 
              w-full md:w-[272px] h-[58px] 
              text-xl md:text-2xl font-freightNeoMedium text-white 
              rounded-[34px] border-white border-[2px] mt-[49px]">
              <Download />
              <span className="pt-1">Download Now</span>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden block mt-6">
        <div className="max-w-md w-full">
          {/* Card Container */}
          <div className="bg-white overflow-hidden">
            {/* Image Section */}
            <div className="relative h-[440px]">
              <Image
                src={"/images/mediakit.png"}
                className=""
                alt="new"
                width={584}
                height={385}
              />
            </div>
          </div>
          <div className="h-[304px] bg-[#AE8566] ">
            <Typography
              variant="custom"
              className="text-[32px] px-7 pt-[42px] leading-[1] pb-[10px]  text-center font-freightNeoMedium text-white"
            >
              Need our logo or a quick intro to who we are?
            </Typography>
            <Typography
              variant="custom"
              className="text-[14px] text-center px-7 leading-[1]font-freightNeoMedium text-white"
            >
              Grab our brand assets & get to know us <br /> in just a few
              clicks!
            </Typography>
            <div className="px-7 w-full">
              <button className="flex items-center justify-center gap-4 w-full h-[58px] text-2xl font-freightNeoMedium text-white rounded-[34px] border-white border-[2px] mt-[49px]">
                <Download />
                <span className="pt-1">Download Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MediaSectionIntro;
