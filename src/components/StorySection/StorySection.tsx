"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubHeading from "../Common/SubHeding";
import Heading from "../Common/Heading";

gsap.registerPlugin(ScrollTrigger);

const images: { src: string; year: string; message: string }[] = [
  {
    src: "/images/timelineImages/timelineImage1.png",
    year: "1956",
    message: "The Beginning of Our Journey",
  },
  {
    src: "/images/timelineImages/timelineImage2.png",
    year: "1959",
    message: "A Step Towards Innovation",
  },
  {
    src: "/images/timelineImages/timelineImage3.png",
    year: "1974",
    message: "Expanding Horizons",
  },
  {
    src: "/images/timelineImages/timelineImage4.png",
    year: "1975",
    message: "Breaking New Grounds",
  },
  {
    src: "/images/timelineImages/timelineImage5.png",
    year: "1990",
    message: "A Year of Transformation",
  },
  {
    src: "/images/timelineImages/timelineImage6.png",
    year: "2003-2012",
    message: "Facing Challenges, Emerging Stronger",
  },
  {
    src: "/images/timelineImages/timelineImage7.png",
    year: "2023",
    message: "Reaching New Heights",
  },
  {
    src: "/images/timelineImages/timelineImage8.png",
    year: "2024",
    message: "Continuing the Legacy",
  },
];

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray<HTMLElement>(".section");

    // Create a wrapper for horizontal scrolling
    gsap.set(container, { height: "100vh" });
    gsap.set(".sections-wrapper", {
      width: sections.length * 100 + "%",
      display: "flex",
    });
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
    <div className="app overflow-hidden font-sans">
      {/* Top Section */}
      <div className="pt-[128px] pb-[107px] text-center">
        <SubHeading className="pb-6 text-2xl">
          From the welcoming comfort at your doorstep to the serene spaces
          designed just for you{" "}
        </SubHeading>
        <Heading className="">
          At Vitu, Every Design Feels Like Home—Because It Is
        </Heading>
      </div>

      {/* Horizontal Scroll Section */}
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div className="sections-wrapper h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="section h-full flex items-center justify-center relative"
            >
              {/* Image Section */}
              <div className="w-full h-full">
                <img
                  src={image.src}
                  alt={`Scene ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                />

                {/* Overlay for Darker Background */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Year and Message */}
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-2xl md:text-3xl font-bold">{image.year}</p>
                </div>
                <div className="absolute bottom-8 right-8 text-white">
                  <p className="text-lg md:text-xl font-medium">
                    {image.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
