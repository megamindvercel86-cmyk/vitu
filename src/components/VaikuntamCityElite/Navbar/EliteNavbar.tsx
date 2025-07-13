import Image from "next/image";
import React from "react";
import eliteLogo from "../../../../public/images/logos/vaikuntamCityElite.svg";
import vitulogo from "../../../../public/images/logos/logoWhite.svg";

const EliteNavbar = () => {
  return (
    <div className="absolute w-full ">
      <div className="flex justify-between w-ful md:mx-20 mx-6 my-12">
        <Image src={eliteLogo} width={199} height={199} alt="elite  " className="lg:w-[10%] lg:h-[100%] w-[25%] h-[20%]" />
        <Image src={vitulogo} width={199} height={199} alt="vitu  " className="lg:w-[10%] lg:h-[100%] w-[25%] h-[20%]"/>
      </div>
    </div>
  );
};

export default EliteNavbar;
