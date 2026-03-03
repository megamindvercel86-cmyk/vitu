import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "./InfiniteCarousel.css";
import { ArrowRightIcon, CloseTabIcon } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PrimaryViewMoreButton, SecondaryViewMoreButton } from "@/components/Icons/Icons";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";
import { sanitizeHtml } from "@/lib/sanitizeHtml";

// Define a type for the card object
interface Card {
  id: number;
  fileUrl?: string;
  className?: string;
  startPosition?: { x?: number; y?: number };
  isViewMore?: boolean;
  position?: "left" | "right";
  bottomTitle?: string;
  bottomTitle2?: string;
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
  contentHtml?: string;
}

interface InfiniteCarouselProps {
  cards?: Card[];
  isSustainable?: boolean;
  data?: Card[];
  textStyle?: "";
  controlButtonBg?: string;
  iconColor?: string;
  rextFill?: string;
  pathFill?: string;
}

// Modal animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 50 },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
  exit: { opacity: 0 },
};

interface FooterProps {
  onFooterClick: () => void;
  nextProjectTitle: string;
  rextFill?: string;
  pathFill?: string;
}

const Footer: React.FC<FooterProps> = ({ onFooterClick, nextProjectTitle, pathFill, rextFill }) => {

  const formatText = (text: string) => {
    if (!text) return text;
    const parts = text.split(/([0-9]+|[+\-&%()/])/g);
    return parts.map((part, index) => {
      if (part.match(/^([0-9]+|[+\-&%()/])$/)) {
        return (
          <span key={index} className="font-CandideCondensedMedium">
            {part}
          </span>
        );
      }
      return (
        <span key={index} className="font-freightNeoMedium">
          {part}
        </span>
      );
    });
  };

  return (
    <div className="bg-white rounded-b-xl lg:rounded-b-3xl pt-10 lg:pb-0">
      <hr className="w-full h-[2px] bg-[#6D8B92]" />
      <div
        onClick={onFooterClick}
        className="px-0  container gap-8 lg:gap-48 flex justify-between lg:justify-between items-center py-2 lg:py-12 cursor-pointer"
      >
        <div>
          <p className="text-sm font-FreightNeoProNormal font-bold text-[#6D8B92] ">UP NEXT</p>

          <h4 className="font-bold text-lg font-FreightNeoProBold max-w-[15rem] text-[#0C3E49] lg:max-w-none">
            {formatText(nextProjectTitle)}
          </h4>
        </div>
        <ArrowRightIcon pathFill="#0C3E49" rextFill="#0c3e4940" />
      </div>
    </div>
  );
};

