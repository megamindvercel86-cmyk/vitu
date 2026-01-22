"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// CHANGE 1: Import ScrollToPlugin to allow smooth scrolling via buttons
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// CHANGE 1: Register the plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const formatText = (text: string) => {
  if (!text) return text;
  const parts = text.split(/([0-9]+|[+\-&%()/’'])/g);
  return parts.map((part, index) => {
    if (part.match(/^([0-9]+|[+\-&%()/’'])$/)) {
      return (
        <span key={index} className="font-CandideCondensedNormal">
          {part}
        </span>
      );
    }
    return part;
  });
};

export interface WellnessSectionItem {
  id: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface WellnessLifestyleSectionProps {
  sectionData: WellnessSectionItem[];
}

export default function WellnessLifestyleSection({ sectionData }: WellnessLifestyleSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // CHANGE 2: Create a ref to store the GSAP timeline instance
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeId, setActiveId] = useState(sectionData[0]?.id || "");
  const [prevId, setPrevId] = useState(sectionData[0]?.id || "");

  const mobileHeroRef = useRef<HTMLDivElement>(null);
  const mobileHeroImageRef = useRef<HTMLDivElement>(null);

  // --- Mobile Parallax Scroll ---
  useEffect(() => {
    if (!mobileHeroRef.current || !mobileHeroImageRef.current) return;
    const mm = gsap.matchMedia();
    let ctx: gsap.Context;

    mm.add("(max-width: 767px)", () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          mobileHeroImageRef.current,
          { scale: 1 },
          {
            scale: 1.4,
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: mobileHeroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      ctx && ctx.revert();
      mm.revert();
    };
  }, []);

  // --- Desktop Scroll Animation ---
  useEffect(() => {
    if (!containerRef.current || !leftPanelRef.current || !rightPanelRef.current || !bgRef.current) return;

    let ctx: gsap.Context;
    let mm = gsap.matchMedia();
    let entryTrigger: ScrollTrigger | null = null;

    mm.add("(min-width: 768px)", () => {
      ctx = gsap.context(() => {
        // ... Entry Snap Logic (unchanged) ...
        entryTrigger = ScrollTrigger.create({
          id: "wellness-lifestyle-entry",
          trigger: containerRef.current!,
          start: "top bottom",
          end: "top top",
          snap: {
            snapTo: (progress: number, self?: ScrollTrigger) => {
              progress = gsap.utils.clamp(0, 1, progress);
              const threshold = 0.2;
              const velocity = self?.getVelocity?.() ?? 0;
              const scrollingDown = velocity > 0;
              if (scrollingDown) return progress >= threshold ? 1 : 0;
              return progress <= (1 - threshold) ? 0 : 1;
            },
            duration: 0.7,
            ease: "power2.inOut",
          },
        });

        // Timeline Setup
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "wellness-lifestyle",
            trigger: containerRef.current,
            start: "top top",
            end: "+=1000%",
            scrub: true,
            pin: true,
            snap: {
              snapTo: (progress: number) => {
                const snapPoints = [0, 0.2, 0.4, 0.6, 0.8, 1];
                return gsap.utils.snap(snapPoints, progress);
              },
              duration: 0.5,
              delay: 0.1,
              ease: "power2.out"
            },
            onUpdate: (self) => {
              const p = self.progress;
              let index = 0;
              
              // Map progress to section index
              if (p < 0.2) index = 0;
              else if (p < 0.3) index = 0;
              else if (p < 0.5) index = 1;
              else if (p < 0.7) index = 2;
              else index = 3;

              index = Math.max(0, Math.min(sectionData.length - 1, index));

              setActiveId((prev) => {
                const newId = sectionData[index].id;
                return prev !== newId ? newId : prev;
              });
            }
          },
        });

        // CHANGE 3: Assign the created timeline to our ref so the buttons can access it
        timelineRef.current = tl;

        // Animations (unchanged)
        tl.fromTo(leftPanelRef.current, { yPercent: 100 }, { yPercent: 0, ease: "none", duration: 1 }, 0);
        tl.fromTo(rightPanelRef.current, { yPercent: -100 }, { yPercent: 0, ease: "none", duration: 1 }, 0);
        tl.to({}, { duration: 3 });
        tl.to(leftPanelRef.current, { clipPath: "inset(0 0 100% 0)", ease: "none", duration: 1 });
        tl.to(rightPanelRef.current, { clipPath: "inset(0 0 100% 0)", ease: "none", duration: 1 }, "<");
        tl.to(bgRef.current, { clipPath: "inset(0 0 100% 0)", ease: "none", duration: 1 }, "<");

      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
      if (entryTrigger) {
        entryTrigger.kill();
        entryTrigger = null;
      }
      mm.revert();
    };
  }, [sectionData]);

  // --- Content Switching Logic (Images) ---
  useEffect(() => {
    if (activeId === prevId || !imageContainerRef.current) return;
    if (window.innerWidth < 768) {
      setPrevId(activeId);
      return;
    }

    const activeData = sectionData.find(d => d.id === activeId);
    if (!activeData) return;

    const newImg = document.createElement("div");
    newImg.className = "absolute inset-0 z-10";
    newImg.style.clipPath = "inset(100% 0% 0% 0%)";
    newImg.innerHTML = `
      <img src="${activeData.imageSrc}" alt="${activeData.title}" class="w-full h-full object-cover object-center scale-60" />
    `;

    imageContainerRef.current.appendChild(newImg);

    gsap.to(newImg, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (imageContainerRef.current) {
          const children = imageContainerRef.current.children;
          while (children.length > 1) {
            imageContainerRef.current.removeChild(children[0]);
          }
        }
        setPrevId(activeId);
      }
    });

  }, [activeId, prevId, sectionData]);

  // CHANGE 4: Helper function to handle scrolling when clicking tabs
  const handleTabClick = (itemId: string, index: number) => {
    // Check if we are on Desktop (Timeline exists)
    if (window.innerWidth >= 768 && timelineRef.current && timelineRef.current.scrollTrigger) {
      const st = timelineRef.current.scrollTrigger;
      
      // Calculate the progress point for this specific section
      // 0.2 is the offset where content starts (Entrance takes 0.0 - 0.2)
      // 0.2 is the duration allocated per section in the timeline
      const targetProgress = 0.2 + (index * 0.2);
      
      // Calculate total scrollable distance of the pinned section
      const totalDistance = st.end - st.start;
      
      // Calculate the exact pixel position on the page
      const scrollPos = st.start + (totalDistance * targetProgress);

      // Scroll there smoothly. 
      // Note: We do NOT set activeId here manually. 
      // The scroll will trigger 'onUpdate' in the useEffect, which will set the activeId.
      gsap.to(window, {
        scrollTo: scrollPos,
        duration: 1,
        ease: "power2.out"
      });

    } else {
      // Mobile Behavior: Just switch the state immediately
      setActiveId(itemId);
    }
  };

  const activeData = sectionData.find(d => d.id === activeId) || sectionData[0];

  return (
    <>
      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:flex relative w-full h-screen overflow-hidden flex-col md:flex-row isolate z-10">
        
        {/* Background Layer */}
        <div ref={bgRef} className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/vilasamImages/basicImages/4.webp"
            alt="Vilasam Entrance"
            fill
            className="object-cover opacity-100"
            unoptimized
          />
          <div className="absolute bottom-10 right-6 md:right-12 lg:right-20 text-white text-right z-10">
            <h2 className="font-theSeasons text-6xl md:text-7xl lg:text-9xl ">Vilasam</h2>
            <span className="text-sm md:text-[22px] -mt-5 block">at a Glance</span>
          </div>
        </div>

        {/* Left Panel - Image Section */}
        <div ref={leftPanelRef} className="relative w-full md:w-1/2 h-full z-20 flex">
          <div ref={imageContainerRef} className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={sectionData[0].imageSrc}
                alt={sectionData[0].title}
                fill
                className="object-cover object-bottom"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Right Panel - Content Section */}
        <div
          style={{ background: 'radial-gradient(circle at center, #0F5B5B 0%, #024854 100%)' }}
          ref={rightPanelRef}
          className="relative w-full md:w-1/2 h-full text-white z-50 flex flex-col gap-10 justify-between p-8 md:px-20 pointer-events-auto"
        >
          {/* Interactive Menu */}
          <div className="flex flex-col items-end lg2:space-y-10 lg:spacey-6 md:space-y-5 mt-10 relative">
            {sectionData.map((item, index) => (
              <button
                key={item.id}
                // CHANGE 5: Use the new handleTabClick function
                onClick={() => handleTabClick(item.id, index)}
                className={`font-theSeasons text-right text-4xl md:text-4xl lg:text-5xl lg2:text-6xl cursor-pointer transition-all duration-300 outline-none pointer-events-auto ${
                  activeId === item.id
                    ? "opacity-100 scale-100 translate-x-[-10px]"
                    : "opacity-30 hover:opacity-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Description Text */}
          <div className="max-w-md pb-12 transition-opacity duration-500 min-h-[120px]">
            <p className="text-base md:text-md lg:text-md lg2:text-lg font-normal leading-tight text-gray-200">
              {formatText(activeData?.description || "")}
            </p>
          </div>
        </div>
      </div>

      {/* ================= MOBILE VIEW (UNCHANGED logic, but using new handler for consistency) ================= */}
      <div className="md:hidden relative w-full bg-[#024854]">
        <section ref={mobileHeroRef} className="sticky top-0 h-screen w-full overflow-hidden">
          <div ref={mobileHeroImageRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/vilasamImages/basicImages/mobile4.png"
              alt="Vilasam Background"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative top-[25%] z-10 h-full flex flex-col p-6 ">
            <h1 className="font-theSeasons text-6xl text-[#FFFAF6] leading-none ">Vilasam</h1>
            <span className="text-[#FFFAF6] text-sm font-normal block pl-2">at a Glance</span>
          </div>
        </section>

        <section className="relative z-20 bg-[#024854] px-3 pt-20">
          <div className="relative w-full h-[65vh] ">
            <Image
              src={activeData?.imageSrc || sectionData[0]?.imageSrc || ""}
              alt={activeData?.title || ""}
              fill
              className="object-cover transition-opacity duration-500"
              unoptimized
            />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#024854]/90 via-[#024854]/40 to-transparent pointer-events-none z-10" />

            {/* Tabs */}
            <div className="absolute bottom-6 left-0 w-full px-4 z-20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="flex justify-between w-full items-end gap-2">
                {sectionData.map((item, index) => (
                  <button
                    key={item.id}
                    // CHANGE 6: Updated Mobile click to use handler (defaults to basic state set)
                    onClick={() => handleTabClick(item.id, index)}
                    className="flex flex-col gap-2 flex-1 group"
                  >
                    <span
                      className={`uppercase text-[10px] tracking-widest font-medium transition-all text-center ${
                        activeId === item.id
                          ? "text-[#FFFAF6]"
                          : "text-[#FFFAF6]/50 group-hover:text-[#FFFAF6]/80"
                      }`}
                    >
                      {item.label}
                    </span>
                    <div className="w-full h-[2px] bg-[#FFFAF6]/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-white transition-all duration-500 ${
                          activeId === item.id ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-3 pt-8 pb-16 bg-[#024854] max-w-md">
            <h3 className="font-theSeasons text-3xl mb-4 text-[#E0E0E0]">{activeData?.title}</h3>
            <div className="text-[#FFFAF6] text-sm leading-tight ">
              {formatText(activeData?.description || "")}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
