import React, { useState, useEffect, useCallback } from "react";
import Typography from "../Typography/Typography";

const images = [
  "/images/visionAndMissionImages/1.png",
  "/images/visionAndMissionImages/2.png",
  "/images/visionAndMissionImages/3.png",
];
const contentSets = [
  // First image content set
  [
    {
      title: 'Innovative Design',
      description: 'Pushing boundaries with cutting-edge architectural concepts',
    },
    {
      title: 'Modern Living',
      description: 'Contemporary spaces that inspire and elevate daily life',
    },
    {
      title: 'Smart Solutions',
      description: 'Integrating technology for enhanced living experiences',
    }
  ],
  // Second image content set
  [
    {
      title: 'Sustainable Future',
      description: 'Eco-friendly approaches to modern architecture',
    },
    {
      title: 'Natural Harmony',
      description: 'Blending seamlessly with the surrounding environment',
    },
    {
      title: 'Green Living',
      description: 'Creating spaces that respect and preserve nature',
    }
  ],
  // Third image content set
  [
    {
      title: 'Luxury Redefined',
      description: 'Excellence in every detail of modern living',
    },
    {
      title: 'Premium Quality',
      description: 'Uncompromising standards in design and execution',
    },
    {
      title: 'Timeless Elegance',
      description: 'Creating lasting impressions through sophisticated design',
    }
  ]
];

function App() {
   const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const totalSlides = 3;
  
    const transition = useCallback(
      (newDirection: "left" | "right") => {
        if (isAnimating) return;
  
        setIsAnimating(true);
        setDirection(newDirection);
  
        const nextIndex =
          newDirection === "right"
            ? (currentIndex + 1) % totalSlides
            : (currentIndex - 1 + totalSlides) % totalSlides;
  
        setCurrentIndex(nextIndex);
        setTimeout(() => setIsAnimating(false), 500); // Reduced animation time for smoother transitions
      },
      [currentIndex, totalSlides, isAnimating]
    );
  
    const nextSlide = useCallback(() => transition("right"), [transition]);
    const prevSlide = useCallback(() => transition("left"), [transition]);
  
    useEffect(() => {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }, [nextSlide]);

  return (
    <div className=" bg-gray-100 p-[1px]">
      {/* Main Carousel with Divisions */}
      <div className="relative  group">
        <div className="overflow-hidden rounded-lg shadow-xl aspect-[2/1] relative">
          {/* Image container */}
          <div 
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              currentIndex === currentIndex
                ? "opacity-100 translate-x-0"
                : direction === "right"
                ? currentIndex === (currentIndex - 1 + totalSlides) % totalSlides
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
                : currentIndex === (currentIndex + 1) % totalSlides
                ? "opacity-0 translate-x-full"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Next image for smooth transition */}
            <div className={`absolute top-0 ${direction === 'left' ? 'right-[-100%]' : 'left-[-100%]'} w-full h-full`}>
              <img
                src={images[(currentIndex + (direction === 'left' ? 1 : -1) + images.length) % images.length]}
                alt="Next slide"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Vertical dividing lines */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-white/30"></div>
            <div className="flex-1 border-r border-white/30"></div>
            <div className="flex-1"></div>
          </div>

          {/* Sections with titles and hover descriptions */}
          <div className="absolute inset-0 flex">
            {contentSets[currentIndex].map((section, index) => (
              <div key={index} className="flex-1 group/section relative">
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  {/* Always visible title */}
                  <h3 className="text-xl font-medium mb-2 text-center transition-all duration-500">
                    {section.title}
                  </h3>
                  {/* Hover description */}
                  <div className="overflow-hidden h-0 group-hover/section:h-16 transition-all duration-300">
                    <p className="text-sm text-center opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 delay-150">
                      {section.description}
                    </p>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/section:bg-black/40 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
