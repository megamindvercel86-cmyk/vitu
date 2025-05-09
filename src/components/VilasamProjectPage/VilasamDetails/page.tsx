"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import img from "../../../../public/images/vilasamPageImages/carouselmages/3.webp";
interface PulsePoint {
  id: number;
  style: string;
  // left: string;
  detail: {
    title: string;
    description: string;
  };
}
const pulsePoints: PulsePoint[] = [
  { id: 1, style: "xl:top-[80%] xl:left-[36%] lg:top-[86%] lg:left-[36%] top-[80%] left-[24%]", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 2, style: "xl:top-[20%] xl:left-[85%] lg:top-[20%] lg:left-[85%] top-[20%] left-[85%]", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 3, style: "xl:top-[48%] xl:left-[32%] lg:top-[46%] lg:left-[34%] top-[48%] left-[20%]", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 4, style: "xl:top-[80%] xl:left-[50%] lg:top-[86%] lg:left-[50%] top-[80%] left-[50%]", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 5, style: "xl:top-[80%] xl:left-[71%] lg:top-[86%] lg:left-[69%] top-[80%] left-[89%]", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
];

const ElevatesLiving: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  

  return (
    <section className="p-8  lg:p-16 grid grid-cols-1 py-20 md:py-32 lg2:py-40 gap-8 items-center !px-0  lg:flex-row mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[9rem]">
      <div className="flex justify-between flex-col md:flex-row items-start w-full gap-8 md:pb-16">
        <h2 className="md:text-6xl text-2xl  text-[#0C3E49] text-center lg:text-start font-medium font-geistSerif md:max-w-[40%]">Where Every Detail Elevates Living</h2>
        <p className="md:text-2xl text-lg text-[#0C3E49CC] max-w-2xl  font-geistSeriftext-right">
          At Vilasam, 30ft wide cobblestone roads set the tone for a thoughtfully designed community — complete with tree-lined footpaths, solar-lit
          streets & landscapes that breathe with over 100 trees & open green spaces.
        </p>
        {hoveredPoint}
      </div>

      <div className="relative ">
        <Image src={img} alt="Elevates Living" className=" h-[50vh] lg:h-[100vh] object-cover rounded-lg" />

        {pulsePoints?.map((point) => (
          <div
            key={point.id}
            className={`absolute ${point.style}`}
            
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <motion.div
              className="lg:w-5 lg:h-5 w-1 h-1 bg-white rounded-full border-[5px] border-gray-100 shadow-lg cursor-pointer"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            {hoveredPoint === point.id && (
              <div className="absolute style-[-99px] font-sourceSans3 text-base left-1/2  transform -translate-x-1/2 px-4 py-4 backdrop-blur-md border  border-white/30 text-white  rounded-lg shadow-xl w-max">
                <div className="font-semibold">{point.detail.title}</div>
                <div className="font-normal max-w-64">{point.detail.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ElevatesLiving;
