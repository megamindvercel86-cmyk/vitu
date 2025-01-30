"use client";

import React from "react";

import Typography from "@/components/Typography/Typography";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// Types definition for testimonial data
interface TestimonialData {
  name: string;
  place: string;
  comment: string;
  image: string;
}

// Sample testimonial data
const testimonialData: TestimonialData[] = [
  {
    name: "Alice Johnson",
    place: "New York, USA",
    comment:
      "Vitu Realty delivers on its promise of 'Better Design.' The intelligent use of space, premium amenities, & serene environment make it the perfect home for our family. It's a place where every corner feels like it was made just for us.",
    image: "",
  },
  {
    name: "Bob Smith",
    place: "London, UK",
    comment:
      "Vitu Realty delivers on its promise of 'Better Design.' The intelligent use of space, premium amenities, & serene environment make it the perfect home for our family. It's a place where every corner feels like it was made just for us.",
    image: "",
  },
  {
    name: "Carol Williams",
    place: "Sydney, Australia",
    comment:
      "Vitu Realty delivers on its promise of 'Better Design.' The intelligent use of space, premium amenities, & serene environment make it the perfect home for our family. It's a place where every corner feels like it was made just for us.",
    image: "",
  },
  {
    name: "David Brown",
    place: "Toronto, Canada",
    comment:
      "Vitu Realty delivers on its promise of 'Better Design.' The intelligent use of space, premium amenities, & serene environment make it the perfect home for our family. It's a place where every corner feels like it was made just for us.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Eva Martinez",
    place: "Barcelona, Spain",
    comment:
      "Vitu Realty delivers on its promise of 'Better Design.' The intelligent use of space, premium amenities, & serene environment make it the perfect home for our family. It's a place where every corner feels like it was made just for us.",
    image: "/placeholder.svg?height=60&width=60",
  },
];

/**
 * Testimonial Component
 * Displays client testimonials in an infinite scrolling carousel
 * Contains two sections:
 * 1. Header with title
 * 2. Scrolling testimonials in both directions
 */
export default function Testimonial(): React.ReactElement {
  return (
    <div className="xl:mt-[166px] lg:mt-[206px]   mt-12">
      {/* Testimonial Header Section */}
      <div className="flex items-center justify-center flex-col lg:mb-[90px] mb-9">
        <Typography variant="custom" className="text-customBrown md:text-lg text-xs font-freightNeoMedium">
          CLIENT TESTIMONIAL
        </Typography>
        <Typography
          variant="custom"
          className="text-customBrown md:text-[60px] leading-[28px] md:leading-[72px] xl:leading-[67px] text-2xl font-freightNeoMedium"
        >
          What our Clients say
        </Typography>
      </div>

      {/* Desktop Testimonial Carousel - Right Direction */}
      <div className="md:flex hidden rounded-md  flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards items={testimonialData} direction="right" speed="slow" />
      </div>

      {/* Mobile Testimonial Carousel - Left Direction */}
      <div className="rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards items={testimonialData} direction="left" speed="slow" />
      </div>

      {/* Read More Section */}
      <div className="flex items-center justify-center flex-col mt-6 md:mt-[66px] mb-11 md:mb-[145px]">
        <Typography
          variant="custom"
          className="text-customBrown font-FreightNeoProBold text-[22px]"
        >
          Read More
        </Typography>
      </div>
    </div>
  );
}
