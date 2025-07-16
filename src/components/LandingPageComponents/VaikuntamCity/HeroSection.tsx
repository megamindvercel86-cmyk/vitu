"use client";
//============ Component Imports =============
import Image from "next/image";

//============ Assets =============
import HeroImage from "../../../../public/images/backgroundImages/vaikuntamLandingPageBg.jpg";
import Link from "next/link";

export default function HeroSection(): React.ReactElement {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute h-screen w-full">
        <Image
          src={HeroImage}
          alt="Vaikuntam City Landing Page Hero Image"
          fill
          className="object-cover"
          placeholder="blur"
        />
      </div>
      <div className="relative container mx-auto">
        <div className="absolute inset-0 flex flex-col items-center lg2:top-[15rem] 2xl:top-[16rem] md:top-[30vh] top-[30vh]  text-white">
          {/* Main Title */}
          <h1
            className={`
            font-freightNeoSemibold
            leading-none
            text-[2.2rem] sm:text-[2rem] md:text-[3.75rem] 
            max-w-4xl
            text-center
          `}
          >
            Discover Luxurious Coastal Living at Vaikuntam City
          </h1>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#fcf9f8] p-4 lg:p-3 lg:pl-5 rounded-3xl lg:rounded-full flex flex-col lg:flex-row items-center justify-center gap-4">
        <p className="font-fsSiena leading-none text-pretty lg2:min-w-max lg2:text-2xl sm:text-xl text-base text-customBrown text-center">
          Experience the Benchmark in Fine Living at Vaikuntam City
        </p>
        <Link href="/project-enquire" aria-label="Go to Project Enquire Page">
          <button
            aria-label="Project Enquire Page"
            className="bg-[#AE8567] min-w-max rounded-[57px] font-FreightNeoProBold text-white text-base sm:text-[22px] px-[22px] sm:px-[26px] h-[40px] sm:h-[50px] 2xl:text-[32px] 2xl:h-[60px]"
          >
            Enquire Now
          </button>
        </Link>
      </div>
    </section>
  );
}
