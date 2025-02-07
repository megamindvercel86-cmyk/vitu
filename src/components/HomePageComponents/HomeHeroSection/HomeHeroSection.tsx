import Typography from "@/components/Typography/Typography";

// ============= Constants =============
const HERO_CONFIG = {
  backgroundImage: "/images/backgroundImages/homePageBackgroundImageDesktop.png",
  titles: {
    main: "Building Wholesome",
    sub: "Living Spaces",
  },
  description: "We create thoughtfully designed spaces that blend modern aesthetics with lasting quality.",
  tagline: "Where Modern Design Meets Enduring Quality",
};

/**
 * Home Hero Section Component
 * Main landing section of the home page
 * 
 * Features:
 * 1. Full-width background image with gradient overlay
 * 2. Centered main titles
 * 3. Description and tagline
 * 4. Responsive design for all screen sizes
 */
export default function HomeHeroSection() {
  return (
    <div>
      {/* Hero Background Section */}
      <div className="relative h-[35.5rem] sm:h-[35.5rem] lg:h-[64.125rem] xl:h-[67.5rem] 2xl:h-screen">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${HERO_CONFIG.backgroundImage}")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative flex h-full justify-center top-[9.8125rem] sm:top-[9.8125rem] lg:top-[15.4375rem] xl:top-[21.4375rem] 2xl:top-[34.375rem]">
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-[2rem] font-freightNeoSemibold leading-none sm:text-[2rem] md:text-[3.75rem] lg:text-[6.25rem] lg2:text-[6.25rem] 2xl:text-[9.375rem]">
              {HERO_CONFIG.titles.main}
            </h1>
            <h1 className="pt-0 text-[2rem] font-freightNeoSemibold leading-none sm:text-[2rem] md:pt-[1.75rem] md:text-[3.75rem] lg:text-[6.25rem] 2xl:text-[9.375rem]">
              {HERO_CONFIG.titles.sub}
            </h1>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-[1.875rem] pb-[3.75rem] pt-[4rem] text-center sm:px-[1.875rem] sm:pt-[4rem] md:pb-[6.9375rem] md:pt-[5.25rem] lg:pt-[6.5rem] xl:px-[24.125rem] xl:pt-[8rem]">
        <div>
          <Typography
            variant="custom"
            className="px-7 pb-6 text-[1rem] font-freightNeoMedium text-[#040707CC] sm:text-[1.375rem] md:px-0 md:text-[1.125rem] 2xl:text-[2.125rem]"
          >
            {HERO_CONFIG.description}
          </Typography>
        </div>
        <div>
          <Typography
            variant="custom"
            className="px-7 text-[1.5rem] font-freightNeoMedium text-customBrown sm:text-[1.5rem] md:px-0 md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem]"
          >
            {HERO_CONFIG.tagline}
          </Typography>
        </div>
      </div>
    </div>
  );
}
