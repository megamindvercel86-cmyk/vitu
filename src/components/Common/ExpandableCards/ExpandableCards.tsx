import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AppleStyleCard from "@/components/ui/apple-style-card";
import CustomCursor from "../CustomCursor";
import Typography from "@/components/Typography/Typography";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

// Update the getBreakpoint function to match your tailwind config
const getBreakpoint = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth >= 2000) return "2xl";
    if (window.innerWidth >= 1580) return "xl";
    if (window.innerWidth >= 1024) return "lg";
    return "md"; // default fallback
  }
  return "lg"; // default fallback for SSR
};
const DummyContent = () => {
  return (
    <>
      <div key={"dummy-content"}>
        <Typography variant="h1" className="text-customBrown">
          Foundations for the Future
        </Typography>
        <Typography
          variant="h2"
          className="font-freightNeoMedium text-[#040707CC] !text-[22px]"
        >
          Building Sustainably for a Better Tomorrow
        </Typography>
        <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[50px]">
          At Vitu Realty, we believe that the future of real estate lies not
          only in the structures we create but in the positive impact they have
          on the environment and the communities they serve. Sustainability is
          more than just a buzzword—it’s a guiding principle that informs every
          aspect of our building practices. As we move into the future, it is
          our responsibility to ensure that the properties we develop and the
          spaces we design are both environmentally friendly and future-ready.
        </Typography>
        <Typography
          variant="h2"
          className="font-freightNeoSemibold text-[#040707CC] !text-[26px] pt-[45px]"
        >
          Why Sustainable Building Matters
        </Typography>
      </div>
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
  ],
  xl: [
    { top: "64%", left: "25%", right: "auto" },
    { top: "50%", right: "1%", left: "auto" },
    { top: "0%", right: "1%", left: "auto" },
    { top: "50%", left: "1%", right: "auto" },
    { top: "5%", left: "3%", right: "auto" },
  ],
  lg: [
    { top: "65%", left: "30%", right: "auto" },
    { top: "50%", right: "-10%", left: "auto" },
    { top: "0%", right: "-3%", left: "auto" },
    { top: "45%", left: "-5%", right: "auto" },
    { top: "5%", left: "-1%", right: "auto" },
  ],
  md: [
    { top: "70%", left: "30%", right: "auto" },
    { top: "65%", right: "-5%", left: "auto" },
    { top: "20%", right: "-3%", left: "auto" },
    { top: "55%", left: "-5%", right: "auto" },
    { top: "23%", left: "-3%", right: "auto" },
  ],
};

const notExpandedPositions = {
  "2xl": [
    { top: "41%", left: "40%", right: "auto" },
    { top: "30%", left: "41.4%", right: "auto" },
    { top: "20%", left: "45%", right: "auto" },
    { top: "36%", left: "47%", right: "auto" },
    { top: "25%", left: "36%", right: "auto" },
  ],
  xl: [
    { top: "31%", left: "35%", right: "auto" },
    { top: "12%", left: "39%", right: "auto" },
    { top: "2%", left: "43%", right: "auto" },
    { top: "26%", left: "47%", right: "auto" },
    { top: "7%", left: "31%", right: "auto" },
  ],
  lg: [
    { top: "31%", left: "33%", right: "auto" },
    { top: "14%", left: "37%", right: "auto" },
    { top: "4%", left: "41%", right: "auto" },
    { top: "26%", left: "44%", right: "auto" },
    { top: "9%", left: "29%", right: "auto" },
  ],
  md: [
    { top: "31%", left: "30%", right: "auto" },
    { top: "16%", left: "34%", right: "auto" },
    { top: "6%", left: "38%", right: "auto" },
    { top: "26%", left: "41%", right: "auto" },
    { top: "11%", left: "27%", right: "auto" },
  ],
};

interface Card {
  id: number;
  url: string;
  width?: string;
  height?: string;
}

interface ExpandableCardsProps {
  cards: Card[];
}

const ExpandableCards: React.FC<ExpandableCardsProps> = ({ cards }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(getBreakpoint());

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
    setIsExpanded(!isExpanded);

    // Smooth scroll to center when expanded
    if (!isExpanded) {
      setTimeout(() => {
        const element = containerRef.current;
        if (element) {
          const yOffset = 300;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

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
      {/* Only render cursor when not expanded */}
      {!isExpanded && (
        <CustomCursor cursorVariant={cursorVariant} cursorText={cursorText} />
      )}
      <div
        ref={containerRef}
        className={`mx-auto w-full relative ${isExpanded ? "2xl:h-[150vh] xl:h-[180vh] lg:h-[150vh] md:h-[150vh]" : "h-[100vh]"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleExpand}
      >
        {/* Text Content */}
        <motion.div
          className="absolute md:top-[36rem] lg:top-[28rem] xl:top-[35rem] 2xl:top-[50rem] text-center z-50 w-full mx-auto px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.8,
            y: isExpanded ? 0 : 20,
          }}
          transition={{ duration: 0.6, delay: isExpanded ? 0.3 : 0 }}
        >
          <div>
            <motion.h1
              className="xl:text-[120px]  md:text-7xl  font-freightNeoMedium mb-4 text-customBrown"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
            >
              A New Home,
            </motion.h1>
            <motion.h2
              className="xl:text-[120px] md:text-7xl font-freightNeoMedium mb-4 text-customBrown"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A New Way of Life
            </motion.h2>
            <motion.button
              className="px-8 py-3 border-customBrown border-[2px] text-customBrown rounded-full lġ2:text-[22px] font-FreightNeoProBold transition-colors"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              Explore the Project Now
            </motion.button>
          </div>
        </motion.div>
        {/* Images */}
        <AnimatePresence>
          {cards.map((card, index) => {
            const position = isExpanded
              ? expandedPositions[
                  currentBreakpoint as keyof typeof expandedPositions
                ][index]
              : notExpandedPositions[
                  currentBreakpoint as keyof typeof notExpandedPositions
                ][index];

            return (
              <motion.div
                key={card.id}
                className={`${card.width} ${card.height} absolute overflow-hidden`}
                initial={false}
                animate={{
                  // scale: isExpanded ? 1 : 1 - index * 0.05,
                  top: position.top,
                  left: position.left,
                  right: "right" in position ? position.right : "auto",
                  zIndex: isExpanded ? 1 : cards.length - index,
                  // width: card.width || "200px",
                  // height: card.height || "300px",
                  borderRadius: "16px",
                }}
                // transition={{
                //   type: "tween",
                //   duration: 0.8,
                //   ease: [0.43, 0.13, 0.23, 0.96],
                // }}
              >
                <AppleStyleCard
                  id={card.id}
                  imageSrc={card.url}
                  isExpanded={isExpanded}
                  expandedImageClassName="object-center"
                  content={<DummyContent />}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpandableCards;
