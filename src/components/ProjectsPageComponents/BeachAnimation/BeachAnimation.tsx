"use client"
import { Mute, UnMute } from "@/components/Icons/Icons";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BeachAnimation = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isInView, setIsInView] = useState(true);

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
      if (!hasScrolled) setHasScrolled(true);

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const inView = rect.bottom > 0 && rect.top < windowHeight;
        setIsInView(inView);

        if (videoRef.current && isMuted && !inView) {
          videoRef.current.muted = !inView;
          setIsMuted(!inView);
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
    <div className="h-[200vh] absolute w-full" ref={sectionRef}>
      <video
        className="w-full h-full object-cover hidden md:block"
        ref={videoRef}
        loop
        playsInline
        autoPlay
        muted={isMuted}
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FBeach.mp4?alt=media&token=f42e9fa8-9137-4fca-ad6d-3cd53ef384ee"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#e6ddd6] via-transparent to-transparent" />
      {isInView && (
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
      )}
    </div>
  );
};

export default BeachAnimation;
