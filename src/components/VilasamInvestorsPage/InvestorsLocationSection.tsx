"use client";

import React from "react";
import Image from "next/image";

export interface LocationItem {
  id: string;
  name: string;
  distance: string;
}

export interface InvestorsLocationSectionProps {
  title: string;
  locations: LocationItem[];
  ctaLabel: string;
  ctaHref: string;
  mapImageSrc: string;
  mapImageSrcMobile: string;
}

export default function InvestorsLocationSection({
  title,
  locations,
  ctaLabel,
  ctaHref,
  mapImageSrc,
  mapImageSrcMobile,
}: InvestorsLocationSectionProps) {
  if (!locations || locations.length === 0) return null;

  return (
    <section className="bg-white px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        {/* Mobile Title */}
        <h2 className="mb-5 text-center font-ttCommons text-[28px] font-semibold leading-tight text-[#2A2A2A] sm:text-[32px] md:hidden">{title}</h2>

        {/* UPDATED: Changed md:items-center to md:items-stretch so both columns share the same height */}
        <div className="grid grid-cols-1 gap-8  lg:items-stretch  lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          {/* Left Side (Locations List & CTA) */}
          {/* UPDATED: Added py-8 md:py-12 lg:py-24 to add bulk to the content side */}
          <div className="order-2 flex flex-col justify-center py-4 md:order-1 md:py-12 lg:py-10 md:space-y-10">
            {/* Desktop Title */}
            <h2 className="hidden font-ttCommons text-[32px] font-semibold leading-tight text-[#2A2A2A] md:block md:text-[38px] lg:text-[42px]">
              {title}
            </h2>

            <div className="flex flex-col space-y-4 lg:space-y-6">
              {locations.map((loc) => (
                <div key={loc.id} className="flex flex-row items-center justify-between">
                  <span className="font-ttCommons text-[14px] font-medium text-[#999999] md:text-[15px] lg:text-[16px]">{loc.name}</span>
                  <span className="font-ttCommons text-[14px] font-bold text-[#999999] md:text-[16px] lg:text-[17px]">{loc.distance}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 w-full md:pt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-investors-modal"));
                }}
                className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943] md:h-12 md:w-auto md:px-10"
              >
                {ctaLabel}
              </button>
            </div>
          </div>

          {/* Right Side Map */}
          {/* UPDATED: h-[350px] for mobile, then md:h-full to stretch exactly to the content's height */}
          <div className="order-1 relative min-h-[350px] w-full overflow-hidden rounded-xl lg:order-2 lg:h-full">
            <Image src={mapImageSrc} alt={title} fill className="object-cover object-center h-full hidden md:block" />
            <Image src={mapImageSrcMobile} alt={title} fill className="object-cover h-full  md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
