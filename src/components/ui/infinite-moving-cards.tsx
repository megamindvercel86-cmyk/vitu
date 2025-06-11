import { cn } from "@/lib/utils";
import React from "react";

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
 
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative  2xl:max-w-[150rem] xl:max-w-[100rem] lg:max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            className="md:w-[361px] sm:w-[263px] 2xl:w-[500px]  w-[300px] relative  border-[#4F3737] border-[1px] rounded-[14px] pt-[30px] pb-[26px] px-[21px]"
            key={idx}
          >
            <blockquote>
              <div>
                <div className="relative z-20 flex flex-row items-center">
                  <span className="flex flex-row gap-5">
                    <div className="flex flex-col leading-8">
                      <div className="text-xl  text-customBrown font-freightNeoSemibold">{item.name}</div>
                      <div className="text-sm text-[#4F373799] flex">
                        {Array.from({ length: item.rating }).map((_, index) => (
                          <span key={index} className="text-yellow-500">
                            ★
                          </span>
                        ))}
                        {Array.from({ length: 5 - item.rating }).map((_, index) => (
                          <span key={index} className="text-gray-300">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <p className="mt-2 text-base font-FreightNeoProNormal 2xl:text-xl text-[#4F373799]">{item.comment}</p>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
