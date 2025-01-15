import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/images/timelineImages/timelineImage1.png",
  "/images/timelineImages/timelineImage2.png",
  "/images/timelineImages/timelineImage3.png",
  "/images/timelineImages/timelineImage4.png",
];

const StorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  useEffect(() => {
    if (!containerRef.current || !imagesLoaded) return;

    const container = containerRef.current;
    const sections = gsap.utils.toArray(".section");

    // Set up horizontal scrolling
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${container.offsetWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          if (pathRef.current) {
            // Sync SVG path drawing with the scroll progress
            pathRef.current.setAttribute(
              "stroke-dasharray",
              `${progress} ${100 - progress}`
            );
          }
        },
      },
    });
  }, [imagesLoaded]);

  return (
    <div className="app relative overflow-hidden">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold z-10">
        Scroll horizontally to see the animation!
      </div>
      <div ref={containerRef} className="container flex w-full h-screen relative">
        {/* SVG Progress Line */}
        <div className="svg-container absolute top-5 left-0 w-full z-10">
          <svg
            width="1440"
            height="362"
            viewBox="0 0 1440 362"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d="M-8 180H413C460.804 147.959 492.047 137.083 553 128L564 95C526.069 26.133 531.183 12.315 539 -40C545.224 -81.6515 553.919 -104.024 588 -141C647.566 -181.95 700.106 -177.291 757 -141C795.667 -90.6719 806 -53 806 -17C806 19.001 795.019 65.157 776 107C839.181 123.44 871.464 137.31 923 171H1475"
              stroke="#CFA484"
              strokeWidth="11"
              fill="none"
            />
          </svg>
        </div>

        {images.map((img, index) => (
          <div key={index} className="section flex-none h-screen w-screen relative">
            <div className="image-container w-full h-full flex justify-center items-center overflow-hidden">
              <img
                src={img}
                alt={`Scene ${index + 1}`}
                onLoad={handleImageLoad}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className={`scroll-completed absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold opacity-0 transition-opacity duration-300 z-10 ${
          imagesLoaded ? "opacity-100" : ""
        }`}
      >
        Scroll Complete!
      </div>
    </div>
  );
};

export default StorySection;
