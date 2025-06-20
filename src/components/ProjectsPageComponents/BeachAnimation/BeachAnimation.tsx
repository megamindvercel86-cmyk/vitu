"use client";
import { Mute, UnMute } from "@/components/Icons/Icons";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BeachAnimation = () => {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const getActiveVideoRef = () => (isDesktop ? desktopVideoRef.current : mobileVideoRef.current);

  const toggleMute = () => {
    const videoEl = getActiveVideoRef();
    if (videoEl) {
      const newMuteState = !isMuted;
      videoEl.muted = newMuteState; // ✅ Direct DOM update
      setIsMuted(newMuteState);
      setShowLabel(newMuteState);
      if (newMuteState === false && !isDesktop && !hasScrolled) {
        setHasScrolled(true);
      }
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Sync DOM with state on every change
  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;
    if (desktopVideo) desktopVideo.muted = isMuted;
    if (mobileVideo) mobileVideo.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const handleScroll = () => {
      if (!buttonRef.current) return;
      const videoEl = getActiveVideoRef();
      if (!videoEl) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonVisible = buttonRect.top >= 0 && buttonRect.bottom <= window.innerHeight;

      if (!buttonVisible) {
        setShowLabel(false);
        if (!videoEl.muted) {
          videoEl.muted = true;
          setIsMuted(true);
        }
      }

      if (!hasScrolled) setHasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop, hasScrolled]);

  return (
    <div ref={sectionRef} className="absolute h-[200vh] w-full">
      {/* Desktop Video */}
      <video
        className="w-full h-[250vh] xl:h-full object-cover hidden md:block"
        ref={desktopVideoRef}
        loop
        playsInline
        autoPlay
        muted
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FBeach.mp4?alt=media&token=d71ebe29-5784-4a56-b057-2af9454d29c3"
          type="video/mp4"
        />
      </video>

      {/* Mobile Video */}
      <video
        className="w-[100%] h-[125vh] object-cover block md:hidden"
        ref={mobileVideoRef}
        loop
        playsInline
        autoPlay
        muted
      >
        <source
          src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FBeach%20Mobile%20(2).mp4?alt=media&token=e13f036b-ffa3-45c7-92c7-03753c0b271d"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[#e6ddd6] via-transparent to-transparent" />

      <div
        ref={buttonRef}
        className={`absolute bottom-[1000px] right-0 lg:bottom-[740px] xl:bottom-[62rem] md:right-20 w-full p-4 flex flex-row ${
          !isDesktop && !hasScrolled ? "justify-center" : "justify-end"
        } lg:justify-end z-[1]`}
      >
        <div className="flex gap-4">
          <div className="cursor-pointer" onClick={toggleMute}>
            <motion.button
              layout="preserve-aspect"
              className={`inline-flex items-center justify-center px-3 lg:px-5 py-1.5 text-[19px] text-[#4F3737] rounded-full lg:rounded-[30px] ${
                isMuted ? "bg-white/60" : "bg-white"
              } cursor-pointer transition-colors duration-300 hover:shadow-md`}
              aria-label={isMuted ? "Unmute" : "Mute"}
              transition={{
                layout: {
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
            >
              {isMuted ? <UnMute /> : <Mute />}
              <AnimatePresence mode="wait">
                {isMuted && showLabel && (
                  <motion.span
                    key="audio-text"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: "auto",
                      opacity: 1,
                      transition: {
                        width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.3, delay: 0.1 },
                      },
                    }}
                    exit={{
                      width: 0,
                      opacity: 0,
                      transition: {
                        width: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    className="ml-2 text-sm whitespace-nowrap overflow-hidden"
                  >
                    Site contains Audio Elements
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeachAnimation;
