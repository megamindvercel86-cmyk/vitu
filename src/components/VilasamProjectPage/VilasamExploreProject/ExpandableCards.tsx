import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AppleStyleCard from "@/components/ui/apple-style-card";

import Typography from "@/components/Typography/Typography";
import exploreProjects from "@/data/vilasamProject.json";
import { ArrowRightIcon } from "@/components/Icons/Icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CustomCursor from "@/components/Common/CustomCursor";
import ContactFormModal from "@/components/Common/FormModal/FormModal";
import { MdKeyboardArrowRight } from "react-icons/md";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

// Update the getBreakpoint function to match your tailwind config
const getBreakpoint = () => {
  if (typeof window === "undefined") return "md"; // Default for SSR
  if (window.innerWidth >= 2000) return "2xl";
  if (window.innerWidth >= 1580) return "xl";
  if (window.innerWidth >= 1024) return "lg";
  return "md";
};

interface FooterProps {
  onFooterClick: () => void;
  nextProjectTitle: string;
}

const Footer: React.FC<FooterProps> = ({ onFooterClick, nextProjectTitle }) => {
  return (
    <>
      <hr className="border-t-gray-200 border-[1px]" />
      <div className="lg:px-44 px-12">
        <h1 className=" pt-10 text-[10px] md:text-[12px] font-geistSerif  text-[#8E8E93] border-t-gray-200">NextUp</h1>
        <div className="flex pb-16 justify-between ">
          <button
            onClick={onFooterClick}
            className="text-[#1D1D1F] flex font-geistSerif justify-between items-center cursor-pointer font-bold text-[18px] "
          >
            {nextProjectTitle}
          </button>
          <MdKeyboardArrowRight
            onClick={onFooterClick}
            className="ml-1 cursor-pointer mt-1 text-[20px] bg-[#EADFD1] text-[#AE85668F] rounded-full md:text-[25px]"
          />
        </div>
      </div>
    </>
  );
};

// Update the CardContent component to accept props
const CardContent = ({ cardId }: { cardId: number }) => {
  const [currentCardId, setCurrentCardId] = useState(cardId);

  let project = exploreProjects.find((project) => project.id === currentCardId);

  const handleFooterClick = () => {
    const nextProject = exploreProjects.find((project) => {
      if (project.id === 5) {
        return 1 === currentCardId;
      } else {
        return project.id + 1 === currentCardId;
      }
    });

    if (nextProject) {
      setCurrentCardId(nextProject.id); // Update state to trigger re-render
    }
  };

  const nextProject = exploreProjects.find((project) => {
    if (project.id === 5) {
      return 1 === currentCardId;
    } else {
      return project.id + 1 === currentCardId;
    }
  });

  return (
    <>
      {project && (
        <div key={"dummy-content"} data-lenis-prevent>
          <Image
            src={project.fileUrl || "/placeholder.svg"}
            alt={nextProject?.title || "Card image"}
            width={1042}
            height={45}
            className={cn("object-cover   h-[652px] w-full")}
          />
          <div className="flex flex-col gap-flex  gap-12 py-12 ">
            <h2 className="text-[40px] lg:text-[48px] leading-[1.3] font-semibold  font-geistSerif px-6 lg:px-20  text-[#0C3E49]">{project.title}</h2>
            <Typography className="text-[#040707]/60 font-sourceSans3 px-6 lg:px-20 !text-xl">{project?.description1}</Typography>
            <Typography className="text-[#04070799] font-sourceSans3 px-6 lg:px-20 !text-xl">{project?.description2}</Typography>
            <Footer onFooterClick={handleFooterClick} nextProjectTitle={nextProject?.title || ""} />
          </div>
        </div>
      )}
    </>
  );
};

// Update the breakpoint positions to match your config
const expandedPositions = {
  "2xl": [
    { top: "60%", left: "20%", right: "auto" },
    { top: "50%", right: "1%", left: "auto" },
    { top: "10%", right: "1%", left: "auto" },
    { top: "45%", left: "1%", right: "auto" },
    { top: "15%", left: "3%", right: "auto" },
    { top: "15%", left: "3%", right: "auto" },
    { top: "5%", left: "53%", right: "auto" },
  ],
  xl: [
    { top: "64%", left: "25%", right: "auto" },
    { top: "50%", right: "1%", left: "auto" },
    { top: "12%", right: "1%", left: "auto" },
    { top: "50%", left: "1%", right: "auto" },
    { top: "15%", left: "3%", right: "auto" },
    { top: "5%", left: "53%", right: "auto" },
    { top: "65%", left: "53%", right: "auto" },
  ],
  lg: [
    { top: "60%", left: "30%", right: "auto" },
    { top: "32%", right: "-3%", left: "auto" },
    { top: "0%", right: "-3%", left: "auto" },
    { top: "45%", left: "-5%", right: "auto" },
    { top: "5%", left: "-1%", right: "auto" },
    { top: "55%", left: "60%", right: "auto" },
    { top: "5%", left: "43%", right: "auto" },
  ],
  md: [
    { top: "70%", left: "30%", right: "auto" },
    { top: "65%", right: "-5%", left: "auto" },
    { top: "20%", right: "-3%", left: "auto" },
    { top: "55%", left: "-5%", right: "auto" },
    { top: "23%", left: "-3%", right: "auto" },
    { top: "15%", left: "3%", right: "auto" },
    { top: "5%", left: "53%", right: "auto" },
  ],
};

