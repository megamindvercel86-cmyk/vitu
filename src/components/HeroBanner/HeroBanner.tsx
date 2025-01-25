import React from "react";
import Button from "../Common/Button";
import Typography from "../Typography/Typography";

const HeroBanner: React.FC = () => {
  return (
    <div className="relative xl:h-[67.5rem] md:h-[64.125rem] sm:h-[35.5rem] h-[35.5rem]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/images/backgroundImages/resourcesPageBackground.png")',
        }}
      >
      </div>
      {/* Content */}
      <div className="relative h-full flex items-end pb-24">
        <div className="w-full">
          <div className="xl:px-[13.125rem] lg:px-[4.875rem] sm:px-[1.625rem]  px-[1.625rem]">
            <div className="text-white  mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
              <div>
                <Typography
                  variant="custom"
                  className="text-white lg:text-2xl sm:text-xs"
                >
                  BLOG{" "}
                </Typography>
                <Typography
                  variant="custom"
                  className="text-white  font-freightNeoMedium md:text-[4rem] sm:text-[2rem] text-[2rem]"
                >
                  Is it Really worth it?
                </Typography>
                <Typography
                  variant="custom"
                  className="text-white md:text-2xl sm:text-sm text-sm font-freightNeoMedium md:w-[38.688rem] w-full"
                >
                  Is real estate investment worth it? We break down the pros,
                  cons, and key considerations to help you decide.
                </Typography>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  onClick={() => {}}
                  className="rounded-[2rem] bg-transparent border-2 w-full md:w-[15.688rem] lg:h-[4.5rem] sm:text-base lg:text-[2rem] border-white"
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
