"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
// 1. Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// 2. Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface InvestorsOpportunityCard {
  title: string;
  subtitle?: string;
}

export interface InvestorsOpportunitySectionProps {
  heading: ReactNode;
  headingMobile: ReactNode;
  description: string;
  ctaLabel: string;
  images: string[];
  imageAlt: string;
  cards: InvestorsOpportunityCard[];
}

export default function InvestorsOpportunitySection({
  heading,
  description,
  ctaLabel,
  images,
  imageAlt,
  headingMobile,
  cards,
}: InvestorsOpportunitySectionProps) {
  // State to hold our custom Swiper DOM elements
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null);

  return (
    <section className="bg-white px-5 pb-10 pt-7 md:px-12 md:py-20 lg:px-20 lg:py-24">
      <div className="mx-auto max-w-7xl xl:max-w-[90vw]">
        <div className="grid pb-5 md:pb-0 grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-10 lg:gap-16">
          {/* Text content */}
          <div className="order-1 flex flex-col space-y-4 md:order-1 md:space-y-7">
            <h2 className="text-balance font-ttCommons  md:leading-[1.2] lg:leading-[1.2] font-semibold hidden text-[28px] text-[#2A2A2A] sm:text-[32px] md:text-4xl lg:text-5xl md:block">
              {heading}
            </h2>
            <h2 className="text-balance font-ttCommons leading-tight  font-semibold text-[28px] text-[#2A2A2A] sm:text-[32px] md:text-4xl lg:text-5xl  md:hidden">
              {headingMobile}
            </h2>
            <p className="max-w-sm pb-2 md:pb-8 font-ttCommons font-medium text-[15px]  text-[#666666] md:text-lg md:leading-[1.4] lg:max-w-xl">
              {description}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-investors-modal"));
              }}
              className="hidden h-12 w-fit items-center justify-center rounded-md bg-[#064747] px-8 font-ttCommons  font-bold text-white transition hover:bg-[#084943] md:inline-flex md:h-12 md:px-10 text-base"
            >
              {ctaLabel}
            </button>
          </div>

          {/* Image Section with Custom Swiper Controls */}
          <div className="order-2 relative h-[280px] w-full overflow-hidden rounded-xl sm:h-[340px] md:order-2 md:h-[360px] lg:h-[520px]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: prevEl,
                nextEl: nextEl,
              }}
              pagination={{
                el: paginationEl,
                clickable: true,
                renderBullet: function (index, className) {
                  // Keep the HTML clean, we will force the line shape in CSS below
                  return `<span class="${className}"></span>`;
                },
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={true}
              className="h-full w-full"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index} className="relative h-full w-full">
                  <Image
                    src={src}
                    alt={`${imageAlt} ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover object-[center_65%]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation & Pagination Overlay */}
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-10 flex items-center gap-4 sm:gap-5">
              {/* Left Arrow Button */}
              <button
                ref={(node) => setPrevEl(node)}
                aria-label="Previous slide"
                className="flex items-center justify-center text-white transition hover:opacity-75 disabled:opacity-30 cursor-pointer"
              >
                <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3587 0.99995L1.41418 10.9444L11.3587 20.8889" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>

              </button>

              {/* Pagination Lines Container */}
              <div
                ref={(node) => setPaginationEl(node)}
                className="custom-swiper-pagination flex items-center"
              ></div>

              {/* Right Arrow Button */}
              <button
                ref={(node) => setNextEl(node)}
                aria-label="Next slide"
                className="flex items-center justify-center text-white transition hover:opacity-75 disabled:opacity-30 cursor-pointer"
              >
                <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.999975 20.889L10.9445 10.9445L0.999975 1" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>

              </button>
            </div>

            {/* STRICT STYLE OVERRIDE FOR LINE BUTTONS */}
            <style>{`
              .custom-swiper-pagination .swiper-pagination-bullet {
                width: 32px !important;        /* Forces line length on mobile */
                height: 3px !important;        /* Forces line thickness */
                background-color: rgba(255, 255, 255, 0.35) !important; /* Dimmed inactive line */
                opacity: 1 !important;
                margin: 0 4px !important;      /* Gap between lines */
                border-radius: 2px !important; /* Slightly rounded edges for the line */
                transition: all 0.3s ease;
                display: block;
              }
              
              /* Make lines slightly longer on larger screens (matching sm:w-10) */
              @media (min-width: 640px) {
                .custom-swiper-pagination .swiper-pagination-bullet {
                  width: 40px !important; 
                }
              }

              .custom-swiper-pagination .swiper-pagination-bullet-active {
                background-color: rgba(255, 255, 255, 1) !important; /* Bright solid white for active line */
              }
            `}</style>
          </div>

          <div className="order-3 mt-4 flex justify-center md:hidden">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-investors-modal"));
              }}
              className="inline-flex py-3 md:h-12 w-full items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943]"
            >
              {ctaLabel}
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 lg:mt-16 xl:gap-44 lg:grid-cols-4 lg:gap-28">
          {cards.map((card) => (
            <div
              key={`${card.title}-${card.subtitle || ""}`}
              className="flex flex-col justify-center rounded-[16px] bg-[#F9F9F9] px-4 py-6 text-center md:min-h-[80px] md:px-5"
            >
              <p className="md:whitespace-pre-line font-ttCommons text-xl font-semibold leading-snug text-[#2A2A2A] md:text-xl lg:text-xl">
                {card.title}
              </p>
              {card.subtitle ? (
                <p className="mt-2 font-ttCommons text-sm font-medium text-[#666666] md:text-base">
                  {card.subtitle}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}