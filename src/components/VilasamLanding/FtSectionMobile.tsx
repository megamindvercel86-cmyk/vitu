"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";

gsap.registerPlugin(ScrollTrigger);

// Prevent mobile address bar jumps from breaking ScrollTrigger
ScrollTrigger.config({
  ignoreMobileResize: true
});



export type FtMobileScrollCard = {
  id: number;
  bgImage: string;
  title: string;
  title2: string;
  subtitle?: string;
  image: string;
  theme: "darkteal" | "teal" | "orange";
  textColor: string;
};

type FtSectionMobile = {
  mobileCards: FtMobileScrollCard[];
};


export default function FtSectionMobile({ mobileCards }: FtSectionMobile) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs for animated elements
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "orange":
        return "bg-[#F79520]";
      case "teal":
        return "bg-[#024854]";
      case "darkteal":
        return "bg-[#084747]";
      default:
        return "bg-[#024854]";
    }
  };



  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Total scroll distance: 1 viewport height per transition (pixel-based)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${mobileCards.length * 200}%`,
          pin: true,
          pinType: "transform",
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 0.5,
          fastScrollEnd: true,

        },
      });

      // Normalize scroll for mobile/touch devices to sync threads
      if (ScrollTrigger.isTouch) {
        ScrollTrigger.normalizeScroll(true);
      }

      // 1. Initial pause for first card
      tl.to({}, { duration: 1 });

      // 2. Animate and Pause logic
      mobileCards.forEach((_, index) => {
        if (index === 0) return;

        tl.to(
          [videoRefs.current[index], cardRefs.current[index]],
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power1.inOut",
          }
        );

        // STAY on this section (Pause)
        tl.to({}, { duration: 1 });
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, containerRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [mobileCards]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black will-change-transform"
      style={{ height: "100dvh" }}
    >

      {/* 
        RENDER ALL SECTIONS ABSOLUTELY 
        Index 0 is visible by default. 
        Index 1+ are hidden by clip-path initially.
      */}
      {mobileCards.map((card, index) => {
        // Initial Clip Path: Visible for first item, Hidden (Clipped at bottom) for others
        const initialClip = index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)";

        return (
          <React.Fragment key={card.id}>

            {/* 1. BACKGROUND IMAGE LAYER */}
            <div
              ref={(el) => {
                if (el) videoRefs.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full z-0 will-change-[clip-path]"
              style={{ clipPath: initialClip, zIndex: index, transform: 'translate3d(0,0,0)' }} // Stack z-index slightly to correct paint order
            >
              <Image
                src={card.bgImage}
                alt={`Background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* 2. FOREGROUND CARD LAYER */}
            <div
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-start px-6 md:justify-end md:pr-10 lg:pr-20 translate-z-0 will-change-[clip-path]"
              style={{ clipPath: initialClip, zIndex: 10 + index, transform: 'translate3d(0,0,0)' }}
            >
              <div className={`
                pointer-events-auto
                relative
                w-full max-w-[280px] md:max-w-[420px]
                h-[55vh]
                ${getThemeClasses(card.theme)}
                ${card.textColor}
                p-4 md:p-6
                shadow-2xl
                flex flex-col
              `}>
                {/* Image INSIDE the card */}
                {/* place  this image  div center  */}
                <div className="relative w-full md:h-[45dvh] h-[35dvh]  mb-6 overflow-hidden bg-black/10 p-15  flex items-center justify-center">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover  "
                  />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-theSeasons font-normal leading-tight mb-2">
                    {/* {card.title.split(/(%)/g).map((part, i) =>
                      part === '%' ? <span key={i} className="font-CandideCondensedNormal">{part}</span> : part
                    )} */}

                    {safeSpecialCharacters(card.title)}
                  </h3>
                  <h3 className="text-3xl md:text-4xl font-theSeasons font-normal leading-tight mb-2">
                    {card.title2.split(/(%)/g).map((part, i) =>
                      part === '%' ? <span key={i} className="font-CandideCondensedNormal">{part}</span> : part
                    )}
                  </h3>

                  {card.subtitle && (
                    <p className="text-sm md:text-base opacity-90 font-light mb-4">
                      {card.subtitle}
                    </p>
                  )}

                  {/* <p className="text-sm md:text-base opacity-80 leading-relaxed font-light">
                    {card.description}
                  </p> */}
                </div>
              </div>
            </div>

          </React.Fragment>
        );
      })}

    </div>
  );
}
