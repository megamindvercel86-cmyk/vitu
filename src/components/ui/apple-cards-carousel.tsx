"use client";
import React, { useEffect, useRef, useState, createContext, useContext, JSX, useCallback } from "react";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ArrowRightIcon, IconArrowNarrowLeft, IconArrowNarrowRight, PrimaryViewMoreButton, SecondaryViewMoreButton } from "../Icons/Icons";
import Typography from "../Typography/Typography";
import articleArea from "@/data/articleArea.json";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
  height?: string;
  exploreMore?: boolean;
}

type Card = {
  url?: string;
  title?: string;
  description?: string;
  category?: string;
  content?: React.ReactNode;
  type?: string;
  id?: number;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0, height = "h-auto", exploreMore = true }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = useCallback(() => {
    return window && window.innerWidth < 768;
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = useCallback(
    (index: number) => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.clientWidth;
        const cardWidth = isMobile() ? 230 : 384;
        const gap = isMobile() ? 4 : 8;
        const scrollPosition = index * (cardWidth + gap) - (containerWidth - cardWidth) / 2;

        carouselRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    },
    [isMobile]
  );

  useEffect(() => {
    if (carouselRef.current && isMobile()) {
      handleCardClose(1);
    }
  }, [handleCardClose, isMobile]);

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className={`flex justify-center flex-wrap overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] ${height}`}
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>

          {/* Updated container for cards */}
          <div
            className={cn(
              "flex flex-row gap-8 xl:gap-4 rounded-3xl", // Added gap and padding
              "min-w-max" // Ensures container grows with content
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className={cn(
                  "rounded-3xl flex-shrink-0", // Added flex-shrink-0
                  "w-[280px] h-[350px]",
                  "md:w-[350px] md:h-[350px]",
                  "lg:w-[370px] lg:h-[500px]",
                  "xl:w-[432px] xl:h-[540px]",
                  "2xl:w-[632px] 2xl:h-[640px]",
                  "transition-all duration-300"
                )}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        {exploreMore && (
          <div className="flex items-center justify-between gap-4 lg:mt-[54px] xl:mt-[75px] mt-[36px]">
            {/* <span className="font-FreightNeoProBold lg:text-2xl sm:text-base text-customBrown xl:text-[28px]">Explore More</span>
            <div className="flex gap-2">
              <button
                className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                <IconArrowNarrowLeft />
              </button>
              <button
                className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                <IconArrowNarrowRight />
              </button>
            </div> */}
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }: { card: Card; index: number; layout?: boolean }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(index);
  }, [onCardClose, index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  // ====================

  const [currentCardId, setCurrentCardId] = useState(card.id);


  let project:
    | {
        id: number;
        url: string;
        title: string;
        description?: string;
      }
    | undefined;

  project = articleArea.find((project) => project.id === currentCardId);

  const handleFooterClick = () => {

    const nextProject = articleArea.find((project) => {
      if (project.id === 3) {
        return 1 === currentCardId;
      } else {
        return project.id + 1 === currentCardId;
      }
    });

    if (nextProject) {
      setCurrentCardId(nextProject.id); // Update state to trigger re-render
    }
  };

  const nextProject = articleArea.find((project) => {
    if (project.id === 3) {
      return 1 === currentCardId;
    } else {
      return project.id + 1 === currentCardId;
    }
  });


  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={`expandable-card-${card.url}`}
              className={cn("max-w-5xl mx-auto bg-white dark:bg-bg-[#F8F6F5] h-auto z-[60] my-10 rounded-3xl font-sans relative overflow-hidden")}
            >
              <div className="relative h-auto ">
                {/* <Image
                         src={imageSrc || "/placeholder.svg"}
                         alt={title || "Card image"}
                     
                         width={1042}
                         height={45}
                         className={cn("object-   h-[652px] w-full", expandedImageClassName)}
                       /> */}
              </div>
              <div className="">
                <button
                  className="absolute top-4 right-4 h-8 w-8 bg-[#FFFFFF] rounded-full flex items-center justify-center transition-colors"
                  onClick={handleClose}
                >
                  <IconX className="h-5 w-5 text-black" />
                </button>

                <div>
                  <div key={"dummy-content"}>
                    <Image
                      src={project?.url || "/placeholder.svg"}
                      alt={project?.title || "Card image"}
                      width={1042}
                      height={45}
                      className={cn("object-   h-[652px] w-full")}
                    />
                    <div className="p-4 md:p-10">
                      <Typography variant="h1" className="text-customBrown">
                        {project?.title}
                      </Typography>
                      <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[20px] !text-xl">
                        <span className="text-neutral-700">{project?.description}</span>
                      </Typography>
                      <Footer onFooterClick={handleFooterClick} nextProjectTitle={nextProject?.title || ""} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="md:rounded-[20px] overflow-hidden rounded-[30px] bg-gray-100 dark:bg-neutral-900 
          flex flex-col items-start justify-start relative z-10 w-full h-full"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white md:text-base font-medium text-left font-freightNeoMedium lg:text-base text-xs 2xl:text-3xl"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-freightNeoSemibold mt-2 2xl:text-5xl"
          >
            {card.title}
          </motion.p>
          <motion.p
            layoutId={layout ? `subtitle-${card.description}` : undefined}
            className="text-white text-xs lg:text-2xl xl:text-[26px] md:text-xl font-extralight max-w-xs text-left [text-wrap:balance] font-FreightNeoProNormal mt-2 2xl:text-3xl"
          >
            {card.description}
          </motion.p>
        </div>
        <BlurImage src={card.url || "/placeholder.svg"} alt={card.title || "Card image"} fill className="object-cover absolute z-10 inset-0" />
        {/* Plus icon at the bottom right */}
        <div className="absolute bottom-4 right-4 z-50">{card.type === "primary" ? <PrimaryViewMoreButton /> : <SecondaryViewMoreButton />}</div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};

interface FooterProps {
  onFooterClick?: () => void;
  nextProjectTitle: string;
}

const Footer: React.FC<FooterProps> = ({ onFooterClick, nextProjectTitle }) => {
  return (
    <div className="bg-white rounded-b-xl lg:rounded-b-3xl pb-20 pt-20 lg:pb-0">
      <hr className="w-full h-[2px] bg-[#BDBEC2]" />
      <div className="px-0  container gap-8 lg:gap-48 flex justify-between lg:justify-between items-center py-10 lg:py-14 ">
        <div>
          <p className="text-xs text-[#8E8E93] uppercase font-roboto">Up Next</p>
          <h4 className="text-black1 font-roboto font-bold text-base max-w-[15rem] lg:max-w-none">{nextProjectTitle} </h4>
        </div>

        <div onClick={onFooterClick} className="cursor-pointer">
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
};
