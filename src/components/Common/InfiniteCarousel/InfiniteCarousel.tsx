"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import './InfiniteCarousel.css';
import AppleStyleCard from '@/components/ui/apple-style-card';

// Define a type for the card object
interface Card {
  id: number;
  url: string;
  className?: string;
  startPosition?: { x?: number; y?: number };
  isViewMore?: boolean;
  position?: "left" | "right";
  bottomTitle?: string
}

interface InfiniteCarouselProps {
  cards: Card[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ cards }) => {
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      loop={true}  // Infinite loop
      spaceBetween={20}  // Gap between slides
      coverflowEffect={{
        rotate: 0,  // No rotation
        stretch: 0,  // No stretching
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectCoverflow, Autoplay]}
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
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default InfiniteCarousel;
