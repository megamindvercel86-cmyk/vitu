"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Typography from "../Typography/Typography";
import MobileCarousel from "../MobileCarousel/MobileCarousel";

interface Article {
  category: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
}

const articles: Article[] = [
  {
    category: "BLOG",
    title: "Embracing the Art of Coastal Living",
    subtitle: "Learn about talent and local infrastructure benefits",
    type: "primary",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2000&auto=format&fit=crop",
  },
  {
    category: "NEWS",
    title: "Life by the Waves",
    subtitle: "This is a sampletext by the people ",
    type: "secondary",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
  },
  {
    category: "BLOG",
    title: "Foundations for the Future",
    subtitle: "Building Sustainability for a Better Tomorrow",
    type: "secondary",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop",
  },
];

const ArticleArea: React.FC = () => {
  // Carousel cards for large screens
  const carouselCards = articles.map((article, index) => ({
    category: article.category,
    title: article.title,
    subtitle: article.subtitle,
    src: article.image,
    type: article.type,
    content: (
      <div className="text-neutral-700 p-4">
        <p>{article.subtitle || "Discover more insights in this article."}</p>
      </div>
    ),
  }));

  // MobileCarousel cards
  const mobileCards = articles.map((article, index) => ({
    id: `card-${index}`,
    category: article.category,
    image: article.image,
    title: article.title,
    subtitle: article.subtitle,
    description: article.subtitle || "No description available",
    content: (
      <div className="text-neutral-700 p-4">
        <p>{article.subtitle || "No description available"}</p>
      </div>
    ), // Adding the content property here
  }));
  
  return (
    <div className="xl:mx-[278px] md: lg:ml-[78px]">
      <main className="lg:pt-[94px] xl:pt-[117px] pt-[59px]">
        {/* Header Section */}
        <div className="md:text-center md:px-0 px-7 xl:mb-[87px] lg:mb-[92px] mb-[43px] xl:mx-[290px] lg:mx-[252px] mx-0">
          <Typography
            variant="custom"
            className="text-customTextGray lg:text-base xl:text-xl text-xs xl:pb-[10px] lg:pb-[12px] pb-[10px]"
          >
            INSIGHTS
          </Typography>
          <Typography
            variant="custom"
            className="text-customBrown font-freightNeoSemibold xl:pb-[24px] lg:pb-[27px] pb-[20px] text-3xl md:text-[48px] xl:text-[52px]"
          >
            Your Home Discovery Center
          </Typography>
          <Typography
            variant="custom"
            className="text-customBrown font-freightNeoMedium lg:text-2xl"
          >
            Delve into all things Realty through our insights - uncover
            articles, tips, and stories inspiring your dream home journey.
          </Typography>
        </div>

        {/* Carousel Section */}
        <div className="relative md:block hidden">
          <div className="w-full h-full">
            <Carousel items={carouselCards.map((card, index) => (
              <Card key={index} card={card} index={index} layout={true} />
            ))} />
          </div>
        </div>

        {/* Mobile Carousel Section */}
        <div className="relative sm:block lg:hidden">
          <MobileCarousel cards={mobileCards} />
        </div>
      </main>
    </div>
  );
};

export default ArticleArea;
