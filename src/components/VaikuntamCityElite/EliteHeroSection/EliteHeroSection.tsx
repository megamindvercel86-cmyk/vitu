"use client";

import React from "react";
import image from "../../../../public/images/backgroundImages/vaikuntamCityElite.png";
import Image from "next/image";
import { Link } from "react-scroll";
const EliteHeroSection = () => {
  return (
    <div >
      {/* Background Image */}
      <Image src={image} alt="background" width={1000} height={1000} className='object-cover w-[100vw] h-[100vh]'/>
      {/* Overlay Text + Button */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
      <h1 className="font-FreightNeoProNormal leading-tight font-normal  pb-6 text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[5.25rem] 2xl:text-[6rem]">
          Designed for Your <br /> Inspired Living
        </h1>
        <Link
          to="apply-form"
          smooth={true}
          duration={700}
          offset={-80} // Adjust if there's a sticky header
        >


        <button className="bg-white text-black text-sm sm:text-base px-6 py-3 rounded-sm font-semibold shadow-md hover:bg-gray-100 transition">
          REQUEST DETAILS <span className="inline-block ml-1">↓</span>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default EliteHeroSection;
