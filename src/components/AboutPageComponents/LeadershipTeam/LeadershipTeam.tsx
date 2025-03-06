"use client";

// ============= Component Imports =============
import React, { useEffect, useState } from "react";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

// ============= Style Imports =============
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "../../Common/InfiniteCarousel/InfiniteCarousel.css";
import dummy from "@/data/dummy.json";

// ============= Types & Interfaces =============
interface TeamMember {
  id: number;
  name: string;
  role: string;
  fileUrl: string;
  development?: boolean;
}

// ============= Component =============
export default function LeadershipTeam() {
  // ============= Constants =============
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamMembersCarousal, setTeamMembersCarousal] = useState<TeamMember[]>(
    []
  );

  async function fetchTeamMembers() {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();

      const filteredData = data.data.filter(
        (member: TeamMember) => member.development !== true
      );

      setTeamMembersCarousal([
        ...filteredData,
        ...filteredData.map((member: TeamMember, index: number) => ({
          ...member,

          id: index + 5,
        })),
      ]);

      const updatedData = filteredData.map(
        (member: TeamMember, index: number) => ({
          ...member,

          id: index + 5,
        })
      );

      // Update states in a single batch to ensure consistency
      setTeamMembers(filteredData);
      // setTeamMembersCarousal([...updatedData, ...filteredData]);

      // setTeamMembersCarousal([...filteredData, { ...filteredData[0], id: 1 }, { ...filteredData[1], id: 2 }]);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  }

  useEffect(() => {
    fetchTeamMembers();
  }, []);
  console.log(teamMembersCarousal);
  return (
    <div className="lg:pt-[153px] py-16 lg:py-0 lg:pb-[198px] xl:pt-[160px] xl:pb-[191px]">
      <div className="mx-auto xl:mx-[284px] lg:mx-[78px]">
        {/* Section Heading */}
        <Typography
          variant="custom"
          className="text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium text-center text-customBrown lg:pb-[84px] sm:pb-[94px]"
        >
          Our Leadership Team
        </Typography>

        {/* Desktop Carousel */}
        <div className="hidden lg:flex mx-72 gap-10">
          {/* <Swiper
            // onSwiper={(swiper) => {
            //   swiperRef.current = swiper;
            // }}
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="media-swiper h-full"
          > */}
          {teamMembers.map((member, index) => (
            <TeamMemberCard member={member} key={index} />
          ))}
          {/* </Swiper> */}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          {teamMembersCarousal.length > 0 && (
            <Swiper
              modules={[EffectCoverflow, Autoplay, Navigation]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              spaceBetween={20}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
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
              {teamMembersCarousal.map((member, index) => (
                <SwiperSlide
                  key={index}
                  className="swiper-slide !overflow-visible"
                >
                  <div className="text-center">
                    <Image
                      src={member.fileUrl}
                      alt={member.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover rounded-[10px] shadow-lg"
                    />
                    <Typography
                      variant="custom"
                      className="text-xl text-[#04070799] font-freightNeoMedium mt-4"
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="custom"
                      className="text-xl text-[#04070799] font-FreightNeoProNormal"
                    >
                      {member.role}
                    </Typography>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}

// ============= Sub Components =============
const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <div className="text-center w-[100%]  ">
    <div className="aspect-auto lg:mb-[34px] w-full">
      <Image
        width={400}
        height={500}
        src={member.fileUrl}
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
      className="text-customTextGray font-FreightNeoProNormal px-20 lg:text-2xl 2xl:text-3xl"
    >
      {member.role}
    </Typography>
  </div>
);
