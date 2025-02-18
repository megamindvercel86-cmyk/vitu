"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Draggable from 'gsap/Draggable';
import "./StorySection.css";
import Typography from "@/components/Typography/Typography";
import FHD from "../../../../public/svgs/LineAnimations/fhd";
import FHDLAPTOP from "../../../../public/svgs/LineAnimations/fhdLaptop";
import HDPLUSLAPTOP from "../../../../public/svgs/LineAnimations/hdPlusLaptop";
import FULLHDMOBILE from "../../../../public/svgs/LineAnimations/fullHdMobiles";
// import HDL from "../../../../public/svgs/LineAnimations/HDL";
// import HDPLUS from "../../../../public/svgs/LineAnimations/HDPLUS";
// import HDM from "../../../../public/svgs/LineAnimations/HDM";
// import ANDROIDTABLETS from "../../../../public/svgs/LineAnimations/ANDROIDTABLETS";
// import IPAD from "../../../../public/svgs/LineAnimations/IPAD";
// import HDS from "../../../../public/svgs/LineAnimations/HDS";
// import OLDERSMARTPHONES from "../../../../public/svgs/LineAnimations/fhd";
// import UUHD from "../../../../public/svgs/LineAnimations/UUHD";
gsap.registerPlugin(ScrollTrigger, Draggable);

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
      className={`${isFixed ? "fixed md:bottom-28 bottom-40 md:left-20 left-5" : "absolute bottom-28 left-36"} pointer-events-none z-50`}
    >
      <span className="md:text-[80px] text-[40px] text-white font-CandideCondensedMedium">
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
        isFixed ? "fixed md:bottom-56 bottom-32 md:right-10 left-5" : "absolute bottom-56 right-10"
      } pointer-events-none z-50 md:max-w-[450px] max-w-[300px]`}
    >
      <div ref={messageRef}>
        <span className="lg:text-2xl xl:text-[32px] text-sm text-white font-freightNeoMedium  md:font-freightNeoSemibold leading-tight block md:text-right">
          {message.split("").map((char, index) => (
            <span
              key={index}
              className={/\d/.test(char) ? "font-CandideCondensedBold" : ""}
            >
              {char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

function ScrollController({ progress, onDrag }: { progress: number; onDrag: (newProgress: number) => void }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<HTMLDivElement | null>(null);
  const [draggable, setDraggable] = useState<Draggable | null>(null);

  // A function to update Draggable bounds when track width changes
  const updateDraggableBounds = () => {
    if (trackRef.current && controllerRef.current && draggable) {
      const trackWidth = trackRef.current.offsetWidth - controllerRef.current.offsetWidth;
      // Reset draggable bounds using Draggable.update() if available
      draggable.applyBounds(trackRef.current);
      // Also update the x position based on external progress:
      gsap.set(controllerRef.current, { x: progress * trackWidth });
    }
  };

  useEffect(() => {
    if (controllerRef.current && trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth - controllerRef.current.offsetWidth;
      // Create the draggable instance
      const newDraggable = Draggable.create(controllerRef.current, {
        type: "x",
        bounds: trackRef.current,
        inertia: true,
        onDrag: function () {
          // Calculate progress: current x divided by available travel distance
          const curProgress = this.x / trackWidth;
          // Clamp progress between 0 and 1
          const newProgress = Math.max(0, Math.min(1, curProgress));
          onDrag(newProgress);
        },
        onThrowUpdate: function () {
          // When inertia is updating the position after release
          const curProgress = this.x / trackWidth;
          const newProgress = Math.max(0, Math.min(1, curProgress));
          onDrag(newProgress);
        }
      })[0];

      setDraggable(newDraggable);

      // Set initial position
      gsap.set(controllerRef.current, { x: progress * trackWidth });

      // Clean up on unmount
      return () => {
        newDraggable.kill();
      };
    }
  }, [onDrag]);

  // Listen for window resize to update draggable bounds
  useEffect(() => {
    const handleResize = () => {
      updateDraggableBounds();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draggable, progress]);

  // Also update controller position when progress changes externally
  useEffect(() => {
    if (trackRef.current && controllerRef.current) {
      const trackWidth = trackRef.current.offsetWidth - controllerRef.current.offsetWidth;
      gsap.to(controllerRef.current, { x: progress * trackWidth, duration: 0.1 });
    }
  }, [progress]);

  return (
    <div className="fixed bottom-12 md:bottom-36 right-5 md:right-10 z-50 w-[90%] max-w-[430px]">
      <div 
        ref={trackRef}
        className="relative h-12 cursor-pointer rounded"
      >
        <svg
          viewBox="0 0 430 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full absolute top-1/2 -translate-y-1/2 pointer-events-none"
        >
          <path
            d="M0.367188 24.2744H5.48583C8.50671 22.218 10.4811 21.5307 14.3329 20.9567L15.028 18.8714C12.631 14.5194 12.9542 13.6462 13.4482 10.3403C13.8414 7.70824 14.3909 6.29441 16.5446 3.8946C20.3088 1.37 23.629 1.66446 27.2243 3.8946C29.6677 7.07496 30.3207 9.45557 30.3207 11.7305C30.3207 14.0055 29.6268 16.9223 28.4249 19.5665C32.4176 20.6054 34.4576 21.4818 37.7143 23.6108H42.0746M39.6719 23.612H44.9169V19.5044L85.2341 3.83252L96.6088 23.612L118.347 35.745M97.2422 24.0552L125.553 39.6007V38.9056H126.817L127.701 34.8612H132.883V34.0397H137.559L144.447 34.8612V35.8723H148.934V34.8612H152.157V33.5341H156.138V31.2592H157.528V27.4676H165.428V33.5341H172M166.945 33.568H173.644C173.485 36.6907 174.138 37.9122 176.298 39.3818C178.186 42.9119 179.825 43.151 183.376 41.6568C186.423 43.8133 188.105 44.0279 190.895 40.5825C193.519 40.8817 194.755 40.3324 196.709 38.6235C202.794 37.0102 203.097 34.7804 201.07 29.7133C203.434 27.3903 202.475 25.6249 201.322 22.0669H212.318M209.094 22.1292H213.77L215.35 21.3077C214.188 16.9107 214.319 13.0751 217.246 9.93296C220.008 6.9674 221.745 7.24383 226.093 9.04825C227.732 7.28123 228.927 6.55813 231.464 5.8886C235.096 5.26624 237.734 5.37426 239.932 8.03712C241.315 9.71316 241.383 10.7863 241.638 12.7135C242.095 16.1615 240.756 18.1481 239.3 21.3077C242.438 23.6145 243.894 25.1623 245.872 28.4485H252.002M314.753 25.7969H310.961L286.568 14.8013L275.573 19.9199L271.844 19.288L252.065 28.451H248.273M312.984 25.7603H316.144C317.29 22.7738 319.155 21.0154 325.497 17.6716C325.051 14.9181 323.97 11.6285 326.255 9.51961C328.847 7.1274 332.633 6.46928 334.723 8.76135C336.813 11.0534 335.969 16.1867 334.723 20.1993C337.079 22.1441 338.254 23.3036 339.525 25.7603H342.053C343.447 23.4767 344.42 22.4027 346.477 20.9577C342.695 16.2076 342.737 11.8227 346.477 9.07735C349.222 7.06212 351.256 7.26314 353.807 9.51961C356.691 12.0704 356.095 16.3479 355.324 20.1993C358.79 21.2112 360.475 22.3005 363.16 25.002H366.572M364.797 24.974H368.146V13.8521H426.031V24.974H429.317"
            stroke="white"
            strokeWidth="3"
            className="transition-all duration-100"
          />
        </svg>
        <div
          ref={controllerRef}
          className="absolute top-0 left-0 w-[100px] h-full cursor-grab active:cursor-grabbing"
        >
          <div className="w-[60px] h-full border-[#CFA484] border-[2.5px] rounded-lg opacity-80" />
        </div>
      </div>
    </div>
  );
}

const getSvgPath = (width: number): React.JSX.Element | null => {
  console.log(width, "23");

  if (width >= 5120)
    return <FHD />; // 5K
  else if (width >= 3840)
    return <FHD />; // 4K UHD
  else if (width >= 2560)
    return <FHD />; // Quad HD
  else if (width >= 1900)
    return <FHDLAPTOP />; // Full HD
  else if (width >= 1500)
    return <HDPLUSLAPTOP />; // HD+
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
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
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
    const neww = maxTranslateX - visibleWidth;
    console.log(totalWidth, visibleWidth, maxTranslateX, maxTranslateX, neww);
    if (windowWidth >= 1900) {
      return `translate(-${progress * 13450}px, -50%)`;
    } else if (windowWidth > 1400) {
      return `translate(-${progress * 11206 + 15}px, -50%)`;
    } else if (windowWidth > 100) {
      console.log(`Current progress: ${progress}, TranslateX: ${translateX}`);
      return `translate(-${progress * neww}px, -50%)`;
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
    if (typeof window !== "undefined") {
      const svgPath = getSvgPath(window.innerWidth);
      setSvg(svgPath);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const svgPath = getSvgPath(window.innerWidth);
        setSvg(svgPath);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  const handleDrag = (newProgress: number) => {
    setProgress(newProgress);
    
    const imageIndex = Math.min(
      Math.floor(newProgress * images.length),
      images.length - 1
    );
    setCurrentYear(images[imageIndex].year);
    setCurrentMessage(images[imageIndex].message);

    if (galleryRef.current) {
      const totalWidth = galleryRef.current.scrollWidth - windowWidth;
      gsap.to(galleryRef.current, {
        x: -totalWidth * newProgress,
        duration: 0.1
      });
    }
  };
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
            transform: getTransformStyle(),
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
      <ScrollController progress={progress} onDrag={handleDrag} />
    </div>
  );
}