// Update the CardContent component to accept props
const CardContent = ({ cardId, data, isDescription, textStyle, rextFill, pathFill }: { isDescription: boolean, cardId: number; data: Card[]; textStyle: string; rextFill?: string; pathFill?: string }) => {
  const [currentCardId, setCurrentCardId] = useState(cardId);

  let project = data.find((project) => project.id === currentCardId);

  const handleFooterClick = () => {
    const currentIndex = data.findIndex((project) => project.id === currentCardId);
    const nextProject = data[(currentIndex + 1) % data.length];
    setCurrentCardId(nextProject.id);
  };

  const nextProject = data[(data.findIndex((project) => project.id === currentCardId) + 1) % data.length];

  const formatText = (text: string) => {
    if (!text) return text;
    const parts = text.split(/([0-9]+|[+\-&%()/])/g);
    return parts.map((part, index) => {
      if (part.match(/^([0-9]+|[+\-&%()/])$/)) {
        return (
          <span key={index} className="font-CandideCondensedMedium">
            {part}
          </span>
        );
      }
      return (
        <span key={index} className="font-freightNeoMedium">
          {part}
        </span>
      );
    });
  };

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
          <div className="p-6 md:p-10">
            <Typography variant="h1" className="text-[#0C3E49]">
              {formatText(project?.title || "")}
            </Typography>
            <Typography variant="h3" className="text-[#0C3E49] font-medium pb-4">
              {formatText(project?.subtitle || "")}
            </Typography>
            {project.contentHtml ? (
              <div
                className="prose max-w-none text-[#0C3E4999] font-FreightNeoProNormal text-lg md:text-xl [&>p]:pb-4 [&_ul]:list-disc [&_ul]:pl-6"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(
                    project.contentHtml.replace("min-height: 100vh;", ""),
                  ),
                }}
              />
            ) : (
              <div className="flex flex-col gap-4 text-[#0C3E4999] font-ttCommons text-lg md:text-xl">
                {project.description1 && <p>{project.description1}</p>}
                {project.description2 && <p>{project.description2}</p>}
                {project.description && <p>{project.description}</p>}
              </div>
            )}

            <Footer onFooterClick={handleFooterClick} nextProjectTitle={nextProject?.title || ""} pathFill={pathFill} rextFill={rextFill} />
          </div>
        </div>
      )}
    </>
  );
};

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ cards, data, textStyle = "text-customBrown", controlButtonBg, iconColor, isSustainable }) => {
  const swiperRef = useRef<SwiperType | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openCard = (cardId: number) => {
    setCurrentCardId(cardId);
    setIsOpen(true);
  };

  const closeCard = () => {
    setIsOpen(false);
  };

  const goToNextCard = () => {
    if (currentCardId !== null && data) {
      const currentIndex = data.findIndex((project) => project.id === currentCardId);
      const nextProject = data[(currentIndex + 1) % data.length];
      setCurrentCardId(nextProject.id);
    }
  };

  return (
    <div ref={containerRef}>
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
        speed={1000}
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
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}

        className="mySwiper"
      >
        {cards?.map((card, index) => (
          <SwiperSlide key={index + 5} className="swiper-slide">
            <motion.button
              onClick={() => {
                window.location.href = `/insights/${card.id}`;
              }}
              className={cn("bg-gray-100 dark:bg-neutral-900 overflow-hidden flex flex-col items-start justify-start relative w-full h-full")}
            >
              <div className="relative z-50 p-8">
                <motion.p
                  className={cn(
                    "text-xl md:text-2xl lg2:text-3xl font-theSeasons text-white text-left leading-[1.5rem] line-clamp-2"
                  )}
                >
                  {safeSpecialCharacters(card.title)}
                </motion.p>
                <motion.p
                  className={cn(
                    "text-white text-xs lg2:text-2xl xl:text-[26px] md:text-xl font-extralight max-w-full text-left [text-wrap:balance] font-FreightNeoProNormal mt-2 2xl:text-3xl"
                  )}
                >
                  {card.subtitle}
                </motion.p>
              </div>
              <Image
                src={card.fileUrl || "/placeholder.svg"}
                alt={card.title || "Card image"}
                fill
                className="object-cover absolute z-10 inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent z-20" />
              <div className="absolute bottom-4 md:left-8 left-4 z-50">
                <Typography
                  variant="custom"
                  className="text-white font-freightNeoSemibold md:font-FreightNeoProNormal text-start md:text-2xl lg:text-2xl lg2:text-4xl text-xl"
                >
                  {card.bottomTitle?.split("").map((char, idx) => (
                    <span key={idx} className={`${/\d/.test(char) ? "font-CandideCondensedNormal" : "font-FreightNeoProNormal"}`}>
                      {char}
                    </span>
                  ))}
                </Typography>
              </div>
              <div className={`absolute bottom-3 right-3 ${card.position === "right" ? "right-3" : "left-3"} position z-50`}>
                {card.isViewMore !== false && (card.type === "primary" ? <PrimaryViewMoreButton /> : <SecondaryViewMoreButton />)}
              </div>
            </motion.button>
            <Typography variant="custom"> {card.name}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-between gap-4 px-7">
        {/* <span className=" lg:text-2xl sm:text-base text-customBrown font-FreightNeoProBold xl:text-[28px]">Explore More</span> */}
        {/* <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            aria-label="Previous slide"
          >
            <IconArrowNarrowLeft fill={controlButtonBg} color={iconColor} />
          </button>
          <button
            onClick={handleNext}
            className="relative z-40 lg:w-[36px] lg:h-[36px] w-[27px] h-[27px] rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            aria-label="Next slide"
          >
            <IconArrowNarrowRight fill={controlButtonBg} color={iconColor} />
          </button>
        </div> */}
      </div>

      {/* LocationAdvantage-style Modal */}
      <AnimatePresence>
        {isOpen && currentCardId !== null && data && (
          <motion.div
            style={{ zIndex: 2147483648 }}
            className="fixed inset-0 h-screen z-50 overflow-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent
          >
            <motion.div variants={backdropVariants} className="backdrop-blur-lg h-full w-full fixed inset-0" onClick={closeCard} />
            <motion.div
              variants={cardVariants}
              ref={containerRef}
              className="w-full md:max-w-4xl md:m-auto bg-white min-h-screen md:min-h-fit md:h-fit z-[60] md:!my-12 md:!rounded-[32px] font-ttCommons relative shadow-2xl"
            >
              <motion.button
                variants={contentVariants}
                className="absolute top-6 z-50 me-5 lg:me-6 h-8 w-8 right-0 cursor-pointer ml-auto rounded-full flex items-center justify-center"
                onClick={closeCard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseTabIcon fill="#ffffffff" />
              </motion.button>
              <motion.div variants={contentVariants}>
                <CardContent
                  isDescription={isSustainable || false}
                  pathFill={controlButtonBg}
                  rextFill={iconColor}
                  cardId={currentCardId}
                  data={data}
                  textStyle={textStyle}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default InfiniteCarousel;
