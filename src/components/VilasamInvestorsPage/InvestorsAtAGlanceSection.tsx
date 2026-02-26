"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface GlanceItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  imageSrc: string;
}

export interface InvestorsAtAGlanceSectionProps {
  title: string;
  items: GlanceItem[];
}

export default function InvestorsAtAGlanceSection({ title, items }: InvestorsAtAGlanceSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Changing active slide every 3 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <section className="bg-[#FBFBFB] px-5 pt-8 md:px-8 md:pt-16 lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        {/* Mobile Title */}
        <h2 className="mb-5 font-ttCommons text-[26px] font-semibold leading-tight text-[#2A2A2A] sm:text-[28px] md:hidden">{title}</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr] md:items-center md:gap-14 lg:gap-24">
          {/* Left Side Navigation */}
          <div className="order-2 flex flex-col md:order-1 md:space-y-10">
            {/* Desktop Title */}
            <h2 className="hidden font-ttCommons text-[32px] font-semibold leading-tight text-[#2A2A2A] md:block md:text-[38px] lg:text-[44px]">
              {title}
            </h2>

            <div className="flex flex-col">
              {items.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-4 border-b border-[#E2E2E2] py-4 transition-colors last:border-b-0 ${
                      isActive ? "text-[#064747]" : "text-[#999999] hover:text-[#555]"
                    }`}
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      <div
                        className={`flex h-7 w-7 items-center justify-center transition-all ${isActive ? "opacity-100 text-[#064747]" : "opacity-60 text-[#999999]"}`}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <span
                      className={`font-ttCommons text-[15px] font-bold text-left transition-all md:text-[24px] ${
                        isActive ? "font-bold text-[#064747]" : "font-medium text-[#999999]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side Image Carousel */}
          <div className="order-1 relative h-[320px] w-full overflow-hidden rounded-[16px] md:order-2 md:h-[480px] lg:h-[660px]">
            {items.map((item, index) => (
              <Image
                key={item.id}
                src={item.imageSrc}
                alt={item.label}
                fill
                priority={index === 0}
                className={`object-cover object-[center_65%] transition-opacity duration-1000 ease-in-out ${
                  index === activeIndex ? "opacity-100 relative z-10" : "opacity-0 absolute inset-0 z-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
