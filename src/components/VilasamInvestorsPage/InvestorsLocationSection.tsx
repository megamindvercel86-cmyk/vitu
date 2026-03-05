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
            <div className="mt-4 flex flex-row items-center gap-2">
              <a
                href="https://www.google.com/maps/place/Vilasam+by+VITU+Realty/@13.0084459,74.7985919,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba353f36865457b:0x5b7c3104c03bd7f0!8m2!3d13.0084407!4d74.8011668!16s%2Fg%2F11xg5lg3zj?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                className="mb-4 flex items-center gap-2 justify-center font-medium text-[14px] md:text-[15px] text-[#666666]"
              >
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.51304 20.2C8.51304 20.2 16.0261 13.5217 16.0261 8.51304C16.0261 4.3637 12.6624 1 8.51304 1C4.3637 1 1 4.3637 1 8.51304C1 13.5217 8.51304 20.2 8.51304 20.2Z" stroke="#064747" strokeWidth="2" />
                  <path d="M10.9134 8.20015C10.9134 9.52563 9.83883 10.6002 8.51335 10.6002C7.18787 10.6002 6.11335 9.52563 6.11335 8.20015C6.11335 6.87467 7.18787 5.80015 8.51335 5.80015C9.83883 5.80015 10.9134 6.87467 10.9134 8.20015Z" stroke="#064747" strokeWidth="2" />
                </svg>

                Munchoor, Surathkal, Mangalore
              </a>
            </div>
            <div className="flex flex-col space-y-4 lg:space-y-6">
              {locations.map((loc) => (
                <div key={loc.id} className="flex flex-row items-center justify-between">
                  <span className="font-ttCommons text-[14px] font-medium text-[#666666] md:text-[15px] lg:text-[16px]">{loc.name}</span>
                  <span className="font-ttCommons text-[14px] font-bold text-[#666666] md:text-[16px] lg:text-[17px]">{loc.distance}</span>
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
            <Image src={mapImageSrc} alt={title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-center h-full hidden md:block" />
            <Image src={mapImageSrcMobile} alt={title} fill sizes="100vw" className="object-cover h-full md:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
