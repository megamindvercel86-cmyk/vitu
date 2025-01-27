import React from "react";
import Typography from "../Typography/Typography";
import Image from "next/image";

const CurrentProject: React.FC = () => {
  return (
    <div className="xl:mx-[278px] lg:mx-[122px] md:mx-[60px] mx-[24px] sm:mx-[24px]  flex lg:flex-row sm:flex-col flex-col">
      <div className="md:w-1/2 w-full">
        <div className="bg-[#AE856614] rounded-md w-[166px] h-[34px] text-center flex items-center justify-center pt-1">
          <Typography variant="custom" className="text-customBrown font-FreightNeoProNormal">
            Limited Plots Available
          </Typography>
        </div>
        <div>
          <Typography
            variant="custom"
            className="md:text-56px text-2xl font-freightNeoMedium text-customBrown pt-3 md:pt-6"
          >
            Vaikuntam City
          </Typography>
        </div>
        <div>
          <Typography
            variant="custom"
            className="text-[#4F373799] font-freightNeoMedium text-lg"
          >
            Just 5 minutes away from the serene NITK Surathkal <br />
            beach, our premium plotted development offers <br />
            unparalleled access to coastal beauty.
          </Typography>
        </div>
        <div className="mt-[29px]">
          <button className="bg-none rounded-[36px] border-[2px] w-[287px] h-14 border-customBrown text-[22px] font-FreightNeoProBold  text-customBrown  flex items-center justify-center text-center">
            Explore the Project Now
          </button>
        </div>
        <div className="mt-[188px] ">
          <div className="leading-[1.1]">
            <Typography
              variant="custom"
              className="text-[60px] font-FreightNeoProNormal text-[#503637]"
            >
              500+
            </Typography>
            <Typography
              variant="custom"
              className="text-[24px] font-FreightNeoProNormal text-[#503637] "
            >
              Tree Cover
            </Typography>
          </div>
          <div className="my-10 leading-[1.1]">
            <Typography
              variant="custom"
              className="text-[60px] font-FreightNeoProNormal text-[#503637]"
            >
              20,000 sq.ft.
            </Typography>
            <Typography
              variant="custom"
              className="text-[24px] font-FreightNeoProNormal text-[#503637] "
            >
              Spacious Clubhouse
            </Typography>
          </div>
          <div className="leading-[1.1]">
            <Typography
              variant="custom"
              className="text-[60px] font-FreightNeoProNormal text-[#503637]"
            >
              3,400+ sq.m.
            </Typography>
            <Typography
              variant="custom"
              className="text-[24px] font-FreightNeoProNormal text-[#503637]"
            >
              Parks & Open Spaces
            </Typography>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full">
        <Image
          src={"/images/visionAndFutureImages/image5.png"}
          width={708}
          height={400}
          alt="Image"
          quality={100}
        />
      </div>
    </div>
  );
};

export default CurrentProject;
