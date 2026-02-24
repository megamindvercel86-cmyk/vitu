"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";

interface Props {
  open: boolean;
  closeModal: () => void;
  setSwiperInstance: (s: any) => void;
  setActiveIndex: (i: number) => void;
  activeIndex: number;
  handleDotClick: (i: number) => void;
  AmenityIcon: React.FC<{ name: string }>;
  CarouselDots: React.FC<any>;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 50 },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
  exit: { opacity: 0 },
};

export default function LyfeStyleModal({
  open,
  closeModal,
  setSwiperInstance,
  setActiveIndex,
  activeIndex,
  handleDotClick,
  AmenityIcon,
  CarouselDots,
}: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={{ zIndex: 2147483648 }}
          className="fixed inset-0 h-screen z-50 overflow-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          data-lenis-prevent

        >
          <motion.div
            variants={backdropVariants}
            className="backdrop-blur-lg h-full w-full fixed inset-0"
            onClick={closeModal}

          />

          <motion.div
            variants={cardVariants}
            className="max-w-4xl mx-auto bg-[#f8f6f5] h-fit z-[60] md:my-10 rounded-3xl font-sans relative shadow-2xl"

          >
            <motion.button
              variants={contentVariants}
              className="absolute top-6 z-50 me-4 lg:me-8 h-8 w-8 right-0 cursor-pointer ml-auto bg-white rounded-full flex items-center justify-center"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconX className="h-6 w-6 text-[#7a6d3c]" />
            </motion.button>

            <motion.div variants={contentVariants}>
              <div className="flex flex-col">
                <div className="relative w-full h-64 lg:h-[60vh] xl:h-[70vh] rounded-t-xl overflow-hidden">
                  <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop
                    onSwiper={setSwiperInstance}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    className="!w-full !pb-0 !pt-0 !h-full"
                  >
                    {[
                      "/images/vilasamPageImages/new1.webp",
                      "/images/vilasamPageImages/new2.webp",
                      "/images/vilasamPageImages/newgym.webp",
                      "/images/vilasamPageImages/new4.webp",
                      "/images/vilasamPageImages/lifestyle2.webp",
                    ].map((src, idx) => (
                      <SwiperSlide key={idx} className="!h-full !rounded-t-[10px] !w-full">
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-[100%_center]"
                          priority={idx === 0}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="absolute hidden lg:block bottom-10 right-10 z-50">
                    <CarouselDots total={5} active={activeIndex} onDotClick={handleDotClick} />
                  </div>
                </div>

                <div className="flex flex-col gap-4 py-12 px-6 lg:px-16">
                  <h2 className="font-theSeasons text-[#0C3E49] text-[24px] lg:text-[48px] font-semibold">
                    20,000{safeSpecialCharacters(" sq.ft of Lifestyle & Comfort")}
                  </h2>

                  <h2 className="font-bold text-[#0C3E4999] md:text-[24px] font-theSeasons md:pb-6 text-[18px]">
                    A space designed for leisure, wellness, and community
                  </h2>

                  <p className="text-[#0C3E4999] font-ttCommons text-base md:!text-xl">
                    {safeSpecialCharacters(
                      "At the heart of Vilasam lies The Club, a sprawling 20,000 sq.ft of clubhouse amenities designed to enrich everyday living. Whether it's a quiet moment of reflection or a lively gathering with neighbors, the clubhouse brings together spaces that cater to wellness, connection, and celebration."
                    )}
                  </p>

                  <p className="text-[#0C3E4999] font-ttCommons text-base md:!text-xl">
                    {safeSpecialCharacters(
                      "From indoor activity zones to calm corners for reading or relaxing, every detail has been thoughtfully curated to elevate the way you live. It's more than just a building, it's where community comes alive, and where every visit feels like an escape within your own neighborhood."
                    )}
                  </p>

                  <div className="mt-8">
                    <h3 className="font-bold text-[#0D3F4A] md:text-[24px] font-theSeasons pb-6 text-[18px]">
                      {safeSpecialCharacters("The Club - Amenities")}
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        "Lounge",
                        "Yoga Hall",
                        "Badminton Court",
                        "Library",
                        "Party Hall",
                        "Pickleball Court",
                        "Gymnasium",
                        "Swimming Pool",
                        "Indoor Games",
                      ].map((amenity, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <AmenityIcon name={amenity} />
                          </div>
                          <p className="text-[#0C3E4999] text-base md:!text-xl font-ttCommons">
                            {amenity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
