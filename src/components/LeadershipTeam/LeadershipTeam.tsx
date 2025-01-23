import React from "react";
import Typography from "../Typography/Typography";

const teamMembers = [
  {
    name: "Ananth Kamath",
    title: "Managing Director",
    image: "/images/leaderShipTeamImages/AnanthKamath.png",
  },
  {
    name: "Laxman Kamath",
    title: "Executive Director",
    image: "/images/leaderShipTeamImages/LaxmanKamath.png",
  },
  {
    name: "Ananya Bhandary",
    title: "Senior Executive\nBusiness Development",
    image: "/images/leaderShipTeamImages/AnanyaBhandary.png",
  },
];

export default function LeadershipTeam() {
  return (
    <div className="lg:pt-[153px] lg:pb-[198px] xl:pt-[160px] xl:pb-[191px]">
      <div className=" mx-auto   xl:mx-[284px] lg:mx-[78px]">
        <Typography variant="custom" className="sm:text-2xl text-2xl  md:text-6xl xl:text-[52px] font-freightNeoMedium text-center text-customBrown lg:pb-[84px] sm:pb-[94px]">
          Our Leadership Team
        </Typography>
        <div className="grid grid-cols-1 lg:gap-[42px] xl:gap-[78px] sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="aspect-square  lg:mb-[34px]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[500px] object-cover rounded-[20px] shadow-lg"
                />
              </div>
              <Typography variant="custom" className="text-xl sm:text-xl md:text-4xl text-customTextGray font-freightNeoMedium">
                {member.name}
              </Typography>
              <Typography variant="custom" className="text-customTextGray font-FreightNeoProNormal px-0 xl:px-[87px] lg:text-2xl">
                {member.title}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
