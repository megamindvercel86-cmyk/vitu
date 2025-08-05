"use client";

import Image from "next/image";

export default function TheClub() {
  return (
    <section className="bg-[#F3EAE1] relative xl:h-[80rem] md:h-[50rem] lg:h-[60rem] lg2:h-[70rem] 2xl:h-[150vh]">
      <div className="container  mx-auto lg:border-l lg:border-r border-[#1C1213] pt-20 lg:pt-24 xl:pt-44 lg:pb-60 relative z-50">
        <div className="space-y-3 lg:space-y-4 basis-[38%] px-12 max-w-[38rem]">
          <p className="text-[#DAA37A] lg:text-lg uppercase font-FreightNeoProNormal">
            the club
          </p>
          <h2 className="text-[26px] lg:text-[36px] lg2:text-[43px] leading-[100%] text-[#37121A] font-FreightNeoProNormal">
            The Epicentre of Leisure
          </h2>
          <p className="text-[#37121A]/60 font-FreightNeoProNormal text-lg leading-[24px] text-justify text-pretty">
            More than just a clubhouse, this is your gateway to a world of
            elevated experiences. From wellness spaces to intimate lounges and
            thoughtfully curated gatherings, every corner of The Club reflects a
            life well-lived. Membership is reserved for those who appreciate
            detail, privacy and the quiet confidence of belonging.
          </p>
        </div>
        <div className="md:hidden overflow-hidden">
          <Image
            src={"/images/vaikuntamCityEliteLandingPage/club2.webp"}
            alt="The Club"
            width={1728}
            height={1788}
            
            className="w-full h-full object-cover object-center md:hidden"
          />
        </div>
      </div>
      <div className="container mx-auto lg:border-l lg:border-r border-[#37121A] h-[25vh] w-full relative z-20 hidden md:block"></div>
      <div className="container mx-auto lg:border-l lg:border-r border-[#C7784D] h-full w-full relative z-20 hidden md:block"></div>
      <div className="absolute bottom-0 left-0 right-0 md:block hidden z-0">
        <Image
          src={"/images/vaikuntamCityEliteLandingPage/club.webp"}
          alt="The Club"
          width={1728}
          height={1788}
          className="w-full h-full object-cover md:block hidden"
        />
      </div>
    </section>
  );
}
