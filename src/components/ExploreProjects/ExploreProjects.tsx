import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typography from "../Typography/Typography";
import AppleStyleCard from "../ui/apple-style-card";

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
    className:
      "absolute top-[644px] xl:left-[70px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
  },
  {
    id: 2,
    url: "/images/exploreProjectImages/2.png",
    className:
      "absolute top-[600px] xl:right-[56px] md:right-[-150px]  w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
  },
  {
    id: 3,
    url: "/images/exploreProjectImages/3.png",
    className:
      "absolute top-[1474px] left-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
  },
  {
    id: 4,
    url: "/images/exploreProjectImages/5.png",
    className:
      "absolute top-[1645px] right-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
  },
  {
    id: 5,
    url: "/images/exploreProjectImages/4.png",
    className:
      "absolute top-[1701px] w-[297px] h-[371px] left-[523px] rounded-[20px] z-20",
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
      end: "+=1100",
      pin: true,
      pinSpacing: true,
    });

    // Fade in animation for the text
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 50,
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const cardContent = (
    <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Discover the power of innovation.
        </span>{" "}
        Our latest product combines cutting-edge technology with sleek design,
        providing an unparalleled user experience that will transform the way
        you interact with your devices.
      </p>
    </div>
  );

  return (
    <div className="h-[2235px] relative z-0 overflow-hidden">
      <div ref={sectionRef} className="relative min-h-screen ">
        <div className="relative w-full">
          {images.map((image) => (
            <AppleStyleCard
              key={image.id}
              id={image.id}
              imageSrc={image.url}
              content={cardContent}
              className={image.className} // Custom size
              categoryClassName="text-blue-600 dark:text-blue-300" // Custom category text color
              titleClassName="text-2xl md:text-4xl text-blue-800 dark:text-blue-100" // Custom title styling
              expandedClassName="bg-blue-50 dark:bg-blue-950" // Custom expanded card background
              expandedImageClassName="object-center" // Custom expanded image positioning
            />
          ))}

          <div
            ref={textRef}
            className="w-full flex flex-col items-center justify-center z-10 text-center leading-[1]"
          >
            <Typography
              variant="custom"
              className="text-[120px] text-customBrown font-freightNeoMedium pb-[39px]"
            >
              A New Home,
              <br />
              A New Way of Life
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
