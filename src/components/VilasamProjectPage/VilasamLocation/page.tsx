"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; // Import Swiper type
import "swiper/css";
import styles from "../../ProjectsPageComponents/ProjectLocationAdvantage/LocationAdvantage.module.css"; // Verify this file exists
import { cn } from "@/lib/utils"; // Verify this utility exists
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IconX } from "@tabler/icons-react";
// Adjust the import path for CTAButtonIcon based on your project structure
import CTAButtonIcon from "@/components/Icons/Icons"; // Verify this component exists

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
  mobileImage: string;
  buttonTextColor?: string;
  buttonFillBg?: string;
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
}) => (
  <div className="flex flex-col ">
    <div className="relative w-full h-64 lg:h-[70vh]  rounded-t-xl overflow-hidden">
      <Image
        src={description.image}
        alt={description.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-[100%_center]"
        priority
      />
    </div>
    <div className="flex flex-col gap-4 py-12 px-6 lg:px-20">
      <h2 className="text-[40px] lg:text-[48px] leading-[1.3] font-semibold max-w-lg font-geistSerif text-[#0C3E49]">{description.title}</h2>
      <h3 className="text-[#040707]/60 font-sourceSans3  !text-xl">{description.subtitle}</h3>
      <p className=" text-[#040707]/60 font-sourceSans3  !text-xl">{description.description}</p>
      <h4 className="text-[#040707]/60 font-sourceSans3  !text-xl">{description.middleTitle}</h4>
      <p className=" text-[#040707]/60 font-sourceSans3  !text-xl">{description.middleDescription}</p>
      <h4 className="text-[#040707]/60 font-sourceSans3  !text-xl">{description.bottomTitle}</h4>
      {/* <p className=" text-gray-600 text-base font-geistSerif lg:text-lg">{description.bottomDescription}</p> */}

      {/* <ul className=" space-y-6" aria-label="List of key points">
        {description?.bottomPoints?.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[#656666] mr-2 font-geistSerif text-start text-[18px]" aria-hidden="true">
              •
            </span>
            <p className="text-gray-600 text-base font-geistSerif lg:text-lg">{point}</p>
          </li>
        ))}
      </ul> */}
      <p className="text-[#040707]/60 font-sourceSans3  !text-xl">{description.middleBottomDescription}</p>
    </div>
  </div>
);

const LocationAdvantage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperInstance && swiperInstance.autoplay) {
      if (isOpen) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    }
  }, [isOpen, swiperInstance]);

  const data: LocationAdvantageProps[] = [
    {
      title: "Location Advantage",
      description: "Shaped Around You,A Place to Live Fully",
      text: "Enjoy the soothing sounds of the waves & the convenience of a beachside retreat right at your doorstep.",
      buttonText: "More about the Location",
      image: "/images/vilasamPageImages/locationAdvantageImages/1.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-[#4F373799] bg-[#A4C9D333]",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#AE856666]",
      fill: "#9CC3CB",
      mobileImage: "/images/vilasamPageImages/locationAdvantageImages/mobileImage1.webp",
      buttonFillBg: "bg-[#9CC3CB]",
      amenitiesDetails: [
        {
          image: "/images/vilasamPageImages/locationAdvantageImages/5.webp",
          title: "Shaped Around You, A Place to Live Fully",
          description:
            "At VITU Vilasam, location isn’t just a pin on the map—it’s a lifestyle by design. Tucked behind NITK, Surathkal & moments away from the coastline, this is where the rhythm of the waves becomes part of your everyday.",
          middleDescription:
            "Wake up to the sea breeze, unwind to the sound of waves, & embrace the ease of a beachside retreat—all just steps from your doorstep. Whether it’s a morning walk along the shore or a quick drive to the city, life here is effortlessly balanced between calm & convenience.",
          middleBottomDescription: "This is your space to live fully—rooted in nature, yet always connected.",
        },
      ],
    },
    {
      title: "Location Advantage",
      description: "Invest in Land, Invest in Legacy",
      text: "An address of quiet comfort & lasting promise where every day feels right, & every year adds value.",
      buttonText: "More about the Location",
      image: "/images/vilasamPageImages/locationAdvantageImages/2.webp",
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
          image: "/images/vilasamPageImages/locationAdvantageImages/2.webp",
          title: "Invest in Land, Invest in Legacy",
          description:
            "VITU Vilasam is more than a place to live—it’s a smart decision that appreciates with time. Located just behind NITK, Surathkal & minutes from the coastline, this address blends lifestyle with long-term potential.",
          middleDescription:
            "Proximity to major institutions, upcoming infrastructure, & natural beauty makes it a rare opportunity—one that offers both peace of mind today & financial confidence for the future.",
          bottomDescription:
            "Here, land isn’t just property. It’s a stable, future-ready investment that grows with you, becoming a legacy you can proudly pass on.",
        },
      ],
    },
    {
      title: "Location Advantage",
      description: "A Greener Way to Live",
      text: "Enjoy the comfort of conscious living, with sustainable choices woven seamlessly into your everyday surroundings.",
      buttonText: "More about our Sustainability Initiatives",
      image: "/images/vilasamPageImages/locationAdvantageImages/3.webp",
      mobileImage: "/images/vilasamPageImages/locationAdvantageImages/mobileImage3.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-[#4F373799] bg-[#AB352533]",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#AE856666]",
      fill: "#6E1F14",
      buttonFillBg: "bg-[#6E1F14]",
      amenitiesDetails: [
        {
          image: "/images/vilasamPageImages/locationAdvantageImages/7.webp",
          title: "A Greener Way to Live",
          description:
            "At VITU Vilasam, sustainability isn’t an afterthought—it’s a way of life. From eco-conscious planning to green landscapes that breathe, every detail is designed to create a home that’s kind to both you & the environment.",
          middleDescription:
            "Enjoy the quiet luxury of living in harmony with nature, where rainwater harvesting, open green spaces, & mindful infrastructure make every choice a conscious one. It’s comfort without compromise—where doing good feels as natural as living well.",
          bottomDescription: "Welcome to a community that cares. For today, & for generations to come.",
        },
      ],
    },
    {
      title: "Modern Infrastructure",
      description: "Built today for the needs of tomorrow",
      text: "Breathe easy in a sanctuary of greenery, where every stroll through the Oxygen Park is a step toward calm & clarity.",
      buttonText: "More about the Oxygen Park",
      image: "/images/vilasamPageImages/locationAdvantageImages/4.webp",
      textClassName: "text-white",
      paragraphClassName: "text-white",
      buttonClassName: "text-[#4F373799] bg-[#A4C9D366]",
      mobileImage: "/images/vilasamPageImages/locationAdvantageImages/mobileImage4.webp",
      buttonTextColor: "text-white",
      carousalClassName: "bg-[#AE856666]",
      fill: "#469060",
      buttonFillBg: "bg-[#469060]",
      amenitiesDetails: [
        {
          image: "/images/vilasamPageImages/locationAdvantageImages/8.webp",
          title: "Built today for the needs of tomorrow",
          description:
            "Vilasam combines elegance with efficiency through modern infrastructure that anticipates future needs. From underground electrical cabling and high-quality drainage systems to well-structured roadways and smart layout planning, every detail has been considered with foresight and functionality. This meticulous planning ensures not just visual appeal, but also long-term reliability and ease of maintenance.",
          middleDescription:
            "Whether it’s seamless utility connections, well-lit streets, or organized community spaces, the infrastructure supports a high standard of living in every aspect. It's an environment where contemporary living meets dependable design ensuring that life at Vilasam is both beautiful and built to last.",
        },
      ],
    },
  ];

  const handleDotClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
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
      swiperInstance.slideTo(nextIndex);
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
        speed={600}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          setActiveIndex(realIndex);
        }}
        autoplay={{ delay: 303300, disableOnInteraction: false }}
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
              <div className="absolute bottom-[500px] sm:bottom-[330px] md:bottom-[500px] lg:bottom-[290px] lg2:bottom-[400px] left-4 sm:left-20 inset-0 flex flex-col lg:px-1 lg2:px-4 justify-center items-start px-4 sm:px-12 text-[#4F6B94]">
                <h1
                  className={`text-lg md:text-lg lg2:text-[24px] ${item.textClassName} font-medium text-center uppercase tracking-wide font-sourceSans3`}
                >
                  {item.title}
                </h1>
                <h1
                  className={`text-2xl lg:text-5xl lg2:text-6xl  ${item.textClassName} md:font-normal font-semibold max-w-2xl font-geistSerif leading-tight`}
                >
                  {item.description}
                </h1>
                <p
                  className={`mt-4 inline-block  ${item.paragraphClassName} lg2:text-[24px] md:text-lg text-sm lg:max-w-md lg2:max-w-2xl mx font-sourceSans3 font-[400]`}
                >
                  {item.text}
                </p>
                <div className=" group cursor-pointer bottom-0 md:relative hidden">
                  <button
                    type="button"
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
                    <span className={`${item.buttonTextColor} font-sourceSans3 relative z-20 mt-[3px] md:mt-0 `}>More About the Location</span>
                  </button>
                </div>
              </div>
              <div className="absolute group cursor-pointer bottom-14 md:hidden w-full flex items-center justify-center">
                <button
                  type="button"
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
                  <span className={`${item.buttonTextColor} font-sourceSans3 relative z-20 mt-[3px] md:mt-0 `}>More About the Location</span>
                </button>
              </div>
              <div className="md:hidden  absolute w-36 !rounded-[300px] bottom-16 left-32 z-20">
        <CarouselDots total={data.length} active={activeIndex} onDotClick={handleDotClick} />
      </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hidden md:block absolute w-36 !rounded-[300px] bottom-20 left-24 z-20">
        <CarouselDots total={data.length} active={activeIndex} onDotClick={handleDotClick} className={data[activeIndex]?.carousalClassName} />
      </div>
      <div className="md:hidden  absolute w-36 !rounded-[300px] bottom-[10] left-32 z-20">
        <CarouselDots total={data.length} active={activeIndex} onDotClick={handleDotClick} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 h-screen z-50 overflow-auto" initial="hidden" animate="visible" exit="exit" data-lenis-prevent>
            <motion.div variants={backdropVariants} className="backdrop-blur-lg h-full w-full fixed inset-0" onClick={closeCard} />
            <motion.div
              variants={cardVariants}
              ref={containerRef}
              className="max-w-6xl mx-auto bg-white h-fit z-[60] my-10  rounded-3xl font-sans relative shadow-2xl"
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
              <motion.div variants={contentVariants} className="">
                <hr className="border-t-gray-200 border-[1px]" />
                <div className="lg:px-44 px-12">
                  <h1 className=" pt-10 text-[10px] md:text-[12px] font-geistSerif  text-[#8E8E93] border-t-gray-200">NextUp</h1>
                  <div className="flex pb-16 justify-between ">
                    <button
                      onClick={goToNextCard}
                      className="text-[#1D1D1F] flex font-geistSerif justify-between items-center cursor-pointer font-bold text-[18px] "
                    >
                      {data[(activeIndex + 1) % data.length].description}
                    </button>
                    <MdKeyboardArrowRight
                      onClick={goToNextCard}
                      className="ml-1 cursor-pointer mt-1 text-[20px] bg-[#EADFD1] text-[#AE85668F] rounded-full md:text-[25px]"
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
