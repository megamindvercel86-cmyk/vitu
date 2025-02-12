"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import SubHeading from "@/components/Common/SubHeding";
import Heading from "@/components/Common/Heading";
import "./StorySection.css";
import StorySectionAnimation1 from "@/components/Animations/StorySectionAnimation1";
import StorySectionAnimation2 from "@/components/Animations/StorySectionAnimation2";
import Typography from "@/components/Typography/Typography";
gsap.registerPlugin(ScrollTrigger);

const lottieAnimationURL =
  "https://lottie.host/05df5b69-ac59-4204-af22-91c745dfe4dd/AQsEcUz4mq.lottie";

const images = [
  {
    src: "/images/timelineImages/timelineImage1.png",
    year: "1956",
    message: "KMK Group founded by Mr. K Madhav Kamath",
  },
  {
    src: "/images/timelineImages/timelineImage2.png",
    year: "1959",
    message: "Distribution of Major FMCG Products & WeTwo Matches",
  },
  {
    src: "/images/timelineImages/timelineImage3.png",
    year: "1974",
    message: "Established Maya Traders and affiliated ventures",
  },
  {
    src: "/images/timelineImages/timelineImage4.png",
    year: "1975",
    message: "Entered into Coffee Plantations Market",
  },
  {
    src: "/images/timelineImages/timelineImage5.png",
    year: "1990",
    message:
      "Expanded into wholesale distribution of WeTwo Fireworks under Mr K Ananth Kamath's ledership",
  },
  {
    src: "/images/timelineImages/timelineImage6.png",
    year: "2003",
    message:
      "Expanded into real-estate by trading land, partnering with MUDA on a 75-Acre development",
  },
  {
    src: "/images/timelineImages/timelineImage7.png",
    year: "2023",
    message:
      "Mr Laxman Kamath made a significant entry and established Vitu Realty",
  },
  {
    src: "/images/timelineImages/timelineImage8.png",
    year: "2024",
    message: "Launched Vaikuntam City, a premium plotted Development",
  },
];

