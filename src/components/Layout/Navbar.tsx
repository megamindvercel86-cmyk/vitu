"use client";

import { useState } from "react";
import Image from "next/image";
import NavLink from "../Common/NavLink";
import logo from "../../../public/images/logos/logo.svg";
import logoWhite from "../../../public/images/logos/logoWhite.svg";
import Button from "../Common/Button";
import { MenuIcon, MenuIconWhite } from "../Icons/Icons";
import Link from "next/link";

interface NavbarProps {
  navbar?: string;
  active?: string; // Pass the active route as a prop
  showGetInTouch?: boolean;
}

export default function Navbar({
  showGetInTouch = true,
  navbar = "secondary",
  active = "", // The currently active route
}: NavbarProps) {
  // State for toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <header className="max-w-[1497px] xl:pt-[98px] xl:px-0 xl:mx-auto lg:pt-[62px] lg:px-[78px] sm:pt-[34px] sm:px-[26px] pt-[34px] px-[26px]">
        <nav className="flex justify-between items-center">
          {/* Left side: Logo */}
          <div className="flex items-center">
            <Link href="/">
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
            </Link>
          </div>

          {/* Right side: Hamburger Icon (for mobile) */}
          <div
            className="md:flex lg:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {navbar === "primary" ? <MenuIconWhite /> : <MenuIcon />}
          </div>

          {/* Main Navigation Links */}
          <div
            className={`flex flex-col md:gap-4 lg:gap-[86px] ml-20 max-w-[712px] lg:flex-row items-center mt-4 lg:mt-0 ${
              isMenuOpen ? "block" : "hidden"
            } md:hidden lg:flex`}
          >
            <NavLink
              href="/about"
              className={`pt-1 ${
                active === "/" // Check if this is the active link
                  ? navbar === "primary"
                    ? "text-white border-b-2 border-white"
                    : "text-black border-b-2 border-black"
                  : navbar === "primary"
                  ? "text-white"
                  : "text-black"
              }`}
            >
              About
            </NavLink>
            <NavLink
              href="/about"
              className={`pt-1 ${
                active === "/about" // Check if this is the active link
                  ? navbar === "primary"
                    ? "text-white border-b-2 border-white"
                    : "text-black border-b-2 border-black"
                  : navbar === "primary"
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Projects
            </NavLink>
            <NavLink
              href="/resources"
              className={`pt-1 ${
                active === "/resources" // Check if this is the active link
                  ? navbar === "primary"
                    ? "text-white border-b-2 border-white"
                    : "text-black border-b-2 border-black"
                  : navbar === "primary"
                  ? "text-white"
                  : "text-black"
              }`}
            >
              Resources
            </NavLink>
            <Link href="/project-enquire">
            {showGetInTouch && (
              <Button
              onClick={() => {
               
              }}
                className={`lg:w-[204px] lg:h-[55px] text-[26px] ${
                  navbar === "primary" ? "bg-white" : ""
                }`}
                defaultTextColor={
                  navbar === "primary"
                    ? "text-primaryButtonTextColor"
                    : "text-white"
                }
              >
                Get in Touch
              </Button>
            )}
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
