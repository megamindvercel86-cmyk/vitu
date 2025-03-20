"use client";

// ============= Component Imports =============
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import CTAButtonIcon from "@/components/Icons/Icons";
import Link from "next/link";

import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";

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
    1: { mobile: { x: 1.2, y: 1.5 }, desktop: { x: 0.9, y: 1 } },
    2: { mobile: { x: 1, y: 1.1 }, desktop: { x: 0.9, y: 1 } },
    3: { mobile: { x: 1.5, y: 1.8 }, desktop: { x: 1, y: 1 } },
  },
};

const CAROUSEL_DATA: CarouselItem[] = [
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Realty envisions retirement homes as peaceful retreats, offering the perfect balance of comfort, care, and community for your golden years.",
    image: "/svgs/image1.svg",
    residentialType: "Retirement Homes",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Resorts envisions serene getaways where luxury meets nature, creating the perfect harmony of relaxation, adventure, and rejuvenation for every moment of your escape.",
    image: "/svgs/image2.svg",
    residentialType: "Resorts",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Wellness Centre envisions a sanctuary of holistic healing, where mind, body, &amp; soul unite in harmony, offering the perfect blend of care, tranquility, &amp; rejuvenation for your well-being.",
    image: "/svgs/image3.svg",
    residentialType: "Wellness Centre",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Commercial Spaces envisions dynamic hubs of innovation & opportunity, offering the perfect balance of functionality, sophistication, & community for your business to thrive.",
    image: "/svgs/image4.svg",
    residentialType: "Commercial Spaces",
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
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);

  // ============= Handlers =============
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
    <section className="relative overflow-hidden text-[#42210B]" aria-label="Vision for the Future Carousel">
      <div className="relative py-[2.75rem] sm:py-[2.75rem] md:py-[3.4375rem] lg:py-[8.3125rem] lg:pb-[9.8125rem] xl:py-[9.8125rem] xl:mx-[13.125rem]">
        {/* Static Title, Subtitle, and Button */}
        <header className="w-[16.0625rem] sm:w-[16.0625rem] md:w-[26.5rem] 2xl:w-[39rem] mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-0">
          <Typography
            variant="custom"
            className="w-[14rem] md:w-full 2xl:w-full font-freightNeoMedium leading-none text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] md:px-0"
          >
            Embracing new Horizons in Living
          </Typography>
          <Typography
            variant="custom"
            className="pt-1 font-freightNeoMedium font-light text-base leading-[1.1875rem] text-[#040707CC] md:text-[1.25rem] md:leading-relaxed 2xl:text-[2.125rem]"
          >
            Rooted in our vision for bold growth and dedication to evolving our portfolio.
          </Typography>
        </header>
        <div className="mt-8 flex items-center justify-between mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-0">
          <Link href="/about">
            <button
              className="hidden sm:hidden md:flex items-center justify-center gap-[0.6875rem] pt-1 pr-1 pl-[1.125rem] py-[0.1875rem] font-freightNeoMedium text-base text-customBrown rounded-full bg-[#AE856633] 2xl:text-[1.5rem]"
              aria-label="See What's Next"
            >
              See What&apos;s Next
              <CTAButtonIcon direction="right" />
            </button>
          </Link>
          <Typography className="hidden sm:hidden md:block font-FreightNeoProNormal text-base text-[#4F373799] lg:text-4xl">
            {CAROUSEL_DATA[currentIndex].residentialType}
          </Typography>
        </div>
        <div className="relative pt-6 overflow-hidden">
          <div className="flex w-full h-[12.75rem] transition-transform duration-500 ease-in-out md:h-[33.125rem] xl:h-[37.875rem] 2xl:h-[62.5rem]">
            {CAROUSEL_DATA.map((item, index) => (
              <figure
                key={index}
                className={`absolute inset-0 transition-all duration-500 w-full h-full ease-in-out ${
                  index === currentIndex
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
            <div className="flex justify-between  pt-7 md:pt-0 lg:pt-0 w-full   ">
              <Link href="/about">
                <button
                  className="flex w-[10.3125rem] mb-[2.8125rem] items-center justify-center gap-[0.6875rem]  mt-[3px] p-[0.5rem] pr-1 font-freightNeoMedium text-base text-customBrown rounded-full bg-[#AE856633] md:hidden sm:flex"
                  aria-label="See What's Next"
                >
                  See What&apos;s Next
                  <CTAButtonIcon direction="right" />
                </button>
              </Link>
              <div className="relative lg:pe-5 pb-7 md:pb-0 md:pe-3 lg:pb-0 cursor-pointer" onClick={() => setIsPlay(!isPlay)}>
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
                      {isPlay ? <CiPause1 className="text-2xl text-[#dbc9bc]" /> : <CiPlay1 className="text-2xl text-[#dbc9bc]" />}
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
                  className={`min-w-[44px] min-h-[44px] rounded-full transition-all duration-300 flex items-center justify-center
      ${dotIndex === currentIndex ? "bg-white w-9 md:w-10 h-9 md:h-10" : "bg-[#FFFFFF99]"}
      ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  aria-current={dotIndex === currentIndex}
                >
                  <span className="w-2 h-2 md:w-3 md:h-3 bg-current rounded-full" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
