"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import styles from "./LocationAdvantage.module.css";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IconX } from "@tabler/icons-react";
import CTAButtonIcon from "@/components/Icons/Icons";
import CircularPlayPauseButton from "@/components/Common/CircularPlayPauseButton/CircularPlayPauseButton";

interface LocationAdvantageProps {
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
  buttonTextColor?: string;
  mobileImage: string;
  buttonFillBg?: string;
  amenitiesDetails?: {
    title: string;
    image: string;
    subtitle: string;
    description: string;
    middleTitle: string;
    middleDescription: string;
    bottomPoints: string[];
    middleBottomDescription?: string;
    bottomTitle?: string;
    bottomDescription?: string;
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
          className={cn("transition-all duration-300", active === index ? `w-6 bg-white rounded-xl h-2` : "w-2 h-2 bg-gray-300 rounded-full")}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

const CardContent = ({
  description,
  slideImage,
}: {
  description: {
    title: string;
    subtitle: string;
    description: string;
    middleTitle: string;
    middleDescription: string;
    bottomPoints: string[];
    middleBottomDescription?: string;
    bottomTitle?: string;
    bottomDescription?: string;
    image: string;
  };
  slideImage: string;
}) => (
  <div className="">
    <div className="relative w-full h-64 lg:h-[70vh] mb-6 rounded-t-xl overflow-hidden">
      <Image src={description.image} alt={description.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
    </div>
    <div className=" px-6 lg:px-20">
      <h2 className="text-[54px] leading-[1] font-FreightNeoProNormal text-[#4F3737]">{description.title}</h2>
      <h3 className="text-[28px] leading-[1.2] font-FreightNeoProNormal mt-2 text-[#040707CC] ">{description.subtitle}</h3>
      <p className="mt-8 text-gray-600 text-base font-FreightNeoProNormal lg:text-lg">{description.description}</p>
      <h4 className="text-[28px] leading-[1.2] font-FreightNeoProNormal text-[#040707CC] mt-10">{description.middleTitle}</h4>
      <p className=" text-gray-600 text-base font-FreightNeoProNormal lg:text-lg">{description.middleDescription}</p>
      <h4 className="text-[28px] leading-[1.2] font-FreightNeoProNormal text-[#040707CC] mt-10">{description.bottomTitle}</h4>
      <p className=" text-gray-600 text-base font-FreightNeoProNormal lg:text-lg">{description.bottomDescription}</p>
      <ul className="mt-6 space-y-6" aria-label="List of key points">
        {description.bottomPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[#656666] mr-2 font-FreightNeoProNormal text-start text-[18px]" aria-hidden="true">
              •
            </span>
            <p className="text-gray-600 text-base font-FreightNeoProNormal lg:text-lg">{point}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-gray-600 text-base font-FreightNeoProNormal lg:text-lg">{description.middleBottomDescription}</p>
    </div>
  </div>
);

const LocationAdvantage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSlidePaused, setIsSlidePaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const SLIDE_DURATION = 3000; // Duration for each slide in ms
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
          const newProgress = prev + 100 / (SLIDE_DURATION / 100);
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
      if (!isSlidePaused) {
        swiperInstance.autoplay.start();
        startProgress();
      }
    }
  };


   useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

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
          <SwiperSlide key={index} className="!h-[100vh] !rounded-none">
            <div className="relative w-full h-screen">
              <Image
                src={item.image}
                alt={item.description}
                fill
                sizes="100vw"
                className="absolute hidden md:block object-cover w-full h-full md:object-center"
                priority={index === 0}
              />
              <Image
                src={item.mobileImage}
                alt={item.description}
                fill
                sizes="100vw"
                className="absolute md:hidden object-cover w-full h-full md:object-center"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent rounded-lg h-[400]" />
              <div className="absolute bottom-[500px] sm:bottom-[330px] md:bottom-[500px] lg:bottom-[290px] lg2:bottom-[400px] left-4 sm:left-20 inset-0 flex flex-col lg:px-1 lg2:px-4 justify-center items-start px-4 sm:px-12 text-[#4F6B94]">
                <h1
                  className={`text-lg md:text-lg lg2:text-[24px] ${item.textClassName} font-medium text-center uppercase tracking-wide font-freightNeoMedium`}
                >
                  {item.title}
                </h1>
                <h1
                  className={`text-2xl lg:text-5xl lg2:text-6xl  ${item.textClassName} md:font-normal font-semibold max-w-2xl font-freightNeoMedium leading-tight`}
                >
                  {item.description}
                </h1>
                <p
                  className={`mt-4 inline-block  ${item.paragraphClassName} lg2:text-[24px] md:text-lg text-sm lg:max-w-md lg2:max-w-2xl mx font-freightNeoMedium font-[400]`}
                >
                  {item.text}
                </p>
                <div className=" group cursor-pointer bottom-0 md:block relative hidden">
                  <button
                    type="button"
                    aria-label="More about the location"
                    onClick={() => openCard(0)}
                    className="
                       relative group
                      mt-4
                      flex items-center justify-center
                      gap-[0.6875rem]
                      rounded-full
                      pl-[7px] pr-[1rem] py-[0.6px] lg:py-[0.20rem]
                      text-base font-freightNeoMedium text-white
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
                    <span className={`${item.buttonTextColor} font-freightNeoMedium relative z-20 mt-[3px] md:mt-0 `}>More About the Location</span>
                  </button>
                </div>
              </div>
              <div className="absolute group cursor-pointer bottom-14 md:hidden w-full flex items-center justify-center">
                <button
                  type="button"
                  aria-label="More about the location"
                  onClick={() => openCard(0)}
                  className="
                       relative group
                      mt-4
                      flex items-center justify-center
                      gap-[0.6875rem]
                      rounded-full 
                      pl-[7px] pr-[1rem] py-[0.6px] lg:py-[0.20rem]
                      text-base font-freightNeoMedium text-white
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
                  <span className={`${item.buttonTextColor} font-freightNeoMedium relative z-20 mt-[3px] md:mt-0 `}>More About the Location</span>
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
        <CircularPlayPauseButton isPlay={!isSlidePaused} onToggle={handleTogglePlayPause} progress={progress} strokeColor="#ffffff" />
      </div>
      <div className="md:hidden  absolute  !rounded-[300px] bottom-5 flex justify-center w-full z-20">
        <CarouselDots total={data.length} active={activeIndex} onDotClick={handleDotClick} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div style={{zIndex:"1232132233"}} className="fixed inset-0 h-screen z-50 overflow-auto" initial="hidden" animate="visible" exit="exit" data-lenis-prevent>
            <motion.div variants={backdropVariants} className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0" onClick={closeCard} />
            <motion.div
              variants={cardVariants}
              ref={containerRef}
              className="max-w-6xl mx-auto bg-white h-fit z-[60] my-10 pb-10 rounded-3xl font-sans relative shadow-2xl"
            >
              <motion.button
                variants={contentVariants}
                className="absolute top-6 z-50 me-4 lg:me-8 h-8 w-8 right-0 cursor-pointer ml-auto bg-white rounded-full flex items-center justify-center"
                onClick={closeCard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="h-6 w-6 text-[#7a6d3c]" />
              </motion.button>
              <motion.div variants={contentVariants}>
                <CardContent description={data[activeIndex].amenitiesDetails![currentIndex]} slideImage={data[activeIndex].image} />
              </motion.div>
              <motion.div variants={contentVariants} className="p-4 lg:px-20 mt-10">
                <h1 className="border-t-2 pt-9 text-[10px] md:text-[12px] font-FreightNeoProNormal text-[#8E8E93] border-t-gray-200">NextUp</h1>
                <div className="flex justify-between">
                  <button
                    aria-label="Next Card"
                    onClick={goToNextCard}
                    className="text-[#1D1D1F] flex font-FreightNeoProBold justify-between items-center cursor-pointer font-bold text-[18px]"
                  >
                    {data[(activeIndex + 1) % data.length].description}
                  </button>
                  <MdKeyboardArrowRight
                    onClick={goToNextCard}
                    className="ml-1 cursor-pointer mt-1 text-[20px] bg-[#EADFD1] text-[#AE85668F] rounded-full md:text-[25px]"
                  />
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
 const data: LocationAdvantageProps[] = [
    {
      title: "Location Advantage",
      description: "Built for Life's Moments",
      text: "Enjoy the soothing sounds of the waves & the convenience of a beachside retreat right at your doorstep.",
      buttonText: "More about the Location",
      image: "/images/locationAdvantagesImages/1.webp",
      textClassName: "text-[#4F3737]",
      paragraphClassName: "text-[#998d88]",
      buttonClassName: "text-[#4F373799] bg-[#debf9d]",
      buttonTextColor: "text-[#4F373799]",
      carousalClassName: "bg-[#AE856666]",
      mobileImage: "/images/locationAdvantagesImages/mobile1.webp",
      fill: "#ccaa8d",
      buttonFillBg: "bg-[#ccaa8d]",
      amenitiesDetails: [
        {
          title: "Embracing Coastal Serenity",
          image: "/images/locationAdvantagesImages/6.webp",
          subtitle: "Crafting a Beachside Haven",
          description:
            "At VITU Realty, we create homes that harmonize with the rhythm of the sea. Our beachside properties are designed to offer tranquility and convenience, blending modern luxury with the natural beauty of the coastline. Every detail, from ocean-view terraces to coastal-inspired interiors, is crafted to enhance your connection to the sea.",
          middleTitle: "Why Coastal Living Matters",
          middleDescription:
            "Living by the beach offers more than just scenic views—it promotes wellness, relaxation, and a lifestyle rooted in nature. Our properties are strategically located to provide immediate access to the shoreline, ensuring that the calming influence of the ocean is always within reach.",
          bottomPoints: [
            "Ocean-View Terraces: Spacious outdoor areas designed to maximize views of the sea, perfect for morning coffee or evening sunsets.",
            "Coastal Design Aesthetics: Interiors inspired by the beach, using natural materials and soothing color palettes to create a serene environment.",
            "Beach Access: Direct pathways to the shoreline, making beach walks and water activities a seamless part of your daily life.",
            "Wellness Amenities: On-site yoga studios and meditation spaces that leverage the calming effects of the ocean to promote mental and physical health.",
          ],
          middleBottomDescription:
            "At VITU Realty, we believe that a beachside home is more than a place to live—it’s a lifestyle that nurtures peace and connection. Our properties are designed to let you live in harmony with the sea, offering a retreat where life’s moments are savored. Together, we can create a coastal haven that feels like home.",
          bottomTitle: "The Core Principles of Coastal Design",
          bottomDescription:
            "Our beachside properties integrate thoughtful design and functionality, ensuring a seamless blend of luxury and nature:",
        },
      ],
    },
    {
      title: "Investment potential",
      description: "Great Investment Potential",
      text: "A smart address that offers comfort now & confidence for what’s ahead—where life & value grow together.",
      buttonText: "More about the Location",
      image: "/images/locationAdvantagesImages/2.webp",
      mobileImage: "/images/locationAdvantagesImages/mobile2.webp",
      textClassName: "text-[#4F3737]",
      paragraphClassName: "text-[#998d88]",
      buttonClassName: "text-[#4F373799] bg-[#debf9d]",
      buttonTextColor: "text-[#4F373799]",
      carousalClassName: "bg-[#AE856666]",
      fill: "#ccaa8d",
      buttonFillBg: "bg-[#ccaa8d]",
      amenitiesDetails: [
        {
          title: "Investing in Tomorrow",
          subtitle: "Building Wealth Through Smart Real Estate",
          image: "/images/locationAdvantagesImages/7.webp",
          description:
            "At VITU Realty, we design properties that are not just homes but also smart investments. Located in high-growth areas, our developments offer strong appreciation potential, modern infrastructure, and access to thriving communities, ensuring long-term value for homeowners and investors alike.",
          middleTitle: "Why Location Drives Value",
          middleDescription:
            "A property’s value is deeply tied to its location. Our developments are strategically placed in areas with strong economic growth, excellent connectivity, and proximity to essential amenities, making them ideal for those seeking both comfort and financial security.",
          bottomTitle: "The Core Principles of Investment-Driven Design",
          bottomDescription: "Our properties are built with features that enhance long-term value and appeal:",
          bottomPoints: [
            "Strategic Location: Positioned in areas with high demand and growth potential, ensuring strong market performance.",
            "Modern Infrastructure: Cutting-edge construction techniques and smart home technologies that increase property desirability.",
            "Community Growth: Proximity to schools, hospitals, and commercial hubs, fostering a vibrant and connected lifestyle.",
            "Resale Potential: Designed with timeless aesthetics and durable materials to maintain value over time.",
          ],
          middleBottomDescription:
            "At VITU Realty, we understand that investing in real estate is about securing your future. Our properties are crafted to deliver both immediate comfort and long-term financial growth, ensuring that your investment thrives as your life does. Together, we can build wealth, one smart address at a time.",
        },
      ],
    },
    {
      title: "Sustainable growth",
      description: "Sustainable Living",
      text: "Enjoy the comfort of conscious living, with sustainable choices woven seamlessly into your everyday surroundings.",
      buttonText: "More about our Sustainability Initiatives",
      image: "/images/locationAdvantagesImages/3.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-white bg-[#4B948066]",
      mobileImage: "/images/locationAdvantagesImages/mobile3.webp",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#4B948066]",
      fill: "#2c4f40",
      buttonFillBg: "bg-[#2c4f40]",
      amenitiesDetails: [
        {
          title: "Living Green, Made Simple",
          subtitle: "Sustainable Homes for a Better Planet",
          image: "/images/locationAdvantagesImages/8.webp",
          description:
            "At VITU Realty, sustainability is at the heart of our mission. Our eco-conscious properties are designed to minimize environmental impact while maximizing comfort, integrating green technologies and practices that make sustainable living effortless and rewarding.",
          middleTitle: "Why Green Living Matters",
          middleDescription:
            "Choosing a sustainable home means contributing to a healthier planet and a better quality of life. Our properties incorporate cutting-edge green technologies to reduce energy consumption, conserve water, and promote eco-friendly lifestyles, all while maintaining modern luxury.",
          bottomPoints: [
            "Green Certifications: Our properties meet rigorous standards like LEED, ensuring top-tier sustainability performance.",
            "Solar Energy Integration: Rooftop solar panels and energy-efficient systems to reduce reliance on non-renewable energy.",
            "Smart Water Systems: Rainwater harvesting and low-flow fixtures to minimize water waste and promote conservation.",
            "Eco-Friendly Materials: Use of sustainable, locally sourced materials to reduce environmental impact and support local economies.",
          ],
          middleBottomDescription:
            "At VITU Realty, we believe sustainable living should be accessible and inspiring. Our homes are designed to make eco-conscious choices seamless, allowing you to live in harmony with the planet without sacrificing comfort. Together, we can create a greener future, one home at a time.",
          bottomTitle: "The Core Principles of Green Design",
          bottomDescription: "Our sustainable properties integrate innovative technologies and practices to promote environmental stewardship:",
        },
      ],
    },
    {
      title: "500+ Tree Cover",
      description: "Lush Oxygen Park",
      text: "Breathe easy in a sanctuary of greenery, where every stroll through the Oxygen Park is a step toward calm & clarity.",
      buttonText: "More about the Oxygen Park",
      image: "/images/locationAdvantagesImages/4.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-white bg-[#78a5c1]",
      mobileImage: "/images/locationAdvantagesImages/mobile4.webp",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#4B948066]",
      fill: "#4793be",
      buttonFillBg: "bg-[#4793be]",
      amenitiesDetails: [
        {
          title: "A Sanctuary of Green",
          subtitle: "Nature at the Heart of Your Home",
          image: "/images/locationAdvantagesImages/9.webp",
          description:
            "At VITU Realty, our Oxygen Park is more than just green space—it’s a sanctuary designed to promote wellness, tranquility, and a deep connection to nature. With lush landscapes and thoughtful design, the park offers a serene escape within your community.",
          middleTitle: "Why Green Spaces Matter",
          middleDescription:
            "Access to green spaces has been shown to improve mental health, reduce stress, and enhance overall well-being. Our Oxygen Park is designed to bring these benefits to your doorstep, creating a natural haven where you can recharge and reconnect with nature.",
          bottomPoints: [
            "Biodiverse Landscaping: Native plants and trees that support local ecosystems and enhance air quality.",
            "Walking and Jogging Trails: Scenic paths designed for exercise and relaxation, winding through the park’s greenery.",
            "Community Gardens: Spaces for residents to grow their own produce, fostering sustainability and connection.",
            "Meditation Zones: Quiet areas for yoga, meditation, or simply enjoying the peace of nature.",
          ],
          middleBottomDescription:
            "At VITU Realty, we believe that nature is essential to a balanced life. Our Oxygen Park is designed to be a living, breathing part of your community, offering spaces to relax, play, and grow. Together, we can create a home where nature and well-being thrive.",
          bottomTitle: "The Core Principles of Green Space Design",
          bottomDescription: "Our Oxygen Park integrates thoughtful landscaping and amenities to create a natural oasis:",
        },
      ],
    },
    {
      title: "Project Highlight",
      description: "30+ Amenities",
      text: "From sunrise workouts to sunset strolls, enjoy 30+ ways to relax, recharge & reconnect - every single day.",
      buttonText: "More about the Amenities",
      image: "/images/locationAdvantagesImages/5.webp",
      mobileImage: "/images/locationAdvantagesImages/mobile5.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-white bg-[#78a5c1]",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#4B948066]",
      fill: "#4793be",
      buttonFillBg: "bg-[#4793be]",
      amenitiesDetails: [
        {
          title: "A Lifestyle of Choice",
          subtitle: "Amenities for Every Moment",
          image: "/images/locationAdvantagesImages/5.webp",
          description:
            "At VITU Realty, we believe that a home should offer more than just shelter—it should provide a vibrant lifestyle. Our properties feature over 30 amenities designed to cater to every aspect of your life, from fitness and relaxation to socializing and recreation.",
          middleTitle: "Why Amenities Enhance Living",
          middleDescription:
            "A diverse range of amenities creates a community where residents can thrive. Whether you’re seeking active pursuits, quiet relaxation, or social connections, our properties offer spaces that cater to every lifestyle, ensuring every day is enriched.",
          bottomPoints: [
            "State-of-the-Art Fitness Center: Equipped with modern gym equipment and spaces for group classes like yoga and pilates.",
            "Rooftop Lounge: A stylish space for socializing, with stunning views and comfortable seating areas.",
            "Swimming Pool: A serene pool area for relaxation or exercise, designed for year-round enjoyment.",
            "Community Event Spaces: Areas for gatherings, events, and workshops to foster a sense of community.",
          ],
          middleBottomDescription:
            "At VITU Realty, we design amenities to elevate your everyday life. From morning workouts to evening gatherings, our properties offer endless opportunities to live fully and connect deeply. Together, we can create a home that supports every facet of your lifestyle.",
          bottomTitle: "The Core Principles of Amenity Design",
          bottomDescription: "Our amenities are crafted to enhance your daily experience, offering variety and quality:",
        },
      ],
    },
  ];