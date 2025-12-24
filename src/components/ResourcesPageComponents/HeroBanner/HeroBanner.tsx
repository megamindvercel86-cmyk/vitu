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
  title: "Foundations for the Future",
  description: "Building Sustainably for a Better Tomorrow.",
  cta: "Read Now",
};

const BACKGROUND = {
  image: "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/videos%2FVID-20251217-WA0005.mp4?alt=media&token=82a57d0b-a02c-40ad-821e-b29674a0285a",
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

interface Point {
  title: string;
  description1: string;
  description2?: string;
  contentHtml?: string;
}

const project: {
  fileUrl: string;
  title: string;
  subtitle: string;
  topTitle: string;
  topDescription: string;
  points: Point[];
} = {
  fileUrl: "/images/resources.webp",
  title: "Foundations for the Future",
  subtitle: "Building Sustainably for a Better Tomorrow",
  topTitle: "",
  topDescription:
    "At Vitu Realty, we believe that the future of real estate lies not only in the structures we create but in the positive impact they have on the environment and the communities they serve. Sustainability is more than just a buzzword—it’s a guiding principle that informs every aspect of our building practices. As we move into the future, it is our responsibility to ensure that the properties we develop and the spaces we design are both environmentally friendly and future-ready.",
  points: [
    {
      title: "Why Sustainable Building Matters",
      description1:
        "Sustainable building is not a trend—it is a necessity. The growing demand for energy-efficient, eco-friendly properties reflects a shift in consumer preferences and an increasing awareness of our collective responsibility to the planet. As the world faces climate challenges, the construction industry has a crucial role to play in reducing carbon footprints, conserving resources, and promoting environmental stewardship. By embracing sustainable building practices, we not only reduce negative environmental impacts but also create healthier, more efficient living and working spaces for generations to come.",
    },
    {
      title: "The Core Principles of Sustainable Building",
      description1:
        "At Vitu Realty, our commitment to sustainability begins with a holistic approach to development. Our building practices integrate:",
      contentHtml: `<ul>
  <li style="margin-bottom:16px; font-size:18px;">
    <strong>Energy Efficiency:</strong> From the design phase to construction, we prioritize energy-efficient systems and materials. This includes maximizing natural light, installing high-efficiency HVAC systems, and incorporating renewable energy sources like solar panels.
  </li>
  <li style="margin-bottom:16px; font-size:18px;">
    <strong>Sustainable Materials:</strong> We choose materials that are renewable, durable, and responsibly sourced. From recycled materials to low-impact, non-toxic finishes, our buildings reflect our commitment to reducing waste and conserving resources.
  </li>
  <li style="margin-bottom:16px; font-size:18px;">
    <strong>Water Conservation:</strong> Our properties are designed with water-saving technologies that minimize waste and optimize usage, contributing to lower utility bills and environmental preservation.
  </li>
  <li style="margin-bottom:16px; font-size:18px;">
    <strong>Waste Reduction:</strong> During construction, we implement strategies to reduce, reuse, and recycle waste, ensuring less material ends up in landfills and supporting a more sustainable building process.
  </li>
  <li style="font-size:18px;">
    <strong>Indoor Environmental Quality:</strong> Sustainability also means improving occupant health and well-being. We use low-VOC paints, efficient air filtration systems, and proper ventilation to promote clean air and overall wellness.
  </li>
</ul>`,
    },
    {
      title: "",
      description1:
        "At Vitu Realty, we understand that building sustainably is not just about constructing buildings—it’s about building a better tomorrow. By embracing sustainable practices, we are helping to shape a world where both the environment and its inhabitants thrive in harmony. As we move forward, we remain dedicated to creating properties that are as kind to the planet as they are to those who inhabit them. Together, we can build the foundations for a more sustainable future—one project at a time.",
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
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={BACKGROUND.image} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

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
                          {point.title && (
                            <Typography variant="h3" className="font-freightNeoMedium text-xl md:text-2xl text-customBrown mb-2">
                              {point.title}
                            </Typography>
                          )}
                          {point.description1 && (
                            <Typography className="text-[#04070799] font-FreightNeoProNormal text-base md:text-lg mb-2">
                              {point.description1}
                            </Typography>
                          )}
                          {/* @ts-ignore */}
                          {point.contentHtml && (
                            <div
                              className="prose max-w-none text-[#04070799] font-FreightNeoProNormal !text-xl [&>p]:pb-6 [&_ul]:list-disc [&_ul]:pl-6"
                              dangerouslySetInnerHTML={{ __html: point.contentHtml }}
                            />
                          )}
                          {/* @ts-ignore */}
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
