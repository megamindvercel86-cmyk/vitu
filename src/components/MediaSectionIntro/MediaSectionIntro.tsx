import React from "react";
import Typography from "../Typography/Typography";
import { Download } from "../Icons/Icons";
import Image from "next/image";

function MediaSectionIntro() {
  return (
    <div className="relative xl:mx-[210px] xl:mt-[200px] xl:mb-[223px]">
      {/* Image overlay */}
      <Image
        src={"/images/mediakit.png"}
        className="absolute top-[-99px] h-[724px] w-[584px] right-[101px] rounded-[24px] z-10 "
        alt="new"
        width={584}
        height={724}
      />
      {/* Background div */}
      <div className="relative w-full xl:h-[526px] bg-[#AE8566] rounded-[24px] xl:py-[106px] xl:px-[105px] leading-[1] z-0">
        <div className="xl:w-[667px] lg:w-[439px]">
          <Typography
            variant="custom"
            className="text-[60px] font-freightNeoMedium text-white"
          >
            Need our logo or a quick intro to who we are?
          </Typography>
          <Typography
            variant="custom"
            className="text-2xl font-freightNeoMedium text-white"
          >
            Grab our brand assets & get to know us <br /> in just a few clicks!
          </Typography>
          <button className="flex items-center justify-center gap-4 w-[272px] h-[58px] text-2xl font-freightNeoMedium text-white rounded-[34px] border-white border-[2px] mt-[49px]">
            <Download />
            <span className="pt-1">Download Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MediaSectionIntro;
