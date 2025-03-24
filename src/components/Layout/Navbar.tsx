"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavLink from "../Common/NavLink";
import Button from "../Common/Button";
import {
  MenuIcon,
  MenuIconWhite,
  CloseIcon,
  SecondaryInstgramIcon,
  SecondaryLinkedInIcon,
  SecondaryMetaIcon,
  SecondaryYoutubeIcon,
} from "../Icons/Icons";
import logo from "../../../public/images/logos/logo.svg";
import logoWhite from "../../../public/images/logos/logoWhite.svg";
import { motion, AnimatePresence } from "framer-motion";
import NavbarResponsiveComponent from "../NavbarResponsiveComponent/NavbarResponsiveComponent";

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
const ROUTE_CONFIG: RouteConfig = {
  "/": {
    buttonColor: "text-[#298BBB]",
  },
  "/about": {
    buttonColor: "text-[#6F8AAF]",
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
const PROJECT_LINKS = [
  { href: "/vaikuntamcity", label: "Vaikuntam City" },
  { href: "/mithila", label: "Mithila" },
  { href: "/vilasam", label: "Vilasam" },
];

const NAV_LINKS = [
  { href: "/about", label: "About" },
  {
    href: "#",
    label: "Projects",
    hasDropdown: true,
    dropdownItems: PROJECT_LINKS,
  },
  { href: "/resources", label: "Resources" },
];
const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    className="inline-block ml-2 w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={false} // Prevents animation on mount
    animate={{ rotate: isOpen ? 180 : 0 }} // Rotates 180° when open
    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7" // Base position (pointing down)
    />
  </motion.svg>
);
export default function Navbar({ showGetInTouch = true, navbar = "secondary" }: NavbarProps) {
  // ============= State =============
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownMenuOpen] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  

  // ============= Computed Values =============
  const { buttonColor } = ROUTE_CONFIG[pathname] || DEFAULT_BUTTON_CONFIG;
  const isNavbarPrimary = navbar === "primary";

  // ============= Helper Functions =============
  const getLinkClassName = (path: string) => {
    const isActive = pathname === path;

    return `2xl:text-4xl ${
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
          initial={{ x: window.innerWidth }}
          animate={{ x: 0 }}
          exit={{ x: window.innerWidth }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto h-full bg-white"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Rest of the component remains exactly the same */}
          <div className="flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center px-7 pt-[34px]">
              <Link href="/">
                <Image src={logo} alt="Logo" className="w-[95px] h-[30px]" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center flex-grow space-y-6">
              {NAV_LINKS.map(({ href, label, dropdownItems }) => (
                <div key={href} className="flex flex-col items-center">
                  <NavLink
                    href={href}
                    className="text-2xl font-FreightNeoProBold text-center hover:text-gray-600 transition-colors"
                  >
                    {label} {dropdownItems&&<button onClick={()=>setIsDropDownMenuOpen(!isDropDownOpen)}>dfsgsdfg</button>}
                  </NavLink>

                  {/* Always show sub-menu items below the parent */}
                  {isDropDownOpen&&dropdownItems && (
                    <div className="mt-2  flex flex-col items-center space-y-2">
                      {dropdownItems.map((item) => (
                        <NavLink
                          key={item.href}
                          href={item.href}
                          className="text-sm font-FreightNeoProBold py-1.5 hover:text-gray-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {showGetInTouch && (
                <Link href="/project-enquire" onClick={() => setIsMenuOpen(false)} className="w-full flex justify-center">
                  <button className="w-[90%] h-[58px] text-xl font-FreightNeoProBold text-white bg-cusomButtonColor rounded-[34px] mt-8">
                    Get in Touch
                  </button>
                </Link>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center w-full gap-4 mt-auto mb-8">
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryInstgramIcon />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryMetaIcon />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryLinkedInIcon />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center">
                <SecondaryYoutubeIcon />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div>
      <header className="max-w-[1497px] 2xl:max-w-full 2xl:mx-40 xl:pt-[98px] xl:px-0 xl:mx-auto lg:pt-[62px] lg:px-[48px] lg2:px-[78px] sm:pt-[34px] sm:px-[26px] pt-[34px] px-[26px]">
        <nav className="flex flex-col items-center lg:flex-row w-full">
          {/* Logo Section - Left 50% */}
          <div className="w-full lg:w-1/2 flex items-center justify-start">
            <Link href="/">
              <Image
                src={isNavbarPrimary ? logoWhite : logo}
                alt="Logo"
                className="w-[95px] h-[30px] sm:w-[95px] sm:h-[30px] md:w-[105px] md:h-[60px] lg2:w-[225px] lg2:h-[72px] lg:w-[150px] lg:h-[50px] xl:w-[260px] xl:h-[83px]"
              />
            </Link>
            {/* Mobile Menu Button */}
            <div className="flex items-center cursor-pointer ml-auto lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isNavbarPrimary ? <MenuIconWhite /> : <MenuIcon />}
            </div>
          </div>

          {/* Navigation Links - Right 50% */}
          <div
            className={`hidden lg:flex lg:w-1/2 ${
              showGetInTouch ? "ml-28 2xl:ml-96" : "xl:ml-[45rem] lg2:ml-[50%] lg:ml-[30rem]"
            } items-center justify-between`}
          >
            <div className="flex items-center justify-between w-full">
              {NAV_LINKS.map(({ href, label, hasDropdown, dropdownItems }) => (
                <div key={href} className="relative group">
                  <div onMouseEnter={() => hasDropdown && setActiveDropdown(href)} onMouseLeave={() => setActiveDropdown(null)}>
                    <NavLink href={href} className={getLinkClassName(href)}>
                      {label}
                      {hasDropdown && <ArrowIcon isOpen={activeDropdown === href} />}
                    </NavLink>
                    {hasDropdown && activeDropdown === href && (
                      <div className="group">
                        <div className="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
                          {dropdownItems?.map((item) => (
                            <div className="py-1" key={item.href}>
                              <Link href={item.href} key={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {item.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {showGetInTouch && (
                <Link href="/general-enquire">
                  <Button
                    className={`w-full pb-[0.5px] text-base sm:text-lg md:text-xl lg2:text-2xl px-4 lg2:px-7 xl:px-10  lg:text-[20px] xl:text-[26px] 2xl:text-4xl ${
                      isNavbarPrimary ? "bg-white" : ""
                    }`}
                    defaultTextColor={buttonColor}
                  >
                    Get in Touch
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      {/* <SidebarMenu /> */}
      {isMenuOpen&&<NavbarResponsiveComponent 
  setIsMenuOpen={setIsMenuOpen} 
  setIsDropDownMenuOpen={setIsDropDownMenuOpen} 
  isDropDownOpen={isDropDownOpen} 
  showGetInTouch={showGetInTouch} 
/>}
    </div>
  );
}
