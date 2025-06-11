"use client";

// ============= Component Imports =============
import Button from "@/components/Common/Button";
import Typography from "@/components/Typography/Typography";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
// ============= Constants =============
const CONTENT = {
  badge: "BLOG",
  title: "Is it Really worth it?",
  description: "Is real estate investment worth it? We break down the pros, cons and key considerations to help you decide.",
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

const project = {
  fileUrl: "/images/backgroundImages/resourcesPageBackground.png",
  title: "Is Real Estate Investment Really Worth It?",
  subtitle: "Breaking down the advantages and pitfalls of investing in property.",
  topTitle: "Introduction",
  topDescription:
    "Real estate has long been considered a stable investment. However, like any investment, it comes with its own set of challenges. In this blog, we analyze whether it’s truly worth putting your money into property.",
  middleTitle: "Pros of Real Estate Investment",
  middlePoints: [
    "Tangible asset that appreciates over time",
    "Regular income through rentals",
    "Tax benefits and deductions",
    "Hedge against inflation",
  ],
  middleTitle2: "Cons of Real Estate Investment",
  middlePoints2: [
    "Requires significant upfront capital",
    "Low liquidity compared to stocks or mutual funds",
    "Property management responsibilities",
    "Market risks and unexpected expenses",
  ],
};
export default function HeroBanner(): React.ReactElement {
  // ============= Render Helpers =============

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState<number>(1);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const renderContent = () => (
    <div className="text-white sm:mb-0 mb-0 md:mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0 xl:flex-col xl:items-start">
      {/* Text Content */}
      <div>
        <Typography variant="custom" className="text-white lg2:text-2xl md:text-xl sm:text-xs 2xl:text-[2.5rem]">
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
          onClick={handleOpenModal}
          className="rounded-[2rem] bg-transparent border-2 w-full md:w-[11.688rem] lg:h-[3.5rem] sm:text-base lg2:text-[1.5rem] border-white 2xl:text-[3rem] 2xl:h-[6rem] 2xl:w-[20rem] 2xl:rounded-[3rem]"
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${BACKGROUND.image}")` }} />

        {/* Content Container */}
        <div className="relative h-full flex items-end pb-8 lg2:pb-24">
          <div className="w-full">
            <div className="xl:px-[13.125rem] lg:px-[4.875rem] sm:px-[1.625rem] px-[1.625rem]">{renderContent()}</div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 h-screen w-screen overflow-auto scrollbar-hide"
            style={{ zIndex: 2147483648 }} // Higher than the WhatsApp widget
            data-lenis-prevent
          >
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
              // ref={containerRef}
              // layoutId={`expandable-card-${id}`}
              className={cn(
                "lg:mx-16 lg2:mx-auto lg2:max-w-5xl  bg-white z-[9999] dark:bg-bg-[#F8F6F5]  h-auto  md:my-10 sm:mx-5 md:mx-auto md:rounded-[32px] font-sans relative overflow-hidden"
                // expandedClassName
              )}
            >
              <div className="relative h-auto "></div>
              <div className="">
                <button
                  aria-label="Close Modal"
                  className="absolute top-4 right-4 h-8 w-8 bg-[#FFFFFF]  z-[9999] rounded-full flex items-center justify-center transition-colors"
                  onClick={handleCloseModal}
                >
                  <IconX className="h-5 w-5 text-black" />
                </button>

                <div>
                  <div key={"dummy-content"} data-lenis-prevent>
                    <Image
                      src={project.fileUrl || "/placeholder.svg"}
                      alt={"Card image"}
                      width={1042}
                      height={45}
                      className={cn("object-cover   h-[652px] w-full")}
                    />
                    <div className="p-4 md:p-10">
                      <Typography variant="h1" className="text-customBrown font-freightNeoMedium">
                        {project.title}
                      </Typography>
                      <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[10px] pb-10 !text-3xl">{project.subtitle}</Typography>
                      <Typography variant="h3" className="text-customBrown font-freightNeoMedium">
                        {project.topTitle}
                      </Typography>
                      <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[10px] pb-10 !text-xl">{project.topDescription}</Typography>
                      {project.middlePoints && (
                        <Typography variant="h3" className="text-customBrown font-freightNeoMedium">
                          {project.middleTitle}
                        </Typography>
                      )}
                      {project.middlePoints && (
                        <ul className="text-[#04070799] font-FreightNeoProNormal pt-[10px] pb-10 !text-xl list-disc pl-6 leading-10">
                          {project.middlePoints?.map((point, index) => (
                            <li key={index} className="pb-4">
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                      {project.middleTitle2 && (
                        <Typography variant="h3" className="text-customBrown font-freightNeoMedium">
                          {project.middleTitle2}
                        </Typography>
                      )}
                      {project.middleTitle2 && (
                        <ul className="text-[#04070799] font-FreightNeoProNormal pt-[10px] pb-10 !text-xl list-disc pl-6">
                          {project.middlePoints2?.map((point, index) => (
                            <li key={index} className="pb-4">
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    
                      {/* <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[10px] !text-xl">{project.topDescription}</Typography> */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
