"use client";

import React, { useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { PrimaryViewMoreButton, SecondaryViewMoreButton } from "../Icons/Icons";
import Typography from "../Typography/Typography";

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
  isViewMoreType?: "primary" | "secondary" | string;
  bottomTitle?: string;
  isExpanded?: boolean;
  subtitle?: string;
  onOpenChange?: (open: boolean) => void;
}


export default function AppleStyleCard({
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
  onOpenChange,
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

    if (onOpenChange) {
      onOpenChange(isOpen);
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onOpenChange]);


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
        <div
          className="fixed  inset-0 h-screen w-screen overflow-auto scrollbar-hide"
          style={{ zIndex: 2147483648 }} // Higher than the WhatsApp widget
          data-lenis-prevent
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/30 backdrop-blur-lg h-full w-full fixed inset-0"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            layoutId={`expandable-card-${id}`}
            className={cn(
              "lg:mx-16 lg2:mx-auto border-[1px] border-[#bdbec2] lg2:max-w-5xl  bg-white z-[9999] dark:bg-bg-[#F8F6F5]  h-auto my-6 mx-4 rounded-xl  md:my-10 sm:mx-5 md:mx-auto md:rounded-[32px] font-sans relative overflow-hidden",
              expandedClassName
            )}
          >
            <div className="relative h-auto "></div>
            <div className="">
              <button
                aria-label="Close Modal"
                className="absolute top-4 right-4 h-8 w-8 bg-[#FFFFFF]  z-[9999] rounded-full flex items-center justify-center transition-colors"
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
      <motion.button
        layoutId={`expandable-card-${id}`}
        onClick={() => setIsOpen(isExpanded)}
        className={cn("bg-gray-100 dark:bg-neutral-900 overflow-hidden flex flex-col items-start justify-start relative ", className, cardClassName)}
      >
        <div className="relative z-50 p-8">
          {/* <motion.p
            layoutId={`card-category-${id}`}
            className={cn(
              "text-sm md:text-base font-freightNeoMedium text-white text-left pt-4",
              categoryClassName,
            )}
          >
            {category}
          </motion.p> */}
          <motion.p
            layoutId={`card-title-${id}`}
            className={cn(
              "text-xl md:text-2xl lg2:text-3xl font-freightNeoSemibold text-white text-left leading-[1.5rem] line-clamp-2",
              titleClassName
            )}
          >
            {title}
          </motion.p>
          <motion.p
            layoutId={`card-subtitle-${id}`}
            className={cn(
              "text-white text-xs lg2:text-2xl xl:text-[26px] md:text-xl font-extralight max-w-full text-left [text-wrap:balance] font-FreightNeoProNormal mt-2 2xl:text-3xl",
              titleClassName
            )}
          >
            {subtitle}
          </motion.p>
        </div>
        <BlurImage src={imageSrc || "/placeholder.svg"} alt={title || "Card image"} fill className="object-cover absolute z-10 inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent z-20" />
        <div className="absolute bottom-4 md:left-8 left-4 z-50">
          <Typography
            variant="custom"
            className="text-white font-freightNeoSemibold md:font-FreightNeoProNormal text-start md:text-2xl lg:text-2xl lg2:text-4xl text-xl"
          >
            {bottomTitle.split("").map((char, index) => (
              <span key={index} className={`${/\d/.test(char) ? "font-CandideCondensedNormal" : "font-FreightNeoProNormal"}`}>
                {char}
              </span>
            ))}
          </Typography>
        </div>
        <div className={`absolute bottom-3 right-3 ${position === "right" ? "right-3" : "left-3"} position z-50`}>
          {isViewMore === true && (isViewMoreType === "primary" ? <PrimaryViewMoreButton /> : <SecondaryViewMoreButton />)}
        </div>

        {/* <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title || "Card image"}
          fill
          className={cn("object-cover absolute z-10 inset-0", imageClassName)}
        /> */}
      </motion.button>

      {isMounted && createPortal(modalContent, document.body)}
    </>
  );
}

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
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
