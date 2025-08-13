"use client";

import Image from "next/image";
import AnimatedHeading from "./AnimatedHeading";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NumberCounter from "@/components/VaikuntamCityElite/landing-page/NumberCounter";
import NumberCounter2 from "./NumberCounter2";
import { motion } from "framer-motion";
import { scrollToId } from "@/lib/scrollTo";
export default function OurElevatedVision2({
  title,
  description,
  imageSection1,
  imageSection2,
  numberCounterData,
}: {
  title?: string;
  description?: string;
  imageSection1?: {
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    superscript?: string;
    heading?: string;
    text?: string;
  };
  imageSection2?: {
    image: {
      src: string | StaticImport;
      alt: string;
      width: number;
      height: number;
    };
    superscript?: string;
    heading?: string;
    text?: string;
  };

  numberCounterData: {
    description: string;
    title: string;
  }[];
}) {
  return (
    <section className=" bg-[#F3EAE1] relative z-[80]">
      <div className="container px-12 lg:px-0 mx-auto lg:border-l lg:border-r border-[#1C1213] py-20 lg:py-28 ">
        <div className="flex gap-y-4 flex-col lg:flex-row justify-between lg:border-b border-[#1C1213] pb-8 lg:pb-[55px] lg:px-12 gap-x-2">
          <AnimatedHeading className="text-[#37121A] text-[32px] lg:text-[42px] lg2:text-[48px] lg:max-w-md font-FreightNeoProNormal leading-[100%] flex-1 xl:max-w-sm">
            {title}
          </AnimatedHeading>

          <p className="text-[#37121A]/60 font-FreightNeoProNormal text-lg leading-[24px] max-w-lg text-justify text-pretty flex-1">{description}</p>
        </div>
        <div className="flex flex-col-reverse gap-y-3 lg:flex-row items-stretch justify-between">
          <div className="space-y-2 lg:space-y-4 basis-[38%] lg:px-12 my-auto lg:py-8 lg2:py-0">
            <p className="text-[#DAA37A] lg:text-lg uppercase font-FreightNeoProNormal">{imageSection1?.superscript}</p>
            <h2 className="text-[26px] lg:text-[36px] lg2:text-[43px] leading-[100%] text-[#37121A] font-FreightNeoProNormal text-pretty">
              {imageSection1?.heading?.split(/(\d+)/).map((part, index) =>
                /\d/.test(part) ? (
                  <span key={index} className="font-CandideCondensedNormal">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </h2>

            <p className="text-[#37121A]/60 font-FreightNeoProNormal lg2:text-lg lg2:leading-[24px] text-justify text-pretty">
              {imageSection1?.text}
            </p>
          </div>
          <div className="basis-[62%] h-auto">
            <Image
              src={imageSection1?.image.src || ""}
              alt="group image"
              width={imageSection1?.image.width || 1000}
              height={imageSection1?.image.height || 730}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="pt-20">
          <NumberCounter2 data={numberCounterData} noBorder={true} />
        </div>
        <div className="flex flex-col gap-y-3 lg:flex-row items-center justify-between lg:px-12 pt-20 lg:pt-20 xl:pt-32 gap-8 lg2:gap-12">
          <div className="basis-[62%] ">
            <Image
              src={imageSection2?.image.src || ""}
              alt="group image"
              width={imageSection2?.image.width || 812}
              height={imageSection2?.image.height || 655}
            />
          </div>
          <div className=" basis-[38%] ">
            <div className="max-w-md space-y-3 lg:space-y-4">
              <p className="text-[#DAA37A] lg:text-lg uppercase font-FreightNeoProNormal">{imageSection2?.superscript || ""}</p>
              <h2 className="text-[26px] lg:text-[36px] lg2:text-[43px] leading-[100%] text-[#37121A] font-FreightNeoProNormal">
                {imageSection2?.heading || ""}
              </h2>
              <p className="text-[#37121A]/60 font-FreightNeoProNormal text-lg leading-[24px] text-justify text-pretty">
                {imageSection2?.text || ""}
              </p>
               <div className="">
           <motion.button
             onClick={() => {
                         scrollToId("enquiry");
                       }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="bg-[#37121A] mt-4 lg:mt-16 xl:mt-20  px-4 py-2 text-[#F3EAE1] font-freightNeoMedium uppercase lg:text-xl flex items-start justify-center"
                      >
                        Download e-brochure
                        <Image
                          src={"/svgs/arrowUpRight.svg"}
                          alt="Download Icon"
                          width={15}
                          height={15}
                          className="inline-block ml-2 mt-1"
                        />
                      </motion.button>
                      </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
