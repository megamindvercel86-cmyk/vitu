import Typography from "@/components/Typography/Typography";
import bgImage from "../../../../public/images/backgroundImages/homePageBackgroundImageDesktop.webp";
import Image from "next/image";

// ============= Constants =============
const HERO_CONFIG = {
  backgroundImage: "/images/backgroundImages/homePageBackgroundImageDesktop.webp",
  titles: {
    main: "Building Wholesome",
    sub: "Living Spaces",
  },
  description: "We create thoughtfully designed spaces that blend modern aesthetics with lasting quality in Mangalore.",
  tagline: "Where Modern Design Meets Enduring Quality",
};

/**
 * Home Hero Section Component
 * Optimized for SEO and Core Web Vitals
 */
export default function HomeHeroSection() {
  return (
    <section aria-labelledby="hero-heading">
      {/* Hero Background Section */}
      <div className="relative h-[35.5rem] sm:h-[35.5rem] lg:h-[100vh] lg2:h-[100vh] xl:h-[100vh] 2xl:h-screen">
        <Image
          src={bgImage}
          alt="Modern plotted development community in Mangalore by Vitu-Realty"
          fill
          className="object-cover"
          placeholder="blur"
          priority
          quality={85}
        />
        {/* Hero Content */}
        <div className="relative flex h-full justify-center top-[12.8125rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[34.375rem]">
          <div className="flex flex-col items-center text-center text-white">
            <h1 
              id="hero-heading"
              className="font-freightNeoSemibold leading-relaxed md:leading-none text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]"
            >
              {HERO_CONFIG.titles.main}
              <span className="sr-only"> in Mangalore</span>
            </h1>
            <h2 className="font-freightNeoSemibold leading-none text-[2.3rem] pt-0 sm:text-[2rem] md:text-[3.75rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]">
              {HERO_CONFIG.titles.sub}
            </h2>
          </div>
        </div>
      </div>

      {/* Description Section with Semantic HTML */}
      <article className="px-[1.875rem] pb-[3.75rem] pt-[4rem] text-center sm:px-[1.875rem] sm:pt-[4rem] md:pb-[6.9375rem] md:pt-[5.25rem] lg:pt-[6.5rem] xl:px-[24.125rem] xl:pt-[8rem]">
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-[#040707CC] text-[1rem] px-7 pb-6 sm:text-[1.375rem] md:px-0 md:text-[1.125rem] 2xl:text-[2.125rem]"
        >
          {HERO_CONFIG.description}
        </Typography>
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-customBrown text-[1.5rem] px-7 sm:text-[1.5rem] md:px-0 md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem]"
          aria-level={3}
        >
          {HERO_CONFIG.tagline}
        </Typography>
      </article>
    </section>
  );
}