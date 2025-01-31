"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavLink from "../Common/NavLink";
import Button from "../Common/Button";
import { MenuIcon, MenuIconWhite, CloseIcon, SecondaryInstgramIcon, SecondaryLinkedInIcon, SecondaryMetaIcon, SecondaryYoutubeIcon } from "../Icons/Icons";
import logo from "../../../public/images/logos/logo.svg";
import logoWhite from "../../../public/images/logos/logoWhite.svg";
import { motion, AnimatePresence } from "framer-motion";


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

  // Add useEffect to control body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Add sidebar menu component
  const SidebarMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center px-7 pt-[34px]">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  className="w-[95px] h-[30px]"
                />
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Links - Updated for center alignment */}
            <div className="flex flex-col items-center justify-center flex-grow">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  className="text-2xl font-FreightNeoProBold mb-8 last:mb-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              {showGetInTouch && (
                <Link 
                  href="/project-enquire" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full px-7"
                >
                  <button className="w-full h-[58px] text-xl font-FreightNeoProBold text-white bg-cusomButtonColor rounded-[34px] mt-8">
                    Get in Touch
                  </button>
                </Link>
              )}
            </div>

            {/* Social Links - Updated for center alignment */}
            <div className="mt-auto mb-8 flex justify-center gap-4 w-full">
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryInstgramIcon/>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryMetaIcon/>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryLinkedInIcon/>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryYoutubeIcon/>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div>
      <header className="max-w-[1497px] 2xl:max-w-full 2xl:mx-40 xl:pt-[98px] xl:px-0 xl:mx-auto lg:pt-[62px] lg:px-[78px] sm:pt-[34px] sm:px-[26px] pt-[34px] px-[26px]">
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
      <SidebarMenu />
    </div>
  );
}
