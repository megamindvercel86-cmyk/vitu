"use client";

import InfiniteCarousel from "./InfiniteCarousel";

interface InfiniteCarouselWrapperProps {
  children: React.ReactNode;
  cards: {
    id: number;
    url: string;
    className?: string;
    startPosition?: { x?: number; y?: number };
    isViewMore?: boolean;
    position?: "left" | "right";
    bottomTitle?: string;
    type?: "primary" | "secondary";
    title?: string;
    subtitle?: string;
    category?: string;
    role?: string;
    role2?: string;
    name?: string;
    fileUrl?: string
  }[]; // Define the cards prop type
  // Add any other props that InfiniteCarousel accepts
}

export default function InfiniteCarouselWrapper({
  cards,
  ...props
}: InfiniteCarouselWrapperProps) {
  return <InfiniteCarousel cards={cards} {...props} />; // Pass cards prop to InfiniteCarousel
}
