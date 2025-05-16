"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Chromotherapy, Groundwater, RainWater, Solar, Tree } from "@/components/Icons/Icons";

interface CurrentProjectCardProps {
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
  mapImage?: string;
  label?: string;
}

interface CardContentProps {
  data: CurrentProjectCardProps;
  setCurrentIndex: (index: number) => void;
  currentIndex: number;
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

const CardContent = ({ data, setCurrentIndex, currentIndex }: CardContentProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    setCurrentIndex(index); // Update the parent modal's currentIndex
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-64 lg:h-[80vh] xl:h-[70vh] rounded-t-xl overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[100%_center]"
          priority
        />
      </div>
      <div className="flex flex-col gap-4 py-12 px-6 lg:px-20">
        <h2 className="text-[40px] lg:text-[48px] leading-[1.3] font-semibold max-w-3xl font-geistSerif text-[#0C3E49]">{data.title}</h2>
        <p className="text-[#040707]/60 font-sourceSans3 !text-xl">{data.description}</p>
        <div className="md:m-12">
          <h2 className="font-bold text-[#04070799] text-[24px] font-sourceSans3 pb-6">See Our Sustainable Practices at work</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="text-start">
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Chromotherapy />, label: "Chromotherapy Park" },
                  { icon: <Tree />, label: "Tree Cover" },
                  { icon: <Groundwater />, label: "Groundwater Recharge Pits" },
                  { icon: <RainWater />, label: "Rainwater Harvesting Tank" },
                  { icon: <Solar />, label: "Solar-powered Streetlights" },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={`flex lg:w-[70%] rounded-2xl py-3 px-5 text-[20px] font-sourceSans3 items-center h-16 gap-4 ${
                      currentIndex === index ? "bg-[#0C3E491A]" : ""
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={currentIndex === index ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="truncate text-[#04070799]">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-start mt-10">
              <Image src={data.mapImage ?? "/images/placeholder.png"} alt="" width={1000} height={1000} />
            </div>
          </div>
        </div>
        <p className="text-[#040707]/60 mt-10 font-sourceSans3 !text-xl">
          Enjoy the quiet luxury of living in harmony with nature, where rainwater harvesting, open green spaces, & mindful infrastructure make every
          choice a conscious one. It’s comfort without compromise—where doing good feels as natural as living well.
        </p>
        <p className="text-[#040707]/60 font-sourceSans3 !text-xl">Welcome to a community that cares. For today, & for generations to come.</p>
      </div>
    </div>
  );
};

interface ContactFormModalProps {
  modalIsOpen: boolean;
  onClose: (isModalOpen: boolean) => void;
  className?: string;
  maxWidth?: string;
}

const CurrentProjectCard: React.FC<ContactFormModalProps> = ({ modalIsOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const data: CurrentProjectCardProps[] = [
    {
      image: "/images/vilasamPageImages/locationAdvantageImages/7.webp",
      title: "A Greener Way to Live",
      description:
        "At VITU Vilasam, sustainability isn’t an afterthought—it’s a way of life. From eco-conscious planning to green landscapes that breathe, every detail is designed to create a home that’s kind to both you & the environment.",
      middleDescription:
        "Here, serene living isn’t just a promise. It's woven into the very fabric of the community. With minimal noise, low density and plenty of space to breathe, Vilasam becomes a personal retreat where you can slow down, reconnect, and truly live at your own pace.",
      mapImage: "/images/currentProjectCardImages/1.png",
      label: "Chromotherapy Park",
    },
    {
      image: "/images/vilasamPageImages/locationAdvantageImages/7.webp",
      title: "A Greener Way to Live",
      description:
        "At VITU Vilasam, sustainability isn’t an afterthought—it’s a way of life. From eco-conscious planning to green landscapes that breathe, every detail is designed to create a home that’s kind to both you & the environment.",
      middleDescription:
        "Here, serene living isn’t just a promise. It's woven into the very fabric of the community. With minimal noise, low density and plenty of space to breathe, Vilasam becomes a personal retreat where you can slow down, reconnect, and truly live at your own pace.",
      mapImage: "/images/currentProjectCardImages/2.png",
      label: "Tree Cover",
    },
    {
      image: "/images/vilasamPageImages/locationAdvantageImages/7.webp",
      title: "A Greener Way to Live",
      description:
        "At VITU Vilasam, sustainability isn’t an afterthought—it’s a way of life. From eco-conscious planning to green landscapes that breathe, every detail is designed to create a home that’s kind to both you & the environment.",
      middleDescription:
        "Whether you're building your first home or adding to your portfolio, Vilasam offers clarity, confidence, and returns. Backed by meticulous planning, thoughtful design, and a location that’s on the rise, it’s an opportunity to own land that appreciates both in value and in meaning.",
      mapImage: "/images/currentProjectCardImages/3.png",
      label: "Groundwater Recharge Pits",
    },
    {
      image: "/images/vilasamPageImages/locationAdvantageImages/7.webp",
      title: "A Greener Way to Live",
      description:
        "At VITU Vilasam, sustainability isn’t an afterthought—it’s a way of life. From eco-conscious planning to green landscapes that breathe, every detail is designed to create a home that’s kind to both you & the environment.",
      middleDescription:
        "Living sustainably at Vilasam doesn’t mean sacrificing comfort. Instead, it means being part of a thoughtful ecosystem where natural resources are valued and preserved. It’s a choice to live smarter, greener and more responsibly where every action today contributes to a better tomorrow for you and the generations to come.",
      mapImage: "/images/currentProjectCardImages/4.png",
      label: "Rainwater Harvesting Tank",
    },
    {
      image: "/images/vilasamPageImages/locationAdvantageImages/7.webp",
      title: "A Greener Way to Live",
      description:
        "At VITU Vilasam, sustainability isn’t an afterthought—it’s a way of life. From eco-conscious planning to green landscapes that breathe, every detail is designed to create a home that’s kind to both you & the environment.",
      middleDescription:
        "Whether it’s seamless utility connections, well-lit streets, or organized community spaces, the infrastructure supports a high standard of living in every aspect. It's an environment where contemporary living meets dependable design ensuring that life at Vilasam is both beautiful and built to last.",
      mapImage: "/images/currentProjectCardImages/5.png",
      label: "Solar-powered Streetlights",
    },
  ];

  const closeModal = () => {
    onClose(false);
  };

  const goToNextCard = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <motion.div className="fixed inset-0 h-screen z-50 overflow-auto" initial="hidden" animate="visible" exit="exit" data-lenis-prevent>
          <motion.div variants={backdropVariants} className="backdrop-blur-lg h-full w-full fixed inset-0" onClick={closeModal} />
          <motion.div
            variants={cardVariants}
            ref={containerRef}
            className="max-w-6xl mx-auto bg-[#f8f6f5] h-fit z-[60] my-10 rounded-3xl font-sans relative shadow-2xl"
          >
            <motion.button
              variants={contentVariants}
              className="absolute top-6 z-50 me-4 lg:me-8 h-8 w-8 right-0 cursor-pointer ml-auto bg-white rounded-full flex items-center justify-center"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconX className="h-6 w-6 text-[#7a6d3c]" />
            </motion.button>
            <motion.div variants={contentVariants}>
              <CardContent data={data[currentIndex]} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
            </motion.div>
            <motion.div variants={contentVariants}>
              <hr className="border-t-gray-200 border-[1px]" />
              <div className="lg:px-44 px-12">
                <h1 className="pt-10 text-[10px] md:text-[12px] font-geistSerif text-[#8E8E93] border-t-gray-200">NextUp</h1>
                <div className="flex pb-16 justify-between">
                  <button
                    onClick={goToNextCard}
                    className="text-[#1D1D1F] flex font-geistSerif justify-between items-center cursor-pointer font-bold text-[18px]"
                  >
                    {data[(currentIndex + 1) % data.length].title}
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
  );
};

export default CurrentProjectCard;
