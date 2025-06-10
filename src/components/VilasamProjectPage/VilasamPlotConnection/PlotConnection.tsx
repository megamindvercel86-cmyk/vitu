"use client";
import Image from "next/image";
import React, { useState } from "react";
import image1 from "../../../../public/images/plotLocations/largeScreens.png";
import { Airport, EducationalInstitutions, EmergencyService, HolySpaces, RecreationalAreas } from "@/components/Icons/Icons";
import { motion } from "framer-motion";
const Areas = [
  {
    location: "Mukka Junction",
    type: "Null",
    position: "top-[4%] left-[55.5%]",
    isActive: true,
    textPosition: "top-[2%] left-[55.5%]",
  },
  {
    location: "Shashitulu Beach",
    type: "Recreational Areas",
    position: "top-[10%] left-[52%]",
    isActive: true,
    textPosition: "top-[10%] lg2:left-[48%] left-[46%]",
  },
  {
    location: "Srinivas Hospital",
    type: ["Educational Institutions", "Emergency Services"],
    position: "top-[12%] left-[59%]",
    isActive: true,
    textPosition: "top-[12%] lg2:left-[62.5%] left-[65.5%]",
  },
  {
    location: "National Institute of Technology Karnataka",
    type: "Educational Institutions",
    position: "top-[30%] left-[60%]",
    isActive: true,
    textPosition: "lg2:top-[27%] top-[24%] left-[60%]",
  },
  {
    location: "NITK Beach",
    type: "Recreational Areas",
    position: "top-[30%] left-[52.5%]",
    isActive: true,
    textPosition: "top-[30%] lg2:left-[50%] left-[48%]",
  },
  {
    location: "Vilasam",
    type: "Main",
    position: "top-[39%] left-[67%]",
    isActive: true,
    textPosition: "lg2:top-[42%] top-[43%] left-[67%]",
  },
  {
    location: "Suratkal Beach",
    type: "Recreational Areas",
    position: "top-[48%] left-[56.5%]",
    isActive: true,
    textPosition: "top-[48%] lg2:left-[53%] left-[51%]",
  },
  {
    location: "Hotel Suraj International",
    type: "Recreational Areas",
    position: "top-[50%] left-[66.5%]",
    isActive: true,
    textPosition: "lg2:top-[48%] top-[53%] left-[66.5%]",
  },
  {
    location: "Padmavathi Hospital",
    type: "Emergency Services",
    position: "top-[57%] left-[68.5%]",
    isActive: true,
    textPosition: "lg2:top-[55%] top-[53%] left-[68.5%]",
  },
  
  {
    location: "Shri Kashi Math",
    type: ["Recreational Areas", "Holy Spaces"],
    position: "top-[53%] left-[60%]",
    isActive: true,
    textPosition: "top-[53%] lg2:left-[56.5%] left-[54%]",
  },
  {
    location: "Abish Mall",
    type: "Recreational Areas",
    position: "top-[63%] left-[62%]",
    isActive: true,
    textPosition: "top-[63%] lg2:left-[59.5%] left-[58.5%]",
  },
  {
    location: "Hotel Sadanand",
    type: "Null",
    position: "top-[71%] left-[60%]",
    isActive: true,
    textPosition: "top-[71%] left-[54%] lg2:left-[56%]",
  },
  {
    location: "Surathkal Market",
    type: "Null",
    position: "top-[84%] left-[70%]",
    isActive: true,
    textPosition: "lg2:top-[87%] top-[88%] left-[70%]",
  },
  {
    location: "Sacred Heart Church",
    type: "Holy Spaces",
    position: "top-[91%] left-[73%]",
    isActive: true,
    textPosition: "lg2:top-[94%] top-[70%] left-[73%]",
  },
  {
    location: "BASF",
    type: "Null",
    position: "top-[96%] left-[90%]",
    isActive: true,
    textPosition: "top-[98%] left-[90%]",
  },
  {
    location: "Karnataka Housing Board",
    type: "Null",
    position: "top-[28.5%] left-[95.5%]",
    isActive: true,
    textPosition: "lg2:top-[32%] top-[34%] left-[95.5%]",
  },
  {
    location: "MUDA Township",
    type: "Null",
    position: "top-[5%] left-[92%]",
    isActive: true,
    textPosition: "lg2:top-[7%] top-[10%] left-[92%]",
  },
  {
    location: "Club",
    type: "Main",
    position: "top-[35%] left-[72%]",
    isActive: true,
    textPosition: "lg2:top-[37%] top-[39%] left-[72%]",
  },
  {
    location: "Upcoming DMart",
    type: "Recreational Areas",
    position: "top-[58%] left-[59%]",
    isActive: true,
    textPosition: "top-[58%] lg2:left-[55%] left-[63%]",
  },
  {
    location: "Cine Galaxy Movie Theatre",
    type: "Recreational Areas",
    position: "top-[67%] left-[59%]",
    isActive: true,
    textPosition: "top-[67%] lg2:left-[53.5%] left-[61.5%]",
  },

  {
    location: "Zuese Fitness Gym",
    type: "Recreational Areas",
    position: "top-[75%] left-[60%]",
    isActive: true,
    textPosition: "top-[75%] lg2:left-[55.5%] left-[64.5%]",
  },
  {
    location: "Raj’s Fitness Gym",
    type: "Recreational Areas",
    position: "top-[79%] left-[59%]",
    isActive: true,
    textPosition: "top-[79%] lg2:left-[54.5%] left-[63.5%]",
  },
  {
    location: "Panambur Beach",
    type: "Recreational Areas",
    position: "top-[83%] left-[59%]",
    isActive: true,
    textPosition: "top-[83%] lg2:left-[54.5%] left-[63.5%]",
  },
  {
    location: "New Mangalore Port",
    type: "Recreational Areas",
    position: "top-[88%] left-[60%]",
    isActive: true,
    textPosition: "top-[88%] lg2:left-[55.5%] left-[64.5%]",
  },
  {
    location: "KIOCL Limited",
    type: "Null",
    position: "top-[94%] left-[62%]",
    isActive: true,
    textPosition: "top-[94%] lg2:left-[58.5%] left-[67.5%]",
  },
  {
    location: "Mangalore International Airport (25 mins away)",
    type: "Null",
    icon: <Airport />,
    position: "top-[77%] left-[81%]",
    isActive: true,
    textPosition: "top-[83%] lg2:left-[81.5%] left-[67.5%]",
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
  active: { color: ACTIVE_COLOR, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  inactive: { color: INACTIVE_COLOR, opacity: 0.5, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
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

const legendVariants = {
  active: { color: ACTIVE_COLOR, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
  inactive: { color: INACTIVE_COLOR, opacity: 0.5, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};
const PlotConnection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selectedType = activeIndex === null ? null : legendItems[activeIndex].label;

  return (
    <div id="location" className="relative inline-block h-[100vh] w-full">
      {/* Background Image */}
      <Image src={image1} alt="Plot Location Map" quality={100} className="w-full h-[100vh] object-cover" priority />

      {/* Plots */}
      {Areas.map((area, index) => (
        <div key={index}>
          {area.type === "Main" ? (
            <motion.span
              className={`absolute ${area.textPosition} max-w-[10%] text-center text-xs font-semibold z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-sourceSans3`}
              variants={textVariants}
              animate="active"
            >
              {area.location}
            </motion.span>
          ) : (
            <motion.span
              className={`absolute ${area.textPosition} max-w-[10%] text-center text-xs font-semibold z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-sourceSans3`}
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
          <motion.span
            className={`absolute ${area.textPosition} max-w-[10%] text-center text-xs font-semibold z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 font-sourceSans3`}
            variants={textVariants}
            animate={
              selectedType === null || (Array.isArray(area.type) ? area.type.includes(selectedType) : area.type === selectedType)
                ? "active"
                : "inactive"
            }
          >
            {area.location}
          </motion.span>
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
            ) : area.location === "Club" ? (
              <motion.svg width="21" height="28" viewBox="0 0 21 28" fill="none" xmlns="http://www.w3.org/2000/svg" variants={svgVariants}>
                <motion.path
                  d="M10.5814 0.94043C5.3307 0.94043 0.951416 5.17002 0.951416 10.5704C0.951416 12.6249 1.56878 14.4569 2.75362 16.1736L9.8444 27.2381C10.1884 27.776 10.975 27.7749 11.3183 27.2381L18.4399 16.1359C19.5992 14.497 20.2113 12.5726 20.2113 10.5704C20.2113 5.26042 15.8913 0.94043 10.5814 0.94043Z"
                  animate={{
                    fill: ACTIVE_COLOR,
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
              </motion.svg>
            ) : area.icon ? (
              <motion.span
                className={`flex items-center justify-center text-xs lg2:w-10 lg2:h-10 w-7 h-7 rounded-full shadow-md`}
                variants={markerVariants}
                animate={
                  selectedType === null || (Array.isArray(area.type) ? area.type.includes(selectedType) : area.type === selectedType)
                    ? "active"
                    : "inactive"
                }
              >
                {area.icon}
              </motion.span>
            ) : (
              <motion.span
                className={`text-xs lg2:w-3 lg2:h-3 w-3 h-3 rounded-full shadow-md`}
                variants={markerVariants}
                animate={
                  selectedType === null || (Array.isArray(area.type) ? area.type.includes(selectedType) : area.type === selectedType)
                    ? "active"
                    : "inactive"
                }
              ></motion.span>
            )}
          </div>
        </div>
      ))}

      {/* Text & Legend */}
      <div className="absolute w-1/2 inset-0 z-20 flex flex-col justify-between mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem] py-16 xl:py-24 h-full">
        <div>
          <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] font-medium font-geistSerif">
            Truly Well- <br />
            Connected Living
          </h2>
          <p className="font-sourceSans3 font-medium text-lg lg2:text-2xl text-[#0C3E4999] leading-relaxed mb-8 max-w-[54%] pt-6">
            A perfect blend of nature's calm and urban ease, just 3 minutes from scenic beaches and thoughtfully connected to business parks,
            landmarks, airports, hospitals, and more.
          </p>
        </div>

        {/* Legend */}
        <div className="lg2:space-y-8 space-y-4">
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
              <motion.div
                key={item.label}
                className="flex items-center gap-3 text-lg lg2:text-2xl font-semibold font-sourceSans3 cursor-pointer select-none"
                variants={legendVariants}
                animate={isActive ? "active" : "inactive"}
                onClick={() => setActiveIndex(idx)}
              >
                {IconComponent && <IconComponent active={isActive} />}
                {item.label}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlotConnection;
