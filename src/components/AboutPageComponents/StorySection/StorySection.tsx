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
        scrub: 0,
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
          className="absolute top-[47%] z-50"
          ref={svgPathRef}
          style={{
            clipPath: `polygon(0% 0%, ${progress * 100}% 0%, ${progress * 100}% 100%, 0% 100%)`,
            transform: `translate(-${progress * 13450}px , -50%)`,
          }}
        >
          <svg
            width="15361"
            height="959"
            viewBox="0 0 15361 859"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11520.1 489.202H11934.9C11955.8 441.942 11986.6 369.391 12110.1 337.61C12102 294.038 12089.3 210.735 12122.5 169.138C12188.5 86.6701 12294.7 107.537 12316.4 163.005C12338.2 218.472 12317 314.895 12294.4 378.394C12346.1 407.759 12379.2 446.368 12395.5 489.202H12490.2C12519.1 433.19 12525.2 401.645 12559 378.394C12490.2 280.275 12503.3 181.262 12562.9 134.27C12609.4 97.6229 12664.5 90.9819 12709.3 128.632C12757.5 169.138 12751.9 317.446 12737.9 378.394C12800.8 394.407 12847.2 424.099 12879.2 489.202H13440.7M0.285156 437.258H560.836L561.167 436.981C622.059 386.068 636.787 373.754 715.792 362.577L740.076 311.896C714.668 226.625 704.906 210.496 729.19 133.057C742.434 90.8253 740.639 79.7797 789.192 31.1138C873.077 -9.66432 924.124 11.3969 997.115 42.2796C1052.04 114.766 1041.56 159.307 1034.58 210.833C1027.59 262.359 1021.81 301.979 997.115 353.563C1084.36 353.563 1133.26 379.385 1190.19 447.605H1920.29M1920.29 448.507H2345.13V339.796L2755.6 172.358L3167.71 7.25586L3417.76 426.795L3840.11 640.43M3838.65 639.57L4043 807.519L4049.45 760.948H4065.93L4085.99 674.253L4190.6 680.504V662.072H4309.54L4448.54 670.539V695.51H4528.07V677.767H4591.83V640.968H4682.51V600.226H4707.48V517.428H4875.83V656.529H4935.59L5761.5 663.645M5758.04 663.581L6190.8 654.123C6169.29 704.117 6196.42 760.403 6248.26 775.525C6248.26 828.199 6348.16 877.271 6390.4 814.408C6432.23 887.222 6528.2 869.731 6546.79 787.621C6590.79 814.408 6638.56 786.045 6661.42 740.856C6781.15 761.896 6813.43 654.123 6757.04 570.642C6804.69 533.882 6803.43 461.5 6747.34 411.629H7678.67M7678.67 411.63L8456.01 411.63L8423.17 331.245C8400.08 247.97 8449.17 119.104 8524.36 119.104C8602.9 119.104 8604.24 119.104 8682.18 163.89C8714.76 130.425 8731.34 89.1754 8781.77 76.4953C8853.95 64.7084 8929.81 80.2058 8973.49 130.637C9000.98 162.38 9011.02 202.429 9016.1 238.927C9025.18 304.23 8973.6 336.231 8944.67 396.071C9007.04 439.76 9035.98 469.073 9075.29 531.311H9600.28M11520.3 489.175L10834.7 481.781L10369.7 261.484L10108 371.293L10063.3 352.314L9640.3 531.175H9600.29M13440.3 489.201H13794.9V245.158H15035.2V489.201H15360.3"
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
                  className="w-full h-full object-cover"
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
