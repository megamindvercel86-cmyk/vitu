"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import styles from "../../ProjectsPageComponents/ProjectLocationAdvantage/LocationAdvantage.module.css";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import CTAButtonIcon, { CloseTabIcon } from "@/components/Icons/Icons";
import "./vilasamLocation.css";
import CircularPlayPauseButton from "@/components/Common/CircularPlayPauseButton/CircularPlayPauseButton";
import { useSafeSpecialCharacters } from "@/hooks/useSafeSpecialCharacters";



interface LocationAdvantageProps {
  width?: string;
  title: string;
  description: string;
  text: string;
  buttonText: string;
  image: string;
  textClassName?: string;
  buttonClassName?: string;
  carousalClassName?: string;
  paragraphClassName?: string;
  fill?: string;
  mobileImage: string;
  buttonTextColor?: string;
  buttonFillBg?: string;
  closeIconFIll?: string;
  amenitiesDetails?: {
    title: string;
    subtitle?: string;
    description?: string;
    middleTitle?: string;
    middleDescription?: string;
    bottomPoints?: string[];
    middleBottomDescription?: string;
    bottomTitle?: string;
    bottomDescription?: string;
    image: string;
    width?: string,
  }[];
}

interface CarouselDotsProps {
  total: number;
  active: number;
  onDotClick?: (index: number) => void;
  className?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 50 },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
  exit: { opacity: 0 },
};

const CarouselDots = ({ total, active, onDotClick, className }: CarouselDotsProps) => {
  return (
    <div style={{ borderRadius: "50px" }} className={cn("flex items-center justify-center gap-2 py-3 ", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          className={cn("transition-all duration-300", active === index ? "w-6 bg-white rounded-xl h-2" : "w-2 h-2 bg-gray-300 rounded-full")}
          aria-label={`Go to slide ${index + 1}`}
        >
          <span className="sr-only">{`Go to slide ${index + 1}`}</span>
        </button>
      ))}
    </div>
  );
};

const CardContent = ({
  description,
  slideImage,
  width,
}: {
  description: {
    title: string;
    subtitle?: string;
    description?: string;
    middleTitle?: string;
    middleDescription?: string;
    bottomPoints?: string[];
    middleBottomDescription?: string;
    bottomTitle?: string;
    bottomDescription?: string;
    image: string;

  };
  slideImage: string;
  width?: string;
}) => {
  const safeTitle = useSafeSpecialCharacters(description.title);
  const safeSubtitle = useSafeSpecialCharacters(description.subtitle || "");
  const safeDescription = useSafeSpecialCharacters(description.description || "");
  const safeMiddleTitle = useSafeSpecialCharacters(description.middleTitle || "");
  const safeMiddleDescription = useSafeSpecialCharacters(description.middleDescription || "");
  const safeBottomTitle = useSafeSpecialCharacters(description.bottomTitle || "");
  const safeMiddleBottomDescription = useSafeSpecialCharacters(description.middleBottomDescription || "");

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[35vh] sm:h-64 lg:h-[60vh] lg2:h-[60vh] md:rounded-t-[32px] overflow-hidden">
        <Image src={description.image} alt={description.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-bl from-black/60 to-transparent" />
      </div>
      <div className="flex flex-col md:gap-4 gap-3 py-8 md:py-12 px-5 md:px-12 lg:px-20">
        <h2 className={`leading-[1.2] ${width === "sm" ? "max-w-lg" : "max-w-2xl"} font-theSeasons text-[#0C3E49] text-[28px] sm:text-[32px] lg:text-[48px] font-semibold`}>{safeTitle}</h2>
        <h3 className="text-[#040707]/60 font-ttcommons text-base md:text-xl">{safeSubtitle}</h3>
        <p className="text-[#0C3E4999] font-ttcommons text-base md:text-xl">{safeDescription}</p>
        <h4 className="text-[#0C3E4999] font-ttcommons text-base md:text-xl font-medium">{safeMiddleTitle}</h4>
        <p className="text-[#0C3E4999] font-ttcommons text-base md:text-xl">{safeMiddleDescription}</p>
        <h4 className="text-[#0C3E4999] font-ttcommons text-base md:text-xl font-medium">{safeBottomTitle}</h4>
        <ul className="space-y-3 text-[#0C3E4999] md:space-y-4" aria-label="List of key points">
          {description?.bottomPoints?.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#656666] mr-2 font-theSeasons text-start text-[18px]" aria-hidden="true">
                •
              </span>
              <p className="text-[#0C3E4999] text-sm  md:text-base lg:text-lg">{useSafeSpecialCharacters(point)}</p>
            </li>
          ))}
        </ul>
        <p className="text-[#0C3E4999] font-theSeasons text-base md:text-xl">{safeMiddleBottomDescription}</p>
      </div>
    </div>
  );
};