function YearDisplay({
  number,
  isFixed,
}: {
  number: string;
  isFixed: boolean;
}) {
  return (
    <div
      className={`${isFixed ? "fixed bottom-28 left-48" : "absolute bottom-28 left-48"} pointer-events-none z-50`}
    >
      <span className="text-[80px] font-bold text-white font-CandideCondensedMedium">
        {number.split("").map((digit, index) => (
          <span key={index} className="inline-block w-[1ch]">
            {digit}
          </span>
        ))}
      </span>
    </div>
  );
}
function MessageDisplay({
  message,
  isFixed,
}: {
  message: string;
  isFixed: boolean;
}) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0,
          ease: "power2.out",
        }
      );
    }
  }, [message]); // Re-run animation when message changes

  return (
    <div
      className={`${
        isFixed ? "fixed bottom-32 right-10" : "absolute bottom-28 right-10"
      } pointer-events-none z-50 max-w-[450px]`}
    >
      <div ref={messageRef}>
        <span className="text-[32px] font-bold text-white font-freightNeoSemibold leading-tight block text-right">
          {message}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState(images[0].year);
  const [currentMessage, setCurrentMessage] = useState(images[0].message);
  const [progress, setProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const [animation1Completed, setAnimation1Completed] = useState(false);
  let svgWidth = galleryRef.current?.scrollWidth;

  useEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;
    const path = svgPathRef.current;

    if (!container || !gallery || !path) return;

    const totalWidth = gallery.scrollWidth;
    const windowWidth = window.innerWidth;

    // Create timeline for gallery scroll
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setProgress(progress);
          // path.style.strokeDashoffset = `${pathLength - progress * pathLength}`;
          // path.style.transform = `translateX(-${progress * 7000}px)`;

          const imageIndex = Math.min(
            Math.floor(progress * images.length),
            images.length - 1
          );
          setCurrentYear(images[imageIndex].year);
          setCurrentMessage(images[imageIndex].message);
          setIsFixed(progress > 0 && progress < 1);
        },
      },
    });

    // Animate gallery horizontally
    scrollTimeline.to(gallery, {
      x: () => -(totalWidth - windowWidth),
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const animation = gsap.timeline({
      onComplete: () => {
        setAnimation1Completed(true); // Trigger second animation
      },
    });

    animation.fromTo(
      ".story-animation-1",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  console.log(svgWidth);
  return (
    <div className="relative overflow-hidden">
      <div className="pt-[128px] pb-[107px] text-center">
        <Typography
          variant="custom"
          className=" font-freightNeoMedium text-[#4F3737] text-[1rem]
              px-7 pb-6
              sm:text-[1.375rem]
              md:px-0 md:text-[1.125rem]
              2xl:text-[2.125rem]"
        >
          From the welcoming comfort at your doorstep to the serene spaces
          designed just for you
        </Typography>
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-customBrown text-[1.5rem]
              px-7
              sm:text-[1.5rem]
              md:px-0 md:text-[2.5rem]
              lg2:text-[3.5rem]
              2xl:text-[5rem]"
        >
          At Vitu, Every Design Feels Like Home—Because It Is
        </Typography>
      </div>

      <div ref={containerRef} className="h-[100vh] w-full bg-black/5 relative">
        <div
          className="absolute top-1/2 z-50"
          ref={svgPathRef}
          style={{
            clipPath: `polygon(0% 0%, ${progress * 100}% 0%, ${progress * 100}% 100%, 0% 100%)`,
            transform: `translate(-${progress *9500}px , -50%)`,    
          }}
        >
          <svg
            width="11606"
            height="659"
            viewBox="0 0 11606 659"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10057 367H10338V191H11254V367H11606M8648 378.426H8988C9006.14 331.165 9035.64 303.339 9136 250.426C9128.95 206.853 9111.84 154.797 9148 121.424C9189.02 83.5687 9248.93 73.1542 9282 109.425C9315.07 145.696 9301.73 226.927 9282 290.426C9319.29 321.201 9337.87 339.55 9358 378.426H9398C9420.05 342.288 9435.45 325.293 9468 302.426C9408.15 227.259 9408.81 157.87 9468 114.426C9511.44 82.5357 9543.63 85.7166 9584 121.424C9629.63 161.789 9620.21 229.478 9608 290.426C9662.86 306.438 9689.52 323.675 9732 366.426H10216M8800 379H8180L7794 205L7620 286L7561 276L7248 421H7188M5723 320.967H6327L6352 307.967C6333.62 238.386 6335.69 177.69 6382 127.967C6425.71 81.0387 6453.19 85.413 6522 113.967C6547.94 86.0049 6566.85 74.5621 6607 63.9672C6664.47 54.1186 6706.22 55.8281 6741 97.9666C6762.89 124.489 6763.96 141.471 6768 171.967C6775.23 226.532 6754.03 257.967 6731 307.967C6780.66 344.472 6803.7 368.964 6835 420.967H7253M4328 500H4644C4641.49 549.415 4651.83 568.745 4686 592C4715.87 647.863 4741.81 651.646 4798 628C4846.23 662.126 4872.84 665.522 4917 611C4958.52 615.735 4978.07 607.043 5009 580C5105.29 554.47 5110.09 519.185 5078 439C5115.42 402.241 5100.23 377.304 5082 321H5836M1448 346H1761V281L2399 33L2579 346L2923 538M0 356.743H421C468.804 324.202 500.047 313.325 561 304.243L572 271.242C534.069 202.375 539.183 188.557 547 136.243C553.224 94.5916 561.919 72.2184 596 34.2426C655.566 -5.70802 708.106 -1.04835 765 34.2426C803.667 84.5703 814 122.242 814 158.243C814 194.243 803.019 240.399 784 282.243C847.181 298.682 879.464 312.552 931 346.243H1483M2583 350L3031 596V585H3051L3065 521H3147V508H3221L3330 521V537H3401V521H3452V500H3515V464H3537V404H3662V500H4336"
              stroke="#CFA484"
              strokeWidth="11"
            />
          </svg>
        </div>

        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div
          ref={galleryRef}
          className="flex absolute top-1/2 -translate-y-1/2 will-change-transform"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-none w-[100vw] h-[100vh] overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 gallery-image z-10">
                <Image
                  width={1594}
                  height={904}
                  src={image.src}
                  alt={`Landscape ${image.year}`}
                  className="w-full h-full object-fill"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="h-2 w-2 bg-primary rounded-full absolute -top-[150px] left-1/2 transform -translate-x-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <YearDisplay number={currentYear} isFixed={isFixed} />
      <MessageDisplay message={currentMessage} isFixed={isFixed} />
    </div>
  );
}
