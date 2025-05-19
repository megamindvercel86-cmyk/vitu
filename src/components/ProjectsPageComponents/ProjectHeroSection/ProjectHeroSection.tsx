"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButtonIcon, { Mute, UnMute } from "@/components/Icons/Icons";
import backgroundImage from "../../../../public/images/backgroundImages/projectPageBackground.png";
import ProjectHeader from "../ProjectsHeader/ProjectsHeader";
import ProjectCarousel from "../ProjectCarousels/ProjectCarousels";
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
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="hero" className=" w-full h-[220vh] lg:h-[320vh]   xl:h-[290vh] overflow-hidden">
      {/* Parallax Layers */}
      <audio ref={audioRef} src="/Beach.mp3" loop  />

      <div className="layer absolute top-0 left-0 w-full h-full  " style={{ zIndex: 0 }} data-depth="0.50">
        <Image src={backgroundImage} alt="Background Layer" fill className="object-contain" placeholder="blur" />
      </div>
      <div className="layer absolute top-0 left-0 w-full h-full " style={{ zIndex: 0 }} data-depth="0.70">
        <Image src={backgroundImage} alt="Midground Layer" fill className="object-cover" placeholder="blur" />
      </div>
      <div className="layer absolute top-0 left-0 w-full h-full " style={{ zIndex: 0 }} data-depth="0.70">
        <Image src={backgroundImage} alt="Foreground Layer" fill className="object-cover" placeholder="blur" />
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center lg2:top-[20rem] md:top-[30vh] top-[30vh]  text-white">
        {/* Main Title */}
        <h1
          className={`
            font-freightNeoSemibold
            leading-none
            text-[2rem] sm:text-[2rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]
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
            text-[2rem] sm:text-[2rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]
          `}
        >
          {ABOUT_HERO_CONFIG.titles.sub}
        </h1>
        <h1
          className={`
    font-freightNeoMedium
    leading-none
    pt-0 md:pt-[1rem]
    lg2:text-2xl
    text-md
    px-10
    
    text-center
  `}
        >
          Discover <span className="font-CandideCondensedMedium">21,587</span> SqM of Luxuriously Affordable Coastal Bliss
        </h1>

        {/* CTA Button */}
        <Link to="carousal" smooth={true} duration={700}>
          {/* ================================================== */}

          <div className="relative group cursor-pointer">
            <button
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
      <div className="absolute   inset-0 flex flex-col items-center xl:top-[65rem] lg2:top-[55rem] md:top-[45rem] top-[30rem]  text-center px-6">
        <ProjectHeader />
      </div>
      <div
        id="carousal"
        className="lg:pt-20  absolute overflow-hidden  inset-0 flex flex-col items-center lg2:top-[70rem] xl:top-[100rem]  md:top-[70rem] top-[100vh] text-center  px-6"
      >
        <ProjectCarousel />
      </div>
      <div className="absolute top-1/3  lg2:right-10 w-full p-4 flex flex-row justify-end">
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <button
                className={`w-full text-[#0C3E49] rounded-full lg:rounded-[30px] text-[19px] py-1.5 px-2 lg:px-5 ${!isMuted ? "bg-white" : "bg-white/60"} h-full cursor-pointer flex items-center justify-center`}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {!isMuted ? <Mute /> : <UnMute />}
                <span className="ml-2 hidden text-sm lg:block">Site contains Audio Elements</span>
              </button>
            </div>
          </div>
        </div>
    </section>
  );
};

export default ProjectHeroSection;
