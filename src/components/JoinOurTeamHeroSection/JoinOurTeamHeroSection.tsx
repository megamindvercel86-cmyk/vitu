import Image from "next/image";
import React from "react";
import Typography from "../Typography/Typography";

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
          <div className="lg:pt-[124px] lg:pl-[74px] md:pt-[94px] md:pl-[54px] xl:pt-[128px] xl:pl-[210px] px-auto">
            <Typography className="text-4xl md:text-5xl lg:text-[80px] font-freightNeoMedium font-bold text-white mb-6">
              Build Better with
              <br />
              Vitu Realty
            </Typography>
            <button className="sm:hidden hidden md:block bg-white rounded-[57px] font-FreightNeoProBold text-[#79583F] text-[22px] px-[26px] h-[50px]">
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
