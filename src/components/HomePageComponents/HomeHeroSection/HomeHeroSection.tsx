"use client";

import { Mute, UnMute } from "@/components/Icons/Icons";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  const [isFixed, setIsFixed] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Only apply scroll logic on larger screens (e.g., md and above)
    // if (window.innerWidth < 768) return;

    const handleScroll = () => {
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
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Background Swiper with Overlay */}
      <div className="absolute inset-0 scale-1">
        <video ref={videoRef} className="w-full h-full object-cover hidden md:block" loop playsInline autoPlay muted={isMuted}>
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FNew%20Image.mp4?alt=media&token=051f18f4-32b1-4d0a-9234-182e88ecde64"
            type="video/mp4"
          />
        </video>
        <video ref={videoRef} className="w-full h-full object-cover md:hidden block" loop playsInline autoPlay muted={isMuted}>
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FNew%20Image%20Mobile.mp4?alt=media&token=4a2c622d-4e49-4d77-b28b-9da897928095"
            type="video/mp4"
          />
        </video>
        <div
          className={`${
            isDesktop && isFixed ? "fixed" : "absolute"
          } bottom-2 right-0 lg:bottom-2 md:right-20 w-full p-4 flex flex-row justify-center lg:justify-end z-[1] transition-all duration-300`}
        >
          <div className="flex gap-4">
            <div className="cursor-pointer " onClick={toggleMute}>
              <motion.button
                layout="preserve-aspect"
                className={`inline-flex items-center justify-center px-3 lg:px-5 py-1.5 text-[19px] text-[#0C3E49] rounded-full lg:rounded-[30px] ${
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
      {/* Main Content */}
      <div className="relative flex h-full justify-center top-[10rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[23.375rem]">
        <div className="flex flex-col items-center text-center text-white">
          <h1
            id="hero-heading"
            className="font-freightNeoSemibold leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]"
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
