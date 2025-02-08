"use client";

// ============= Component Imports =============
import React from "react";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

// ============= Style Imports =============
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "../../Common/InfiniteCarousel/InfiniteCarousel.css";

// ============= Types & Interfaces =============
interface TeamMember {
  id: number;
  name: string;
  role: string;
  role2?: string;
  url: string;
  isViewMore: boolean;
}

interface DesktopTeamMember {
  id: number;
  name: string;
  title: string;
  subtitle?: string;
  url: string;
  bottomTitle: string;
}

// ============= Constants =============
const desktopTeamMembers: DesktopTeamMember[] = [
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

const mobileTeamMembers: TeamMember[] = [
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

// ============= Component =============
/**
 * LeadershipTeam Component
 * Displays team members in a grid layout for desktop and carousel for mobile
 * 
 * Features:
 * - Responsive layout (grid/carousel)
 * - Coverflow effect on mobile
 * - Auto-playing slides
 * - Different layouts for desktop/mobile
 */
export default function LeadershipTeam() {
  // ============= Refs =============
  const swiperRef = React.useRef<any>(null);

  // ============= Render =============
  return (
    <div className="lg:pt-[153px] py-16 lg:py-0 lg:pb-[198px] xl:pt-[160px] xl:pb-[191px]">
      <div className="mx-auto xl:mx-[284px] lg:mx-[78px]">
        <Typography
          variant="custom"
          className="text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium text-center text-customBrown lg:pb-[84px] sm:pb-[94px]"
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
                  className="w-full h-full object-cover rounded-[10px] 2xl:w-[100%]"
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

// ============= Sub Components =============
/**
 * TeamMemberCard Component
 * Displays individual team member information
 */
const TeamMemberCard = ({
  member,
}: {
  member: DesktopTeamMember;
}) => (
  <div className="text-center   w-[100%]">
    <div className="aspect-auto lg:mb-[34px] w-full">
      <img
        src={member.url}
        alt={member.name}
        className="w-full h-full object-cover rounded-[20px] shadow-lg"
      />
    </div>
    <Typography
      variant="custom"
      className="text-xl sm:text-xl md:text-4xl 2xl:text-5xl text-customTextGray font-freightNeoMedium"
    >
      {member.name}
    </Typography>
    <Typography
      variant="custom"
      className="text-customTextGray font-FreightNeoProNormal px-0 lg:text-2xl 2xl:text-3xl"
    >
      {member.title}
    </Typography>
    {member.subtitle && (
      <Typography
        variant="custom"
        className="text-customTextGray font-FreightNeoProNormal px-0 lg:text-2xl 2xl:text-3xl"
      >
        {member.subtitle}
      </Typography>
    )}
  </div>
);
