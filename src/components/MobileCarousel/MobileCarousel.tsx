import React, {
  useState,
  useEffect,
  useCallback,
  TouchEvent,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  PrimaryViewMoreButton,
  SecondaryViewMoreButton,
} from "../Icons/Icons";
import Image from "next/image";

interface Card {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  category: string;
  content: React.ReactNode;
  type?: "primary" | "secondary";
}

interface MobileCarouselProps {
  cards: Card[];
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % cards.length);
  }, [cards.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + cards.length) % cards.length);
  }, [cards.length]);

  const resetAutoplay = useCallback(() => {
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 100);
  }, []);

  const handleManualNext = () => {
    nextSlide();
    resetAutoplay();
  };

  const handleManualPrev = () => {
    prevSlide();
    resetAutoplay();
  };

  const handleCardClick = (clickedIndex: number, card: Card) => {
    if (clickedIndex === 0) {
      handleManualPrev();
    } else if (clickedIndex === 2) {
      handleManualNext();
    } else if (clickedIndex === 1) {
      setSelectedCard(card);
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    document.body.style.overflow = "auto";
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        handleManualNext();
      } else {
        handleManualPrev();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    let intervalId: number | undefined;

    if (autoplayEnabled) {
      intervalId = window.setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoplayEnabled, nextSlide]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const getVisibleCards = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + cards.length) % cards.length;
      result.push(cards[index]);
    }
    return result;
  };

  return (
    <>
      <div className="relative w-full  mx-auto">
        <div
          className="relative overflow-hidden h-[350px] py-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-center">
            <div className="relative flex gap-4 transition-transform duration-300">
              {getVisibleCards().map((card, index) => (
                <motion.div
                  key={card.id}
                  onClick={() => handleCardClick(index, card)}
                  layoutId={`card-${card.id}`}
                  className={cn(
                    "transition-all duration-500 ease-in-out cursor-pointer ",
                    index === 1
                      ? "md:w-[300px] w-[231px] h-[289px] opacity-100 z-20 scale-100"
                      : "w-[180px] h-[267px] my-auto   hover:opacity-60",
                  )}
                >
                  <div className="relative bg-white rounded-[20px] shadow-xl overflow-hidden h-full">
                    <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover absolute inset-0 z-10"
                    />
                    <div className="relative z-40 p-8">
                      <motion.p
                        layoutId={`category-${card.id}`}
                        className="text-white text-xs lg:text-base font-medium text-left font-freightNeoMedium"
                      >
                        {card.category}
                      </motion.p>
                      <motion.p
                        layoutId={`title-${card.id}`}
                        className="text-white text-xl font-semibold max-w-xs text-left [text-wrap:balance] font-freightNeoSemibold mt-2"
                      >
                        {card.title}
                      </motion.p>
                      <motion.p
                        layoutId={`subtitle-${card.id}`}
                        className="text-white text-xs font-extralight max-w-xs text-left [text-wrap:balance] font-FreightNeoProNormal mt-2"
                      >
                        {card.subtitle}
                      </motion.p>
                    </div>
                    <div className="absolute bottom-4 right-4 z-50">
                      {card.type === "primary" ? (
                        <PrimaryViewMoreButton />
                      ) : (
                        <SecondaryViewMoreButton />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 lg:mt-[54px] xl-mt-[75px] mt-[36px] px-6">
          <span className="font-FreightNeoProBold lg:text-2xl sm:text-base  text-customBrown  xl:text-[28px]">
            Explore More
          </span>
          <div className="flex gap-2">
            <button
            aria-label="Previous Slide"
              className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              onClick={handleManualPrev}
            >
              <IconArrowNarrowLeft />
            </button>
            <button
            aria-label="Next Slide"
              className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              onClick={handleManualNext}
            >
              <IconArrowNarrowRight />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
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
              ref={modalRef}
              layoutId={`card-${selectedCard.id}`}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                aria-label="Close Modal"
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleCloseModal}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={`category-${selectedCard.id}`}
                className="text-base font-medium text-black dark:text-white font-freightNeoMedium"
              >
                {selectedCard.category}
              </motion.p>
              <motion.p
                layoutId={`title-${selectedCard.id}`}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {selectedCard.title}
              </motion.p>
              <div className="py-10">{selectedCard.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileCarousel;