const LocationAdvantage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 3000; // Duration for each slide in ms

  // Clear progress interval to prevent memory leaks
  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Start the progress animation for the current slide
  const startProgress = () => {
    clearProgressInterval(); // Clear any existing interval
    setProgress(0); // Reset progress

    if (!isSlidePaused && !isOpen) {
      // Start progress animation
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (SLIDE_DURATION / 100));
          if (newProgress >= 100) {
            clearInterval(progressIntervalRef.current!);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    }
  };

  // Handle play/pause toggle
  const handleTogglePlayPause = () => {
    setIsSlidePaused((prev) => {
      const newPausedState = !prev;
      if (swiperInstance) {
        if (newPausedState) {
          swiperInstance.autoplay.stop();
          clearProgressInterval();
        } else {
          swiperInstance.autoplay.start();
          startProgress();
        }
      }
      return newPausedState;
    });
  };

  useEffect(() => {
    if (swiperInstance) {
      if (!isSlidePaused && !isOpen) {
        swiperInstance.autoplay.start();
        startProgress();
      } else {
        swiperInstance.autoplay.stop();
        clearProgressInterval();
      }
    }

    return () => clearProgressInterval();
  }, [swiperInstance, isSlidePaused, isOpen]);

  useEffect(() => {
    // Reset progress when slide changes
    if (!isSlidePaused && !isOpen) {
      startProgress();
    }
    return () => clearProgressInterval();
  }, [activeIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);


  const data: LocationAdvantageProps[] = [
    {
      width: "lg",
      title: "Investment Potential",
      description: "Invest in Land, Invest in Legacy",
      text: "An address of quiet comfort & lasting promise where every day feels right, & every year adds value.",
      buttonText: "More about the Project",
      image: "/images/vilasamPageImages/locationAdvantageImages/invest.png",
      mobileImage: "/images/vilasamPageImages/locationAdvantageImages/mobileImage2.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-[#4F373799] bg-[#A4C9D333]",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#AE856666]",
      fill: "#9CC3CB",
      buttonFillBg: "bg-[#9CC3CB]",
      amenitiesDetails: [
        {
          image: "/images/vilasamPageImages/locationAdvantageImages/9.webp",
          title: "Invest in Land, Invest in Legacy",
          description:
            "Vilasam is not just a place to live, it's a smart investment in your future. Located in the rapidly developing region of Surathkal, with seamless connectivity to key hubs and essential infrastructure, it offers the perfect blend of growth and stability. The limited number of premium plots adds exclusivity and long-term demand, ensuring that your investment retains and increases in value over time.",
          bottomPoints: [
            "Boutique project = limited supply, higher demand",
            "Upcoming Karnataka Housing Board Layout",
            "Ongoing MUDA Township",
            "National Highways NH-66, NH-75, NH-169 connectivity",
            "2–3 mins to NITK, Srinivas University, Hospitals & Beaches",
            "8 mins to MRPL, NMPT industrial zones",
            "20+ Top Educational Institutions",
            "10+ Major Hospitals",
            "High-growth corridor with 100% appreciation in the last 4 years",
            "Low Capital Entry",
            "New Mangalore Port Upgradation",
            "Infrastructure-ready community",
            "Silicon Beach Programme",
            "Mangalore International Airport Expansion",
            "Limited inventory — premium value assured",
          ],
        },
      ],
    },
    {
      width: "xl",
      title: "Location Advantage",
      description: "Shaped Around You, A Place to Live Fully",
      text: "Enjoy the soothing sounds of waves & the convenience of a beachside retreat just minutes away from the beach.",
      buttonText: "More about the Project",
      image: "/images/vilasamPageImages/locationAdvantageImages/1.webp",
      mobileImage: "/images/vilasamPageImages/locationAdvantageImages/mobileImage1.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-[#4F373799] bg-[#A4C9D333]",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#AE856666]",
      fill: "#9CC3CB",
      buttonFillBg: "bg-[#9CC3CB]",
      amenitiesDetails: [
        {
          image: "/images/vilasamPageImages/locationAdvantageImages/5.webp",
          title: "Shaped Around You, A Place to Live Fully",
          description:
            "Discover a life where calm is your closest neighbor. At Vilasam, every element from tree-lined avenues to open green corners is thoughtfully planned to offer a peaceful lifestyle away from the city's chaos. It's a place where mornings begin with birdsong and evenings wind down with golden skies and gentle breezes.",
          middleDescription:
            "Here, serene living isn't just a promise. It's woven into the very fabric of the community. With minimal noise, low density and plenty of space to breathe, Vilasam becomes a personal retreat where you can slow down, reconnect, and truly live at your own pace.",
        },
      ],
    },
    {
      width: "md",
      title: "Sustainable Living",
      description: "A Greener Way to Live",
      text: "Enjoy the comfort of conscious living, with sustainable choices woven seamlessly into your everyday surroundings.",
      buttonText: "More about the Project",
      image: "/images/vilasamPageImages/locationAdvantageImages/Yoga.webp",
      mobileImage: "/images/vilasamPageImages/locationAdvantageImages/newYoga.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-[#4F373799] bg-[#AB352533]",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#AE856666]",
      fill: "#6E1F14",
      buttonFillBg: "bg-[#6E1F14]",
      closeIconFIll: "#a1a1a1",
      amenitiesDetails: [
        {
          image: "/images/vilasamPageImages/locationAdvantageImages/Yoga.webp",
          title: "A Greener Way to Live",
          description:
            "At Vilasam, sustainability isn't an afterthought. It's part of our core philosophy. Every element of the layout has been crafted with a commitment to reducing environmental impact while enhancing the quality of life. From energy-efficient street lighting to eco-sensitive landscaping and water management systems, we've taken conscious steps to build a community that respects nature.",
          middleDescription:
            "Living sustainably at Vilasam doesn't mean sacrificing comfort. Instead, it means being part of a thoughtful ecosystem where natural resources are valued and preserved. It's a choice to live smarter, greener and more responsibly where every action today contributes to a better tomorrow for you and the generations to come.",
        },
      ],
    },
    {
      width: "sm",
      title: "Modern Infrastructure",
      description: "Designed for Today, Ready for Tomorrow ",
      text: "Smartly planned, future-ready infrastructure that makes everyday living seamless.",
      buttonText: "More about the Project",
      image: "/images/vilasamPageImages/locationAdvantageImages/4.webp",
      mobileImage: "/images/vilasamPageImages/locationAdvantageImages/mobileImage4.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-[#4F373799] bg-[#A4C9D366]",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#AE856666]",
      fill: "#469060",
      buttonFillBg: "bg-[#469060]",
      amenitiesDetails: [
        {
          image: "/images/vilasamPageImages/locationAdvantageImages/8.webp",
          title: "Designed for Today, Ready for Tomorrow ",
          description:
            "Vilasam combines elegance with efficiency through modern infrastructure that anticipates future needs. From underground electrical cabling and high-quality drainage systems to well-structured roadways and smart layout planning, every detail has been considered with foresight and functionality. This meticulous planning ensures not just visual appeal, but also long-term reliability and ease of maintenance.",
          middleDescription:
            "Whether it's seamless utility connections, well-lit streets, or organized community spaces, the infrastructure supports a high standard of living in every aspect. It's an environment where contemporary living meets dependable design ensuring that life at Vilasam is both beautiful and built to last.",
        },
      ],
    },
  ];

  const handleDotClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
      setActiveIndex(index);
      if (!isSlidePaused) {
        swiperInstance.autoplay.start();
        startProgress();
      }
    }
  };

  const openCard = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeCard = () => {
    setIsOpen(false);
  };

  const goToNextCard = () => {
    const nextIndex = (activeIndex + 1) % data.length;
    setActiveIndex(nextIndex);
    setCurrentIndex(0);
    if (swiperInstance) {
      swiperInstance.slideToLoop(nextIndex);
      if (!isSlidePaused && !isOpen) {
        swiperInstance.autoplay.start();
        startProgress();
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        className={styles.locationAdvantageSwiper}
        onSwiper={setSwiperInstance}
        loop={true}
        autoplay={{
          delay: SLIDE_DURATION,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          setActiveIndex(realIndex);
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "100%", height: "100vh" }} className="!h-[100vh] !w-[100%] !rounded-none">
            <div className="relative w-full h-screen">
              <Image
                src={item.image}
                alt={item.description}
                fill
                className="absolute hidden md:block object-cover w-full h-full md:object-center"
                priority={index === 0}
              />
              <Image
                src={item.mobileImage}
                alt={item.description}
                fill
                sizes="100vw"
                className="absolute md:hidden object-cover w-full h-full object-top"
                priority={index === 0}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/10 z-[1]" />
              <div className={`absolute top-[60px] left-4 sm:left-20 inset-0 flex flex-col lg:px-1 lg2:px-4  items-start px-4 sm:px-12 text-[#4F6B94]  ${item.width == "md" ? "max-w-md" : ""} ${item.width == "lg" ? "max-w-lg" : ""} z-[2]`}>
                <h1
                  className={`text-xs md:text-lg lg2:text-[16px] ${item.textClassName} font-medium text-center uppercase tracking-wide font-ttcommons`}
                >
                  {useSafeSpecialCharacters(item.title)}
                </h1>
                <h1
                  className={`text-2xl lg:text-5xl lg2:text-6xl ${item.textClassName} md:font-normal font-semibold max-w-2xl font-theSeasons lg2:leading-tight `}
                >
                  {useSafeSpecialCharacters(item.description)}
                </h1>
                <p
                  className={`mt-4 inline-block ${item.paragraphClassName} lg2:text-[22px] md:text-lg text-sm lg:max-w-md lg2:max-w-2xl mx font-ttCommons font-[400]`}
                >
                  {useSafeSpecialCharacters(item.text)}
                </p>
                <div className="group cursor-pointer bottom-0 md:block relative hidden">
                  <button
                    type="button"
                    aria-label="More about the Project"
                    onClick={() => openCard(0)}
                    className="
                      relative group
                      mt-4
                      flex items-center justify-center
                      gap-[0.6875rem]
                      rounded-full
                      pl-[7px] pr-[1rem] py-[0.6px] lg:py-[0.20rem]
                      text-base font-ttCommons text-white
                      2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                      overflow-hidden z-1000
                    "
                  >
                    <div className={`absolute inset-0 ${item.buttonClassName} rounded-full`}></div>
                    <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
                      <div
                        className={`
                          absolute w-0 h-0 ${item.buttonFillBg} rounded-full
                          group-hover:w-[40rem] group-hover:h-[30rem]
                          transition-all duration-500 ease-out
                        `}
                      ></div>
                      <div className="relative z-20">
                        <CTAButtonIcon fill={item.fill} direction="right" />
                      </div>
                    </div>
                    <span className={`${item.buttonTextColor} font-ttCommons relative z-20 mt-[3px] md:mt-0`}>{useSafeSpecialCharacters(item.buttonText)}</span>
                  </button>
                </div>
              </div>
              <div className="absolute group cursor-pointer bottom-14 md:hidden w-full flex items-center justify-center">
                <button
                  type="button"
                  aria-label="More about the Project"
                  onClick={() => openCard(0)}
                  className="
                    relative group
                    mt-4
                    flex items-center justify-center
                    gap-[0.6875rem]
                    rounded-full
                    pl-[7px] pr-[1rem] py-[0.6px] lg:py-[0.20rem]
                    text-base font-ttCommons text-white
                    2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                    overflow-hidden z-100
                  "
                >
                  <div className={`absolute inset-0 ${item.buttonClassName} rounded-full`}></div>
                  <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
                    <div
                      className={`
                        absolute w-0 h-0 ${item.buttonFillBg} rounded-full
                        group-hover:w-[40rem] group-hover:h-[30rem]
                        transition-all duration-500 ease-out
                      `}
                    ></div>
                    <div className="relative z-20">
                      <CTAButtonIcon fill={item.fill} direction="right" />
                    </div>
                  </div>
                  <span className={`${item.buttonTextColor} font-ttCommons relative z-20 mt-[3px] md:mt-0`}>{useSafeSpecialCharacters(item.buttonText)}</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hidden md:block absolute w-36 !rounded-[300px] bottom-20 left-24 z-20">
        <CarouselDots total={data.length} active={activeIndex} onDotClick={handleDotClick} className={data[activeIndex]?.carousalClassName} />
      </div>
      <div className="hidden md:block absolute w-36 !rounded-[300px] bottom-[70px] left-[260px] z-20">
        <CircularPlayPauseButton
          isPlay={!isSlidePaused}
          onToggle={handleTogglePlayPause}
          progress={progress}
          strokeColor="#ffffff"
        />
      </div>
      <div className="md:hidden absolute !rounded-[300px] bottom-5 flex justify-center w-full z-20">
        <CarouselDots total={data.length} active={activeIndex} onDotClick={handleDotClick} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{ zIndex: 2147483648 }}
            className="fixed inset-0 h-screen z-50 overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            viewport={{ once: true }}
            data-lenis-prevent
          >
            <motion.div variants={backdropVariants} className="backdrop-blur-lg h-full w-full fixed inset-0" onClick={closeCard} />
            <motion.div
              variants={cardVariants}
              ref={containerRef}
              className="w-full md:max-w-4xl md:m-auto bg-white min-h-screen md:min-h-fit md:h-fit z-[60] md:!my-12 md:!rounded-[32px] font-ttCommons relative shadow-2xl"
            >
              <motion.button
                variants={contentVariants}
                className="absolute top-6 z-50 me-5 lg:me-6 h-8 w-8 right-0 cursor-pointer ml-auto rounded-full flex items-center justify-center"
                onClick={closeCard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                viewport={{ once: true }}
              >
                <CloseTabIcon fill={data[activeIndex].closeIconFIll} />
              </motion.button>
              <motion.div variants={contentVariants}>
                <CardContent description={data[activeIndex].amenitiesDetails![currentIndex]} slideImage={data[activeIndex].image} width={data[activeIndex].width} />
              </motion.div>
              <motion.div variants={contentVariants}>
                <hr className="border-t-gray-200 border-[1px]" />
                <div className="lg:px-44 md:px-12 px-6">
                  <h1 className="pt-10 text-[10px] md:text-[12px] font-theSeasons text-[#0C3E4999] border-t-gray-200">UP NEXT</h1>
                  <div className="flex md:pb-16 pb-32 justify-between">
                    <button
                      aria-label="Next Card"
                      onClick={goToNextCard}
                      className="text-[#0C3E49] flex font-theSeasons justify-between items-center text-left cursor-pointer font-bold md:text-[18px] text-base"
                    >
                      {data[(activeIndex + 1) % data.length].description}
                    </button>
                    <MdKeyboardArrowRight
                      onClick={goToNextCard}
                      className="ml-1 cursor-pointer mt-1 text-[20px] bg-[#2B847D33] text-[#0C3E49] rounded-full md:text-[25px]"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationAdvantage;
