"use client";

// ============= Component Imports =============
import Typography from "@/components/Typography/Typography";
import InfiniteCarousel from "@/components/Common/InfiniteCarousel/InfiniteCarousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/Icons/Icons";
import { useEffect, useState } from "react";
import AppleStyleCard from "@/components/ui/apple-style-card";
import HeroSectionMobileCard from "../HeroSectionMobileCard/HeroSectionMobileCard";
import AppleStyleCardInsight from "@/components/ui/apple-style-card-insight";

// ============= Types & Interfaces =============
interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
  type: "primary" | "secondary" | string;
  fileUrl: string;
  subtitle: string;
  contentHtml?: string;
}

interface FooterProps {
  onFooterClick?: () => void;
  nextProjectTitle: string;
}

// ============= Constants =============
const CONTENT = {
  header: {
    badge: "INSIGHTS",
    title: "Your Home Discovery Center",
    description: "Delve into all things Realty through our insights - uncover articles, tips, and stories inspiring your dream home journey.",
  },
};

/**
 * InsightHeroSection Component
 * Displays articles in a grid layout for desktop and a carousel for mobile
 *
 * Features:
 * 1. Header section with title and description
 * 2. Desktop grid layout with expandable cards
 * 3. Mobile carousel with swipeable cards
 *
 * Layout:
 * - Desktop: Grid layout with 3 cards per row
 * - Mobile: Single column carousel
 *
 * @returns {React.ReactElement} The InsightHeroSection component
 */
export default function InsightHeroSection(): React.ReactElement {
  const [desktopCard, setDesktopCard] = useState<Article[]>([]);
  const [mobileCard, setMobileCard] = useState<Article[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const res = await response.json();
      const data = res.data;

      setDesktopCard(data);

      const extendedData = data.map((item: Article, index: number): Article => {
        return { ...item, id: index + 5 };
      });
      setMobileCard([...data, ...extendedData]);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const CardContent = ({ cardId, data }: { cardId: number; data: Article[] }) => {
    const [currentCardId, setCurrentCardId] = useState(cardId);

    const project = data.find((project) => project.id === currentCardId);

    const handleFooterClick = () => {
      const currentIndex = data.findIndex((project) => project.id === currentCardId);
      const nextProject = data[(currentIndex + 1) % data.length];
      setCurrentCardId(nextProject.id);
    };

    const nextProject = data[(data.findIndex((project) => project.id === currentCardId) + 1) % data.length];

    return (
      <>
        {project && (
          <div key={"dummy-content"} data-lenis-prevent>
            <Image
              src={project.fileUrl || "/placeholder.svg"}
              alt={nextProject?.title || "Card image"}
              width={1042}
              height={45}
              className={cn("object-cover h-[652px] w-full")}
            />
            <div className="p-4 md:p-10">
              <Typography variant="h1" className="text-customBrown">
                {project.title}
              </Typography>
              <div
                className="prose max-w-none text-[#04070799] font-FreightNeoProNormal !text-xl [&>p]:pb-6 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{ __html: (project.contentHtml || "").replace("min-height: 100vh;", "") }}
              />
              <Footer onFooterClick={handleFooterClick} nextProjectTitle={nextProject?.title || ""} />
            </div>
          </div>
        )}
      </>
    );
  };

  const Footer: React.FC<FooterProps> = ({ onFooterClick, nextProjectTitle }) => {
    return (
      <div className="bg-white rounded-b-xl lg:rounded-b-3xl pt-10 lg:pb-0">
        <hr className="w-full h-[2px] bg-[#BDBEC2]" />
        <div className="px-32 container gap-8 lg:gap-48 flex justify-between lg:justify-between items-center py-2 lg:py-12">
          <div>
            <p className="text-sm font-FreightNeoProNormal font-bold text-[#8E8E93]">UP NEXT</p>
            <h4 className="font-bold text-lg font-FreightNeoProBold max-w-[15rem] text-[#1D1D1F] lg:max-w-none">{nextProjectTitle}</h4>
          </div>
          <div onClick={onFooterClick} className="cursor-pointer">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="2xl:w-full py-20 lg:py-40 xl:max-w-[1380px] 2xl:max-w-[2000px] xl:mx-auto lg:max-w-[1244px] lg:mx-auto lg:px-2">
      <main className="lg:pt-[94px] xl:pt-[117px] pt-[59px]">
        {/* Header Section */}

        {/* Desktop Grid Layout */}
        <div className="relative lg:block hidden ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {desktopCard &&
              desktopCard.map((card) => (
                <div key={card.id} className="lg2:!h-[55vh] lg:!h-[50vh] overflow-hidden !rounded-[20px]">
                  <AppleStyleCardInsight
                    id={card.id}
                    title={card.title}
                    subtitle={card.subtitle}
                    imageSrc={card.fileUrl}
                    expandedImageClassName="object-center"
                    content={<CardContent cardId={card.id} data={desktopCard} />}
                    isViewMoreType={card.type}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="relative md:block lg:hidden">{desktopCard && <HeroSectionMobileCard cards={desktopCard} data={desktopCard} />}</div>
      </main>
    </div>
  );
}
