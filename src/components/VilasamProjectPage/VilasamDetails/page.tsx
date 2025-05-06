"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import img from "../../../../public/images/vilasamPageImages/carouselmages/3.png";
interface PulsePoint {
  id: number;
  top: string;
  left: string;
  detail: string;
}

const pulsePoints: PulsePoint[] = [
  { id: 1, top: "30%", left: "25%", detail: "Tree-lined footpaths" },
  { id: 2, top: "20%", left: "65%", detail: "Solar-lit streets" },
  { id: 3, top: "50%", left: "50%", detail: "30ft wide cobblestone roads" },
  { id: 4, top: "70%", left: "20%", detail: "Over 100 trees & open spaces" },
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
        <Image src={img} alt="Elevates Living" className="object-cover rounded-lg" />

        {pulsePoints.map((point) => (
          <div
            key={point.id}
            className="absolute"
            style={{ top: point.top, left: point.left }}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <motion.div
              className="w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow-lg cursor-pointer"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            {hoveredPoint === point.id && (
              <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {point.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ElevatesLiving;
