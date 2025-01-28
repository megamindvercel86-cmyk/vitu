import React from "react";
import Typography from "../Typography/Typography";
import Image from "next/image";

const CurrentProject: React.FC = () => {
  return (
    <div className="xl:mx-[278px] lg:mx-[122px] md:mx-[60px] mx-[28px] sm:mx-[28px]  flex lg:flex-row sm:flex-col flex-col">
      <div className="md:w-1/2 w-full">
        <div className="bg-[#AE856614] rounded-md w-[166px] h-[34px] text-center flex items-center justify-center pt-1">
          <Typography variant="custom" className="text-customBrown font-FreightNeoProNormal">
            Limited Plots Available
          </Typography>
        </div>

          <Typography
           variant="custom"
            className="text-2xl lg:text-[56px] w-[224px] md:w-full font-freightNeoMedium leading-[28px] md:leading-[72px] xl:leading-[67px] text-customBrown md:pt-0 pt-3"
          >
            Vaikuntam City
          </Typography>


          <Typography
            variant="custom"
            className="text-[#4F373799] font-freightNeoMedium text-lg md:max-w-[553px] xl:max-w-[458px]"
          >
            Just 5 minutes away from the serene NITK Surathkal 
            beach, our premium plotted development offers 
            unparalleled access to coastal beauty.
          </Typography>
    
        <div className="mt-[29px]">
          <button className="hidden md:block bg-none rounded-[36px] border-[2px] w-[287px] h-14 border-customBrown text-[22px] font-FreightNeoProBold  text-customBrown items-center justify-center text-center">
            Explore the Project Now
          </button>
        </div>
        <div className="mt-[188px] hidden md:block">
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
      <div className="md:hidden block w-full   items-center justify-center text-center leading-[1] pt-10">
          <button className="items-center w-full h-[56px] rounded-[36px] border-[2px] border-customBrown text-customBrown text-[22px] font-FreightNeoProBold hover:bg-customBrown hover:text-white transition-colors duration-300">
            Explore the Project Now
          </button>
        </div>
    </div>
  );
};

export default CurrentProject;
