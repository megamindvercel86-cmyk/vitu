"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Typography from "../Typography/Typography";

const articles = [
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
    subtitle: "",
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

const data = articles.map((article) => ({
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

const ArticleArea: React.FC = () => {
  const cards = data.map((card, index) => (
    <Card key={index} card={card} index={index} layout={true} />
  ));

  return (
    <div className="min-h-screen xl:mx-[278px] lg:mx-[78px]">
      <main className="lg:pt-[94px] xl:pt-[117px] pt-[59px]">
        {/* Header Section */}
        <div className="text-center xl:mb-[87px] lg:mb-[92px] mb-[43px] xl:mx-[290px] lg:mx-[252px] mx-0">
          <Typography variant="custom"  className="text-customTextGray lg:text-base xl:text-xl text-xs xl:pb-[10px] lg:pb-[12px] pb-[10px]">
            INSIGHTS
          </Typography>
          <Typography  variant="custom" className="text-customTextGray font-freightNeoMedium xl:pb-[24px] lg:pb-[27px] pb-[20px] md:text-[48px] xl:text-[52px]">
            Your Home Discovery Center
          </Typography>
          <Typography variant="custom" className="text-customTextGray font-freightNeoMedium lg:text-2xl">
            Delve into all things Realty through our insights - uncover
            articles, tips, and stories inspiring your dream home journey.
          </Typography>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div className="w-full h-full">
            <Carousel items={cards} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleArea;
