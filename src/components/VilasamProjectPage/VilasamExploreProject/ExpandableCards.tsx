import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AppleStyleCard from "@/components/ui/apple-style-card";
import Typography from "@/components/Typography/Typography";
import exploreProjects from "@/data/vilasamProject.json";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CustomCursor from "@/components/Common/CustomCursor";
import ContactFormModal from "@/components/Common/FormModal/FormModal";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSafeSpecialCharacters } from "@/hooks/useSafeSpecialCharacters";


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
      <hr className="border-t-gray-200 border-[1px] mt-12" />
      <div className="lg:px-44 px-12">
        <h1 className=" pt-10 text-[10px] md:text-[12px] font-theSeasons  text-[#0C3E4999] border-t-gray-200">NextUp</h1>
        <div className="flex pb-16 justify-between ">
          <button
            aria-label="Next Project"
            onClick={onFooterClick}
            className="text-[#0C3E49] flex font-theSeasons justify-between items-center cursor-pointer font-bold text-[18px] "
          >
            {useSafeSpecialCharacters(nextProjectTitle)}
          </button>
          <MdKeyboardArrowRight
            onClick={onFooterClick}
            className="ml-1 cursor-pointer mt-1 text-[20px] bg-[#0c3e4965] text-[#0C3E49] rounded-full md:text-[25px]"
          />
        </div>
      </div>
    </>
  );
};

// Update the CardContent component to accept props
const CardContent = ({ cardId, textStyle, textColor }: { cardId: number; textStyle?: string; textColor?: string }) => {
  const [currentCardId, setCurrentCardId] = useState(cardId);

  // Get current project dynamically
  const project = exploreProjects.find((project) => project.id === currentCardId);

  // Get index of the current project
  const currentIndex = exploreProjects.findIndex((p) => p.id === currentCardId);

  // Get next project using modular logic to loop back
  const nextProject = exploreProjects[(currentIndex + 1) % exploreProjects.length];

  const handleFooterClick = () => {
    setCurrentCardId(nextProject.id);
  };

  if (!project) {
    console.error(`Project with id ${cardId} not found`);
    return null;
  }

  return (
    <>
      <div key={"dummy-content"} data-lenis-prevent className={textStyle}>
        <Image
          src={project.fileUrl || "/placeholder.svg"}
          alt={project.title || "Card image"}
          width={1042}
          height={45}
          className={cn("object-cover h-[74vh] w-full")}
        />
        <h2 className={`${textColor} text-[40px] lg:text-[48px] leading-[1.3] font-semibold pt-24 px-6 lg:px-20`}>
          {project.title.split("").map((char: string, index: number) => (
            <span key={index} className={/\d/.test(char) ? "font-theSeasons" : ""}>
              {useSafeSpecialCharacters(char)}
            </span>
          ))}
        </h2>
        <h3 className={`${textColor} text-[20px] lg:text-[28px] leading-[1.3] font-medium px-6 lg:px-20 pb-6 text-[#040707CC]`}>
          {project.subtitle.split("").map((char: string, index: number) => (
            <span key={index} className={/\d/.test(char) ? "font-theSeasons" : ""}>
              {useSafeSpecialCharacters(char)}
            </span>
          ))}
        </h3>

        <div className={`${textColor} flex flex-col gap-flex gap-6`}>
          <Typography className="text-[#0C3E4999] px-6 lg:px-20 !text-xl font-ttCommons">
            {project.description1.split("").map((char: string, index: number) => (
              <span key={index} className={/\d/.test(char) ? "font-ttCommons" : ""}>
                {useSafeSpecialCharacters(char)}
              </span>
            ))}
          </Typography>
          <Typography className="text-[#0C3E4999] px-6 lg:px-20 !text-xl font-ttCommons">
            {project.description2.split("").map((char: string, index: number) => (
              <span key={index} className={/\d/.test(char) ? "font-ttCommons" : ""}>
                {useSafeSpecialCharacters(char)}
              </span>
            ))}
          </Typography>
          <Footer onFooterClick={handleFooterClick} nextProjectTitle={nextProject?.title || ""} />
        </div>
      </div>
    </>
  );
};

