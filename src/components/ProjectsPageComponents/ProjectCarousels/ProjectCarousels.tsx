"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { cn } from "@/lib/utils";

import "swiper/css";

// VideoPlayer Component
interface VideoPlayerProps {
  youtubeUrl: string;
  videoUrl: string;
  title?: string;
  subTitle?: string;
  thumbnail?: string;
  titleClassname?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ youtubeUrl, videoUrl, title, subTitle, thumbnail, titleClassname }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressPercent = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  return (
    <section className="overflow-hidden w-full rounded-3xl xl:px-0">
      <div className="relative">
        <video
          poster={thumbnail}
          ref={videoRef}
          className="rounded-3xl w-full h-[50vh] lg:h-[100vh] object-cover"
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          autoPlay
          muted={isMuted}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 w-full p-4 z-10 flex flex-row justify-end md:justify-between">
          <div className="hidden md:block"></div>
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <button className="w-full h-full cursor-pointer flex items-center justify-center" aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? (
                  <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25.9727" cy="25.5" r="24" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" />
                    <path
                      d="M16.4357 19.8183C16.1164 19.9941 15.918 20.3298 15.918 20.6943V25.5001V30.3059C15.918 30.6704 16.1164 31.0061 16.4357 31.1819L25.7169 36.2912C26.2244 36.5706 26.8456 36.2035 26.8456 35.6242V25.5001V15.376C26.8456 14.7967 26.2244 14.4296 25.7169 14.7089L16.4357 19.8183Z"
                      fill="white"
                    />
                    <path
                      d="M15.92 29.897C15.92 30.4493 15.4722 30.897 14.92 30.897H12.2227C11.6704 30.897 11.2227 30.4493 11.2227 29.897V21.1034C11.2227 20.5511 11.6704 20.1034 12.2227 20.1034H14.92C15.4722 20.1034 15.92 20.5511 15.92 21.1034V25.5002V29.897Z"
                      fill="white"
                    />
                    <path
                      d="M38.3659 20.6927C38.7565 20.3023 39.3895 20.3022 39.78 20.6927C40.1701 21.0832 40.1703 21.7164 39.78 22.1068L36.3855 25.5003L39.78 28.8949L39.8484 28.9701C40.1687 29.3628 40.1461 29.9428 39.78 30.3089C39.4139 30.6748 38.8338 30.6976 38.4411 30.3773L38.3659 30.3089L34.9714 26.9144L31.5779 30.3089C31.1874 30.6989 30.5542 30.699 30.1638 30.3089C29.7734 29.9185 29.7737 29.2854 30.1638 28.8949L33.5573 25.5003L30.1638 22.1068L30.0954 22.0306C29.7752 21.6379 29.7979 21.0588 30.1638 20.6927C30.5299 20.3266 31.1089 20.304 31.5017 20.6244L31.5779 20.6927L34.9714 24.0863L38.3659 20.6927Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25.4727" cy="25.8999" r="24" fill="#AE8566" fillOpacity="0.2" stroke="#AE8566" strokeWidth="2" />
                    <path
                      d="M15.9357 20.2182C15.6164 20.394 15.418 20.7297 15.418 21.0942V25.9V30.7058C15.418 31.0703 15.6164 31.406 15.9357 31.5818L25.2169 36.6911C25.7244 36.9705 26.3456 36.6034 26.3456 36.0241V25.9V15.7759C26.3456 15.1966 25.7244 14.8295 25.2169 15.1088L15.9357 20.2182Z"
                      fill="#AE8566"
                    />
                    <path
                      d="M15.42 30.2969C15.42 30.8492 14.9722 31.2969 14.42 31.2969H11.7227C11.1704 31.2969 10.7227 30.8492 10.7227 30.2969V21.5033C10.7227 20.951 11.1704 20.5033 11.7227 20.5033H14.42C14.9722 20.5033 15.42 20.951 15.42 21.5033V25.9001V30.2969Z"
                      fill="#AE8566"
                    />
                    <path
                      d="M36.1406 34.3623V34.3617C38.3068 32.1961 39.6461 29.2036 39.6461 25.8996C39.6461 22.5955 38.3068 19.603 36.1406 17.4374"
                      stroke="#AE8566"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M33.7188 31.9419C35.2646 30.3954 36.2211 28.2601 36.2211 25.9004C36.2211 23.5408 35.2646 21.4054 33.7188 19.8589"
                      stroke="#AE8566"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M31.2969 29.5205C32.2236 28.5943 32.7965 27.3138 32.7965 25.9003C32.7965 24.4868 32.2236 23.2063 31.2969 22.2801"
                      stroke="#AE8566"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CarouselDotsProps {
  total: number;
  active: number;
  onDotClick?: (index: number) => void;
  className?: string;
}

const CarouselDots = ({ total, active, onDotClick, className }: CarouselDotsProps) => {
  return (
    <div style={{ borderRadius: "50px" }} className={cn("flex items-center justify-center gap-2 py-3", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick?.(index)}
          className={cn("transition-all duration-300", active === index ? `w-6 bg-[#cfa484] rounded-xl h-2` : "w-2 h-2 bg-[#e4cfbf] rounded-full")}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

const desktopDataRight = [
  { src: "/images/carousal/slider1-min.jpg", alt: "Project 1" },
  { src: "/images/carousal/slider2-min.jpg", alt: "Project 2" },
  { src: "/images/carousal/slider3-min.jpg", alt: "Project 3" },
  { src: "/images/carousal/slider4-min.jpg", alt: "Project 4" },
  { src: "/images/carousal/slider5-min.jpg", alt: "Project 5" },
  { src: "/images/carousal/slider6-min.jpg", alt: "Project 6" },
];

export default function ProjectCarousel(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const handleDotClick = (index: number) => {
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  return (
    <section className="bg-gradient-to-b h-auto lg:h-[200vh] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:mx-16 md:gap-4 md:mt-16">
        {/* Video Column */}
        <div className="col-span-12 lg:col-span-7 mb-12 md:mb-0">
          <VideoPlayer
            videoUrl="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/vitu%20prese.mp4?alt=media&token=07e4fe7c-1cd8-4302-8fe8-687469756a5e"
            youtubeUrl="https://www.youtube.com"
            titleClassname="font-bold"
          />
        </div>

        {/* Carousel Column */}
        <div className="col-span-12 hidden lg:block lg:col-span-5 relative">
          <Swiper
            // modules={[Autoplay]}
            direction="vertical"
            spaceBetween={24}
            slidesPerView={3}
            loop={true}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="!w-full h-[100vh] !pt-0 !pb-0"
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {desktopDataRight.map(({ src, alt }, idx) => (
              <SwiperSlide style={{ width: "80%" }} key={idx}>
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                  <Image src={src} alt={alt} fill className="object-cover transition-transform duration-1000 hover:scale-110" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Gradient at bottom */}
          <div className="pointer-events-none absolute  bottom-0 left-0 w-[80%] h-[8%] bg-gradient-to-t from-[#e7dfda] via-[#e7dfda] to-transparent z-10" />

          {/* Carousel Dots */}
          <div className="absolute bottom-48 left-[315px] transform -translate-x-1/2 z-10 lg:bottom-[50%] lg:left-[490px] rotate-90">
            <CarouselDots total={desktopDataRight.length} active={activeIndex} onDotClick={handleDotClick} className="rounded-full px-4" />
          </div>
        </div>

        <div className="col-span-12 lg:hidden lg:col-span-5 relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            speed={1000}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="!w-full  !pt-0 !pb-0"
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {desktopDataRight.map(({ src, alt }, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-full relative rounded-xl overflow-hidden">
                  <Image src={src} alt={alt} fill className="object-cover transition-transform duration-1000 hover:scale-110" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Gradient at bottom (optional if needed) */}

          {/* Carousel Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <CarouselDots total={desktopDataRight.length} active={activeIndex} onDotClick={handleDotClick} className="rounded-full px-4" />
          </div>
        </div>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-12">
        <Link href="/general-enquire">
          <button className="px-8 py-3 border-[#AE8567]  border-[2px] text-[#AE8567]  rounded-full lg2:text-2xl font-FreightNeoProBold transition-colors">
            Contact Us for a Visit
          </button>
        </Link>
      </div>
    </section>
  );
}
