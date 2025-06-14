"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButtonIcon, { Mute, UnMute } from "@/components/Icons/Icons";
import backgroundImage from "../../../../public/images/vilasamImages/herobanner.webp";
import ProjectHeader from "../ProjectsHeader/ProjectsHeader";
import ProjectCarousel from "../ProjectCarousels/ProjectCarousels";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isFixed, setIsFixed] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Change to absolute when the section is about to leave the viewport
        setIsFixed(rect.bottom > windowHeight);
        const isInView = rect.bottom > 0 && rect.top < windowHeight;

        // Mute video when section is not in view
        if (audioRef.current) {
          audioRef.current.muted = !isInView;
          setIsMuted(!isInView);
        }
      }
    };

    // Add throttling to improve performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);
  return (
    <section
      id="hero"
      className="relative w-full h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Parallax Layers */}
      <audio ref={audioRef} src="/Beach.mp3" loop />

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
      <div className="absolute inset-0 flex flex-col items-center xl:top-[65rem] lg2:top-[55rem] md:top-[45rem] top-[100vh] h-auto  text-center px-6">
     
      </div>
      {/* <div
        
        className="absolute overflow-hidden  inset-0 flex flex-col items-center lg2:top-[70rem] xl:top-[80rem]  md:top-[70rem] top-[130vh] text-center  px-6"
      >
        <ProjectCarousel />
      </div> */}
      {/* <div className="absolute top-1/3  lg2:right-10 righ w-full p-4 flex flex-row md:justify-end justify-center">
        <div
          className={`${isFixed ? "fixed" : "absolute"} bottom-3 right-0 lg:bottom-2  md:right-20 w-full p-4 flex flex-row lg:justify-end ${
            isMuted ? "justify-center" : "justify-end"
          }  z-[1] transition-all duration-300`}
        >
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <motion.button
                layout="preserve-aspect"
                className={`inline-flex items-center justify-center px-3 lg:px-5 py-1.5 text-[19px] text-[#4F3737] rounded-full lg:rounded-[30px] ${
                  isMuted ? "bg-white/60" : "bg-white"
                } cursor-pointer transition-colors duration-300 hover:shadow-md`}
                aria-label={isMuted ? "Unmute" : "Mute"}
                transition={{
                  layout: {
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
              >
                {isMuted ? <UnMute /> : <Mute />}
                <AnimatePresence mode="wait">
                  {isMuted && isFixed && (
                    <motion.span
                      key="audio-text"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{
                        width: "auto",
                        opacity: 1,
                        transition: {
                          width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.3, delay: 0.1 },
                        },
                      }}
                      exit={{
                        width: 0,
                        opacity: 0,
                        transition: {
                          width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                    >
                      Site contains Audio Elements
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default ProjectHeroSection;
