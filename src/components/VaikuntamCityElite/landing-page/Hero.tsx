"use client";

import Image from "next/image";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { scrollToId } from "@/lib/scrollTo";
export default function Hero({
  herobg,
  herobgMobile,
  title,
  leftAlign = false,
  objectPosition = ""
}: {
  herobg: StaticImport;
  herobgMobile: StaticImport;
  title: {
    title1: string;
    title2: string;
  };
  leftAlign?: boolean;
  objectPosition?: string;

}) {
  return (
    <section className="relative w-full h-screen ">
      <Image
        src={herobg}
        placeholder="blur"
        unoptimized
        fill
        alt="Vaikuntam city elite background"
        className={`object-cover hidden md:block ${objectPosition}`}
      />
      <Image
        src={herobgMobile}
        placeholder="blur"
        unoptimized
        fill
        alt="Vaikuntam city elite background"
        className={`object-cover md:hidden ${objectPosition}`}
      />
      <div className="container lg:border-l lg:border-r border-[#E0D9C7] mx-auto h-full relative ">
        <div
          className={`absolute ${leftAlign ? "top-[20%] pl sm:top-[20%] left-1/2 text-center lg:text-left -translate-x-1/2 lg:translate-x-0 lg:left-12 lg:top-1/2 lg:-translate-y-1/2" : "left-1/2 text-center -translate-x-1/2 top-[20%] sm:top-[20%] lg:top-[20%]"} transform  `}
        >
          <div className="pl-0 md:pl-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="text-[36px] lg:text-[46px] lg2:text-[54px]  xl:text-[60px] font-FreightNeoProNormal min-w-80 md:min-w-max leading-[100%] text-white"
          >
            {title.title1}
            <br className="hidden md:block" /> {title.title2}
          </motion.h1>
          <button
            onClick={() => {
              scrollToId("enquiry");
            }}
            className={`group mt-4 lg:mt-8 font-freightNeoMedium uppercase flex items-center justify-center gap-2 ${
              leftAlign ? "mx-auto lg:mx-0" : "mx-auto"
            } px-6 py-3 border-white border hover:bg-white transition-colors ease-in-out duration-300 hover:text-customCongoBrown text-white lg:text-xl`}
          >
            Request Details{" "}
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-300 stroke-current"
            >
              <path d="M1.30431 6.79181L8.99966 14.4108L16.696 6.79181" strokeWidth="1.5" strokeMiterlimit="10" />
              <path d="M8.99927 14.4114L8.99927 0.165161" strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
          </button></div>
        </div>
      </div>
    </section>
  );
}