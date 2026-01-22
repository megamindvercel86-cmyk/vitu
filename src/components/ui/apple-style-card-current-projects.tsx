"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { Chromotherapy, Groundwater, RainWater, Solar, Tree } from "@/components/Icons/Icons";
import { useSafeSpecialCharacters } from "@/hooks/useSafeSpecialCharacters";
import modalImg from '../../../public/images/vilasamPageImages/broucherImages/8.webp'

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
      <div className="relative w-full h-64 lg:h-[60vh] xl:h-[70vh] rounded-t-xl overflow-hidden">
        <Image
          src={modalImg}
          alt={data.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[100%_center]"
          priority
        />
      </div>
      <div className="flex flex-col gap-4 py-12 px-6 lg:px-20">
        <h2 className="text-[#0C3E49] text-[24px] lg:text-[48px] font-theSeasons leading-[1.3] font-semibold max-w-3xl ">{data.title}</h2>
        <p className="text-[#0C3E4999] font-ttcommons text-sm md:!text-xl">{useSafeSpecialCharacters(data.description)}</p>
        <p className="text-[#0C3E4999] font-ttcommons text-sm md:!text-xl ">
          As part of a holistic living concept, they also provide a distinctive value proposition seeking to blend luxury with health<span className="font-sans">-</span>conscious design.

        </p>
        {data.bottomPoints && (
          <ul className="space-y-2 mt-4" aria-label="List of key points">
            {data.bottomPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                {point.startsWith("•") ? (
                  <p className="text-[#0C3E4999] text-base font-ttcommons lg:text-lg pl-4">{useSafeSpecialCharacters(point)}</p>
                ) : (
                  <p className="text-[#0C3E4999] text-base font-ttcommons lg:text-lg font-semibold">{useSafeSpecialCharacters(point)}</p>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="md:m-12">
          <h2 className="font-bold text-[#0C3E49] md:text-[24px] font-theSeasons pb-6 text-[18px]">See Our Sustainable Practices at work</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="text-start">
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Chromotherapy />, label: "Chromotherapy Park" },
                  { icon: <Tree />, label: "Tree Cover" },
                  { icon: <Groundwater />, label: "Groundwater Recharge Pits" },
                  // { icon: <RainWater />, label: "Rainwater Harvesting Tank" },
                  { icon: <Solar />, label: "Solar-powered Streetlights" },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={`flex lg:w-[80%]  rounded-2xl py-3 px-5 text-[20px] font-theSeasons items-center h-16 gap-4 ${currentIndex === index ? "bg-[#0C3E491A]" : ""
                      }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={currentIndex === index ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className=" text-left text-[#0C3E4999]">{useSafeSpecialCharacters(item.label)}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-start mt-2">
              <Image src={data.mapImage ?? "/images/placeholder.png"} alt="" width={1000} height={1000} />
            </div>
          </div>
        </div>


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
      image: "/images/vilasamPageImages/broucherImages/8.jpeg",
      title: "Chromotheraphy Garden",
      description:
        "A chromotherapy garden, also known as a color therapy garden, is a thoughtfully designed space that uses the healing properties of colors found in plants, flowers, lighting, and natural surroundings. Based on the principle that different colors influence different energy centers in the body, this garden creates a serene, sensory-rich environment that enhances emotional, mental, and physical well-being. Increasingly embraced by wellness resorts, gated communities, and real estate developments, chromotherapy gardens offer a unique blend of nature and therapy.",
      middleDescription:
        "As part of a holistic living concept, they also provide a distinctive value proposition seeking to blend luxury with health-conscious design.",
      bottomPoints: [
        "Emotional & Mental Wellness:",
        "• Green: Balance & Calm",
        "• Blue: Tranquility & Rest",
        "• Yellow: Optimism & Creativity",
        "• Red/Orange: Vitality & Motivation",
        "• Purple: Spiritual Focus & Mindfulness",
        "",
        "Therapeutic Use:",
        "• Aids recovery from stress, fatigue and burnout",
        "• Complements yoga, meditation and wellness programs",
        "",
        "Nature-Connected Living:",
        "• Inspires mindful outdoor routines",
        "• Enhances lifestyle with color-coded sensory pathways"
      ],
      mapImage: "/images/currentProjectCardImages/2.png",
      label: "Chromotherapy Park",
    },
    {
      image: "/images/vilasamPageImages/broucherImages/3.webp",
      title: "Chromotheraphy Garden",
      description:
        "A chromotherapy garden, also known as a color therapy garden, is a thoughtfully designed space that uses the healing properties of colors found in plants, flowers, lighting, and natural surroundings. Based on the principle that different colors influence different energy centers in the body, this garden creates a serene, sensory-rich environment that enhances emotional, mental, and physical well-being. Increasingly embraced by wellness resorts, gated communities, and real estate developments, chromotherapy gardens offer a unique blend of nature and therapy.",
      middleDescription:
        "As part of a holistic living concept, they also provide a distinctive value proposition seeking to blend luxury with health-conscious design.",
      bottomPoints: [
        "Emotional & Mental Wellness:",
        "• Green: Balance & Calm",
        "• Blue: Tranquility & Rest",
        "• Yellow: Optimism & Creativity",
        "• Red/Orange: Vitality & Motivation",
        "• Purple: Spiritual Focus & Mindfulness",
        "",
        "Therapeutic Use:",
        "• Aids recovery from stress, fatigue and burnout",
        "• Complements yoga, meditation and wellness programs",
        "",
        "Nature-Connected Living:",
        "• Inspires mindful outdoor routines",
        "• Enhances lifestyle with color-coded sensory pathways"
      ],
      mapImage: "/images/currentProjectCardImages/3.png",
      label: "Tree Cover",
    },
    {
      image: "/images/vilasamPageImages/locationAdvantageImages/3.webp",
      title: "Chromotheraphy Garden",
      description:
        "A chromotherapy garden, also known as a color therapy garden, is a thoughtfully designed space that uses the healing properties of colors found in plants, flowers, lighting, and natural surroundings. Based on the principle that different colors influence different energy centers in the body, this garden creates a serene, sensory-rich environment that enhances emotional, mental, and physical well-being. Increasingly embraced by wellness resorts, gated communities, and real estate developments, chromotherapy gardens offer a unique blend of nature and therapy.",
      middleDescription:
        "As part of a holistic living concept, they also provide a distinctive value proposition seeking to blend luxury with health-conscious design.",
      bottomPoints: [
        "Emotional & Mental Wellness:",
        "• Green: Balance & Calm",
        "• Blue: Tranquility & Rest",
        "• Yellow: Optimism & Creativity",
        "• Red/Orange: Vitality & Motivation",
        "• Purple: Spiritual Focus & Mindfulness",
        "",
        "Therapeutic Use:",
        "• Aids recovery from stress, fatigue and burnout",
        "• Complements yoga, meditation and wellness programs",
        "",
        "Nature-Connected Living:",
        "• Inspires mindful outdoor routines",
        "• Enhances lifestyle with color-coded sensory pathways"
      ],
      mapImage: "/images/currentProjectCardImages/7.png",
      label: "Groundwater Recharge Pits",
    },
    {
      image: "/images/vilasamPageImages/locationAdvantageImages/3.webp",
      title: "Chromotheraphy Garden",
      description:
        "A chromotherapy garden, also known as a color therapy garden, is a thoughtfully designed space that uses the healing properties of colors found in plants, flowers, lighting, and natural surroundings. Based on the principle that different colors influence different energy centers in the body, this garden creates a serene, sensory-rich environment that enhances emotional, mental, and physical well-being. Increasingly embraced by wellness resorts, gated communities, and real estate developments, chromotherapy gardens offer a unique blend of nature and therapy.",
      middleDescription:
        "As part of a holistic living concept, they also provide a distinctive value proposition seeking to blend luxury with health-conscious design.",
      bottomPoints: [
        "Emotional & Mental Wellness:",
        "• Green: Balance & Calm",
        "• Blue: Tranquility & Rest",
        "• Yellow: Optimism & Creativity",
        "• Red/Orange: Vitality & Motivation",
        "• Purple: Spiritual Focus & Mindfulness",
        "",
        "Therapeutic Use:",
        "• Aids recovery from stress, fatigue and burnout",
        "• Complements yoga, meditation and wellness programs",
        "",
        "Nature-Connected Living:",
        "• Inspires mindful outdoor routines",
        "• Enhances lifestyle with color-coded sensory pathways"
      ],
      mapImage: "/images/currentProjectCardImages/4.png",
      label: "Rainwater Harvesting Tank",
    },
    {
      image: "/images/vilasamPageImages/broucherImages/7.webp",
      title: "Chromotheraphy Garden",
      description:
        "A chromotherapy garden, also known as a color therapy garden, is a thoughtfully designed space that uses the healing properties of colors found in plants, flowers, lighting, and natural surroundings. Based on the principle that different colors influence different energy centers in the body, this garden creates a serene, sensory-rich environment that enhances emotional, mental, and physical well-being. Increasingly embraced by wellness resorts, gated communities, and real estate developments, chromotherapy gardens offer a unique blend of nature and therapy.",
      middleDescription:
        "As part of a holistic living concept, they also provide a distinctive value proposition seeking to blend luxury with health-conscious design.",
      bottomPoints: [
        "Emotional & Mental Wellness:",
        "• Green: Balance & Calm",
        "• Blue: Tranquility & Rest",
        "• Yellow: Optimism & Creativity",
        "• Red/Orange: Vitality & Motivation",
        "• Purple: Spiritual Focus & Mindfulness",
        "",
        "Therapeutic Use:",
        "• Aids recovery from stress, fatigue and burnout",
        "• Complements yoga, meditation and wellness programs",
        "",
        "Nature-Connected Living:",
        "• Inspires mindful outdoor routines",
        "• Enhances lifestyle with color-coded sensory pathways"
      ],
      mapImage: "/images/currentProjectCardImages/4.png",
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
        <motion.div style={{ zIndex: 2147483648 }} className="fixed inset-0 h-screen z-50 overflow-auto" initial="hidden" animate="visible" exit="exit" data-lenis-prevent>
          <motion.div variants={backdropVariants} className="backdrop-blur-lg h-full w-full fixed inset-0" onClick={closeModal} />
          <motion.div
            variants={cardVariants}
            ref={containerRef}
            className="max-w-4xl mx-auto bg-[#f8f6f5] h-fit z-[60] md:my-10 rounded-3xl font-ttcommons relative shadow-2xl"
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
            {/* <motion.div variants={contentVariants}>
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
            </motion.div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CurrentProjectCard;
