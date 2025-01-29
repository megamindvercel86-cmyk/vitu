import React from "react";
import Typography from "../Typography/Typography";
import AppleStyleCard from "../ui/apple-style-card";


const SustainabilityInitiatives = () => {
  return (
    <div className="flex flex-row xl:mx-[280px]">
      <div className="w-1/2">
        <div className="lg:w-[500px] leading-[1]">
          <Typography
            variant="custom"
            className="text-customBrown leading-[28px] md:leading-[72px] xl:leading-[67px] text-[60px] font-freightNeoMedium"
          >
            Our Commitment to Sustainability
          </Typography>
          <Typography
            variant="custom"
            className="text-[#4F373799] text-2xl font-freightNeoMedium"
          >
            Our commitment to sustainability drives us to create eco-friendly,
            energy-efficient spaces that benefit both our clients and the
            planet.
          </Typography>
          <div>
            <div className="mt-[69px]">
              <AppleStyleCard
                key={11}
                id={11}
                imageSrc={"/images/SustainabilityInitiativesImages/1.png"}
                className={"xl:h-[660px] xl:w-[664px]"}
                cardClassName="rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-end">
        <div>
          <div>
            <AppleStyleCard
              key={12}
              id={12}
              imageSrc="/images/SustainabilityInitiativesImages/2.png"
              className="xl:h-[742px] xl:w-[593px]"
              cardClassName="rounded-[20px]"
            />
          </div>
          <div className="mb-[166px] mt-[124px]">
            <AppleStyleCard
              key={13}
              id={13}
              imageSrc="/images/SustainabilityInitiativesImages/3.png"
              className="xl:h-[256px] xl:w-[593px]"
               cardClassName="rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityInitiatives;
