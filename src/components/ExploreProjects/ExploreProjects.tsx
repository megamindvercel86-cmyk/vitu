"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typography from "../Typography/Typography";

gsap.registerPlugin(ScrollTrigger);

type Image = {
  id: number;
  url: string;
  className: string;
};

const images: Image[] = [
  {
    id: 1,
    url: "/images/exploreProjectImages/1.png",
    className:
      "absolute top-[44px] left-[70px] w-[348px] h-[435px] rounded-[20px]",
  },
  {
    id: 2,
    url: "/images/exploreProjectImages/2.png",
    className: "absolute top-0 right-[56px] w-[348px] h-[435px] rounded-[20px]",
  },
  {
    id: 3,
    url: "/images/exploreProjectImages/3.png",
    className:
      "absolute top-[874px] left-[42px] w-[348px] h-[435px] rounded-[20px]",
  },
  {
    id: 4,
    url: "/images/exploreProjectImages/5.png",
    className:
      "absolute top-[1045px] right-[42px] w-[348px] h-[435px] rounded-[20px]",
  },
  {
    id: 5,
    url: "/images/exploreProjectImages/4.png",
    className:
      "absolute top-[1101px] w-[297px] h-[371px] left-[523px] rounded-[20px]",
  },
];

const ExploreProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Set initial state of images
    gsap.set(imagesRef.current, {
      y: 100,
      opacity: 0,
    });

    // Create animations for each image
    imagesRef.current.forEach((image, index) => {
      gsap.to(image, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
          markers: false,
        },
        delay: index * 0.2, // Stagger the animations
      });
    });
  }, []);

  return (
    <div className="h-[1835px]">
      <div
        ref={sectionRef}
        className="relative flex items-center justify-center"
      >
        <div className="relative w-full">
          {images.map((image, index) => (
            <img
              key={image.id}
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              src={image.url}
              alt={`Image ${image.id}`}
              className={`${image.className} object-cover`}
            />
          ))}

          {/* Centered Text and Button */}
          <div className="leading-[1] h-[328px] absolute inset-0 flex flex-col items-center top-[553px] justify-center z-10 text-center">
            
            <Typography variant="custom" className="text-[120px] text-customBrown font-freightNeoMedium pb-[39px]">
              A New Home,
              <br />A New Way of Life
            </Typography>
            <button className="items-center w-[287px] h-[56px] rounded-[36px] border-[2px]  border-customBrown text-customBrown text-[22px] font-FreightNeoProBold">
              Explore the Project Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProjects;
