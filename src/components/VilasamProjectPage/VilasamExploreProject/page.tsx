"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Typography from "../../Typography/Typography";
import InfiniteCarousel from "../../Common/InfiniteCarousel/InfiniteCarousel";
import exploreProjects from "@/data/vilasamProject.json";
import ExpandableCards from "./ExpandableCards";


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
    id: 1,
    url: "/images/vilasamPageImages/broucherImages/1.jpg",
    fileUrl: "/images/vilasamPageImages/broucherImages/1.jpg",
    className: "absolute left-[323px] rounded-[20px] z-20",
    startPosition: { y: 100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 2,
    url: "/images/vilasamPageImages/broucherImages/2.jpg",
    fileUrl: "/images/vilasamPageImages/broucherImages/2.jpg",
    className: "absolute left-[323px] rounded-[20px] z-20",
    startPosition: { y: 100 },
    isViewMore: true,
    position: "left",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 4,
    url: "/images/vilasamPageImages/broucherImages/4.jpg",
    fileUrl: "/images/vilasamPageImages/broucherImages/4.jpg",
    className: "absolute left-[323px] rounded-[20px] z-20",
    startPosition: { y: 100 },
    isViewMore: true,
    position: "left",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 3,
    url: "/images/vilasamPageImages/broucherImages/3.jpg",
    fileUrl: "/images/vilasamPageImages/broucherImages/3.jpg",
    className: "absolute right-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 5,
    url: "/images/vilasamPageImages/broucherImages/5.jpg",
    fileUrl: "/images/vilasamPageImages/broucherImages/5.jpg",
    className: "absolute xl:right-[56px] md:right-[-150px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 30,
    url: "/images/vilasamPageImages/broucherImages/6.jpg",
    fileUrl: "/images/vilasamPageImages/broucherImages/6.jpg",
    className: "absolute left-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 31,
    url: "/images/vilasamPageImages/broucherImages/7.jpg",
    fileUrl: "/images/vilasamPageImages/broucherImages/7.jpg",
    className: "absolute xl:left-[70px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px]  xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px]   xl:h-[350px] 2xl:h-[505px]",
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
const VilasamExploreProjects: React.FC = () => {
  return (
    <>
      {/* Desktop Version */}
      <div className="md:block hidden relative z-0 overflow-hidden" id="sustainability">
        <ExpandableCards cards={CARDS_DATA} />
      </div>

      {/* Mobile Version */}
      <div className="md:hidden block pb-5 " id="sustainability">
        {/* Mobile Title Section */}
        <div className="w-full flex flex-col items-center justify-center text-center pt-10">
          <Typography variant="custom" className="text-xl lg:text-[] text-[#0C3E49] font-freightNeoSemibold">
          Space to Settle,
          </Typography>
          <Typography variant="custom" className="text-2xl text-[#0C3E49] font-freightNeoSemibold">
          Room to Grow
          </Typography>
        </div>

        {/* Mobile Carousel */}
        <InfiniteCarousel cards={CARDS_DATA} data={exploreProjects} />

        {/* Mobile CTA Button */}
        {/* <div className="w-full px-7 flex flex-col items-center justify-center text-center leading-[1] pt-10">
          <button className="items-center pb-1 w-full h-[56px] rounded-[36px] border-[2px] border-[#0C3E49] text-[#0C3E49] text-[22px] font-FreightNeoProBold hover:bg-[#0C3E49] hover:text-white transition-colors duration-300">
            Explore the Project Now
          </button>
        </div> */}
      </div>
    </>
  );
};

export default VilasamExploreProjects;
