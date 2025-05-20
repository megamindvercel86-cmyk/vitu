"use client";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Typography from "../../Typography/Typography";
import InfiniteCarousel from "../../Common/InfiniteCarousel/InfiniteCarousel";
import exploreProjects from "@/data/vilasamProject.json";
import ExpandableCards from "./ExpandableCards";
import Link from "next/link";

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
    url: "/images/vilasamPageImages/broucherImages/1.webp",
    fileUrl: "/images/vilasamPageImages/broucherImages/1.webp",
    className: "absolute left-[323px] rounded-[20px] z-20",
    startPosition: { y: 100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 2,
    url: "/images/vilasamPageImages/broucherImages/2.webp",
    fileUrl: "/images/vilasamPageImages/broucherImages/2.webp",
    className: "absolute left-[323px] rounded-[20px] z-20",
    startPosition: { y: 100 },
    isViewMore: true,
    position: "left",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 4,
    url: "/images/vilasamPageImages/broucherImages/4.webp",
    fileUrl: "/images/vilasamPageImages/broucherImages/4.webp",
    className: "absolute left-[323px] rounded-[20px] z-20",
    startPosition: { y: 100 },
    isViewMore: true,
    position: "left",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 3,
    url: "/images/vilasamPageImages/broucherImages/3.webp",
    fileUrl: "/images/vilasamPageImages/broucherImages/3.webp",
    className: "absolute right-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 5,
    url: "/images/vilasamPageImages/broucherImages/5.webp",
    fileUrl: "/images/vilasamPageImages/broucherImages/5.webp",
    className: "absolute xl:right-[56px] md:right-[-150px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: 100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 30,
    url: "/images/vilasamPageImages/broucherImages/6.webp",
    fileUrl: "/images/vilasamPageImages/broucherImages/6.webp",
    className: "absolute left-[42px] w-[348px] h-[435px] rounded-[20px] z-20",
    startPosition: { x: -100 },
    isViewMore: true,
    position: "right",
    width: "md:w-[220px] lg2:w-[298px] lg:w-[200px] xl:w-[247px] 2xl:w-[418px]",
    height: "md:h-[270px] lg2:h-[385px] lg:h-[250px] xl:h-[350px] 2xl:h-[505px]",
  },
  {
    id: 31,
    url: "/images/vilasamPageImages/broucherImages/7.webp",
    fileUrl: "/images/vilasamPageImages/broucherImages/7.webp",
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
interface VilasamExploreProjectsProps {
  homePage?: boolean;
}

const VilasamExploreProjects: React.FC<VilasamExploreProjectsProps> = ({ homePage = false }) => {
  const textColor = homePage ? "text-customBrown" : "text-[#0C3E49]";
  const controlButtonBg = homePage ? "customBrown" : "[#0C3E49]";

  return (
    <>
      {/* Desktop Version */}
      <div className="md:block hidden relative z-0 overflow-hidden" >
        <ExpandableCards cards={CARDS_DATA} textColor={textColor} borderColor={controlButtonBg}/>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden block pb-5 " >
        {/* Mobile Title Section */}
        <div className={`w-full flex flex-col ${textColor} items-center justify-center text-center `}>
          <Typography variant="custom" className={`text-xl lg:text-[]  font-geistSerif`}>
            A New Home,
          </Typography>
          <Typography variant="custom" className="text-2xl  font-geistSerif">
            A New Way of Life
          </Typography>
        </div>

        {/* Mobile Carousel */}
        <InfiniteCarousel iconColor="#0C3E49" controlButtonBg={controlButtonBg} cards={CARDS_DATA} data={exploreProjects} />

        {/* Mobile CTA Button */}
        <Link href="/vilasam">
          <div className="w-full px-7 flex flex-col items-center justify-center text-center leading-[1] pt-6">
            <button
              className={`border-${controlButtonBg} ${textColor}  items-center pb- w-full h-[56px] rounded-[36px] border-[2px] text-[22px] font-FreightNeoProBold hover:bg-[#0C3E49] hover:text-white transition-colors duration-300 `}
            >
              Explore the Project Now
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default VilasamExploreProjects;
