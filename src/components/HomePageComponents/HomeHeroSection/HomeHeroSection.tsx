"use client";

import { Mute, UnMute } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";
import Link from "next/link";
import { useRef, useState } from "react";

// Update hero config with video
const HERO_CONFIG = {
  titles: {
    main: "Building Wholesome",
    sub: "Living Spaces",
  },
  description: "We create thoughtfully designed spaces that blend modern aesthetics with lasting quality in Mangalore.",
  tagline: "Where Modern Design Meets Enduring Quality",
  videoUrl:
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FVitu%20Web.mp4?alt=media&token=47b69d83-cce9-4cb7-93ea-6794c0fc4318",
  thumbnail: "/images/backgroundImages/homePageBanner.png", // Fallback thumbnail
};

const VilasamHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full  h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen  flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Swiper with Overlay */}
      <div className="absolute inset-0 scale-1">
        <video
          ref={videoRef}
          className="w-full h-full object-cover hidden md:block"
          loop
          playsInline
          // onTimeUpdate={handleTimeUpdate}
          autoPlay
          muted={isMuted}
          // priority
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FVitu%20Web.mp4?alt=media&token=47b69d83-cce9-4cb7-93ea-6794c0fc4318"
            type="video/mp4"
          />
        </video>
        <video
          ref={videoRef}
          className="w-full h-full object-cover md:hidden block"
          loop
          playsInline
          // onTimeUpdate={handleTimeUpdate}
          autoPlay
          muted={isMuted}
          // priority
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FVitu%20Web.mp4?alt=media&token=47b69d83-cce9-4cb7-93ea-6794c0fc4318"
            type="video/mp4"
          />
        </video>
        <div className="absolute bottom-3  right-0 lg:bottom-2 xl:bottom-8  lg2:right-10 w-full p-4 flex flex-row justify-end">
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <button
                className={`w-full text-[#0C3E49] rounded-full lg:rounded-[30px] text-[19px] py-1.5 px-2 lg:px-5 ${!isMuted ? "bg-white" : "bg-white/60"} h-full cursor-pointer flex items-center justify-center`}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {!isMuted ? <Mute /> : <UnMute />}
                <span className="ml-2 hidden text-sm lg:block">Site contains Audio Elements</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="relative flex h-full justify-center top-[10rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[23.375rem]">
        <div className="flex flex-col items-center text-center text-white">
          <h1
            id="hero-heading"
            className="font-freightNeoSemibold leading-relaxed md:leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]"
          >
            Building Wholesome <br />
            Living Spaces
          </h1>
        </div>
      </div>
    </section>
  );
};

export default VilasamHeroSection;
