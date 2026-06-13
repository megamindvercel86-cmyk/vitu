"use client";

import { MuteVilasam, UnMuteVilasam } from "@/components/Icons/Icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactFormModal from "@/components/Common/FormModal/FormModal";

const VilasamHeroSection = () => {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };
  const [isFixed, setIsFixed] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Run scroll logic for all screens to handle play/pause
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setIsFixed(rect.bottom > windowHeight);
        const isInView = rect.bottom > 0 && rect.top < windowHeight;

        // Play/Pause video based on visibility
        const activeVideo = isDesktop
          ? desktopVideoRef.current
          : mobileVideoRef.current;

        if (activeVideo) {
          if (isInView) {
            if (activeVideo.paused) {
              activeVideo.play().catch(() => {
                // Handle autoplay prevention if needed
              });
            }
          } else {
            if (!activeVideo.paused) {
              activeVideo.pause();
            }
            // Mute when scrolled past
            if (rect.bottom <= 0) {
              setIsMuted(true);
            }
          }
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
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] md:h-[120vh] lg:h-[120vh] lg2:h-[150vh] xl:h-[150vh]  flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Background Swiper with Overlay */}
      <div className="absolute inset-0 scale-1">
        <video
          ref={desktopVideoRef}
          className="w-full h-full object-cover hidden md:block"
          loop
          playsInline
          autoPlay
          muted={isMuted}
          poster="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2Fimage.png?alt=media&token=50905517-237f-40e6-bc40-0d55a6cddfc8"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FEntrance_1.mp4?alt=media&token=c0e465ca-97e8-487e-a2d5-40ab9f1160e6"
            type="video/mp4"
          />
        </video>
        <video
          ref={mobileVideoRef}
          className="w-full h-full object-cover md:hidden block"
          loop
          playsInline
          autoPlay
          muted={isMuted}
          poster="/images/vilasamPageImages/locationAdvantageImages/mobileImage2.webp"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FEntrance%20Mobile_1.mp4?alt=media&token=75103fd4-9722-4875-84e8-c86a22d4fc5d"
            type="video/mp4"
          />
        </video>
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-black/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[40px] md:h-[200px] bg-gradient-to-t from-white via-white/85 via-50% to-transparent z-[10] md:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-[50px] md:h-[200px] bg-gradient-to-t from-white via-transparent to-transparent z-[10] hidden md:block" />

        <div className="absolute bottom-0 left-0 right-0 h-[50px] lg:h-[200px] bg-gradient-to-b from-transparent to-white opacity-2000"></div>
        <div
          className={`${isDesktop && isFixed ? "fixed" : "absolute"} bottom-36 right-0 lg:bottom-2  md:right-20 w-full p-4 flex flex-row lg:justify-end ${isMuted ? "justify-center" : "justify-end"
            }  z-[1] transition-all duration-300`}
        >
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <motion.button
                layout="preserve-aspect"
                className={`inline-flex items-center justify-center px-3 lg:px-5 py-1.5 text-[19px] text-[#0C3E49] rounded-full lg:rounded-[30px] ${isMuted ? "bg-white/60" : "bg-white"
                  } cursor-pointer transition-colors duration-300 hover:shadow-md`}
                aria-label={isMuted ? "Unmute" : "Mute"}
                transition={{
                  layout: {
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
              >
                {isMuted ? <UnMuteVilasam /> : <MuteVilasam />}
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
                      className="ml-2  text-sm whitespace-nowrap overflow-hidden"
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
      <div
        className={`absolute flex bottom-20   lg2:bottom-60  items-center justify-center sm:justify-between gap-3 pl-8 pr-3 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md animate-fadeIn`}
      >
        <div className="font-medium text-[#0C3E49] text-sm lg2:text-[26px] xl:text-[32px] md:text-lg font-theSeasons">Bookings Open Soon</div>
        <button
          aria-label="Show your Interest"
          onClick={() => setIsModalOpen(true)}
          className="px-6 lg2:px-10 py-2 text-sm lg2:text-[26px] xl:text-[32px] lg2:py-5 bg-[#0C3E49] md:text-lg font-theSeasons text-white rounded-full transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
        >
          Show your Interest
        </button>
      </div>
      {/* Main Content */}
      <div className="absolute top-[180px] md:top-44 lg2:top-60 lg:top-36  mx-auto text-white px-4 z-10">
        <h1 className="text-4xl  md:text-5xl lg:text-5xl lg2:text-[76px] xl:text-[100px] leading-none font-theSeasons text-[#F5F5F7]">
          Homes that <br />
          Breathe with you
        </h1>
        <p className="lg2:text-2xl lg:text-xl md:text-xl text-lg font-medium mt-5 font-ttCommons">
          <span className="font-CandideCondensedNormal">24</span> Limited Edition Luxury Villa Plots
        </p>
      </div>
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        collectionName="vilasam"
        thankYouRoute="/vilasam/thank-you"
      />
    </section>
  );
};

export default VilasamHeroSection;
