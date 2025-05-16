"use client";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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
  title: "Vitu Vilasam",
  badge: "Limited Plots Available",
  description: {
    suffix:
      " Where comfort meets affordability, and thoughtful design creates a sense of home. Vilasam blends refined living with everyday functionality—elegant spaces built to inspire joy, connection, & a lasting sense of belonging.",
  },
  cta: "Explore the Project Now",
  image: "/images/currentProjectImageUpdated/27.png",
};

const STATS_DATA = [
  {
    value: "20,000 sq.ft.",
    label: "Spacious Clubhouse",
  },
  {
    value: "3,400+ sq.m.",
    label: "Parks & Open Spaces",
  },
];

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Section 1",
    position: "lg:left-[24%]  lg:top-[45%] left-[22%] top-[45%]  lg:w-[65px]  lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/3.png",
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
    position: "left-[22%] top-[52%] lg:left-[23.8%] lg:top-[57%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/4.png",
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
    position: "left-[21%] top-[59%] md:left-[23%] md:top-[62%] lg:left-[23%] lg:top-[67%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/5.png",
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
    position: "left-[19.5%] top-[67%] md:left-[19.5%] md:top-[72%] lg:left-[16.5%] lg:top-[77%]  lg:w-24  lg:h-[68px]",
    imagePath: "/images/currentProjectImageUpdated/6.png",
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
    position: "left-[14.5%] top-[74%] lg:left-[12.5%] lg:top-[88%] md:left-[14.5%] md:top-[82.5%]  lg:w-[130px]  lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/7.png",
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
    position: "left-[34%] top-[74%] lg:left-[33%] lg:top-[88.7%] md:left-[34%] md:top-[82.7%] lg:w-[70px] lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/8.png",
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
    position: "left-[34%] top-[67%] md:left-[34%] md:top-[72%] lg:left-[34%] lg:top-[77%]  lg:w-[70px]  lg:h-[68px]",
    imagePath: "/images/currentProjectImageUpdated/9.png",
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
    position: "left-[34%] top-[59%] md:left-[34%] md:top-[64%] lg:left-[34%] lg:top-[67%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/10.png",
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
    position: "left-[33.9%] top-[52%] lg:left-[33.9%] lg:top-[57%]   lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/currentProjectImageUpdated/11.png",
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
    position: "left-[34%] top-[43%] lg:left-[34%] lg:top-[41%]  lg:w-[70px]  lg:h-[97px]",
    imagePath: "/images/currentProjectImageUpdated/12.png",
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
    imagePath: "/images/currentProjectImageUpdated/13.png",
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
    imagePath: "/images/currentProjectImageUpdated/27.png",
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
    imagePath: "/images/currentProjectImageUpdated/27.png",
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
    position: "left-[66%] top-[55%] lg:left-[62%] lg:top-[60%]  lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/currentProjectImageUpdated/16.png",
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
    position: "left-[67%] top-[48%] lg:left-[61.8%] lg:top-[50.8%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/currentProjectImageUpdated/17.png",
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
    imagePath: "/images/currentProjectImageUpdated/18.png",
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
    imagePath: "/images/currentProjectImageUpdated/19.png",
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
    imagePath: "/images/currentProjectImageUpdated/20.png",
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
    imagePath: "/images/currentProjectImageUpdated/21.png",
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
    position: "left-[55%] top-[26%] md:left-[53%] md:top-[16%]  lg:left-[51%] lg:top-[16.6%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/22.png",
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
    imagePath: "/images/currentProjectImageUpdated/23.png",
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
    position: "left-[53%] top-[42%] lg:left-[51%] md:top-[39%] lg:top-[40%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/currentProjectImageUpdated/24.png",
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
    position: "left-[55%] top-[73%] lg:left-[52%] lg:top-[85%] md:left-[55%] md:top-[84%]  lg:w-[100px]  lg:h-[80px]",
    imagePath: "/images/currentProjectImageUpdated/25.png",
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
    position: "left-[54%] top-[48%] lg:left-[51%] lg:top-[49.8%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/currentProjectImageUpdated/26.png",
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
    position: "lg:left-[24.9%] lg:top-[28%] left-[22%] top-[35%]   lg:w-[60px]  lg:h-[100px]",
    imagePath: "/images/currentProjectImageUpdated/28.png",
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
    position: "left-[54%] top-[55%] lg:left-[51%] lg:top-[60%]    lg:w-[70px]  lg:h-[55px]",
    imagePath: "/images/currentProjectImageUpdated/29.png",
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

  // Debug click events
  const handleLocationClick = (location: Location) => {
    console.log("Clicked location:", location.name);
    setSelectedLocation(location);
  };

  // Reset to initial image on mouse leave
  const handleMouseLeave = () => {
    setSelectedLocation({
      id: 0,
      name: "Project Overview",
      position: "left-[50%] top-[60%]",
      imagePath: PROJECT_DATA.image,
      description: STATS_DATA,
    });
  };

  // Debug state changes
  useEffect(() => {
    console.log("Selected location updated:", selectedLocation.name);
  }, [selectedLocation]);

  // ============= Render Helpers =============
  const renderStats = () => (
    <motion.div
      className="hidden lg:block mt-[50px] lg2:mt-[90px] 2xl:mt-[400px]"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      aria-label="Project Statistics"
    >
      {selectedLocation.description === STATS_DATA
        ? selectedLocation.description.map((stat, index) => (
            <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "lg:my-10" : ""}`}>
              <Typography
                variant="custom"
                className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637]"
              >
                <span className="font-CandideCondensedNormal">
                  <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                </span>
                <span className="font-FreightNeoProNormal">{stat.value.replace(/\d+/g, "")}</span>
              </Typography>
              <Typography
                variant="custom"
                className={`${index === 0 ? "font-CandideCondensedMedium" : "font-FreightNeoProNormal"} text-[24px] text-[#503637]`}
              >
                {stat.label}
              </Typography>
            </motion.div>
          ))
        : selectedLocation.description.map((stat, index) => (
            <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "lg:my-10" : ""}`}>
              <Typography
                variant="custom"
                className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637]"
              >
                <span className="font-CandideCondensedNormal">{stat.value}</span>
              </Typography>
              <Typography
                variant="custom"
                className={`${index === 0 ? "font-CandideCondensedMedium" : "font-FreightNeoProNormal"} lg:text-xl 2xl:text-[2.125rem] 2xl:leading-[40px] text-[#503637]`}
              >
                {stat.label}
              </Typography>
            </motion.div>
          ))}
    </motion.div>
  );

  return (
    <section
      className="flex flex-col sm:flex-col lg:flex-row mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[13.125rem]"
      aria-labelledby="project-title"
    >
      {/* Left Column - Project Details */}
      <article className="w-full lg:w-1/2 flex flex-col justify-between md:pb-32">
        <div>
          <header>
            <h1
              id="project-title"
              className="w-[224px] md:w-full pt-3 md:pt-0 text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-customBrown"
            >
              {PROJECT_DATA.title} {selectedLocation.id}
            </h1>
          </header>

          <div className="flex items-center">
            <Typography
              variant="custom"
              className="font-freightNeoMedium md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg:text-xl 2xl:text-[2.125rem] 2xl:leading-[40px] text-[#4F373799]"
            >
              {PROJECT_DATA.description.suffix}
            </Typography>
          </div>

          <Link href="/vilasam">
            <div className="mt-[29px]">
              <button className="hidden md:block pt-[5px] items-center justify-center pb-1 text-center w-[287px] h-14 rounded-[36px] border-[2px] border-customBrown bg-none font-FreightNeoProBold text-[22px] text-customBrown 2xl:w-[480px] 2xl:h-[66px] 2xl:text-[2.125rem]">
                {PROJECT_DATA.cta}
              </button>
            </div>
          </Link>
        </div>
        <div>{renderStats()}</div>
      </article>

      {/* Right Column - Interactive Project Map (Desktop) */}
      <figure
        className="lg:flex items-center h-[70vh] lg2:h-[90vh] justify-center w-full lg:w-1/2 relative"
        aria-labelledby="project-title"
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full">
          <Image fill src={selectedLocation.imagePath} alt="Project Map" className="w-full h-full object-contain" />
          <div className="absolute inset-0 z-10">
            {LOCATIONS.map((location) => (
              <button
                key={location.id}
                className={`absolute w-6 h-6 md:h-10 md:w-10 opacity-0 bg-[#503637] ${location.position}`}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => handleLocationClick(location)}
                aria-label={location.name}
                
              />
            ))}
          </div>
        </div>
      </figure>

      <motion.div
        className="lg:hidden"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        aria-label="Project Statistics"
      >
        {selectedLocation.description === STATS_DATA
          ? selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "my-10" : ""}`}>
                <Typography
                  variant="custom"
                  className={`${index === 0 ? "font-CandideCondensedMedium" : "font-FreightNeoProNormal"} lg:text-xl 2xl:text-[2.125rem] 2xl:leading-[40px] text-[24px] text-[#503637]`}
                >
                  <span className="font-CandideCondensedNormal">
                    <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                  </span>
                  <span className="font-FreightNeoProNormal">{stat.value.replace(/\d+/g, "")}</span>
                </Typography>
                <Typography variant="custom" className="font-FreightNeoProNormal text-[24px] text-[#503637]">
                  {stat.label}
                </Typography>
              </motion.div>
            ))
          : selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "my-10" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637]"
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="custom"
                  className="font-freightNeoMedium md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg:text-xl 2xl:text-[2.125rem] 2xl:leading-[40px] text-[#4F373799]"
                >
                  {stat.label}
                </Typography>
              </motion.div>
            ))}
      </motion.div>

      <Link href="/project-enquire">
        <div className="block md:hidden w-full pt-10 text-center leading-[1]">
          <button className="flex items-center justify-center w-full h-[56  rounded-[36px] border-[2px] border-customBrown font-FreightNeoProBold text-[22px] text-customBrown hover:bg-customBrown hover:text-white transition-colors duration-300">
            {PROJECT_DATA.cta}
          </button>
        </div>
      </Link>
    </section>
  );
};

export default CurrentProject;