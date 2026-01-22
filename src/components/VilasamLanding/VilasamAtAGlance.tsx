"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        start: "2X Growth",
        end: "In the past 3 years",
    },
    {
        start: "3 Years",
        end: "Resale Flexibility",
        isCenter: true,
    },
    {
        start: "10X Growth",
        end: "in the future from SEZs, Port & Expressway",
    },
];

export default function VilasamAtAGlance() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                if (!item) return;

                gsap.fromTo(item,
                    {
                        autoAlpha: 1,
                        clipPath: "inset(100% 0% 0% 0%)",
                        y: 30
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%", // Start animation when item is near bottom of viewport
                            toggleActions: "play none none reverse"
                        },
                        delay: index * 0.2 // Stagger the revealed
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current.push(el);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full text-white py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
            style={{ background: 'radial-gradient(circle at center, #0F5B5B 0%, #024854 100%)' }}
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center text-center">
                    {/* Item 1 */}
                    <div ref={addToRefs} className="flex flex-col items-center gap-3">
                        <h3 className="font-theSeasons text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight">
                            <span className="font-CandideCondensedNormal">2</span>X Growth
                        </h3>
                        <p className="font-theSeasons font-light text-[10px] md:text-xs lg:text-sm tracking-widest opacity-60 uppercase">
                            In the past <span className="font-CandideCondensedNormal">3</span> years
                        </p>
                    </div>

                    {/* Item 2 - Center */}
                    <div ref={addToRefs} className="flex flex-col items-center leading-none">
                        <h3 className="font-theSeasons text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">
                            <span className="font-CandideCondensedNormal">3</span> Years
                        </h3>
                        <h3 className="font-theSeasons text-3xl md:text-4xl lg:text-5xl tracking-tight italic font-light opacity-80">
                            Resale Flexibility
                        </h3>
                    </div>

                    {/* Item 3 */}
                    <div ref={addToRefs} className="flex flex-col items-center gap-3">
                        <h3 className="font-theSeasons text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight">
                            <span className="font-CandideCondensedNormal">10</span>X Growth
                        </h3>
                        <p className="font-theSeasons font-light text-[10px] md:text-xs lg:text-sm tracking-wider opacity-60 max-w-[250px]">
                            in the future from SEZs, Port <span className="font-CandideCondensedNormal">&</span> Expressway
                        </p>
                    </div>
                </div>
            </div>

            {/* Section Label - Bottom Left */}
            <div className="absolute bottom-8 left-8 md:left-12 lg:left-20 opacity-30 select-none">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-light">Vilasam at a Glance</span>
            </div>
        </section>
    );
}
