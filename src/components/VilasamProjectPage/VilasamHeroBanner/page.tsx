"use client";

import Image from "next/image";
import img from "../../../../public/images/vilasamPageImages/bannerImages/image.png";

const VilasamHeroSection = () => {
  return (
    <section className="relative w-full h-[100vh] md:h-[120vh] lg2:h-[200vh] xl:h-[150vh]  flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Swiper with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src={img} alt={`Background`} className="object-cover w-full h-full" priority />
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-black/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] md:h-[100px] bg-gradient-to-t from-white via-white/85 via-50% to-transparent z-[10] md:hidden" />
        {/* <div className="absolute bottom-0 left-0 right-0 h-[00px] md:h-[100px] bg-gradient-to-t from-white via-transparent to-transparent z-[10] hidden md:block" /> */}

        <div className="absolute bottom-0 left-0 right-0 h-2/4 lg:h-[200px] bg-gradient-to-b from-transparent to-white opacity-2000"></div>
      </div>
      <div
        className={`absolute flex bottom-44  items-center justify-center sm:justify-between gap-3 px-8 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md animate-fadeIn`}
      >
        <div className="font-medium text-[#0C3E49] text-sm lg2:text-[32px] font-sourceSans3">Bookings Open Soon</div>
        <button
          // onClick={onCtaClick}
          className="px-6 md:px-10 py-2 text-sm lg2:text-[32px] lg:py-5 bg-[#0C3E49] font-sourceSans3 text-white rounded-full transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
        >
          Show your Interest
        </button>
      </div>
      {/* Main Content */}
      <div className="absolute top-28 md:top-60  mx-auto text-white px-4 z-10">
        <h1 className="text-2xl  md:text-[100px] leading-none font-geistSerif text-[#F5F5F7]">
          Homes that <br />
          Breathe with you
        </h1>
        <p className="t md:text-2xl font-medium mt-5 font-sourceSans3">Unwind Across 169 Cents of Coastal Charm, Made Affordable</p>
      </div>
    </section>
  );
};

export default VilasamHeroSection;
