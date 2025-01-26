import React, { useState, useEffect, useCallback } from "react";
import Typography from "../Typography/Typography";

const images = [
  "/images/visionAndMissionImages/1.png",
  "/images/visionAndMissionImages/2.png",
  "/images/visionAndMissionImages/3.png",
];
const mobileImages = [
  "/images/visionAndMissionImages/8.png",
  "/images/visionAndMissionImages/5.png",
  "/images/visionAndMissionImages/8.png",
];
const contentSets = [
  [
    {
      title: "Innovative Design",
      description:
        "Pushing boundaries with cutting-edge architectural concepts",
    },
    {
      title: "Modern Living",
      description: "Contemporary spaces that inspire and elevate daily life",
    },
    {
      title: "Smart Solutions",
      description: "Integrating technology for enhanced living experiences",
    },
  ],
  [
    {
      title: "Sustainable Future",
      description: "Eco-friendly approaches to modern architecture",
    },
    {
      title: "Natural Harmony",
      description: "Blending seamlessly with the surrounding environment",
    },
    {
      title: "Green Living",
      description: "Creating spaces that respect and preserve nature",
    },
  ],
  [
    {
      title: "Luxury Redefined",
      description: "Excellence in every detail of modern living",
    },
    {
      title: "Premium Quality",
      description: "Uncompromising standards in design and execution",
    },
    {
      title: "Timeless Elegance",
      description: "Creating lasting impressions through sophisticated design",
    },
  ],
];
const mobileContentSets = [
  {
    title: "Innovative Design",
    description: "Pushing boundaries with cutting-edge architectural concepts",
  },
  {
    title: "Modern Living",
    description: "Contemporary spaces that inspire and elevate daily life",
  },
  {
    title: "Smart Solutions",
    description: "Integrating technology for enhanced living experiences",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isDescriptionVisible, setIsDescriptionVisible] =
    useState<boolean>(false);
  const totalSlides = 3;

  const transition = useCallback(
    (newDirection: "left" | "right") => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(newDirection);
      setIsDescriptionVisible(false); // Reset description visibility on slide change

      const nextIndex =
        newDirection === "right"
          ? (currentIndex + 1) % totalSlides
          : (currentIndex - 1 + totalSlides) % totalSlides;

      setCurrentIndex(nextIndex);
      setTimeout(() => setIsAnimating(false), 500);
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
    <div className="bg-gray-100 sm:p-0 md:p-[1px]">
      {/* Main Carousel */}
      <div className="relative group">
        {/* Desktop Version */}
        <div className="overflow-hidden hidden md:block shadow-xl aspect-[2/1] relative">
          {/* Image container */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              currentIndex === currentIndex
                ? "opacity-100 translate-x-0"
                : direction === "right"
                ? currentIndex ===
                  (currentIndex - 1 + totalSlides) % totalSlides
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
            <div
              className={`absolute top-0 ${
                direction === "left" ? "right-[-100%]" : "left-[-100%]"
              } w-full h-full`}
            >
              <img
                src={
                  images[
                    (currentIndex +
                      (direction === "left" ? 1 : -1) +
                      images.length) %
                      images.length
                  ]
                }
                alt="Next slide"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Vertical dividing lines */}
          <div className="absolute inset-0 flex">
            <div className="flex-1 border-r border-white"></div>
            <div className="flex-1 border-r border-white"></div>
            <div className="flex-1"></div>
          </div>

          {/* Sections with titles and hover descriptions */}
          <div className="absolute inset-0 flex">
            {contentSets[currentIndex].map((section, index) => (
              <div key={index} className="flex-1 group/section relative">
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  {/* Always visible title */}
                  <Typography
                    variant="h2"
                    className="font-freightNeoMedium mb-[5px] text-center"
                  >
                    {" "}
                    {section.title}{" "}
                  </Typography>
                  {/* Hover description */}
                  <div className="overflow-hidden h-0 group-hover/section:h-16 transition-all duration-300">
                    <Typography
                      variant="h3"
                      fontWeight="font-normal"
                      className="font-FreightNeoProNormal mt-[5px] text-center"
                    >
                      {" "}
                      {section.description}{" "}
                    </Typography>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/section:bg-black/10 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Version */}
        <div className="block md:hidden relative overflow-hidden shadow-xl">
          <img
            src={mobileImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div
            className="absolute inset-0 flex flex-col justify-end items-center text-center p-6"
            // onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
          >
            <Typography
              variant="h2"
              className="font-freightNeoMedium mb-[5px] text-white"
            >
              {mobileContentSets[currentIndex].title}
            </Typography>
            <div
              className={`overflow-hidden transition-all duration-300 ${
               "h-16" 
              }`}
            >
              <Typography
                variant="h3"
                fontWeight="font-normal"
                className="font-FreightNeoProNormal mt-[5px] text-white"
              >
                {mobileContentSets[currentIndex].description}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
