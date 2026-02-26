"use client";

import React from "react";

export interface StatItem {
    id: string;
    value: string;
    label: string;
    layoutClasses: string;
}

export interface InvestorsStatsSectionProps {
    stats: StatItem[];
}

export default function InvestorsStatsSection({ stats }: InvestorsStatsSectionProps) {
    if (!stats || stats.length === 0) return null;

    return (
        <section className="bg-[#FBFBFB] px-6 py-10 md:px-12 md:py-20 lg:px-20 lg:py-24">
            <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-36 xl:gap-56">
                    {stats.map((stat) => (
                        <div
                            key={stat.id}
                            className={`flex flex-col items-center justify-center rounded-[8px] sm:rounded-[12px] bg-gradient-to-br from-[#478E88] to-[#256B6E] py-8 lg:py-20 px-4 sm:px-6 text-center text-white shadow-lg ${stat.layoutClasses}`}
                        >
                            <h3 className="font-ttCommons text-5xl font-bold leading-none sm:text-6xl md:text-7xl">
                                {stat.value}
                            </h3>
                            <p className="mt-3 font-ttCommons text-sm font-medium tracking-wide sm:text-base md:text-lg">   
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
