import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Typography from "../Typography/Typography";
import AppleStyleCard from "../ui/apple-style-card";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
      "absolute top-[944px] xl:left-[70px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
  },
  {
    id: 2,
    url: "/images/exploreProjectImages/2.png",
    className:
      "absolute top-[900px] xl:right-[56px] md:right-[-150px]  w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
  },
  {
    id: 3,
    url: "/images/exploreProjectImages/3.png",
    className:
      "absolute top-[1574px] left-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
  },
  {
    id: 4,
    url: "/images/exploreProjectImages/5.png",
    className:
      "absolute top-[1945px] right-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
  },
  {
    id: 5,
    url: "/images/exploreProjectImages/4.png",
    className:
      "absolute top-[2001px] w-[297px] h-[371px] left-[523px] rounded-[20px] z-20",
    startPosition: { y: 100 },
  },
];

const ExploreProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textRefHome = useRef<HTMLDivElement>(null);
  const textRefLife = useRef<HTMLDivElement>(null);
  const imagesWapperf = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Create ScrollTrigger for pinning the text section
    ScrollTrigger.create({
      trigger: textWrapperRef.current,
      start: "top 10%",
      end: "+=1300",
      pin: true,
      pinSpacing: true,
    });

    // Animation for "A New Home"
    gsap.fromTo(
      textRefHome.current,
      {
        scaleY: 5,
        filter: "blur(10px)",
        opacity: 0,
        paddingTop: 100,
        y: 100,
      },
      {
        scaleY: 1,
        filter: "blur(0px)",
        opacity: 1,
        paddingTop: 0,
        y: 0,
        duration: 4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "top 60%",
        },
      }
    );

    // Animation for "A New Way of Life"
    gsap.fromTo(
      textRefLife.current,
      {
        scaleY: 5,
        filter: "blur(10px)",
        opacity: 0,
        paddingTop: 150,
      },
      {
        scaleY: 1,
        filter: "blur(0px)",
        opacity: 1,
        paddingTop: 0,
        duration: 4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
        },
      }
    );
    // Animation for the button
    gsap.fromTo(
      buttonRef.current,
      {
        scaleY: 5,
        filter: "blur(10px)",
        opacity: 0,
        paddingTop: 50,
      },
      {
        scaleY: 1,
        filter: "blur(0px)",
        opacity: 1,
        paddingTop: 0,
        duration: 4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "top 60%",
        },
      }
    );

    // Smooth Scroll to target position
    ScrollTrigger.create({
      trigger: textRefLife.current,
      start: "top 50%", // Start position (when the text comes into view)
      onEnter: () => {
        gsap.to(window, {
          scrollTo: {
            y: 3600, // Scroll target position
            autoKill: false, // Prevent jumping to the target before the scroll is complete
          },
          duration: 2, // Duration of the scroll animation
          ease: "power2.out", // Easing for smooth transition
        });
      },
    });



    // Cleanup ScrollTriggers on component unmount
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
    <div className="h-[2435px] relative z-0 overflow-hidden">
      <div ref={sectionRef} className="relative min-h-screen ">
        <div className="relative w-full">
          {/* <div ref={imagesWapperf}> */}
          <div>
            {images.map((image) => (
              <AppleStyleCard
              key={image.id}
              id={image.id}
              imageSrc={image.url}
              content={cardContent}
              className={image.className}
              categoryClassName="text-blue-600 dark:text-blue-300"
              titleClassName="text-2xl md:text-4xl text-blue-800 dark:text-blue-100"
              expandedClassName="bg-blue-50 dark:bg-blue-950"
              expandedImageClassName="object-center"
              />
            ))}
            </div>
          {/* </div> */}
          {/* Text Wrapper for pinning */}
          <div
            ref={textWrapperRef}
            className="w-full flex flex-col items-center justify-center z-10 text-center leading-[1] pt-10"
          >
            <Typography
              variant="custom"
              ref={textRefHome}
              className="text-[120px] text-customBrown font-freightNeoMedium pb-[10px]"
            >
              A New Home,
            </Typography>
            <Typography
              variant="custom"
              ref={textRefLife}
              className="text-[120px] text-customBrown font-freightNeoMedium pb-[39px]"
            >
              A New Way of Life
            </Typography>
            <button
              ref={buttonRef}
              className="items-center w-[287px] h-[56px] rounded-[36px] border-[2px] border-customBrown text-customBrown text-[22px] font-FreightNeoProBold hover:bg-customBrown hover:text-white transition-colors duration-300"
            >
              Explore the Project Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProjects;
