import Image from "next/image";
import React from "react";
import darkLogo from "../../../../public/images/logos/logoGreen.svg";
import projectPageBg from "../../../../public/images/vilasamPageImages/image.png";
import Link from "next/link";

const VilasamLegacyBuiltComponent = () => {
  return (
    <section className="flex items-center justify-center overflow-hidden  xl:mt-0 mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full ">
        {/* Left Text Section */}
        <div className="mb-0  h-full">
          <h1 className="font-geistSerif text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] pb-10 lg2:pb-0">
            Trust You <br /> Can Build On
          </h1>
          <p className=" lg2:mt-4   lg:w-[300px] lg2:w-[500px] lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3">
            Every Vitu Realty property embodies our Client centric philosophy. Thoughtfully designed homes with abundant natural light, smart spaces,
            & premium amenities.
          </p>
          <Link href="/about" className="mt-4 font-[700] text-[20px] font-sourceSans3 inline-block  text-[#0C3E49] hover:underline">
            Discover Our Story →
          </Link>
        </div>

        {/* Center Image */}
        <div className="flex justify-center h-[50vh] sm:h-[60vh] md:h-full object-fill">
          <Image src={projectPageBg} alt="Green Leaves" width={350} height={450} className="rounded-xl shadow-lg object-cover" />
        </div>

        {/* Right Recognition Section */}
        <div className="text-[#0C3E49] text-center h-full flex flex-col justify-end  md:text-left">
          <p className="text-sm lg:text-[24px] font-sourceSans3">Recognized by</p>
          <div className="flex justify-center  md:justify-start mt-5">
            <Image src={darkLogo} alt="ET Achievers" width={150} height={203} />
          </div>
         
          <p className="mt-4   lg:w-[330px] lg2:w-[500px] lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3">
          Founded in 1956, our team brings years of cross-industry expertise on average, delivering exceptional skill & knowledge in every field.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VilasamLegacyBuiltComponent;
