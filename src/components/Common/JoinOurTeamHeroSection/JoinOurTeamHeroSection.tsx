"use client";

// ============= Component Imports =============
import Image from "next/image";
import Typography from "@/components/Typography/Typography";
import Link from "next/link";

// ============= Types & Interfaces =============
interface ImageConfig {
  width: number;
  height: number;
  quality: number;
}

// ============= Constants =============
const CONTENT = {
  title: ["Build Better with", "VITU Realty"],
  cta: "Enquire Now",
};

const IMAGES = {
  desktop: {
    src: "/images/backgroundImages/JoinOurTeamHeroSectionBackground.png",
    alt: "Construction site planning",
    config: {
      width: 1920,
      height: 1080,
      quality: 100,
    } as ImageConfig,
  },
  mobile: {
    src: "/images/backgroundImages/JoinOurTeamHeroSectionBackgroundMobile.webp",
    alt: "Construction site planning mobile",
    config: {
      width: 1080,
      height: 1920,
      quality: 100,
    } as ImageConfig,
  },
};

/**
 * Join Our Team Hero Section Component
 * Hero section for team recruitment with responsive design
 *
 * Features:
 * 1. Responsive background images
 * 2. Centered content with CTA
 * 3. Different CTAs for mobile/desktop
 *
 * Layout:
 * - Desktop: Full-width image with left-aligned content
 * - Mobile: Full-width image with centered content
 *
 * @returns {React.ReactElement} The JoinOurTeamHeroSection component
 */
export default function JoinOurTeamHeroSection(): React.ReactElement {
  // ============= Render Helpers =============
  const renderBackgroundImages = () => (
    <div className="absolute inset-0">
      {/* Desktop Background */}
      <Image {...IMAGES.desktop.config} src={IMAGES.desktop.src} alt={IMAGES.desktop.alt} className="hidden sm:block w-full h-full object-cover" />
      {/* Mobile Background */}
      <Image {...IMAGES.mobile.config} src={IMAGES.mobile.src} alt={IMAGES.mobile.alt} className="block sm:hidden w-full h-full object-cover" />
    </div>
  );

  const renderContent = () => (
    <div className="relative">
      <div className="mx-auto sm:mx-[28px] lg:pt-[124px] lg:pl-[74px] md:pt-[94px] md:pl-[54px] xl:pt-[128px] xl:pl-[210px] pt-[65px] px-auto">
        {/* Title */}
        <Typography
          variant="custom"
          className="text-white text-[32px] md:text-[50px] xl:text-[60px] leading-[1.1] md:leading-[1.2] xl:leading-[67px] text-center md:text-start font-freightNeoMedium mb-4 md:mb-6 2xl:text-[72px] mt-11 lg:mt-0"
        >
          {CONTENT.title[0]}
          <br />
          {CONTENT.title[1]}
        </Typography>

        {/* Desktop CTA */}
        <Link href="/project-enquire" aria-label="Go to Project Enquire Page">
          <button
            aria-label="Project Enquire Page"
            className="sm:hidden hidden md:block bg-white rounded-[57px] font-FreightNeoProBold text-[#79583F] text-[22px] px-[26px] h-[50px] 2xl:text-[32px] 2xl:h-[60px]"
          >
            Enquire Now
          </button>
        </Link>

        {/* Mobile CTA */}
        <div className="mx-6 mt-36">
          <Link href="/project-enquire" aria-label="Go to Project Enquire Page">
            <button
              aria-label="Project Enquire Page"
              className="md:hidden w-full block bg-[#ae8566] rounded-[57px] font-FreightNeoProBold text-white text-[22px] h-[50px]"
            >
              Enquire Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative xl:h-[1085px] sm:h-[404px] lg:h-[891px] md:h-[660px] h-[404px]">
      {renderBackgroundImages()}
      {renderContent()}
    </div>
  );
}
