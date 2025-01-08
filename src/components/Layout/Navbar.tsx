"use client";

import Image from "next/image";
import NavLink from   "../Common/NavLink"
import logo from "../../../public/images/logos/logo.svg";

export default function Navbar() {
  return (
    <>
      <header className="pt-[98px] px-[210px] xl:pt-[98px] xl:px-[210px] lg:pt-[62px] lg:px-[78px] sm:pt-[34px] sm:px-[26px]">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={225}
              height={72}
              className="w-[225px] h-[72px] lg:w-[260px] lg:h-[83px] sm:w-[95px] sm:h-[30px]  md:w-[105px] md:h-[60px]"
            />
          </div>
          <div className="flex lg:gap-[86px] gap-[56px]">
            <NavLink href="/" >
              About
            </NavLink>
            <NavLink href="/about" >
              Projects
            </NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </nav>
      </header>
    </>
  );
}
