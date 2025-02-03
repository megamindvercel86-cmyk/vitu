import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AppleStyleCard from "@/components/ui/apple-style-card";
import CustomCursor from "../CustomCursor";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
];

const expandedPositions = [
  { top: "64%", left: "25%", right: "auto" },
  { top: "50%", right: "1%", left: "auto" },
  { top: "0%", right: "1%", left: "auto" },
  { top: "50%", left: "1%", right: "auto" },
  { top: "5%", left: "3%", right: "auto" },
];

const notExpandedPositions = [
  { top: "31%", left: "37%", right: "auto" },
  { top: "10%", left: "41.4%", right: "auto" },
  { top: "0%", left: "45%", right: "auto" },
  { top: "26%", left: "50%", right: "auto" },
  { top: "5%", left: "33%", right: "auto" },
];

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

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
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: y,
              autoKill: false
            },
            ease: "power2.inOut"
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
        className="mx-auto w-full relative"
        style={{ height: isExpanded ? "180vh" : "100vh" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleExpand}
      >
        {/* Text Content */}
        <motion.div
          className="absolute top-[35rem] text-center z-50 w-full mx-auto px-4"
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
              className="lg:text-[120px] md:text-7xl font-freightNeoMedium mb-4 text-customBrown"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
            >
              A New Home,
            </motion.h1>
            <motion.h2
              className="lg:text-[120px] md:text-7xl font-freightNeoMedium mb-4 text-customBrown"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 }}
            >
              A New Way of Life
            </motion.h2>
            <motion.button
              className="px-8 py-3 border-customBrown border-[2px] text-customBrown rounded-full text-[22px] font-FreightNeoProBold transition-colors"
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
              ? expandedPositions[index]
              : notExpandedPositions[index];

            return (
              <motion.div
                key={card.id}
                className="absolute  overflow-hidden"
                initial={false}
                animate={{
                  scale: isExpanded ? 1 : 1 - index * 0.05,
                  top: position.top,
                  left: position.left,
                  right: "right" in position ? position.right : "auto",
                  zIndex: isExpanded ? 1 : images.length - index,
                  width: card.width || "200px",
                  height: card.height || "300px",
                  borderRadius: "16px",
                }}
                transition={{
                  type: "tween",
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                
              >
                <AppleStyleCard
                  id={card.id}
                  imageSrc={card.url}
                  isExpanded={isExpanded}
                  expandedImageClassName="object-center"
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
