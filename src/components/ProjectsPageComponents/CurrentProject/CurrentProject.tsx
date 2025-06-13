"use client";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
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
  title: "Our Commitment to Tomorrow",
  badge: "Limited Plots Available",
  description: {
    suffix:
      "At VITU Realty, we go beyond real estate, fostering lasting social impact & championing eco-friendly practices for a sustainable future by baking it into the very fabric of the spaces we create.",
  },
  cta: "Explore the Project Now",
  image: "/images/visionAndFutureImages/imageMain.png",
};

const STATS_DATA = [
  {
    value: "500+",
    label: "Tree Cover",
  },
  {
    value: "20,000 sq ft",
    label: "Clubhouse Amenities",
  },
  {
    value: "37,428 sq ft",
    label: "Parks & Open Spaces",
  },
];

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Section 1",
    position: "lg:left-[41%]  lg:top-[64%] left-[41%] top-[60.5%] md:left-[41%] md:top-[64%]  lg:w-[25px]  lg:h-[25px]",
    imagePath: "/images/visionAndFutureImages/plots1.png",
    description: [
      { value: "Premium Plot", label: "4.00 Cents" },
      {
        value: "",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
  {
    id: 2,
    name: "Section 2",
    position: "left-[54%] top-[59%] md:left-[54%] md:top-[62%] lg:left-[55%] lg:top-[62%]  lg:w-[22px] rotate-45  lg:h-[25px]",
    imagePath: "/images/visionAndFutureImages/plots2.png",
    description: [
      { value: "Signature Plot ", label: "5.10 Cents" },
      {
        value: "",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 3,
    name: "Section 3",
    position: "left-[57.5%] top-[60%] md:left-[57%] md:top-[64%] lg:left-[58%] lg:top-[63%] lg:rotate-45  lg:w-[25px]  lg:h-[25px]",
    imagePath: "/images/visionAndFutureImages/plots3.png",
    description: [
      { value: "Signature Plot ", label: "5.10 Cents" },
      {
        value: "",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 4,
    name: "Section 4",
    position: "left-[62%] top-[55.5%] md:left-[62%] md:top-[57.5%] lg:left-[62%] lg:top-[57%] lg:rotate-45  lg:w-[30px]  lg:h-[30px]",
    imagePath: "/images/visionAndFutureImages/plots4.png",
    description: [
      { value: "Corner Plot", label: "6.25 Cents" },
      {
        value: "",
        label:
          "Corner Plots provide enhanced frontage and design flexibility, perfect for homeowners seeking standout appeal. With natural light and ventilation on multiple sides, these plots are designed for elevated living experiences. ",
      },
    ],
  },
  {
    id: 5,
    name: "Section 5",
    position:
      "left-[66%] top-[51%] lg:left-[65%] lg:top-[51%] lg:rotate-45 md:left-[65%] md:top-[51%] md:w-[100px]  md:h-[50px] lg:w-[30px]  lg:h-[30px]",
    imagePath: "/images/visionAndFutureImages/plots5.png",
    description: [
      { value: "Signature Plot", label: "5.50 Cents" },
      {
        value: "",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 6,
    name: "Section 6",
    position: " left-[68%] top-[49%] lg:left-[67%] lg:top-[48%] lg:rotate-45 md:left-[66%] md:top-[47.5%]  lg:w-[30px] lg:h-[30px]",
    imagePath: "/images/visionAndFutureImages/plots6.png",
    description: [
      { value: "Signature Plot", label: "5.50 Cents" },
      {
        value: "",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 7,
    name: "Section 7",
    position: "left-[77%] top-[22.5%] lg:left-[76%] lg:top-[13%]  md:left-[74%] md:top-[11.5%] lg:w-[30px] lg:h-[30px]",
    imagePath: "/images/visionAndFutureImages/plots7.png",
    description: [
      { value: "Signature Plot", label: "7.60 Cents" },
      {
        value: "",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 8,
    name: "Section 8",
    position: "left-[55%] top-[43%] lg:left-[54%] lg:top-[40%] md:left-[53%] md:top-[40%]   lg:w-[30px] lg:h-[30px]",
    imagePath: "/images/visionAndFutureImages/plot10.png",
    description: [
      { value: "Premium Plot", label: "6.00 Cents" },
      {
        value: "",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
];

// ============= Components =============
const Counter: React.FC<{ value: string }> = ({ value }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const [count, setCount] = useState(numericValue - 5 >= 0 ? numericValue - 5 : 0);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView && count < numericValue) {
      const start = count;
      const end = numericValue;
      const duration = 2000;
      const incrementTime = 150;
      const steps = duration / incrementTime;
      const stepSize = Math.max(1, Math.ceil((end - start) / steps));

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

  const displayValue = value.includes("+")
    ? `${count.toLocaleString()}`
    : value.includes("sq.ft.") || value.includes("sq.m.")
      ? `${count.toLocaleString()} ${inView ? value.match(/sq\.\w+\.?/)?.[0] || "" : ""}`
      : count.toLocaleString();

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="inline-block">
      {displayValue}
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
                className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637]"
              >
                <span className="font-CandideCondensedNormal">
                  <Counter value={stat.value} />
                </span>
                <span className="font-geistSerif">{stat.value.replace(/[\d,]+/g, "")}</span>
              </Typography>
              <Typography
                variant="custom"
                className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px]  md:text-lg text-sm text-[#503637]/60  font-sourceSans3"
              >
                {stat.label}
              </Typography>
            </motion.div>
          ))
        : selectedLocation.description.map((stat, index) => (
            <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "lg:my-3" : ""}`}>
              <Typography
                variant="custom"
                className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637]"
              >
                <span className="font-CandideCondensedNormal">{stat.value}</span>
              </Typography>
              <Typography
                variant="custom"
                className="md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px]  md:text-lg text-sm text-[#503637]/60  font-sourceSans3"
              >
                {stat.label}
              </Typography>
            </motion.div>
          ))}
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
            className="w-[224px] hidden lg:block  md:w-full   text-2xl lg:text-5xl lg2:text-6xl font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-[#503637]"
          >
            Our Commitment <br /> to Tomorrow
          </h1>
          <h1
            id="project-title"
            className=" lg:hidden  !font-medium  md:w-full  text-2xl md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-[#503637]"
          >
            Our Commitment to Tomorrow
          </h1>
        </header>

        <div className="flex items-center">
          <Typography
            variant="custom"
            className="font-sourceSans3  md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg2:text-[24px] md:text-lg text-sm text-[#503637]/60"
          >
            {PROJECT_DATA.description.suffix}
          </Typography>
        </div>

        {renderStats()}
      </article>

      {/* Right Column - Interactive Project Map (Desktop) */}
      <figure
        className="lg:flex ml-auto  items-center h-[70vh] lg:h-[100vh] lg2:h-[120vh] justify-center w-full lg:w-[45%] lg2:w-1/2 relative"
        aria-labelledby="project-title"
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full">
          <Image fill src={selectedLocation.imagePath} alt="Project Map" className="w-full h-full object-contain" />
          <div className="absolute inset-0 z-10">
            {LOCATIONS.map((location) => (
              <button
                key={location.id}
                className={`absolute w-3 h-3 md:h-6 md:w-6 opacity-0 bg-[#503637] ${location.position}`}
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
              <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "my-5" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637]"
                >
                  <span className="font-CandideCondensedNormal">
                    <Counter value={stat.value} />
                  </span>
                  <span className="font-geistSerif">{stat.value.replace(/[\d,]+/g, "")}</span>
                </Typography>
                <Typography variant="custom" className="lg2:text-[24px]  md:text-lg text-sm text-[#503637]/60  font-sourceSans3">
                  {stat.label}
                </Typography>
              </motion.div>
            ))
          : selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "my-4" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-geistSerif text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637]"
                >
                  <span className="font-CandideCondensedNormal">{stat.value}</span>
                </Typography>
                <Typography variant="custom" className="lg2:text-[24px]  md:text-lg text-sm text-[#503637]/60  font-sourceSans3">
                  {stat.label}
                </Typography>
              </motion.div>
            ))}
      </motion.div>
      <CurrentProjectCard modalIsOpen={isModalOpen} onClose={setIsModalOpen} />
    </section>
  );
};

export default CurrentProject;
