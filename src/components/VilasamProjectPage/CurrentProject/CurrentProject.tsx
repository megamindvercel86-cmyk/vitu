"use client";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import CTAButtonIcon from "@/components/Icons/Icons";

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
      " Where comfort meets affordability, and thoughtful design creates a sense of home. Vilasam blends refined living with everyday functionality—elegant spaces built to inspire joy, connection, & a lasting sense of belonging.",
  },
  cta: "Explore the Project Now",
  image: "/images/vilsamPageCurrentProjects/27.png",
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
    position: "lg:left-[24%]  lg:top-[40%] left-[22%] top-[45%]  lg:w-[65px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/3.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 2,
    name: "Section 2",
    position: "left-[22%] top-[52%] lg:left-[23.8%] lg:top-[51%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/4.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 3,
    name: "Section 3",
    position: "left-[21%] top-[59%] md:left-[23%] md:top-[62%] lg:left-[23%] lg:top-[62%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/5.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 4,
    name: "Section 4",
    position: "left-[19.5%] top-[67%] md:left-[19.5%] md:top-[72%] lg:left-[19.5%] lg:top-[72%]  lg:w-24  lg:h-[68px]",
    imagePath: "/images/vilsamPageCurrentProjects/6.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 5,
    name: "Section 5",
    position: "left-[14.5%] top-[74%] lg:left-[14.5%] lg:top-[82.5%] md:left-[14.5%] md:top-[82.5%]  lg:w-[130px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/7.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 6,
    name: "Section 6",
    position: "left-[34%] top-[74%] lg:left-[34%] lg:top-[82.7%] md:left-[34%] md:top-[82.7%] lg:w-[70px] lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/8.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 7,
    name: "Section 7",
    position: "left-[34%] top-[67%] md:left-[34%] md:top-[72%] lg:left-[34%] lg:top-[72%]  lg:w-[70px]  lg:h-[68px]",
    imagePath: "/images/vilsamPageCurrentProjects/9.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 8,
    name: "Section 8",
    position: "left-[34%] top-[59%] md:left-[34%] md:top-[64%] lg:left-[34%] lg:top-[61%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/10.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 9,
    name: "Section 9",
    position: "left-[33.9%] top-[52%] lg:left-[33.9%] lg:top-[51%]   lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/vilsamPageCurrentProjects/11.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 10,
    name: "Section 10",
    position: "left-[34%] top-[43%] lg:left-[34%] lg:top-[36%]  lg:w-[70px]  lg:h-[97px]",
    imagePath: "/images/vilsamPageCurrentProjects/12.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 11,
    name: "Section 11",
    position: "left-[34%] top-[34%] md:left-[34%] md:top-[27%] lg:left-[34%] lg:top-[24%]  lg:w-[70px]  lg:h-[78px]",
    imagePath: "/images/vilsamPageCurrentProjects/13.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 12,
    name: "Section 12",
    position: "left-[88%] top-[27%] lg:left-[80%] md:top-[17%] lg:top-[13%]  lg:w-[60px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/14.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 13,
    name: "Section 13",
    position: "left-[83%] top-[35%] md:left-[85%] md:top-[29%] lg:left-[79.5%] lg:top-[27%]  lg:w-10  lg:h-16",
    imagePath: "/images/vilsamPageCurrentProjects/15.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 14,
    name: "Section 14",
    position: "left-[66%] top-[55%] lg:left-[62%] lg:top-[55%]  lg:w-[70px]  lg:h-[65px]",
    imagePath: "/images/vilsamPageCurrentProjects/16.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 15,
    name: "Section 15",
    position: "left-[67%] top-[48%] lg:left-[61.8%] lg:top-[45.8%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/vilsamPageCurrentProjects/17.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 16,
    name: "Section 16",
    position: "left-[67%] top-[42%]  md:top-[39%]  lg:left-[61.9%] lg:top-[35%] lg:w-[70px]  lg:h-[74px]",
    imagePath: "/images/vilsamPageCurrentProjects/18.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 17,
    name: "Section 17",
    position: "left-[66%] top-[34%] md:left-[67%] md:top-[27%] lg:left-[62%] lg:top-[23%]  lg:w-[70px]  lg:h-[78px]",
    imagePath: "/images/vilsamPageCurrentProjects/19.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 18,
    name: "Section 18",
    position: "left-[66%] top-[25%] md:left-[67%] md:top-[15%] lg:left-[62%] lg:top-[10%]  lg:w-[70px]  lg:h-[84px]",
    imagePath: "/images/vilsamPageCurrentProjects/20.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 19,
    name: "Section 19",
    position: "left-[55%] top-[20%] md:left-[53%] md:top-[8%] lg:left-[51%] lg:top-[5%]  lg:w-[70px]  lg:h-[54px]",
    imagePath: "/images/vilsamPageCurrentProjects/21.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 20,
    name: "Section 20",
    position: "left-[55%] top-[26%] md:left-[53%] md:top-[16%]  lg:left-[51%] lg:top-[13.6%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/22.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 21,
    name: "Section 21",
    position: "left-[54%]  top-[35%] md:left-[54%]  md:top-[27%] lg:left-[51%]  lg:top-[24.8%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/23.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 22,
    name: "Section 22",
    position: "left-[53%] top-[42%] lg:left-[51%] md:top-[39%] lg:top-[35%]  lg:w-[70px]  lg:h-[70px]",
    imagePath: "/images/vilsamPageCurrentProjects/24.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 23,
    name: "Section 23",
    position: "left-[55%] top-[73%] lg:left-[52%] lg:top-[80%] md:left-[55%] md:top-[84%]  lg:w-[100px]  lg:h-[80px]",
    imagePath: "/images/vilsamPageCurrentProjects/25.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 24,
    name: "Section 24",
    position: "left-[54%] top-[48%] lg:left-[51%] lg:top-[45.8%]  lg:w-[70px]  lg:h-[58px]",
    imagePath: "/images/vilsamPageCurrentProjects/26.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 25,
    name: "Section 25",
    position: "lg:left-[24.9%] lg:top-[25%] left-[22%] top-[35%]   lg:w-[60px]  lg:h-[100px]",
    imagePath: "/images/vilsamPageCurrentProjects/28.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    id: 26,
    name: "Section 26",
    position: "left-[54%] top-[55%] lg:left-[51%] lg:top-[55%]    lg:w-[70px]  lg:h-[55px]",
    imagePath: "/images/vilsamPageCurrentProjects/29.png",
    description: [
      {
        value: "50+ Lush Tree Cover",
        label: "Spanning the Community",
      },
      {
        value: "",
        label: "",
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

  // Debug state changes
  useEffect(() => {
    console.log("Selected location updated:", selectedLocation.name);
  }, [selectedLocation]);

  // ============= Render Helpers =============
  const renderStats = () => (
    <motion.div
      className="hidden lg:block  mt-[50px] lg2:mt-[170px] 2xl:mt-[400px]"
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
                className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
              >
                <span className="font-CandideCondensedNormal">
                  <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                </span>
                <span className="font-FreightNeoProNormal">{stat.value.replace(/\d+/g, "")}</span>
              </Typography>
              <Typography variant="custom" className="font-FreightNeoProNormal text-[24px] text-[#0C3E49]">
                {stat.label}
              </Typography>
            </motion.div>
          ))
        : selectedLocation.description.map((stat, index) => (
            <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "lg:my-10" : ""}`}>
              <Typography
                variant="custom"
                className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
              >
                <span className="font-CandideCondensedNormal">{stat.value}</span>
              </Typography>
              <Typography variant="custom" className="font-FreightNeoProNormal text-[24px] text-[#0C3E49]">
                {stat.label}
              </Typography>
            </motion.div>
          ))}
      <div className=" relative group cursor-pointer">
        <button
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
          <span className={` relative z-20 text-[#0C3E49] mt-[3px] md:mt-0 `}>More about our sustainability centric approach </span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <section
      className="flex flex-col sm:flex-col  lg:flex-row mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[13.125rem]"
      aria-labelledby="project-title"
    >
      {/* Left Column - Project Details */}
      <article className="w-full lg:w-1/2">
        <header>
          <h1
            id="project-title"
            className="w-[224px] md:w-full pt-3 md:pt-0 text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-[#0C3E49]"
          >
            Explore your <br /> Future Home
          </h1>
        </header>

        <div className="flex items-center">
          <Typography
            variant="custom"
            className="font-freightNeoMedium md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg:text-xl 2xl:text-[2.125rem] 2xl:leading-[40px] text-[#0C3E4999]"
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
      <figure className="lg:flex   items-center h-[70vh] lg2:h-[90vh] justify-center w-full lg:w-1/2 relative" aria-labelledby="project-title">
        <div className="relative w-full h-full">
          <img src={selectedLocation.imagePath} alt="Project Map" className="w-full h-full object-contain" />
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
                  className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
                >
                  <span className="font-CandideCondensedNormal">
                    <Counter value={parseInt(stat.value.replace(/\D/g, ""), 10)} />
                  </span>
                  <span className="font-FreightNeoProNormal">{stat.value.replace(/\d+/g, "")}</span>
                </Typography>
                <Typography variant="custom" className="font-FreightNeoProNormal text-[24px] text-[#0C3E49]">
                  {stat.label}
                </Typography>
              </motion.div>
            ))
          : selectedLocation.description.map((stat, index) => (
              <motion.div key={index} className={`leading-[1.1]  ${index !== 0 ? "my-10" : ""}`}>
                <Typography
                  variant="custom"
                  className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#0C3E49]"
                >
                  <span className="font-CandideCondensedNormal">{stat.value}</span>
                </Typography>
                <Typography variant="custom" className="font-FreightNeoProNormal text-[24px] text-[#0C3E49]">
                  {stat.label}
                </Typography>
              </motion.div>
            ))}
        <div className=" relative group cursor-pointer">
          <button
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
            <span className={` relative z-20 text-[#0C3E49] text-[13px] mt-[3px] md:mt-0 `}>More about our sustainability centric approach </span>
          </button>
        </div>
      </motion.div>

      <Link href="/project-enquire">
        <div className="block md:hidden w-full pt-10 text-center leading-[1]">
          <button className="flex items-center justify-center w-full h-[56px] rounded-[36px] border-[2px] border-customBrown font-FreightNeoProBold text-[22px] text-customBrown hover:bg-customBrown hover:text-white transition-colors duration-300">
            {PROJECT_DATA.cta}
          </button>
        </div>
      </Link>
    </section>
  );
};

export default CurrentProject;
