"use client";

// ============= Component Imports =============
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import AppleStyleCard from "@/components/ui/apple-style-card";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@/components/Icons/Icons";

// ============= Swiper Imports =============
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./InfiniteCarousel.css";

// ============= Types & Interfaces =============
interface Card {
  id: number;
  url: string;
  className?: string;
  startPosition?: { x?: number; y?: number };
  isViewMore?: boolean;
  position?: "left" | "right";
  bottomTitle?: string;
  type?: "primary" | "secondary";
  title?: string;
  subtitle?: string;
  category?: string;
}

interface InfiniteCarouselProps {
  cards: Card[];
}

/**
 * InfiniteCarousel Component
 * A carousel component with infinite loop and coverflow effect
 * 
 * Features:
 * 1. Auto-playing slides
 * 2. Navigation controls
 * 3. Coverflow effect
 * 4. Custom card rendering
 * 
 * @param {InfiniteCarouselProps} props - Component props
 * @returns {React.ReactElement} The InfiniteCarousel component
 */
const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ cards }) => {
  // ============= Refs =============
  const swiperRef = useRef<SwiperType | undefined>(undefined);

  // ============= Handlers =============
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // ============= Render Helpers =============
  const renderNavigationControls = () => (
    <div className="flex items-center justify-between gap-4 px-7">
      <span className="font-FreightNeoProBold lg:text-2xl sm:text-base text-customBrown xl:text-[28px]">
        Explore More
      </span>
      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          aria-label="Previous slide"
        >
          <IconArrowNarrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          aria-label="Next slide"
        >
          <IconArrowNarrowRight />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Swiper
        modules={[EffectCoverflow, Autoplay, Navigation]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <AppleStyleCard
              key={card.id + 5}
              id={card.id + 5}
              imageSrc={card.url}
              expandedImageClassName="object-center"
              bottomTitle={card.bottomTitle}
              isViewMoreType={card.type}
              title={card.title}
              subtitle={card.subtitle}
              category={card.category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {renderNavigationControls()}
    </>
  );
};

export default InfiniteCarousel;
