import React from "react";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";

// ============= Constants =============
const PROJECT_DATA = {
  title: "Vaikuntam City",
  badge: "Limited Plots Available",
  description: {
    prefix: "Just ",
    number: "5",
    suffix: " minutes away from the serene NITK Surathkal beach, our premium plotted development offers unparalleled access to coastal beauty."
  },
  cta: "Explore the Project Now",
  image: "/images/visionAndFutureImages/image5.png",
};

const STATS_DATA = [
  {
    value: "500+",
    label: "Tree Cover",
  },
  {
    value: "20,000 sq.ft.",
    label: "Spacious Clubhouse",
  },
  {
    value: "3,400+ sq.m.",
    label: "Parks & Open Spaces",
  },
];

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
        <div key={index} className={`leading-[1.1] ${index !== 0 ? 'lg:my-10' : ''}`}>
          <Typography
            variant="custom"
            className="font-FreightNeoProNormal text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] text-[#503637]"
          >
            {stat.value}
          </Typography>
          <Typography
            variant="custom"
            className="font-FreightNeoProNormal text-[24px] text-[#503637]"
          >
            {stat.label}
          </Typography>
        </div>
      ))}
    </div>
  );

  return (
    <section className="flex flex-col sm:flex-col lg:flex-row mx-[1.8125rem] sm:mx-[1.8125rem] md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[13.125rem]" aria-labelledby="project-title">
      {/* Left Column - Project Details */}
      <article className="w-full lg:w-1/2">
        <header>
          {/* Project Badge */}
          <div className="flex items-center justify-center w-[166px] h-[34px] pt-1 rounded-md bg-[#AE856614] 2xl:w-[280px] 2xl:text-[1.5rem]" aria-label="Project Availability">
            <Typography variant="custom" className="font-FreightNeoProNormal text-customBrown">
              {PROJECT_DATA.badge}
            </Typography>
          </div>
          {/* Project Title */}
          <h1 id="project-title" className="w-[224px] md:w-full pt-3 md:pt-0 text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-customBrown">
            {PROJECT_DATA.title}
          </h1>
        </header>
        
        {/* Project Description */}
        <div className="flex items-center">
          <Typography
            variant="custom"
            className="font-freightNeoMedium md:max-w-[553px] xl:max-w-[458px] 2xl:max-w-[855px] lg:text-xl 2xl:text-[2.125rem] 2xl:leading-[40px] text-[#4F373799]"
          >
            {PROJECT_DATA.description.prefix}
            <span className="font-CandideCondensedMedium">{PROJECT_DATA.description.number}</span>
            {PROJECT_DATA.description.suffix}
          </Typography>
        </div>

        {/* Desktop CTA */}
        <div className="mt-[29px]">
          <button className="hidden md:block items-center justify-center text-center w-[287px] h-14 rounded-[36px] border-[2px] border-customBrown bg-none font-FreightNeoProBold text-[22px] text-customBrown 2xl:w-[480px] 2xl:h-[66px] 2xl:text-[2.125rem]">
            {PROJECT_DATA.cta}
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
      <div className="block md:hidden w-full pt-10 text-center leading-[1]">
        <button className="flex items-center justify-center w-full h-[56px] rounded-[36px] border-[2px] border-customBrown font-FreightNeoProBold text-[22px] text-customBrown hover:bg-customBrown hover:text-white transition-colors duration-300">
          {PROJECT_DATA.cta}
        </button>
      </div>
    </section>
  );
};

export default CurrentProject;
