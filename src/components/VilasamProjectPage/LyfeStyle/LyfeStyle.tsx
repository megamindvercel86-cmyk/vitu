"use client";
import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { MdKeyboardArrowRight } from "react-icons/md";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 50 },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
  exit: { opacity: 0 },
};
const LyfeStyle = () => {
  const [open, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <section className="grid grid-cols-1 gap-8 items-center !px-0  lg:flex-row ">
      <div className="relative">
        <div className=" lg:absolute px-[1rem] sm:px-[1rem] md:px-[4.125rem] lg:px-[3.5rem] xl:px-[9rem] lg:top-16 flex lg:flex-row flex-col  items-start w-full  md:pb-16  lg:gap-14  ">
          <div className="lg:w-1/2">
            <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] font-medium font-geistSerif  md:pb-10 pb-4">
              20,000 sq.ft of Everyday Luxury
            </h2>
            <div className=" group cursor-pointer hidden md:block">
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="
                      relative group
                      mt-4
                      flex items-center justify-center
                      gap-[0.6875rem]
                      rounded-full
                      pl-[7px] pr-[1rem] py-[0.6px] lg:py-[0.20rem]
                      text-base font-freightNeoMedium text-white
                      2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                      overflow-hidden z-100
                    "
              >
                <div className={`absolute inset-0 bg-[#e0f2ec]  rounded-full`}></div>
                <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
                  <div
                    className={`
                          absolute w-0 h-0   rounded-full
                          group-hover:w-[47rem] group-hover:h-[30rem]
                          transition-all duration-500 ease-out
                        `}
                  ></div>
                  <div className="relative z-20">
                    <CTAButtonIcon fill="#0C3E49" direction="right" />
                  </div>
                </div>
                <span className={` relative z-20 text-[#0C3E49] mt-[3px] md:mt-0 font-sourceSans3`}>
                  More about our sustainability centric approach{" "}
                </span>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-end">
            <p className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3 ">
              Experience leisure and lifestyle come together at The Club. As part of your Vilasam journey, enjoy exclusive membership to the Vaikuntam
              City Clubhouse, an elegant space designed for relaxation, connection and recreation.
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
          onClick={() => setIsOpen(true)}
          type="button"
          className="
                relative group
                      mt-4
                   flex items-center justify-center mx-auto md:hidden
                      gap-[0.6875rem]
                      rounded-full
                    pl-[4px] md:pl-[7px] pr-[1rem] py-[0.6px] lg:py-[0.20rem]
                      text-base font-freightNeoMedium text-white
                      2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                      overflow-hidden z-100
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
          <span className={`relative z-20 text-[#0C3E49] text-[13px] mt-[3px] md:mt-0 font-sourceSans3`}>
            More about our sustainability centric approach
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 h-screen z-50 overflow-auto" initial="hidden" animate="visible" exit="exit" data-lenis-prevent>
            <motion.div variants={backdropVariants} className="backdrop-blur-lg h-full w-full fixed inset-0" onClick={closeModal} />
            <motion.div
              variants={cardVariants}
              className="max-w-6xl mx-auto bg-[#f8f6f5] h-fit z-[60] my-10 rounded-3xl font-sans relative shadow-2xl"
            >
              <motion.button
                variants={contentVariants}
                className="absolute top-6 z-50 me-4 lg:me-8 h-8 w-8 right-0 cursor-pointer ml-auto bg-white rounded-full flex items-center justify-center"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="h-6 w-6 text-[#7a6d3c]" />
              </motion.button>
              <motion.div variants={contentVariants}>
                <div className="flex flex-col">
                  <div className="relative w-full h-64 lg:h-[80vh] xl:h-[70vh] rounded-t-xl overflow-hidden">
                    <Image
                      src="/images/vilasamPageImages/image3.webp"
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-[100%_center]"
                      priority
                    />
                  </div>
                  <div className="flex flex-col gap-4 py-12 px-6 lg:px-20">
                    <h2 className="text-[36px] lg:text-[48px] leading-[1.3] font-semibold max-w-3xl font-geistSerif text-[#0C3E49]">
                      20,000 sq.ft. Clubhouse
                    </h2>
                    <h2 className="font-bold text-[#04070799] text-[24px]">A space designed for leisure, wellness and community</h2>

                    <p className="text-[#040707]/60 mt-5 font-sourceSans3 !text-xl">
                      At the heart of Vilasam lies The Club — a sprawling 20,000 sq.ft. clubhouse designed to enrich everyday living. Whether it’s a
                      quiet moment of reflection or a lively gathering with neighbors, the clubhouse brings together spaces that cater to wellness,
                      connection, and celebration.
                    </p>
                    <p className="text-[#040707]/60 font-sourceSans3 !text-xl">
                      From indoor activity zones to calm corners for reading or relaxing, every detail has been thoughtfully curated to elevate the
                      way you live. It’s more than just a building — it’s where community comes alive, and where every visit feels like an escape
                      within your own neighborhood.
                    </p>
                  </div>
                </div>
              </motion.div>
                <motion.div variants={contentVariants}>
                            <hr className="border-t-gray-200 border-[1px]" />
                            <div className="lg:px-44 px-12">
                              <h1 className="pt-10 text-[10px] md:text-[12px] font-geistSerif text-[#8E8E93] border-t-gray-200">NextUp</h1>
                              <div className="flex pb-16 justify-between">
                               
                              </div>
                            </div>
                          </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LyfeStyle;
