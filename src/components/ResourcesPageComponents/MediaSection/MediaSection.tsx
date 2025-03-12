"use client";

// ============= Component Imports =============
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SubHeading from "@/components/Common/SubHeding";
import Heading from "@/components/Common/Heading";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@/components/Icons/Icons";
import "./MediaSection.css";

// ============= Swiper Imports =============
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

// ============= Types & Interfaces =============
interface NewsItem {
  id: number;
  fileUrl: string;
  link: string;
  title: string;
  description: string;
}

/**
 * Media Section Component
 * Displays news items in a responsive carousel layout
 *
 * Features:
 * 1. Responsive grid layout
 * 2. Dynamic slides per view
 * 3. Navigation controls
 * 4. Infinite loop
 *
 * Breakpoints:
 * - Mobile: 1 slide
 * - Tablet: 2 slides
 * - Desktop: 3 slides
 *
 * @returns {React.ReactElement} The MediaSection component
 */
export default function MediaSection(): React.ReactElement {
  // ============= Refs =============
  const swiperRef = useRef<SwiperType | undefined>(undefined);

  // ============= Handlers =============
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [swiperRef.current]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

        // Filter out team members where development is true

        setNews(data.data); // Set filtered data to state
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    }

    fetchTeamMembers();
  }, []);

  // ============= Render Helpers =============
  const renderNewsCard = (item: NewsItem) => {
    const handleReadMore = () => {
      // Open the link in a new tab
      window.open(item.link, "_blank");
    };
  
    return (
      <div className="media-card rounded-lg overflow-hidden">
        {/* Entire Card Clickable */}
        <Link href={item.link} target="_blank" rel="noopener noreferrer">
          <div className="relative overflow-hidden rounded-[10px] lg:rounded-[20px] xl:rounded-[20px] w-full h-[201.5px] sm:h-[201.5px] lg:h-[310px] xl:h-[310px]">
            {/* Image Container */}
            <Image
              src={item.fileUrl}
              alt={item.title}
              width={400}
              height={310}
              className="w-full h-full object-cover"
            />
          </div>
  
          {/* Content */}
          <div className="relative pt-[20px] lg:pt-[31px] xl:pt-[51px] z-10 h-full">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
              <SubHeading className="text-customTextGray font-medium 2xl:text-[1.5rem]">{item.title}</SubHeading>
            </div>
            <SubHeading className="text-customTextGray font-medium line-clamp-2 mb-4 2xl:text-[1.5rem]">
              {item.description}
            </SubHeading>
            {/* Read More Link - Inside the main link but separate */}
            <span
              onClick={handleReadMore}
              className="font-CandideCondensedMedium text-customBrown text-base lg:text-xl hover:opacity-80 underline cursor-pointer 2xl:text-[1.5rem]"
            >
              Read More
            </span>
          </div>
        </Link>
      </div>
    );
  };
  
  return (
    <div className=" 2xl:max-w-[2000px] xl:max-w-[1380px] xl:mx-auto lg:max-w-[1000px]  lg:mx-auto mx-7 py-8 sm:py-12">
      {/* Header */}
      <div className="text-left md:text-center mb-8 sm:mb-12">
        <SubHeading className="text-customTextGray 2xl:text-[1.5rem] lg:text-base xl:text-xl text-xs xl:pb-[10px] lg:pb-[12px] pb-[10px] text-left md:text-center">
          NEWS & MEDIA
        </SubHeading>
        <Heading className="lg:text-5xl text-customBrown xl:text-[52px] text-2xl font-semibold text-left md:text-center 2xl:text-[64px]">
          Stay Updated with Our Latest Happenings
        </Heading>
      </div>

      {/* Main Container */}
      <div className="flex flex-col">
        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="media-swiper h-full"
          >
            {news?.map((item) => (
              <SwiperSlide key={item.id} className="media-slide !h-auto">
                {renderNewsCard(item)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation Controls - Moved inside flex container */}
        <div className="flex items-center justify-between gap-4 lg:mt-[54px] px-3 xl:mt-[75px] mt-[36px]">
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
      </div>
    </div>
  );
}
