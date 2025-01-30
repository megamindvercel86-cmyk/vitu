"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavLink from "../Common/NavLink";
import Button from "../Common/Button";
import { MenuIcon, MenuIconWhite } from "../Icons/Icons";
import logo from "../../../public/images/logos/logo.svg";
import logoWhite from "../../../public/images/logos/logoWhite.svg";

// ============= Types & Interfaces =============
type NavbarType = "primary" | "secondary";

interface NavbarProps {
  navbar?: NavbarType;
  showGetInTouch?: boolean;
}

type RouteConfig = {
  [key: string]: {
    buttonColor: string;
  };
};

// ============= Constants =============
/**
 * Configuration for button colors based on routes
 * Each route can specify its own button color
 */
const ROUTE_CONFIG: RouteConfig = {
  "/": {
    buttonColor: "text-[#877D62]",
  },
  "/about": {
    buttonColor: "text-[#877D62]",
  },
  "/resources": {
    buttonColor: "text-[#6F8AAF]",
  },
  "/projects": {
    buttonColor: "text-[#2B847D]",
  },
};

const DEFAULT_BUTTON_CONFIG = {
  buttonColor: "text-white",
};

// ============= Navigation Links =============
const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
];

export default function Navbar({
  showGetInTouch = true,
  navbar = "secondary",
}: NavbarProps) {
  // ============= State =============
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // ============= Computed Values =============
  const { buttonColor } = ROUTE_CONFIG[pathname] || DEFAULT_BUTTON_CONFIG;
  const isNavbarPrimary = navbar === "primary";

  // ============= Helper Functions =============
  /**
   * Generates className for navigation links based on current path and navbar type
   */
  const getLinkClassName = (path: string) => {
    const isActive = pathname === path;
    
    return `pt-1 ${
      isActive
        ? isNavbarPrimary
          ? "text-white border-b-2 border-white"
          : "text-black border-b-2 border-black"
        : isNavbarPrimary
        ? "text-white"
        : "text-black"
    }`;
  };

  return (
    <div>
      <header className="max-w-[1497px] xl:pt-[98px] xl:px-0 xl:mx-auto lg:pt-[62px] lg:px-[78px] sm:pt-[34px] sm:px-[26px] pt-[34px] px-[26px]">
        <nav className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={isNavbarPrimary ? logoWhite : logo}
                alt="Logo"
                className="w-[95px] h-[30px] sm:w-[95px] sm:h-[30px] md:w-[105px] md:h-[60px] lg:w-[225px] lg:h-[72px] xl:w-[260px] xl:h-[83px]"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div
            className="md:flex lg:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isNavbarPrimary ? <MenuIconWhite /> : <MenuIcon />}
          </div>

          {/* Navigation Links */}
          <div
            className={`flex flex-col md:gap-4 lg:gap-[86px] ml-20 max-w-[712px] lg:flex-row items-center mt-4 lg:mt-0 ${
              isMenuOpen ? "block" : "hidden"
            } md:hidden lg:flex`}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink key={href} href={href} className={getLinkClassName(href)}>
                {label}
              </NavLink>
            ))}

            {/* CTA Button */}
            <Link href="/project-enquire">
              {showGetInTouch && (
                <Button
                  className={`lg:w-[204px] lg:h-[55px] text-[26px] ${
                    isNavbarPrimary ? "bg-white" : ""
                  }`}
                  defaultTextColor={buttonColor}
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
