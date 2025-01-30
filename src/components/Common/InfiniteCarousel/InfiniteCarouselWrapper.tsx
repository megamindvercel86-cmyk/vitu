"use client";

import InfiniteCarousel from './InfiniteCarousel';

interface InfiniteCarouselWrapperProps {
  children: React.ReactNode;
  // Add any other props that InfiniteCarousel accepts
}

export default function InfiniteCarouselWrapper(props: InfiniteCarouselWrapperProps) {
  return <InfiniteCarousel {...props} />;
} 