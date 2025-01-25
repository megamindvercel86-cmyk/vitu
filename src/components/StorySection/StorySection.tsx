import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SubHeading from "../Common/SubHeding";
import Heading from "../Common/Heading";

gsap.registerPlugin(ScrollTrigger);

const images = [
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
    year: "2003",
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

function YearDisplay({ number }: { number: number }) {
  return (
    <span className="inline-block w-[1ch] transition-transform duration-500">
      {number}
    </span>
  );
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storySectionRef = useRef<HTMLDivElement>(null); // Ref for Story Section
  const [currentYear, setCurrentYear] = useState(images[0].year);
  const [showYearDisplay, setShowYearDisplay] = useState(false); // State to control visibility of year display
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray<HTMLElement>(".section");

    gsap.set(container, { height: "100vh" });
    gsap.set(".sections-wrapper", {
      width: sections.length * 100 + "%",
      display: "flex",
      overflow: "hidden",
    });
    gsap.set(sections, { width: 100 / sections.length + "%" });

    gsap.to(".sections-wrapper", {
      x: () => -(container?.scrollWidth ?? 0 - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => (container ? container.scrollWidth - window.innerWidth : 0),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const totalSections = images.length - 1;
          const currentIndex = Math.min(
            Math.floor(self.progress * totalSections),
            totalSections - 1,
          );
          setCurrentYear(images[currentIndex].year);
          setProgress(self.progress * 100);
        },
      },
    });
    // gsap.to(sections, {
    //   xPercent: -100 * (sections.length - 1),
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: container,
    //     pin: true,
    //     scrub: 1,
    //     end: () => `+=${container.offsetWidth}`,
    //     invalidateOnRefresh: true,
    //     onUpdate: (self) => {
    //       const progress = self.progress * 100;
    //       if (pathRef.current) {
    //         // Sync SVG path drawing with the scroll progress
    //         pathRef.current.setAttribute(
    //           "stroke-dasharray",
    //           `${progress} ${100 - progress}`
    //         );
    //       }
    //     },
    //   },
    // });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div className="app overflow-hidden font-sans">
      {/* Top Section */}
      <div className="pt-[128px] pb-[107px] text-center">
        <SubHeading className="pb-6 text-2xl">
          From the welcoming comfort at your doorstep to the serene spaces
          designed just for you
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
                  alt={`Scene ${index}`}
                  className="w-full h-full object-cover"
                />

                {/* Message */}
                <div className="absolute bottom-8 right-8 text-white">
                  <p className="text-lg md:text-xl font-medium">
                    {image.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent">
          <div className="absolute bottom-4 left-1 right-1">
            <div className="relative h-[2px] w-full">
              {/* Background line */}
              <div className="absolute inset-0 bg-white/20" />
              {/* Progress line */}
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-300 to-purple-300 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
