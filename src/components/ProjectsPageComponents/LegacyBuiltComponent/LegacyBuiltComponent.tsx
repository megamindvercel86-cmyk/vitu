import Image from "next/image";
import React from "react";
import darkLogo from "../../../../public/images/logos/logoDark.svg";
import projectPageBg from "../../../../public/images/backgroundImages/projectPagebg-3.png";
import Link from "next/link";

const LegacyBuiltComponent = () => {
  return (
    <section className="flex items-center justify-center  xl:mt-0 py-32 mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[13.125rem]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full ">
        {/* Left Text Section */}
        <div className="mb-0 lg:mb-[260px] ">
          <h1 className="lg:text-6xl text-3xl font-semibold font-FreightNeoProNormal text-[#4F3737]">
            A Legacy Built on Trust
          </h1>
          <p className="mt-4  lg:w-[240px]  text-[#4F373799] font-[400] font-FreightNeoProNormal">
            Every Vitu Realty property embodies our Client centric philosophy.
            Thoughtfully designed homes with abundant natural light, smart
            spaces, & premium amenities.
          </p>
          <Link
            href="#"
            className="mt-4 font-[700] font-FreightNeoProNormal inline-block  text-[#4F3737] hover:underline"
          >
            Discover Our Story →
          </Link>
        </div>

        {/* Center Image */}
        <div className="flex justify-center h-[50vh] sm:h-[60vh] md:h-[40vh] lg:h-[70vh] object-fill">
          <Image
            src={projectPageBg}
            alt="Green Leaves"
            width={300}
            height={500}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Right Recognition Section */}
        <div className="text-gray-700 text-center lg:mt-64 md:text-left">
          <p className="text-sm text-[24px]">Recognized by</p>
          <div className="flex justify-center  md:justify-start mt-5">
            <Image src={darkLogo} alt="ET Achievers" width={111} height={203} />
          </div>
          <p className="mt-8 text-[24px]  text-[#4F3737] text-justify text-sm font-FreightNeoProNormal">
            Founded in <span className="font-CandideCondensedNormal">1965</span>, our team brings years of cross-industry expertise
            on average, delivering exceptional skill & knowledge in every field.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegacyBuiltComponent;
