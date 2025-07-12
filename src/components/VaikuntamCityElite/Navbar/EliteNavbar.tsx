import Image from "next/image";
import React from "react";
import eliteLogo from "../../../../public/images/logos/vaikuntamCityElite.svg";
import vitulogo from "../../../../public/images/logos/logoWhite.svg";

const EliteNavbar = () => {
  return (
    <div className="absolute w-full ">
      <div className="flex justify-between w-ful mx-20 my-12">
        <Image src={eliteLogo} width={199} height={199} alt="elite" />
        <Image src={vitulogo} width={199} height={199} alt="vitu" />
      </div>
    </div>
  );
};

export default EliteNavbar;
