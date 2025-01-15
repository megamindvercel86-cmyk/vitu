'use client';
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Using placeholder images from Unsplash for demonstration
const images = [
  "/images/timelineImages/timelineImage1.png",
  "/images/timelineImages/timelineImage2.png",
  "/images/timelineImages/timelineImage3.png",
  "/images/timelineImages/timelineImage4.png",
  "/images/timelineImages/timelineImage5.png",
  "/images/timelineImages/timelineImage6.png",
  "/images/timelineImages/timelineImage7.png",
  "/images/timelineImages/timelineImage8.png",
];

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const sections = gsap.utils.toArray(".section");

    // Create a wrapper for horizontal scrolling
    gsap.set(container, { height: "100vh" });
    gsap.set(".sections-wrapper", { width: sections.length * 100 + "%", display: "flex" });
    gsap.set(sections, { width: 100 / sections.length + "%" });

    // Set up horizontal scrolling
    gsap.to(".sections-wrapper", {
      x: () => -(container?.scrollWidth ?? 0 - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => (container ? container.scrollWidth - window.innerWidth : 0),
        invalidateOnRefresh: true, // Ensure ScrollTrigger recalculates on refresh
      },
    });

    // Force ScrollTrigger refresh after images have fully loaded
    ScrollTrigger.refresh();
  }, [imagesLoaded]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <div className="app overflow-hidden font-sans ">
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div className="sections-wrapper h-full">
          {images.map((img, index) => (
            <div key={index} className="section h-full flex items-center justify-center relative">
              <div className="w-full h-full">
                <img src={img} alt={`Scene ${index + 1}`} className="w-full h-full object-cover" onLoad={handleImageLoad} />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;