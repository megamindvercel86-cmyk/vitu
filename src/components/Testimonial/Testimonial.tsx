"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import Typography from "../Typography/Typography";

export default function Testimonial() {
  return (
    <div className="mt-[166px]">
      <div className="flex items-center justify-center flex-col mb-[90px]">
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
      <div className="rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards items={profiles} direction="right" speed="slow" />
      </div>
      <div className="rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards items={profiles} direction="left" speed="slow" />
      </div>
      <div className="flex items-center justify-center flex-col mt-[66px] mb-[145px]">
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

const profiles = [
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
