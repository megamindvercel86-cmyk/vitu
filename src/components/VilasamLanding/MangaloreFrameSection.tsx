"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function MangaloreFrameSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Create a snap point when the fixed section should become active
            // Use the spacer div in the page as the trigger point (it's added in the page component)
            // We need to find it after a small delay to ensure DOM is ready
            const findAndSetupSnap = () => {
                const spacerElement = sectionRef.current?.nextElementSibling as HTMLElement;

                if (spacerElement) {
                    ScrollTrigger.create({
                        id: "mangalore-frame-snap",
                        trigger: spacerElement,
                        start: "top top",
                        end: "bottom top",
                        snap: {
                            snapTo: (progress: number) => {
                                progress = gsap.utils.clamp(0, 1, progress);

                                const trigger = ScrollTrigger.getById("mangalore-frame-snap");
                                const velocity = trigger?.getVelocity() || 0;
                                const scrollingDown = velocity > 0;

                                // Snap based on velocity and position
                                // If velocity is low (stopped/slow), use strictly 50% threshold
                                // If velocity is high, let momentum guide the snap
                                if (Math.abs(velocity) < 20) {
                                    return Math.round(progress);
                                }

                                const SNAP_THRESHOLD = 0.15;

                                if (scrollingDown) {
                                    return progress >= SNAP_THRESHOLD ? 1 : 0;
                                } else {
                                    return progress <= (1 - SNAP_THRESHOLD) ? 0 : 1;
                                }
                            },
                            duration: 1.2,
                            ease: "power2.inOut",
                        },
                    });
                } else {
                    // Retry if spacer not found (component might mount before page structure is complete)
                    setTimeout(findAndSetupSnap, 100);
                }
            };

            findAndSetupSnap();
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={sectionRef} className="fixed inset-0 w-full h-full z-[-1]">
            {/* Content Wrapper */}
            <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full">
                        <Image
                            src="/vilasamImages/basicImages/9.webp"
                            alt="Mangalore Airport"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10" />

                {/* Text Overlay */}
                <div className="absolute top-[25%] right-6 md:right-12 lg:right-20 text-white text-right z-20 flex flex-col items-end">
                    <h2 className="font-theSeasons text-6xl md:text-7xl lg:text-9xl  drop-shadow-md">
                        Mangalore
                    </h2>
                    <span className="text-sm md:text-[22px] font-normal -mt-3  opacity-90 drop-shadow-sm">
                        in the frame of tomorrow
                    </span>
                </div>
            </div>
        </section>
    );
}
