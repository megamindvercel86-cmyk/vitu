"use client";
import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";
import React from "react";
import backgroundImage from "../../../../public/images/backgroundImages/prjectBg1.jpg";
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
    main: "Discover LuxuriousCoastal Living",
    sub: "at Vaikuntam City",
  },
  cta: {
    text: "Discover our Vision",
  },
};

/**
 * About Hero Section Component
 * Main landing section of the about page
 *
 * Features:
 * 1. Full-width background image with gradient overlay
 * 2. Centered main titles
 * 3. CTA button with icon
 * 4. Responsive design for all screen sizes
 */

const ProjectHeroSection: React.FC = () => {
  return (
    <section className="relative w-full">
      {/* Hero Background Section */}
      <div
        className={`
        relative
        h-[35.5rem] sm:h-[35.5rem] lg:h-[64.125rem] xl:h-screen 2xl:h-screen
      `}
      >
        <Image
          src={backgroundImage}
          alt="Home Hero Background"
          fill
          className="object-cover"
          placeholder="blur"
        />
        {/* Hero Content */}
        <div
          className={`
          relative
          flex h-full justify-center
          top-[9.8125rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[16.4375rem] 2xl:top-[34.375rem]
        `}
        >
          {/* Text and CTA Container */}
          <div
            className={`
            flex flex-col items-center
            text-center text-white
          `}
          >
            {/* Main Title */}
            <h1
              className={`
              font-freightNeoSemibold
              leading-none
              text-[2rem]  sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] 2xl:text-[9.375rem]
            `}
            >
              {ABOUT_HERO_CONFIG.titles.main}
            </h1>

            {/* Sub Title */}
            <h1
              className={`
              font-freightNeoSemibold
              leading-none
              pt-0 md:pt-[1.75rem]
             text-[2rem] sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] 2xl:text-[9.375rem]
            `}
            >
              {ABOUT_HERO_CONFIG.titles.sub}
            </h1>

            {/* CTA Button */}
            <button
              type="button"
              className={`
        mt-80
        flex items-center justify-center
        gap-[0.6875rem]
        rounded-full
        bg-[#815C46]
        pl-[1.125rem] pr-[0.0625rem] py-[0.1875rem]
        text-base font-freightNeoMedium text-white
        2xl:pt-4 2xl:pb-4 2xl:pr-4 2xl:text-[2rem]
      `}
            >
              {ABOUT_HERO_CONFIG.cta.text}
              <CTAButtonIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHeroSection;
