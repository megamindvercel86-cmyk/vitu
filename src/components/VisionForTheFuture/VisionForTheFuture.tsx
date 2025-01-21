"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Typography from "../Typography/Typography";
import CTAButtonIcon from "../Icons/Icons";

interface CarouselItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  residentialType: string;
}

const carouselData: CarouselItem[] = [
  {
    title: "Embracing new Horizons in Living",
    subtitle:
      "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Realty envisions retirement homes as peaceful retreats, offering the perfect balance of comfort, care, and community for your golden years.",
    image: "/svgs/image1.svg",
    residentialType: "Retirement Homes",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle:
      "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Resorts envisions serene getaways where luxury meets nature, creating the perfect harmony of relaxation, adventure, and rejuvenation for every moment of your escape.",
    image: "/svgs/image2.svg",
    residentialType: "Resorts",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle:
      "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Wellness Centre envisions a sanctuary of holistic healing, where mind, body, & soul unite in harmony, offering the perfect blend of care, tranquility, & rejuvenation for your well-being.",
    image: "/svgs/image3.svg",
    residentialType: "Wellness Centre",
  },
  {
    title: "Embracing new Horizons in Living",
    subtitle:
      "Rooted in our vision for bold growth and dedication to evolving our portfolio.",
    description:
      "Vitu Commercial Spaces envisions dynamic hubs of innovation & opportunity, offering the perfect balance of functionality, sophistication, & community for your business to thrive.",
    image: "/svgs/image4.svg",
    residentialType: "Commercial Spaces",
  },
];

const VisionForTheFuture: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const totalSlides = carouselData.length;

  const transition = useCallback(
    (direction: "left" | "right") => {
      if (isAnimating) return;

      setIsAnimating(true);
      const nextIndex =
        direction === "right"
          ? (currentIndex + 1) % totalSlides
          : (currentIndex - 1 + totalSlides) % totalSlides;

      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), 800);
    },
    [currentIndex, totalSlides, isAnimating]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer); // Cleanup on unmount
  }, [nextSlide]);

  return (
    <div className="relative bg-[#FDF6F1] text-[#42210B] overflow-hidden">
      <div className="mx-[210px] py-12 lg:py-24 relative">
        {/* Carousel Content */}
        {carouselData.map((item, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            <div className="flex flex-col justify-between">
              {/* Text Section */}
              <div className="w-[424px]">
                <Typography className="text-2xl lg:text-[56px] font-bold font-freightNeoMedium lg:leading-[72px] xl:leading-[67px]">
                  {item.title}
                </Typography>
                <Typography className="text-2xl font-freightNeoMedium lg:text-[20px] font-light text-[#040707CC] leading-relaxed">
                  {item.subtitle}
                </Typography>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <button
                  className="bg-[#AE856633] text-customBrown pr-1 pl-[18px] py-[3px] rounded-full flex items-center justify-center gap-[11px] text-base font-freightNeoMedium"
                  onClick={() => console.log("Button clicked")}
                >
                  See What’s Next
                  <CTAButtonIcon direction="right" />
                </button>
                <Typography className="text-base lg:text-4xl font-FreightNeoProNormal text-[#4F373799]">
                  {item.residentialType}
                </Typography>
              </div>

              {/* Image Section */}
              <div className="lg:w-[100%] w-full h-[500px] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.subtitle}
                  width={700}
                  height={400}
                  className="w-full h-full object-contain"
                  quality={100}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between mt-[74px]">
              {/* Description Section */}
              <div className="lg:w-1/2 w-full">
                <Typography className="text-base lg:text-xl font-FreightNeoProNormal text-[#4F373799]">
                  {item.description}
                </Typography>
              </div>

              {/* Pagination Dots Section */}
              <div className="lg:w-1/2 w-full flex justify-end mt-6 lg:mt-0">
                <div className="flex space-x-3 bg-[#AE856666] rounded-[32px] py-4 px-6">
                  {carouselData.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      disabled={isAnimating}
                      onClick={() => {
                        if (dotIndex !== currentIndex) {
                          transition(
                            dotIndex > currentIndex ? "right" : "left"
                          );
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        dotIndex === currentIndex
                          ? "bg-white w-8"
                          : "bg-[#FFFFFF99]"
                      } ${
                        isAnimating ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      aria-label={`Go to slide ${dotIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionForTheFuture;
