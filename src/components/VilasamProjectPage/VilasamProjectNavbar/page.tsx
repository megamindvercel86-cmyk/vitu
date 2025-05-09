"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Link } from "react-scroll";

import {
  MenuIcon,
  MenuIconWhite,
  CloseIcon,
  SecondaryInstgramIcon,
  SecondaryLinkedInIcon,
  SecondaryMetaIcon,
  SecondaryYoutubeIcon,
} from "@/components/Icons/Icons";

import logo from "../../../../public/images/logos/vilasam.svg";
import { motion, AnimatePresence } from "framer-motion";
import NavLink from "@/components/Common/NavLink";
import Button from "@/components/Common/Button";
import ContactFormModal from "@/components/Common/FormModal/FormModal";

// ============= Types & Interfaces =============
type VilasamProjectNavbarType = "primary" | "secondary";

interface VilasamProjectNavbarProps {
  VilasamProjectNavbar?: VilasamProjectNavbarType;
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
  "/vaikuntamcity": {
    buttonColor: "text-[#2B847D]",
  },
};

const DEFAULT_BUTTON_CONFIG = {
  buttonColor: "text-white",
};

// ============= Navigation Links =============
// ============= Navigation Links =============
const NAV_LINKS = [
  { href: "carousal", label: "Amenities" },
  { href: "sustainability", label: "Sustainability" },
  { href: "location", label: "Location" },
  { href: "plots", label: "Plots" },
];

export default function VilasamProjectNavbar({ showGetInTouch = true, VilasamProjectNavbar = "secondary" }: VilasamProjectNavbarProps) {
  // ============= State =============
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // ============= Computed Values =============
  const { buttonColor } = ROUTE_CONFIG[pathname] || DEFAULT_BUTTON_CONFIG;
  const isVilasamProjectNavbarPrimary = VilasamProjectNavbar === "secondary";

  // Add useEffect to control body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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
          className="fixed inset-0 z-50 overflow-y-auto bg-white"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center px-7 pt-[34px]">
              <NavLink href="/">
                <Image src={logo} alt="Logo" className="w-[95px] h-[30px]" />
              </NavLink>
              <button onClick={() => setIsMenuOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Links - Updated for center alignment */}
            <div className="flex flex-col items-center justify-center flex-grow">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  smooth={true}
                  duration={700}
                  className="mb-8 text-2xl font-FreightNeoProBold last:mb-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className=" cursor-pointer lg:gap-[86px] lg:text-[20px] lg2:text-[24px] gap-[56px] xl:text-[26px] text-black  font-geistSerif cursor:pointer mb-8 text-xl last:mb-0">
                    {" "}
                    {label}
                  </div>
                </Link>
              ))}
              {showGetInTouch && (
                <NavLink href="" onClick={() => {setIsMenuOpen(false);setIsGetInTouchOpen(true)}} className="w-full px-7">
                  <button className="w-full h-[58px] text-xl  font-FreightNeoProBold text-white bg-cusomButtonColor rounded-[34px] mt-8">
                    Get in Touch
                  </button>
                </NavLink>
              )}
            </div>

            {/* Social Links - Updated for center alignment */}
            <div className="flex justify-center w-full gap-4 mt-auto mb-8">
              <NavLink href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryInstgramIcon />
              </NavLink>
              <NavLink href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryMetaIcon />
              </NavLink>
              <NavLink href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryLinkedInIcon />
              </NavLink>
              <NavLink href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryYoutubeIcon />
              </NavLink>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div>
      <header className="absolute  xl:pt-[98px] left-0 right-0   sm:pt-[34px] sm:px-[26px] px-[26px] md:px-[78px] xl:px-[78px] pt-[34px] flex justify-center items-center w-full z-50 mx-auto lg:px-12 max-w-">
        <nav className="flex flex-col items-center lg:flex-row w-full">
          {/* Logo Section - Left 50% */}
          <div className="w-full lg:w-1/2 flex items-center justify-start">
            <NavLink href="/">
              <Image
                src={logo}
                alt="Logo"
                className="w-[95px] h-[30px] sm:w-[95px] sm:h-[30px] md:w-[105px] md:h-[60px] lg2:w-[225px] lg2:h-[72px] lg:w-[150px] lg:h-[50px] xl:w-[260px] xl:h-[83px]"
              />
            </NavLink>
            {/* Mobile Menu Button */}
            <div className="flex items-center cursor-pointer ml-auto lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isVilasamProjectNavbarPrimary ? <MenuIconWhite /> : <MenuIcon />}
            </div>
          </div>

          {/* Navigation Links - Right 50% */}
          <div className={`hidden lg:flex lg2:w-1/2 lg:w-2/3   items-center justify-between`}>
            <div className="flex items-center justify-between w-full">
              {NAV_LINKS.map(({ href, label }) => (
                <Link key={href} to={href} smooth={true} duration={700}>
                  <div className="2xl:text-4xl text-white lg:text-xl lg2:text-[23px] cursor-pointer font-geistSerif">{label}</div>
                </Link>
              ))}
              {showGetInTouch && (
                <NavLink href="">
                  <Button onClick={()=>setIsGetInTouchOpen(true)}
                    className={` w-full text-base sm:text-lg md:text-xl lg2:text-2xl px-4  lg2:px-7 xl:px-10 pt-[2px] lg:text-[20px] xl:text-[26px] 2xl:text-4xl ${
                      isVilasamProjectNavbarPrimary ? "bg-white" : ""
                    }`}
                    defaultTextColor="text-[#4074A8]"
                  >
                    Download E-Brochure
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      </header>
      <SidebarMenu />
      <ContactFormModal isOpen={isGetInTouchOpen} onClose={setIsGetInTouchOpen} />
    </div>
  );
}
