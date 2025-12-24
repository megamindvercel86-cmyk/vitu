import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";

import AppleStyleCard from "@/components/ui/apple-style-card";
import {
  ArrowRightIcon,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AppleStyleCardInsight from "@/components/ui/apple-style-card-insight";
// Define a type for the card object
interface Card {
  id: number;
  fileUrl?: string;
  className?: string;
  startPosition?: { x?: number; y?: number };
  isViewMore?: boolean;
  position?: "left" | "right";
  bottomTitle?: string;
  type?: "primary" | "secondary" | string;
  title?: string;
  subtitle?: string;
  category?: string;
  role?: string;
  role2?: string;
  name?: string;
  description?: string;
  contentHtml?: string;
}

interface InfiniteCarouselProps {
  cards?: Card[];
  isSustainable?: boolean;
  data?: Card[];
}

interface FooterProps {
  onFooterClick: () => void;
  nextProjectTitle: string;
}

const Footer: React.FC<FooterProps> = ({ onFooterClick, nextProjectTitle }) => {
  return (
    <div className="bg-white rounded-b-xl lg:rounded-b-3xl pt-10 lg:pb-0">
      <hr className="w-full h-[2px] bg-[#BDBEC2]" />
      <div
        onClick={onFooterClick}
        className="px-0  container gap-8 lg:gap-48 flex justify-between lg:justify-between items-center py-2 lg:py-12 cursor-pointer"
      >
        <div>
          <p className="text-sm font-FreightNeoProNormal font-bold text-[#8E8E93] ">
            UP NEXT
          </p>
          <h4 className=" font-bold text-lg font-FreightNeoProBold max-w-[15rem] text-[#1D1D1F] lg:max-w-none">
            {nextProjectTitle}
          </h4>
        </div>
        <ArrowRightIcon />
      </div>
    </div>
  );
};

// Update the CardContent component to accept props
const CardContent = ({ cardId, data }: { cardId: number; data: Card[] }) => {
  const [currentCardId, setCurrentCardId] = useState(cardId);

  let project = data.find((project) => project.id === currentCardId);

  const handleFooterClick = () => {
    const currentIndex = data.findIndex(
      (project) => project.id === currentCardId,
    );
    const nextProject = data[(currentIndex + 1) % data.length];
    setCurrentCardId(nextProject.id);
  };

  const nextProject =
    data[
    (data.findIndex((project) => project.id === currentCardId) + 1) %
    data.length
    ];

  return (
    <>
      {project && (
        <div key={"dummy-content"}>
          <Image
            src={project.fileUrl || "/placeholder.svg"}
            alt={nextProject?.title || "Card image"}
            width={1042}
            height={45}
            className={cn("h-[300px] w-full")}
          />
          <div className="p-4 md:p-10">
            <Typography variant="h1" className="text-customBrown">
              {project.title}
            </Typography>
            <div
              className="prose max-w-none text-[#04070799] font-FreightNeoProNormal !text-xl [&>p]:pb-6 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: (project.contentHtml || "").replace("min-height: 100vh;", "") }}
            />
            <Footer
              onFooterClick={handleFooterClick}
              nextProjectTitle={nextProject?.title || ""}
            />
          </div>
        </div>
      )}
    </>
  );
};

const HeroSectionMobileCard: React.FC<InfiniteCarouselProps> = ({ cards, data }) => {
  const swiperRef = useRef<SwiperType | undefined>(undefined);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <>

      {cards?.map((card) => (
        <div key={card.id + 5} className="h-[50vh] pb-8 px-7">
          <AppleStyleCardInsight
            id={card.id + 5}
            imageSrc={card.fileUrl}
            expandedImageClassName="object-center"
            bottomTitle={card.bottomTitle}
            isViewMoreType={card.type}
            title={card.title}
            subtitle={card.subtitle}
            category={card.category}
            isViewMore={card.isViewMore}
            content={data && <CardContent cardId={card.id} data={data} />}
          />
          <Typography variant="custom"> {card.name}</Typography>
        </div>
      ))}

    </>
  );
};

export default HeroSectionMobileCard;
