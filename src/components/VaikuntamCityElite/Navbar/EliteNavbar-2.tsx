import Image from "next/image";
import React from "react";
import eliteLogo from "../../../../public/images/logos/vaikuntamCityElite.svg";
import vitulogo from "../../../../public/images/logos/logoWhite.svg";

const EliteNavbar2 = ({ leftAlignLogos = false }: { leftAlignLogos?: boolean }) => {
  return (
    <header className="absolute w-full z-10 bg-transparent">
      <div className="container mx-auto">
        <div
          className={`flex items-center w-ful md:mx-20 mx-6 my-12 ${
            leftAlignLogos ? "md:justify-start gap-4 justify-center" : "justify-center lg:justify-between"
          }`}
        >
          <Image
            src={eliteLogo}
            width={199}
            height={199}
            alt="elite"
            className="lg:w-[16%] lg:h-[100%] sm:w-[35%] sm:h-[35%] w-[50%] h-[50%]"
          />

          {leftAlignLogos && (
            <div className="h-14 w-px bg-[#E0D9C7] hidden md:block" />
          )}

          <Image
            src={vitulogo}
            width={199}
            height={199}
            alt="vitu"
            className={`lg:w-[12%] lg:h-[100%] w-[30%] h-[30%] ${
              leftAlignLogos ? " hidden md:block" : "hidden lg:block"
            }`}
          />
        </div>
      </div>
    </header>
  );
};

export default EliteNavbar2;
