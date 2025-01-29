import React from "react";
import Typography from "../Typography/Typography";
import AppleStyleCard from "../ui/apple-style-card";
import InfiniteCarousel from "../Common/InfiniteCarousel/InfiniteCarousel";

type Cards = {
  id: number;
  url: string;
  bottomTitle: string;
};

const cards: Cards[] = [
  {
    id: 14,
    url: "/images/SustainabilityInitiativesImages/1.png",
    bottomTitle: "Beach cleaning",
  },
  {
    id: 15,
    url: "/images/SustainabilityInitiativesImages/2.png",
    bottomTitle: "500+ Tree Cover",
  },
  {
    id: 16,
    url: "/images/SustainabilityInitiativesImages/3.png",
    bottomTitle: "Emission control",
  },
  {
    id: 17,
    url: "/images/SustainabilityInitiativesImages/1.png",
    bottomTitle: "Beach cleaning",
  },
  {
    id: 18,
    url: "/images/SustainabilityInitiativesImages/2.png",
    bottomTitle: "500+ Tree Cover",
  },
  {
    id: 19,
    url: "/images/SustainabilityInitiativesImages/3.png",
    bottomTitle: "Emission control",
  },
];

const SustainabilityInitiatives = () => {
  return (
    <div className="flex flex-col md:flex-row lg:gap-8 md:gap-6 xl:mx-[278px] lg:mx-[122px] md:mx-[60px]  ">
      {/* Left Column */}
      <div className="md:w-1/2 md:flex md:flex-col mx-[28px] sm:mx-[28px] md:mx-0">
        <div className="max-w-[700px] lg:max-w-none mx-auto lg:mx-0">
          <Typography
            variant="custom"
            className="text-customBrown text-2xl md:text-[50px] xl:text-[60px] leading-[1.1] md:leading-[1.2] xl:leading-[67px] font-freightNeoMedium mb-4 md:mb-6"
          >
            Our Commitment to Sustainability
          </Typography>
          <Typography
            variant="custom"
            className="md:text-[#4F373799] text-[#04070799] text-base  md:text-xl xl:text-2xl font-freightNeoMedium md:mb-12"
          >
            Our commitment to sustainability drives us to create eco-friendly,
            energy-efficient spaces that benefit both our clients and the
            planet.
          </Typography>
          <div className="lg:mt-auto md:block hidden">
            <AppleStyleCard
              key={11}
              id={11}
              imageSrc={"/images/SustainabilityInitiativesImages/1.png"}
              className="md:max-w-[528px] xl:max-w-[664px] md:h-[460px] lg:h-[660px] w-full"
              cardClassName="rounded-[20px]"
              bottomTitle="Beach cleaning"
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 md:flex hidden md:mt-0 mb-40">
        <div className="flex w-full flex-col gap-8  lg:gap-12 xl:gap-16 items-end ">
          <AppleStyleCard
            key={12}
            id={12}
            imageSrc="/images/SustainabilityInitiativesImages/2.png"
            className="md:max-w-[593px] md:h-[542px] lg:h-[742px] w-full"
            cardClassName="rounded-[20px]"
             bottomTitle="500+ Tree Cover"
          />

          <AppleStyleCard
            key={13}
            id={13}
            imageSrc="/images/SustainabilityInitiativesImages/3.png"
            className="md:max-w-[593px] md:h-[260px] lg:h-[256px] w-full"
            cardClassName="rounded-[20px]"
             bottomTitle="Emission control"
          />
        </div>
      </div>
      <div className="md:hidden block mb-12">
        <InfiniteCarousel cards={cards} />
      </div>
    </div>
  );
};

export default SustainabilityInitiatives;
