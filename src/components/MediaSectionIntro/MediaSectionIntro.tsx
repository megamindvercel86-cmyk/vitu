import React from "react";
import Typography from "../Typography/Typography";
import { Download } from "../Icons/Icons";
import Image from "next/image";

function MediaSectionIntro() {
  return (
    <>
      <div
        className="hidden lg:block relative mx-4 md:mx-[40px] lg2:mx-[133px] lg:mx-[70px] xl:mx-[210px] 
        mt-16 md:mt-[137px] xl:mt-[200px] 
        mb-[168px] xl:mb-[223px]"
      >
        {/* Image overlay */}

        <Image
          src={"/images/mediakit.png"}
          className="absolute right-0 lg:right-[101px] rounded-[24px] z-10
            w-[280px] md:w-[300px] lg2:w-[480px] lg:w-[400px] xl:w-[584px]
            h-[450px] md:h-[550px] lg2:h-[724px] lg:h-[624px] xl:h-[724px]
            top-[-40px] md:top-[-60px] lg:top-[-99px]"
          alt="new"
          width={584}
          height={724}
        />
        {/* Background div */}
        <div
          className="relative w-full bg-[#AE8566] rounded-[24px] z-0
          h
        xl:px-[105px] md:px-16
          py-8 md:py-[40px] lg2:py-[106px] lg:py-[60px]"
        >
          <div className="w-[50%]">
            <Typography
              variant="custom"
              className="text-[32px] md:text-[45px] lg:max-w-[70%] lg2:max-w-[85%] lg2:text-[60px]  lg:[40px] font-freightNeoMedium text-white leading-[1]"
            >
              Need our logo or a quick intro to who we are?
            </Typography>
            <Typography
              variant="custom"
              className="text-lg md:text-xl lg2:text-2xl lg:max-w-[80%] lg:text-xl font-freightNeoMedium text-white mt-4"
            >
              Grab our brand assets & get to know us <br /> in just a few
              clicks!
            </Typography>
            <button
              className="flex items-center justify-center gap-4 
              w-full md:w-[272px] h-[58px] 
              text-xl md:text-2xl font-freightNeoMedium text-white 
              rounded-[34px] border-white border-[2px] mt-[49px]"
            >
              <Download />
              <span className="pt-1">Download Now</span>
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden block mt-6">
        <div className=" w-full">
          {/* Card Container */}
          <div className="bg-white overflow-hidden">
            {/* Image Section */}
            <div className="relative h-[440px] md:h-[800px] ">
              <Image
                src={"/images/mediakit.png"}
                className="w-full"
                alt="new"
                width={584}
                height={385}
              />
            </div>
          </div>
          <div className="h-[330px]   md:h-auto bg-[#AE8566] ">
            <Typography
              variant="custom"
              className="text-[32px] md:text-5xl px-7 pt-[42px] leading-[1] pb-[10px]  text-center font-freightNeoMedium text-white"
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
            <div className="px-7 md:pb-16 pb-0 w-full">
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
