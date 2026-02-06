"use client";

// ============= Component Imports =============
import Typography from "@/components/Typography/Typography";
import InfiniteCarousel from "@/components/Common/InfiniteCarousel/InfiniteCarousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, IconArrowNarrowLeft, IconArrowNarrowRight } from "@/components/Icons/Icons";
import { useEffect, useRef, useState } from "react";
import articleArea from "@/data/articleArea.json";
import AppleStyleCard from "@/components/ui/apple-style-card";
import Link from "next/link";

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
  topTitle?: string; // Added missing properties
  topDescription?: string;
  middleTitle?: string;
  middlePoints?: string[];
  middleTitle2?: string;
  middlePoints2?: string[];
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
  interface FooterProps {
    onFooterClick?: () => void;
    nextProjectTitle: string;
  }
  console.log("Fetching blogs...");
  const CardContent = ({ cardId, data }: { cardId: number; data: Article[] }) => {
    const [currentCardId, setCurrentCardId] = useState(cardId);
    const [card, setCard] = useState<Article[]>([]);

    let project: Article | undefined;

    const fetchBlogs = async () => {
      try {
        console.log("Fetching blogs...");
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const res = await response.json();
        const data = res.data;
        console.log(data)
        setCard(data);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      }
    };

    useEffect(() => {
      fetchBlogs();
    }, []);

    project = data.find((project) => project.id === currentCardId);

    const handleFooterClick = () => {
      const currentIndex = data.findIndex((project) => project.id === currentCardId);
      const nextProject = data[(currentIndex + 1) % data.length];
      setCurrentCardId(nextProject.id);
    };

    const nextProject = data[(data.findIndex((project) => project.id === currentCardId) + 1) % data.length];
    console.log(nextProject)
    return (
      <>
        {project && (
          <div key={"dummy-content"} data-lenis-prevent>
            <Image
              src={project.fileUrl || "/placeholder.svg"}
              alt={nextProject?.title || "Card image"}
              width={1042}
              height={45}
              className={cn("object-cover   h-[652px] w-full")}
            />
            <div className="p-4 md:p-10">
              <Typography variant="h1" className="text-customBrown font-freightNeoMedium">
                {project.title}
              </Typography>
              <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[10px] pb-8 !text-3xl">
                {project.subtitle}
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
  const [desktopCard, setDesktopCard] = useState<Article[]>([]);
  const isNavigationDisabled = desktopCard.length <= 3;
  const [mobileCard, setMobileCard] = useState<Article[]>([]); // Fixed typo and initialized as empty array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when carousel is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Pause/Resume autoplay based on modal state and visibility
  useEffect(() => {
    if (swiperRef.current) {
      if (isModalOpen || !isInView) {
        swiperRef.current.autoplay?.stop();
      } else {
        swiperRef.current.autoplay?.start();
      }
    }
  }, [isModalOpen, isInView]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const res = await response.json();
      const data = res.data;

      setDesktopCard(data);

      const dummyData = data.map((item: Article, index: number): Article => {
        return { ...item, id: index + 5 };
      });
      setMobileCard([...data, ...dummyData]);
    } catch (error) {
      console.error("Failed to fetch team members", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div ref={containerRef} className=" 2xl:w-full xl:max-w-[1380px] 2xl:max-w-[2000px] xl:mx-auto lg:max-w-[1244px]  lg:mx-auto lg:px-2">
      <main className="lg:pt-[94px] xl:pt-[117px] pt-[59px]">
        {/* Header Section */}
        {renderHeader()}

        {/* Desktop Carousel */}
        <div className="relative lg:block hidden">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {desktopCard.map((card) => (
              <SwiperSlide key={card.id} className="lg2:!h-[55vh] lg:!h-[60vh] !rounded-[20px]">
                {/* Use h-full to inherit height from Swiper */}
                <AppleStyleCard
                  id={card.id}
                  title={card.title}
                  subtitle={card.subtitle}
                  imageSrc={card.fileUrl}
                  expandedImageClassName="object-center"
                  content={<CardContent cardId={card.id} data={desktopCard} />}
                  onOpenChange={setIsModalOpen}
                  isViewMoreType={card.type}
                  href={`/insights/${card.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-between gap-4 lg:mt-[54px] xl:mt-[75px] mt-[36px]">
            <Link href="/insights" aria-label="View all insights">

              <span className="font-FreightNeoProBold lg:text-2xl sm:text-base text-customBrown xl:text-[28px]">Explore More</span>
            </Link>
            <div className="flex gap-2">
              <button
                aria-label="Previous Slide"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isNavigationDisabled}
                className="relative z-[1] lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              >
                <IconArrowNarrowLeft />
              </button>
              <button
                aria-label="Next Slide"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isNavigationDisabled}
                className="relative z-[1] lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
              >
                <IconArrowNarrowRight />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Carousel */}
        <div className="relative md:block lg:hidden">{mobileCard && <InfiniteCarousel cards={mobileCard} data={mobileCard} />}</div>
      </main>
    </div>
  );
}
