"use client";

import { useState } from "react";
import Image from "next/image";
import NavLink from "../Common/NavLink";
import logo from "../../../public/images/logos/logo.svg";
import Button from "../Common/Button";
import { MenuIcon } from "../Icons/Icons";

interface NavbarProps {
  showGetInTouch?: boolean; // Optional prop to control the button
}

export default function Navbar({ showGetInTouch = true }: NavbarProps) {
  // State for toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="xl:pt-[98px] xl:px-[210px] lg:pt-[62px] lg:px-[78px] sm:pt-[34px] sm:px-[26px] pt-[34px] px-[26px]">
        <nav className="flex justify-between items-center">
          {/* Left side: Logo */}
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              className="w-[95px] h-[30px] sm:w-[95px] sm:h-[30px] md:w-[105px] md:h-[60px] lg:w-[225px] lg:h-[72px] xl:w-[260px] xl:h-[83px]"
            />
          </div>

          {/* Right side: Hamburger Icon (for mobile) */}
          <div className="md:flex lg:hidden flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuIcon />
          </div>


          {/* Main Navigation Links */}
          <div className={`flex flex-col md:gap-4 lg:gap-[86px] lg:flex-row items-center mt-4 lg:mt-0 ${isMenuOpen ? 'block' : 'hidden'} md:hidden lg:flex`}>
            <NavLink href="/" >About</NavLink>
            <NavLink href="/about" >Projects</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            {showGetInTouch && (
              <Button onClick={() => {}} className="lg:w-[204px] lg:h-[55px]  text-[28px] font-">
                Get in Touch
              </Button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
