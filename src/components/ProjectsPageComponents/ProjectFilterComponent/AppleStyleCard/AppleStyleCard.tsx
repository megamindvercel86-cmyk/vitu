"use client";

import React, { useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PrimaryViewMoreButton, SecondaryViewMoreButton } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";

interface CardProps {
  id: number; // Added id prop for unique layoutId
  category?: string;
  title?: string;
  content?: React.ReactNode;
  imageSrc?: string;
  className?: string;
  cardClassName?: string;
  imageClassName?: string;
  categoryClassName?: string;
  titleClassName?: string;
  expandedClassName?: string;
  expandedImageClassName?: string;
  isViewMore?: boolean;
  position?: "left" | "right";
  isViewMoreType?: "primary" | "secondary";
  bottomTitle?: string;
  isExpanded?: boolean;
  subtitle?: string;
  href:string;
}

export default function ProjectFilterAppleStyleCard({
  id,
  category,
  subtitle,
  title,
  content,
  imageSrc,
  className = "w-full h-full",
  cardClassName = "",
  imageClassName = "",
  categoryClassName = "",
  titleClassName = "",
  expandedClassName = "",
  expandedImageClassName = "",
  isViewMore = true,
  position = "right",
  isViewMoreType = "secondary",
  bottomTitle = "",
  isExpanded = true,
  href="",
}: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 h-screen mx-auto  z-50 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" backdrop-blur-lg h-full w-full fixed inset-0"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            layoutId={`expandable-card-${id}`}
            className={cn(
              "max-w-5xl  bg-white dark:bg-bg-[#F8F6F5] h-auto z-[60] my-10 sm:mx-5 md:mx-auto rounded-3xl font-sans relative overflow-hidden",
              expandedClassName,
            )}
          >
            <div className="relative h-auto "></div>
            <div className="">
              <button
                className="absolute top-4 right-4 h-8 w-8 bg-[#FFFFFF] rounded-full flex items-center justify-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <IconX className="h-5 w-5 text-black" />
              </button>

              <div>{content}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
    <Link href={href}>
      <motion.button
        layoutId={`expandable-card-${id}`}
        // onClick={() => setIsOpen(isExpanded)}
        className={cn(
          "bg-gray-100 dark:bg-neutral-900 overflow-hidden flex flex-col items-start justify-start relative z-10",
          className,
          cardClassName,
        )}
      >
       <div className="relative z-40 p-8">
          <motion.p
            layoutId={`card-category-${id}`}
            className={cn(
              "text-sm md:text-base font-freightNeoMedium text-white text-left pt-4",
              categoryClassName,
            )}
          >
            {category}
          </motion.p>
          <motion.p
            layoutId={`card-title-${id}`}
            className={cn(
              "text-xl md:text-2xl xl:text-3xl font-freightNeoSemibold text-white text-left [text-wrap:balance] mt- line-clamp-2",
              titleClassName,
            )}
          >
            {title}
          </motion.p>
          {/* <motion.p
            layoutId={`card-subtitle-${id}`}
            className={cn(
              "text-white text-xs lg:text-2xl xl:text-[26px] md:text-xl font-extralight max-w-xs text-left [text-wrap:balance] font-FreightNeoProNormal mt-2 2xl:text-3xl",
              titleClassName,
            )}
          >
            {subtitle}
          </motion.p> */}
        </div>
        <BlurImage
          src={imageSrc || "/placeholder.svg"}
          alt={title || "Card image"}
          fill
          className="object-cover absolute z-10 inset-0"
        />
        <div className="absolute bottom-4 md:left-8 left-4 z-50">
          <Typography
            variant="custom"
            className="text-white font-freightNeoSemibold md:font-FreightNeoProNormal md:text-2xl lg:text-4xl lg2:text-6xl   text-xl"
          >
            {bottomTitle}
          </Typography>
        </div>
        <div
          className={`absolute bottom-4 md:right-8 right-4 ${position === "right" ? "md:right-8" : "left-3"} position z-50`}
        >
          {isViewMore === true &&
            (isViewMoreType === "primary" ? (
              <PrimaryViewMoreButton />
            ) : (
              <SecondaryViewMoreButton />
            ))}
        </div>

        {/* <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title || "Card image"}
          fill
          className={cn("object-cover absolute z-10 inset-0", imageClassName)}
        /> */}
      </motion.button>
      </Link>

      {/* {isMounted && createPortal(modalContent, document.body)} */}
    </>
  );
}

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
