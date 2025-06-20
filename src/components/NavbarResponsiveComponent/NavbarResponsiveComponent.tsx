import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { ArrowRightIcon, CloseIcon, SecondaryInstgramIcon, SecondaryLinkedInIcon, SecondaryMetaIcon, SecondaryYoutubeIcon } from "../Icons/Icons";
import NavLink from "../Common/NavLink";
import logo from "../../../public/images/logos/logo.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { usePathname } from "next/navigation";

const NavbarResponsiveComponent = ({
  setIsMenuOpen,
  setIsDropDownMenuOpen,
  isDropDownOpen,
  showGetInTouch,
}: {
  setIsMenuOpen: (open: boolean) => void;
  setIsDropDownMenuOpen: (open: boolean) => void;
  isDropDownOpen: boolean;
  showGetInTouch: boolean;
}) => {
  const PROJECT_LINKS = [
    { href: "/vaikuntamcity", label: "Vaikuntam City" },
    // { href: "/vilasam", label: "Vilasam" },
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

  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: window.innerWidth, scale: 0.95 }}
        animate={{ x: 0, scale: 1 }}
        exit={{ x: window.innerWidth, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-50 overflow-y-auto h-full bg-white"
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Rest of the component remains exactly the same */}
        <motion.div
          initial={{ x: window.innerWidth, scale: 0.95 }}
          animate={{ x: 0, scale: 1 }}
          exit={{ x: window.innerWidth, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 overflow-y-auto h-full bg-white"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex flex-col h-full" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center px-7 pt-[34px]">
              <Link href="/" aria-label="Go to Homepage">
                <Image src={logo} alt="Logo" className="w-[95px] h-[30px]" />
              </Link>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setIsMenuOpen(false)}
                className="focus:outline-none"
              >
                <CloseIcon />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center justify-center flex-grow space-y-6">
              {NAV_LINKS.map(({ href, label, dropdownItems }) => (
                <div key={href} className="flex flex-col items-center">
                  <NavLink href={href} className="text-2xl font-FreightNeoProBold text-center hover:text-gray-600 transition-colors">
                    <div className={`flex gap-2 ${dropdownItems && "pl-6"}`}>
                      <div onClick={() => pathname === href && setIsMenuOpen(false)}>{label}</div>
                      {dropdownItems && (
                        <button
                          aria-label={isDropDownOpen ? "Collapse Projects menu" : "Expand Projects menu"}
                          onClick={() => setIsDropDownMenuOpen(!isDropDownOpen)}
                        >
                          {!isDropDownOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                        </button>
                      )}
                    </div>
                  </NavLink>

                  {/* Always show sub-menu items below the parent */}
                  {isDropDownOpen && dropdownItems && (
                    <div className="mt-2  flex flex-col items-center space-y-2">
                      {dropdownItems.map((item, index) => (
                        <NavLink
                          key={index}
                          href={item.href}
                          className="text-2xl font-FreightNeoProBold py-1.5 hover:text-gray-600 transition-colors"
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {showGetInTouch && (
                <Link aria-label="Get in Touch" href="/project-enquire"  className="w-full flex justify-center">
                  <button
                    aria-label="Get in Touch"
                    className="w-[90%] h-[58px] text-xl font-FreightNeoProBold text-white bg-cusomButtonColor rounded-[34px] mt-8"
                  >
                    Get in Touch
                  </button>
                </Link>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center w-full gap-4 mt-auto mb-8">
              <Link
                href="https://www.instagram.com/vitu.realty"
                target="_blank"
                aria-label="Visit our Instagram"
                className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center"
              >
                <SecondaryInstgramIcon />
              </Link>
              <Link
                href="https://www.facebook.com/p/VITU-Realty-61557046860214/"
                target="_blank"
                aria-label="Visit our Facebook"
                className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center"
              >
                <SecondaryMetaIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/company/vitu-realty/"
                target="_blank"
                aria-label="Visit our LinkedIn"
                className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center"
              >
                <SecondaryLinkedInIcon />
              </Link>
              <Link
                href="https://www.youtube.com/@viturealty/featured"
                target="_blank"
                aria-label="Visit our YouTube"
                className="w-10 h-10 rounded-full bg-[#EFEAE8] flex items-center justify-center"
              >
                <SecondaryYoutubeIcon />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavbarResponsiveComponent;
