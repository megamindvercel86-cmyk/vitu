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
  title: "Real Estate Trends in Mangalore",
  subtitle: "What’s Shaping the Market in 2025",
  topTitle: "",
  topDescription:
    "Mangalore, a coastal gem in Karnataka, is rapidly transforming into a real estate hub. With its balanced blend of urban infrastructure, natural beauty, and cultural depth, the Mangalore real estate market is attracting homebuyers, NRIs, and investors alike. As 2025 unfolds, new patterns are emerging that are reshaping property investment in this vibrant city.",
  points: [
    {
      title: "Plotted Developments Are in Demand",
      description1:
        "One of the biggest shifts in Mangalore’s property market is the rising demand for plots for sale in Mangalore. Buyers are increasingly preferring plotted developments over apartments, especially in suburban zones like Surathkal, Talapady and Kulshekar.",
      description2:
        "Plots offer flexibility, long-term value and lower maintenance costs making them an attractive choice for both investors and end users. With approvals from MUDA and RERA in place, plotted layouts are also gaining trust among first-time buyers.",
    },
    {
      title: "Gated Communities and Lifestyle Living",
      description1:
        "Modern homebuyers are prioritizing security, amenities, and community living. As a result, there’s a surge in gated communities in Mangalore featuring 24x7 surveillance, landscaped parks, clubhouses, and smart infrastructure.",
      description2:
        "Developers are investing in premium features like rainwater harvesting, solar lighting, and fiber connectivity, making these projects not just homes, but complete lifestyle experiences.",
    },
    {
      title: "Coastal Appeal Driving NRI Investment",
      description1:
        "Thanks to its scenic coastline and peaceful atmosphere, Mangalore continues to attract NRI investors and retirees looking for second homes. Areas closer to the coast like NITK, Panambur, Ullal and Someshwara are seeing increasing interest for vacation villas, holiday homes, and resale-ready plots.",
      description2:
        "With the Mangalore International Airport improving its connectivity, overseas buyers now see the city as a convenient and cost-effective alternative to Goa or Kerala.",
    },
    {
      title: "Affordable Investment Opportunities",
      description1:
        "Compared to metros like Bangalore or Chennai, real estate in Mangalore is still affordable. Whether it’s a small residential plot or a commercial property, the city offers attractive price points and good ROI potential. For budget-conscious buyers or young families, Mangalore presents an opportunity to own land in a growing city without breaking the bank.",
    },
    {
      title: "Sustainable and Smart Living Projects",
      description1:
        "As environmental awareness grows, Mangalore’s developers are focusing on green buildings, eco-friendly layouts, and smart homes. Projects offering sustainable features are becoming selling points, especially among younger and environmentally conscious buyers and investors.",
    },
    {
      title: "Why Mangalore is Worth Watching",
      description1:
        "If you're considering investing in property in Mangalore, 2025 offers an ideal window. From plotted developments to lifestyle communities and NRI-friendly projects, the city is geared for long-term growth. With robust infrastructure and competitive pricing, Mangalore real estate trends show strong potential for both capital appreciation and peaceful living.",
      description2:
        "Whether you're buying your first plot, upgrading your home, or planning a retirement getaway, Mangalore offers options that align with your needs and budget.",
    },
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
                      <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[10px] pb-1 !text-3xl">{project.subtitle}</Typography>
                      <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[10px] pb-10 !text-xl">{project.topDescription}</Typography>
                      {project.points.map((point, index) => (
                        <div key={index} className="mb-8">
                          <Typography variant="h3" className="font-freightNeoMedium text-xl md:text-2xl text-customBrown mb-2">
                            {point.title}
                          </Typography>
                          {point.description1 && (
                            <Typography className="text-[#04070799] font-FreightNeoProNormal text-base md:text-lg mb-2">
                              {point.description1}
                            </Typography>
                          )}
                          {point.description2 && (
                            <Typography className="text-[#04070799] font-FreightNeoProNormal text-base md:text-lg">{point.description2}</Typography>
                          )}
                        </div>
                      ))}

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
