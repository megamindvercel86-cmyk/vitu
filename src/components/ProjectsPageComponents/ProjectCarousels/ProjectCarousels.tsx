"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-carousel-card";

// Dummy data for ProjectCarousel
const desktopDataRight = [
  { src: "/images/timelineImages/timelineImage8.png", alt: "Project 1" },
  { src: "/images/backgroundImages/aboutPageBackgroundImageDesktop.png", alt: "Project 2" },
  { src: "/images/backgroundImages/homePageBackgroundImageDesktop.png", alt: "Project 3" },
  { src: "/images/backgroundImages/resourcesPageBackground.png", alt: "Project 4" },

];

/**
 * ProjectCarousel Component
 * Displays client projects in an infinite scrolling carousel.
 * Contains a scrolling project showcase moving in the right direction.
 */
export default function ProjectCarousel(): React.ReactElement {
  return (
    <section className="pb-24">
      {/* Desktop Project Carousel - Right Direction */}
      <div className="rounded-md flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards items={desktopDataRight} direction="left" speed="slow" />
      </div>
    </section>
  );
}
