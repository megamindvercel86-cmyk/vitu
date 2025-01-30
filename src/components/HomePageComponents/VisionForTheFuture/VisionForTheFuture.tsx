"use client";

// ============= Component Imports =============
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import CTAButtonIcon from "@/components/Icons/Icons";

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
    description: "Vitu Realty envisions retirement homes as peaceful retreats, offering the perfect balance of comfort, care, and community for your golden years.",
    image: "/svgs/image1.svg",
    residentialType: "Retirement Homes",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description: "Vitu Resorts envisions serene getaways where luxury meets nature, creating the perfect harmony of relaxation, adventure, and rejuvenation for every moment of your escape.",
    image: "/svgs/image2.svg",
    residentialType: "Resorts",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description: "Vitu Wellness Centre envisions a sanctuary of holistic healing, where mind, body, & soul unite in harmony, offering the perfect blend of care, tranquility, & rejuvenation for your well-being.",
    image: "/svgs/image3.svg",
    residentialType: "Wellness Centre",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description: "Vitu Commercial Spaces envisions dynamic hubs of innovation & opportunity, offering the perfect balance of functionality, sophistication, & community for your business to thrive.",
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

  // ============= Handlers =============
  const handleTransition = useCallback((newDirection: Direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);

    const nextIndex = newDirection === "right"
      ? (currentIndex + 1) % CAROUSEL_DATA.length
      : (currentIndex - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length;
    
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), CAROUSEL_CONFIG.transitionDuration);
  }, [currentIndex, isAnimating]);

  // ============= Effects =============
  useEffect(() => {
    const timer = setInterval(
      () => handleTransition("right"), 
      CAROUSEL_CONFIG.autoplayInterval
    );
    return () => clearInterval(timer);
  }, [handleTransition]);

  // ============= Render Helpers =============
  const getImageScale = (index: number) => {
    const scale = CAROUSEL_CONFIG.scales[index as keyof typeof CAROUSEL_CONFIG.scales];
    return `scale-x-[${scale.mobile.x}] scale-y-[${scale.mobile.y}] md:scale-x-[${scale.desktop.x}] md:scale-y-[${scale.desktop.y}]`;
  };

  return (
    <div className="relative  text-[#42210B] overflow-hidden">
      <div className="xl:mx-[210px]  xl:py-[157px] lg:py-[133px] md:py-[55px] sm:py-[44px] py-[44px] lg:pb-[157px] relative">
        {/* Static Title, Subtitle, and Button */}
        <div className="md:w-[424px] lg:mx-[88px] md:mx-[66px] mx-[29px] sm:mx-[29px] xl:mx-0 sm:w-[257px] w-[257px]">
          <Typography
            variant="custom"
            className="text-2xl lg:text-[56px] w-[224px] md:w-full font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px]"
          >
            Embracing new Horizons in Living
          </Typography>
          <Typography
            variant="custom"
            className="text-base   font-freightNeoMedium md:text-[20px] pt-1 font-light text-[#040707CC] leading-[19px] md:leading-relaxed"
          >
            Rooted in our vision for bold growth and dedication to evolving our
            portfolio.
          </Typography>
        </div>
        <div className="mt-8 lg:mx-[88px] md:mx-[66px] mx-[29px] sm:mx-[29px] xl:mx-0 flex items-center justify-between">
          <button
            className="bg-[#AE856633] sm:hidden hidden  text-customBrown pr-1 pl-[18px] py-[3px] rounded-full md:flex items-center justify-center gap-[11px] text-base font-freightNeoMedium"
            onClick={() => console.log("Button clicked")}
          >
            See What’s Next
            <CTAButtonIcon direction="right" />
          </button>
          {/* Residential Type Section */}
          <Typography className=" sm:hidden hidden md:block text-base lg:text-4xl font-FreightNeoProNormal text-[#4F373799]">
            {CAROUSEL_DATA[currentIndex].residentialType}
          </Typography>
        </div>
        <div className="pt-6 relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out w-full h-[204px]   md:h-[530px] xl:h-[606px]">
            {CAROUSEL_DATA.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 w-full   h-full ease-in-out ${
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
              >
                <Image
                  src={item.image}
                  alt={item.subtitle}
                  width={CAROUSEL_CONFIG.imageDimensions.width}
                  height={CAROUSEL_CONFIG.imageDimensions.height}
                  className={`w-full h-full object-contain ${getImageScale(index)}`}
                  quality={100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description Section (static for currentIndex) */}
        <Typography
          variant="custom"
          className="block md:hidden mx-[29px] text-lg font-FreightNeoProBold text-[#04070799] mt-6"
        >
          {CAROUSEL_DATA[currentIndex].residentialType}
        </Typography>
        <div className="lg:mx-[88px] md:mx-[66px] h-auto  sm:mx-[29px] mx-[29px] xl:mx-0 flex flex-col lg:flex-row items-center lg:items-start justify-between md:mt-[74px]">
          <div className="lg:w-2/3 w-full">
            <Typography className="text-base lg:text-xl h-[96px] font-FreightNeoProNormal text-[#4F373799]">
              {CAROUSEL_DATA[currentIndex].description}
            </Typography>
          </div>

          {/* Pagination Dots Section */}
          <div className="lg:w-1/2 w-full flex sm:flex-col flex-col md:flex-row sm:items-center items-center md:justify-end mt-6 lg:mt-0 ">
            <button
              className="bg-[#AE856633]  md:hidden w-[165px] mb-[45px] flex text-customBrown pr-1 p-[8px] t rounded-full sm:flex items-center justify-center gap-[11px] text-base font-freightNeoMedium"
              onClick={() => console.log("Button clicked")}
            >
              See What’s Next
              <CTAButtonIcon direction="right" />
            </button>
            <div className="flex space-x-3 bg-[#AE856666] rounded-[32px] py-4 px-6">
              {CAROUSEL_DATA.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  disabled={isAnimating}
                  onClick={() => {
                    if (dotIndex !== currentIndex) {
                      // Calculate the direction based on the dot index
                      const direction =
                        dotIndex > currentIndex ? "right" : "left";
                      handleTransition(direction);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    dotIndex === currentIndex
                      ? "bg-white md:w-8 w-9"
                      : "bg-[#FFFFFF99]"
                  } ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
