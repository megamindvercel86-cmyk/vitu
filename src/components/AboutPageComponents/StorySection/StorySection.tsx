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
            width={svgWidth}
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
          className="absolute top-[40%] z-50 "
          ref={svgPathRef}
          style={{
            clipPath: `polygon(0% 0%, ${progress * 100}% 0%, ${progress * 100}% 100%, 0% 100%)`,
            transform: `translate(-${progress * 2200}px , -50%)`,
          }}
        >
          <svg
            width="2691"
            // width={svgWidth}
            height="360"
            viewBox="0 0 2691 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.86328 224.912H1.86554C32.1983 204.316 52.023 197.431 90.699 191.683L97.6787 170.795C73.6105 127.206 76.8556 118.46 81.8157 85.3482C85.7646 58.9856 91.2822 44.8246 112.907 20.788C150.703 -4.4984 184.042 -1.5491 220.142 20.788C244.677 52.6426 251.234 76.4868 251.234 99.2729C251.234 122.059 244.266 151.274 232.198 177.758C272.288 188.163 292.772 196.942 325.473 218.266H336.334M1635.73 233.912C1580.73 265.912 1567.86 271.047 1567.86 271.047C1582.33 239.69 1595.64 219.976 1591.1 185.757C1588.56 166.632 1587.89 155.982 1574.14 139.349C1552.3 112.923 1526.07 111.851 1489.97 118.027C1464.76 124.672 1452.88 131.848 1436.59 149.384C1393.37 131.476 1376.11 128.733 1348.65 158.163C1332.91 195.338 1324.73 211.412 1288.23 213.912M965.944 347.888H844.517V276.863H751.748V321.254H735.42V347.888H696.665L642.731 204.912M1927.73 197.912L1961.73 208.912C1971.73 186.412 1957.3 147.273 1976.21 129.867C1997.66 110.122 2028.99 104.691 2046.29 123.608C2063.58 142.526 2056.6 184.894 2046.29 218.014C2065.78 234.065 2075.51 243.635 2086.03 263.912H2106.95C2118.48 245.064 2126.53 236.199 2143.56 224.273C2112.26 185.067 2112.6 148.876 2143.56 126.217C2166.28 109.584 2183.11 111.243 2204.22 129.867C2228.08 150.92 2223.16 186.225 2216.77 218.014C2242.38 227.864 2243.7 224.273 2266.87 243.753M336.049 217.154H336.05V192.183L581.302 96.9121L643.526 206.679M1602.86 251.912L1739.17 188.81L1764.86 193.162L1840.63 157.912L1929.89 198.734M954.731 357.912L1042.46 285.094C1041.46 304.744 1045.57 312.431 1059.17 321.679C1071.06 343.893 1081.38 345.398 1103.73 335.994C1122.92 349.565 1133.51 350.915 1151.08 329.234C1167.6 331.117 1175.38 327.661 1187.69 316.907C1226 306.754 1227.91 292.723 1215.14 260.836C1230.03 246.218 1223.99 236.302 1216.73 213.912H1290.35M2690.73 264.912H2572.79V204.912H2265.88V241.912L2253.73 234.412"
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
                    className="w-full h-full object-cover hidden   md:flex"
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

      {/* <YearDisplay number={currentYear} isFixed={isFixed} />
      <MessageDisplay message={currentMessage} isFixed={isFixed} /> */}
    </div>
  );
}
