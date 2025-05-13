"use client";
import CTAButtonIcon, { Mute, UnMute } from "@/components/Icons/Icons";
import React, { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
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

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);
  return (
    <section ref={sectionRef} className="relative w-full  h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen  flex flex-col justify-center items-center text-center px-4 overflow-hidden">
    {/* Background Swiper with Overlay */}
    <div className="absolute inset-0 scale-1">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        playsInline
        // onTimeUpdate={handleTimeUpdate}
        autoPlay
        muted={isMuted}
        // priority
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FPark_1.mp4?alt=media&token=bc3a294b-a25c-4f28-b662-6f2202c0b1b9"
          type="video/mp4"
        />
      </video>
     
      <div className={`${isFixed ? 'fixed' : 'absolute'} bottom-3 right-0 lg:bottom-2  lg2:right-20 w-full p-4 flex flex-row justify-end z-50 transition-all duration-300`}>
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <button
                className={`w-full text-[#0C3E49] rounded-full lg:rounded-[30px] text-[19px] py-1.5 px-2 lg:px-5 ${!isMuted ? "bg-white" : "bg-white/60"} h-full cursor-pointer flex items-center justify-center transition-all duration-300`}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {!isMuted ? <Mute /> : <UnMute />}
                <span className="ml-2 hidden text-sm lg:block">Site contains Audio Elements</span>
              </button>
            </div>
          </div>
        </div>
    </div>
    {/* Main Content */}
    <div className="relative flex h-full justify-center top-[10rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[23.375rem]">
      <div className="flex flex-col items-center text-center text-white">
        <h1
          id="hero-heading"
          className="font-freightNeoSemibold leading-relaxed md:leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]"
        >
          Building Wholesome <br />
          Living Spaces
        </h1>
        <Link to="storysection" smooth={true} duration={700}>
            <div className="relative group cursor-pointer">
              <button
                type="button"
                className="
      relative group
      mt-8
      flex items-center justify-center
      gap-[0.6875rem]
      rounded-full
      pl-[0.5rem] 2xl:pl-[1rem] pr-[0.125rem] py-[0.1875rem]
      text-base font-freightNeoMedium text-white
      2xl:pt-4 2xl:pb-4 2xl:pr-4 2xl:text-[2rem]
      overflow-hidden
    "
              >
                {/* Default background */}
                <div className="absolute inset-0 bg-[#815C46] rounded-full"></div>

                {/* Hover effect starts from the icon */}
                <div className="relative  flex items-center justify-center w-[2rem] h-[2rem]">
                  {/* Expanding hover background from icon */}
                  <div
                    className="
          absolute w-0 h-0 bg-[#614130] rounded-full
          group-hover:w-[30rem] group-hover:h-[30rem]
          transition-all duration-[1000ms] ease-out
        "
                  ></div>

                  {/* Icon stays above the expanding background */}
                  <div className="relative ">
                    <CTAButtonIcon fill="#614130" />
                  </div>
                </div>

                {/* Button text (z-20 to keep it visible above the hover effect) */}
                <span className="relative  mr-4 mt-[2px] md:mt-0">{ABOUT_HERO_CONFIG.cta.text}</span>
              </button>
            </div>
          </Link>
      </div>
    </div>
  </section>
  );
};

export default AboutHeroSection;
