"use client";

// ============= Component Imports =============
import Typography from "@/components/Typography/Typography";
import InfiniteCarousel from "@/components/Common/InfiniteCarousel/InfiniteCarousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
// Import Swiper styles
import "swiper/css";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, IconArrowNarrowLeft, IconArrowNarrowRight } from "@/components/Icons/Icons";
import { useRef, useState } from "react";
import articleArea from "@/data/articleArea.json";
import AppleStyleCard from "@/components/ui/apple-style-card";
// ============= Types & Interfaces =============
interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
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
    title: "Commit to Clean Practices",
    description: "A cleaner environment starts with us.",
    type: "primary",
    url: "/images/articleImages/articleImage1.jpg",
  },
  {
    id: 2,
    category: "NEWS",
    title: "Choose an Eco-Friendly Future",
    description: "Protect the planet with sustainable choices.",
    type: "secondary",
    url: "/images/articleImages/articleImage2.jpg",
  },
  {
    id: 3,
    category: "BLOG",
    title: "Invest in Green Living",
    description: "Build a healthier planet with sustainable choices.",
    type: "secondary",
    url: "/images/articleImages/articleImage3.jpg",
  },
  // {
  //   id: 4,
  //   category: "BLOG",
  //   title: "Invest in Green Living",
  //   description: "Build a healthier planet with sustainable choices.",
  //   type: "secondary",
  //   url: "/images/articleImages/articleImage3.jpg",
  // },
];

