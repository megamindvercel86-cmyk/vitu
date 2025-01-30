import Image from "next/image";
import React from "react";
import Typography from "@/components/Typography/Typography";

export default function JoinOurTeamHeroSection() {
  return (
    <div className="relative xl:h-[1085px] sm:h-[404px] lg:h-[891px] md:h-[660px] h-[404px] ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          width={1920}
          height={1080}
          src="/images/backgroundImages/JoinOurTeamHeroSectionBackground.png"
          alt="Construction site planning"
          className="hidden sm:block w-full h-full object-cover"
          quality={100} // Desktop image
        />
        <Image
          width={1080}
          height={1920}
          src="/images/backgroundImages/JoinOurTeamHeroSectionBackgroundMobile.png"
          alt="Construction site planning mobile"
          className="block sm:hidden w-full h-full object-cover"
          quality={100} // Mobile image
        />
      </div>

      {/* Content */}
      <div className="relative ">
        <div className="">
          <div className=" mx-auto sm:mx-[28px]  lg:pt-[124px] lg:pl-[74px] md:pt-[94px] md:pl-[54px] xl:pt-[128px] xl:pl-[210px] pt-[65px] px-auto">
            <Typography
              variant="custom"
              className="text-white text-[32px] md:text-[50px] xl:text-[60px] leading-[1.1] md:leading-[1.2] xl:leading-[67px] text-center   md:text-start font-freightNeoMedium mb-4 md:mb-6"
            >
              Build Better with
              <br />
              Vitu Realty
            </Typography>
            <button className="sm:hidden hidden md:block bg-white rounded-[57px] font-FreightNeoProBold text-[#79583F] text-[22px] px-[26px] h-[50px]">
              Enquire Now
            </button>
            <div className="mx-6 mt-44">
            <button className=" md:hidden w-full  block bg-[#AE8566] rounded-[57px] font-FreightNeoProBold text-white text-[22px]  h-[50px]">
              Download Now
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
