import React from "react";
import Typography from "../Typography/Typography";
import Image from "next/image";


const CurrentProject: React.FC = () => {
  return (
    <div className="xl:mx-[278px] lg:mx-[122px] flex flex-crow">
      <div className="w-1/2">
        <div className="bg-[#AE856614] rounded-md w-[166px] h-[34px] text-center flex items-center justify-center pt-1">
          <Typography className="text-customBrown font-FreightNeoProNormal">
            Limited Plots Available
          </Typography>
        </div>
        <div className="mt-8">
          <Typography className="text-56px font-freightNeoMedium text-customBrown">
            Vaikuntam City
          </Typography>
        </div>
        <div className="mt-5">
          <Typography className="text-[#4F373799] font-freightNeoMedium text-lg">
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
          <div>
            <Typography className="text-[60px] font-FreightNeoProNormal text-[#503637]">
              500+
            </Typography>
            <Typography className="text-[24px] font-FreightNeoProNormal text-[#503637] pt-4">
              Tree Cover
            </Typography>
          </div>
          <div className="my-16">
            <Typography className="text-[60px] font-FreightNeoProNormal text-[#503637]">
            20,000 sq.ft.
            </Typography>
            <Typography className="text-[24px] font-FreightNeoProNormal text-[#503637] pt-4">
            Spacious Clubhouse
            </Typography>
          </div>
          <div>
            <Typography className="text-[60px] font-FreightNeoProNormal text-[#503637]">
            3,400+ sq.m.
            </Typography>
            <Typography className="text-[24px] font-FreightNeoProNormal text-[#503637] pt-4">
            Parks & Open Spaces
            </Typography>
          </div>
        </div>
      </div>
      <div className="">
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
