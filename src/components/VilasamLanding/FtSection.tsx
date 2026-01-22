"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSafeSpecialCharacters } from "@/hooks/useSafeSpecialCharacters";

gsap.registerPlugin(ScrollTrigger);

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

export default function FtScroll({ cards }: FtScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLDivElement>(null);

  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getThemeClasses = (theme: FtScrollCard["theme"]) => {
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
      /* ================= DESKTOP ================= */
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${cards.length * 150}%`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: (progress: number) => {
                const totalPanels = cards.length - 1 || 1;
                const step = 1 / totalPanels;
                const idx = progress / step;
                const segmentIndex = Math.floor(idx);
                const segmentProgress = idx - segmentIndex;

                // Explicit threshold logic:
                // If progress within segment > 50%, go to next card.
                // Otherwise snap back to the current card start.
                let targetIndex = segmentProgress > 0.5 ? segmentIndex + 1 : segmentIndex;

                if (targetIndex < 0) targetIndex = 0;
                if (targetIndex > totalPanels) targetIndex = totalPanels;

                const result = targetIndex * step;
                // Snap to a tiny offset (epsilon) instead of 0 to keep the user "pinned" 
                // inside the section and prevent accidental unpinning/reverting to previous section.
                return result === 0 ? 0.001 : result;
              },
              duration: { min: 0.2, max: 0.6 },
              delay: 0.1,
              ease: "power1.inOut",
            },
          },
        });

        cards.forEach((_, index) => {
          if (index === 0) return;

          tl.to([videoRefs.current[index], cardRefs.current[index]], {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "none",
          });
        });

        /* ================= DESKTOP SECTION SNAP ================= */
        // Snap section to top on entry (Aggressive pull-in)
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "top top",
          snap: {
            snapTo: (value) => (value > 0.15 ? 1 : 0), // If > 15% visible, snap fully in
            duration: 0.6,
            delay: 0,
            ease: "power1.inOut",
          },
        });

        // Snap section away on exit
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => tl.scrollTrigger?.end ?? 0,
          end: () => (tl.scrollTrigger?.end ?? 0) + window.innerHeight,
          snap: {
            snapTo: [0, 1],
            duration: 0.6,
            delay: 0,
            ease: "power1.inOut",
          },
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      /* ================= MOBILE ================= */
      // Removed mobile logic from this component as it is handled by FtSectionMobile.tsx
      // This prevents redundant ScrollTriggers and snapping issues on mobile.
      // mm.add("(max-width: 767px)", () => { ... });
    }, containerRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [cards]);

  return (
    <div className="relative w-full">
      <div ref={mobileTriggerRef} />

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "100vh" }}
      >
        {cards.map((card, index) => {
          const initialClip =
            index === 0
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)";

          return (
            <React.Fragment key={card.id}>
              {/* ================= VIDEO ================= */}
              <div
                ref={(el) => { videoRefs.current[index] = el; }}
                className="absolute inset-0 w-full h-full z-0"
                style={{ clipPath: initialClip, zIndex: index }}
              >
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

              {/* ================= CARD ================= */}
              <div
                ref={(el) => { cardRefs.current[index] = el; }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center md:justify-end md:pr-[5%] lg:pr-[8%] xl:pr-[10%]"
                style={{ clipPath: initialClip, zIndex: 10 + index }}
              >
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
                    flex flex-col justify-start
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
                    <h3 className="text-4xl md:text-4xl lg:text-4xl lg2:text-5xl font-theSeasons mb-1">
                      {useSafeSpecialCharacters(card.title)}
                    </h3>
                    {card.title2 && (
                      <h3 className="text-4xl md:text-4xl lg:text-4xl lg2:text-5xl font-theSeasons mb-2">
                        {card.title2}
                      </h3>
                    )}
                    {card.subtitle && (
                      <p className="text-xs md:text-sm lg:text-lg opacity-90">
                        {card.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}