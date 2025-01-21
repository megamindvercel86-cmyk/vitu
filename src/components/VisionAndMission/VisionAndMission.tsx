import React, { useState, useEffect, useCallback } from "react";
import SubHeading from "../Common/SubHeding";
import Heading from "../Common/Heading";
import Typography from "../Typography/Typography";

const images = [
  {
    url: "/images/visionAndMissionImages/1.png",
    title: "Innovative Sustainability",
    description:
      "Revolutionizing green living by making eco-friendly solutions effortless.",
  },
  {
    url: "/images/visionAndMissionImages/2.png",
    title: "Affordable Luxury",
    description: "Revolutionizing green ",
  },
  {
    url: "/images/visionAndMissionImages/3.png",
    title: "Client Satisfaction",
    description:
      "Revolutionizing green living by making eco-friendly solutions effortless.",
  },
  {
    url: "/images/visionAndMissionImages/4.png",
    title: "Innovative Sustainability",
    description:
      "Revolutionizing green living by making eco-friendly solutions effortless.",
  },
  {
    url: "/images/visionAndMissionImages/5.png",
    title: "Cozy Corners",
    description: "Perfect spaces to unwind",
  },
  {
    url: "/images/visionAndMissionImages/6.png",
    title: "Minimalist Dream",
    description: "Less is more philosophy",
  },
  {
    url: "/images/visionAndMissionImages/7.png",
    title: "Luxe Living",
    description: "Premium lifestyle spaces",
  },
  {
    url: "/images/visionAndMissionImages/8.png",
    title: "Contemporary Charm",
    description: "Modern day comfort",
  },
  {
    url: "/images/visionAndMissionImages/9.png",
    title: "Serene Spaces",
    description: "Tranquil living environments",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSlides = Math.ceil(images.length / 3);

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

  const prev = useCallback(() => transition("left"), [transition]);
  const next = useCallback(() => transition("right"), [transition]);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(next, 53000);
      return () => clearInterval(timer);
    }
  }, [isPaused, next]);

  const getVisibleImages = (index: number) => {
    const startIdx = index * 3;
    return images.slice(startIdx, startIdx + 3);
  };

  return (
    <div className="items-center justify-center p-[1px]">
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[891px] overflow-hidden">
          <div className="absolute w-full h-full">
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className={`absolute w-full h-full flex gap-[2px] transition-transform duration-800 ease-out will-change-transform`}
                style={{
                  transform: `translateX(${
                    (slideIndex - currentIndex) * 100
                  }%)`,
                  opacity: slideIndex === currentIndex ? 1 : 0,
                  transition:
                    "transform 800ms ease-out, opacity 800ms ease-out",
                }}
              >
                {getVisibleImages(slideIndex).map((image, imageIndex) => (
                  <div
                    key={`${slideIndex}-${imageIndex}`}
                    className="flex-1 relative group overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transform transition-transform duration-500"
                    />
                    {/* Title positioned at the bottom center with animation */}
                    <div className="absolute bottom-[70px] w-full left-1/2 px-24 transform -translate-x-1/2 text-white z-10 transition-transform duration-500 group-hover:translate-y-[-10px] text-center">
                      <Typography
                        variant="h2"
                        className="font-freightNeoMedium mb-[5px]"
                      >
                        {image.title}
                      </Typography>
                    </div>

                    {/* Description appears only on hover and is centered */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center absolute bottom-0 left-0 right-0 p-6 text-white flex justify-center items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <Typography
                          variant="h3"
                          fontWeight="font-normal"
                          className="font-FreightNeoProNormal mt-[5px]"
                        >
                          {image.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              disabled={isAnimating}
              onClick={() => {
                if (index !== currentIndex) {
                  transition(index > currentIndex ? 'right' : 'left');
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
