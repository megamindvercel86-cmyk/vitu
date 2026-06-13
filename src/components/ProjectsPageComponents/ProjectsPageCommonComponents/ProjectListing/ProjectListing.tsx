import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { PrimaryViewMoreButton, SecondaryViewMoreButton } from '@/components/Icons/Icons';
import Link from 'next/link';

type Card = {
  url?: string;
  title?: string;
  description?: string;
  category?: string;
  content?: React.ReactNode;
  type?: string;
  id?: number;
  href: string;
  soldOut?: boolean;
};


const ProjectListing = ({ card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  return (
    <Link href={card.href || ""}
      aria-label='Project'>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        className="md:rounded-[20px] overflow-hidden rounded-[30px] bg-gray-100 dark:bg-neutral-900 
          flex flex-col items-start justify-start relative z-10 w-full h-full group"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8 flex flex-col items-start">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white md:text-base font-medium text-left font-freightNeoMedium lg:text-base text-xs 2xl:text-3xl"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-freightNeoSemibold mt-2 2xl:text-5xl"
          >

            {card.title}
          </motion.p>
          {card.soldOut && (
            <div className="mt-2.5 inline-flex items-center justify-center rounded bg-[#AE8566] px-2.5 pt-2 pb-1 text-[10px] md:text-sm font-semibold tracking-wider text-white uppercase font-ttCommons">
              Sold Out
            </div>
          )}
          {!card.href && <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-freightNeoSemibold mt-2 2xl:text-5xl"
          >

            Coming Soon...
          </motion.p>}
          {/* <motion.p
            layoutId={layout ? `subtitle-${card.description}` : undefined}
            className="text-white text-xs lg:text-2xl xl:text-[26px] md:text-xl font-extralight max-w-xs text-left [text-wrap:balance] font-FreightNeoProNormal mt-2 2xl:text-3xl"
          >
            {card.description}
          </motion.p> */}
        </div>
        <BlurImage
          src={card.url || "/placeholder.svg"}
          alt={card.title || "Card image"}
          fill
          className="object-cover absolute z-10 inset-0 group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        {/* Bottom buttons container */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-2 z-50">
          <div />
          {card.href && (
            <div className="backdrop-blur-md bg-white/20 border border-white/30 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium hover:bg-white/30 transition-all duration-300 font-freightNeoMedium whitespace-nowrap">
              Learn More
            </div>
          )}
        </div>
      </motion.button>
    </Link>
  )
}

export default ProjectListing





export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
