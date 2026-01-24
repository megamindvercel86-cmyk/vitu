"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { AnimatedConicButton } from "../ui/moving-border";
import NewEnquireModal from "./NewEnquireModal";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function FloorPerspectivesSection({ onEnquireClick }: { onEnquireClick?: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftImageRef = useRef<HTMLDivElement>(null);
    const rightImageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !leftImageRef.current || !rightImageRef.current || !textRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Timeline 1: Image Reveal (Pre-Pin)
            // Starts when section enters viewport, finishes when it hits top
            const tlImages = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // Start when top of section enters bottom of viewport
                    end: "top top",      // End when top of section hits top of viewport
                    scrub: 1,
                    snap: {
                        snapTo: 1, // Snap to end (section at top, images revealed)
                        duration: { min: 0.3, max: 0.6 },
                        delay: 0,
                        ease: "power1.inOut",
                    },
                },
            });

            // Left Image (Building): Reveal Top -> Bottom
            tlImages.fromTo(leftImageRef.current, {
                clipPath: "inset(0% 0% 100% 0%)",
            }, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1,
                ease: "linear" // Linear scrub matches scroll better
            }, 0);

            // Right Image (Building): Reveal Bottom -> Top
            tlImages.fromTo(rightImageRef.current, {
                clipPath: "inset(100% 0% 0% 0%)",
            }, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1,
                ease: "linear"
            }, 0);


            // Timeline 2: Text Reveal & Pin
            // Starts when section hits top
            let tlText: gsap.core.Timeline; // Declare variable first to use in callback

            // Calculate steps: Text Reveal (0-1.0) = 1 step (No closing step)
            const totalSteps = 1;

            tlText = gsap.timeline({
                scrollTrigger: {
                    id: "floor-perspectives",
                    trigger: containerRef.current,
                    start: "top top", // Pin starts at top
                    end: "+=100%",    // Reduce scroll distance since we only have one phase
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: (progress: number) => {
                            // Simple snap between 0 and 1
                            progress = gsap.utils.clamp(0, 1, progress);

                            const trigger = ScrollTrigger.getById("floor-perspectives");
                            const velocity = trigger?.getVelocity() || 0;
                            const scrollingDown = velocity > 0;

                            const SNAP_THRESHOLD = 0.10; // Reduced threshold for easier exit

                            if (scrollingDown) {
                                return progress >= SNAP_THRESHOLD ? 1 : 0;
                            } else {
                                return progress <= (1 - SNAP_THRESHOLD) ? 0 : 1;
                            }
                        },
                        duration: 0.8, // Faster snap
                        ease: "power1.inOut",
                    },
                },
            });

            // Text Reveal
            tlText.fromTo(textRef.current,
                { autoAlpha: 0, y: 20 },
                { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
                0
            );

            // Left Image: Move Top -> Bottom
            tlText.to(leftImageRef.current, {
                top: "100%",
                yPercent: -100, // Offset by its own height to sit at bottom
                duration: 1,
                ease: "power2.out"
            }, 0);

            // Right Image: Move Bottom -> Top
            tlText.to(rightImageRef.current, {
                bottom: "100%",
                yPercent: 100, // Offset by its own height to sit at top
                duration: 1,
                ease: "power2.out"
            }, 0);

            tlText.addLabel("revealed"); // Snap Point: Text revealed, Images swapped
            // End of timeline. No closing animation.

            // Additional snap at end of section (snaps to next section)
            ScrollTrigger.create({
                id: "floor-perspectives-end",
                trigger: containerRef.current,
                start: "bottom bottom", // Starts when pin ends (section fully legible)
                end: "bottom top",      // Ends when section is gone
                snap: {
                    snapTo: [0, 1], // Snap to start (visible) or end (gone)
                    duration: 0.8,
                    ease: "power1.inOut",
                    delay: 0,
                },
            });

        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#FFFAF6] z-10 overflow-hidden"
        >
            <div className="w-full h-full relative flex flex-col justify-center items-center">
                {/* Left Image - Bottom aligned visually (animates from top) */}
                <div
                    ref={leftImageRef}
                    className="absolute left-0 top-0 w-[40%] md:w-[25%] aspect-[3/4] z-10"
                >
                    <Image
                        src="/vilasamImages/basicImages/new11.png"
                        alt="Building Perspective Left"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                {/* Center Text - Starts Hidden */}
                <div ref={textRef} className="relative z-20 max-w-4xl mx-auto text-center perspective-text">
                    <h2 className="text-2xl md:text-xl lg:text-xl lg2:text-2xl text-[#254C54] leading-tight md:max-w-lg lg:max-w-xl lg2:max-w-2xl">
                        Mangalore International Airport Expansion and <br /> New Mangalore Port Upgradation are reshaping the city’s global outlook and enabling stronger connectivity.
                    </h2>


                    <div
                        className="inline-flex items-center justify-center gap-2 mt-10 text-[#254C54] border-[0.25px] border-[#254C54] transition-colors duration-500 rounded-full text-sm font-medium lg:text-md">
                        <AnimatedConicButton
                            onClick={onEnquireClick || (() => setIsModalOpen(true))}
                            theme="vilasam-brochure"
                            className="hidden !text-[#254C54] lg:font-medium md:flex p-6"
                        >
                            <span className="flex gap-2 items-center">
                                DOWNLOAD E-BROCHURE
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.2753 16.7061L16.2213 5.87717L5.39175 5.82251" stroke="#254C54" strokeWidth="2.5" strokeMiterlimit="10" />
                                    <path d="M16.2195 5.87756L6.1459 15.9512" stroke="#254C54" strokeWidth="2.5" strokeMiterlimit="10" />
                                </svg>

                            </span>
                        </AnimatedConicButton>
                    </div>
                </div>

                <NewEnquireModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                {/* Right Image - Top aligned visually (animates from bottom) */}
                <div
                    ref={rightImageRef}
                    className="absolute right-0 bottom-0 w-[40%] md:w-[25%] aspect-[3/4] z-10"
                >
                    <Image
                        src="/vilasamImages/basicImages/10.webp"
                        alt="Building Perspective Right"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

            </div>
            {/* Modal */}
            {/* {showModal && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <h3 className="text-lg font-semibold text-[#254C54] mb-3">Download E-Brochure</h3>

            <p className="text-sm text-gray-600 mb-4">
                Add any form or download link here.
            </p>

            <div className="flex justify-end gap-2">
                <button
                    className="px-4 py-2 text-sm border rounded-md"
                    onClick={() => setShowModal(false)}
                >
                    Close
                </button>

                <button
                    className="px-4 py-2 text-sm bg-[#254C54] text-white rounded-md"
                >
                    Download
                </button>
            </div>
        </div>
    </div>
)} */}

        </section>

    );
}
