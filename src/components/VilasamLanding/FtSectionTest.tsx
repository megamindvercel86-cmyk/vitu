"use client";

import React from "react";
import Image from "next/image";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";

/* ================= TYPES ================= */

export type FtScrollCard = {
  id: number;
  video: string;
  title: string;
  title2: string;
  subtitle?: string;
  image: string;
  theme: "darkteal" | "teal" | "orange";
  textColor: string;
};

type FtScrollProps = {
  cards: FtScrollCard[];
};

/* ================= COMPONENT ================= */

export default function FtSectionTest({ cards }: FtScrollProps) {
  const getThemeClasses = (theme: FtScrollCard["theme"]) => {
    switch (theme) {
      case "orange": return "bg-[#F79520]";
      case "teal": return "bg-[#024854]";
      case "darkteal": return "bg-[#084747]";
      default: return "bg-[#024854]";
    }
  };

  return (
    // CONTAINER
    // 1. h-screen + overflow-y-auto: Creates a "nested" scrollable area
    // 2. snap-y snap-mandatory: Enables snapping
    // 3. no-scrollbar: Optional utility to hide the bar for a clean look
    <div className="relative w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
      
      {cards.map((card, index) => {
        return (
          // CARD WRAPPER
          // 1. sticky top-0: Causes the stacking effect (cards slide over each other)
          // 2. h-screen: Each card takes full height
          // 3. snap-start: Align to top
          // 4. snap-always: CRITICAL. Forces a stop at this element. You cannot skip it.
          <div 
            key={card.id} 
            className="sticky top-0 w-full h-screen snap-start snap-always"
            style={{ zIndex: index + 1 }} // Ensure correct stacking order
          >
            
            {/* ================= VIDEO (Background) ================= */}
            <div className="absolute inset-0 w-full h-full z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-bottom"
              >
                <source src={card.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* ================= CONTENT CARD ================= */}
            <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center md:justify-end md:pr-[5%] lg:pr-[8%] xl:pr-[10%]">
              <div
                className={`
                  pointer-events-auto
                  relative
                  w-[90%] max-w-[20vw] md:max-w-[28vw] lg:max-w-[30vw]
                  min-h-[60vh] md:min-h-[80vh]
                  ${getThemeClasses(card.theme)}
                  ${card.textColor}
                  p-6 md:p-8
                  shadow-2xl
                  flex flex-col justify-between
                `}
              >
                {/* IMAGE */}
                <div className="relative w-full md:h-[45dvh] mb-6 overflow-hidden bg-black/10">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* TEXT */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-theSeasons mb-1">
                    {safeSpecialCharacters(card.title)}
                  </h3>
                  {card.title2 && (
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-theSeasons mb-2">
                      {card.title2}
                    </h3>
                  )}
                  {card.subtitle && (
                    <p className="text-xs md:text-sm lg:text-base opacity-90">
                      {card.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Optional: Add a "buffer" div at the end if you want the last card 
          to unstick and scroll away smoothly when finished */}
      {/* <div className="h-1 w-full" /> */}
    </div>
  );
}