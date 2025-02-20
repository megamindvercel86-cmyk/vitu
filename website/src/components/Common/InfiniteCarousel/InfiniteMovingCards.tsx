"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface InfiniteMovingCardsProps {
  items: Array<{
    name: string;
    place: string;
    comment: string;
    image: string;
  }>;
  direction: "left" | "right";
  speed: "slow" | "normal" | "fast";
}

export function InfiniteMovingCards({ items, direction, speed }: InfiniteMovingCardsProps) {
  // Your existing InfiniteMovingCards implementation
} 