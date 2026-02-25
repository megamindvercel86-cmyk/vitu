"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-scroll";
import { AnimatedConicButton } from "@/components/ui/moving-border";

export default function DesignedForLiving() {
  const textContainerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track the visibility of the text for its animation
  const isTextInView = useInView(textContainerRef, { once: true, amount: 0.2 });

  // Continuously track the visibility of the video to control playback
  const isVideoInView = useInView(videoRef, { amount: 0.5 });

  // This effect pauses the video when it's not in view
  useEffect(() => {
    if (!isVideoInView && videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  }, [isVideoInView]);

  const containerVariants = {
    hidden: {},
    visible: {},
  };

  const firstSpanVariants = {
    hidden: { opacity: 0, filter: "blur(1vw)", scaleX: 0.97, scaleY: 0.95 },
    visible: {
      opacity: 1,
      filter: "blur(0vw)",
      scaleX: 1,
      scaleY: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const secondSpanVariants = {
    hidden: { opacity: 0, filter: "blur(1vw)", scaleX: 1.02, scaleY: 0.95 },
    visible: {
      opacity: 1,
      filter: "blur(0vw)",
      scaleX: 1,
      scaleY: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const handleClick = () => {
    sessionStorage.setItem("eliteFormTitle", "DOWNLOAD E-BROCHURE");
    window.dispatchEvent(new Event("storageChange"));
  };

  return (
    <section className=" text-center px-4 py-16 border overflow-hidden">
      {/* Headline */}
      <motion.h2
        ref={textContainerRef}
        initial="hidden"
        animate={isTextInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-3xl text-[#1C1213] md:text-[5rem] lg2:text-9xl font-light font-FreightNeoProNormal tracking-wide leading-none"
      >
        <motion.span className="block" variants={firstSpanVariants}>
          DESIGNED FOR
        </motion.span>
        <motion.span className="block " variants={secondSpanVariants}>
          INSPIRED LIVING
        </motion.span>
      </motion.h2>

      {/* YouTube Video */}
      <div className="mt-10 relative w-full max-w-7xl mx-auto aspect-video">
     <video
  ref={videoRef}
  className="w-full h-full"
  src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/Elite%20Walkthrough%20Website%20(1).mp4?alt=media&token=6759359a-c42b-40c7-bfab-549932a9dc51"
  controls
  playsInline
/>
      </div>

      {/* Download Button */}
      <div className="mt-6">
        <Link
          onClick={handleClick}
          to="elitForm"
          className="inline-flex cursor-pointer items-center justify-center gap-2  mt-10   text-[#1C1213] border-[0.25px]  border-[#1C1213]/20 rounded-full text-sm font-medium lg:text-xl  "
        >
          <AnimatedConicButton theme="light" className="hidden !text-[#1C1213] lg:font-medium lg:font-freightNeoMedium md:flex !bg-none">
            <span className="flex gap-2 items-center">
              PROJECT HIGHLIGHTS
              <svg className="mt-1"  width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.80422 6.7666L8.49957 14.3856L16.1959 6.7666" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10"/>
<path d="M8.50053 14.3839L8.50053 0.137695" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10"/>
</svg>

            </span>
          </AnimatedConicButton>
        </Link>
      </div>
    </section>
  );
}
