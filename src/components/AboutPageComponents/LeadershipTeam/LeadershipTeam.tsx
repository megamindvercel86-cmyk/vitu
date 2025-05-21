"use client";

// ============= Component Imports =============
import React, { useEffect, useState } from "react";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
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
  fileUrl: string;
  development?: boolean;
}

// ============= Component =============
export default function LeadershipTeam() {
  // ============= Constants =============
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamMembersCarousal, setTeamMembersCarousal] = useState<TeamMember[]>([]);

  async function fetchTeamMembers() {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
  
      // Filter out development members
      let filteredData = data.data.filter((member: TeamMember) => member.development !== true);
  
      // Move Mr. K. Ananth Kamath to the first position
      const ananthIndex = filteredData.findIndex((member: TeamMember) =>
        member.name.toLowerCase().includes("ananth kamath")
      );
      if (ananthIndex > -1) {
        const [ananth] = filteredData.splice(ananthIndex, 1);
        filteredData = [ananth, ...filteredData];
      }
  
      // Set both desktop and carousel arrays based on the updated order
      setTeamMembers(filteredData);
      setTeamMembersCarousal([
        ...filteredData,
        ...filteredData.map((member: TeamMember, index: number) => ({
          ...member,
          id: index + 100, // Ensuring unique ID
        })),
      ]);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  }
  

  useEffect(() => {
    fetchTeamMembers();
  }, []);
 

  return (
    <div className="lg:pt-[153px] py-16 lg:py-0 lg:pb-[198px] xl:pt-[160px] xl:pb-[191px]">
      <div className="mx-auto xl:mx-[284px] lg:mx-[180px]">
        {/* Section Heading */}
        <Typography
          variant="custom"
          className="text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium text-center text-customBrown lg:pb-[84px] sm:pb-[94px]"
        >
          Our Leadership Team
        </Typography>

        {/* Desktop Carousel */}
        <div className={`hidden lg:grid ${teamMembers.length == 2 ? `grid-cols-2 mx-52` : `grid-cols-3`} auto-rows-[1fr]    gap-10`}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard member={member} key={index} />
          ))}
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
                <SwiperSlide key={index} className="swiper-slide !overflow-visible">
                  <div className="text-center h-full">
                    <Image
                      src={member.fileUrl}
                      alt={member.name}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover rounded-[10px] shadow-lg"
                    />
                    <Typography variant="custom" className="text-xl text-[#04070799] font-freightNeoMedium mt-4">
                      {member.name}
                    </Typography>
                    <Typography variant="custom" className="text-xl text-[#04070799] font-FreightNeoProNormal">
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
const fadeInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
// ============= Sub Components =============
const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <motion.div
  variants={fadeInLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}>
  <div className="text-center w-[100%] pb-1  ">
    <div className="aspect-auto lg:mb-[34px] w-full h-[70%]">
      <Image width={400} height={500} src={member.fileUrl} alt={member.name} className="w-full h-full object-cover rounded-[20px] shadow-lg" />
    </div>
    <Typography variant="custom" className="text-xl sm:text-xl md:text-4xl 2xl:text-5xl text-customTextGray font-freightNeoMedium">
      {member.name}
    </Typography>
    <Typography variant="custom" className="text-customTextGray font-FreightNeoProNormal px-20 lg:text-2xl 2xl:text-3xl">
      {member.role}
    </Typography>
  </div>
  </motion.div>
);
