"use client";

// Core Imports
import { Mute, UnMute } from "@/components/Icons/Icons";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types & Interfaces
interface VideoRef extends HTMLVideoElement {}
interface SectionRef extends HTMLDivElement {}

/**
 * Hero section component with video background and mute/unmute functionality
 * @returns JSX.Element
 */
export default function HeroSection() {
  // State and Refs
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
    const handleScroll = () => {
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[35.5rem] sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 scale-1">
        {canPlayVideo && (
          <>
            <video
              ref={desktopVideoRef}
              className="w-full h-full object-cover hidden md:block"
              loop
              autoPlay
              playsInline
              muted={isMuted}
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FHomeDeskTop.mp4?alt=media&token=78a75591-b32a-4e25-897e-c2e876b53af6"
                type="video/mp4"
              />
            </video>
            <video
              ref={mobileVideoRef}
              className="w-full h-full object-cover md:hidden block"
              loop
              autoPlay
              playsInline
              muted={isMuted}
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FHomeMobile.mp4?alt=media&token=42e9c62b-871f-4c98-bb55-b2fb86d0c2ee"
                type="video/mp4"
              />
            </video>
          </>
        )}

        {/* Mute/Unmute Button */}
        <div
          className={`${isDesktop && isFixed ? "fixed" : "absolute"} bottom-2 right-0 lg:bottom-2 md:right-20 w-full p-4 flex flex-row ${
            hasScrolled ? "justify-end" : "justify-center"
          } lg:justify-end z-[1] transition-all duration-300`}
        >
          <div className="cursor-pointer" onClick={toggleMute}>
            <motion.button
              className={`inline-flex items-center justify-center px-3 lg:px-5 py-1.5 text-[19px] text-[#4F3737] rounded-full lg:rounded-[30px] ${
                isMuted ? "bg-white/60" : "bg-white"
              } transition-colors duration-300 hover:shadow-md`}
              aria-label={isMuted ? "Unmute" : "Mute"}
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
                        width: { duration: 0.4 },
                        opacity: { duration: 0.3, delay: 0.1 },
                      },
                    }}
                    exit={{
                      width: 0,
                      opacity: 0,
                      transition: { duration: 0.2 },
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

      {/* Hero Content */}
      <div className="relative flex h-full justify-center mt-[9rem] lg:mt-[12rem] xl:mt-[19rem] 2xl:mt-[12rem]">
        <div className="flex flex-col items-center text-center text-white">
          <h1 className="font-freightNeoSemibold leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[5.25rem] 2xl:text-[9.375rem]">
            Building Wholesome <br /> Living Spaces
          </h1>
        </div>
      </div>
    </section>
  );
}