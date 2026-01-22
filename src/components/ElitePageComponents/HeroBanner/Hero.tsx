"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import gsap from "gsap";

// Core Imports
import { useRef, useState, useEffect } from "react";
import { motion} from "framer-motion";

// Types & Interfaces
interface VideoRef extends HTMLVideoElement {}
interface SectionRef extends HTMLDivElement {}

function HalfCircleBorderTwoSides() {
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pathRef.current) {
      // Reset before animating
      gsap.set(pathRef.current, { strokeDasharray: 800, strokeDashoffset: 800 });

      // Animate SVG path
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        delay: 5,
      });
    }

    if (textRef.current) {
      const letters = textRef.current.querySelectorAll("span");

      // Animate letters from left to right
      gsap.fromTo(
        letters,
        { opacity: 0, x: -20 }, // start from left
        {
          opacity: 1,
          x: 0, // move to normal position
          duration: 1,
          ease: "power2.out",
          delay: 5, // sync with SVG
          stagger: 0.15, // each letter comes one after another
        }
      );
    }
  }, []);

  return (
    <div className="flex relative w-[90%] items-center justify-center">
      <svg width="510" height="255" viewBox="0 0 510 255" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          d="M1.00003 255C1.00004 114.72 114.72 0.999981 255 0.999993C395.28 1.00001 509 114.72 509 255"
          stroke="url(#paint0_linear_49_10047)"
        />

        <defs>
          <linearGradient id="paint0_linear_49_10047" x1="255" y1="255" x2="255" y2="0.999993" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text with spans for each letter */}
      <div ref={textRef} className="absolute md:hidden flex justify-center flex-col font-FreightNeoProNormal font-normal text-xl lg:text-[28px] text-white  ">
        <div className="scroll-text tracking-wider">
          {"SCROLL DOWN".split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  herobg,
  herobgMobile,
  leftAlign = false,
  objectPosition = "",
}: {
  herobg: StaticImport;
  herobgMobile: StaticImport;
  leftAlign?: boolean;
  objectPosition?: string;
}) {
  const desktopVideoRef = useRef<VideoRef | null>(null);
  const mobileVideoRef = useRef<VideoRef | null>(null);
  const sectionRef = useRef<SectionRef | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(true);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [canPlayVideo, setCanPlayVideo] = useState<boolean>(false);

  /**
   * Toggles mute state for the video
   */
 const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowScrollButton(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    const videoEl = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (videoEl) {
      const newMuted = !videoEl.muted;
      videoEl.muted = newMuted;
      setIsMuted(newMuted);

      if (!newMuted && !hasScrolled && !isDesktop) {
        setHasScrolled(true);
      }
    }
  };

  /**
   * Checks screen size to determine desktop or mobile view
   */
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /**
   * Lazy-loads video when section is in viewport
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setCanPlayVideo(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /**
   * Handles scroll events to manage video mute state and button positioning
   */
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!hasScrolled) setHasScrolled(true);
          const videoEl = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;

          if (sectionRef.current && videoEl) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            setIsFixed(rect.bottom > windowHeight);
            const isInView = rect.bottom > 0 && rect.top < windowHeight;

            if (!isInView && !videoEl.muted) {
              videoEl.muted = true;
              setIsMuted(true);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] sm:h-[35.5rem] lg:h-[100vh] xl:h-[100vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden "
    >
      {/* Video Background */}
      <div className="absolute inset-0 scale-1">
        {canPlayVideo && (
          <>
            <video ref={desktopVideoRef} className="w-full h-full object-cover hidden md:block" loop autoPlay playsInline muted={isMuted}>
              <source
                src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/ELITE%20Final!!!yaku.mp4?alt=media&token=f7f68c5b-2c4d-4cf7-942c-d02ce49ed7ab"
                type="video/mp4"
              />
            </video>
            <video ref={mobileVideoRef} className="w-full h-full object-cover md:hidden block" loop autoPlay playsInline muted={isMuted}>
              <source
                src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/ELITE%20Final!!!yaku.mp4?alt=media&token=f7f68c5b-2c4d-4cf7-942c-d02ce49ed7ab"
                type="video/mp4"
              />
            </video>
          </>
        )}
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 h-[] to-transparent" />
      {/* Animated Half Circle Border */}
      {/* <div  className="absolute z-50 text-white bottom-5">
        <button onClick={toggleMute} className="border cursor-pointer border-white px-4 py-2 text-[10px] font-FreightNeoProNormal font-normal rounded-full ">{isMuted?"TURN ON SOUND":"TURN OFF SOUND"}</button>
      </div> */}
      <div className="absolute z-30 h-[100vh] sm:h-[35.5rem] lg:h-[100vh] xl:h-[100vh] 2xl:h-screen items-end inset-x-0 flex justify-center">
        <HalfCircleBorderTwoSides />
      </div>
     {showScrollButton&& <motion.div
      className="absolute bottom-0 z-50 pb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 1 }}
    >
        <div className="hidden md:flex w-10 h-14 border-2 border-white rounded-full items-start justify-center relative">
          <div className="w-1 h-3.5 bg-white rounded-full animate-scroll"></div>
        </div>
      </motion.div>}

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateY(4px);
            opacity: 1;
          }
          50% {
            transform: translateY(16px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(4px);
            opacity: 1;
          }
        }
        .animate-scroll {
          animation: scroll 3s ease-in-out infinite;
        }
          
      `}</style>
    </section>
  );
}
