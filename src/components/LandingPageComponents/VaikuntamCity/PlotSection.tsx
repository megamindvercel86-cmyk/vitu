"use client";

import Typography from "@/components/Typography/Typography";
import Image from "next/image";

//============ Component Imports =============

export default function PlotSection(): React.ReactElement {
  return (
    <section className="">
      <div className="h-[20rem] lg:h-full w-full relative py-16 lg:py-24 xl:py-28 ">
        <Image
          src={"/images/VaikuntamCityLandingPage/plotAerialView.jpg"}
          fill
          alt="Sand castle image"
          className="object-cover object-center"
        />
        <div className="container relative mx-auto lg:block hidden">
          <div className="flex justify-end w-full">
            <div>
              <h1 className="font-fsSiena text-white  lg:leading-none text-2xl md:text-3xl lg:text-5xl md:max-w-md">
                Confidently Invest in <br /> Tomorrow
              </h1>
              <Typography
                variant="custom"
                className="font-fsSplitSans text-pretty text-white pb-2 md:text-xl lg2:text-2xl lg:text-xl text-sm  max-w-xl  mt-2 lg:mt-4"
              >
                Vaikuntam City in Surathkal offers a premier investment
                opportunity, ideally positioned close to the International
                airport and beautiful beaches. Located just a half-hour drive
                from key business hubs, industrial areas, and prestigious
                educational institutions, Vaikuntam City provides the perfect
                blend of convenience and opportunity. Enjoy the vibrant social
                infrastructure and picturesque attractions, making Vaikuntam
                City an ideal choice for those seeking a lucrative and thriving
                real estate market in Surathkal.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 lg:py-24 xl:py-28 px-4 container mx-auto lg:hidden">
        <h1 className="font-freightNeoMedium text-customBrown  lg:leading-none text-2xl md:text-3xl lg:text-5xl md:max-w-md">
          Confidently Invest in <br /> Tomorrow
        </h1>
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-pretty text-customTextGray pb-2 md:text-xl lg2:text-2xl lg:text-xl text-sm  max-w-xl  mt-2 lg:mt-4"
        >
          Vaikuntam City in Surathkal offers a premier investment opportunity,
          ideally positioned close to the International airport and beautiful
          beaches. Located just a half-hour drive from key business hubs,
          industrial areas, and prestigious educational institutions, Vaikuntam
          City provides the perfect blend of convenience and opportunity. Enjoy
          the vibrant social infrastructure and picturesque attractions, making
          Vaikuntam City an ideal choice for those seeking a lucrative and
          thriving real estate market in Surathkal.
        </Typography>
      </div>
    </section>
  );
}
