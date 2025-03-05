"use client";
// ============= Component Imports =============
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";

// ============= Types & Interfaces =============
type Direction = "left" | "right";
type ContentItem = {
  title: string;
  description: string;
};

// ============= Constants =============
const CAROUSEL_CONFIG = {
  totalSlides: 3,
  transitionDuration: 500,
  autoplayInterval: 5000,
  dimensions: {
    desktop: { width: 1932, height: 1088 },
    mobile: { width: 326, height: 568 },
  },
};

const IMAGES = {
  desktop: [
    "/images/visionAndMissionImages/1.png",
    "/images/visionAndMissionImages/2.png",
    "/images/visionAndMissionImages/3.png",
  ],
  mobile: [
    "/images/visionAndMissionImages/mobile1.png",
    "/images/visionAndMissionImages/mobile2.png",
    "/images/visionAndMissionImages/mobile3.png",
  ],
};

const CONTENT = {
  desktop: [
    [
      { 
        title: "Prime Locations", 
        description: "Strategically located properties offering convenience, connectivity, and high investment value." 
      },
      { 
        title: "Accessible Luxury", 
        description: "Luxury living at accessible prices, designed to offer comfort and sophistication." 
      },
      { 
        title: "Trusted Experience / Happy Residents", 
        description: "Delivering homes where families thrive, backed by years of trust and excellence." 
      },
    ],
    [
      { 
        title: "Prime Locations", 
        description: "Strategically located properties offering convenience, connectivity, and high investment value." 
      },
      { 
        title: "Accessible Luxury", 
        description: "Luxury living at accessible prices, designed to offer comfort and sophistication." 
      },
      { 
        title: "Trusted Experience / Happy Residents", 
        description: "Delivering homes where families thrive, backed by years of trust and excellence." 
      },
    ],
    [
      { 
        title: "Prime Locations", 
        description: "Strategically located properties offering convenience, connectivity, and high investment value." 
      },
      { 
        title: "Accessible Luxury", 
        description: "Luxury living at accessible prices, designed to offer comfort and sophistication." 
      },
      { 
        title: "Trusted Experience / Happy Residents", 
        description: "Delivering homes where families thrive, backed by years of trust and excellence." 
      },
    ],
  ],
  mobile: [
    { 
      title: "Prime Locations", 
      description: "Strategically located properties offering convenience, connectivity, and high investment value." 
    },
    { 
      title: "Accessible Luxury", 
      description: "Luxury living at accessible prices, designed to offer comfort and sophistication." 
    },
    { 
      title: "Trusted Experience / Happy Residents", 
      description: "Delivering homes where families thrive, backed by years of trust and excellence." 
    },
  ],
};


/**
 * Vision And Mission Component
 * Displays company vision through an interactive carousel
 *
 * Features:
 * 1. Auto-rotating carousel with smooth transitions
 * 2. Responsive design with different layouts for desktop/mobile
 * 3. Interactive hover states on desktop
 * 4. Navigation dots on mobile
 *
 * @component
 */
export default function VisionAndMission() {
  // ============= State =============
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");

  // ============= Handlers =============
  const handleTransition = useCallback(
    (newDirection: Direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(newDirection);
      const nextIndex =
        newDirection === "right"
          ? (currentIndex + 1) % CAROUSEL_CONFIG.totalSlides
          : (currentIndex - 1 + CAROUSEL_CONFIG.totalSlides) %
            CAROUSEL_CONFIG.totalSlides;
      setCurrentIndex(nextIndex);
      setTimeout(
        () => setIsAnimating(false),
        CAROUSEL_CONFIG.transitionDuration
      );
    },
    [currentIndex, isAnimating]
  );

  // ============= Effects =============
  useEffect(() => {
    const timer = setInterval(
      () => handleTransition("right"),
      CAROUSEL_CONFIG.autoplayInterval
    );
    return () => clearInterval(timer);
  }, [handleTransition]);

  // ============= Render Helpers =============
  const renderDesktopSection = (section: ContentItem, index: number) => (
    <div key={index} className="flex-1 group/section relative">
      {/* Section content */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <Typography
          variant="h2"
          className="font-freightNeoMedium text-white  text-center"
          aria-label={`Mobile Title: ${CONTENT.mobile[currentIndex].title}`}
        >
          {section.title}
        </Typography>
        {/* Hover description */}
        <div className="overflow-hidden h-0 group-hover/section:h-16 transition-all duration-300">
          <Typography
            variant="h3"
            fontWeight="font-normal"
            className="font-FreightNeoProNormal mt-[5px] text-white text-center"
          >
            {" "}
            {section.description}
          </Typography>
        </div>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover/section:bg-black/10 transition-all duration-300" />
    </div>
  );

  return (
    <>
      {/* Main Carousel */}
      <div className="bg-gray-100 sm:p-0 md:p-[1px]">
        {/* Desktop Version */}
        <div className="overflow-hidden hidden md:block shadow-xl h-[100vh] w-[100vw] aspect-[2/1] relative">
          {/* Image container */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              direction === "right" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Image
              src={IMAGES.desktop[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              width={CAROUSEL_CONFIG.dimensions.desktop.width}
              height={CAROUSEL_CONFIG.dimensions.desktop.height}
              className="w-full  object-contain"
              loading="lazy"
            />
          </div>
          {/* Vertical dividing lines */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-white"></div>
            <div className="flex-1 border-r border-white"></div>
            <div className="flex-1"></div>
          </div>
          {/* Sections with titles and hover descriptions */}
          <div className="absolute inset-0 flex">
            {CONTENT.desktop[currentIndex].map((section, index) =>
              renderDesktopSection(section, index)
            )}
          </div>
        </div>

        {/* Mobile Version */}
        <div className="block md:hidden relative overflow-hidden shadow-xl">
          <Image
            src={IMAGES.mobile[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            width={CAROUSEL_CONFIG.dimensions.mobile.width}
            height={CAROUSEL_CONFIG.dimensions.mobile.height}
            className="w-full h-[679px] transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6">
            <Typography
              variant="custom"
              className="font-freightNeoMedium text-white text-2xl"
              aria-label={`Mobile Title: ${CONTENT.mobile[currentIndex].title}`}
            >
              {CONTENT.mobile[currentIndex].title}
            </Typography>
            <div
              className={`overflow-hidden transition-all duration-300 ${"h-16"}`}
            >
              <Typography
                variant="h3"
                fontWeight="font-normal"
                className="font-FreightNeoProNormal mt-[0px] text-white"
              >
                {CONTENT.mobile[currentIndex].description}
              </Typography>
            </div>
            <div className="flex space-x-5 rounded-[32px] py-4 px-6">
              {CONTENT.mobile.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  disabled={isAnimating}
                  onClick={() => {
                    if (dotIndex !== currentIndex) {
                      handleTransition(
                        dotIndex > currentIndex ? "right" : "left"
                      );
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    dotIndex === currentIndex ? "bg-white" : "bg-[#FFFFFF99]"
                  } ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
