import Typography from "@/components/Typography/Typography";
import React from "react";
import elite from "../../../../../../public/images/logos/eliteBrownLogo.svg";
import Image from "next/image";

const ThankYouPage = () => {
  return (
    <div className="relative flex flex-col items-center bg-[#F3EAE1] min-h-screen px-4 pt-12">
      {/* Logo at the top center */}
      <Image src={elite} width={199} height={199} alt="elite logo" className="mb-10" />

      {/* Centered content */}
      <div className="flex flex-col items-center text-center text-[#1C1213] max-w-7xl flex-1 justify-center">
        <h1 className="font-[var(--font-tenor-sans)] font-normal  pb-6 text-[2.3rem] sm:text-[2.3rem] md:text-[3.75rem] lg2:text-[5.25rem] 2xl:text-[6rem]">
          Thank You for Showing Interest <br /> in Vaikuntam City Elite
        </h1>

        <Typography
          variant="custom"
          className="font-sans font-normal text-[#040707CC] text-[1rem] px-6 pb-4 sm:text-[1.375rem] md:px-0 md:text-[1.3rem] 2xl:text-[2.125rem]"
        >
          Your details have been successfully received.
        </Typography>

        <Typography
          variant="custom"
          className="font-sans font-normal text-customBrown text-[1.5rem] px-6 sm:text-[1.5rem] md:px-0 md:text-[1.5rem] "
          aria-level={3}
        >
          Our team will get in touch with you shortly to share more information and assist you further.
        </Typography>
      </div>
    </div>
  );
};

export default ThankYouPage;
