"use client";

// ============= Component Imports =============
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import CTAButtonIcon from "@/components/Icons/Icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa";
import { useInView } from "framer-motion";
// ============= Types & Interfaces =============
type Direction = "left" | "right";

interface CarouselItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  residentialType: string;
}

// ============= Constants =============
const CAROUSEL_CONFIG = {
  transitionDuration: 500,
  autoplayInterval: 5000,
  imageDimensions: {
    width: 700,
    height: 400,
  },
  scales: {
    0: { mobile: { x: 1, y: 1.5 }, desktop: { x: 1, y: 1 } },
    1: { mobile: { x: 1, y: 1.5 }, desktop: { x: 1, y: 1 } },
    2: { mobile: { x: 1.2, y: 1.5 }, desktop: { x: 0.9, y: 1 } },
    3: { mobile: { x: 1, y: 1.1 }, desktop: { x: 0.9, y: 1 } },
    4: { mobile: { x: 1.5, y: 1.8 }, desktop: { x: 1, y: 1 } },
  },
};

const CAROUSEL_DATA: CarouselItem[] = [
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Strategically located and thoughtfully laid out, our plots offer the ideal foundation to build a future-ready home in a well-connected community.",
    image: "/svgs/plotted.webp",
    residentialType: "Plotted development",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "VITU Commercial Spaces envisions dynamic hubs of innovation & opportunity, offering the perfect balance of functionality, sophistication, & community for your business to thrive.",
    image: "/svgs/image4.webp",
    residentialType: "Commercial Spaces",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "VITU Realty envisions retirement homes as peaceful retreats, offering the perfect balance of comfort, care and community for your golden years.",
    image: "/svgs/image1.webp",
    residentialType: "Retirement Homes",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "VITU Resorts envisions serene getaways where luxury meets nature, creating the perfect harmony of relaxation, adventure and rejuvenation for every moment of your escape.",
    image: "/svgs/image2.webp",
    residentialType: "Resorts",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "VITU Wellness Centre envisions a sanctuary of holistic healing where the mind, body and soul unite in harmony offering the perfect blend of care, tranquility and rejuvenation for your well-being.",
    image: "/svgs/image3.webp",
    residentialType: "Wellness Centre",
  },

];

/**
 * Vision For Future Component
 * Showcases future residential projects through an interactive carousel
 *
 * Features:
 * 1. Auto-rotating carousel with smooth transitions
 * 2. Responsive design with different layouts
 * 3. Interactive navigation dots
 * 4. CTA button for next slide
 *
 * @component
 */
