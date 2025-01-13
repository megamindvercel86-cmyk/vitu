import React, { useState, useEffect } from "react";
import SubHeading from "../Common/SubHeding";
import Heading from "../Common/Heading";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "../Icons/Icons";
import Image from "next/image";

interface NewsItem {
  id: number;
  image: string;
  source: string;
  date: string;
  title: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    image: "/images/mediaSectionImages/NewsItem1.png",
    source: "DAIJIWORLD",
    date: "NOV 18 2024",
    title:
      "Vitu Realty wins Economic Times 'Innovative Plot Developer of the Year – Mangalore' award",
  },
  {
    id: 2,
    image: "/images/mediaSectionImages/NewsItem1.png",
    source: "DAIJIWORLD",
    date: "NOV 18 2024",
    title:
      "Vitu Realty wins Economic Times 'Innovative Plot Developer of the Year – Mangalore' award",
  },
  {
    id: 3,
    image: "/images/mediaSectionImages/NewsItem1.png",
    source: "DAIJIWORLD",
    date: "NOV 18 2024",
    title:
      "Vitu Realty wins Economic Times 'Innovative Plot Developer of the Year – Mangalore' award",
  },
];
export default function MediaSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = newsItems.length;
  const maxIndex = totalSlides - slidesToShow;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="xl:mx-[278px] lg:mx-[78px] mx-auto  py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <SubHeading className="text-customTextGray lg:text-base xl:text-xl text-xs xl:pb-[10px] lg:pb-[12px] pb-[10px]">
          NEWS & MEDIA
        </SubHeading>
        <Heading className="lg:text-5xl text-customBrown xl:text-[52px] text-2xl font-semibold">
          Stay Updated with Our Latest Happenings
        </Heading>
      </div>

      <div className="relative">
        <div className="flex gap-4 sm:gap-6 overflow-hidden">
          {newsItems
            .slice(currentIndex, currentIndex + slidesToShow)
            .map((item) => (
              <div
                key={item.id}
                className={`flex-none w-full ${
                  slidesToShow === 2 ? "sm:w-1/2" : "sm:w-1/2 lg:w-1/3"
                } transition-all duration-300`}
              >
                <div className="bg-white rounded-lg overflow-hidden h-full">
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-[10px] lg:rounded-[20px] xl:rounded-[20px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400} // Default width for large screens (works well for lg, xl)
                      height={310} // Default height for large screens (works well for lg, xl)
                      className="w-[260px] h-[201px] sm:w-[260px] sm:h-[201px] lg:w-[400px] lg:h-[310px] xl:w-[400px] xl:h-[310px] object-cover"
                    />
                  </div>

                  <div className="lg:pt-[31px] xl:pt-[51px] pt-[20px]">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                      <SubHeading>{item.source}</SubHeading>
                      <SubHeading>|</SubHeading>
                      <SubHeading>{item.date}</SubHeading>
                    </div>
                    <SubHeading className="text-customTextGray line-clamp-2">
                      {item.title}
                    </SubHeading>
                    <button className="font-CandideCondensedMedium text-customBrown text-base lg:text-xl">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex items-center justify-between gap-4 lg:mt-[54px] xl:mt-[75px] mt-[36px] px-6">
          <span className="font-FreightNeoProBold lg:text-2xl sm:text-base text-customBrown xl:text-[28px]">
            Explore More
          </span>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center ${
                currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              aria-label="Previous slide"
            >
              <IconArrowNarrowLeft />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center ${
                currentIndex >= maxIndex
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
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
