"use client";

// ============= Component Imports =============
import Button from "@/components/Common/Button";
import Typography from "@/components/Typography/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
// ============= Constants =============
const CONTENT = {
  badge: "BLOG",
  title: "Is it Really worth it?",
  description:
    "Is real estate investment worth it? We break down the pros, cons, and key considerations to help you decide.",
  cta: "Read Now",
};

const BACKGROUND = {
  image: "/images/backgroundImages/resourcesPageBackground.png",
};

/**
 * Hero Banner Component
 * Main banner section for resources page
 *
 * Features:
 * 1. Full-width background image
 * 2. Content aligned to bottom
 * 3. Responsive text and layout
 * 4. CTA button
 *
 * Layout:
 * - Desktop: Left-aligned content with right-aligned CTA
 * - Mobile: Stacked layout with full-width CTA
 *
 * @returns {React.ReactElement} The HeroBanner component
 */
export default function HeroBanner(): React.ReactElement {
  // ============= Render Helpers =============

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState<number>(1); 
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const renderContent = () => (
    <div className="text-white sm:mb-0 mb-0 md:mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 xl:flex-col xl:items-start">
      {/* Text Content */}
      <div>
        <Typography
          variant="custom"
          className="text-white lg2:text-2xl md:text-xl sm:text-xs 2xl:text-[2.5rem]"
        >
          {CONTENT.badge}
        </Typography>
        <Typography
          variant="custom"
          className="text-white font-freightNeoMedium lg2:text-[4rem] md:text-[2.5rem] sm:text-[2rem] xl:text- text-[2rem] 2xl:text-[7.375rem]"
        >
          {CONTENT.title}
        </Typography>
        <Typography
          variant="custom"
          className="text-white lg2:text-2xl md:text-xl sm:text-sm text-sm font-freightNeoMedium lg2:max-w-2xl md:max-w-sm xl:w-[38.688rem] 2xl:w-[50rem] w-full 2xl:text-[2rem]"
        >
          {CONTENT.description}
        </Typography>
      </div>

      {/* CTA Button */}
      <div className="w-full lg:w-auto md:w-full lg:block xl:hidden">
        <Button
        onClick={handleOpenModal}
          className="rounded-[2rem] bg-transparent border-2 w-full lg2:w-[15.688rem] lg2:h-[4.5rem] md:w-[11.688rem] md:h-[3.5rem] sm:text-base md:text-[1.5rem] lg2:text-[2rem] border-white 2xl:text-[3rem] 2xl:h-[6rem] 2xl:w-[20rem] 2xl:rounded-[3rem]"
        >
          {CONTENT.cta}
        </Button>
      </div>
    
      {/* CTA Button for XL screens */}
      <div className="hidden xl:block mt-4">
        <Button
          onClick={() => {}}
          className="rounded-[2rem] bg-transparent border-2 w-full md:w-[15.688rem] lg:h-[4.5rem] sm:text-base lg:text-[2rem] border-white 2xl:text-[3rem] 2xl:h-[6rem] 2xl:w-[20rem] 2xl:rounded-[3rem]"
        >
          {CONTENT.cta}
        </Button>
      </div>
    </div>
  );

  return (
    <>
    <div className="relative h-[35.5rem] sm:h-[35.5rem] lg:h-[100vh] lg2:h-[100vh] xl:h-[100vh]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${BACKGROUND.image}")` }}
      />

      {/* Content Container */}
      <div className="relative h-full flex items-end pb-8 lg2:pb-24">
        <div className="w-full">
          <div className="xl:px-[13.125rem] lg:px-[4.875rem] sm:px-[1.625rem] px-[1.625rem]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
    <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-bold mb-2">Hi, I’m a Modal 👋</h2>
              <p className="mb-4 text-sm text-gray-600">This is an example of a modal with smooth animations using Framer Motion.</p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
