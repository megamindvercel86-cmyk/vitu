"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import Typography from "../Typography/Typography";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number;
    comment: string;
    name: string;
    rating: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const addAnimation = useCallback(() => {
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
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  const [start, setStart] = useState(false);
  function getDirection() {
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
  }
  function getSpeed() {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "380s");
      }
    }
  }
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 2xl:max-w-[150rem] xl:max-w-[100rem] lg:max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
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
            className="md:w-[361px] sm:w-[263px] 2xl:w-[500px]  w-[300px] relative  border-[#4F3737] border-[1px] rounded-[14px] pt-[30px] pb-[26px] px-[21px]"
            key={item.name}
          >
            <blockquote>
              <div>
                <div className="relative z-20 flex flex-row items-center">
                  <span className="flex flex-row gap-5">
                    {/* <div>
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
                    </div> */}
                    <div className="flex flex-col leading-8">
                      <Typography
                        variant="custom"
                        className="text-[26px] text-3xl font-freightNeoMedium text-customBrown"
                      >
                        {item.name}
                      </Typography>
                      <Typography className="text-[#4F373799] 2xl:text-2xl font-normal">
                        {/* {item.place} */}
                        <span className="flex">
                          {Array.from({ length: item.rating }, (_, index) => (
                            <span key={index} className="text-yellow-500">
                              ★
                            </span>
                          ))}
                          {Array.from(
                            { length: 5 - item.rating },
                            (_, index) => (
                              <span key={index} className="text-gray-300">
                                ★
                              </span>
                            ),
                          )}
                        </span>
                      </Typography>
                    </div>
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <Typography
                  variant="custom"
                  className="text-base 2xl:text-2xl font-freightNeoMedium text-[#4F373799]"
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
