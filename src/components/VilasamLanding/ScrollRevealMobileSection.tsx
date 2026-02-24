"use client"

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Import Autoplay
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { AnimatedConicButton } from "../ui/moving-border";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";

export interface SwiperImage {
  src: string;
  alt: string;
}

interface ScrollRevealMobileSectionProps {
  // Define any props if needed in the future
  mobtitle1?: string;
  mobtitle2?: string;
  mobsubtitle1?: string;
  mobsubtitle2?: string;
  mobiledesc1?: string;
  ft1num?: string;
  ft2num?: string;
  ft3num?: string;
  ft1?: string;
  ft2?: string;
  ft3?: string;
  ft1desc?: string;
  ft2desc?: string;
  ft3desc?: string;
  swiperImages?: SwiperImage[];

  onEnquireClick?: () => void;
}

export default function ScrollRevealMobileSection({
  mobtitle1,
  mobtitle2,
  mobsubtitle1,
  mobsubtitle2,
  mobiledesc1,
  ft1num,
  ft2num,
  ft3num,
  ft1,
  ft2,
  ft3,
  ft1desc,
  ft2desc,
  ft3desc,
  swiperImages = [
    { src: "/vilasamImages/basicImages/mobileSwiper1.png", alt: "Building Perspective Top" },
    { src: "/vilasamImages/basicImages/mobileSwiper2.png", alt: "Building Perspective Bottom" }
  ],
  onEnquireClick
}: ScrollRevealMobileSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const AUTOPLAY_DELAY = 1800;

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
            y: 30,
            opacity: 0
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            opacity: 1,
            duration: 2,
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
      style={{ background: 'radial-gradient(circle at center, #0F5B5B 0%, #024854 100%)' }}
      className="w-full md:hidden pb-12"
    > {/* Dark green bg fallback */}

      {/* SECTION 1: "Premium Living" (Image with Overlay Text) */}
      <div className="relative w-full h-[100vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/vilasamImages/basicImages/newmobileHero.png"
            alt="Premium Building"
            fill
            className="object-cover object-bottom"
            priority
          />
          {/* Gradient overlay for better text readability if needed, though design looks clean */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent opacity-60" />
        </div>

        {/* Text Overlay */}
        <div className="absolute top-[20%] left-6 right-6 z-10 text-[#FFFAF6] max-w-md h-[70vh] flex flex-col justify-between items-start">
          <h2 ref={addToRefs} className="font-theSeasons text-[35px] leading-[1.1] mb-6">
            {safeSpecialCharacters(mobtitle1)} <br />
            {safeSpecialCharacters(mobtitle2)}
          </h2>

          <div
            className="inline-flex items-center justify-center gap-2 text-[#254C54] border-[0.25px] border-white/30 transition-colors duration-500 rounded-full text-sm font-medium">
            <AnimatedConicButton
              onClick={onEnquireClick}
              theme="vilasam-brochure-mobile"
              className="flex text-[#254C54] font-medium p-4 !bg-white transition-colors duration-300"
            >
              <span className="flex gap-2 items-center text-xs">
                DOWNLOAD E-BROCHURE
                <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2753 16.7061L16.2213 5.87717L5.39175 5.82251" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" />
                  <path d="M16.2195 5.87756L6.1459 15.9512" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" />
                </svg>
              </span>
            </AnimatedConicButton>
          </div>
        </div>

      </div>

      {/* SECTION 2: "Open the doors" (Dark Grid Layout) */}
      <div className="relative w-full  px-3 py-16 flex flex-col">
        {/* Heading */}
        <h2  className="font-theSeasons text-[36px] leading-[1.15] text-[#FFFAF6] mb-12">
          {mobsubtitle1} <br />
          {mobsubtitle2}
        </h2>

        {/* Image (Woman) - Positioned Right/Center */}
        <div className="self-end w-[75%] aspect-[4/5] relative mb-16">
          <Image
            src="/vilasamImages/basicImages/2.webp"
            alt="Woman in Water"
            fill
            className="object-cover"
          />
        </div>

        {/* Paragraph */}
        <p  className="text-[17px] leading-tight text-[#FFFAF6] opacity-90 pr-2">
          {mobiledesc1}
        </p>
      </div>

      {/* SECTION 3: Building Views (Swiper) */}
      <div className="relative w-full h-[65vh] px-3  ">
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
          {swiperImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover ${index === 1 ? 'object-bottom' : ''}`}
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Timer Lines - dynamic based on swiperImages length */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex gap-2 px-3">
          {swiperImages.map((_, index) => (
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
      <div className="h-6 "></div>

      <style jsx global>{`
        @keyframes progressFill {
            from { width: 0%; }
            to { width: 100%; }
        }
       `}</style>

      {/* ft section  */}
      {/* 
         <section
                ref={sectionRef}
                className="relative w-full text-white py-24 md:py-13 px-6 md:px-12 lg:px-20  overflow-hidden bg-none"
            >
              
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center text-center">
                        {/* Item 1 */}
      {/* <div ref={addToRefs} className="flex flex-col items-center ">
                            <h3 className="font-theSeasons text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight">
                                <span className="font-theSeasons">{ft1num}</span> {ft1}
                            </h3>
                            <p className="font-normal text-[10px] md:text-xs lg:text-lg   ">
                                {ft1desc}
                            </p>
                        </div> */}

      {/* Item 2 - Center */}
      {/* <div ref={addToRefs} className="flex flex-col items-center leading-none">
                            <h3 className="font-theSeasons text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2">
                                <span className="font-theSeasons">{ft2num}</span> {ft2}
                            </h3>
                            <h3 className="font-theSeasons text-4xl md:text-5xl lg:text-5xl tracking-tight  font-normal ">
                                {ft2desc}
                            </h3>
                        </div> */}

      {/* Item 3
                        <div ref={addToRefs} className="flex flex-col items-center ">
                            <h3 className="font-theSeasons text-4xl md:text-5xl lg:text-6xl leading-none tracking-wider">
                                <span className="font-theSeasons">{ft3num}</span>{ft3}
                            </h3>
                            <p className="font-normal text-[10px] md:text-xs lg:text-lg   ">
                                {ft3desc}
                            </p>
                        </div>
                    </div>
                </div>

            </section> */}




    </section>
  );
}
