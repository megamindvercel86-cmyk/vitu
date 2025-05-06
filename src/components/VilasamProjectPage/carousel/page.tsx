"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-carousel-card";
import Link from "next/link";

// Dummy data for ProjectCarousel
const desktopDataRight = [
  { src: "/images/vilasamPageImages/carouselmages/1.png", alt: "Project 1" },
  { src: "/images/vilasamPageImages/carouselmages/2.png", alt: "Project 2" },
  { src: "/images/vilasamPageImages/carouselmages/4.png", alt: "Project 4" },
  { src: "/images/vilasamPageImages/carouselmages/5.png", alt: "Project 5" },
  { src: "/images/vilasamPageImages/carouselmages/6.png", alt: "Project 6" },
];

/**
 * ProjectCarousel Component
 * Displays client projects in an infinite scrolling carousel.
 * Contains a scrolling project showcase moving in the right direction.
 */
export default function VilasamCarousel(): React.ReactElement {
  return (
    <section className="bg-gradient-to-b md:py-32  pb-32">
      {/* Desktop Project Carousel - Right Direction */}
      <div className="rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
        <div className="pb-[130px] text-center">
          <p className="md:text-2xl text-[#0C3E49CC] max-w-2xl mx-auto font-geistSerif">
            A space that blends serenity with timeless luxury, because the best moments unfold where it truly feels like home.
          </p>
          <h2 className="md:text-6xl text-xl text-[#0C3E49] max-w-4xl mx-auto font-medium font-geistSerif">
            Every Visit, a Quiet Reminder of Why You Chose It
          </h2>
        </div>
        <div>
          <InfiniteMovingCards items={desktopDataRight} direction="left" speed="slow" />
        </div>
      </div>
      <Link href="/general-enquire">
        <div className="flex justify-center mt-16 md-2">
          <button className="px-8 py-3 border-[#AE8567] border-[2px] text-[#AE8567] rounded-full text-2xl font-FreightNeoProBold transition-colors">
            Contact Us for a Visit
          </button>
        </div>
      </Link>
    </section>
  );
}