const ARTICLES_MOBILE: Article[] = [
  {
    id: 1,
    category: "BLOG",
    title: "Commit to Clean Practices",
    description: "A cleaner environment starts with us.",
    type: "primary",
    url: "/images/articleImages/articleImage1.jpg",
  },
  {
    id: 2,
    category: "NEWS",
    title: "Choose an Eco-Friendly Future",
    description: "Protect the planet with sustainable choices.",
    type: "secondary",
    url: "/images/articleImages/articleImage2.jpg",
  },
  {
    id: 3,
    category: "BLOG",
    title: "Invest in Green Living",
    description: "Build a healthier planet with sustainable choices.",
    type: "secondary",
    url: "/images/articleImages/articleImage3.jpg",
  },
  {
    id: 4,
    category: "BLOG",
    title: "Commit to Clean Practices",
    description: "A cleaner environment starts with us.",
    type: "primary",
    url: "/images/articleImages/articleImage1.jpg",
  },
  {
    id: 5,
    category: "NEWS",
    title: "Choose an Eco-Friendly Future",
    description: "Protect the planet with sustainable choices.",
    type: "secondary",
    url: "/images/articleImages/articleImage2.jpg",
  },
  {
    id: 6,
    category: "BLOG",
    title: "Invest in Green Living",
    description: "Build a healthier planet with sustainable choices.",
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
  // const getCarouselCards = (): CarouselCard[] =>
  //   ARTICLES.map(article => ({
  //     ...article,
  //     src: article.url,

  //     content: (
  //       <div className="text-neutral-700 p-4">
  //         <p>{article.subtitle || "Discover more insights in this article."}</p>
  //       </div>

  //     ),
  //   }));

  interface FooterProps {
    onFooterClick?: () => void;
    nextProjectTitle: string;
  }

  const CardContent = ({ cardId }: { cardId: number }) => {
    const [currentCardId, setCurrentCardId] = useState(cardId);

    let project:
      | {
          id: number;
          url: string;
          title: string;
          description?: string;
        }
      | undefined;

    project = articleArea.find((project) => project.id === currentCardId);

    const handleFooterClick = () => {
      const nextProject = articleArea.find((project) => {
        if (project.id === 3) {
          return 1 === currentCardId;
        } else {
          return project.id + 1 === currentCardId;
        }
      });

      if (nextProject) {
        setCurrentCardId(nextProject.id); // Update state to trigger re-render
      }
    };

    const nextProject = articleArea.find((project) => {
      if (project.id === 3) {
        return 1 === currentCardId;
      } else {
        return project.id + 1 === currentCardId;
      }
    });

    return (
      <>
        {project && (
          <div key={"dummy-content"}>
            <Image
              src={project.url || "/placeholder.svg"}
              alt={nextProject?.title || "Card image"}
              width={1042}
              height={45}
              className={cn("object-   h-[652px] w-full")}
            />
            <div className="p-4 md:p-10">
              <Typography variant="h1" className="text-customBrown">
                {project.title}
              </Typography>
              <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[20px] !text-xl">{project.description}</Typography>
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
        <div className="px-32  container gap-8 lg:gap-48 flex justify-between lg:justify-between items-center py-2 lg:py-12 ">
          <div>
            <p className="text-sm font-FreightNeoProNormal font-bold text-[#8E8E93] ">UP NEXT</p>
            <h4 className=" font-bold text-lg font-FreightNeoProBold max-w-[15rem] text-[#1D1D1F] lg:max-w-none">{nextProjectTitle}</h4>
          </div>
          <div onClick={onFooterClick} className="cursor-pointer">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    );
  };

  // ============= Render Helpers =============
  const renderHeader = () => (
    <div className="flex flex-col items-start md:items-center justify-center mx-auto max-w-[781px] xl:mb-[87px] lg:mb-[92px]  px-7 md:px-0">
      <Typography
        variant="custom"
        className="text-customTextGray lg:text-base xl:text-xl text-xs xl:pb-[10px] lg:pb-[12px] pb-[10px] text-left md:text-center 2xl:text-[1.5rem]"
      >
        {CONTENT.header.badge}
      </Typography>
      <Typography
        variant="custom"
        className="text-customBrown font-freightNeoSemibold xl:pb-[24px] lg:pb-[27px] pb-[20px] text-3xl md:text-[48px] xl:text-[52px] text-left md:text-center 2xl:text-[64px]"
      >
        {CONTENT.header.title}
      </Typography>
      <Typography variant="custom" className="text-customBrown font-freightNeoMedium text-base lg:text-2xl text-left md:text-center 2xl:text-3xl">
        {CONTENT.header.description}
      </Typography>
    </div>
  );
  const swiperRef = useRef<SwiperType | null>(null);
  const isNavigationDisabled = ARTICLES.length <= 3;
  return (
    <div className=" 2xl:w-full xl:max-w-[1380px] 2xl:max-w-[2000px] xl:mx-auto lg:max-w-[1244px]  lg:mx-auto lg:px-2">
      <main className="lg:pt-[94px] xl:pt-[117px] pt-[59px]">
        {/* Header Section */}
        {renderHeader()}

        {/* Desktop Carousel */}
        <div className="relative lg:block hidden">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {ARTICLES.map((card) => (
              <SwiperSlide key={card.id} className="lg2:!h-[55vh] lg:!h-[50vh] !rounded-[20px]">
                {/* Use h-full to inherit height from Swiper */}
                <AppleStyleCard
                  id={card.id}
                  title={card.title}
                  subtitle={card.description}
                  imageSrc={card.url}
                  expandedImageClassName="object-center"
                  content={<CardContent cardId={card.id} />}
                  isViewMoreType={card.type}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-between gap-4 lg:mt-[54px] xl:mt-[75px] mt-[36px]">
            <span className="font-FreightNeoProBold lg:text-2xl sm:text-base text-customBrown xl:text-[28px]">Explore More</span>
            <div className="flex gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isNavigationDisabled}
                className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              >
                <IconArrowNarrowLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isNavigationDisabled}
                className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              >
                <IconArrowNarrowRight />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Carousel */}
        <div className="relative md:block lg:hidden">
          <InfiniteCarousel cards={ARTICLES_MOBILE} data={ARTICLES_MOBILE} />
        </div>
      </main>
    </div>
  );
}
