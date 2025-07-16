"use client";

import Typography from "@/components/Typography/Typography";
import Image from "next/image";

//============ Component Imports =============

export default function SandCastleSection(): React.ReactElement {
  return (
    <section className="py-16 lg:py-24 xl:py-28 relative">
      <div className="h-full w-full">
        <Image
          src={"/images/VaikuntamCityLandingPage/sandCastle.jpg"}
          fill
          alt="Sand castle image"
          className="object-cover object-center"
        />
        <div className="container relative mx-auto px-6">
          <h1 className="font-fsSiena  text-white  lg:leading-none text-2xl md:text-3xl lg:text-5xl lg2:text-7xl md:max-w-md lg2:max-w-2xl">
            Form the memories <br /> of a Lifetime
          </h1>
          <Typography
            variant="custom"
            className="font-fsSplitSans text-pretty text-white pb-2 md:text-xl lg2:text-2xl lg:text-xl text-sm  max-w-md  mt-2 lg:mt-4 "
          >
            Just 5 minutes away from the serene NITK Surathkal beach, Vaikuntam
            City offers unparalleled access to coastal beauty. Enjoy the
            soothing sounds of the waves & the convenience of a beachside
            retreat right at your doorstep.
          </Typography>
        </div>
      </div>
    </section>
  );
}
