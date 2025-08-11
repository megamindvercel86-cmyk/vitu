"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { motion, AnimatePresence, useInView } from "framer-motion";

const CAROUSEL_CONFIG = {
  autoplayInterval: 5000,
};

const PROGRESS_RADIUS = 22; // must match r attribute in SVG
const PROGRESS_CIRC = 2 * Math.PI * PROGRESS_RADIUS; // full circle length

export default function TheClub() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isPlay = isInView && !userPaused;

  const CAROUSEL_DATA = [
    {
      title: "The Epicentre of Leisure",
      description:
        " More than just a clubhouse, this is your gateway to a world of elevated experiences. From wellness spaces to intimate lounges and thoughtfully curated gatherings, every corner of The Club reflects a life well-lived. Membership is reserved for those who appreciate detail, privacy and the quiet confidence of belonging.",
      image: "/images/vaikuntamCityEliteLandingPage/club.webp",
      mobileImage: "/images/vaikuntamCityEliteLandingPage/club2.webp",
      id: 1,
    },
    {
      title: "20+ Amenities",
      description:
        "Step into a community where over 20 curated amenities create space for every passion and pace of life. From Mangalore’s first exclusive Pickleball Court to a fully equipped gym and swimming pool, wellness and recreation are always close to home.",
      image: "/images/vaikuntamCityEliteLandingPage/club22.webp",
      mobileImage: "/images/vaikuntamCityEliteLandingPage/club22.webp",
      id: 2,
    },
    {
      title: "Generations in Bloom",
      description:
        "In today’s fast-paced world, finding time for family isn’t always easy. At The Club, moments slow down so you can truly connect with the ones who matter. Every corner is designed for all generations to come together and make the most of their quality time. ",
      image: "/images/vaikuntamCityEliteLandingPage/club3.webp",
      mobileImage: "/images/vaikuntamCityEliteLandingPage/club33.webp",
      id: 3,
    },
  ];
  // No explicit effect to set play state; derive from in-view and user pause.

  // Single timing loop to keep slide changes and progress perfectly in sync
  useEffect(() => {
    // If resuming from pause, continue from the current progress position
    if (isPlay) {
      const resumedStart =
        Date.now() - (progress / 100) * CAROUSEL_CONFIG.autoplayInterval;
      startTimeRef.current = resumedStart;

      const tick = () => {
        if (startTimeRef.current == null) {
          startTimeRef.current = Date.now();
        }
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        const pct = Math.min(
          100,
          (elapsed / CAROUSEL_CONFIG.autoplayInterval) * 100
        );
        setProgress(pct);

        if (elapsed >= CAROUSEL_CONFIG.autoplayInterval) {
          setCurrentIndex((prevIndex) =>
            prevIndex === CAROUSEL_DATA.length - 1 ? 0 : prevIndex + 1
          );
          // reset cycle
          startTimeRef.current = now;
          setProgress(0);
        }
        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      };
    } else {
      // Paused: keep current progress, stop the loop
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      // Do not reset progress so resume can continue smoothly
      return;
    }
  }, [isPlay, CAROUSEL_DATA.length ]);

  return (
    <section
      className="bg-[#F3EAE1] relative xl:h-[80rem] md:h-[50rem] lg:h-[60rem] lg2:h-[70rem] 2xl:h-[150vh] overflow-hidden"
      ref={ref}
    >
      <div className="container h-full mx-auto lg:border-l lg:border-r border-[#1C1213] pt-20 lg:pt-24 xl:pt-40 lg:pb-60 relative z-50">
        <div className="space-y-3 lg:space-y-4 basis-[38%] px-12 max-w-[38rem]">
          <AnimatePresence mode="wait">
            <motion.p
              className="text-[#DAA37A] lg:text-lg uppercase font-FreightNeoProNormal"
              key={CAROUSEL_DATA[currentIndex].id + "-title"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              the club
            </motion.p>
            <motion.h2
              className="text-[32px] lg:text-[42px] lg2:text-5xl leading-[100%] text-[#37121A] font-FreightNeoProNormal"
              key={CAROUSEL_DATA[currentIndex].id + "-heading"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {CAROUSEL_DATA[currentIndex].title}
            </motion.h2>
            <motion.p
              className="text-[#37121A]/60 font-FreightNeoProNormal text-lg leading-[24px] text-justify text-pretty"
              key={CAROUSEL_DATA[currentIndex].id + "-description"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {CAROUSEL_DATA[currentIndex].description}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="md:hidden overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={CAROUSEL_DATA[currentIndex].id + "-image"}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className=""
            >
              <Image
                src={CAROUSEL_DATA[currentIndex].mobileImage}
                alt="The Club"
                width={1728}
                height={1788}
                className="w-full h-full object-cover object-center md:hidden"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute bottom-10 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-5 z-50 flex items-center gap-6">
          <div className="flex items-center gap-2 lg:gap-4  ">
            {CAROUSEL_DATA.map((item, index) => (
              <div
                onClick={() => {
                  setCurrentIndex(index);
                  setProgress(0);
                  startTimeRef.current = Date.now();
                }}
                key={`club-dot-${item.id}`}
                className={`h-[3px] w-7 cursor-pointer rounded-xl ${currentIndex === index ? "bg-white" : "bg-white/25"}`}
                role="button"
                aria-label={`Go to slide ${index + 1}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCurrentIndex(index);
                    setProgress(0);
                    startTimeRef.current = Date.now();
                  }
                }}
              />
            ))}
          </div>
          <div
            className="relative hidden lg:block lg:pe-5 pb-7 md:pb-0 md:pe-3 lg:pb-0 cursor-pointer w-fit"
            onClick={() => setUserPaused((p) => !p)}
          >
            <svg width="50" height="50" viewBox="0 0 50 50">
              {/* Background Circle */}
              <circle
                cx="25"
                cy="25"
                r={PROGRESS_RADIUS}
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />

              {/* Progress Circle */}
              <circle
                cx="25"
                cy="25"
                r={PROGRESS_RADIUS}
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                strokeDasharray={PROGRESS_CIRC}
                strokeDashoffset={((100 - progress) / 100) * PROGRESS_CIRC}
                strokeLinecap="round"
                style={{ willChange: "stroke-dashoffset" }}
                transform="rotate(-90 25 25)" // Rotate the circle to start from the top
              />

              {/* Play/Pause Icon */}
              <foreignObject x="14" y="14" width="22" height="22">
                <button
                  className="w-full h-full flex items-center justify-center"
                  aria-label={isPlay ? "Pause" : "Play"}
                >
                  {isPlay ? (
                    <FaPause className="text-lg text-[#fff]" />
                  ) : (
                    <FaPlay className="text-lg text-[#fff]" />
                  )}
                </button>
              </foreignObject>
            </svg>
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto lg:border-l lg:border-r border-[#37121A] h-[25vh] w-full relative z-[999] hidden md:block"></div>
      <div className="container mx-auto lg:border-l lg:border-r border-[#C7784D] h-full w-full relative z-[999] hidden md:block"></div> */}
      <div className="absolute bottom-0 left-0 right-0 md:block hidden z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={CAROUSEL_DATA[currentIndex].id + "-background"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-full"
          >
            <Image
              src={CAROUSEL_DATA[currentIndex].image}
              alt="The Club"
              width={1728}
              height={1788}
              className="w-full h-full object-cover md:block hidden"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