export default function VisionForTheFuture() {
  // ============= State =============
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    amount: 0.5, // Trigger when 50% is visible
  });
  // ============= Handlers =============
  useEffect(() => {
    setIsPlay(isInView); // Start or pause autoplay based on visibility
  }, [isInView]);
  const handleTransition = useCallback(
    (newDirection: Direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(newDirection);

      const nextIndex =
        newDirection === "right" ? (currentIndex + 1) % CAROUSEL_DATA.length : (currentIndex - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length;

      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), CAROUSEL_CONFIG.transitionDuration);
    },
    [currentIndex, isAnimating]
  );

  // ============= Effects =============
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlay) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            handleTransition("right");
            return 0;
          }
          return prevProgress + 1;
        });
      }, CAROUSEL_CONFIG.autoplayInterval / 100);
    } else {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [handleTransition, isPlay]);

  // ============= Render Helpers =============

  const getImageScale = (index: number) => {
    const scale = CAROUSEL_CONFIG.scales[index as keyof typeof CAROUSEL_CONFIG.scales];
    return `scale-x-[${scale.mobile.x}] scale-y-[${scale.mobile.y}] md:scale-x-[${scale.desktop.x}] md:scale-y-[${scale.desktop.y}]`;
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden text-[#42210B]" aria-label="Vision for the Future Carousel">
      <div className="relative py-[2.75rem] sm:py-[2.75rem] md:py-[3.4375rem] lg:py-[8.3125rem] lg:pb-[9.8125rem] xl:py-[9.8125 xl:mx-[13.125rem]">
        {/* Static Title, Subtitle, and Button */}
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          <header className="w-[16.0625rem] sm:w-[16.0625rem] md:w-[26.5rem] 2xl:w-[39rem] mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-0">
            <Typography
              variant="custom"
              className="w-[14rem] md:w-full 2xl:w-full font-freightNeoMedium leading-none text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] md:px-0"
            >
              Embracing new Horizons in Living
            </Typography>
            <Typography
              variant="custom"
              className="pt-1 font-freightNeoMedium font-light text-base  text-[#040707CC] md:text-[1.25rem]  2xl:text-[2.125rem]"
            >
              Rooted in our vision for bold growth and dedication to evolving our portfolio.
            </Typography>
          </header>
        </motion.span>
        <div className="mt-8 flex items-center justify-between mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-0">
          <Link
            href="/about"
            aria-label="See What Next"
            className="hidden sm:hidden md:flex items-center justify-center gap-[0.6875rem] pt-1 pr-1 pl-[1.125rem] py-[0.1875rem] font-freightNeoMedium text-base text-customBrown rounded-full bg-[#AE856633] 2xl:text-[1.5rem]"
          >
            See What&apos;s Next
            <CTAButtonIcon fill="#4F3737" direction="right" />
          </Link>
          <Typography className="hidden sm:hidden md:block font-FreightNeoProNormal text-base text-[#4F373799] lg:text-4xl">
            {CAROUSEL_DATA[currentIndex].residentialType}
          </Typography>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative pt-6 overflow-hidden">
            <div className="flex w-full h-[12.75rem] transition-transform duration-500 ease-in-out md:h-[33.125rem] xl:h-[37.875rem] 2xl:h-[62.5rem]">
              {CAROUSEL_DATA.map((item, index) => (
                <figure
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 w-full h-full ease-in-out ${index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : direction === "right"
                      ? index === (currentIndex - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                      : index === (currentIndex + 1) % CAROUSEL_DATA.length
                        ? "opacity-0 translate-x-full"
                        : "opacity-0 -translate-x-full"
                    }`}
                  aria-hidden={index !== currentIndex}
                >
                  <Image
                    src={item.image}
                    alt={item.subtitle}
                    width={CAROUSEL_CONFIG.imageDimensions.width}
                    height={CAROUSEL_CONFIG.imageDimensions.height}
                    className={`w-full h-full object-contain ${getImageScale(index)}`}
                    quality={100}
                    priority={index === 0} // Prioritize loading the first image
                  />
                </figure>
              ))}
            </div>
          </div>
        </motion.div>
        <Typography variant="custom" className="block mx-[1.8125rem] mt-6 font-FreightNeoProBold text-lg text-[#04070799] md:hidden">
          {CAROUSEL_DATA[currentIndex].residentialType}
        </Typography>
        <div className="flex flex-col h-auto mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] lg:flex-row xl:mx-0 items-center lg:items-start justify-between md:mt-[4.625rem]">
          <div className="w-full lg:w-2/3">
            <Typography className="h-[6rem] font-FreightNeoProNormal text-base text-[#4F373799] lg:text-xl 2xl:text-[2.125rem]">
              {CAROUSEL_DATA[currentIndex].description}
            </Typography>
          </div>

          <div className="flex flex-col w-full mt-6 items-center sm:flex-col sm:items-center md:flex-row md:justify-end lg:w-1/2 lg:mt-0">
            <div className="flex justify-center   pt-7 md:pt-0 lg:pt-0 w-full lg:w-auto   ">
              <Link
                aria-label="See What Next"
                href="/about"
                className="flex w-[10.3125rem] mb-[2.8125rem] items-center justify-center gap-[0.6875rem]  mt-[3px] p-[0.5rem] pr-1 font-freightNeoMedium text-base text-customBrown rounded-full bg-[#AE856633] md:hidden sm:flex"
              >
                See What&apos;s Next
                <CTAButtonIcon fill="#4F3737" direction="right" />
              </Link>
              <div className="relative hidden lg:block lg:pe-5 pb-7 md:pb-0 md:pe-3 lg:pb-0 cursor-pointer" onClick={() => setIsPlay(!isPlay)}>
                <svg width="50" height="50" viewBox="0 0 50 50">
                  {/* Background Circle */}
                  <circle cx="25" cy="25" r="22" stroke="#dbc9bc" strokeWidth="2" fill="none" opacity="0.3" />

                  {/* Progress Circle */}
                  <circle
                    cx="25"
                    cy="25"
                    r="22"
                    stroke="#dbc9bc"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={138} // 2 * π * r (full circle length)
                    strokeDashoffset={(1 - progress / 100) * 138} // Adjust offset to show progress
                    strokeLinecap="round"
                    className="transition-all duration-100"
                    transform="rotate(-90 25 25)" // Rotate the circle to start from the top
                  />

                  {/* Play/Pause Icon */}
                  <foreignObject x="14" y="14" width="22" height="22">
                    <button className="w-full h-full flex items-center justify-center" aria-label={isPlay ? "Pause" : "Play"}>
                      {isPlay ? <FaPause className="text-lg text-[#dbc9bc]" /> : <FaPlay className="text-lg text-[#dbc9bc]" />}
                    </button>
                  </foreignObject>
                </svg>
              </div>
            </div>
            <div className="flex space-x-3 py-4 px-6 rounded-[2rem] bg-[#AE856666]" role="group" aria-label="Carousel Navigation Dots">
              {CAROUSEL_DATA.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  disabled={isAnimating}
                  onClick={() => {
                    if (dotIndex !== currentIndex) {
                      const direction = dotIndex > currentIndex ? "right" : "left";
                      handleTransition(direction);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${dotIndex === currentIndex ? "bg-white md:w-8 w-9" : "bg-[#FFFFFF99]"
                    } ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  aria-current={dotIndex === currentIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
