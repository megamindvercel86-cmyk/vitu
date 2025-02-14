"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import "./StorySection.css";
import Typography from "@/components/Typography/Typography";
gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile1.png",
    src: "/images/timelineImages/timelineImage1.png",
    year: "1956",
    message: "KMK Group founded by Mr. K Madhav Kamath",
  },
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile2.png",
    src: "/images/timelineImages/timelineImage2.png",
    year: "1959",
    message: "Distribution of Major FMCG Products & WeTwo Matches",
  },
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile3.png",
    src: "/images/timelineImages/timelineImage3.png",
    year: "1974",
    message: "Established Maya Traders and affiliated ventures",
  },
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile4.png",
    src: "/images/timelineImages/timelineImage4.png",
    year: "1975",
    message: "Entered into Coffee Plantations Market",
  },
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile5.png",
    src: "/images/timelineImages/timelineImage5.png",
    year: "1990",
    message:
      "Expanded into wholesale distribution of WeTwo Fireworks under Mr K Ananth Kamath's ledership",
  },
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile6.png",
    src: "/images/timelineImages/timelineImage6.png",
    year: "2003",
    message:
      "Expanded into real-estate by trading land, partnering with MUDA on a 75-Acre development",
  },
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile7.png",
    src: "/images/timelineImages/timelineImage7.png",
    year: "2023",
    message:
      "Mr Laxman Kamath made a significant entry and established Vitu Realty",
  },
  {
    mobileSrc: "/images/timelineImages/timelineImageMobile8.png",
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
  const [displayedYear, setDisplayedYear] = useState(parseInt(images[0].year));

  let svgWidth = galleryRef.current?.scrollWidth;

  console.log(svgWidth);
  console.log(
    galleryRef.current?.scrollWidth,
    containerRef.current?.scrollWidth,
    progress * 13450,
    progress
  );
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
    const yearChangeDuration = 1000;
    const targetYear = parseInt(currentYear);
    
    const yearAnimation = gsap.to({ year: displayedYear }, {
      year: targetYear,
      duration: yearChangeDuration / 1000,
      onUpdate: function() {
        setDisplayedYear(Math.round(this.targets()[0].year));
      },
      onComplete: function() {
        setDisplayedYear(targetYear);
      }
    });

    return () => yearAnimation.kill();
  }, [currentYear]);

  // console.log(svgWidth);
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

      <div ref={containerRef} className="h-[100vh]  w-full bg-black/5 relative">
        <div
          className="absolute top-[47%] z-50 sm:hidden md:block"
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
        <div
          className="absolute top-[39%] z-50 md:hidden block"
          ref={svgPathRef}
          style={{
            clipPath: `polygon(0% 0%, ${progress * 100}% 0%, ${progress * 100}% 100%, 0% 100%)`,
            transform: `translate(-${progress * 2500}px , -50%)`,
          }}
        >
          <svg
            width="3735"
            height="530"
            viewBox="0 0 3735 530"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.42773 311.727C33.7547 278.284 58.7512 269.241 109.558 261.563L124.05 236.482C92.4324 178.26 93.1141 157.278 99.6299 113.05C104.817 77.8374 112.066 58.9225 140.473 26.817C190.124 -6.95812 224.29 -3.02008 271.713 26.8156C303.944 69.3638 298.348 82.6145 298.348 113.05C298.348 143.485 287.566 196.687 271.713 232.062C324.377 245.961 391.209 286.016 434.166 314.499M1472.01 527.445H1268.02V411.693H1117.08V484.038H1101.83V527.445H1032.21L928.502 294.43M2845.72 280.799L2855.32 284.503C2868.96 256.57 2856.3 200.274 2882.08 178.665C2911.33 154.153 2954.05 147.41 2977.63 170.896C3001.21 194.382 2991.7 246.979 2977.63 288.095C3004.22 308.023 3017.48 319.904 3031.83 345.076H3060.35C3076.07 321.677 3087.05 310.672 3110.27 295.866C3067.59 247.194 3068.06 202.264 3110.27 174.134C3141.25 153.485 3164.2 155.544 3192.98 178.665C3225.52 204.802 3218.8 248.631 3210.1 288.095C3247.31 306.701 3226.2 295.866 3254.89 311.574M431.775 313.145L444.986 313.806V272.833L831.48 116.508L938.571 313.806M1472.14 527.445L1570.74 410.196C1566.84 439.621 1568.97 449.194 1588.82 460.184C1600.87 485.001 1616.12 481.81 1633.14 472.592C1654.23 491.752 1668.23 483.937 1681 463.375C1694.47 472.592 1702.62 469.402 1713.26 450.612C1740.91 453.093 1767.15 437.494 1744.81 394.951C1761.18 374.313 1752.79 355.753 1744.81 324.143H1826.64M2849.22 282.097L2771.15 253.331L2675.68 215.641L2483.61 287.27L2451.06 277.04L2294.92 345.077H2268.79M3734.37 315.156H3728.73V281.865L3264.19 278.156L3263.06 316.346L3251.3 309.56M2200.57 431.511C2214.27 402.368 2232.39 328.391 2226.78 295.34C2223.54 276.215 2221.88 273.961 2204.32 257.328C2176.42 230.902 2135.41 233.442 2089.3 239.619C2060.91 251.283 2047.09 262.514 2028.08 287.566C1983.16 260.941 1939.54 239.092 1904.47 268.523C1884.36 305.697 1873.92 321.771 1827.3 324.271M2200.57 431.511C2200.09 432.541 2199.61 433.515 2199.14 434.429C2199.14 434.429 2199.58 433.431 2200.57 431.511ZM2200.57 431.511C2205.51 421.993 2224.17 389.82 2271.15 344.271"
              stroke="#CFA484"
              strokeWidth="4"
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
                <div className="h-[100vh]">
                  <Image
                    width={1594}
                    height={904}
                    src={image.src}
                    alt={`Landscape ${image.year}`}
                    className="w-[1920px] h-full object-cover hidden   md:flex"
                    loading="lazy"
                  />
                  <Image
                    width={1594}
                    height={904}
                    src={image.mobileSrc}
                    alt={`Landscape ${image.year}`}
                    className="w-full h-full md:hidden   sm:flex"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="h-2 w-2 bg-primary rounded-full absolute -top-[150px] left-1/2 transform -translate-x-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <YearDisplay number={displayedYear.toString()} isFixed={isFixed} />
      <MessageDisplay message={currentMessage} isFixed={isFixed} />
    </div>
  );
}
