"use client";

import { Mute, UnMute } from "@/components/Icons/Icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
    <section ref={sectionRef} className="relative w-full h-[100vh] md:h-[120vh] lg:h-[120vh] lg2:h-[200vh] xl:h-[150vh]  flex flex-col justify-center items-center text-center px-4 overflow-hidden">
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
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FEntrance%20(4).mp4?alt=media&token=7f276e50-f65e-4abb-9796-ee9a51eef2ac"
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
            src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FEntrance%20Mobile%20(3).mp4?alt=media&token=c63b8f1d-f9aa-4ac5-995f-55081d47ef8b"
            type="video/mp4"
          />
        </video>
        <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-black/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[40px] md:h-[200px] bg-gradient-to-t from-white via-white/85 via-50% to-transparent z-[10] md:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-[50px] md:h-[200px] bg-gradient-to-t from-white via-transparent to-transparent z-[10] hidden md:block" />

        <div className="absolute bottom-0 left-0 right-0 h-[50px] lg:h-[200px] bg-gradient-to-b from-transparent to-white opacity-2000"></div>

        <div className={`${isFixed ? 'fixed' : 'absolute'} bottom-24 right-0 md:right-4 md:bottom-16 lg:bottom-20  lg2:right-2 w-full p-4 flex flex-row justify-end z-50 transition-all duration-300`}>
          <div className="flex gap-4">
            <div className="cursor-pointer" onClick={toggleMute}>
              <button
                className={`w-full text-[#0C3E49] rounded-full lg:rounded-[30px] text-[19px] py-2 px-2 lg:px-5 ${!isMuted ? "bg-white" : "bg-white/60"} h-full cursor-pointer flex items-center justify-center transition-all duration-300`}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {!isMuted ? <Mute /> : <UnMute />}
                <span className="ml-2 hidden text-sm lg:block">Site contains Audio Elements</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute flex bottom-20   lg2:bottom-60  items-center justify-center sm:justify-between gap-3 pl-8 pr-3 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md animate-fadeIn`}
      >
        <div className="font-medium text-[#0C3E49] text-sm lg2:text-[32px] md:text-lg font-sourceSans3">Bookings Open Soon</div>
        <Link href="/project-enquire">
          <button
            // onClick={onCtaClick}
            className="px-6 lg2:px-10 py-2 text-sm lg2:text-[32px] lg2:py-5 bg-[#0C3E49] md:text-lg font-sourceSans3 text-white rounded-full transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Show your Interest
          </button>
        </Link>
      </div>
      {/* Main Content */}
      <div className="absolute top-36 md:top-44 lg2:top-60 lg:top-36  mx-auto text-white px-4 z-10">
        <h1 className="text-3xl md:text-5xl lg:text-5xl lg2:text-[100px] leading-none font-geistSerif text-[#F5F5F7]">
          Homes that <br />
          Breathe with you
        </h1>
        <p className="lg2:text-2xl lg:text-xl md:text-xl text-l font-medium mt-5 font-sourceSans3">Unwind Across 169 Cents of Coastal Charm, Made Affordable</p>
      </div>
    </section>
  );
};

export default VilasamHeroSection;
