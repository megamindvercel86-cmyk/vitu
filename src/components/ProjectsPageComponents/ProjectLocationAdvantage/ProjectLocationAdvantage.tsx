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
  mobileImage:string
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
          className={cn(
            "transition-all duration-300",
            active === index ? `w-6 bg-white rounded-xl h-2` : "w-2 h-2 bg-gray-300 rounded-full"
          )}
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
            <span className="text-[#656666] mr-2 font-FreightNeoProNormal text-start text-[18px]" aria-hidden="true">•</span>
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
          title: "Foundations for the Future",
          image: "/images/locationAdvantagesImages/6.webp",
          subtitle: "Building Sustainably for a Better Tomorrow",
          description:
            "At Vitu Realty, we believe that the future of real estate lies not only in the structures we create but in the positive impact they have on the environment and the communities they serve. Sustainability is more than just a buzzword—it’s a guiding principle that informs every aspect of our building practices. As we move into the future, it is our responsibility to ensure that the properties we develop and the spaces we design are both environmentally friendly and future-ready.",
          middleTitle: "Why Sustainable Building Matters",
          middleDescription:
            "Sustainable building practices are essential for reducing our carbon footprint, conserving natural resources, and creating healthier living environments. By prioritizing sustainability, we can help mitigate the effects of climate change and promote a more balanced relationship between urban development and nature.",
          bottomPoints: [
            "Energy Efficiency: From the design phase to construction, we prioritize energy-efficient systems and materials. This includes maximizing natural light, installing high-efficiency HVAC systems, and incorporating renewable energy sources like solar panels.",
            "Water Conservation: Our properties are designed with water-saving technologies that minimize waste and optimize usage, contributing to lower utility bills and environmental preservation.",
            "Waste Reduction: During construction, we implement strategies to reduce, reuse, and recycle waste. This ensures that less material ends up in landfills, contributing to a more sustainable building process.",
            "Indoor Environmental Quality: Sustainability also means improving the health and well-being of occupants. We use low-VOC paints, efficient air filtration systems, and ensure proper ventilation to create spaces that promote clean air and overall wellness.",
          ],
          middleBottomDescription:
            "At Vitu Realty, we understand that building sustainably is not just about constructing buildings—it’s about building a better tomorrow. By embracing sustainable practices, we are helping to shape a world where both the environment and its inhabitants thrive in harmony. As we move forward, we remain dedicated to creating properties that are as kind to the planet as they are to those who inhabit them. Together, we can build the foundations for a more sustainable future—one project at a time.",
          bottomTitle: "The Core Principles of Sustainable Building",
          bottomDescription: "At Vitu Realty, our commitment to sustainability begins with a holistic approach to development. Our building practices integrate:",
        },
      ],
    },
    {
      title: "Location Advantage",
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
          title: "Foundations for the Future",
          subtitle: "Building Sustainably for a Better Tomorrow",
          image: "/images/locationAdvantagesImages/7.webp",
          description:
            "At Vitu Realty, we believe that the future of real estate lies not only in the structures we create but in the positive impact they have on the environment and the communities they serve. Sustainability is more than just a buzzword—it’s a guiding principle that informs every aspect of our building practices. As we move into the future, it is our responsibility to ensure that the properties we develop and the spaces we design are both environmentally friendly and future-ready.",
          middleTitle: "Why Sustainable Building Matters",
          middleDescription:
            "Sustainable building practices are essential for reducing our carbon footprint, conserving natural resources, and creating healthier living environments. By prioritizing sustainability, we can help mitigate the effects of climate change and promote a more balanced relationship between urban development and nature.",
          bottomTitle: "The Core Principles of Sustainable Building",
          bottomDescription: "At Vitu Realty, our commitment to sustainability begins with a holistic approach to development. Our building practices integrate:",
          bottomPoints: [
            "Energy Efficiency: From the design phase to construction, we prioritize energy-efficient systems and materials. This includes maximizing natural light, installing high-efficiency HVAC systems, and incorporating renewable energy sources like solar panels.",
            "Water Conservation: Our properties are designed with water-saving technologies that minimize waste and optimize usage, contributing to lower utility bills and environmental preservation.",
            "Waste Reduction: During construction, we implement strategies to reduce, reuse, and recycle waste. This ensures that less material ends up in landfills, contributing to a more sustainable building process.",
            "Indoor Environmental Quality: Sustainability also means improving the health and well-being of occupants. We use low-VOC paints, efficient air filtration systems, and ensure proper ventilation to create spaces that promote clean air and overall wellness.",
          ],
          middleBottomDescription:
            "At Vitu Realty, we understand that building sustainably is not just about constructing buildings—it’s about building a better tomorrow. By embracing sustainable practices, we are helping to shape a world where both the environment and its inhabitants thrive in harmony. As we move forward, we remain dedicated to creating properties that are as kind to the planet as they are to those who inhabit them. Together, we can build the foundations for a more sustainable future—one project at a time.",
        },
      ],
    },
    {
      title: "Location Advantage",
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
          title: "Foundations for the Future",
          subtitle: "Building Sustainably for a Better Tomorrow",
          image: "/images/locationAdvantagesImages/8.webp",
          description:
            "At Vitu Realty, we believe that the future of real estate lies not only in the structures we create but in the positive impact they have on the environment and the communities they serve. Sustainability is more than just a buzzword—it’s a guiding principle that informs every aspect of our building practices. As we move into the future, it is our responsibility to ensure that the properties we develop and the spaces we design are both environmentally friendly and future-ready.",
          middleTitle: "Why Sustainable Building Matters",
          middleDescription:
            "Sustainable building practices are essential for reducing our carbon footprint, conserving natural resources, and creating healthier living environments. By prioritizing sustainability, we can help mitigate the effects of climate change and promote a more balanced relationship between urban development and nature.",
          bottomPoints: [
            "Energy Efficiency: From the design phase to construction, we prioritize energy-efficient systems and materials. This includes maximizing natural light, installing high-efficiency HVAC systems, and incorporating renewable energy sources like solar panels.",
            "Water Conservation: Our properties are designed with water-saving technologies that minimize waste and optimize usage, contributing to lower utility bills and environmental preservation.",
            "Waste Reduction: During construction, we implement strategies to reduce, reuse, and recycle waste. This ensures that less material ends up in landfills, contributing to a more sustainable building process.",
            "Indoor Environmental Quality: Sustainability also means improving the health and well-being of occupants. We use low-VOC paints, efficient air filtration systems, and ensure proper ventilation to create spaces that promote clean air and overall wellness.",
          ],
          middleBottomDescription:
            "At Vitu Realty, we understand that building sustainably is not just about constructing buildings—it’s about building a better tomorrow. By embracing sustainable practices, we are helping to shape a world where both the environment and its inhabitants thrive in harmony. As we move forward, we remain dedicated to creating properties that are as kind to the planet as they are to those who inhabit them. Together, we can build the foundations for a more sustainable future—one project at a time.",
          bottomTitle: "The Core Principles of Sustainable Building",
          bottomDescription: "At Vitu Realty, our commitment to sustainability begins with a holistic approach to development. Our building practices integrate:",
        },
      ],
    },
    {
      title: "Location Advantage",
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
          title: "Foundations for the Future",
          subtitle: "Building Sustainably for a Better Tomorrow",
          image: "/images/locationAdvantagesImages/9.webp",
          description:
            "At Vitu Realty, we believe that the future of real estate lies not only in the structures we create but in the positive impact they have on the environment and the communities they serve. Sustainability is more than just a buzzword—it’s a guiding principle that informs every aspect of our building practices. As we move into the future, it is our responsibility to ensure that the properties we develop and the spaces we design are both environmentally friendly and future-ready.",
          middleTitle: "Why Sustainable Building Matters",
          middleDescription:
            "Sustainable building practices are essential for reducing our carbon footprint, conserving natural resources, and creating healthier living environments. By prioritizing sustainability, we can help mitigate the effects of climate change and promote a more balanced relationship between urban development and nature.",
          bottomPoints: [
            "Energy Efficiency: From the design phase to construction, we prioritize energy-efficient systems and materials. This includes maximizing natural light, installing high-efficiency HVAC systems, and incorporating renewable energy sources like solar panels.",
            "Water Conservation: Our properties are designed with water-saving technologies that minimize waste and optimize usage, contributing to lower utility bills and environmental preservation.",
            "Waste Reduction: During construction, we implement strategies to reduce, reuse, and recycle waste. This ensures that less material ends up in landfills, contributing to a more sustainable building process.",
            "Indoor Environmental Quality: Sustainability also means improving the health and well-being of occupants. We use low-VOC paints, efficient air filtration systems, and ensure proper ventilation to create spaces that promote clean air and overall wellness.",
          ],
          middleBottomDescription:
            "At Vitu Realty, we understand that building sustainably is not just about constructing buildings—it’s about building a better tomorrow. By embracing sustainable practices, we are helping to shape a world where both the environment and its inhabitants thrive in harmony. As we move forward, we remain dedicated to creating properties that are as kind to the planet as they are to those who inhabit them. Together, we can build the foundations for a more sustainable future—one project at a time.",
          bottomTitle: "The Core Principles of Sustainable Building",
          bottomDescription: "At Vitu Realty, our commitment to sustainability begins with a holistic approach to development. Our building practices integrate:",
        },
      ],
    },
    {
      title: "Location Advantage",
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
          title: "Foundations for the Future",
          subtitle: "Building Sustainably for a Better Tomorrow",
          image: "/images/locationAdvantagesImages/10.webp",
          description:
            "At Vitu Realty, we believe that the future of real estate lies not only in the structures we create but in the positive impact they have on the environment and the communities they serve. Sustainability is more than just a buzzword—it’s a guiding principle that informs every aspect of our building practices. As we move into the future, it is our responsibility to ensure that the properties we develop and the spaces we design are both environmentally friendly and future-ready.",
          middleTitle: "Why Sustainable Building Matters",
          middleDescription:
            "Sustainable building practices are essential for reducing our carbon footprint, conserving natural resources, and creating healthier living environments. By prioritizing sustainability, we can help mitigate the effects of climate change and promote a more balanced relationship between urban development and nature.",
          bottomPoints: [
            "Energy Efficiency: From the design phase to construction, we prioritize energy-efficient systems and materials. This includes maximizing natural light, installing high-efficiency HVAC systems, and incorporating renewable energy sources like solar panels.",
            "Water Conservation: Our properties are designed with water-saving technologies that minimize waste and optimize usage, contributing to lower utility bills and environmental preservation.",
            "Waste Reduction: During construction, we implement strategies to reduce, reuse, and recycle waste. This ensures that less material ends up in landfills, contributing to a more sustainable building process.",
            "Indoor Environmental Quality: Sustainability also means improving the health and well-being of occupants. We use low-VOC paints, efficient air filtration systems, and ensure proper ventilation to create spaces that promote clean air and overall wellness.",
          ],
          middleBottomDescription:
            "At Vitu Realty, we understand that building sustainably is not just about constructing buildings—it’s about building a better tomorrow. By embracing sustainable practices, we are helping to shape a world where both the environment and its inhabitants thrive in harmony. As we move forward, we remain dedicated to creating properties that are as kind to the planet as they are to those who inhabit them. Together, we can build the foundations for a more sustainable future—one project at a time.",
          bottomTitle: "The Core Principles of Sustainable Building",
          bottomDescription: "At Vitu Realty, our commitment to sustainability begins with a holistic approach to development. Our building practices integrate:",
        },
      ],
    },
  ];

  const handleDotClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index); // Use slideToLoop for looped Swiper
      setActiveIndex(index); // Update activeIndex manually
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
        speed={1000}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Use realIndex for looped Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                  <span className={`${item.buttonTextColor} font-freightNeoMedium relative z-20 mt-[3px] md:mt-0 `}>More About the Location</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute w-36 !rounded-[300px] bottom-[90] left-32 z-20">
        <CarouselDots
          total={data.length}
          active={activeIndex}
          onDotClick={handleDotClick}
          className={data[activeIndex]?.carousalClassName}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 h-screen z-50 overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent
          >
            <motion.div
              variants={backdropVariants}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
              onClick={closeCard}
            />
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
                <h1 className="border-t-2 pt-9 text-[10px] md:text-[12px] font-FreightNeoProNormal text-[#8E8E93] border-t-gray-200">
                  NextUp
                </h1>
                <div className="flex justify-between">
                  <button
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