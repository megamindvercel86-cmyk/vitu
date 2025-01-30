"use client";

// ============= Component Imports =============
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Typography from "@/components/Typography/Typography";
import InfiniteCarousel from "@/components/Common/InfiniteCarousel/InfiniteCarousel";

// ============= Types & Interfaces =============
interface Article {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  type: "primary" | "secondary";
  url: string;
}

interface CarouselCard extends Article {
  src: string;
  content: React.ReactNode;
}

// ============= Constants =============
const CONTENT = {
  header: {
    badge: "INSIGHTS",
    title: "Your Home Discovery Center",
    description: "Delve into all things Realty through our insights - uncover articles, tips, and stories inspiring your dream home journey.",
  },
};

const ARTICLES: Article[] = [
  { 
    id: 1,
    category: "BLOG",
    title: "Embracing the Art of Coastal Living",
    subtitle: "Learn about talent and local infrastructure benefits",
    type: "primary",
    url: "/images/articleImages/articleImage1.jpg",
  },
  {
    id: 2,
    category: "NEWS",
    title: "Life by the Waves",
    subtitle: "This is a sampletext by the people",
    type: "secondary",
    url: "/images/articleImages/articleImage2.jpg",
  },
  {
    id: 3,
    category: "BLOG",
    title: "Foundations for the Future",
    subtitle: "Building Sustainability for a Better Tomorrow",
    type: "secondary",
    url: "/images/articleImages/articleImage3.jpg",
  },
];

const MOBILE_ARTICLES: Article[] = [
  { 
    id: 1,
    category: "BLOG",
    title: "Embracing the Art of Coastal Living",
    subtitle: "Learn about talent and local infrastructure benefits",
    type: "primary",
    url: "/images/articleImages/articleImage1.jpg",
  },
  {
    id: 2,
    category: "NEWS",
    title: "Life by the Waves",
    subtitle: "This is a sampletext by the people",
    type: "secondary",
    url: "/images/articleImages/articleImage2.jpg",
  },
  {
    id: 3,
    category: "BLOG",
    title: "Foundations for the Future",
    subtitle: "Building Sustainability for a Better Tomorrow",
    type: "secondary",
    url: "/images/articleImages/articleImage3.jpg",
  },
  { 
    id: 4,
    category: "BLOG",
    title: "Embracing the Art of Coastal Living",
    subtitle: "Learn about talent and local infrastructure benefits",
    type: "primary",
    url: "/images/articleImages/articleImage1.jpg",
  },
  {
    id: 5,
    category: "NEWS",
    title: "Life by the Waves",
    subtitle: "This is a sampletext by the people",
    type: "secondary",
    url: "/images/articleImages/articleImage2.jpg",
  },
  {
    id: 6,
    category: "BLOG",
    title: "Foundations for the Future",
    subtitle: "Building Sustainability for a Better Tomorrow",
    type: "secondary",
    url: "/images/articleImages/articleImage3.jpg",
  },
];


/**
 * Article Area Component
 * Displays articles in carousel format for both desktop and mobile
 * 
 * Features:
 * 1. Header section with title and description
 * 2. Desktop carousel with expandable cards
 * 3. Mobile carousel with swipeable cards
 * 
 * Layout:
 * - Desktop: Full-width carousel with large cards
 * - Mobile: Single column carousel
 * 
 * @returns {React.ReactElement} The ArticleArea component
 */
export default function ArticleArea(): React.ReactElement {
  // ============= Data Transformers =============
  const getCarouselCards = (): CarouselCard[] => 
    ARTICLES.map(article => ({
      ...article,
      src: article.url,
      content: (
        <div className="text-neutral-700 p-4">
          <p>{article.subtitle || "Discover more insights in this article."}</p>
        </div>
      ),
    }));

  // ============= Render Helpers =============
  const renderHeader = () => (
    <div className="flex flex-col items-start md:items-center justify-center mx-auto max-w-[781px] xl:mb-[87px] lg:mb-[92px]  px-7 md:px-0">
      <Typography
        variant="custom"
        className="text-customTextGray lg:text-base xl:text-xl text-xs xl:pb-[10px] lg:pb-[12px] pb-[10px] text-left md:text-center"
      >
        {CONTENT.header.badge}
      </Typography>
      <Typography
        variant="custom"
        className="text-customBrown font-freightNeoSemibold xl:pb-[24px] lg:pb-[27px] pb-[20px] text-3xl md:text-[48px] xl:text-[52px] text-left md:text-center"
      >
        {CONTENT.header.title}
      </Typography>
      <Typography
        variant="custom"
        className="text-customBrown font-freightNeoMedium text-base lg:text-2xl text-left md:text-center"
      >
        {CONTENT.header.description}
      </Typography>
    </div>
  );

  return (
    <div className="2xl:mx-[278px] 2xl:w-full xl:max-w-[1380px] xl:mx-auto lg:max-w-[1244px]  lg:mx-auto lg:px-2">
      <main className="lg:pt-[94px] xl:pt-[117px] pt-[59px]">
        {/* Header Section */}
        {renderHeader()}

        {/* Desktop Carousel */}
        <div className="relative lg:block hidden">
          <div className="w-full h-full">
            <Carousel
              items={getCarouselCards().map((card, index) => (
                <Card key={index} card={card} index={index} layout={true} />
              ))}
            />
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="relative md:block lg:hidden">
          <InfiniteCarousel cards={MOBILE_ARTICLES} />
        </div>
      </main>
    </div>
  );
}
