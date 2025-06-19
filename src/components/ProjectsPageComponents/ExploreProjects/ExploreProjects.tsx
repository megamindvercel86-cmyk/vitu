"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Typography from "../../Typography/Typography";
import InfiniteCarousel from "../../Common/InfiniteCarousel/InfiniteCarousel";
import exploreProjects from "@/data/exploreProjects.json";
import ExpandableCards from "../ExpandableCards/ExpandableCards";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface Card {
  id: number;
  url: string;
  className: string;
  startPosition: { x?: number; y?: number };
  isViewMore?: boolean;
  position?: "left" | "right";
  width?: string;
  height?: string;
  fileUrl?: string;
}

const CARDS_DATA: Card[] = [
  {
    id: 5,
    url: "/images/exploreProjectImages/4.png",
    fileUrl: "/images/exploreProjectImages/4.png",
    className: "absolute left-[323px] rounded-[20px] z-20",
    startPosition: { y: 100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px]  lg:w-[150px]  xl:w-[247px] 2xl:w-[418px]  lg2:w-[200px]",
    height: "md:h-[270px] lg:h-[200px]   xl:h-[350px] 2xl:h-[505px] lg2:h-[250px]",
  },
  {
    id: 4,
    url: "/images/exploreProjectImages/5.png",
    fileUrl: "/images/exploreProjectImages/5.png",
    className: "absolute right-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
    isViewMore: true,
    position: "left",
    width: "md:w-[220px]  lg:w-[150px]  xl:w-[247px] 2xl:w-[418px]  lg2:w-[200px]",
    height: "md:h-[270px] lg:h-[200px]   xl:h-[350px] 2xl:h-[505px] lg2:h-[300px]",
  },
  {
    id: 2,
    url: "/images/exploreProjectImages/2.png",
    fileUrl: "/images/exploreProjectImages/2.png",
    className: "absolute xl:right-[56px] md:right-[-150px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
    isViewMore: true,
    position: "left",
    width: "md:w-[220px]  lg:w-[150px]  xl:w-[247px] 2xl:w-[418px]  lg2:w-[200px]",
    height: "md:h-[270px] lg:h-[200px]   xl:h-[350px] 2xl:h-[505px] lg2:h-[300px]",
  },
  {
    id: 3,
    url: "/images/exploreProjectImages/3.png",
    fileUrl: "/images/exploreProjectImages/3.png",
    className: "absolute left-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px]  lg:w-[200px]  xl:w-[247px] 2xl:w-[418px]  lg2:w-[230px]",
    height: "md:h-[270px] lg:h-[250px]   xl:h-[350px] 2xl:h-[505px] lg2:h-[300px]",
  },
  {
    id: 1,
    url: "/images/exploreProjectImages/1.png",
    fileUrl: "/images/exploreProjectImages/1.png",
    className: "absolute xl:left-[70px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px]  lg:w-[200px]  xl:w-[247px] 2xl:w-[418px]  lg2:w-[230px]",
    height: "md:h-[270px] lg:h-[250px]   xl:h-[350px] 2xl:h-[505px] lg2:h-[300px]",
  },
  {
    id: 22,
    url: "/images/vilasamPageImages/1.webp",
    fileUrl: "/images/vilasamPageImages/1.webp",
    className: "absolute xl:left-[70px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px]  lg:w-[200px]  xl:w-[200px] 2xl:w-[418px]  lg2:w-[200px]",
    height: "md:h-[270px] lg:h-[250px]   xl:h-[280px] 2xl:h-[505px] lg2:h-[250px]",
  },
  {
    id: 23,
    url: "/images/timelineImages/timelineImage8.png",
    fileUrl: "/images/timelineImages/timelineImage8.png",
    className: "absolute xl:left-[70px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px]  lg:w-[200px]   xl:w-[200px] 2xl:w-[418px]  lg2:w-[200px]",
    height: "md:h-[270px] lg:h-[250px]   xl:h-[280px] 2xl:h-[505px] lg2:h-[250px]",
  },
];

/**
 * Explore Projects Component
 * Showcases project cards with animations and responsive layouts
 *
 * Features:
 * 1. Desktop: Expandable cards with GSAP animations
 * 2. Mobile: Infinite carousel
 * 3. Responsive design with different layouts
 * 4. Interactive animations on scroll
 *
 * @component
 */
const ExploreProjects: React.FC = () => {
  return (
    <>
      {/* Desktop Version */}
      <div className="md:block hidden relative z-0 overflow-hidden">
        <Typography className=" text-center font-FreightNeoProNormal text-base text-[#4F373799] lg:text-xl 2xl:text-[2.125rem]">
          Featured Project
        </Typography>
        <h1
          className="w-[224px] pb-16 text-center hidden lg:block md:w-full text-2xl lg:text-5xl lg2:text-6xl font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] 2xl:leading-[100px] text-[#503637]"
        >
          A New Home, A New Way of Life
        </h1>
        <ExpandableCards  cards={CARDS_DATA} />
      </div>

      {/* Mobile Version */}
      <div className="md:hidden block pb-5 ">
        {/* Mobile Title Section */}
        <div className="w-full flex flex-col items-center justify-center text-center pt-10">
          <Typography variant="custom" className="text-2xl lg:text-[] text-customBrown font-freightNeoSemibold">
            A New Home
          </Typography>
          <Typography variant="custom" className="text-2xl text-customBrown font-freightNeoSemibold">
            A New Way of Life
          </Typography>
        </div>

        {/* Mobile Carousel */}
        <InfiniteCarousel cards={CARDS_DATA} data={exploreProjects} />

        {/* Mobile CTA Button */}
        {/* <div className="w-full px-7 flex flex-col items-center justify-center text-center leading-[1] pt-10">
          <button className="items-center pb-1 w-full h-[56px] rounded-[36px] border-[2px] border-customBrown text-customBrown text-[22px] font-FreightNeoProBold hover:bg-customBrown hover:text-white transition-colors duration-300">
            Explore the Project Now
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ExploreProjects;
