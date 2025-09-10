"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper navigation styles
import { AnimatePresence, motion } from "framer-motion";
import image from "../../../../public/images/ImageGrid/3.webp";
import xlImage from "../../../../public/images/ImageGrid/7.webp"
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "LOCATION-DRIVEN VALUE",
    desc: "Positioned in Mangalore’s high-growth northern corridor, these plots benefit from expressway, port, and SEZ proximity. A future-ready address that guarantees both lifestyle and long-term capital appreciation.",
  },
  {
    title: "INVEST WITH CONFIDENCE",
    desc: "RERA-registered, DC-converted, and with 100% clear legal titles, your investment is safeguarded at every step. Transparency and compliance ensure trust, making this not just land but a lasting legacy.",
  },
  {
    title: "PROVEN RETURNS",
    desc: "These villa plots offer a legacy of consistent value growth. Designed for investors who seek stability, security, and the assurance of steady appreciation over time.",
  },
];
const stats = [
  {
    number: "2x",
    desc: "Growth in past 3 years",
  },
  {
    number: "10X",
    desc: "Future Growth Driven by SEZs, Port & Expressway",
  },
  {
    number: "15 Min",
    desc: "Access to the City",
  },
  {
    number: "3-Year",
    desc: "Resale Assistance Available",
  },
];

