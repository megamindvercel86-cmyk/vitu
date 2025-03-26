"use client";

import { useEffect, useRef } from "react";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backgroundImage from "../../../../public/images/backgroundImages/projectPageBackground.png";
// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Update hero config with layered images
const HERO_CONFIG = {
  images: {
    background: "/images/imageLayers/layer.png",
    middle: "/images/imageLayers/layer.png",
    foreground: "/images/imageLayers/layer.png",
  },
  titles: {
    main: "Building Wholesome",
    sub: "Living Spaces",
  },
  description: "We create thoughtfully designed spaces that blend modern aesthetics with lasting quality in Mangalore.",
  tagline: "Where Modern Design Meets Enduring Quality",
};

/**
 * Home Hero Section Component
 * Optimized for SEO and Core Web Vitals
 */
export default function HomeHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const background = backgroundRef.current;
    const middle = middleRef.current;
    const foreground = foregroundRef.current;

    if (!container || !background || !middle || !foreground) return;

    // Create parallax effect
    gsap.to(background, {
      yPercent: 80,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(middle, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.8
      }
    });

    gsap.to(foreground, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.5
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section aria-labelledby="hero-heading">
      {/* Hero Background Section */}
      <div 
        ref={containerRef}
        className="relative h-[35.5rem] sm:h-[35.5rem] lg:h-[100vh] lg2:h-[100vh] xl:h-[100vh] 2xl:h-screen overflow-hidden"
      >
        {/* Background Layer */}
        <div ref={backgroundRef} className="absolute inset-0 scale-1">
          <Image
            src={HERO_CONFIG.images.background}
            alt="Background scenery"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* Middle Layer */}
        <div ref={middleRef} className="absolute inset-0 scale-">
          <Image
            src={HERO_CONFIG.images.middle}
            alt="Middle layer elements"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* Foreground Layer */}
        <div ref={foregroundRef} className="absolute inset-0 scale">
          <Image
            src={HERO_CONFIG.images.foreground}
            alt="Foreground elements"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* Hero Content */}
        <div className="relative flex h-full justify-center top-[12.8125rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[23.375rem]">
          <div className="flex flex-col items-center text-center text-white">
            <h1 
              id="hero-heading"
              className="font-freightNeoSemibold leading-relaxed md:leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]"
            >
              {HERO_CONFIG.titles.main}
              <span className="sr-only"> in Mangalore</span>
            </h1>
            <h2 className="font-freightNeoSemibold leading-none text-[2.3rem] pt-0 sm:text-[2rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]">
              {HERO_CONFIG.titles.sub}
            </h2>
          </div>
        </div>
      </div>

      {/* Description Section with Semantic HTML */}
      <article className="px-[1.875rem] pb-[3.75rem] pt-[4rem] text-center sm:px-[1.875rem] sm:pt-[4rem] md:pb-[6.9375rem] md:pt-[5.25rem] lg:pt-[6.5rem] xl:px-[24.125rem] xl:pt-[8rem]">
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-[#040707CC] text-[1rem] px-7 pb-6 sm:text-[1.375rem] md:px-0 md:text-[1.3rem] 2xl:text-[2.125rem]"
        >
          {HERO_CONFIG.description}
        </Typography>
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-customBrown text-[1.5rem] px-7 sm:text-[1.5rem] md:px-0 md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem]"
          aria-level={3}
        >
          {HERO_CONFIG.tagline}
        </Typography>
      </article>
    </section>
  );
}