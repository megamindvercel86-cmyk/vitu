"use client";

import Image from "next/image";
import { useState } from "react";
import Image1 from "../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot1.webp";
import Image2 from "../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot2.webp";
import Image3 from "../../../../public/images/vaikuntamCityEliteLandingPage/availablePlot3.webp";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import { BsArrowRight } from "react-icons/bs";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function AvailablePlotOrientations({
  image1 = Image1,
  image2 = Image2,
  image3 = Image3,
}: {
  image1?: StaticImport;
  image2?: StaticImport;
  image3?: StaticImport;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselData = [
    {
      id: 1,
      image: image1,
      title: "Signature Plots",
      description:
        "Positioned at key corners within the layout, these plots offer the best of orientation, access and flexibility. Ideal for expansive planning and custom design, they give you the room to shape a home with clarity, balance and quiet presence. These are the standout plots in a layout built for the chosen few.",
    },
    {
      id: 2,
      image: image2,
      title: "Sunrise Plots",
      description:
        "East-facing and naturally aligned, these plots bring in soft morning light and a sense of quiet energy. They offer an ideal foundation for homes shaped around early routines, vastu preferences, and steady, intentional living. The orientation supports a lifestyle that begins with clarity and carries a calm rhythm through the day.",
    },
    {
      id: 3,
      image: image3,
      title: "Sunset Plots",
      description:
        "West-facing and naturally lit through the afternoon, these plots are suited to homes that find their rhythm later in the day. They’re ideal for slower starts, generous evenings and routines that stretch into quiet nightfall.",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <section className="bg-[#F3EAE1] relative z-50 ">
      <div className="py-16 lg:py-28 px-12 lg:px-0 container mx-auto lg:border-l lg:border-r border-[#1C1213]">
        <div className="px-4 lg:px-12">
          <h6 className="text-[#DAA37A] text-center lg:text-left uppercase lg:text-lg leading-[24px] font-FreightNeoProNormal">
            Available Plot Orientations
          </h6>
          <AnimatedHeading className="text-[#37121A] text-center font-FreightNeoProNormal text-[32px] lg:text-[42px] lg2:text-5xl leading-[100%] max-w-lg mx-auto mt-4 lg:mt-1">
            Luxury Begins with the Right Direction
          </AnimatedHeading>
        </div>
        <div className="mt-6 lg:mt-20 lg:border-t border-[#1C1213] flex flex-col lg:flex-row gap-6 lg:gap-0 items-end w-full">
          <div className="relative w-full lg:w-[55%] h-[300px] lg:h-[730px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselData[activeIndex].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselData[activeIndex].image}
                  alt={carouselData[activeIndex].title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex-1 lg:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselData[activeIndex].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* Title + Arrow */}
                <div className="flex items-center justify-between w-full">
                  <motion.h2
                    className="text-[32px] lg:text-[43px] leading-[39px] text-[#37121A] font-FreightNeoProNormal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {carouselData[activeIndex].title}
                  </motion.h2>
                  <Image
                    onClick={handleNext}
                    src={"/svgs/bigArrowRight.svg"}
                    alt="Arrow Right"
                    width={99}
                    height={25}
                    className="cursor-pointer hidden lg:block"
                  />
                  <BsArrowRight
                    className="cursor-pointer lg:hidden text-customCongoBrown h-12 w-12"
                    onClick={handleNext}
                  />
                </div>

                {/* Description */}
                <motion.p
                  className="text-lg text-[#37121A]/60 text-pretty font-FreightNeoProNormal leading-[24px] text-justify mt-3 lg:mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  {carouselData[activeIndex].description}
                </motion.p>

                {/* Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="bg-[#37121A] mt-4 lg:mt-16 xl:mt-20 w-full px-4 py-2 text-[#F3EAE1] font-freightNeoMedium uppercase lg:text-xl flex items-start justify-center"
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
