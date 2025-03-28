"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: { src: string; alt: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [duplicated, setDuplicated] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (scrollerRef.current && !duplicated) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      setDuplicated(true);
      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed, duplicated]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative overflow-hidden", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 md:gap-12 lg:gap-24 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map(({ src, alt }, idx) => (
            <li
            className="w-[45vw] h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[50vh] max-w-full relative rounded-xl overflow-hidden flex-shrink-0"
            key={idx}
            >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-1000 hover:scale-110"
            />
            </li>
        ))}
      </ul>
    </div>
  );
};
