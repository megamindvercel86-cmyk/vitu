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
      <div className="relative xl:h-[1080px] lg:h-[1026px] sm:h-[568px] h-[568px]   2xl:h-[100vh]">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url("${HERO_CONFIG.backgroundImage}")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        </div>

        {/* Hero Content */}
        <div className="relative h-full flex xl:top-[343px] lg:top-[247px] 2xl:top-[550px] sm:top-[157px] top-[157px] justify-center">
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="sm:text-[32px] md:text-[80px] text-[32px] font-freightNeoSemibold lg:text-[100px] 2xl:text-[150px] md:leading-none">
              {HERO_CONFIG.titles.main}
            </h1>
            <h1 className="sm:text-[32px] md:text-[80px] text-[32px] font-freightNeoSemibold lg:text-[100px] leading-none 2xl:text-[150px] md:pt-[28px] pt-0">
              {HERO_CONFIG.titles.sub}
            </h1>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="pt-[64px] leading-[1] sm:pt-[64px] md:pt-[84px] lg:pt-[104px] xl:pt-[128px] pb-[60px] md:pb-[111px] xl:px-[386px] sm:px-[30px] px-[30px] text-center">
        <div>
          <Typography
            variant="custom"
            className="font-freightNeoMedium font text-[#040707CC] pb-6 sm:text-[22px] md:text-[18px] text-[16px] px-7 md:px-0"
          >
            {HERO_CONFIG.description}
          </Typography>
        </div>
        <div>
          <Typography
            variant="custom"
            className="lg:text-[56px] sm:text-[24px] md:text-[40px] text-[24px] font-freightNeoMedium text-customBrown px-7 md:px-0"
          >
            {HERO_CONFIG.tagline}
          </Typography>
        </div>
      </div>
    </div>
  );
}
