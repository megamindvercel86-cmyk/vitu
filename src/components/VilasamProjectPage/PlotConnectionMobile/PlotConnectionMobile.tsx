"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import image from "../../../../public/images/plotLocations/mobile.png";
import { EducationalInstitutions, EmergencyService, HolySpaces, RecreationalAreas } from "@/components/Icons/Icons";
import { motion } from "framer-motion";

const Areas = [
  {
    location: "Mukka Junction",
    type: "Emergdency Services",
    position: "top-[16%] left-[35%]",
    isActive: true,
    textPosition: "top-[13%] left-[35%]",
  },
  {
    location: "Shashitulu Beach",
    type: "Recreational Areas",
    position: "top-[27%] left-[30%]",
    isActive: true,
    textPosition: "top-[27%] left-[22%]",
  },
  {
    location: "Srinivas Hospital",
    type: ["Educational Institutions", "Emergency Services"],
    position: "top-[28%] left-[41%]",
    isActive: true,
    textPosition: "top-[28%] left-[49%]",
  },
  {
    location: "National Institute of Technology Karnataka",
    type: "Educational Institutions",
    position: "top-[40%] left-[43%]",
    isActive: true,
    textPosition: "top-[36%] left-[43%] max-w-[20%]",
  },
  {
    location: "NITK Beach",
    type: "Recreational Areas",
    position: "top-[42%] left-[31%]",
    isActive: true,
    textPosition: "top-[42%] left-[25%]",
  },
  {
    location: "Vilasam",
    type: "Main",
    position: "top-[47%] left-[52%]",
    isActive: true,
    textPosition: "top-[54%] left-[52%]",
  },
  {
    location: "Suratkal Beach",
    type: "Recreational Areas",
    position: "top-[65%] left-[37%]",
    isActive: true,
    textPosition: "top-[65%] left-[30%]",
  },
  {
    location: "Hotel Suraj International",
    type: "Recreational Areas",
    position: "top-[66%] left-[51%]",
    isActive: true,
    textPosition: "top-[62%] left-[51%] max-w-[10%]",
  },
  {
    location: "Suratkal Market",
    type: "Recreational Areas",
    position: "top-[79%] left-[54%]",
    isActive: true,
    textPosition: "top-[74%] left-[54%] max-w-[10%]",
  },
  {
    location: "Shri Kashi Math",
    type: "Holy Spaces",
    position: "top-[71%] left-[45%]",
    isActive: true,
    textPosition: "top-[71%] left-[38%]",
  },
  {
    location: "Abish Mall",
    type: "Recreational Areas",
    position: "top-[79%] left-[47%]",
    isActive: true,
    textPosition: "top-[79%] left-[41%]",
  },
  {
    location: "Hotel Sadanand",
    type: "Recreational Areas",
    position: "top-[89%] left-[42%]",
    isActive: true,
    textPosition: "top-[89%] left-[35%]",
  },
  {
    location: "Sacred Heart Church",
    type: "Holy Spaces",
    position: "top-[92%] left-[62%]",
    isActive: true,
    textPosition: "top-[96.5%] max-w-[10%] left-[62%]",
  },
  {
    location: "Karnataka Housing Board",
    type: "Residential Areas",
    position: "top-[40%] left-[95.5%]",
    isActive: true,
    textPosition: "top-[45%] left-[95.5%]",
  },
  {
    location: "MUDA Township",
    type: "Residential Areas",
    position: "top-[7%] left-[92%]",
    isActive: true,
    textPosition: "lg2:top-[7%] top-[12%] left-[92%]",
  },
  {
    location: "The Club",
    type: "Main",
    position: "top-[45%] left-[60%]",
    isActive: true,
    textPosition: "top-[49%] left-[60%]",
  },
];

const legendItems = [
  { label: "Emergency Services" },
  { label: "Educational Institutions" },
  { label: "Recreational Areas" },
  { label: "Holy Spaces" },
];

const ACTIVE_COLOR = "#0C3E49";
const INACTIVE_COLOR = "#0C3E4966";

