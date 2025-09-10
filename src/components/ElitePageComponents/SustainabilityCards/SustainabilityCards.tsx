"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import SvgButton from "../SvgButton/SvgButton";
import { useEffect } from "react";

interface CardContent {
  title: string;
  description?: string;
  image: string;
}

interface CardProps {
  title: string;
  description?: string;
  default: CardContent;
  hover: string[];
  dotBottom?: string;
  image?: string;
}

const cards: CardProps[] = [
  {
    default: {
      title: "ENERGY",
      image: "/images/eliteSustainability/1.png",
    },
    image: "/images/eliteSustainability/1.png",
    dotBottom: "lg:bottom-[200px]",
    title: "ENERGY",
    description:
      "Our spaces are powered with a smart balance of solar energy, efficient fixtures and intelligent lighting. They are designed to save power while making everyday living seamless and endure for generations.",
    hover: ["/images/eliteSustainability/1.11.png", "/images/eliteSustainability/1.1.png", "/images/eliteSustainability/1.2.png"],
  },
  {
    default: {
      title: "LANDSCAPE",
      image: "/images/eliteSustainability/2.png",
    },
    title: "LANDSCAPE",
    image: "/images/eliteSustainability/2.png",
    dotBottom: "lg:bottom-[200px]",
    description:
      "Tree-lined avenues and shaded plots create a cooler microclimate, while every home is graced with a specimen tree of its own. Avenue plantations and low-maintenance greenery ensure year-round freshness that bring beauty and calm to everyday life.",

    hover: ["/images/eliteSustainability/2.png", "/images/eliteSustainability/2.1.png", "/images/eliteSustainability/2.2.png"],
  },
  {
    default: {
      title: "WATER",
      image: "/images/eliteSustainability/3.png",
    },
    title: "WATER",
    description:
      "From the first impression at the entrance to the last drop you rely on, water is seamlessly woven into the community. With a 24x7 supply, rainwater harvesting and smart irrigation, every drop is managed responsibly to sustain green spaces and community living.",

    dotBottom: "lg:bottom-[215px]",
    image: "/images/eliteSustainability/3.png",
    hover: ["/images/eliteSustainability/3.png", "/images/eliteSustainability/3.1.png", "/images/eliteSustainability/3.2.png"],
  },
];

interface CustomPaginationProps {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const CustomPagination = ({ total, activeIndex, onDotClick }: CustomPaginationProps) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-10 h-1 bg-[#f3eae1]" : "bg-[#f3eae1] w-2 h-1.5"}`}
        />
      ))}
    </div>
  );
};

export default function SustainabilityCards() {
  return (
    <section className="min-h-screen relative lg:h-[250vh]  overflow-hidden">
      <div className="relative hidden lg:block w-full min-h-screen lg:h-[200vh] z-50">
        {/* Background image */}

        <div className="h-[6vh] hidden  lg:block sm:h-[8vh] md:h-[10vh] lg:h-[130vh]">
          <Image
            src="/images/eliteProjectPageImages/ProximitySectionImages/bgImage.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        

        {/* Title */}
        
        <div className="absolute z-50 hidden lg:block  w-full top-0 ">
          <SvgButton button="SUSTAINABILTY" />
        </div>

        {/* Cards */}
       
      </div>
      <div className="absolute hidden  z-50 w-full top-10 lg:top-80  lg2:top-96 lg:flex justify-center px-4">
          <h1 className="text-3xl sm:text-5xl lg1:text-[96px] leading-[1.1] font-FreightNeoProNormal text-[#1C1213] text-center uppercase">
            Sustainable by <br className="hidden lg:block" />
            Design
          </h1>
        </div>
       <div className="relative  z-50 mt-10 lg:absolute lg:top-auto lg:bottom-0 xl:bottom-32 left-0 right-0 mx-auto flex flex-col lg:flex-row justify-center items-center lg1:gap-0 xl:gap-0 gap-6 px-2 py-10 lg:py-16 w-full">
           <div className=" z-50 lg:hidden flex justify-center px-4">
          <h1 className="text-3xl  sm:text-5xl lg1:text-[96px] leading-[1.1] font-FreightNeoProNormal text-[#1C1213] text-center uppercase">
            Sustainable by <br className="hidden lg:block" />
            Design
          </h1>
        </div>
          <div className="h-[6vh] absolute inset-0 top-0 lg:hidden sm:h-[8vh] md:h-[10vh] lg:h-[130vh] xl:h-[100vh]">
          <Image
            src="/images/eliteProjectPageImages/ProximitySectionImages/bgImage.webp"
            alt="Background"
            height={20000}
            width={20000}
            className="object-cover h-[130vh]"
            priority
          />
        </div>
          {cards.map((card, i) => (
            <div className="w-full sm:w-72 lg1:w-80 max-w-xs mx-auto" key={i}>
              <HoverCard card={card} className={i === 1 ? "lg:mt-20" : ""} />
            </div>
          ))}
        </div>
    </section>
  );
}

function HoverCard({ card, className = "" }: { card: CardProps; className?: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!swiperInstance) return;
 if (isMobile) {
    // ✅ Only autoplay if the card is LANDSCAPE on mobile
    if (card.title === "LANDSCAPE") {
      swiperInstance?.autoplay?.start();
    } else {
      swiperInstance?.autoplay?.stop();
    }
  } else {
    // ✅ Desktop behavior stays same
    if (hovered) {
      swiperInstance?.autoplay?.start();
    } else {
      swiperInstance?.autoplay?.stop();
    }
  }
}, [isMobile, hovered, swiperInstance, card.title]);

  useEffect(() => {
    setHovered(isMobile);
  }, [isMobile]);

  return (
    <>
      <motion.div
        className={`relative w-full  lg:top-0 h-[400px] sm:h-[420px] md:h-[400px] lg1:w-80 lg1:h-[500px] xl:top-20 xl:h-[600px] font-tenorSans overflow-hidden ${className}`}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onMouseEnter={() => {
          if (!isMobile) setHovered(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setHovered(false);
        }}
        style={{ touchAction: "pan-y" }}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
          allowTouchMove={true}
          grabCursor={true}
        >
          {card.hover.map((img, index) => (
            <SwiperSlide key={index}>
              <Image src={img} alt={card.title} fill className="object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay with pagination above title */}
        <div className="absolute z-50 bottom-0 left-0 w-full">
          <div className="absolute bottom-0 left-0 w-full h-[380px] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-50 font-tenorSans p-4 sm:p-6 text-white space-y-3">
            {/* Custom pagination above the title, only on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-2 flex justify-start"
            >
              {hovered && <CustomPagination total={card.hover.length} activeIndex={activeIndex} onDotClick={(i) => swiperInstance?.slideToLoop(i)} />}
            </motion.div>

            <motion.h2
              className="text-lg text-white  sm:text-2xl font-[400]"
              initial={false}
              animate={hovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {card.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={hovered && card.description ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {hovered && card.description && <p className="text-xs sm:text-sm text-justify leading-relaxed">{card.description}</p>}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