// Update the breakpoint positions to match your config
const expandedPositions = {
  "2xl": [
    { top: "60%", left: "20%", right: "auto" },
    { top: "50%", right: "3%", left: "auto" },
    { top: "10%", right: "3%", left: "auto" },
    { top: "45%", left: "3%", right: "auto" },
    { top: "15%", left: "3%", right: "auto" },
    { top: "10%", left: "31%", right: "auto" },
    { top: "64%", left: "60%", right: "auto" },
  ],
  xl: [
    { top: "55%", left: "43.5%", right: "auto" },   //5
    { top: "50%", right: "4%", left: "auto" },    //7
    { top: "6%", right: "4%", left: "auto" },      //3
    { top: "50%", left: "4%", right: "auto" },     //4
    { top: "6%", left: "4%", right: "auto" },      //1
    { top: "1%", left: "28%", right: "auto" },     //2
    { top: "1%", left: "58%", right: "auto" },     ///6
  ],
  lg2: [
    { top: "25%", left: "30%", right: "auto" },
    { top: "50%", right: "3%", left: "auto" },
    { top: "20%", right: "3%", left: "auto" },
    { top: "45%", left: "3%", right: "auto" },
    { top: "12%", left: "3%", right: "auto" },
    { top: "10%", left: "28%", right: "auto" },
    { top: "60%", left: "55%", right: "auto" },
  ],
  lg: [
    { top: "63%", left: "43%", right: "auto" },   //5
    { top: "54%", right: "4%", left: "auto" },    //7
    { top: "6%", right: "4%", left: "auto" },      //3
    { top: "54%", left: "4%", right: "auto" },     //4
    { top: "6%", left: "4%", right: "auto" },      //1
    { top: "1%", left: "28%", right: "auto" },     //2
    { top: "1%", left: "58%", right: "auto" },     ///6
  ],
  md: [
    { top: "70%", left: "30%", right: "auto" },
    { top: "65%", right: "5%", left: "auto" },
    { top: "10%", right: "3%", left: "auto" },
    { top: "55%", left: "5%", right: "auto" },
    { top: "13%", left: "3%", right: "auto" },
    { top: "10%", left: "38%", right: "auto" },
    { top: "43%", right: "3%", left: "auto" },
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
  title?: string;
  position?: "left" | "right";
}

interface ExpandableCardsProps {
  cards: Card[];
  textColor?: string;
  borderColor?: string;
  textStyle?: string;
}

const ExpandableCards: React.FC<ExpandableCardsProps> = ({ cards, textColor = "", borderColor = "", textStyle = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBreakpoint, setCurrentBreakpoint] = useState("md");
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
      setCursorText("Click to Explore ");
      setCursorVariant("project");
    }
  };

  const handleMouseLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(true);

    // Smooth scroll to center when expanded
    if (!isExpanded) {
      setTimeout(() => {
        const element = containerRef.current;
        if (element) {
          const yOffset = 0;
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
    <div id="carousal" className="h-auto flex items-center justify-center">
      {!isExpanded && isMounted && <CustomCursor cursorVariant={cursorVariant} cursorText={cursorText} fontClass="font-ttCommons" cursorBackground={`bg-${borderColor}`} />}
      <div
        ref={containerRef}
        className={`mx-auto w-full relative font-ttCommons ${isExpanded ? "2xl:h-[130vh] xl:h-[120vh] lg:h-[100vh] lg2:h-[100vh] md:h-[100vh]" : "h-[90vh] xl:h-[70vh] cursor-pointer"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={!isExpanded ? handleExpand : undefined}
      >
        {/* Text Content */}
        <motion.div
          className="absolute md:top-[22rem]  lg:top-[13rem]  xl:top-[21rem] lg2:top-[17rem] 2xl:top-[50rem] text-center z-50 w-full mx-auto px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.8,
            y: isExpanded ? 0 : 10,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: isExpanded ? 0.3 : 0 }}
        >
          <div className={`${textColor} ${textStyle}`}>
            <motion.p className=" uppercase mb-4" initial={{ y: 0 }} animate={{ y: 0 }} transition={{ delay: 0.4 }}>
              amenities
            </motion.p>
            <motion.h1
              className="xl:text-[80px]  lg:text-4xl lg2:text-5xl  md:text-5xl  xl:mb-4 "
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Space to Settle, Room to Grow
            </motion.h1>
            {/* <motion.h2
              className="xl:text-[100px] lg:text-4xl  lg2:text-5xl md:text-5xl xl:mb-4"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Room to Grow
            </motion.h2> */}

            <motion.button
              className={`lg:px-8 lg:py-3 md:px-5 md:py-2 pb-1 border-${borderColor} border-[2px] rounded-full text-xs lg2:text-[18px] xl:text-[22px] ${textStyle}  transition-colors mt-6`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setIsGetInTouchOpen(true)}
            >
              {useSafeSpecialCharacters("Download E-Brochure")}
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
                className={`${card.width} ${card.height} absolute overflow-hidden group cursor-pointer`}
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
                  pointerEvents: "auto",
                  touchAction: "manipulation",
                }}
                onClick={handleExpand}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleExpand(e as any);
                  }
                }}
              >
                <div className="relative h-full w-full group">
                  <AppleStyleCard
                    id={card.id}
                    position={card.position}
                    imageSrc={card.url}
                    isExpanded={isExpanded}
                    expandedImageClassName="object-center"
                    content={<CardContent textColor={textColor} cardId={card.id} textStyle={textStyle} />}
                  />
                  {isExpanded && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-50 pointer-events-none">
                      <span className={`text-white text-sm lg:text-xl text-center px-4 ${textStyle}`}>{useSafeSpecialCharacters(card.title)}{ }</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <ContactFormModal
        isOpen={isGetInTouchOpen}
        onClose={setIsGetInTouchOpen}
        collectionName="vilasam"
        thankYouRoute="/vilasam/thank-you"
        downloadFileLink="/downloadingFiles/VITU Realty - Vilasam.pdf"
      />
    </div>
  );
};

export default ExpandableCards;
