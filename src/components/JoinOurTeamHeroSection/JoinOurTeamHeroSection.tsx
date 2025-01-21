import Image from "next/image";
import React from "react";
import Typography from "../Typography/Typography";

export default function JoinOurTeamHeroSection() {
  return (
    <div className="relative xl:h-[1085px] lg:">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          width={1920}
          height={1080}
          src="/images/backgroundImages/JoinOurTeamHeroSectionBackground.png"
          alt="Construction site planning"
          className="w-full h-full object-cover"
          quality={100} // Increase quality to 100
        />
      </div>

      {/* Content */}
      <div className="relative ">
        <div className="">
          <div className=" lg:pt-[124px] lg:pl-[74px] xl:pt-[128px] xl:pl-[210px]">
            <Typography className="text-4xl md:text-5xl lg:text-[80px] font-freightNeoMedium font-bold text-white mb-6">
              Build Better with
              <br />
              Vitu Realty
            </Typography>
            <button className="bg-white rounded-[57px] font-FreightNeoProBold text-[#79583F] text-[22px] px-[26px] h-[50px]">
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
