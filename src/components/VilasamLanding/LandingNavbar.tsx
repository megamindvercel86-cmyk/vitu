import Image from "next/image";
import Link from "next/link";
import React from "react";
import vitulogo from "../../../public/images/logos/vituTmLogo.svg";
import vitulogowhite from "../../../public/images/logos/vituTmLogoWhite.svg";

export default function LandingNavbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 lg:px-20 lg:py-10">
      
      {/* Left: DIFFERENT MOBILE LOGO */}
      <Link href="/vilasam" aria-label="Vilasam Home">
        <div className="relative w-[150px] h-[50px] md:w-[200px] md:h-[60px]">

          {/* Mobile logo */}
          <Image
            src="/svgs/newVilasamWhite.svg"     // <-- put your mobile file here
            alt="Vilasam Mobile Logo"
            className="block md:hidden w-full h-full object-contain"
            height={50}
            width={50}
          />

          {/* Desktop / larger logo – SAME AS BEFORE */}
          <Image
            src="/svgs/newVilasam.svg"
            alt="Vilasam Logo"
            className="hidden md:block w-full h-full object-contain"
            height={50}
            width={50}
          />

        </div>
      </Link>

      {/* Right: Vitu Realty Logo (unchanged for larger) */}
      <Link href="/" aria-label="Vitu Realty Home">
        <div className="relative w-[100px] h-[40px] md:w-[150px] md:h-[50px]">
          <Image src={vitulogo} alt="Vitu Realty Logo" className="object-contain hidden md:block w-full h-full" height={50} width={50} />
            <Image src={vitulogowhite} alt="Vitu Realty Logo" className="object-contain md:hidden w-full h-full" height={50} width={50} />
        </div>
      </Link>

    </header>
  );
}
