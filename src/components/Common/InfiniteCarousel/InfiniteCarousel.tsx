import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "./InfiniteCarousel.css";
import AppleStyleCard from "@/components/ui/apple-style-card";
import {
  ArrowRightIcon,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
  description1?: string;
  description2?: string;
}

interface InfiniteCarouselProps {
  cards?: Card[];
  isSustainable?: boolean;
  data?: Card[];
  textStyle?:"";
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
          
          <h4 className="font-bold text-lg font-FreightNeoProBold max-w-[15rem] text-[#1D1D1F] lg:max-w-none">
          {nextProjectTitle?.split('').map((char, index) => (
              <span 
                key={index} 
                className={`${/\d/.test(char) ? 'font-CandideCondensedMedium' : 'font-freightNeoMedium'}`}
              >
                {char}
              </span>
            ))}
          </h4>
        </div>
        <ArrowRightIcon />
      </div>
    </div>
  );
};

// Update the CardContent component to accept props
const CardContent = ({ cardId, data, textStyle }: { cardId: number; data: Card[]; textStyle:string; }) => {
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
        <div key={"dummy-content"} data-lenis-prevent>
          <Image
            src={project.fileUrl || "/placeholder.svg"}
            alt={nextProject?.title || "Card image"}
            width={1042}
            height={45}
            className={cn("h-[300px] w-full")}
          />
          <div className="p-4 md:p-10">
            
          <Typography variant="h1" className="text-customBrown">
            {project?.title?.split('').map((char, index) => (
              <span 
                key={index} 
                className={`${/\d/.test(char) ? 'font-CandideCondensedMedium' : 'font-freightNeoMedium'}`}
              >
                {char}
              </span>
            ))}
          </Typography>
          <Typography className="text-[#04070799] font-FreightNeoProNormal pt-[20px] !text-xl">
          {project?.description?.split('').map((char, index) => (
              <span 
                key={index} 
                className={`${/\d/.test(char) ? 'font-CandideCondensedMedium' : 'font-freightNeoMedium'}`}
              >
                {char}
              </span>
            ))}
          </Typography>
          <Typography className="text-[#04070799] font-geistSerif  !text-base">{project?.description1}</Typography>
                      <Typography className="text-[#04070799] font-geistSerif pt-[20px] !text-base">{project?.description2}</Typography>
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

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ cards, data, textStyle="text-customBrown" }) => {
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
      <Swiper
        modules={[EffectCoverflow, Autoplay, Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true} // Infinite loop
        spaceBetween={20} // Gap between slides
        coverflowEffect={{
          rotate: 0, // No rotation
          stretch: 0, // No stretching
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {cards?.map((card, index) => (
          <SwiperSlide key={index + 5} className="swiper-slide">
            <AppleStyleCard
              key={card.id + 5}
              id={card.id + 5}
              imageSrc={card.fileUrl}
              expandedImageClassName="object-center"
              bottomTitle={card.bottomTitle}
              isViewMoreType={card.type}
              title={card.title}
              subtitle={card.subtitle}
              category={card.category}
              isViewMore={card.isViewMore}
              content={data && <CardContent cardId={card.id} data={data} textStyle={textStyle} />}
            />
            <Typography variant="custom"> {card.name}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-between gap-4 px-7">
        <span className=" lg:text-2xl sm:text-base text-customBrown font-FreightNeoProBold xl:text-[28px]">
          {/* Explore More */}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            aria-label="Previous slide"
          >
            <IconArrowNarrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            aria-label="Next slide"
          >
            <IconArrowNarrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default InfiniteCarousel;
