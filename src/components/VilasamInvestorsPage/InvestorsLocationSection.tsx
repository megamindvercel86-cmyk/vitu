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

export default function InvestorsLocationSection({
    title,
    locations,
    ctaLabel,
    ctaHref,
    mapImageSrc,
}: InvestorsLocationSectionProps) {
    if (!locations || locations.length === 0) return null;

    return (
        <section className="bg-white px-5 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">

                    {/* Left Side */}
                    <div className="flex flex-col space-y-8 md:space-y-10">
                        <h2 className="font-ttCommons text-[32px] font-bold leading-tight text-[#222] md:text-[38px] lg:text-[42px]">
                            {title}
                        </h2>

                        <div className="flex flex-col space-y-5 lg:space-y-6">
                            {locations.map((loc) => (
                                <div key={loc.id} className="flex flex-row items-center justify-between">
                                    <span className="font-ttCommons text-[14px] font-medium text-[#999999] md:text-[15px] lg:text-[16px]">
                                        {loc.name}
                                    </span>
                                    <span className="font-ttCommons text-[15px] font-bold text-[#999999] md:text-[16px] lg:text-[17px]">
                                        {loc.distance}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 md:pt-4">
                            <Link
                                href={ctaHref}
                                className="inline-flex h-11 items-center justify-center rounded-md bg-[#0a5a56] px-8 font-ttCommons text-[14px] font-semibold text-white transition hover:bg-[#084943] md:h-12 md:px-10"
                            >
                                {ctaLabel}
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Map */}
                    <div className="relative h-[280px] w-full overflow-hidden rounded-2xl md:h-[400px] lg:h-[500px]">
                        <Image
                            src={mapImageSrc}
                            alt={title}
                            fill
                            className="object-cover object-center"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
