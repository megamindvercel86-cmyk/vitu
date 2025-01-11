"use client";

import { useState } from "react";
import Image from "next/image";
import NavLink from "../Common/NavLink";
import logo from "../../../public/images/logos/logo.svg";
import logoWhite from "../../../public/images/logos/logoWhite.svg";
import Button from "../Common/Button";
import { MenuIcon, MenuIconWhite } from "../Icons/Icons";

interface NavbarProps {
  navbar?: string;
  active?: string;
  showGetInTouch?: boolean;
}

export default function Navbar({
  showGetInTouch = true,
  navbar = "secondary",
  active = "",
}: NavbarProps) {
  // State for toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="xl:pt-[98px] xl:px-[210px] lg:pt-[62px] lg:px-[78px] sm:pt-[34px] sm:px-[26px] pt-[34px] px-[26px]">
        <nav className="flex justify-between items-center">
          {/* Left side: Logo */}
          <div className="flex items-center">
            {navbar === "primary" ? (
              <Image
                src={logoWhite}
                alt="Logo"
                className="w-[95px] h-[30px] sm:w-[95px] sm:h-[30px] md:w-[105px] md:h-[60px] lg:w-[225px] lg:h-[72px] xl:w-[260px] xl:h-[83px]"
              />
            ) : (
              <Image
                src={logo}
                alt="Logo"
                className="w-[95px] h-[30px] sm:w-[95px] sm:h-[30px] md:w-[105px] md:h-[60px] lg:w-[225px] lg:h-[72px] xl:w-[260px] xl:h-[83px]"
              />
            )}
          </div>

          {/* Right side: Hamburger Icon (for mobile) */}
          <div
            className="md:flex lg:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {" "}
            {navbar === "primary" ? <MenuIconWhite /> : <MenuIcon />}
          </div>

          {/* Main Navigation Links */}
          <div
            className={`flex flex-col md:gap-4 lg:gap-[86px] lg:flex-row items-center mt-4 lg:mt-0 ${
              isMenuOpen ? "block" : "hidden"
            } md:hidden lg:flex`}
          >
            <NavLink href="/" className={`${navbar === "primary" ? "text-white" : "text-black"}`}>About</NavLink>
            <NavLink href="/about" className={`${navbar === "primary" ? "text-white" : "text-black"}`}>Projects</NavLink>
            <NavLink href="/contact" className={`${navbar === "primary" ? "text-white" : "text-black"}`}>Contact</NavLink>
            {showGetInTouch && (
             <Button
             onClick={() => {}}
             className={`lg:w-[204px] lg:h-[55px] text-[26px] ${
               navbar === "primary" ? "bg-white" : ""
             }`}
             defaultTextColor={navbar === "primary" ? "text-primaryButtonTextColor" : "text-black"}
           >
             Get in Touch
           </Button>
           
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