export default function ImageGrid() {
  const [current, setCurrent] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  // REPLACE your existing useEffect with these functions
  const startAutoScroll = () => {
    // Clear any existing timer before starting a new one
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    // Set a new interval and store its ID in the ref
    intervalIdRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  const stopAutoScroll = () => {
    // Clear the interval using the stored ID
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };
  // Autoplay for tag slides
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % slides.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // main slide (title + desc)
  const mainSlide = slides[current];

  // next 2 slides for tag box
  const tagSlides1 = slides[(current + 1) % slides.length]?.title;
  const tagSlides2 = slides[(current + 2) % slides.length]?.title;

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const swiperRef = useRef<any>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLImageElement>(".img");
      const overlay = document.querySelector(".image-grid-overlay") as HTMLElement;
      if (images.length < 3) return;
      const centerImg = images[2];

      // === Keep original animation duration here ===
      const BASE_PERCENT = 250; // your original "+=250%" animation range
      const BUFFER_PERCENT = 80; // extra pin AFTER overlay finishes (tweak as you like)

      let targetScale = 1;
      let originalRect = centerImg.getBoundingClientRect();
      const OVERSCALE = 1.05;
      let needsMeasure = true;

      const getViewportHeight = () => {
        return window.visualViewport?.height || window.innerHeight;
      };

      const computeTarget = () => {
        originalRect = centerImg.getBoundingClientRect();
        const viewportHeight = getViewportHeight();
        const viewportWidth = window.innerWidth;

        const scaleX = viewportWidth / originalRect.width;
        const scaleY = viewportHeight / originalRect.height;
        targetScale = Math.max(scaleX, scaleY) * OVERSCALE;

        if (overlay) {
          gsap.set(overlay, { height: originalRect.height * targetScale });
        }
      };

      computeTarget();

      if (overlay) {
        gsap.set(overlay, { opacity: 0, y: "100vh", pointerEvents: "none" });
      }

      const st = ScrollTrigger.create({
        trigger: ".image-grid",
        start: "top top",
        // Extend the overall pin with a buffer, but keep animation mapped to BASE_PERCENT only
        end: () => `+=${BASE_PERCENT + BUFFER_PERCENT}%`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: () => (needsMeasure = true),
        onUpdate: (self) => {
          if (needsMeasure) {
            computeTarget();
            needsMeasure = false;
          }

          const vh = getViewportHeight();

          // --- Local progress that ONLY spans the original "+=250%" distance ---
          const baseDistPx = (BASE_PERCENT / 100) * vh; // 250% of viewport height
          const local = gsap.utils.clamp(0, 1, (self.scroll() - self.start) / baseDistPx);

          // === Image animations use LOCAL progress (unchanged timing) ===
          const eased = local * local * (3 - 2 * local);

          images.forEach((img) => {
            if (img === centerImg) return;
            gsap.set(img, {
              opacity: 1 - eased,
              scale: 1 - 0.2 * eased,
            });
          });

          const scale = 1 + (targetScale - 1) * eased;
          gsap.set(centerImg, { scale });

          // === Overlay animation uses LOCAL progress (so timing stays identical) ===
          if (overlay) {
            const overlayStart = 0.9; // your original timing
            const raw = Math.min(1, Math.max(0, (local - overlayStart) / (1 - overlayStart)));
            const easedOverlay = raw * raw * (3 - 2 * raw);

            gsap.set(overlay, {
              opacity: easedOverlay,
              pointerEvents: easedOverlay > 0.05 ? "auto" : "none",
              y: (1 - easedOverlay) * vh,
            });
          }
          // After local reaches 1, the overlay stays as-is while the buffer scroll continues pinned.
        },
      });
      // This is your NEW useEffect

      const handleResize = () => {
        needsMeasure = true;
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        st.kill();
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => ctx.revert();
  }, []);
  useEffect(() => {
    startAutoScroll();
    // Cleanup function: runs when the component unmounts
    return () => stopAutoScroll();
  }, []); // Empty array ensures this runs only once
  return (
    <div className="image-grid bg-[#f3eae1] min-h-screen px-4 sm:px-6 md:px-10 mt-20 mb-10 md:mb-20 !overflow-hidden relative">
      {/* Top wide image */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex justify-center lg:ml-[137px]">
          <Image
            src="/images/ImageGrid/1.jpg"
            alt="dummy"
            width={500}
            height={500}
            className="img object-cover w-full sm:w-[80%] md:w-[70%] lg:w-[60%] h-[150px] sm:h-[200px] xl:h-[280px] "
          />
        </div>
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-2 sm:px-6 md:px-16 py-5">
        <div className="sm:col-span-3">
          <Image
            src="/images/ImageGrid/2.png"
            alt="dummy"
            width={400}
            height={300}
            className="img object-cover w-full h-[150px] sm:h-[200px] xl:h-[280px] sm:mt-[71px] mb-5 mt-0"
          />
        </div>
        <div className="sm:col-span-6">
          <Image src={image} alt="dummy" priority className="img object-cover w-full h-[180px] sm:h-[270px] xl:h-[350px]" />
        </div>
        <div className="sm:col-span-3">
          <Image
            src="/images/ImageGrid/4.png"
            alt="dummy"
            width={400}
            height={300}
            className="img object-cover w-full h-[150px] sm:h-[200px] xl:h-[280px]  sm:mt-[71px] mb-5 mt-0"
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="hidden sm:block sm:col-span-1"></div>
        <div className="sm:col-span-3">
          <Image
            src="/images/ImageGrid/5.png"
            alt="dummy"
            width={400}
            height={300}
            className="img object-cover w-full h-[150px] sm:h-[200px] xl:h-[280px] "
          />
        </div>
        <div className="sm:col-span-6">
          <Image
            src="/images/ImageGrid/6.png"
            alt="dummy"
            width={800}
            height={300}
            className="img object-cover w-full h-[150px] sm:h-[200px] xl:h-[280px] "
          />
        </div>
      </div>

      {/* Overlay Section with Swiper */}
      <div className="image-grid-overlay  overflow-hidden min-h-screen pointer-events-none opacity-0 absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {/* Top black gradient */}
        <div className="absolute top-0 left-0 w-[100%] h-10 xl:h-48 bg-gradient-to-b from-black/30  to-transparent z-10 pointer-events-none" />
        {/* Bottom left black gradient */}
        <div className="absolute bottom-0 left-0 w-full  h-96 xl:h-96 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10 pointer-events-none" />
        <div className="absolute left-0 top-0 h-full w-20 xl:w-48 bg-gradient-to-r from-black/30 via-black/10 to-transparent z-10 pointer-events-none" />
        <div className="w-full text-white my-5 mx-auto min-h-screen flex items-center justify-center">
          <div className="flex flex-col justify-between min-h-[300px]   absolute top-44 lg2:top-52 left-16 xl:top-56">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                onMouseEnter={stopAutoScroll} // 👈 PAUSE on hover
                onMouseLeave={startAutoScroll}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-black/40  text-start min-h-[200px]  border border-white/20 xl:mt-52 px-6 md:px-8 py-6 md:py-8 
                rounded-2xl mt-6 max-w-lg"
              >
                <h1 className="font-semibold mb-3 text-xl md:text-2xl xl:text-3xl font-freightNeoSemibold">{mainSlide.title}</h1>
                <p className="font-normal text-base md:text-md xl:text-xl text-start font-FreightNeoProNormal">{mainSlide.desc}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex  z-50 pointer-events-auto">
              <button onClick={handlePrev} className="px-4 py-2 text-black rounded-lg font-medium transition">
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.42">
                    <g clipPath="url(#clip0_42_9183)">
                      <rect y="0.296875" width="36" height="36" rx="18" fill="#D2D2D7" fillOpacity="0.64" />
                      <path
                        d="M20 25.2969C19.6162 25.2969 19.2324 25.1504 18.9395 24.8574L13.4395 19.3574C12.8536 18.772 12.8536 17.8218 13.4395 17.2363L18.9395 11.7363C19.5254 11.1504 20.4747 11.1504 21.0606 11.7363C21.6465 12.3217 21.6465 13.2719 21.0606 13.8574L16.6211 18.2969L21.0606 22.7364C21.6465 23.3218 21.6465 24.272 21.0606 24.8575C20.7676 25.1505 20.3837 25.2969 20 25.2969Z"
                        fill="black"
                        fillOpacity="0.56"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_42_9183">
                      <rect y="0.296875" width="36" height="36" rx="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button onClick={handleNext} className="py-2 rounded-lg font-medium transition">
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_42_9186)">
                    <rect y="0.296875" width="36" height="36" rx="18" fill="#D2D2D7" fillOpacity="0.64" />
                    <path
                      d="M22.5597 17.2344L17.0521 11.7344C16.4667 11.149 15.5198 11.1519 14.9364 11.7383C14.3529 12.3252 14.3549 13.2749 14.9403 13.8594L19.3841 18.2969L14.9403 22.7344C14.3549 23.3189 14.3529 24.2686 14.9364 24.8555C15.2286 25.1499 15.6124 25.2969 15.9962 25.2969C16.378 25.2969 16.7599 25.1514 17.0521 24.8594L22.5597 19.3594C22.8412 19.0782 23 18.6958 23 18.2969C23 17.898 22.8412 17.5157 22.5597 17.2344Z"
                      fill="black"
                      fillOpacity="0.56"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_42_9186">
                      <rect y="0.296875" width="36" height="36" rx="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>

          {/* Tag Box */}
          <div className="absolute xl:bottom-[30%] right-[-2%] bottom-[35%] xl:right-[-10%] flex flex-wrap gap-4 w-full md:w-[40%] ">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current + "-tag1"}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 200 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="border border-[#b0b1ad]/50 bg-black/10 backdrop-blur-sm  rounded-2xl px-10 py-10 text-sm xl:text-base font-freightNeoSemibold font-semibold text-white"
              >
                <h1>{tagSlides1}</h1>
              </motion.div>
              <div className="border border-[#b0b1ad]/50 bg-black/10 backdrop-blur-sm  rounded-2xl px-10 py-10 text-sm xl:text-base font-freightNeoSemibold font-semibold text-white">
                <h1>{tagSlides2}</h1>
              </div>
            </AnimatePresence>
          </div>

          <div className="absolute z-50 top-10 left-16 text-start">
            <h1
              className="text-white font-normal leading-tight font-FreightNeoProNormal 
                text-3xl sm:text-4xl md:text-5xl  xl:text-[96px] 
                max-w-2xl xl:max-w-3xl"
            >
              Your Gateway to Lasting Value
            </h1>

            <p
              className="text-base sm:text-lg xl:text-xl text-white font-normal mt-3 
                font-FreightNeoProNormal max-w-xl"
            >
              Limited luxury villa plots crafted for exclusivity in Mangalore’s coastal corridor, offering both refined living and assured
              appreciation.
            </p>
          </div>
          <div className="flex z-50 absolute w-full lg:bottom-14 xl:bottom-20 flex-wrap justify-between gap-6 mx-auto font-CandideCondensedNormal text-center">
            {stats.map((stat, i) => (
              <div key={i} className="flex-1 min-w-[120px]">
                <h1 className="text-3xl sm:text-4xl text-white md:text-5xl xl:text-6xl font-medium mb-3">{stat.number}</h1>
                <p className="text-white mx-auto w-[50%] text-sm sm:text-base xl:text-lg font-medium">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
//
