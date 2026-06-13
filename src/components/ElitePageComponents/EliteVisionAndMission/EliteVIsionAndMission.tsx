"use client";

// ============= Component Imports =============
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Typography from "@/components/Typography/Typography";
import { Link } from "react-scroll";

// ============= Types & Interfaces =============
type Direction = "left" | "right";
type ContentItem = {
  title: string;
  description: string;
};

interface Images {
  desktop: string[];
  mobile: string[];
}

interface Props {
  images: Images;
  content: {
    desktop: ContentItem[][];
    mobile: ContentItem[];
  };
}

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
export default function VisionAndMissionElite({ images, content }: Props) {
  // ============= State =============
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ============= Handlers =============
  const handleTransition = useCallback(
    (newDirection: Direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(newDirection);
      const nextIndex =
        newDirection === "right"
          ? (currentIndex + 1) % CAROUSEL_CONFIG.totalSlides
          : (currentIndex - 1 + CAROUSEL_CONFIG.totalSlides) % CAROUSEL_CONFIG.totalSlides;
      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), CAROUSEL_CONFIG.transitionDuration);
    },
    [currentIndex, isAnimating]
  );

  // ============= Effects =============
  useEffect(() => {
    const timer = setInterval(() => handleTransition("right"), CAROUSEL_CONFIG.autoplayInterval);
    return () => clearInterval(timer);
  }, [handleTransition]);

  // ============= Render Helpers =============
  const renderDesktopSection = (section: ContentItem, index: number) => (
    <div
      key={index}
      className="flex-1 group/section relative bg-transparent"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#f3eae1]/70 backdrop-blur-md opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 z-0" />

      {/* Text content - hidden by default, appears centered on hover */}
      <div className="absolute inset-0 flex items-center justify-center text-center opacity-0 group-hover/section:opacity-100 transition-opacity duration-500 z-10">
        <div className="">
          <h1 className="font-FreightNeoProNormal mx-auto leading-[1.3] w-1/2 text-[#1C1213] text-2xl md:text-[48px]">
            {section.title}
          </h1>
          <p
  
            className="font-FreightNeoProNormal w-[90%] mt-3 text-lg  max-w-md mx-auto text-[#1C121399]"
          >
            {section.description}
          </p>
          {/* <div className="mt-6">
            <Link  to="elitForm"
              
              className="inline-flex uppercase cursor-pointer gap-2 items-center px-6 py-2 border text-[#1C1213] font-FreightNeoProNormal border-black rounded-full text-xl tracking-wider   transition"
            >
              Enquire now{" "}
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.802176 7.00488L8.49753 14.6239L16.1938 7.00488" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
                <path d="M8.49853 14.6222L8.49854 0.375977" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
              </svg>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="bg-gray-100 ">
          {/* Desktop Version */}
          <div className="overflow-hidden hidden md:block shadow-xl xl:h-[100vh] w-[100%] aspect-[2/1] relative">
            {/* Image container */}
            <div className="absolute inset-0">
              {images.desktop.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex !== null ? (hoveredIndex === index ? 1 : 0) : currentIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={CAROUSEL_CONFIG.dimensions.desktop.width}
                    height={CAROUSEL_CONFIG.dimensions.desktop.height}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>

            {/* Vertical dividing lines */}
            <div className="absolute inset-0 flex">
              <div className="flex-1 border-r border-white"></div>
              <div className="flex-1 border-r border-white"></div>
              <div className="flex-1"></div>
            </div>
            {/* Sections with titles and hover descriptions */}
            <div className="absolute inset-0 flex">{content.desktop[currentIndex].map((section, index) => renderDesktopSection(section, index))}</div>
          </div>

          {/* Mobile Version */}
          <div className="block md:hidden relative overflow-hidden shadow-xl">
            <Image
              src={images.mobile[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              width={CAROUSEL_CONFIG.dimensions.mobile.width}
              height={CAROUSEL_CONFIG.dimensions.mobile.height}
              className="w-full h-[679px] transition-all object-cover duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center py-6">
              <div className="backdrop-blur-[3px] bg-black/10 min-h-96 flex flex-col items-center justify-center px-3">
                <Typography
                  variant="custom"
                  className="font-freightNeoMedium text-white text-2xl"
                  aria-label={`Mobile Title: ${content.mobile[currentIndex].title}`}
                >
                  {content.mobile[currentIndex].title}
                </Typography>
                <div className="overflow-visible transition-all duration-300 mt-2">
                  <Typography variant="h3" fontWeight="font-normal" className="font-FreightNeoProNormal text-white">
                    {content.mobile[currentIndex].description}
                  </Typography>
                </div>

                {/* Left/Right arrow buttons */}
                <div className="flex justify-center gap-2  mt-4">
                  <button
                    disabled={isAnimating}
                    onClick={() => handleTransition("left")}
                    className={`px-3 py-2  rounded-full text-white transition-all duration-300 ${
                      isAnimating ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    }`}
                    aria-label="Previous slide"
                  >
                    <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.42">
                        <g clipPath="url(#clip0_42_9183)">
                          <rect y="0.296875" width="36" height="36" rx="18" fill="#D2D2D7" fillOpacity="0.64" />
                          <path
                            d="M20 25.2969C19.6162 25.2969 19.2324 25.1504 18.9395 24.8574L13.4395 19.3574C12.8536 18.772 12.8536 17.8218 13.4395 17.2363L18.9395 11.7363C19.5254 11.1504 20.4747 11.1504 21.0606 11.7363C21.6465 12.3217 21.6465 13.2719 21.0606 13.8574L16.6211 18.2969L21.0606 22.7364C21.6465 23.3218 21.6465 24.272 21.0606 24.8575C20.7676 25.1505 20.3837 25.2969 20 25.2969Z"
                            fill="black"
                            fillOpacity="0.56"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_42_9183">
                          <rect y="0.296875" width="36" height="36" rx="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <button
                    disabled={isAnimating}
                    onClick={() => handleTransition("right")}
                    className={`px-3 py-2  rounded-full text-white transition-all duration-300 ${
                      isAnimating ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    }`}
                    aria-label="Next slide"
                  >
                    <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_42_9186)">
                        <rect y="0.296875" width="36" height="36" rx="18" fill="#D2D2D7" fillOpacity="0.64" />
                        <path
                          d="M22.5597 17.2344L17.0521 11.7344C16.4667 11.149 15.5198 11.1519 14.9364 11.7383C14.3529 12.3252 14.3549 13.2749 14.9403 13.8594L19.3841 18.2969L14.9403 22.7344C14.3549 23.3189 14.3529 24.2686 14.9364 24.8555C15.2286 25.1499 15.6124 25.2969 15.9962 25.2969C16.378 25.2969 16.7599 25.1514 17.0521 24.8594L22.5597 19.3594C22.8412 19.0782 23 18.6958 23 18.2969C23 17.898 22.8412 17.5157 22.5597 17.2344Z"
                          fill="black"
                          fillOpacity="0.56"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_42_9186">
                          <rect y="0.296875" width="36" height="36" rx="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
