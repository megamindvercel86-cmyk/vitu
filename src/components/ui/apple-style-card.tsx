"use client";

import React, { useState, useRef, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { PrimaryViewMoreButton, SecondaryViewMoreButton } from "../Icons/Icons";

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
}

export default function AppleStyleCard({
  id,
  category,
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
        <div className="fixed inset-0 h-screen z-50 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
            layoutId={`expandable-card-${id}`}
            className={cn(
              "max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 rounded-3xl font-sans relative overflow-hidden",
              expandedClassName
            )}
          >
            <div className="relative h-64 md:h-96">
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={title || "Card image"}
                fill
                className={cn("object-cover", expandedImageClassName)}
              />
            </div>
            <div className="p-4 md:p-10">
              <button
                className="absolute top-4 right-4 h-8 w-8 bg-black/50 hover:bg-black/70 dark:bg-white/20 dark:hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <IconX className="h-5 w-5 text-white" />
              </button>
              <motion.p
                layoutId={`card-category-${id}`}
                className={cn("text-base font-medium", categoryClassName)}
              >
                {category}
              </motion.p>
              <motion.p
                layoutId={`card-title-${id}`}
                className={cn(
                  "text-2xl md:text-5xl font-semibold mt-2",
                  titleClassName
                )}
              >
                {title}
              </motion.p>
              <div className="mt-6">{content}</div>
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
        onClick={() => setIsOpen(true)}
        className={cn(
          "bg-gray-100 dark:bg-neutral-900 overflow-hidden flex flex-col items-start justify-start relative z-10",
          className,
          cardClassName
        )}
      >
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={`card-category-${id}`}
            className={cn(
              "text-sm md:text-base font-medium font-sans text-left",
              categoryClassName
            )}
          >
            {category}
          </motion.p>
          <motion.p
            layoutId={`card-title-${id}`}
            className={cn(
              "text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2",
              titleClassName
            )}
          >
            {title}
          </motion.p>
        </div>
        <BlurImage
          src={imageSrc || "/placeholder.svg"}
          alt={title || "Card image"}
          fill
          className="object-cover absolute z-10 inset-0"
        />
        {/* Plus icon at the bottom right */}
        <div className="absolute bottom-4 right-4 z-50">
          {isViewMore === true &&
            (isViewMoreType === "primary" ? (
              <PrimaryViewMoreButton />
            ) : (
              <SecondaryViewMoreButton />
            ))}
        </div>

        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title || "Card image"}
          fill
          className={cn("object-cover absolute z-10 inset-0", imageClassName)}
        />
      </motion.button>

      {isMounted && createPortal(modalContent, document.body)}
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
        className
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
