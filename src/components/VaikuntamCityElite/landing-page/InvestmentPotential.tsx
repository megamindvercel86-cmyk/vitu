"use client";

import Image from "next/image";

export default function InvestmentPotential() {
  return (
    <section className=" bg-[#F3EAE1] -mt-4">
      <div className="container px-12 pt-16 lg:pt-0 lg:px-0 mx-auto lg:border-l lg:border-r border-[#1C1213]  ">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:px-12 pt-8 lg:pt-20 xl:pt-32 gap-4 lg:gap-10">
          <div className=" basis-[38%] ">
            <div className="max-w-md space-y-3 lg:space-y-4">
              <p className="text-[#DAA37A] lg:text-lg uppercase font-FreightNeoProNormal">
                Residential Luxury Villa Plots for Sale
              </p>
              <h2 className="text-[26px] lg:text-[36px] lg2:text-[43px] leading-[100%] text-[#37121A] font-FreightNeoProNormal">
                Position Yourself
                <br className="hidden lg:block" /> Where Value Rises
              </h2>
              <p className="text-[#37121A]/60 font-FreightNeoProNormal text-lg leading-[24px] text-justify text-pretty">
                Whether you wake up to the golden hues of sunrise or with the
                calm of a sunset, each plot at Vaikuntam City Elite offers a
                distinct experience shaped by light, landscape and luxury.
              </p>
              <p className="text-[#37121A]/60 font-FreightNeoProNormal text-lg leading-[24px] text-justify text-pretty">
                Choose from Sunrise Plots that bathe your home in morning
                serenity, Sunset Plots that glow with evening charm, or
                Signature Plots that command the most premium corners of the
                layout, ideal for long term appreciation.
              </p>
            </div>
          </div>
          <div className="basis-[62%] ">
            <Image
              src={"/images/vaikuntamCityEliteLandingPage/plot.webp"}
              alt="group image"
              width={812}
              height={655}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
