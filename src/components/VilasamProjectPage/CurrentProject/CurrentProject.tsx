"use client";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import CTAButtonIcon from "@/components/Icons/Icons";
import Image from "next/image";
import CurrentProjectCard from "@/components/ui/apple-style-card-current-projects";

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
  image: "/images/vilasamCurrentProjectImages/27.png",
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
    position: "lg:left-[24%]  lg:top-[45%] left-[22%] top-[48%]  lg:w-[65px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/3.png",
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
    id: 2,
    name: "Section 2",
    position: "left-[22%] top-[54%] lg:left-[23.8%] lg:top-[57%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/4.png",
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
    position: "left-[21%] top-[63%] md:left-[23%] md:top-[62%] lg:left-[23%] lg:top-[67%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/5.png",
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
    position: "left-[19.5%] top-[71%] md:left-[19.5%] md:top-[72%] lg:left-[16.5%] lg:top-[77%]  lg:w-24  lg:h-[68px]",
    imagePath: "/images/vilasamCurrentProjectImages/6.png",
    description: [
      { value: "West Facing Plots", label: "6.60 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 5,
    name: "Section 5",
    position: "left-[14.5%] top-[77%] lg:left-[12.5%] lg:top-[88%] md:left-[14.5%] md:top-[82.5%]  lg:w-[130px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/7.png",
    description: [
      { value: "West Facing Plots", label: "7.80 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 6,
    name: "Section 6",
    position: "left-[34%] top-[77%] lg:left-[33%] lg:top-[88.7%] md:left-[34%] md:top-[82.7%] lg:w-[70px] lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/8.png",
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
    id: 7,
    name: "Section 7",
    position: "left-[34%] top-[71%] md:left-[34%] md:top-[72%] lg:left-[34%] lg:top-[77%]  lg:w-[70px]  lg:h-[68px]",
    imagePath: "/images/vilasamCurrentProjectImages/9.png",
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
    position: "left-[34%] top-[63%] md:left-[34%] md:top-[64%] lg:left-[34%] lg:top-[67%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/10.png",
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
    position: "left-[33.9%] top-[55%] lg:left-[33.9%] lg:top-[57%]   lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/vilasamCurrentProjectImages/11.png",
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
    position: "left-[34%] top-[45%] lg:left-[34%] lg:top-[41%]  lg:w-[70px]  lg:h-[97px]",
    imagePath: "/images/vilasamCurrentProjectImages/12.png",
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
    position: "left-[34%] top-[34%] md:left-[34%] md:top-[27%] lg:left-[34%] lg:top-[27%]  lg:w-[70px]  lg:h-[78px]",
    imagePath: "/images/vilasamCurrentProjectImages/13.png",
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
    position: "left-[88%] top-[27%] lg:left-[80%] md:top-[17%] lg:top-[13%]  lg:w-[60px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/27.png",
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
    position: "left-[83%] top-[35%] md:left-[85%] md:top-[29%] lg:left-[79.5%] lg:top-[27%]  lg:w-10  lg:h-16",
    imagePath: "/images/vilasamCurrentProjectImages/27.png",
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
    position: "left-[66%] top-[58%] lg:left-[62%] lg:top-[60%]  lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/vilasamCurrentProjectImages/16.png",
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
    position: "left-[67%] top-[51%] lg:left-[61.8%] lg:top-[50.8%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/vilasamCurrentProjectImages/17.png",
    description: [
      { value: "East Facing Plots", label: "3.90 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 16,
    name: "Section 16",
    position: "left-[67%] top-[42%]  md:top-[39%]  lg:left-[61.9%] lg:top-[39%] lg:w-[70px]  lg:h-[74px]",
    imagePath: "/images/vilasamCurrentProjectImages/18.png",
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
    id: 17,
    name: "Section 17",
    position: "left-[66%] top-[34%] md:left-[67%] md:top-[27%] lg:left-[62%] lg:top-[26%]  lg:w-[70px]  lg:h-[78px]",
    imagePath: "/images/vilasamCurrentProjectImages/19.png",
    description: [
      { value: "East Facing Plots", label: "5.00 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 18,
    name: "Section 18",
    position: "left-[66%] top-[25%] md:left-[67%] md:top-[15%] lg:left-[62%] lg:top-[10%]  lg:w-[70px]  lg:h-[84px]",
    imagePath: "/images/vilasamCurrentProjectImages/20.png",
    description: [
      { value: "East Facing Plots", label: "5.80 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
      },
    ],
  },
  {
    id: 19,
    name: "Section 19",
    position: "left-[55%] top-[20%] md:left-[53%] md:top-[8%] lg:left-[51%] lg:top-[7%]  lg:w-[70px]  lg:h-[54px]",
    imagePath: "/images/vilasamCurrentProjectImages/21.png",
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
    position: "left-[55%] top-[29%] md:left-[53%] md:top-[16%]  lg:left-[51%] lg:top-[16.6%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/22.png",
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
    position: "left-[54%]  top-[35%] md:left-[54%]  md:top-[27%] lg:left-[51%]  lg:top-[28.8%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/23.png",
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
    id: 22,
    name: "Section 22",
    position: "left-[53%] top-[44%] lg:left-[51%] md:top-[39%] lg:top-[40%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilasamCurrentProjectImages/24.png",
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
    id: 23,
    name: "Section 23",
    position: "left-[55%] top-[77%] lg:left-[52%] lg:top-[85%] md:left-[55%] md:top-[84%]  lg:w-[100px]  lg:h-[80px]",
    imagePath: "/images/vilasamCurrentProjectImages/25.png",
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
    position: "left-[54%] top-[51%] lg:left-[51%] lg:top-[49.8%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/vilasamCurrentProjectImages/26.png",
    description: [
      { value: "West Facing Plots", label: "3.60 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 25,
    name: "Section 25",
    position: "lg:left-[24.9%] lg:top-[28%] left-[22%] top-[36%]   lg:w-[60px]  lg:h-[100px]",
    imagePath: "/images/vilasamCurrentProjectImages/28.png",
    description: [
      { value: "West Facing Plots", label: "5.40 Cents" },
      {
        value: "",
        label:
          "Known for welcoming the soft golden glow of the evening sun, west-facing plots are a perfect blend of comfort and warmth. Ideal for those who enjoy cooler mornings and brighter late afternoons, these plots are thoughtfully positioned to maximize natural light while offering serene sunset views right from your doorstep.",
      },
    ],
  },
  {
    id: 26,
    name: "Section 26",
    position: "left-[54%] top-[58%] lg:left-[51%] lg:top-[60%]    lg:w-[70px]  lg:h-[55px]",
    imagePath: "/images/vilasamCurrentProjectImages/29.png",
    description: [
      { value: "East Facing Plots", label: "3.55 Cents" },
      {
        value: "",
        label:
          "Designed for early risers and energy-conscious living, east-facing plots bask in the gentle morning light. These plots are ideal for building vastu-compliant homes that align with traditional preferences and modern needs, offering a peaceful start to every day.",
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
const CurrentProject: React.FC = () => {
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
      className={`hidden lg:block  mt-[40px] ${selectedLocation.description === STATS_DATA ? "xl:mt-[170px] lg:mt-[100px]" : "lg:mt-[50px]"}  2xl:mt-[400px]`}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      aria-label="Project Statistics"
    >
      {selectedLocation.description === STATS_DATA
        ? selectedLocation.description.map((stat, index) => (
            <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "lg:my-10" : ""}`}>
              <Typography
                variant="custom"
                className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
              >
                <span className="font-CandideCondensedNormal">
                  <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                </span>
                <span className="font-geistSerif">{stat.value.replace(/\d+/g, "")}</span>
              </Typography>
              <Typography
                variant="custom"
                className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3"
              >
                {stat.label}
              </Typography>
            </motion.div>
          ))
        : selectedLocation.description.map((stat, index) => (
            <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "lg:my-3" : ""}`}>
              <Typography
                variant="custom"
                className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
              >
                <span className="font-CandideCondensedNormal">{stat.value}</span>
              </Typography>
              <Typography
                variant="custom"
                className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3"
              >
                {stat.label}
              </Typography>
            </motion.div>
          ))}
      <div className=" relative group cursor-pointer">
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
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
          <div className={`absolute inset-0 bg-[#e0f2ec]  rounded-full`}></div>
          <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
            <div
              className={`
                          absolute w-0 h-0   rounded-full
                          group-hover:w-[47rem] group-hover:h-[30rem]
                          transition-all duration-500 ease-out
                        `}
            ></div>
            <div className="relative z-20">
              <CTAButtonIcon fill="#0C3E49" direction="right" />
            </div>
          </div>
          <span className={` relative z-20 text-[#0C3E49] mt-[3px] md:mt-0 font-sourceSans3`}>More about our sustainability centric approach </span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <section
      className="flex flex-col sm:flex-col lg:max-h-screen  lg:flex-row mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem]"
      aria-labelledby="project-title"
    >
      {/* Left Column - Project Details */}
      <article className="w-full lg:w-1/2 lg2:py-32">
        <header className="md:pb-10 pb-4">
          <h1
            id="project-title"
            className="w-[224px] hidden md:block  md:w-full   text-2xl lg:text-5xl lg2:text-6xl font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-[#0C3E49]"
          >
            Explore your <br /> Future Home
          </h1>
          <h1
            id="project-title"
            className=" md:hidden  !font-medium  md:w-full  text-2xl md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-[#0C3E49]"
          >
            Explore your Future Home {selectedLocation.id}
          </h1>
        </header>

        <div className="flex items-center">
          <Typography
            variant="custom"
            className="font-sourceSans3  md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px] md:text-lg text-sm text-[#0C3E49]/60"
          >
            {PROJECT_DATA.description.suffix}
          </Typography>
        </div>

        {/* <Link href="/vaikuntamcity">
          <div className="mt-[29px]">
            <button className="hidden md:block pt-[5px] items-center justify-center pb-1 text-center w-[287px] h-14 rounded-[36px] border-[2px] border-customBrown bg-none font-FreightNeoProBold text-[22px] text-customBrown 2xl:w-[480px] 2xl:h-[66px] 2xl:text-[2.125rem]">
              {PROJECT_DATA.cta}
            </button>
          </div>
        </Link> */}

        {renderStats()}
      </article>

      {/* Right Column - Interactive Project Map (Desktop) */}
      <figure
        className="lg:flex ml-auto  items-center h-[70vh] lg:h-[100vh] lg2:h-[90vh] justify-center w-full lg:w-[45%] lg2:w-1/2 relative"
        aria-labelledby="project-title"
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full">
          <Image fill src={selectedLocation.imagePath} alt="Project Map" className="w-full h-full object-contain" />
          <div className="absolute inset-0 z-10">
            {LOCATIONS.map((location) => (
              <button
                key={location.id}
                className={`absolute w-6 h-6 md:h-10 md:w-10 opacity-0  bg-[#0C3E49] ${location.position}`}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => handleLocationClick(location)}
                aria-label={location.name}
              />
            ))}
          </div>
        </div>
      </figure>

      <motion.div
        className="  lg:hidden "
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        aria-label="Project Statistics"
      >
        {selectedLocation.description === STATS_DATA
          ? selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "my-10" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
                >
                  <span className="font-CandideCondensedNormal">
                    <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                  </span>
                  <span className="font-geistSerif">{stat.value.replace(/\d+/g, "")}</span>
                </Typography>
                <Typography variant="custom" className="lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3">
                  {stat.label}
                </Typography>
              </motion.div>
            ))
          : selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "my-4" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
                >
                  <span className="font-CandideCondensedNormal">{stat.value}</span>
                </Typography>
                <Typography variant="custom" className="lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3">
                  {stat.label}
                </Typography>
              </motion.div>
            ))}
        <div className=" relative group cursor-pointer">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="
                      relative group
                      mt-4
                      flex items-center justify-center
                      gap-[0.6875rem]
                      rounded-full
                      pl-[10px] pr-[1rem] py-[0.1px] lg:py-[0.100rem]
                      text-base font-freightNeoMedium text-white
                      2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]
                      overflow-hidden z-100
                    "
          >
            <div className={`absolute inset-0 bg-[#e0f2ec]  rounded-full`}></div>
            <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
              <div
                className={`
                          absolute w-0 h-0   rounded-full
                          group-hover:w-[47rem] group-hover:h-[30rem]
                          transition-all duration-500 ease-out
                        `}
              ></div>
              <div className="relative z-20">
                <CTAButtonIcon fill="#0C3E49" direction="right" />
              </div>
            </div>
            <span className={` relative z-20 text-[#0C3E49] text-[13px] mt-[3px] md:mt-0 font-sourceSans3`}>
              More about our sustainability centric approach
            </span>
          </button>
        </div>
      </motion.div>
      <CurrentProjectCard modalIsOpen={isModalOpen} onClose={setIsModalOpen} />
    </section>
  );
};

export default CurrentProject;
