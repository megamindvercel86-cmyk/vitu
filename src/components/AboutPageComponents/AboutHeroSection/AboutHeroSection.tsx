import CTAButtonIcon from "@/components/Icons/Icons";
import React from "react";

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
  backgroundImage: "/images/backgroundImages/aboutPageBackgroundImageDesktop.png",
  titles: {
    main: "Building Wholesome",
    sub: "Living Spaces",
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
const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative w-full">
      {/* Hero Background Section */}
      <div className={`
        relative
        h-[35.5rem] sm:h-[35.5rem] lg:h-[64.125rem] xl:h-[67.5rem] 2xl:h-screen
      `}>
        {/* Background Image with Overlay */}
        <div
          className={`
            absolute inset-0
            bg-cover bg-center
          `}
          style={{
            backgroundImage: `url("${ABOUT_HERO_CONFIG.backgroundImage}")`,
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className={`
          relative
          flex h-full justify-center
          top-[9.8125rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[34.375rem]
        `}>
          {/* Text and CTA Container */}
          <div className={`
            flex flex-col items-center
            text-center text-white
          `}>
            {/* Main Title */}
            <h1 className={`
              font-freightNeoSemibold
              leading-none
              text-[2rem]  sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] 2xl:text-[9.375rem]
            `}>
              {ABOUT_HERO_CONFIG.titles.main}
            </h1>
            
            {/* Sub Title */}
            <h1 className={`
              font-freightNeoSemibold
              leading-none
              pt-0 md:pt-[1.75rem]
              sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] 2xl:text-[9.375rem]
            `}>
              {ABOUT_HERO_CONFIG.titles.sub}
            </h1>

            {/* CTA Button */}
            <button
              type="button"
              className={`
                mt-8
                flex items-center justify-center
                gap-[0.6875rem]
                rounded-full
                bg-[#815C46]
                pl-[1.125rem] pr-[0.0625rem] py-[0.1875rem]
                text-base font-freightNeoMedium text-white
                2xl:pt-4 2xl:pb-4 2xl:pr-4 2xl:text-[2rem]
              `}
              onClick={(): void => console.log("Button clicked")}
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

export default AboutHeroSection;
