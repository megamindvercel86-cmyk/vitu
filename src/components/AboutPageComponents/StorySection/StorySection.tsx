"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import "./StorySection.css";
import Typography from "@/components/Typography/Typography";
import FHD from "../../../../public/svgs/LineAnimations/fhd";
import FHDLAPTOP from "../../../../public/svgs/LineAnimations/fhdLaptop";
import HDPLUSLAPTOP from "../../../../public/svgs/LineAnimations/hdPlusLaptop";
import FULLHDMOBILE from "../../../../public/svgs/LineAnimations/fullHdMobiles"
// import HDL from "../../../../public/svgs/LineAnimations/HDL";
// import HDPLUS from "../../../../public/svgs/LineAnimations/HDPLUS";
// import HDM from "../../../../public/svgs/LineAnimations/HDM";
// import ANDROIDTABLETS from "../../../../public/svgs/LineAnimations/ANDROIDTABLETS";
// import IPAD from "../../../../public/svgs/LineAnimations/IPAD";
// import HDS from "../../../../public/svgs/LineAnimations/HDS";
// import OLDERSMARTPHONES from "../../../../public/svgs/LineAnimations/fhd";
// import UUHD from "../../../../public/svgs/LineAnimations/UUHD";
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
    year: "2003-2012",
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
          // ease: "power2.out",
        }
      );
    }
  }, [number]); // Re-run animation when message changes

  return (
    <div
      className={`${isFixed ? "fixed bottom-28 left-20" : "absolute bottom-28 left-36"} pointer-events-none z-50`}
    >
      <span className="text-[80px]  text-white font-CandideCondensedMedium">
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
          // ease: "power2.out",
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
        <span className="lg:text-2xl xl:text-[32px] font-bold text-white font-freightNeoSemibold leading-tight block text-right">
          {message.split('').map((char, index) => (
            <span key={index} className={/\d/.test(char) ? "font-CandideCondensedBold" : ""}>
              {char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

const getSvgPath = (width: number): React.JSX.Element | null => {
console.log(width,"23");

  if (width >= 5120) return <FHD />; // 5K
  else if (width >= 3840) return <FHD />; // 4K UHD
  else if (width >= 2560) return <FHD />; // Quad HD
  else if (width >= 1900) return <FHDLAPTOP />; // Full HD
  else if (width >= 1500) return <HDPLUSLAPTOP />; // HD+
  else if (width >= 100) return <FULLHDMOBILE />;
  // Add other conditions as needed
  return null; // Default case
};

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState(images[0].year);
  const [currentMessage, setCurrentMessage] = useState(images[0].message);
  const [progress, setProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  const [svg, setSvg] = useState<React.JSX.Element | null>(null);
  let svgWidth = galleryRef.current?.scrollWidth;
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  const getTransformStyle = () => {


    const gallery = galleryRef.current;
    if (!gallery) return `translate(0, -50%)`;
    const totalWidth = gallery.scrollWidth; // Total scrollable width of the gallery
    const visibleWidth = windowWidth; // Current viewport width
  
    // Calculate the maximum translation distance
    const maxTranslateX = totalWidth - visibleWidth;
  
    // Dynamically calculate the translation value based on progress
    const translateX = progress * maxTranslateX;

    if (windowWidth >= 1900) {
      return `translate(-${progress * 13450}px, -50%)`;
    } else if (windowWidth > 1400) {
      return `translate(-${progress * 11206 + 15}px, -50%)`;
    } else if (windowWidth > 100) {
      console.log(`Current progress: ${progress}, TranslateX: ${translateX}`);
      return `translate(-${progress * 2200}px, -50%)`;
    } else {
      return `translate(-${progress * 13450}px, -50%)`;
    }
  };
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
    if (typeof window !== 'undefined') {
      const svgPath = getSvgPath(window.innerWidth);
      setSvg(svgPath);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const svgPath = getSvgPath(window.innerWidth);
        setSvg(svgPath);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

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
  className="absolute top-[47%] z-50"
  ref={svgPathRef}
  style={{
    clipPath: `polygon(0% 0%, ${progress * 100}% 0%, ${progress * 100}% 100%, 0% 100%)`,
    transform: getTransformStyle()
  }}
>

         {svg}
        </div>
        {/* <div
          className="absolute top-[39%] z-50 md:hidden block"
          ref={svgPathRef}
          style={{
            clipPath: `polygon(0% 0%, ${progress * 100}% 0%, ${progress * 100}% 100%, 0% 100%)`,
            transform: `translate(-${progress * 2500}px , -50%)`,
          }}
        >
          <Image
            src={svgPath}
            alt="Dynamic SVG"
            layout="fill"
            objectFit="contain"
          />
        </div> */}
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
                    className="w-[100vw] h-full object-cover hidden   md:flex"
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

      <YearDisplay number={currentYear} isFixed={isFixed} />
      <MessageDisplay message={currentMessage} isFixed={isFixed} />
    </div>
  );
}
