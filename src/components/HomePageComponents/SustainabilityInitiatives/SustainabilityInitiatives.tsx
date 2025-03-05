"use client";

// ============= Component Imports =============
import Typography from "@/components/Typography/Typography";
import AppleStyleCard from "@/components/ui/apple-style-card";
import InfiniteCarousel from "@/components/Common/InfiniteCarousel/InfiniteCarousel";
import CardContent from "@/components/Common/CardContents/CardContents";
import sustainabilityInitiatives from "@/data/sustainabilityInitiatives.json";
// ============= Types & Interfaces =============
interface InitiativeCard {
  id: number;
  url: string;
  bottomTitle: string;
  content?: string;
}

// ============= Constants =============
const CONTENT = {
  title: "Our Commitment to Sustainability",
  description:
    "Our commitment to sustainability drives us to create eco-friendly, energy-efficient spaces that benefit both our clients and the planet.",
};

const INITIATIVE_CARDS: InitiativeCard[] = [
  {
    id: 14,
    url: "/images/SustainabilityInitiativesImages/1.png",
    bottomTitle: "Beach cleaning",
    content:
      "We are actively preserving coastal ecosystems through regular beach cleanups, consciously contributing to cleaner shores and healthier marine life.",
  },
  {
    id: 15,
    url: "/images/SustainabilityInitiativesImages/2.png",
    bottomTitle: "500+ Tree Cover",
    content:
      "With over 500 trees, we are prioritizing tree cover expansion within and around developments to enhance biodiversity, improve air quality, and create shaded, vibrant spaces.",
  },
  {
    id: 16,
    url: "/images/SustainabilityInitiativesImages/3.png",
    bottomTitle: "Emission control",
    content:
      "We’re committed to building a cleaner future by integrating energy-efficient systems. From using sustainable materials to adopting innovative technologies that cut down emissions, every step we take is guided by the goal of creating healthier, more sustainable communities for generations to come.",
  },
  // Duplicate cards for infinite scroll

  {
    id: 17,
    url: "/images/SustainabilityInitiativesImages/1.png",
    bottomTitle: "Beach cleaning",
    content:
      "We are actively preserving coastal ecosystems through regular beach cleanups, consciously contributing to cleaner shores and healthier marine life.",
  },
  {
    id: 18,
    url: "/images/SustainabilityInitiativesImages/2.png",
    bottomTitle: "500+ Tree Cover",
    content:
      "With over 500 trees, we are prioritizing tree cover expansion within and around developments to enhance biodiversity, improve air quality, and create shaded, vibrant spaces.",
  },
  {
    id: 19,
    url: "/images/SustainabilityInitiativesImages/3.png",
    bottomTitle: "Emission control",
    content:
      "We’re committed to building a cleaner future by integrating energy-efficient systems. From using sustainable materials to adopting innovative technologies that cut down emissions, every step we take is guided by the goal of creating healthier, more sustainable communities for generations to come.",
  },
];

/**
 * Sustainability Initiatives Component
 * Showcases company's environmental and sustainability efforts
 *
 * Features:
 * 1. Title and description section
 * 2. Desktop: Grid layout with large images
 * 3. Mobile: Carousel of initiatives
 *
 * Layout:
 * - Desktop: Two-column with staggered images
 * - Mobile: Single column with carousel
 *
 * @returns {React.ReactElement} The SustainabilityInitiatives component
 */
export default function SustainabilityInitiatives(): React.ReactElement {
  // ============= Render Helpers =============
  const renderLeftColumn = () => (
    <div className="md:w-1/2 md:flex md:flex-col mx-[28px] sm:mx-[28px] md:mx-0">
      <div className="max-w-[700px] lg:max-w-none mx-auto lg:mx-0">
        <Typography
          variant="custom"
          className="text-customBrown text-2xl md:text-[50px] xl:text-[60px] leading-[1.1] md:leading-[1.2] xl:leading-[67px] font-freightNeoMedium mb-4 md:mb-6"
        >
          {CONTENT.title}
        </Typography>
        <Typography variant="custom" className="md:text-[#4F373799] text-[#04070799] text-base md:text-xl xl:text-2xl font-freightNeoMedium md:mb-12">
          {CONTENT.description}
        </Typography>
        <div className="hidden lg:mt-auto md:block">
          <AppleStyleCard
            key={11}
            id={11}
            imageSrc={INITIATIVE_CARDS[0].url}
            className="md:max-w-[528px] 2xl:max-w-full xl:max-w-[664px] md:h-[460px] lg:h-[660px] w-full"
            cardClassName="rounded-[20px]"
            bottomTitle={INITIATIVE_CARDS[0].bottomTitle}
            content={<CardContent id={INITIATIVE_CARDS[0].id} />}
          />
        </div>
      </div>
    </div>
  );

  const renderRightColumn = () => (
    <div className="hidden mb-40 md:w-1/2 md:flex md:mt-0">
      <div className="flex flex-col items-end w-full gap-8 lg:gap-12 xl:gap-16">
        <AppleStyleCard
          key={12}
          id={12}
          imageSrc={INITIATIVE_CARDS[1].url}
          className="md:max-w-[593px] 2xl:max-w-[80%] md:h-[542px] lg:h-[742px] w-full"
          cardClassName="rounded-[20px]"
          bottomTitle={INITIATIVE_CARDS[1].bottomTitle}
          content={<CardContent id={INITIATIVE_CARDS[1].id} />}
        />
        <AppleStyleCard
          key={13}
          id={13}
          imageSrc={INITIATIVE_CARDS[2].url}
          className="md:max-w-[593px]  md:h-[260px] 2xl:max-w-[80%] lg:h-[256px] w-full"
          cardClassName="rounded-[20px]"
          bottomTitle={INITIATIVE_CARDS[2].bottomTitle}
          content={<CardContent id={INITIATIVE_CARDS[2].id} />}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row lg:gap-8 md:gap-6 mx-0 sm:mx-0 md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[13.125rem]">
      {/* Left Column - Content and First Image */}
      {renderLeftColumn()}

      {/* Right Column - Staggered Images (Desktop) */}
      {renderRightColumn()}

      {/* Mobile Carousel */}
      <div className="block mb-12 md:hidden">
        <InfiniteCarousel cards={INITIATIVE_CARDS} data={sustainabilityInitiatives}/>
      </div>
    </div>
  );
}
