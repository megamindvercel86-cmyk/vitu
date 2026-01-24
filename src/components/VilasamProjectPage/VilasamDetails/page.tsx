"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSafeSpecialCharacters } from "@/hooks/useSafeSpecialCharacters";
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
  {
    id: 1,
    style: "top-[80%] left-[32%]",
    detail: {
      title: "Saucer Drains",
      description: "Efficient saucer drain design for quick surface water runoff, helping maintain clean and dry road edges.",
    },
  },
  {
    id: 2,
    style: "top-[20%] left-[85%]",
    detail: {
      title: "Dedicated Landscape",
      description: "Lush, green landscape zones alongside roads and common areas, offering natural beauty and a relaxed environment.",
    },
  },
  {
    id: 3,
    style: "top-[48%] left-[32%]",
    detail: {
      title: "Solar-Powered Street Lights",
      description: "Timer-enabled solar streetlights installed along internal roads, enhancing safety after dusk while conserving energy efficiently.",
    },
  },
  {
    id: 4,
    style: "top-[90%] left-[50%]",
    detail: {
      title: "Cobblestone Driveway",
      description: "6-meter-wide cobblestone-paved driveways designed to comfortably accommodate two vehicles, combining charm with functionality.",
    },
  },
  {
    id: 5,
    style: "top-[70%] md:top-[74%] md:left-[41%] left-[41%]",
    detail: {
      title: "Groundwater Recharge Pits",
      description: "Strategically placed recharge pits to support sustainable water conservation and improve groundwater levels.",
    },
  },
];

const ElevatesLiving: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  return (
    <section className="grid grid-cols-1 gap-8 items-center !px-0  lg:flex-row mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem]">
      <div className="flex lg:flex-row flex-col   items-start w-full ">
        <div className="flex lg:flex-row flex-col md:gap-12 gap-4 pb-0 lg:pb-12">
          <h2 className="text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] lg:w-1/2 font-medium font-theSeasons">
            Where Every Detail Elevates Living
          </h2>
          <p className="lg:w-1/2 lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-ttcommons">
            At Vilasam, <span className="font-CandideCondensedNormal">30</span>ft wide cobblestone<span className="font-CandideCondensedNormal">-</span>paved roads set the tone for a thoughtfully designed community  complete with tree<span className="font-CandideCondensedNormal">-</span>lined footpaths, solar<span className="font-CandideCondensedNormal">-</span>lit
            streets <span className="font-CandideCondensedNormal">&</span> landscapes that breathe with over <span className="font-CandideCondensedNormal">50+</span> trees <span className="font-CandideCondensedNormal">&</span> open green spaces.
          </p>
        </div>
        {/* {hoveredPoint} */}
      </div>

      <div className="relative ">
        <Image  height={300} width={300} src={img} alt="Elevates Living" className="w-full h-auto object-contain rounded-lg" />

        {pulsePoints?.map((point) => (
          <div
            key={point.id}
            className={`absolute ${point.style}`}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
           <div
  className="lg:w-7 lg:h-7 w-5 h-5 bg-gray-100 rounded-full border-[5px] border-gray-100 shadow-lg cursor-pointer pulse-dot"
/>

            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 opacity-0 z-20 lg:hidden cursor-pointer"
              onClick={() => setHoveredPoint(hoveredPoint === point.id ? null : point.id)}
              aria-label={`Toggle details for ${point.detail.title}`}
            />

            {hoveredPoint === point.id && (
              <div
                className={`absolute z-10 font-theSeasons text-xs sm:text-sm md:text-base px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 backdrop-blur-md border border-white/30 bg-black/20 text-white rounded-lg shadow-xl w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] ${point.id === 1
                  ? "bottom-full mb-1 sm:mb-2 left-1/2 -translate-x-1/2"
                  : point.id === 5
                    ? `bottom-full mb-1 sm:mb-2 left-[-40] -translate-x-1/2`
                    : point.id === 2
                      ? "right-0 top-0 ml-1 sm:ml-2"
                      : point.id === 4
                        ? `bottom-full mb-1 sm:mb-2 left-[-40] -translate-x-1/2`
                        : "left-0 top-1/2 -translate-y-1/2 ml-1 sm:ml-2"
                  }`}
              >
                <div className="font-semibold mb-0.5 sm:mb-1 font-theSeasons">{useSafeSpecialCharacters(point.detail.title)}</div>
                <div className="font-ttCommons  ">{useSafeSpecialCharacters(point.detail.description)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ElevatesLiving;
