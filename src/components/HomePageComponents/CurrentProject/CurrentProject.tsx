import React from "react";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";

// ============= Constants =============
const PROJECT_DATA = {
  title: "Vaikuntam City",
  badge: "Limited Plots Available",
  description: "Just 5 minutes away from the serene NITK Surathkal beach, our premium plotted development offers unparalleled access to coastal beauty.",
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
    <div className="mt-[188px] hidden md:block">
      {STATS_DATA.map((stat, index) => (
        <div key={index} className={`${index !== 0 ? 'my-10' : ''} leading-[1.1]`}>
          <Typography
            variant="custom"
            className="text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem]  lg2:text-[3.5rem] 2xl:text-[5rem] font-FreightNeoProNormal text-[#503637]"
          >
            {stat.value}
          </Typography>
          <Typography
            variant="custom"
            className="text-[24px] font-FreightNeoProNormal text-[#503637]"
          >
            {stat.label}
          </Typography>
        </div>
      ))}
    </div>
  );

  return (
    <div className="xl:mx-[210px] lg:mx-[122px] md:mx-[60px] mx-[28px] sm:mx-[28px] flex lg:flex-row sm:flex-col flex-col">
      {/* Left Column - Project Details */}
      <div className="md:w-1/2 w-full">
        {/* Project Badge */}
        <div className="bg-[#AE856614] rounded-md w-[166px] h-[34px] text-center flex items-center justify-center pt-1">
          <Typography variant="custom" className="text-customBrown font-FreightNeoProNormal">
            {PROJECT_DATA.badge}
          </Typography>
        </div>
        {/* Project Title */}
        <Typography
          variant="custom"
          className="text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem]  lg2:text-[3.5rem] 2xl:text-[5rem] w-[224px] md:w-full font-freightNeoMedium leading-[28px] 2xl:leading-[100px] md:leading-[72px] xl:leading-[67px] text-customBrown md:pt-0 pt-3"
        >
          {PROJECT_DATA.title}
        </Typography>

        {/* Project Description */}
        <Typography
          variant="custom"
          className="text-[#4F373799] font-freightNeoMedium text-lg md:max-w-[553px] xl:max-w-[458px]"
        >
          {PROJECT_DATA.description}
        </Typography>

        {/* Desktop CTA */}
        <div className="mt-[29px]">
          <button className="hidden md:block bg-none rounded-[36px] border-[2px] w-[287px] h-14 border-customBrown text-[22px] font-FreightNeoProBold text-customBrown items-center justify-center text-center">
            {PROJECT_DATA.cta}
          </button>
        </div>

        {/* Project Stats */}
        {renderStats()}
      </div>

      {/* Right Column - Project Image */}
      <div className="md:w-1/2 w-full">
        <Image
          src={PROJECT_DATA.image}
          width={708}
          height={400}
          alt={PROJECT_DATA.title}
          quality={100}
        />
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden block w-full items-center justify-center text-center leading-[1] pt-10">
        <button className="items-center w-full h-[56px] rounded-[36px] border-[2px] border-customBrown text-customBrown text-[22px] font-FreightNeoProBold hover:bg-customBrown hover:text-white transition-colors duration-300">
          {PROJECT_DATA.cta}
        </button>
      </div>
    </div>
  );
};

export default CurrentProject;
