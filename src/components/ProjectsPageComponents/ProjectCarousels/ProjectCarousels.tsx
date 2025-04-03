"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-carousel-card";
import Link from "next/link";

// Dummy data for ProjectCarousel
const desktopDataRight = [
  { src: "/images/carousal/slider1-min.jpg", alt: "Project 1" },
  { src: "/images/carousal/slider2-min.jpg", alt: "Project 2" },
  { src: "/images/carousal/slider3-min.jpg", alt: "Project 3" },
  { src: "/images/carousal/slider4-min.jpg", alt: "Project 4" },
  { src: "/images/carousal/slider5-min.jpg", alt: "Project 5" },
  { src: "/images/carousal/slider6-min.jpg", alt: "Project 6" },
];

/**
 * ProjectCarousel Component
 * Displays client projects in an infinite scrolling carousel.
 * Contains a scrolling project showcase moving in the right direction.
 */
export default function ProjectCarousel(): React.ReactElement {
  return (
    <section  className=" bg-gradient-to-b ">
      {/* Desktop Project Carousel - Right Direction */}
      <div className="rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
        <div >
          <InfiniteMovingCards items={desktopDataRight} direction="left" speed="slow" />
        </div>
      </div>
      <Link href="/general-enquire">
        <button className="px-8 py-3   border-[#AE8567] border-[2px] text-[#AE8567] rounded-full text-2xl font-FreightNeoProBold transition-colors mt-16">
          Contact Us for a Visit
        </button>
      </Link>
    </section>
  );
}
