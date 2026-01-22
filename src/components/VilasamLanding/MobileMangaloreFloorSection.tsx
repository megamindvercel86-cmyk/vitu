"use client";

import React, { useRef, useEffect, useState } from "react"; // Added useState
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react"; // Added Swiper imports
import { Pagination, Autoplay } from "swiper/modules"; // Added Swiper modules
import "swiper/css"; // Added Swiper styles
import "swiper/css/pagination";
import Link from "next/link";
import { AnimatedConicButton } from "../ui/moving-border";

gsap.registerPlugin(ScrollTrigger);

export default function MobileMangaloreFloorSection({ onEnquireClick }: { onEnquireClick?: () => void }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLImageElement>(null); // Ref for image specifically
    const heroTextRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0); // State for custom pagination
    const AUTOPLAY_DELAY = 1700;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Scroll Zoom Out Effect for Hero Image
            // We want the image to start slightly zoomed in and zoom out to normal (scale 1) as we scroll down
            gsap.fromTo(heroImageRef.current, 
                { scale: 1.2 }, // Start zoomed in
                {
                    scale: 1, // Zoom out to normal
                    ease: "none",
                    scrollTrigger: {
                         trigger: heroRef.current,
                         start: "top 40%",
                         end: "bottom center", // Adjust end point as needed
                         scrub: true,
                     
                    }
                }
            );

            // 2. Text Fade Out Slowly
             gsap.to(heroTextRef.current, {
                opacity: 0,
                y: -50, // Optional: move up slightly as it fades
                ease: "power2.in",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top", // Start fading as soon as scroll starts
                    end: "center top", // Finish fading by the time section is halfway up
                    scrub: true,
                }
             });

        }, heroRef); // Scope to hero section

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full bg-[#FFFAF6] overflow-hidden pb-4">
            {/* HER SECTION: Mangalore (Matches Image 3 style) */}
            <div ref={heroRef} className="relative h-[100vh] w-full overflow-hidden">
                 {/* Image Wrapper for Ref */}
                <div ref={heroImageRef as any} className="absolute inset-0 w-full h-full"> {/* Cast to any if TS complains about HTMLDivElement vs HTMLImageElement but ref is on div wrapper for safer scaling */}
                     <Image
                        src="/vilasamImages/basicImages/mobile9.png"
                        alt="Mangalore Airport"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />

                {/* Text Content */}
                <div ref={heroTextRef} className="absolute top-[25%] right-6 text-right z-20 flex flex-col items-end">
                     {/* "Mangalore" - mimicking the large "Design" text */}
                    <h2 className="font-theSeasons text-6xl text-[#FFFAF6]  leading-none">
                        Mangalore
                    </h2>
                     {/* "in the frame of tomorrow" - mimicking the "INSPIRED ARCHITECTURE" text */}
                    <p className="text-sm  text-[#FFFAF6]  mt-3 mr-1">
                        in the frame of tomorrow
                    </p>
                </div>
            </div>

            {/* CONTENT SECTION 1: Text Block (Matches Image 2 style) */}
            <div className="px-6 py-16 flex flex-col items-center text-center bg-[#FFFAF6]">
                <p className="text-xl text-[#254C54] leading-[1.1] ">
                    Mangalore International Airport Expansion and New Mangalore Port Upgradation are reshaping the city’s global outlook and enabling stronger connectivity.
                </p>
                <div 
                      className="inline-flex mt-10 items-center justify-center gap-2 text-[#254C54] border-[0.25px] border-[#254C54] transition-colors duration-500 rounded-full text-sm font-medium">
                    <AnimatedConicButton 
                        onClick={onEnquireClick}
                        theme="vilasam-brochure" 
                        className="flex !text-[#254C54] font-medium p-4"
                    >
                    <span className="flex gap-2 items-center text-xs">
                        DOWNLOAD E-BROCHURE
                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.2753 16.7061L16.2213 5.87717L5.39175 5.82251" stroke="#254C54" strokeWidth="2.5" strokeMiterlimit="10"/>
                            <path d="M16.2195 5.87756L6.1459 15.9512" stroke="#254C54" strokeWidth="2.5" strokeMiterlimit="10"/>
                        </svg>
                    </span>
                    </AnimatedConicButton>
                </div>
            </div>

            {/* IMAGES SECTION (Swiper) */}
            <div className="relative w-full h-[65vh] px-3 bg-[#FFFAF6] mb-12 ">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: AUTOPLAY_DELAY,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                    className="w-full h-full"
                >
                    {/* Image 11 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/vilasamImages/basicImages/new11.png"
                                alt="Building Perspective Top"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </SwiperSlide>

                    {/* Image 10 */}
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image
                                src="/vilasamImages/basicImages/10.webp"
                                alt="Building Perspective Bottom"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>

                 {/* Custom Timer Lines - 2 separate lines (Matches ScrollRevealMobileSection style) */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex gap-2 px-3">
                    {[0, 1].map((index) => (
                        <div key={index} className="h-[1px] flex-1 bg-black/20 relative overflow-hidden "> {/* Darker background for light theme */}
                            <div 
                                className={`absolute top-0 left-0 h-full bg-[#FFFAF6] transition-none`} // Dark Teal fill
                                style={{
                                    width: activeSlide > index ? '100%' : activeSlide === index ? '0%' : '0%', // Start state
                                    animation: activeSlide === index ? `progressFill ${AUTOPLAY_DELAY}ms linear forwards` : 'none',
                                    ...(activeSlide > index && { width: '100%' })
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
             <style jsx global>{`
                @keyframes progressFill {
                    from { width: 0%; }
                    to { width: 100%; }
                }
            `}</style>
           
        </div>
    );
}
