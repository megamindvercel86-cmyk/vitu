import React from "react";
import Typography from "@/components/Typography/Typography";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
} from "@/components/Icons/Icons";

import "../../Common/InfiniteCarousel/InfiniteCarousel.css"
import Image from "next/image";

const desktopTeamMembers = [
  {
    id: 1,
    name: "Ananth Kamath",
    title: "Managing Director",
    url: "/images/leaderShipTeamImages/AnanthKamath.png",
    bottomTitle: "Managing Director",
  },
  {
    id: 2,
    name: "Laxman Kamath",
    title: "Executive Director",
    url: "/images/leaderShipTeamImages/LaxmanKamath.png",
    bottomTitle: "Executive Director",
  },
  {
    id: 3,
    name: "Ananya Bhandary",
    title: "Senior Executive",
    url: "/images/leaderShipTeamImages/AnanyaBhandary.png",
    bottomTitle: "Senior Executive",
    subtitle: "Business Development",
  },
];

const mobileTeamMembers = [
  {
    id: 1,
    name: "Ananth Kamath",
    role: "Managing Director",
    url: "/images/leaderShipTeamImages/AnanthKamath.png",
    isViewMore: false,
  },
  {
    id: 2,
    name: "Laxman Kamath",
    role: "Executive Director",
    url: "/images/leaderShipTeamImages/LaxmanKamath.png",
    isViewMore: false,
  },
  {
    id: 3,
    name: "Ananya Bhandary",
    role: "Senior Executive ",
    role2: "Business Development",
    url: "/images/leaderShipTeamImages/AnanyaBhandary.png",
    isViewMore: false,
  },
  {
    id: 4,
    name: "Ananth Kamath",
    role: "Managing Director",
    url: "/images/leaderShipTeamImages/AnanthKamath.png",
    isViewMore: false,
  },
  {
    id: 5,
    name: "Laxman Kamath",
    role: "Executive Director",
    url: "/images/leaderShipTeamImages/LaxmanKamath.png",
    isViewMore: false,
  },
  {
    id: 6,
    name: "Ananya Bhandary",
    role: "Senior Executive ",
    role2: "Business Development",
    url: "/images/leaderShipTeamImages/AnanyaBhandary.png",
    isViewMore: false,
  },
];

export default function LeadershipTeam() {
  const swiperRef = React.useRef<any>();

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
    <div className="lg:pt-[153px] py-16 lg:py-0 lg:pb-[198px] xl:pt-[160px] xl:pb-[191px]">
      <div className="mx-auto xl:mx-[284px] lg:mx-[78px]">
        <Typography
          variant="custom"
          className="sm:text-2xl text-2xl md:text-6xl xl:text-[52px] font-freightNeoMedium text-center text-customBrown lg:pb-[84px] sm:pb-[94px]"
        >
          Our Leadership Team
        </Typography>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 lg:gap-[42px] xl:gap-[78px] justify-items-center">
          {desktopTeamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Mobile/Tablet Infinite Carousel */}
        <div className="lg:hidden">
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
            className="mySwiper md:h-[700px] h-[450px]"
          >
            {mobileTeamMembers.map((card, index) => (
              <SwiperSlide key={index} className="swiper-slide !overflow-visible">
                <Image 
                  src={card.url} 
                  alt={card.name} 
                  width={400} 
                  height={500} 
                  className="w-full h-full object-cover rounded-[10px]"
                />
                <div className="mt-4 text-center">
                  <Typography 
                    variant="custom" 
                    className="text-xl text-[#04070799] font-freightNeoMedium"
                  >
                    {card.name}
                  </Typography>
                  <Typography 
                    variant="custom" 
                    className="text-xl text-[#04070799] font-FreightNeoProNormal"
                  >
                    {card.role}
                  </Typography>
                  {card.role2 && (
                    <Typography 
                      variant="custom" 
                      className="text-xl text-[#04070799] font-FreightNeoProNormal"
                    >
                      {card.role2}
                    </Typography>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </div>
  );
}

// TeamMemberCard component
const TeamMemberCard = ({
  member,
}: {
  member: (typeof desktopTeamMembers)[0];
}) => (
  <div className="text-center">
    <div className="aspect-auto lg:mb-[34px] w-full">
      <img
        src={member.url}
        alt={member.name}
        className="w-full h-full object-cover rounded-[20px] shadow-lg"
      />
    </div>
    <Typography
      variant="custom"
      className="text-xl sm:text-xl md:text-4xl text-customTextGray font-freightNeoMedium"
    >
      {member.name}
    </Typography>
    <Typography
      variant="custom"
      className="text-customTextGray font-FreightNeoProNormal px-0 lg:text-2xl"
    >
      {member.title}
    </Typography>
    {member.subtitle && (
      <Typography
        variant="custom"
        className="text-customTextGray font-FreightNeoProNormal px-0 lg:text-2xl"
      >
        {member.subtitle}
      </Typography>
    )}
  </div>
);
