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
    const fullVideoRef = useRef<HTMLVideoElement | null>(null); 
      const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [fullVideoPlaying, setFullVideoPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [fullVideoProgress, setFullVideoProgress] = useState<number>(0);

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
   const toggleFullVideoPlayPause = () => {
    if (fullVideoRef.current) {
      if (fullVideoPlaying) {
        fullVideoRef.current.pause();
      } else {
        fullVideoRef.current.play();
      }
      setFullVideoPlaying(!fullVideoPlaying);
    }
  };
    const handleFullVideoTimeUpdate = () => {
    if (fullVideoRef.current) {
      const progressPercent = (fullVideoRef.current.currentTime / fullVideoRef.current.duration) * 100;
      setFullVideoProgress(progressPercent);
    }
  };
    const openModal = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsModalOpen(true);
    // Auto-play full video
    setTimeout(() => {
      if (fullVideoRef.current) {
        fullVideoRef.current
          .play()
          .then(() => {
            setFullVideoPlaying(true);
          })
          .catch((error) => {
            console.error("Auto-play failed:", error);
            setFullVideoPlaying(false); // Ensure state reflects failure
          });
      }
    }, 0); // Delay to ensure video element is rendered
  };

  // Close modal and reset full video
  const closeModal = () => {
    if (fullVideoRef.current && fullVideoPlaying) {
      fullVideoRef.current.pause();
      setFullVideoPlaying(false);
      setFullVideoProgress(0);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="overflow-hidden w-full rounded-xl xl:px-0">
      <div className="relative">
        <video
          poster={thumbnail}
          ref={videoRef}
          className="rounded-xl w-full  md:h-[57vh]  aspect-[16/9]  object-cover"
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
            <div className="flex justify-center items-center">
             <button onClick={openModal} 
                  aria-label="Watch The Full Video"
                  className="text-white bg-transparent text-sm  border-white rounded-full border py-2 px-2.5 hidden md:block cursor-pointer"
                >
                  Watch the Full Video
                </button>
                </div>
            <div className="cursor-pointer" onClick={toggleMute}>
              <button className="w-full h-full cursor-pointer flex items-center justify-center" aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? (
                  <svg className="lg:w-[51px] lg:h-[51px] w-[25px] h-[25px]" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <svg className="lg:w-[51px] lg:h-[51px] w-[25px] h-[25px]" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
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
       {isModalOpen && (
        <div className="fixed inset-0 bg-black z-[100] bg-opacity-75 flex items-center justify-center ">
          <div className="relative w-full  bg-black rounded-3xl p-4">
            {/* Close Button */}
            <button className="absolute top-10 right-5 text-white text-2xl z-10 cursor-pointer" aria-label="Close Modal" onClick={closeModal}>
              <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g style={{ mixBlendMode: "screen" }} opacity={0.8}>
                  <path
                    d="M6.90177 7.6437C15.6841 -1.2601 29.9236 -1.26066 38.706 7.64301C47.4884 16.5469 47.4884 30.9839 38.706 39.8878C29.9236 48.7914 15.6841 48.7909 6.90177 39.8871C-1.88038 30.9832 -1.88038 16.5475 6.90177 7.6437ZM15.0618 15.9263C14.7103 16.2827 14.5125 16.7663 14.5125 17.2703C14.5126 17.7742 14.7103 18.2578 15.0618 18.6142L20.1427 23.7654L15.0618 28.9166C14.7103 29.2729 14.5126 29.7565 14.5125 30.2605C14.5125 30.7645 14.7103 31.248 15.0618 31.6044C15.4134 31.9608 15.8902 32.1613 16.3874 32.1613C16.8846 32.1613 17.3615 31.9608 17.713 31.6044L22.7939 26.4533L27.8748 31.6044C28.2263 31.9608 28.7034 32.1612 29.2005 32.1613C29.6976 32.1613 30.1745 31.9608 30.5261 31.6044C30.8776 31.248 31.0754 30.7645 31.0754 30.2605C31.0753 29.7565 30.8776 29.2729 30.5261 28.9166L25.4451 23.7654L30.5261 18.6142C30.8776 18.2578 31.0753 17.7742 31.0754 17.2703C31.0754 16.7662 30.8776 16.2827 30.5261 15.9263C30.1745 15.57 29.6976 15.3694 29.2005 15.3694C28.7034 15.3695 28.2263 15.57 27.8748 15.9263L27.8838 15.9354L22.8029 21.0865L17.713 15.9263C17.3615 15.5699 16.8846 15.3694 16.3874 15.3694C15.8902 15.3694 15.4134 15.5699 15.0618 15.9263Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
            {/* Full Video Player */}
            <div className="relative ">
             <video
                ref={fullVideoRef}
                className="w-full h-[100vh]"
                loop
                playsInline
                onTimeUpdate={handleFullVideoTimeUpdate}
                // Add poster if you want
                poster={thumbnail}
                controls
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 w-full pr-3 pb-28 flex justify-end">
                <div className="cursor-pointer" onClick={toggleFullVideoPlayPause}>
                  <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="22" stroke="#ffff" strokeWidth="2" fill="none" opacity="0.3" />
                    <circle
                      cx="25"
                      cy="25"
                      r="22"
                      stroke="#ffffff"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={138}
                      strokeDashoffset={(1 - fullVideoProgress / 100) * 138}
                      strokeLinecap="round"
                      className="transition-all duration-100"
                      transform="rotate(-90 25 25)"
                    />
                    <foreignObject x="9" y="8" width="32" height="32">
                      <button
                        className="w-full h-full cursor-pointer flex items-center justify-center"
                        aria-label={fullVideoPlaying ? "Pause" : "Play"}
                      >
                        {fullVideoPlaying ? (
                          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.851562" width="36" height="36" rx="18" fill="#E8E8ED" />
                            <path
                              d="M15.25 11.8516H13.75C12.9216 11.8516 12.25 12.5231 12.25 13.3516V24.3516C12.25 25.18 12.9216 25.8516 13.75 25.8516H15.25C16.0784 25.8516 16.75 25.18 16.75 24.3516V13.3516C16.75 12.5231 16.0784 11.8516 15.25 11.8516Z"
                              fill="black"
                              fillOpacity="0.56"
                            />
                            <path
                              d="M23.25 11.8516H21.75C20.9216 11.8516 20.25 12.5231 20.25 13.3516V24.3516C20.25 25.18 20.9216 25.8516 21.75 25.8516H23.25C24.0784 25.8516 24.75 25.18 24.75 24.3516V13.3516C24.75 12.5231 24.0784 11.8516 23.25 11.8516Z"
                              fill="black"
                              fillOpacity="0.56"
                            />
                          </svg>
                        ) : (
                          <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.140625" y="0.261719" width="36" height="36" rx="18" fill="#E8E8ED" />
                            <path
                              d="M13.1441 23.5118V13.0318C13.1184 12.8282 13.1366 12.6214 13.1974 12.4254C13.2582 12.2293 13.3602 12.0485 13.4965 11.8951C13.6329 11.7417 13.8005 11.6192 13.9881 11.5359C14.1756 11.4525 14.3789 11.4102 14.5841 11.4118C14.9776 11.3951 15.3663 11.5036 15.6941 11.7218L24.2241 16.7218C24.9841 17.1618 25.3941 17.5218 25.3941 18.2318C25.3941 18.9418 24.9841 19.3018 24.2241 19.7418L15.6941 24.7418C15.3663 24.9601 14.9776 25.0686 14.5841 25.0518C14.3854 25.0554 14.1882 25.0171 14.0052 24.9396C13.8222 24.8621 13.6575 24.7471 13.5218 24.6019C13.3861 24.4568 13.2823 24.2847 13.2173 24.097C13.1522 23.9092 13.1273 23.7099 13.1441 23.5118Z"
                              fill="black"
                              fillOpacity="0.56"
                            />
                          </svg>
                        )}
                      </button>
                    </foreignObject>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
  const [activeIndexDesktop, setActiveIndexDesktop] = useState(0);
  const [activeIndexMobile, setActiveIndexMobile] = useState(0);
  const [swiperInstanceDesktop, setSwiperInstanceDesktop] = useState<any>(null);
  const [swiperInstanceMobile, setSwiperInstanceMobile] = useState<any>(null);

  const handleDotClickDesktop = (index: number) => {
    if (swiperInstanceDesktop) {
      swiperInstanceDesktop.slideToLoop(index);
    }
  };

  const handleDotClickMobile = (index: number) => {
    if (swiperInstanceMobile) {
      swiperInstanceMobile.slideToLoop(index);
    }
  };

  return (
    <section className=" h-auto  overflow-hidden mb-20 md:mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:mx-16 md:gap-4 md:mt-16">
        {/* Video Column */}
        <div className="col-span-12 lg:col-span-1 mb-12 md:mb-0"/>

        
        <div className="col-span-12 mx-2 lg:mx-0 lg:col-span-7 mb-12 md:mb-0 ml-">
          <VideoPlayer
            videoUrl="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/videos%2Fvitu%20prese%20(2).mp4?alt=media&token=12d22b10-89e5-4bfa-91fa-44ab94450679"
            youtubeUrl="https://www.youtube.com"
            titleClassname="font-bold"
          />
        </div>

        {/* Carousel Column */}
        <div className="col-span-12 hidden lg:block lg:col-span-3 relative">
          <Swiper
            // modules={[Autoplay]}
            direction="vertical"
            spaceBetween={24}
            slidesPerView={3}
            loop={true}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-[10%] h-[57vh] !pt-0 !pb-0"
            onSwiper={setSwiperInstanceDesktop}
            onSlideChange={(swiper) => setActiveIndexDesktop(swiper.realIndex)}
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
          <div className="pointer-events-none absolute  bottom-0 left-0 w-[80%] h-[10%] bg-gradient-to-t from-[#e7dfda]  to-transparent z-10" />
          <div className="pointer-events-none absolute  bottom-0 left-0 w-[80%] h-[4%] bg-gradient-to-t from-[#e7dfda]  to-transparent z-10" />
          {/* Carousel Dots */}
          <div className="absolute bottom-48 left-[315px] transform -translate-x-1/2 z-10 lg:bottom-[50%]  xl:left-[490px] rotate-90">
            <CarouselDots total={desktopDataRight.length} active={activeIndexDesktop} onDotClick={handleDotClickDesktop} className="rounded-full px-4" />
          </div>
        </div>

        <div className="col-span-12 mx-2 lg:hidden lg:col-span-5 relative">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            speed={1000}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="!w-full  !pt-0 !pb-0"
            onSwiper={setSwiperInstanceMobile}
            onSlideChange={(swiper) => setActiveIndexMobile(swiper.realIndex)}
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
            <CarouselDots total={desktopDataRight.length} active={activeIndexMobile} onDotClick={handleDotClickMobile} className="rounded-full px-4" />
          </div>
        </div>
        <div className="flex lg:hidden justify-center mt-10 z-10">
        <Link href="/general-enquire">
          <button 
          aria-label="Contact Us"
          className="px-8 py-3 border-[#AE8567]  border-[2px] text-[#AE8567]  rounded-full lg2:text-2xl font-FreightNeoProBold transition-colors">
            Contact Us for a Visit
          </button>
        </Link>
      </div>
      </div>

      {/* Centered Button */}
       <div className="hidden lg:flex justify-center mt-12 z-10">
        <Link href="/general-enquire">
          <button 
          aria-label="Contact Us"
          className="px-8 py-3 border-[#AE8567]  border-[2px] text-[#AE8567]  rounded-full lg2:text-2xl font-FreightNeoProBold transition-colors">
            Contact Us for a Visit
          </button>
        </Link>
      </div>
    </section>
  );
}