"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import img from "../../../../public/images/vilasamPageImages/carouselmages/3.png";
interface PulsePoint {
  id: number;
  top: string;
  left: string;
  detail: {
    title: string;
    description: string;
  };
}
const pulsePoints: PulsePoint[] = [
  { id: 1, top: "80%", left: "36%", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 2, top: "20%", left: "85%", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 3, top: "48%", left: "32%", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 4, top: "80%", left: "50%", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
  { id: 5, top: "80%", left: "71%", detail: { title: "solar powred lights", description: "Solar lights save energy, reducing our carbon- footprint." } },
];

const ElevatesLiving: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  return (
    <section className="p-8 lg:p-16 grid grid-cols-1 md:py-32 lg2:py-40 gap-8 items-center">
      <div className="flex justify-between flex-col md:flex-row items-start w-full gap-8 md:pb-16">
        <h2 className="md:text-6xl text-2xl  text-[#0C3E49] font-medium font-geistSerif md:max-w-[40%]">Where Every Detail Elevates Living</h2>
        <p className="md:text-2xl text-[#0C3E49CC] max-w-2xl  font-geistSeriftext-right">
          At Vilasam, 30ft wide cobblestone roads set the tone for a thoughtfully designed community — complete with tree-lined footpaths, solar-lit
          streets & landscapes that breathe with over 100 trees & open green spaces.
        </p>
      </div>

      <div className="relative ">
        <Image src={img} alt="Elevates Living" className=" h-[100vh] object-cover rounded-lg" />

        {pulsePoints.map((point) => (
          <div
            key={point.id}
            className="absolute"
            style={{ top: point.top, left: point.left }}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full border-[5px] border-gray-100 shadow-lg cursor-pointer"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            {hoveredPoint === point.id && (
              <div className="absolute top-[-99px] font-sourceSans3 text-base left-1/2  transform -translate-x-1/2 px-4 py-4 backdrop-blur-md border border-white/30 text-white  rounded-lg shadow-xl w-max">
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
