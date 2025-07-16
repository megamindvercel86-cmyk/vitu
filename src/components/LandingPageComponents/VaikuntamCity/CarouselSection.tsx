"use client";

import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StatsComponent from "../StatsComponent";
//============ Component Imports =============

export default function CarouselSection(): React.ReactElement {
  // states
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  // function to handle carosuel dot click
  const handleDotClickDesktop = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  // carosuel image data
  const desktopDataRight = [
    { src: "/images/carousal/slider1-min.jpg", alt: "Project 1" },
    { src: "/images/carousal/slider2-min.jpg", alt: "Project 2" },
    { src: "/images/carousal/slider3-min.jpg", alt: "Project 3" },
    { src: "/images/carousal/slider4-min.jpg", alt: "Project 4" },
    { src: "/images/carousal/slider5-min.jpg", alt: "Project 5" },
    { src: "/images/carousal/slider6-min.jpg", alt: "Project 6" },
  ];

  const analyticsData = [
    { value: "5", label: "to the NITK Beach" },
    { value: "20", label: "to the Mangaluru Airport" },
    { value: "3", label: "to shopping malls" },
  ];
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto">
        <h1 className="font-fsSiena  text-customCongoBrown  text-center lg:leading-none md:mt-6 max-w-4xl text-2xl md:text-3xl lg:text-5xl lg2:text-7xl md:max-w-2xl lg2:max-w-3xl md:mx-3 lg:mx-auto">
          Discover Your Sanctuary
        </h1>
        <Typography
          variant="custom"
          className="font-fsSplitSans text-customCongoBrown/60 pb-2 md:text-xl lg2:text-3xl lg:text-2xl text-pretty text-sm px-4 max-w-6xl mx-auto mt-2 lg:mt-8 text-center"
        >
          Discover a thoughtfully designed, uniquely authentic experience just
          for you. Enjoy a harmonious blend of modern design, lush surroundings,
          & exclusive amenities, setting a new standard for coastal living at
          Vaikuntam City.
        </Typography>
      </div>
      <div className="mt-10 lg:mt-24">
        <Swiper
          modules={[Autoplay]}
          speed={3000}
          centeredSlides
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="!w-full  !pt-0 !pb-0"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
          breakpoints={{
            0: {
              slidesPerView: 1.4,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 1.5,
              spaceBetween: 40,
            },
          }}
        >
          {desktopDataRight.map(({ src, alt }, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full h-[10rem] sm:h-[20rem] lg:h-[40rem] relative overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <StatsComponent postfix=" mins" items={analyticsData} />
    </section>
  );
}
