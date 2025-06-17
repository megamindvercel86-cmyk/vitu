"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButtonIcon from "@/components/Icons/Icons";
import { Link } from "react-scroll";
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
    <section
      id="hero"
      className="relative w-full h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center lg2:top-[20rem] md:top-[30vh] top-[30vh]  text-white">
        {/* Main Title */}
        <h1
          className={`
            font-freightNeoSemibold
            leading-none
            text-[2.2rem] sm:text-[2rem] md:text-[3.75rem] lg2:text-[6.25rem]  2xl:text-[9.375rem]
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
            text-[2.2rem] sm:text-[2rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]
          `}
        >
          {ABOUT_HERO_CONFIG.titles.sub}
        </h1>
        <h1
          className={`
    font-freightNeoMedium
    leading-none
    pt-4 md:pt-[1rem]
    lg2:text-2xl
    text-xl
    md:px-10
    
    text-center
  `}
        >
          Discover <span className="font-CandideCondensedMedium">3,74,284</span> SqM of Luxuriously Affordable Coastal Bliss
        </h1>

        {/* CTA Button */}
        <Link to="carousal" smooth={true} duration={700}>
          {/* ================================================== */}

          <div className="relative group cursor-pointer">
            <button
              aria-label="Scroll to Learn More"
              type="button"
              className="
      relative group
      mt-8
      flex items-center justify-center
      gap-[0.6875rem]
      rounded-full
      pl-[10px] pr-[1rem] py-[0.1875rem]  /* Increased right padding */
      text-base font-freightNeoMedium text-white
      2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]  /* Adjusted for larger screens */
      overflow-hidden
    "
            >
              {/* Default background */}
              <div className="absolute inset-0 bg-[#A0BCAE] rounded-full"></div>

              {/* Hover effect starts from the icon */}
              <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
                {/* Expanding hover background */}
                <div
                  className="
          absolute w-0 h-0 bg-[#4B9480] rounded-full
          group-hover:w-[30rem] group-hover:h-[30rem]
          transition-all duration-500 ease-out
        "
                ></div>

                {/* Icon stays above the expanding background */}
                <div className="relative z-20">
                  <CTAButtonIcon fill="#4B9480" />
                </div>
              </div>

              {/* Button text (added margin-right for spacing) */}
              <span className="relative z-20 mt-[2px] md:mt-0 ">Scroll to Learn More</span>
            </button>
          </div>

          {/* ============================================================ */}
        </Link>
      </div>
      <div className="absolute inset-0 flex flex-col items-center xl:top-[65rem] lg2:top-[55rem] md:top-[45rem] top-[100vh] h-auto  text-center px-6"></div>
    </section>
  );
};

export default ProjectHeroSection;
