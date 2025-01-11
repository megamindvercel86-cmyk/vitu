import React from "react";
import SubHeading from "../Common/SubHeding";
import Heading from "../Common/Heading";
import Button from "../Common/Button";

const HeroBanner = () => {
  return (
    <div className="relative xl:h-[1080px] lg:h-[1026px] sm:h-[568px] h-[568px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/images/backgroundImages/resourcesPageBackground.png")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-24">
        <div className="w-full">
          <div className="xl:px-[210px] lg:px-[78px] sm:px-[26px]  px-[26px]">
            <div className="text-white  mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
              <div>
                <SubHeading className="text-white lg:text-2xl sm:text-xs">
                  BLOG{" "}
                </SubHeading>
                <Heading className="text-white">Is it Really worth it?</Heading>
                <SubHeading className="text-white lg:text-2xl sm:text-xs">
                  Is real estate investment worth it? We break down the pros,
                  <br />
                  cons, and key considerations to help you decide.
                </SubHeading>
              </div>
              <div>
                <Button
                  onClick={() => {}}
                  className="rounded-[32px] bg-transparent border-2 w-full lg:w-[251px] lg:h-[72px] sm:text-base lg:text-[32px] border-white"
                >
                  Read Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
