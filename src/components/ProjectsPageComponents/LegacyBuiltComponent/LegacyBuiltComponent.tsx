import Image from "next/image";
import React from "react";
import darkLogo from "../../../../public/images/logos/logoDark.svg";
import projectPageBg from "../../../../public/images/backgroundImages/projectPagebg-3.png";
import Link from "next/link";

const LegacyBuiltComponent = () => {
  return (
    <section className="flex items-center justify-center mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full ">
        {/* Left Text Section */}
        <div className="mb-0 lg:mb-[260px] ">
          <h1 className="lg:text-[60px] leading-[1] text-3xl font-freightNeoMedium  text-[#4F3737]">A Legacy Built on Trust</h1>
          <p className="mt-4  lg:w-[330px]  text-[#4F373799] lg2:text-[24px]  font-FreightNeoProNormal">
            Every VITU Realty property embodies our Client centric philosophy. Thoughtfully designed homes with abundant natural light, smart spaces,
            & premium amenities.
          </p>
          <Link
            aria-label="Go to about page"
            href="/about"
            className="mt-4 font-[700] text-[24px] font-FreightNeoProNormal inline-block  text-[#4F3737] hover:underline"
          >
            Discover Our Story →
          </Link>
        </div>

        {/* Center Image */}
        <div className="flex justify-center h-[50vh] sm:h-[60vh] md:h-[40vh] lg:h-[86vh] object-fill">
          <Image src={projectPageBg} alt="Green Leaves" width={350} height={450} className="rounded-xl shadow-lg object-cover" />
        </div>

        {/* Right Recognition Section */}
        <div className="text-gray-700 text-center lg:mt-64 md:text-left">
          <p className="lg:text-[24px] font-FreightNeoProNormal">Recognized by</p>
          <div className="flex justify-center  md:justify-start mt-5">
            <Image src={darkLogo} alt="ET Achievers" width={111} height={203} />
          </div>
          <p className="mt-8 lg:text-[24px] leading-[1.2]  text-[#4F3737]  font-freightNeoMedium">
            Founded in <span className="font-CandideCondensedNormal">1965</span>, our team brings years of cross-industry expertise on average, delivering exceptional skill & knowledge in every field.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegacyBuiltComponent;
