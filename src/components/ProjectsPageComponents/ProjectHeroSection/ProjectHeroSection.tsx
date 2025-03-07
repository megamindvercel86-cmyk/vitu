"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButtonIcon from "@/components/Icons/Icons";
import backgroundImage from "../../../../public/images/backgroundImages/projectPageBackground.png";
import Typography from "@/components/Typography/Typography";
import ProjectHeader from "../ProjectsHeader/ProjectsHeader";
import ProjectCarousel from "../ProjectCarousels/ProjectCarousels";

// ============= Types =============
interface AboutHeroConfig {
  backgroundImage: string;
  titles: {
    main: string;
    sub: string;
  };
  cta: {
    text: string;
  };
}

// ============= Constants =============
const ABOUT_HERO_CONFIG: AboutHeroConfig = {
  backgroundImage: "/images/backgroundImages/prjectBg1.jpg",
  titles: {
    main: "Embrace the Serenity",
    sub: "of Coastal Living",
  },
  cta: {
    text: "Discover our Vision",
  },
};

/**
 * Project Hero Section Component
 * Main landing section with parallax scrolling effects
 *
 * Features:
 * 1. Multiple parallax background layers using GSAP
 * 2. Centered main titles and CTA button
 * 3. Responsive design for all screen sizes
 */
const ProjectHeroSection: React.FC = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top", // Animation starts when top of #hero hits top of viewport
        end: "bottom top", // Animation ends when bottom of #hero hits top of viewport
        scrub: true, // Links animation progress to scroll position
      },
    });

    // Animate each layer based on its data-depth
    gsap.utils.toArray(".layer").forEach((layer: any) => {
      const depth = parseFloat(layer.dataset.depth);
      const movement = -(layer.offsetHeight * depth); // Calculate movement based on depth
      tl.to(layer, { y: movement, ease: "none" }, 0); // Animate y position
    });
  }, []);

  return (
    <section id="hero" className="relative w-full h-[280vh] xl:h-[240vh] overflow-hidden">
      {/* Parallax Layers */}
      <div
        className="layer absolute top-0 left-0 w-full h-full z-[-1]"
        data-depth="0.50"
      >
        <Image
          src={backgroundImage}
          alt="Background Layer"
          fill
          className="object-contain"
          placeholder="blur"
        />
      </div>
      <div
        className="layer absolute top-0 left-0 w-full h-full z-[-1]"
        data-depth="0.70"
      >
        <Image
          src={backgroundImage}
          alt="Midground Layer"
          fill
          className="object-cover"
          placeholder="blur"
        />
      </div>
      <div
        className="layer absolute top-0 left-0 w-full h-full z-[-1]"
        data-depth="0.70"
      >
        <Image
          src={backgroundImage}
          alt="Foreground Layer"
          fill
          className="object-cover"
          placeholder="blur"
        />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center top-[20rem]  text-white">
        {/* Main Title */}
        <h1
          className={`
            font-freightNeoSemibold
            leading-none
            text-[2rem] sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] 2xl:text-[9.375rem]
          `}
        >
          {ABOUT_HERO_CONFIG.titles.main}
        </h1>

        {/* Sub Title */}
        <h1
          className={`
            font-freightNeoSemibold
            leading-none
            pt-0
            text-[2rem] sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] 2xl:text-[9.375rem]
          `}
        >
          {ABOUT_HERO_CONFIG.titles.sub}
        </h1>
        <h1
          className={`
    font-freightNeoMedium
    leading-none
    pt-0 md:pt-[1rem]
    lg:text-2xl
    text-md
    
    text-center
  `}
        >
          Discover <span className="font-CandideCondensedMedium">21,587</span>{" "}
          SqM of Luxuriously Affordable Coastal Bliss
        </h1>

        {/* CTA Button */}
        <div className="relative group cursor-pointer">
          <button
            type="button"
            className={`
      relative group
      mt-8
      flex items-center justify-center
      gap-[0.6875rem]
      rounded-full
      pl-[1.125rem] pr-[0.0625rem] py-[0.1875rem]
      text-base font-freightNeoMedium text-white
      2xl:pt-4 2xl:pb-4 2xl:pr-4 2xl:text-[2rem]
      overflow-hidden
    `}
            // onClick={onScrollToStory}
          >
            {/* Default background */}
            <div className="absolute inset-0 bg-[#A0BCAE] rounded-full"></div>

            {/* Hover background with transform from right */}

            {/* Button content */}
            <span className="relative z-10">Scroll to Learn More</span>
            <div className="absolute inset-0 bg-[#4B9480] rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 "></div>
            <CTAButtonIcon fill="#4B9480" />
          </button>
        </div>
      </div>
      <div className="absolute  inset-0 flex flex-col items-center xl:top-[65rem] lg:top-[55rem] top-[55rem] text-center px-6">
        <ProjectHeader />
      </div>
      <div className="absolute inset-0 flex flex-col items-center xl:top-[85rem] lg:top-[80rem] top-[100vh] text-center px-6">
        <ProjectCarousel />
      </div>
    </section>
  );
};

export default ProjectHeroSection;