const textVariants = {
  active: {
    color: ACTIVE_COLOR,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  inactive: {
    color: INACTIVE_COLOR,
    opacity: 0.5,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const markerVariants = {
  active: {
    backgroundColor: ACTIVE_COLOR,
    opacity: 1,
    scale: 1.2,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  inactive: {
    backgroundColor: INACTIVE_COLOR,
    opacity: 0.5,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const svgVariants = {
  active: {
    opacity: 1,
    scale: 1.1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  inactive: {
    opacity: 0.5,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const PlotConnectionMobile = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const selectedType = activeIndex === null ? null : legendItems[activeIndex].label;

  // Auto rotation effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoRotating) {
      intervalId = setInterval(() => {
        setActiveIndex((currentIndex) => {
          if (currentIndex === null) return 0;
          return (currentIndex + 1) % legendItems.length;
        });
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoRotating]);

  const handleTabClick = (idx: number) => {
    setIsAutoRotating(false); // Stop auto-rotation when user interacts
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="w-full max-w-sm mx-auto space-y-4 bg-white rounded-lg relative">
      <div className="px-[1rem] space-y-2">
        <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] font-medium font-geistSerif  md:pb-10 pb-2">Well-Connected Living</h2>
        <p className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] pb-4 lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3 ">
          A perfect blend of nature's calm and urban ease, just 3 minutes from scenic beaches and thoughtfully connected to business parks, landmarks,
          airports, hospitals, and more.
        </p>
      </div>

      <div className="w-full h-full relative">
        <Image src={image} alt="Map showing Vilasam and nearby landmarks" className="w-full h-full object-cover" />

        {Areas.map((area, index) => (
          <React.Fragment key={index}>
            {area.location === "Vilasam" ? (
              <motion.span
                className={`absolute ${area.textPosition}  text-center  font-semibold z-30 text-[12px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-sourceSans3`}
                variants={textVariants}
                animate="active"
              >
                {area.location}
              </motion.span>
            ) : area.location === "The Club" ? (
              <motion.span
                className={`absolute ${area.textPosition} text-center  font-semibold z-30 text-[7px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-sourceSans3`}
                variants={textVariants}
                animate="active"
              >
                {area.location}
              </motion.span>
            ) : (
              <motion.span
                className={`absolute ${area.textPosition}  text-center  font-semibold z-30 text-[6px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-sourceSans3`}
                variants={textVariants}
                animate={
                  selectedType === null || (Array.isArray(area.type) ? area.type.includes(selectedType) : area.type === selectedType)
                    ? "active"
                    : "inactive"
                }
              >
                {area.location}
              </motion.span>
            )}

            <div className={`absolute ${area.position} z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1`}>
              {area.location === "Vilasam" ? (
                <motion.svg
                  className="w-7 h-7 lg2:w-9 lg2:h-9"
                  width="30"
                  height="42"
                  viewBox="0 0 30 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  variants={svgVariants}
                >
                  <motion.path
                    d="M15.1217 0.687012C7.00957 0.687012 0.243652 7.22164 0.243652 15.5651C0.243652 18.7393 1.19747 21.5697 3.02802 24.222L13.9831 41.3164C14.5146 42.1474 15.7299 42.1458 16.2603 41.3164L27.263 24.1638C29.0541 21.6317 29.9998 18.6586 29.9998 15.5651C29.9998 7.36131 23.3255 0.687012 15.1217 0.687012ZM15.1217 22.3278C11.3929 22.3278 8.35896 19.2939 8.35896 15.5651C8.35896 11.8363 11.3929 8.80232 15.1217 8.80232C18.8505 8.80232 21.8845 11.8363 21.8845 15.5651C21.8845 19.2939 18.8505 22.3278 15.1217 22.3278Z"
                    animate={{
                      fill: ACTIVE_COLOR,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.svg>
              ) : area.location === "The Club" ? (
                <motion.svg width="15" height="15" viewBox="0 0 21 28" fill="none" xmlns="http://www.w3.org/2000/svg" variants={svgVariants}>
                  <motion.path
                    d="M10.5814 0.94043C5.3307 0.94043 0.951416 5.17002 0.951416 10.5704C0.951416 12.6249 1.56878 14.4569 2.75362 16.1736L9.8444 27.2381C10.1884 27.776 10.975 27.7749 11.3183 27.2381L18.4399 16.1359C19.5992 14.497 20.2113 12.5726 20.2113 10.5704C20.2113 5.26042 15.8913 0.94043 10.5814 0.94043Z"
                    animate={{
                      fill: ACTIVE_COLOR,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.svg>
              ) : (
                <motion.span
                  className="w-[6px] h-[6px] rounded-full"
                  variants={markerVariants}
                  animate={
                    selectedType === null || (Array.isArray(area.type) ? area.type.includes(selectedType) : area.type === selectedType)
                      ? "active"
                      : "inactive"
                  }
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-between items-center border-[2px] border-[#0C3E49] rounded-full px-2 mx-3 !mt-12">
        <div className="flex flex-row items-center justify-between [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full">
          {legendItems.map((item, idx) => {
            const isActive = activeIndex === null || activeIndex === idx;
            let IconComponent;
            switch (item.label) {
              case "Emergency Services":
                IconComponent = EmergencyService;
                break;
              case "Educational Institutions":
                IconComponent = EducationalInstitutions;
                break;
              case "Recreational Areas":
                IconComponent = RecreationalAreas;
                break;
              case "Holy Spaces":
                IconComponent = HolySpaces;
                break;
              default:
                IconComponent = null;
            }
            return (
              <button
              aria-label="Select Tab"
                key={item.label}
                onClick={() => handleTabClick(idx)}
                className="relative px-5 py-3 rounded-full flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="absolute inset-0 my-1.5 bg-[#cad8d9] rounded-full"
                  />
                )}
                <span className="relative block">{IconComponent && <IconComponent active={isActive} />}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlotConnectionMobile;
