"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

const slides = [
  {
    title: "LOCATION-DRIVEN VALUE",
    desc: "Positioned in Mangalore’s high-growth northern corridor, these plots benefit from expressway, port, and SEZ proximity. A future-ready address that guarantees both lifestyle and long-term capital appreciation.",
  },
  {
    title: "INVEST WITH CONFIDENCE",
    desc: "RERA-registered, DC-converted, and with 100% clear legal titles, your investment is safeguarded at every step. Transparency and compliance ensure trust, making this not just land but a lasting legacy.",
  },
  {
    title: "PROVEN RETURNS",
    desc: "These villa plots offer a legacy of consistent value growth. Designed for investors who seek stability, security, and the assurance of steady appreciation over time.",
  },
];

const ImageGridMobile = () => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="mx-5">
      <div className="text-white pt-20 pb-10">
        <Image
          src="/images/ImageGrid/mobileImage.png"
          alt="dummy"
          width={600}
          height={300}
          className="object-cover w-full h-[180px] sm:h-[270px] xl:h-[340px]"
        />
        <div className="mt-5 space-y-3 text-center">
          <h1 className="text-3xl lg:text-[38px] leading-[1.1] text-[#1C1213] font-FreightNeoProNormal font-normal">Your Gateway to Lasting Value</h1>
          <p className="text-[#1C121399] text-sm font-FreightNeoProNormal font-normal">
            A rare opportunity to invest in thoughtfully crafted villa plots in Mangalore’s thriving coastal corridor.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative mt-10">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            slidesPerGroup={1}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper?.realIndex);
            }}
            onSwiper={(instance) => setSwiper(instance)}
            loop={true}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="border-2 rounded-lg p-5 border-[#1C1213]">
                  <h1 className="text-lg text-[#1C1213] font-FreightNeoProNormal mb-2">{slide.title}</h1>
                  <p className="text-[#1C121399] font-FreightNeoProNormal text-sm">{slide.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-3">
          <div
            onClick={() => {
              swiper?.slidePrev();
            }}
            className="cursor-pointer z-10"
          >
            <svg width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_551_274)">
                <rect
                  x="17.9377"
                  y="17.2959"
                  width="17.9374"
                  height="17.2958"
                  rx="8.64789"
                  transform="rotate(-180 17.9377 17.2959)"
                  fill="#D2D2D7"
                  fillOpacity="0.64"
                />
                <path
                  d="M6.55027 9.27688L9.36928 12.092C9.66891 12.3916 10.1536 12.3901 10.4522 12.09C10.7508 11.7896 10.7498 11.3035 10.4502 11.0043L8.17567 8.73305L10.4502 6.46176C10.7498 6.16259 10.7508 5.6765 10.4522 5.3761C10.3026 5.22541 10.1062 5.15017 9.90973 5.15017C9.71431 5.15017 9.51884 5.22464 9.36928 5.3741L6.55027 8.18922C6.40618 8.33315 6.3249 8.52888 6.3249 8.73305C6.3249 8.93722 6.40618 9.1329 6.55027 9.27688Z"
                  fill="black"
                  fillOpacity="0.56"
                />
              </g>
              <defs>
                <clipPath id="clip0_551_274">
                  <rect x="17.9377" y="17.2959" width="17.9374" height="17.2958" rx="8.64789" transform="rotate(-180 17.9377 17.2959)" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div
            onClick={() => {
              swiper?.slideNext();
            }}
            className="cursor-pointer z-10"
          >
            <svg width="30" height="30" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_551_271)">
                <rect x="0.0625" width="17.9374" height="17.2958" rx="8.64789" fill="#D2D2D7" fillOpacity="0.64" />
                <path
                  d="M11.45 8.01902L8.63097 5.2039C8.33134 4.90427 7.84668 4.90575 7.54807 5.2059C7.24941 5.50629 7.25043 5.99239 7.55006 6.29156L9.82458 8.56285L7.55006 10.8341C7.25043 11.1333 7.24941 11.6194 7.54807 11.9198C7.69763 12.0705 7.89407 12.1457 8.09052 12.1457C8.28594 12.1457 8.48141 12.0713 8.63097 11.9218L11.45 9.10668C11.5941 8.96275 11.6753 8.76702 11.6753 8.56285C11.6753 8.35868 11.5941 8.163 11.45 8.01902Z"
                  fill="black"
                  fillOpacity="0.56"
                />
              </g>
              <defs>
                <clipPath id="clip0_551_271">
                  <rect x="0.0625" width="17.9374" height="17.2958" rx="8.64789" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGridMobile;
