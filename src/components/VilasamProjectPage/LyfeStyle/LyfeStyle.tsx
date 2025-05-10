import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";
import React from "react";

const LyfeStyle = () => {
  return (
    <section className="grid grid-cols-1 gap-8 items-center !px-0  lg:flex-row ">
      <div className="relative">
        <div className=" lg:absolute px-[1rem] sm:px-[1rem] md:px-[4.125rem] lg:px-[3.5rem] xl:px-[9rem] lg:top-16 flex lg:flex-row flex-col  items-start w-full  md:pb-16  lg:gap-14  ">
          <div className="lg:w-1/2">
            <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] font-medium font-geistSerif">Where Leisure Meets Lifestyle</h2>
            <div className="relative group cursor-pointer">
              <button
                type="button"
                className="
                  relative group
                  mt-4
                   items-center justify-center
                  gap-[0.6875rem]
                  rounded-full
                  pl-[10px] pr-[1rem] py-[0.1px] lg:py-[0.100rem]
                  text-base font-freightNeoMedium text-white
                  2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                  overflow-hidden z-100 hidden md:flex
                "
              >
                <div className={`absolute inset-0 bg-[#e0f2ec] rounded-full`}></div>
                <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
                  <div
                    className={`
                      absolute w-0 h-0 rounded-full
                      group-hover:w-[47rem] group-hover:h-[30rem]
                      transition-all duration-500 ease-out
                    `}
                  ></div>
                  <div className="relative z-20">
                    <CTAButtonIcon fill="#0C3E49" direction="right" />
                  </div>
                </div>
                <span className={`relative z-20 text-[#0C3E49] text-[13px] mt-[3px] md:mt-0`}>More about our sustainability centric approach</span>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-end">
            <p className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3 ">
              Experience leisure and lifestyle come together at The Club. As part of your Vilasam journey, enjoy exclusive membership to the Vaikuntam
              City Clubhouse, an elegant space designed for relaxation, connection, and recreation.
            </p>
          </div>
        </div>

        {/* Image container with gradient */}
        <div className="relative">
          <Image src="/images/vilasamPageImages/image3.webp" alt="vilasam" height={1000} width={1000} className="w-full  object-cover " />
          <div className="absolute bottom-0 left-0 w-full h-[30px] lg:h-[170px] xl:h-[200px] bg-gradient-to-t from-[#FAFFFD]  to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[50px] lg:h-[170px] xl:h-[200px] bg-gradient-to-t from-[#FAFFFD]  to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[50px] lg:h-[170px] xl:h-[400px] bg-gradient-to-t from-[#FAFFFD]  to-transparent" />
        </div>
        <button
          type="button"
          className="
                  relative group
                  mt-4
                  flex items-center justify-center
                  gap-[0.6875rem]
                  rounded-full
                  pl-[10px] pr-[1rem] py-[0.1px] lg:py-[0.100rem]
                  text-base font-freightNeoMedium text-white
                  2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                  overflow-hidden z-100 mx-auto md:hidden
                "
        >
          <div className={`absolute inset-0 bg-[#e0f2ec] rounded-full`}></div>
          <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
            <div
              className={`
                      absolute w-0 h-0 rounded-full
                      group-hover:w-[47rem] group-hover:h-[30rem]
                      transition-all duration-500 ease-out
                    `}
            ></div>
            <div className="relative z-20">
              <CTAButtonIcon fill="#0C3E49" direction="right" />
            </div>
          </div>
          <span className={`relative z-20 text-[#0C3E49] text-[13px] mt-[3px] md:mt-0`}>More about our sustainability centric approach</span>
        </button>
      </div>
    </section>
  );
};

export default LyfeStyle;
