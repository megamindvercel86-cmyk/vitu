"use client";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// ============= Constants =============
const PROJECT_DATA = {
  title: "Our Commitment to Tomorrow",
  description: {
    suffix:
      "At VITU Realty, we go beyond real estate, fostering lasting social impact & championing eco-friendly practices for a sustainable future by baking it into the very fabric of the spaces we create.",
  },
  cta: "Explore the Project Now",
  image: "/images/visionAndFutureImages/image.png",
};

const STATS_DATA = [
  {
    value: "500+",
    label: "Tree Cover",
  },
  {
    value: "20,000 sq.ft.",
    label: "Clubhouse Amenities",
  },
  {
    value: "37,428 sq.ft.",
    label: "Parks & Open Spaces",
  },
];

/**
 * Counter Component
 * Animates a number from a starting point to the target value
 * Handles formats like "500+", "20,000 sq.ft.", "3,400+ sq.m."
 */
interface CounterProps {
  value: string;
}

const Counter: React.FC<CounterProps> = ({ value }) => {
  // Extract numeric part from value (e.g., "500+" -> 500, "20,000 sq.ft." -> 20000)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const [count, setCount] = useState(numericValue - 5 >= 0 ? numericValue - 5 : 0); // Start from value - 5 or 0
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView && count < numericValue) {
      const start = count;
      const end = numericValue;
      const duration = 2000; // 2 seconds
      const incrementTime = 150;
      const steps = duration / incrementTime;
      const stepSize = Math.max(1, Math.ceil((end - start) / steps)); // Ensure stepSize is at least 1

      const timer = setInterval(() => {
        setCount((prev) => {
          const next = prev + stepSize;
          if (next >= end) {
            clearInterval(timer);
            return end;
          }
          return next;
        });
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, numericValue, count]);

  // Format display value to match original format (e.g., "500+" or "20,000 sq.ft.")
  const displayValue = value.includes("+")
    ? `${count.toLocaleString()}+`
    : value.includes("sq.ft.") || value.includes("sq.m.")
      ? `${count.toLocaleString()} ${value.match(/sq\.\w+\.?/)?.[0] || ""}`
      : count.toLocaleString();

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="inline-block">
      {displayValue}
    </motion.span>
  );
};

/**
 * Current Project Component
 * Displays information about the current featured project
 *
 * Features:
 * 1. Project details with badge
 * 2. Project image
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
  // ============= Render Helpers =============
  const renderStats = () => (
    <div className="hidden md:flex lg:block md:justify-between mt-[50px] lg2:mt-[200px] 2xl:mt-[400px]" aria-label="Project Statistics">
      {STATS_DATA.map((stat, index) => (
        <div key={index} className={`leading-[1.1] ${index !== 0 ? "lg:my-10" : ""}`}>
          <Typography
            variant="custom"
            className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] text-[#503637]"
          >
            <Counter value={stat.value} />
          </Typography>
          <Typography variant="custom" className="font-FreightNeoProNormal text-[24px] text-[#503637]">
            {stat.label}
          </Typography>
        </div>
      ))}
    </div>
  );

  return (
    <section
      className="flex flex-col sm:flex-col lg:flex-row mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem]"
      aria-labelledby="project-title"
    >
      {/* Left Column - Project Details */}
      <article className="w-full lg:w-1/2">
        <header>
          {/* Project Title */}
          <h1
            id="project-title"
            className="w-[224px] md:w-full pt-3 md:pt-0 text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[60px] font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-customBrown"
          >
            {PROJECT_DATA.title}
          </h1>
        </header>

        {/* Project Description */}
        <div className="flex items-center">
          <Typography
            variant="custom"
            className="font-freightNeoMedium md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg:text-xl lg2:text-[24px] 2xl:leading-[40px] text-[#4F373799]"
          >
            {/* {PROJECT_DATA.description.prefix}
            <span className="font-CandideCondensedMedium">{PROJECT_DATA.description.number}</span> */}
            {PROJECT_DATA.description.suffix}
          </Typography>
        </div>

        {/* Desktop CTA */}
          <div className="mt-[29px]">
            <button aria-label="Only few plots remaining" className="hidden bg-[#AE8566]/20 md:block items-center justify-center text-center w-[287px] h-14 pt-1 font-FreightNeoProBold text-[22px] text-customBrown 2xl:w-[480px] 2xl:h-[66px] 2xl:text-[2.125rem]">
            Only few plots remaining
            </button>
          </div>
        {renderStats()}
      </article>

      {/* Right Column - Project Image */}
      <figure className="flex items-center justify-center w-full lg:w-1/2" aria-labelledby="project-title">
        <Image
          src={PROJECT_DATA.image}
          width={708}
          height={400}
          alt={`${PROJECT_DATA.title} - Premium plotted development near NITK Surathkal beach`}
          className="w-full h-full object-contain"
        />
      </figure>

      {/* Mobile CTA */}
      <Link href="/project-enquire">
  <div className="block md:hidden w-full pt-10 text-center leading-[1]">
    <button 
      aria-label="Explore the Project Now" 
      className="flex items-center justify-center w-full h-[56px] rounded-[36px] border-[2px] border-customBrown font-FreightNeoProBold text-[22px] text-customBrown hover:bg-customBrown hover:text-white transition-colors duration-300"
    >
      {/* Ensure PROJECT_DATA.cta is descriptive, e.g., "Explore the Project" */}
      {PROJECT_DATA.cta || "Explore the Project"} 
    </button>
  </div>
</Link>
    </section>
  );
};

export default CurrentProject;