const notExpandedPositions = {
  "2xl": [
    { top: "41%", left: "40%", right: "auto" },
    { top: "30%", left: "41.4%", right: "auto" },
    { top: "20%", left: "45%", right: "auto" },
    { top: "36%", left: "47%", right: "auto" },
    { top: "25%", left: "36%", right: "auto" },
    { top: "15%", left: "3%", right: "auto" },
    { top: "25%", left: "53%", right: "auto" },
  ],
  xl: [
    { top: "31%", left: "35%", right: "auto" },
    { top: "34%", left: "55%", right: "auto" },
    { top: "2%", left: "43%", right: "auto" },
    { top: "26%", left: "47%", right: "auto" },
    { top: "7%", left: "31%", right: "auto" },
    { top: "15%", left: "53%", right: "auto" },
    { top: "5%", left: "53%", right: "auto" },
  ],
  lg: [
    { top: "31%", left: "33%", right: "auto" },
    { top: "14%", left: "37%", right: "auto" },
    { top: "4%", left: "41%", right: "auto" },
    { top: "26%", left: "44%", right: "auto" },
    { top: "9%", left: "29%", right: "auto" },
    { top: "15%", left: "26%", right: "auto" },
    { top: "5%", left: "53%", right: "auto" },
  ],
  md: [
    { top: "31%", left: "30%", right: "auto" },
    { top: "16%", left: "34%", right: "auto" },
    { top: "6%", left: "38%", right: "auto" },
    { top: "26%", left: "41%", right: "auto" },
    { top: "11%", left: "27%", right: "auto" },
    { top: "15%", left: "3%", right: "auto" },
    { top: "5%", left: "53%", right: "auto" },
  ],
};

interface Card {
  id: number;
  url: string;
  width?: string;
  height?: string;
  position?: "left" | "right";
}

interface ExpandableCardsProps {
  cards: Card[];
}

const ExpandableCards: React.FC<ExpandableCardsProps> = ({ cards }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("md"); // Set default to md for SSR
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // Add mounted state
  useEffect(() => {
    setIsMounted(true);
    setCurrentBreakpoint(getBreakpoint());
  }, []);

  // Add scroll listener to detect when user scrolls away
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        // If component is not visible and it's expanded, just collapse it
        if (!isVisible) {
          setIsExpanded(false);
          // Remove the auto-scroll back
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExpanded]);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getBreakpoint());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    // Only show cursor if not expanded
    if (!isExpanded) {
      setCursorText("Click to more ");
      setCursorVariant("project");
    }
  };

  const handleMouseLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  const handleExpand = () => {
    setIsExpanded(true);

    // Smooth scroll to center when expanded
    if (!isExpanded) {
      setTimeout(() => {
        const element = containerRef.current;
        if (element) {
          const yOffset = 300;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: y,
              autoKill: false,
            },
            ease: "power2.inOut",
          });
        }
      }, 100);
    }
  };

  return (
    <div className="h-auto flex items-center justify-center">
      {!isExpanded && isMounted && <CustomCursor cursorVariant={cursorVariant} cursorText={cursorText} cursorBackground="bg-[#0C3E49]" />}
      <div
        ref={containerRef}
        className={`mx-auto w-full relative ${isExpanded ? "2xl:h-[150vh] xl:h-[180vh] lg:h-[200vh] md:h-[150vh]" : "h-[100vh]"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleExpand}
      >
        {/* Text Content */}
        <motion.div
          className="absolute md:top-[43rem] lg2:top-[35rem] lg:top-[25rem] xl:top-[35rem] 2xl:top-[50rem] text-center z-50 w-full mx-auto px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.8,
            y: isExpanded ? 0 : 20,
          }}
          transition={{ duration: 0.6, delay: isExpanded ? 0.3 : 0 }}
        >
          <div>
            <motion.p className=" font-sourceSans3 uppercase mb-4 text-[#0C3E49]" initial={{ y: 0 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
              amenities
            </motion.p>
            <motion.h1
              className="xl:text-[100px] lg:text-4xl lg2:text-7xl  md:text-5xl  font-geistSerif lg2:mb-4 text-[#0C3E49]"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Space to Settle,
            </motion.h1>
            <motion.h2
              className="xl:text-[100px] lg:text-4xl lg2:text-7xl  md:text-5xl font-geistSerif lg2:mb-4 text-[#0C3E49]"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Room to Grow
            </motion.h2>

            <motion.button
              className="lg:px-8 lg:py-3 md:px-5 md:py-2 pb-1 border-[#0C3E49] border-[2px] text-[#0C3E49] rounded-full text-xs lg2:text-[22px] font-sourceSans3 transition-colors mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsGetInTouchOpen(true)}
            >
              Download Brochure
            </motion.button>
          </div>
        </motion.div>
        {/* Images */}
        <AnimatePresence>
          {cards.map((card, index) => {
            const position = isExpanded
              ? expandedPositions[currentBreakpoint as keyof typeof expandedPositions][index]
              : notExpandedPositions[currentBreakpoint as keyof typeof notExpandedPositions][index];

            return (
              <motion.div
                key={card.id}
                className={`${card.width} ${card.height} absolute overflow-hidden`}
                initial={false}
                animate={{
                  top: position.top,
                  left: position.left,
                  right: "right" in position ? position.right : "auto",
                  zIndex: isExpanded ? 1 : cards.length - index,
                  borderRadius: "16px",
                }}
                style={{
                  borderRadius: "16px",
                }}
              >
                <AppleStyleCard
                  id={card.id}
                  position={card.position}
                  imageSrc={card.url}
                  isExpanded={isExpanded}
                  expandedImageClassName="object-center"
                  content={<CardContent cardId={card.id} />}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <ContactFormModal isOpen={isGetInTouchOpen} onClose={setIsGetInTouchOpen} />
    </div>
  );
};

export default ExpandableCards;
