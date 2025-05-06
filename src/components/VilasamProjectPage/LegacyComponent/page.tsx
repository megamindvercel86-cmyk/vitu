import Image from "next/image";
import React from "react";
import darkLogo from "../../../../public/images/logos/logoDark.svg";
import projectPageBg from "../../../../public/images/vilasamPageImages/image.png";
import Link from "next/link";

const VilasamLegacyBuiltComponent = () => {
  return (
    <section className="flex items-center justify-center  xl:mt-0 py-32 mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[13.125rem]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full ">
        {/* Left Text Section */}
        <div className="mb-0 lg:mb-[260px] ">
          <h1 className="lg:text-[60px] leading-[1] text-3xl  font-freightNeoSemibold text-[#0C3E49]">
            Trust You <br /> Can Build On
          </h1>
          <p className="mt-4  lg:w-[330px]  text-[#4F373799] lg2:text-[24px] font-geistSerif">
            Every Vitu Realty property embodies our Client centric philosophy. Thoughtfully designed homes with abundant natural light, smart spaces,
            & premium amenities.
          </p>
          <Link href="/about" className="mt-4 font-[700] text-[24px]font-geistSerif inline-block  text-[#0C3E49] hover:underline">
            Discover Our Story →
          </Link>
        </div>

        {/* Center Image */}
        <div className="flex justify-center h-[50vh] sm:h-[60vh] md:h-[40vh] lg:h-[86vh] object-fill">
          <Image src={projectPageBg} alt="Green Leaves" width={350} height={450} className="rounded-xl shadow-lg object-cover" />
        </div>

        {/* Right Recognition Section */}
        <div className="text-gray-700 text-center lg:mt-64 md:text-left">
          <p className="text-sm lg:text-[24px]font-geistSerif">Recognized by</p>
          <div className="flex justify-center  md:justify-start mt-5">
            <Image src={darkLogo} alt="ET Achievers" width={111} height={203} />
          </div>
          <p className="mt-8 lg:text-[24px] leading-[1.2]  text-[#0C3E49] text-justify text-smfont-geistSerif">
            Founded in <span className="font-CandideCondensedNormal">1965</span>, our team brings years of cross-industry expertise on average,
            delivering exceptional skill & knowledge in every field.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VilasamLegacyBuiltComponent;
