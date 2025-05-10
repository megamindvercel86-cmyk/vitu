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
    <section className="grid grid-cols-1 gap-8 items-center !px-0  lg:flex-row mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem]">
      <div className="flex lg:flex-row flex-col  items-start w-full gap-8 md:pb-16">
        <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] lg:w-1/2 font-medium font-geistSerif">Where Every Detail Elevates Living</h2>
        <p className="lg:w-1/2 lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3">
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
