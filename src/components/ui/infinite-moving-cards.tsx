"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    comment: string;
    name: string;
    place: string;
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 xl:max-w-[100rem] lg:max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="md:w-[361px] sm:w-[263px]  max-w-full relative  border-[#4F3737] border-[1px] rounded-[14px] pt-[30px] pb-[26px] px-[21px]"
            key={item.name}
          >
            <blockquote>
              <div>
                <div className="relative z-20 flex flex-row items-center">
                  <span className="flex flex-row gap-5">
                    <div>
                      {item.image ? (
                        <Image
                          src={item.image}
                          width={53}
                          height={53}
                          alt={item.name}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-[53px] h-[53px] bg-[#D9D9D9] rounded-full" />
                      )}
                    </div>
                    <div className="flex flex-col leading-8">
                      <Typography
                        variant="custom"
                        className="text-[26px] font-freightNeoMedium text-customBrown"
                      >
                        {item.name}
                      </Typography>
                      <Typography className="text-[#4F373799] font-normal">
                        {item.place}
                      </Typography>
                    </div>
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <Typography
                  variant="custom"
                  className="text-base font-freightNeoMedium text-[#4F373799]"
                >
                  {item.comment}
                </Typography>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
