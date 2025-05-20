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
  { id: 1, style: "xl:top-[80%] xl:left-[36%] lg:top-[86%] lg:left-[36%] top-[80%] left-[24%] ", detail: { title: "Saucer Drains", description: "Efficient saucer drain design for quick surface water runoff, helping maintain clean and dry road edges." } },
  { id: 2, style: "xl:top-[20%] xl:left-[85%] lg:top-[20%] lg:left-[85%] top-[20%] left-[85%]", detail: { title: "Dedicated Landscape", description: "Lush, green landscape zones alongside roads and common areas, offering natural beauty and a relaxed environment." } },
  { id: 3, style: "xl:top-[48%] xl:left-[32%] lg:top-[46%] lg:left-[34%] top-[48%] left-[20%]", detail: { title: "Solar-Powered Street Lights", description: "Eco-friendly solar streetlights installed along internal roads, ensuring safety and energy efficiency after dusk." } },
  { id: 4, style: "xl:top-[80%] xl:left-[50%] lg:top-[86%] lg:left-[50%] top-[80%] left-[50%]", detail: { title: "Cobblestone Driveway", description: "6-meter-wide cobblestone driveways designed to comfortably accommodate two vehicles, combining charm with functionality." } },
  { id: 5, style: "xl:top-[80%] xl:left-[71%] lg:top-[86%] lg:left-[69%] top-[80%] left-[89%]", detail: { title: "Groundwater Recharge Pits", description: "Strategically placed recharge pits to support sustainable water conservation and improve groundwater levels." } },
];

const ElevatesLiving: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  

  return (
    <section className="grid grid-cols-1 gap-8 items-center !px-0  lg:flex-row mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem]">
      <div className="flex lg:flex-row flex-col   items-start w-full ">
        <div className="flex lg:flex-row flex-col md:gap-12 gap-4 pb-0 lg:pb-32">

        <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] lg:w-1/2 font-medium font-geistSerif">Where Every Detail Elevates Living</h2>
        <p className="lg:w-1/2 lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3">
          At Vilasam, 30ft wide cobblestone roads set the tone for a thoughtfully designed community — complete with tree-lined footpaths, solar-lit
          streets & landscapes that breathe with over 100 trees & open green spaces.
        </p>
        </div>
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
              <div className={`absolute z-10 font-sourceSans3 text-xs sm:text-sm md:text-base px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 backdrop-blur-md border border-white/30 text-white rounded-lg shadow-xl w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] ${
                point.id === 1 
                  ? 'bottom-full mb-1 sm:mb-2 left-1/2 -translate-x-1/2' : point.id===5 ?  `bottom-full mb-1 sm:mb-2 left-[-40] -translate-x-1/2`
                  : point.id === 2 
                    ? 'right-0 top-0 ml-1 sm:ml-2' : point.id===4 ? `xl:right-0 xl:top-0  left-[-50] top-[-140] lg:top-[-170] ml-1 sm:ml-2`
                    : 'left-0 top-1/2 -translate-y-1/2 ml-1 sm:ml-2'
              }`}>
                <div className="font-semibold mb-0.5 sm:mb-1">{point.detail.title}</div>
                <div className="font-normal ">{point.detail.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ElevatesLiving;
