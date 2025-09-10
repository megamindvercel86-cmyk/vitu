"use client";
import React, { useState } from "react";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "react-scroll";
import { AnimatedConicButton } from "@/components/ui/moving-border";

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

interface CurrentProjectProps {
  homePage?: boolean;
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
  image: "/images/eliteProjectPageImages/eliteMapImages/map1.png",
};

const STATS_DATA = [
  {
    value: "Planned with Purpose",
    label:
      "Each of the 11 luxury villa plots at Vaikuntam City Elite is masterfully planned to reflect the elegance of elevated and wholesome living. From optimal positioning for natural light and ventilation to thoughtfully laid-out access roads and open spaces, every detail supports a life of comfort.",
  },
];

const LOCATIONS: Location[] = [
  {
    id: 1,
    name: "Section 1",
    position: "lg:left-[10%]  lg:top-[13%] left-[12%] top-[13%] md:left-[41%] md:top-[64%]  lg:w-[130px]  lg:h-[80px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map1.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
  {
    id: 2,
    name: "Section 2",
    position: "left-[12%] top-[28%] md:left-[54%] md:top-[62%] lg:left-[10%]  lg:top-[28%]   lg:w-[130px]  lg:h-[80px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map2.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 3,
    name: "Section 1",
    position: "lg:left-[10%]  lg:top-[45%]   lg:w-[130px]  lg:h-[80px] left-[11%] top-[45%] md:left-[41%] md:top-[64%]  ",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map3.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
  {
    id: 4,
    name: "Section 2",
    position: "left-[11%] top-[58%] md:left-[54%] md:top-[62%] lg:left-[10%]  lg:top-[58%]   lg:w-[130px]  lg:h-[80px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map4.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },

  {
    id: 5,
    name: "Section 2",
    position: "left-[40%] top-[45%] md:left-[54%] md:top-[62%] lg:left-[40%]  lg:top-[40%]   lg:w-[130px]  lg:h-[140px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map5.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 6,
    name: "Section 1",
    position: " left-[41%] top-[65%] md:left-[41%] md:top-[64%]  lg:left-[40%]  lg:top-[60%]   lg:w-[130px]  lg:h-[120px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map6.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
  {
    id: 7,
    name: "Section 2",
    position: "left-[70%] top-[10%] md:left-[54%] md:top-[62%] lg:left-[71%]  lg:top-[7%]   lg:w-[90px]  lg:h-[100px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map7.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 8,
    name: "Section 1",
    position: " left-[70%] top-[25%] md:left-[41%] md:top-[64%]  lg:left-[71%]  lg:top-[23%]   lg:w-[90px]  lg:h-[110px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map8.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
  {
    id: 9,
    name: "Section 2",
    position: "left-[70%] top-[40%] md:left-[54%] md:top-[62%] lg:left-[71%]  lg:top-[44%]   lg:w-[200px]  lg:h-[70px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map9.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Crafted for refined living, Signature Plots offer premium positioning within the community, blending privacy with easy access to key amenities. Ideal for those who value both elegance and connectivity in their everyday lifestyle.",
      },
    ],
  },
  {
    id: 1,
    name: "Section 1",
    position: " left-[70%] top-[58%] md:left-[41%] md:top-[64%]  lg:left-[70%]  lg:top-[56%]   lg:w-[200px]  lg:h-[90px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map10.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
  {
    id: 10,
    name: "Section 1",
    position: " left-[75%] top-[75%] md:left-[41%] md:top-[64%]  lg:left-[69%]  lg:top-[72%]   lg:w-[200px]  lg:h-[90px]",
    imagePath: "/images/eliteProjectPageImages/eliteMapImages/map11.png",
    description: [
      {
        value: "Planned with Purpose",
        label:
          "Premium Plots are thoughtfully located to offer a balance of exclusivity and convenience. These plots are ideal for families looking for a spacious foundation to build their dream home in a well-planned neighbourhood.",
      },
    ],
  },
];

// ============= Component =============
const EliteCurrentProject: React.FC<CurrentProjectProps> = ({ homePage = false }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    id: 0,
    name: "Project Overview",
    position: "left-[50%] top-[60%]",
    imagePath: PROJECT_DATA.image,
    description: STATS_DATA,
  });

  const handleMouseLeave = () => {
    setSelectedLocation({
      id: 0,
      name: "Project Overview",
      position: "left-[50%] top-[60%]",
      imagePath: "/images/eliteProjectPageImages/eliteMapImages/map.png",
      description: STATS_DATA,
    });
  };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <section
      className="flex flex-col my-20 sm:flex-col lg:min-h-[100vh]  lg:flex-row mx-[1rem] sm:mx-[1rem] md:mx-[4.125rem] lg:mx-[3.5rem] xl:mx-[9rem] items-center"
      aria-labelledby="project-title"
    >
      {/* Left Column */}
      <article className="w-full lg:w-[30%] lg:min-h-screen  h-full flex flex-col  justify-center">
        {/* {renderStats()} */}
        {selectedLocation.description.map((stat, index) => (
          <div key={index}>
            <motion.h1
              className="lg:text-[70px] xl:text-[90px] uppercase overflow-hidden text-left  text-3xl text-[#1C1213] font-FreightNeoProNormal leading-[1]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              Plotted to Perfection
            </motion.h1>

            <motion.p
              className="text-lg text-[#1C1213] font-FreightNeoProNormal text-justify mt-5 mb-10"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              Each of the <span className="font-CandideCondensedNormal">11</span> luxury villa plots at Vaikuntam City Elite is meticulously designed
              to reflect sophistication in every detail. With optimal orientation for light and ventilation, seamlessly integrated access roads, and
              expanses of open landscape, the planning ensures a lifestyle that feels both elevated and effortless.
            </motion.p>

            <motion.div
              className=" inline-flex cursor-pointer items-center gap-3 lg:font-freightNeoMedium text-center mb-8 border-[#1C1213] border text-customBrown rounded-full lg2:text-2xl text-sm font-medium lg:text-xl transition-colors w-fit"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              onClick={() => setModalIsOpen(true)}
            >
              <Link to="elitForm">
                {" "}
                <AnimatedConicButton theme="light" className="hidden !text-[#1C1213] lg:font-medium lg:font-freightNeoMedium md:flex !bg-none">
                  <span className="flex items-center">DOWNLOAD SITE-PLAN
                  <span>
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5917 16.5151L15.5377 5.68625L4.70813 5.63159" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
                      <path d="M15.5359 5.68664L5.46228 15.7603" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
                    </svg>
                  </span></span>
                </AnimatedConicButton>{" "}
              </Link>
            </motion.div>
          </div>
        ))}
      </article>

      {/* Right Column - Interactive Map */}
      <figure
        className="lg:flex ml-auto lg:min-h-screen   items-center  justify-center w-full lg:w-[65%] relative"
        aria-labelledby="project-title"
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full  lg:h-full">
          <Image width={1000} height={1000} src={selectedLocation.imagePath} alt="Project Map" className="w-full h-full object-cover" />
          <div className="absolute inset-0 z-10">
            {LOCATIONS.map((location,index) => (
              <button
                key={index}
                className={`absolute w-8 h-8 md:h-6 md:w-6 opacity-0 bg-[#503637] ${location.position}`}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => handleLocationClick(location)}
                aria-label={location.name}
              />
            ))}
          </div>
        </div>
      </figure>

      {/* Mobile Stats */}
      {/* <motion.div
        className="lg:hidden flex flex-col items-center text-center mt-8"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        aria-label="Project Statistics"
      >
        {selectedLocation.description.map((stat, index) => (
          <motion.div key={index} className={`leading-[1.1] ${index !== 0 ? "my-5" : ""} text-center`}>
            <Typography
              variant="custom"
              className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[2.5rem] 2xl:text-[5rem] text-[#503637] text-center"
            >
              {stat.value}
            </Typography>
            <Typography variant="custom" className="lg2:text-[24px] md:text-lg text-sm text-[#503637]/60 font-freightNeoMedium text-center">
              {stat.label}
            </Typography>
          </motion.div>
        ))}

        <motion.a
          className="px-8 py-3 mx-auto text-center mt-6 border-customBrown border-[2px] text-customBrown rounded-full lg2:text-2xl font-FreightNeoProBold transition-colors block w-fit"
          initial={{ y: 20, opacity: 0 }}
          onClick={() => setModalIsOpen(true)}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Download E-Brochure
        </motion.a>
      </motion.div> */}
    </section>
  );
};

export default EliteCurrentProject;
