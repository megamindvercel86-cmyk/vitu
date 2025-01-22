"use client"
import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { SecondaryViewMoreButton } from "../Icons/Icons"

interface CardProps {
  title: string
  src: string
  content: React.ReactNode
  className: string
}

export const AppleInspiredCard: React.FC<CardProps> = ({ title, src, content, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <motion.button
        layoutId={`card-${title}`}
        onClick={handleOpen}
        className={`rounded-[20px] overflow-hidden flex flex-col items-start justify-start relative z-10 ${className}`}
      >
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={`title-${title}`}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {title}
          </motion.p>
        </div>
        <BlurImage src={src} alt={title} fill className="object-cover absolute z-10 inset-0" />
         <div className="absolute bottom-6 right-6 z-50">
                    <SecondaryViewMoreButton />
                </div>
      </motion.button>

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
              layoutId={`card-${title}`}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={`title-${title}`}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {title}
              </motion.p>
              <div className="py-10">{content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

const BlurImage: React.FC<React.ComponentProps<typeof Image>> = ({ className, alt, ...props }) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      alt={alt}
      {...props}
    />
  )
}

