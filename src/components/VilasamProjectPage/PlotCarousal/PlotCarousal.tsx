"use client"; // (if using app directory)

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { plots } from "@/data/vilasamPlotData";
import { cn } from "@/lib/utils"; // Verify this utility exists
import { useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper"; // Import Swiper type
import { Autoplay } from "swiper/modules";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";
import ContactFormModal from "@/components/Common/FormModal/FormModal";

const CarouselDots = ({
  total,
  active,
  onDotClick,
  className,
}: {
  total: number;
  active: number;
  onDotClick?: (index: number) => void;
  className?: string;
}) => {
  return (
    <div style={{ borderRadius: "50px" }} className={cn("flex items-center justify-center gap-2 py-2", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          className={cn(
            "transition-all duration-300",
            active === index ? "w-8 bg-white rounded-xl h-[6px]" : "w-[6px] h-[6px] bg-gray-300 rounded-full"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default function PropertyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const swiperRef = useRef<SwiperType | undefined>(undefined); // Use SwiperType for ref
  const duplicatedPlots = plots.length < 5 ? [...plots, ...plots] : plots;

  return (
    <div className="relative">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        loop={true}
        speed={1000}
        modules={[Autoplay]}
        centeredSlides={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {duplicatedPlots.map((property, index) => (
          <SwiperSlide className="!h-[80vh]" key={index}>
            <div className="max-w-sm mx-auto h-full  rounded-2xl overflow-hidden  bg-white">
              <div className="relative w-full h-64">
                <Image src={property.src} alt={property.title} fill className="object-cover rounded-2xl" />
              </div>
              <div className="py-6 flex flex-col justify-between h-[350px]">
                <div>
                  <h2 className="text-2xl font-semibold font-theSeasons text-[#0C3E49] mb-3">{safeSpecialCharacters(property.title)}</h2>
                  <p className="text-[#0C3E4999] font-ttCommons leading-[1.6] text-sm mb-5">{safeSpecialCharacters(property.description)}</p>
                </div>
                <div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Get the Best Quote"
                    className="w-full bg-[#0C3E49] text-white font-semibold py-3 font-ttCommons rounded-full "
                  >
                    Get the Best Quote
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-[17] left-1/2 transform -translate-x-1/2 bg-[#0C3E4966] flex justify-center w-[100px] rounded-[300px] z-20">
        <CarouselDots
          total={plots.length}
          active={activeIndex % plots.length}
          onDotClick={(index) => {
            swiperRef.current?.slideToLoop(index);
          }}
        />
      </div>
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        collectionName="vilasam"
        thankYouRoute="/vilasam/thank-you"
        downloadFileLink="/downloadingFiles/VITU Realty - Vilasam.pdf"
      />
    </div>
  );
}
