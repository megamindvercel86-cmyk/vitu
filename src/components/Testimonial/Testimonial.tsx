"use client"

import React from "react"
import { InfiniteMovingCards } from "../ui/infinite-moving-cards"


export default function Testimonial() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={profiles} direction="right" speed="slow" className="py-20"/>
    </div>
  )
}

const profiles = [
  {
    name: "Alice Johnson",
    place: "New York, USA",
    comment: "Absolutely love the service! It's been a game-changer for my business.",
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    name: "Bob Smith",
    place: "London, UK",
    comment: "The team's responsiveness and attention to detail are unparalleled.",
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    name: "Carol Williams",
    place: "Sydney, Australia",
    comment: "Innovative solutions that have truly transformed our workflow.",
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    name: "David Brown",
    place: "Toronto, Canada",
    comment: "Exceptional quality and customer service. Highly recommended!",
    image: "/placeholder.svg?height=60&width=60"
  },
  {
    name: "Eva Martinez",
    place: "Barcelona, Spain",
    comment: "Their expertise and professionalism are second to none.",
    image: "/placeholder.svg?height=60&width=60"
  },
]
