"use client";

import { Mute, UnMute } from "@/components/Icons/Icons";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false); // 🆕 New state

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) setHasScrolled(true); // ✅ Mark first scroll

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isInView = rect.bottom > 0 && rect.top < windowHeight;

        if (videoRef.current && isMuted && !isInView) {
          videoRef.current.muted = !isInView;
          setIsMuted(!isInView);
        }

        setIsFixed(rect.bottom > windowHeight);
      }
    };

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
  }, [hasScrolled, isMuted]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 scale-1">
        <video
          ref={videoRef}
          className="w-full h-full object-cover hidden md:block"
          loop
          playsInline
          autoPlay
          muted={isMuted}
        >
          <source
            src="https://res.cloudinary.com/dvandhsai/video/upload/v1749536647/New_Image_4_erfmty.mp4"
            type="video/mp4"
          />
        </video>
        <video
          ref={videoRef}
          className="w-full h-full object-cover md:hidden block"
          loop
          playsInline
          autoPlay
          muted={isMuted}
        >
          <source
            src="https://res.cloudinary.com/dvandhsai/video/upload/v1749536697/New_Image_Mobile_2_n0i9mm.mp4"
            type="video/mp4"
          />
        </video>

        {/* 🔁 Updated: Center initially, then move right after scroll starts */}
        <div
          className={`${
            isDesktop && isFixed ? "fixed" : "absolute"
          } bottom-2 right-0 lg:bottom-2 md:right-20 w-full p-4 flex flex-row ${
            hasScrolled ? "justify-end" : "justify-center"
          } lg:justify-end z-[1] transition-all duration-300`}
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
      </div>
      {/* Main Heading */}
      <div className="relative flex h-full justify-center mt-[9rem] lg:mt-[12rem] xl:mt-[19rem] 2xl:mt-[12rem]">
        <div className="flex flex-col items-center text-center text-white">
          <h1
            id="hero-heading"
            className="font-freightNeoSemibold leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[5.25rem] 2xl:text-[9.375rem]"
          >
            Building Wholesome <br />
            Living Spaces
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
