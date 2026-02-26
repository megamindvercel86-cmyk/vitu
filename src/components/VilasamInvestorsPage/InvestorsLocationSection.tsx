"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
}

export default function InvestorsLocationSection({ title, locations, ctaLabel, ctaHref, mapImageSrc }: InvestorsLocationSectionProps) {
  if (!locations || locations.length === 0) return null;

  return (
    <section className="bg-white px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        {/* Mobile Title */}
        <h2 className="mb-5 text-center font-ttCommons text-[28px] font-semibold leading-tight text-[#2A2A2A] sm:text-[32px] md:hidden">{title}</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          {/* Left Side (Locations List & CTA) */}
          <div className="order-2 flex flex-col md:order-1 md:space-y-10">
            {/* Desktop Title */}
            <h2 className="hidden font-ttCommons text-[32px] font-semibold leading-tight text-[#2A2A2A] md:block md:text-[38px] lg:text-[42px]">
              {title}
            </h2>

            <div className="flex flex-col space-y-4 lg:space-y-6">
              {locations.map((loc) => (
                <div key={loc.id} className="flex flex-row items-center justify-between">
                  <span className="font-ttCommons text-[14px] font-medium text-[#7b7b7b] md:text-[15px] lg:text-[16px]">{loc.name}</span>
                  <span className="font-ttCommons text-[14px] font-bold text-[#7b7b7b] md:text-[16px] lg:text-[17px]">{loc.distance}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 md:pt-4 w-full">
              <Link
                href={ctaHref}
                className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943] md:w-auto md:h-12 md:px-10"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          {/* Right Side Map */}
          <div className="order-1 relative h-[260px] w-full overflow-hidden rounded-xl md:order-2 md:h-[400px] lg:h-[500px]">
            <Image src={mapImageSrc} alt={title} fill className="object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
