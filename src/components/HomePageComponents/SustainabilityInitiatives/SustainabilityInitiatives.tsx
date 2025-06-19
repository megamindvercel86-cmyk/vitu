"use client";

// ============= Imports =============
import { motion } from "framer-motion";
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
  fileUrl?: string;
  bottomTitle2?: string;
  content2?:string;
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
    fileUrl: "/images/SustainabilityInitiativesImages/1.png",
    bottomTitle: "Beach Cleaning & Tree Planting Drives",
    bottomTitle2:"Giving Back to Nature, Together",
    content:
      "Sustainability is more than just planning; it's about participating. At VITU, we regularly engage in on-ground activities like coastal clean-up drives and community tree-planting events. These collective efforts help restore natural ecosystems while inspiring a deeper bond between our residents and the environment around them.",
  content2:"These hands-on initiatives are our way of nurturing a culture of care. From keeping our shores plastic-free to planting roots that will grow for decades, we believe in small acts that ripple outwards. It’s our promise to leave the earth better than we found it and bring our community along on the journey."
    },
  {
    id: 15,
    url: "/images/SustainabilityInitiativesImages/2.png",
    fileUrl: "/images/SustainabilityInitiativesImages/2.png",
    bottomTitle: "Breathing Life: 500+ Tree Cover",
    bottomTitle2: "A green step for a greener future",
    content:
      "At VITU Realty, we’ve taken a conscious step toward preserving the planet by nurturing a tree cover of over 500 native and flowering species across our communities. These trees don’t just beautify the landscape, they purify the air, reduce urban heat, support local wildlife, and create a calming natural atmosphere for residents to enjoy every day.",
      content2:"Beyond their visible beauty, trees are our quiet protectors. They store carbon, improve air quality and play a vital role in the fight against climate change. Our green cover is an investment not just in today’s environment, but in tomorrow’s wellbeing ensuring healthier, more balanced communities for generations to come.",
  },
  {
    id: 16,
    url: "/images/SustainabilityInitiativesImages/3.png",
    fileUrl: "/images/SustainabilityInitiativesImages/3.png",
    bottomTitle: "Eco-Friendly Infrastructure",
    bottomTitle2:"Smart Living That Respects Nature",
    content:
      "Our developments are thoughtfully planned with eco-conscious systems like rainwater harvesting, groundwater recharge pits, solar-powered street lighting, and low-impact stampede concrete roads. These practices reduce dependency on finite resources while improving sustainability across every square foot of our spaces.",
      content2:"By thoughtfully building these features into every project, we’re shaping spaces that care for both people and the planet. Every drop saved, every watt powered by the sun, and every surface designed to recharge the earth makes your home part of a bigger solution, one that values responsible progress and a healthier planet."
  },
  // Duplicate cards for infinite scroll

  {
    id: 17,
    url: "/images/SustainabilityInitiativesImages/1.png",
    fileUrl: "/images/SustainabilityInitiativesImages/1.png",
    bottomTitle: "Beach Cleaning & Tree Planting Drives",
    bottomTitle2:"Giving Back to Nature, Together",
    content:
      "Sustainability is more than just planning; it's about participating. At VITU, we regularly engage in on-ground activities like coastal clean-up drives and community tree-planting events. These collective efforts help restore natural ecosystems while inspiring a deeper bond between our residents and the environment around them.",
  content2:"These hands-on initiatives are our way of nurturing a culture of care. From keeping our shores plastic-free to planting roots that will grow for decades, we believe in small acts that ripple outwards. It’s our promise to leave the earth better than we found it and bring our community along on the journey."
    },
  {
    id: 18,
    url: "/images/SustainabilityInitiativesImages/2.png",
    fileUrl: "/images/SustainabilityInitiativesImages/2.png",
    bottomTitle: "Breathing Life: 500+ Tree Cover",
    bottomTitle2: "A green step for a greener future",
    content:
      "At VITU Realty, we’ve taken a conscious step toward preserving the planet by nurturing a tree cover of over 500 native and flowering species across our communities. These trees don’t just beautify the landscape, they purify the air, reduce urban heat, support local wildlife, and create a calming natural atmosphere for residents to enjoy every day.",
      content2:"Beyond their visible beauty, trees are our quiet protectors. They store carbon, improve air quality and play a vital role in the fight against climate change. Our green cover is an investment not just in today’s environment, but in tomorrow’s wellbeing ensuring healthier, more balanced communities for generations to come.",
  },
  {
    id: 19,
    url: "/images/SustainabilityInitiativesImages/3.png",
    fileUrl: "/images/SustainabilityInitiativesImages/3.png",
    bottomTitle: "Eco-Friendly Infrastructure",
    bottomTitle2:"Smart Living That Respects Nature",
    content:
      "Our developments are thoughtfully planned with eco-conscious systems like rainwater harvesting, groundwater recharge pits, solar-powered street lighting, and low-impact stampede concrete roads. These practices reduce dependency on finite resources while improving sustainability across every square foot of our spaces.",
      content2:"By thoughtfully building these features into every project, we’re shaping spaces that care for both people and the planet. Every drop saved, every watt powered by the sun, and every surface designed to recharge the earth makes your home part of a bigger solution, one that values responsible progress and a healthier planet."
  },
];

/**
 * Sustainability Initiatives Component
 * Showcases company's environmental and sustainability efforts
 */
export default function SustainabilityInitiatives(): React.ReactElement {
  // ============= Framer Motion Variants =============
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // ============= Render Helpers =============
  const renderLeftColumn = () => (
    <motion.div
      variants={fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="md:w-1/2 md:flex overflow-hidden md:flex-col mx-[28px] sm:mx-[28px] md:mx-0"
    >
      <div className="lg:max-w-none mx-auto lg:mx-0">
        <Typography
          variant="custom"
          className="text-customBrown max-w-full xl:max-w-[600px] text-2xl md:text-[50px] xl:text-[60px] leading-[1.1] md:leading-[1.2] xl:leading-[67px] font-freightNeoMedium mb-4 md:mb-6"
        >
          {CONTENT.title}
        </Typography>
        <Typography
          variant="custom"
          className="md:text-[#4F373799] text-[#04070799] max-w-full lg:pr-48 xl:max-w-[600px] text-base md:text-xl xl:text-2xl font-freightNeoMedium md:mb-12"
        >
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
    </motion.div>
  );

  const renderRightColumn = () => (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="hidden overflow-hidden mb-40 md:w-1/2 md:flex md:mt-0"
    >
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
          className="md:max-w-[593px] md:h-[260px] 2xl:max-w-[80%] lg:h-[256px] w-full"
          cardClassName="rounded-[20px]"
          bottomTitle={INITIATIVE_CARDS[2].bottomTitle}
          content={<CardContent id={INITIATIVE_CARDS[2].id} />}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="flex overflow-hidden flex-col md:flex-row lg:gap-8 md:gap-6 mx-0 sm:mx-0 md:mx-[4.125rem] lg:mx-[5.5rem] xl:mx-[13.125rem]">
      {/* Left Column - Content and First Image */}
      {renderLeftColumn()}

      {/* Right Column - Staggered Images (Desktop) */}
      {renderRightColumn()}

      {/* Mobile Carousel */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="block mb-12 md:hidden">
        <InfiniteCarousel isSustainable={true} cards={INITIATIVE_CARDS} data={sustainabilityInitiatives} />
      </motion.div>
    </div>
  );
}
