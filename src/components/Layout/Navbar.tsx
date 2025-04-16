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
  { href: "/", label: "Home" },
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
    initial={false}
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </motion.svg>
);

export default function Navbar({ showGetInTouch = true, navbar = "secondary" }: NavbarProps) {
  // ============= State =============
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
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

  // Handle mouse enter for dropdown
  const handleMouseEnter = (href: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout); // Clear any pending close timeout
    }
    setActiveDropdown(href);
  };

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null); // Close dropdown after delay
    }, 200); // 200ms delay
    setDropdownTimeout(timeout);
  };

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
            className={`hidden lg:flex ${
              showGetInTouch ? "ml-2 2xl:ml-96 lg:w-1/2" : "lg:w-full xl:ml-[45rem] lg2:ml-[50%] lg:ml-[30rem]"
            } items-center justify-between`}
          >
            <div className="flex items-center justify-between w-full">
              {NAV_LINKS.map(({ href, label, hasDropdown, dropdownItems }) => (
                <div key={href} className="relative group">
                  <div
                    onMouseEnter={() => hasDropdown && handleMouseEnter(href)}
                    onMouseLeave={() => hasDropdown && handleMouseLeave()}
                  >
                    <NavLink href={href} className={getLinkClassName(href)}>
                      {label}
                      {hasDropdown && <ArrowIcon isOpen={activeDropdown === href} />}
                    </NavLink>
                    {hasDropdown && activeDropdown === href && (
                      <div
                        className="absolute left-0 w-40 mt-0 origin-top-left backdrop-blur-3xl divide-y divide-gray-100 rounded-md shadow-lg transition duration-300 z-50"
                        onMouseEnter={() => handleMouseEnter(href)} // Keep dropdown open when hovering
                        // onMouseLeave={handleMouseLeave} // Close dropdown after delay
                      >
                        {dropdownItems?.map((item) => (
                          <div className="py-1" key={item.href}>
                            <Link
                              href={item.href}
                              className={`block px-4 py-2 font-freightNeoMedium text-xl ${
                                pathname === "/" || pathname === "/about" ? "text-white" : "text-black"
                              } `}
                            >
                              {item.label}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {showGetInTouch && (
                <Link href="/general-enquire">
                  <Button
                    className={`w-full pt-[2px] text-base sm:text-lg md:text-xl lg2:text-2xl px-4 lg2:px-7 xl:px-10 lg:text-[20px] xl:text-[26px] 2xl:text-4xl ${
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
      {isMenuOpen && (
        <NavbarResponsiveComponent
          setIsMenuOpen={setIsMenuOpen}
          setIsDropDownMenuOpen={setIsDropDownMenuOpen}
          isDropDownOpen={isDropDownOpen}
          showGetInTouch={showGetInTouch}
        />
      )}
    </div>
  );
}