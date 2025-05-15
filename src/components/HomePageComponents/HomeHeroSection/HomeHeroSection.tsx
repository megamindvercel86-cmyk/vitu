"use client";

import { Mute, UnMute } from "@/components/Icons/Icons";
import { useRef, useState, useEffect } from "react";

const VilasamHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(!isMuted);
      }
    };
  const [isFixed, setIsFixed] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Change to absolute when the section is about to leave the viewport
        setIsFixed(rect.bottom > windowHeight);
      }
    };

    // Add throttling to improve performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[35.5rem] -mt-1 sm:h-[35.5rem] lg:h-[130vh] xl:h-[130vh] 2xl:h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Swiper with Overlay */}
      <div className="absolute inset-0 scale-1">
        <video
          ref={videoRef}
          className="w-full h-full object-cover hidden md:block"
          loop
          playsInline
          autoPlay
          muted={isMuted}
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FFinal%20(1).mp4?alt=media&token=8fec843f-88b1-4233-a6e2-ab513c0bf572"
            type="video/mp4"
          />
        </video>
        <video
          ref={videoRef}
          className="w-full h-full object-cover md:hidden block"
          loop
          playsInline
          autoPlay
          muted={isMuted}
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FFinal%20Mobile%20(2).mp4?alt=media&token=8c1c80df-cbc0-4abd-bf1b-ef929bef9b2e"
            type="video/mp4"
          />
        </video>
        <div className={`${isFixed ? 'fixed' : 'absolute'} bottom-3 right-0 lg:bottom-2  lg2:right-20 w-full p-4 flex flex-row justify-end z-50 transition-all duration-300`}>
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <button
                className={`w-full text-[#0C3E49] rounded-full lg:rounded-[30px] text-[19px] py-1.5 px-2 lg:px-5 ${!isMuted ? "bg-white" : "bg-white/60"} h-full cursor-pointer flex items-center justify-center transition-all duration-300`}
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
