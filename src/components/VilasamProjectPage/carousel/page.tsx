"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-carousel-card";
import Link from "next/link";
import VideoPlayer from "@/components/Common/VideoPlayer/page";

// Dummy data for ProjectCarousel
const desktopDataRight = [
  { src: "/images/vilasamPageImages/carouselmages/1.webp", alt: "Project 1" },
  { src: "/images/vilasamPageImages/carouselmages/2.webp", alt: "Project 2" },
  { src: "/images/vilasamPageImages/carouselmages/3.webp", alt: "Project 4" },
  { src: "/images/vilasamPageImages/carouselmages/4.webp", alt: "Project 5" },
  { src: "/images/vilasamPageImages/carouselmages/5.webp", alt: "Project 6" },
];

/**
 * ProjectCarousel Component
 * Displays client projects in an infinite scrolling carousel.
 * Contains a scrolling project showcase moving in the right direction.
 */
export default function VilasamCarousel(): React.ReactElement {
  return (
    <section className="bg-gradient-to-b">
      {/* Desktop Project Carousel - Right Direction */}
      <div  className="rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
        <div className="flex flex-col md:gap-12 gap-4  text-center">
          <p className=" text-[#0C3E49CC] mx-auto font-sourceSans3 md:text-xl  lg2:text-2xl lg:text-xl text-base px-4">
            Discover how our thoughtfully designed spaces offer a perfect
            <br className="hidden md:block" />
            blend of luxury, sustainability and a calming sense of belonging.
          </p>
          <h2 className="text-xl md:text-3xl lg:text-5xl lg2:text-6xl  md:max-w-5xl md:mx-3 lg:mx-auto font-medium font-geistSerif text-[#0C3E49]">
          Designed for Your Everyday Living
          </h2>
        </div>
        <div>
        <VideoPlayer
            videoUrl="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/videos%2FVITU%20Vilasam%20-%20Walkthrough.mp4?alt=media&token=ddce0ede-eca8-435c-9fac-ddab2391c73c"
            youtubeUrl="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/videos%2FVITU%20Vilasam%20-%20Walkthrough.mp4?a"
            thumbnail="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FFrame%203384457.png?alt=media&token=ae1d0d79-6c61-4025-98ef-f1a47b53ca96"
            titleClassname="font-bold"
            isYoutube={false}
          />
        </div>
      </div>
      {/* <Link href="/general-enquire">
        <div className="flex justify-center mt-16 md-2">
          <button aria-label="Contact Us for a Visit" className="px-8 py-3 border-[#0C3E49] border-[2px] text-[#0C3E49] rounded-full lg2:text-2xl font-sourceSans3 transition-colors">
            Contact Us for a Visit
          </button>
        </div>
      </Link> */}
    </section>
  );
}
