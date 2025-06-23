"use client";
import CTAButtonIcon, { Mute, UnMute } from "@/components/Icons/Icons";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

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

const AboutHeroSection: React.FC = () => {
  const videoRefDesktop = useRef<HTMLVideoElement | null>(null);
  const videoRefMobile = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [videoInView, setVideoInView] = useState(false);

  const toggleMute = () => {
    const video = isDesktop ? videoRefDesktop.current : videoRefMobile.current;
    if (video) {
      const newMutedState = !video.muted;
      video.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState && window.innerWidth < 1024 && !hasScrolled) {
        setHasScrolled(true);
      }
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

        setIsFixed(rect.bottom > windowHeight);
        const isInView = rect.bottom > 0 && rect.top < windowHeight;

        const video = isDesktop ? videoRefDesktop.current : videoRefMobile.current;
        if (video && !isInView) {
          video.muted = true;
          setIsMuted(true);
        }
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
  }, [hasScrolled, isDesktop]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVideoInView(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 scale-1">
        {videoInView && (
          <>
            <video
              ref={videoRefDesktop}
              className="w-full h-full object-cover hidden md:block"
              loop
              playsInline
              autoPlay
              muted={isMuted}
              preload="none"
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FNew%20Park.mp4?alt=media&token=f929985d-9e84-42f3-9d1d-d34ec4739bc4"
                type="video/mp4"
              />
            </video>
            <video
              ref={videoRefMobile}
              className="w-full h-full object-cover md:hidden block"
              loop
              playsInline
              autoPlay
              muted={isMuted}
              preload="none"
            >
              <source
                src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FNew%20Park%20Mobile.mp4?alt=media&token=c68a011e-d781-4b5e-8d2d-879f4fa74e81"
                type="video/mp4"
              />
            </video>
          </>
        )}

        <div
          className={`${isDesktop && isFixed ? "fixed" : "absolute"} bottom-2 right-0 lg:bottom-2 md:right-20 w-full p-4 flex flex-row ${
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

      <div className="relative flex h-full justify-center top-[10rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[23.375rem]">
        <div className="flex flex-col items-center text-center text-white">
          <h1
            id="hero-heading"
            className="font-freightNeoSemibold leading-[1.1] md:leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]"
          >
            Building Wholesome <br />
            Living Spaces
          </h1>
          <Link to="storysection" smooth={true} duration={700}>
            <div className="relative group cursor-pointer">
              <button
                aria-label="Discover our Vision"
                type="button"
                className="relative group mt-8 flex items-center justify-center gap-[0.6875rem] rounded-full pl-[0.5rem] 2xl:pl-[1rem] pr-[0.125rem] py-[0.1875rem] text-base font-freightNeoMedium text-white 2xl:pt-4 2xl:pb-4 2xl:pr-4 2xl:text-[2rem] overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#815C46] rounded-full"></div>
                <div className="relative flex items-center justify-center w-[2rem] h-[2rem]">
                  <div className="absolute w-0 h-0 bg-[#614130] rounded-full group-hover:w-[30rem] group-hover:h-[30rem] transition-all duration-[1000ms] ease-out"></div>
                  <div className="relative">
                    <CTAButtonIcon fill="#614130" />
                  </div>
                </div>
                <span className="relative mr-4 mt-[2px] md:mt-0">{ABOUT_HERO_CONFIG.cta.text}</span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
