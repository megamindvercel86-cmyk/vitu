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
  href:string;
};


const ProjectListing = ( {card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  return (
   <Link href={card.href}> <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        className="md:rounded-[20px] overflow-hidden rounded-[30px] bg-gray-100 dark:bg-neutral-900 
          flex flex-col items-start justify-start relative z-10 w-full h-full"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
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
          className="object-cover absolute z-10 inset-0"
        />
        {/* Plus icon at the bottom right */}
        <div className="absolute bottom-4 right-4 z-50">
          {card.type === "primary" ? (
            <PrimaryViewMoreButton />
          ) : (
            <SecondaryViewMoreButton />
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
