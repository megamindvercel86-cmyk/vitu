import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "./InfiniteCarousel.css";
import AppleStyleCard from "@/components/ui/apple-style-card";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";

// Define a type for the card object
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
  role?: string;
  role2?: string;
  name?: string;
}

interface InfiniteCarouselProps {
  cards: Card[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ cards }) => {
  const swiperRef = useRef<SwiperType | undefined>(undefined);

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
        loop={true} // Infinite loop
        spaceBetween={20} // Gap between slides
        coverflowEffect={{
          rotate: 0, // No rotation
          stretch: 0, // No stretching
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
              isViewMore={card.isViewMore}
            />
            <Typography variant="custom"> {card.name}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
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
    </>
  );
};

export default InfiniteCarousel;
