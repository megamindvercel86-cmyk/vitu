import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typography from "../Typography/Typography";

gsap.registerPlugin(ScrollTrigger);

type Image = {
  id: number;
  url: string;
  className: string;
  startPosition: { x?: number; y?: number };
};

const images: Image[] = [
  {
    id: 1,
    url: "/images/exploreProjectImages/1.png",
    className: "absolute top-[644px] left-[70px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: -100 },
  },
  {
    id: 2,
    url: "/images/exploreProjectImages/2.png",
    className: "absolute top-[600px] right-[56px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: 100 },
  },
  {
    id: 3,
    url: "/images/exploreProjectImages/3.png",
    className: "absolute top-[1474px] left-[42px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: -100 },
  },
  {
    id: 4,
    url: "/images/exploreProjectImages/5.png",
    className: "absolute top-[1645px] right-[42px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: 100 },
  },
  {
    id: 5,
    url: "/images/exploreProjectImages/4.png",
    className: "absolute top-[1701px] w-[297px] h-[371px] left-[523px] rounded-[20px]",
    startPosition: { y: 100 },
  },
];

const ExploreProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create ScrollTrigger for pinning the text section
    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 20%",
      end: "+=1100", // Adjust this value to control how long the text stays fixed
      pin: true,
      pinSpacing: true,
    });

    // Fade in animation for the text
    gsap.fromTo(
      textRef.current,
      { 
        opacity: 0,
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: false,
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="h-[2835px]">
      <div ref={sectionRef} className="relative min-h-screen">
        <div className="relative w-full">
          <div>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Image ${image.id}`}
                className={`${image.className} object-cover`}
              />
            ))}
          </div>

          <div
            ref={textRef}
            className="w-full flex flex-col items-center justify-center z-10 text-center leading-[1]"
          >
            <Typography variant="custom" className="text-[120px] text-customBrown font-freightNeoMedium pb-[39px]">
              A New Home,
              <br />A New Way of Life
            </Typography>
            <button className="items-center w-[287px] h-[56px] rounded-[36px] border-[2px] border-customBrown text-customBrown text-[22px] font-FreightNeoProBold hover:bg-customBrown hover:text-white transition-colors duration-300">
              Explore the Project Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProjects;
