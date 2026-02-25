"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function InvestorsStickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the sticky CTA after scrolling down a bit
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 z-50 w-full transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "translate-y-full"
                }`}
        >
            <div className="bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-8 lg:px-12">

                    <div className="flex items-center">
                        <h3 className="font-ttCommons text-[16px] font-bold text-[#222] underline decoration-[#0066cc] decoration-2 underline-offset-4 md:text-[18px]">
                            Book a Site Visit Today
                        </h3>
                    </div>

                    <button
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex h-10 items-center justify-center rounded-[4px] bg-[#0a5a56] px-6 font-ttCommons text-[14px] font-semibold text-white transition hover:bg-[#084943] md:h-11 md:px-8"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
