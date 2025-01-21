import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CarouselItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const carouselData: CarouselItem[] = [
  {
    title: "Embracing new Horizons in Living",
    subtitle: "Retirement Homes",
    description:
      "Vitu Realty envisions retirement homes as peaceful retreats, offering the perfect balance of comfort, care, and community for your golden years.",
    image: "/images/hero-section-house.png", // Replace with the actual image path
  },
  {
    title: "Next-Gen Living Spaces",
    subtitle: "Modern Apartments",
    description:
      "Our modern apartments redefine luxury and provide unmatched comfort with a contemporary touch.",
    image: "/images/apartment-example.png", // Replace with another image path
  },
  {
    title: "Elegant Villas",
    subtitle: "Exclusive Villas",
    description:
      "Discover timeless elegance with our premium villas, blending sophistication and serenity.",
    image: "/images/villa-example.png", // Replace with another image path
  },
];

const VisionForTheFuture: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = carouselData.length;

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
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 relative">
        {/* Carousel Content */}
        {carouselData.map((item, index) => (
          <div
            key={index}
            className={`transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            {/* Left Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold">{item.title}</h1>
                <p className="text-lg lg:text-xl font-light">
                  {item.subtitle}
                </p>
                <button className="bg-[#42210B] text-white px-6 py-3 rounded-md font-medium hover:bg-[#6B3A1E] transition-colors">
                  See What's New
                </button>
              </div>

              {/* Right Section */}
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.subtitle}
                  width={700}
                  height={400}
                  className="w-full h-auto"
                  quality={100}
                />
                <div className="absolute top-6 right-6 text-lg font-medium text-[#42210B]">
                  {item.subtitle}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto mt-12 text-center">
              <p className="text-base lg:text-lg text-[#42210B]">
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-[#42210B]" : "bg-[#CFC7C1]"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#42210B] text-white p-2 rounded-full hover:bg-[#6B3A1E]"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#42210B] text-white p-2 rounded-full hover:bg-[#6B3A1E]"
      >
        ❯
      </button>
    </div>
  );
};

export default VisionForTheFuture;
