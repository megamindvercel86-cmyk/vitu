"use client";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
import { motion, useInView } from "framer-motion";
import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";
import CurrentProjectCard from "@/components/ui/apple-style-card-current-projects";
import { useSafeSpecialCharacters } from "@/hooks/useSafeSpecialCharacters";

// ============= Interfaces =============

interface Stat {
  value: string;
  label: string;
}

interface Location {
  id: number;
  name: string;
  position: string;
  imagePath: string;
  description: Stat[];
}

// ============= Constants =============
const PROJECT_DATA = {
  title: "Explore your Future Home",
  badge: "Limited Plots Available",
  description: {
    suffix:
      "Where comfort meets affordability, and thoughtful design creates a sense of home. Vilasam blends refined living with everyday functionality—elegant spaces built to inspire joy, connection, & a lasting sense of belonging.",
  },
  cta: "Explore the Project Now",
  image: "/images/vilasamCurrentProject/newFirst.png",
};

const STATS_DATA = [
  {
    value: "50+ Lush Tree Cover",
    label: "Spanning the Community",
  },
  // {
  //   value: "3,400+ sq.m.",
  //   label: "Parks & Open Spaces",
  // },
];

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Section 1",
    position: "lg:left-[32%]  lg:top-[40%] left-[30%] top-[41%] md:left-[33%] md:top-[43%]  lg:w-[65px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new21.webp",
    description: [
      { value: "East Facing Plots", label: "4.00 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 2,
    name: "Section 2",
    position: "left-[28%] top-[50%] lg:left-[32%] lg:top-[50%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new22.webp",
    description: [
      { value: "East Facing Plots", label: "4.20 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 3,
    name: "Section 3",
    position: "left-[28%] top-[58%] md:left-[33%] md:top-[60%] lg:left-[31%] lg:top-[59%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new23.webp",
    description: [
      { value: "East Facing Plots", label: "4.80 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 4,
    name: "Section 4",
    position: "left-[25%] top-[66%] md:left-[31%] md:top-[69%] lg:left-[27%] lg:top-[70%]  lg:w-24  lg:h-[58px]",
    imagePath: "/images/vilasamCurrentProject/new24.webp",
    description: [
      { value: "East Facing Plots", label: "6.60 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 5,
    name: "Section 5",
    position: "left-[25%] top-[74%] lg:left-[23%] lg:top-[78%] md:left-[25%] md:top-[77%] md:w-[100px]  md:h-[50px] lg:w-[130px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new25.webp",
    description: [
      { value: "Corner Plots", label: "7.80 Cents" },
      {
        value: "",
        label:
          "Offering extra space, dual access, and a premium sense of privacy, corner plots are prized for their flexibility and openness. Whether you dream of a spacious layout or wish to design with more natural ventilation and light, these plots offer a distinctive edge in both function and prestige.",
      },
    ],
  },
  {
    id: 6,
    name: "Section 6",
    position: "left-[40%] top-[75%] lg:left-[41%] lg:top-[79%] md:left-[44%] md:top-[78%] lg:w-[70px] lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new14.webp",
    description: [
      { value: "Corner Plots", label: "4.00 Cents" },
      {
        value: "",
        label:
          "Offering extra space, dual access, and a premium sense of privacy, corner plots are prized for their flexibility and openness. Whether you dream of a spacious layout or wish to design with more natural ventilation and light, these plots offer a distinctive edge in both function and prestige.",
      },
    ],
  },
  {
    id: 7,
    name: "Section 7",
    position: "left-[40%] top-[66%] md:left-[44%] md:top-[70%] lg:left-[41%] lg:top-[69%]  lg:w-[70px]  lg:h-[68px]",
    imagePath: "/images/vilasamCurrentProject/new15.webp",
    description: [
      { value: "West Facing Plots", label: "4.00 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 8,
    name: "Section 8",
    position: "left-[40%] top-[58%] md:left-[44%] md:top-[60%] lg:left-[41%] lg:top-[59%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new16.webp",
    description: [
      { value: "West Facing Plots", label: "4.00 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 9,
    name: "Section 9",
    position: "left-[40%] top-[50%] lg:left-[41%] lg:top-[50%]   lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/vilasamCurrentProject/new17.webp",
    description: [
      { value: "West Facing Plots", label: "4.00 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 10,
    name: "Section 10",
    position: "left-[40%] top-[40%] lg:left-[41%] lg:top-[36%]  lg:w-[65px]  lg:h-[88px]",
    imagePath: "/images/vilasamCurrentProject/new18.webp",
    description: [
      { value: "West Facing Plots", label: "5.45 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 11,
    name: "Section 11",
    position: "left-[41%] top-[30%] md:left-[44%] md:top-[27%] lg:left-[40%] lg:top-[23%]  lg:w-[70px]  lg:h-[78px]",
    imagePath: "/images/vilasamCurrentProject/new19.webp",
    description: [
      { value: "West Facing Plots", label: "5.00 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 12,
    name: "Section 12",
    position: "left-[90%] top-[27%] lg:left-[70%] md:top-[17%] lg:top-[11%]  lg:w-[60px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new05.png",
    description: [
      { value: "East Facing Plots", label: "6.57 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 13,
    name: "Section 13",
    position: "left-[83%] top-[35%] md:left-[85%] md:top-[29%] lg:left-[82%] lg:top-[23%]  lg:w-10  lg:h-16",
    imagePath: "/images/vilasamCurrentProject/new04.webp",
    description: [
      { value: "Tech Hub", label: "Co-working Spaces" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 14,
    name: "Section 14",
    position: "left-[71%] top-[53%] lg:left-[67%] lg:top-[53%]  lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/vilasamCurrentProject/new02.png",
    description: [
      { value: "Corner Plots", label: "3.65 Cents" },
      {
        value: "",
        label:
          "Offering extra space, dual access, and a premium sense of privacy, corner plots are prized for their flexibility and openness. Whether you dream of a spacious layout or wish to design with more natural ventilation and light, these plots offer a distinctive edge in both function and prestige.",
      },
    ],
  },
  {
    id: 15,
    name: "Section 15",
    position: "left-[70%] top-[46%] lg:left-[67%] lg:top-[45%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/vilasamCurrentProject/new03.webp",
    description: [
      { value: "West Facing Plots", label: "3.90 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 16,
    name: "Section 16",
    position: "left-[70%] top-[38%]  md:top-[39%]  lg:left-[67%] lg:top-[34%] lg:w-[70px]  lg:h-[74px]",
    imagePath: "/images/vilasamCurrentProject/new04.webp",
    description: [
      { value: "West Facing Plots", label: "4.50 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 17,
    name: "Section 17",
    position: "left-[70%] top-[27%] md:left-[71%] md:top-[30%] lg:left-[67%] lg:top-[23%]  lg:w-[70px]  lg:h-[78px]",
    imagePath: "/images/vilasamCurrentProject/new05.webp",
    description: [
      { value: "West Facing Plots", label: "5.00 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 18,
    name: "Section 18",
    position: "left-[70%] top-[20%] md:left-[70%] md:top-[15%] lg:left-[67%] lg:top-[10%]  lg:w-[70px]  lg:h-[84px]",
    imagePath: "/images/vilasamCurrentProject/new06.webp",
    description: [
      { value: "West Facing Plots", label: "5.80 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 19,
    name: "Section 19",
    position: "left-[59%] top-[12%] md:left-[60%] md:top-[10%] lg:left-[57%] lg:top-[11%]  lg:w-[70px]  lg:h-[54px]",
    imagePath: "/images/vilasamCurrentProject/new08.webp",
    description: [
      { value: "East Facing Plots", label: "3.35 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 20,
    name: "Section 20",
    position: "left-[59%] top-[20%] md:left-[59%] md:top-[20%]  lg:left-[57%] lg:top-[18%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new09.webp",
    description: [
      { value: "East Facing Plots", label: "4.50 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 21,
    name: "Section 21",
    position: "left-[59%]  top-[30%] md:left-[59%]  md:top-[29%] lg:left-[57%]  lg:top-[25%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new10.webp",
    description: [
      { value: "East Facing Plots", label: "4.50 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 22,
    name: "Section 22",
    position: "left-[59%] top-[37%] lg:left-[57%] md:top-[39%] lg:top-[35%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProject/new11.webp",
    description: [
      { value: "East Facing Plots", label: "4.50 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 23,
    name: "Section 23",
    position: "left-[62%] top-[72%] lg:left-[58%] lg:top-[76%] md:left-[60%] md:top-[75%] md:w-[70px]  md:h-[50px]  lg:w-[100px]  lg:h-[80px]",
    imagePath: "/images/vilasamCurrentProject/new01.webp",
    description: [
      { value: "Corner Plots", label: "7.60 Cents" },
      {
        value: "",
        label:
          "Offering extra space, dual access, and a premium sense of privacy, corner plots are prized for their flexibility and openness. Whether you dream of a spacious layout or wish to design with more natural ventilation and light, these plots offer a distinctive edge in both function and prestige.",
      },
    ],
  },
  {
    id: 24,
    name: "Section 24",
    position: "left-[59%] top-[45%] lg:left-[57%] lg:top-[45%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/vilasamCurrentProject/new12.webp",
    description: [
      { value: "East Facing Plots", label: "3.60 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 25,
    name: "Section 25",
    position: "lg:left-[33%] lg:top-[23%] left-[30%] top-[31%] md:left-[34%] md:top-[30%]   lg:w-[55px]  lg:h-[100px]",
    imagePath: "/images/vilasamCurrentProject/new20.webp",
    description: [
      { value: "East Facing Plots", label: "5.40 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 26,
    name: "Section 26",
    position: "left-[59%] top-[53%] lg:left-[57%] lg:top-[53%]    lg:w-[70px]  lg:h-[55px]",
    imagePath: "/images/vilasamCurrentProject/new13.webp",
    description: [
      { value: "Corner Plots", label: "3.55 Cents" },
      {
        value: "",
        label:
          "Offering extra space, dual access, and a premium sense of privacy, corner plots are prized for their flexibility and openness. Whether you dream of a spacious layout or wish to design with more natural ventilation and light, these plots offer a distinctive edge in both function and prestige.",
      },
    ],
  },
];

// ============= Components =============
const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(value - 5);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      let start = value - 5;
      const end = value;
      const duration = 2000;
      const incrementTime = 50;
      const steps = duration / incrementTime;
      const stepSize = Math.ceil((end - start) / steps);

      const timer = setInterval(() => {
        start += stepSize;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="inline-block">
      {count.toLocaleString()}
    </motion.span>
  );
};

/**
 * Current Project Component
 * Displays information about the current featured project with an interactive map
 *
 * Features:
 * 1. Project details with badge
 * 2. Interactive project map with clickable areas
 * 3. Key statistics
 * 4. Responsive CTA button
 *
 * Layout:
 * - Desktop: Two-column layout with stats
 * - Mobile: Single column with bottom CTA
 *
 * @component
 */
const CurrentProjectTwo: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    id: 0,
    name: "Project Overview",
    position: "left-[50%] top-[60%]",
    imagePath: PROJECT_DATA.image,
    description: STATS_DATA,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleMouseLeave = () => {
    setSelectedLocation({
      id: 0,
      name: "Project Overview",
      position: "left-[50%] top-[60%]",
      imagePath: PROJECT_DATA.image,
      description: STATS_DATA,
    });
  };

  // Debug click events
  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  // ============= Render Helpers =============
  const renderStats = () => (
    <motion.div
      key={selectedLocation.id}
      className="hidden lg:flex  flex-col mt-5" // min-h-[400px]
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-label="Project Statistics"
    >
      <div className="flex-grow">
        {selectedLocation.description === STATS_DATA
          ? selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1] md:space-y-3 ${index !== 0 ? "lg:my-10" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-theSeasons text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[4rem] text-[#503637]"
                >
                  <span className="font-CandideCondensedNormal">
                    <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                  </span>
                  <span className="font-CandideCondensedNormal">{stat.value.replace(/[0-9a-zA-Z\s]/g, "")}</span>
                  <span>{stat.value.replace(/[^a-zA-Z\s]/g, "")}</span>
                </Typography>
                <Typography
                  variant="custom"
                  className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px] md:text-lg text-sm text-[#4F373799] font-ttCommons "
                >
                  {stat.label}
                </Typography>
              </motion.div>
            ))
          : selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "lg:my-3" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-theSeasons text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[4rem] text-[#503637]"
                >
                  {useSafeSpecialCharacters(stat.value)}
                </Typography>
                <Typography
                  variant="custom"
                  className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px] md:text-lg text-sm text-[#4F373799] font-ttCommons mt-1"
                >
                  {useSafeSpecialCharacters(stat.label)}
                </Typography>
              </motion.div>
            ))}
      </div>
      <div className="relative group cursor-pointer w-fit mt-auto">
        <button
          aria-label="Learn more about our sustainability approach"
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="
                      relative group
                      flex items-center justify-center
                      gap-[0.6875rem]
                      rounded-full
                      pl-[8px] pr-[1.2rem] py-[0.4rem]
                      text-base font-theSeasons text-white
                      2xl:py-3 2xl:pr-8 2xl:text-[1.25rem]
                      overflow-hidden z-100 mt-6
                    "
        >
          <div className={`absolute inset-0 bg-[#AE856633] rounded-full`}></div>
          <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
            <div
              className={`
                          absolute w-0 h-0 rounded-full
                          group-hover:w-[47rem] group-hover:h-[30rem]
                          transition-all duration-500 ease-out
                        `}
            ></div>
            <div className="relative z-20">
              <CTAButtonIcon fill="#4F3737" direction="right" />
            </div>
          </div>
          <span className={`relative z-20 text-[#503637] mt-[2px] font-ttCommons whitespace-nowrap`}>
            More about our sustainability centric approach
          </span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <section
      className="flex flex-col sm:flex-col lg:max-h-screen lg:flex-row w-full relative pl-[1rem] sm:pl-[1rem] md:pl-[4.125rem] lg:pl-[3.5rem] xl:pl-[9rem] pr-[1rem] sm:pr-[1rem] md:pr-[4.125rem] lg:pr-0"
      aria-labelledby="project-title"
    >
      {/* Left Column - Project Details */}
      <article className="w-full lg:w-[45%] lg2:py-20 xl:py-24 2xl:py-32 flex flex-col lg:justify-start md:h-[105vh] lg:h-[110vh]">
        <div className="lg2:mb-6  ">
          <header className="md:pb-6 pb-4">
            <h1 className="w-full hidden lg:block text-2xl lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[5.5rem] font-theSeasons leading-[1.1] text-[#503637]">
              Explore your <br /> Future Home
            </h1>
            <h1 className="lg:hidden !font-medium md:w-full text-2xl md:text-[2.5rem] font-theSeasons leading-[1.2] text-[#503637]">
              Explore your Future Home
            </h1>
          </header>

          <div className="flex items-center mt-2">
            <Typography
              variant="custom"
              className="font-ttcommons md:max-w-[90%] xl:max-w-[480px] 2xl:max-w-[700px] text-base md:text-lg lg:text-[1.1rem] 2xl:text-[1.5rem] leading-[1.6] text-[#503637]/70  md:mb-0 mb-5"
            >
              Where comfort meets affordability, and thoughtful design creates a sense of home. Vilasam blends refined living with everyday
              functionality—elegant spaces built to inspire joy, connection, <span className="font-CandideCondensedNormal">&</span> a lasting sense of
              belonging.
            </Typography>
          </div>
        </div>

        {renderStats()}
      </article>

      {/* Right Column - Interactive Project Map (Desktop) */}
      <figure
        className="lg:flex ml-auto items-center min-h-[500px] lg:h-auto justify-end w-full lg:w-[55%] relative"
        aria-labelledby="project-title"
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full min-h-[500px] lg:min-h-[700px]">
          <Image fill src={selectedLocation.imagePath} alt="Project Map" className="w-full h-full object-cover " priority />

          {/* Compass SVG */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20">
            <Image src="/svgs/compass.svg" alt="Compass" width={80} height={80} className="w-full h-full object-contain" />
          </div>

          <div className="absolute inset-0 z-10">
            ``
            {LOCATIONS.map((location) => (
              <button
                key={location.id}
                className={`absolute w-6 h-6 md:h-10 md:w-10 opacity-0 bg-[#0C3E49] ${location.position}`}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => handleLocationClick(location)}
                aria-label={location.name}
              />
            ))}
          </div>
        </div>
      </figure>

      <motion.div
        className="lg:hidden mt-9 flex flex-col space-y-6 "
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        aria-label="Project Statistics"
        data-lenis-prevent
      >
        <div className="flex-grow">
          {selectedLocation.description === STATS_DATA
            ? selectedLocation.description.map((stat, index) => (
                <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "my-10" : ""}`}>
                  <Typography variant="custom" className="font-theSeasons text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] text-[#503637]">
                    <span className="font-CandideCondensedNormal">
                      <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                    </span>
                    <span className="font-CandideCondensedNormal">{stat.value.replace(/[0-9a-zA-Z\s]/g, "")}</span>
                    <span className="font-theSeasons">{stat.value.replace(/[^a-zA-Z\s]/g, "")}</span>
                  </Typography>
                  <Typography variant="custom" className="text-sm md:text-lg text-[#4F373799] font-ttCommons mt-2">
                    {stat.label}
                  </Typography>
                </motion.div>
              ))
            : selectedLocation.description.map((stat, index) => (
                <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "my-4" : ""}`}>
                  <Typography variant="custom" className="font-theSeasons text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] text-[#503637]">
                    {useSafeSpecialCharacters(stat.value)}
                  </Typography>
                  <Typography variant="custom" className="text-sm md:text-lg text-[#4F373799] font-theSeasons mt-2">
                    {useSafeSpecialCharacters(stat.label)}
                  </Typography>
                </motion.div>
              ))}
        </div>
        <div className="relative group cursor-pointer w-fit mt-auto">
          <button
            aria-label="More about our sustainability centric approach"
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="
                      relative group
                      flex items-center justify-center
                      gap-[0.6875rem]
                      rounded-full
                      pl-[8px] pr-[1rem] py-[0.2rem]
                      text-base font-ttCommons text-white
                      overflow-hidden z-100
                      w-fit
                    "
          >
            <div className={`absolute inset-0 bg-[#AE856633] rounded-full`}></div>
            <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
              <div
                className={`
                          absolute w-0 h-0 rounded-full
                          group-hover:w-[47rem] group-hover:h-[30rem]
                          transition-all duration-500 ease-out
                        `}
              ></div>
              <div className="relative z-20">
                <CTAButtonIcon fill="#4F3737" direction="right" />
              </div>
            </div>
            <span className={`relative z-20 text-[#503637] text-[13px] mt-[2px] font-ttCommons`}>More about our sustainability centric approach</span>
          </button>
        </div>
      </motion.div>
      <CurrentProjectCard textColor="#503637" modalIsOpen={isModalOpen} onClose={setIsModalOpen} />
    </section>
  );
};

export default CurrentProjectTwo;
