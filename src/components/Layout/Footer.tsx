import Image from "next/image";
import React from "react";
import logo from "../../../public/images/logos/logolight.svg";
import chieverslog from "../../../public/images/logos/chieverslog.svg";
import SubHeading from "../Common/SubHeding";
import NavLink from "../Common/NavLink";
import FooterLink from "../Common/FooterLinks";
import {
  Instgram,
  LinkedIn,
  Mail,
  Meta,
  Phone,
  Share,
  Youtube,
} from "../Icons/Icons";

/**
 * Footer Component
 * Renders the main footer section of the website with:
 * - Company logo and tagline
 * - Quick links (collapsible on mobile)
 * - Resources section (collapsible on mobile)
 * - Contact information
 * - Newsletter signup
 * - Copyright and legal links
 */
const Footer = () => {
  // SVG for dropdown arrow used in mobile view
  const DropdownArrow = () => (
    <svg
      className="w-5 h-5 text-footerTextColor"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <footer className="bg-black text-white pt-8 lg:pt-16 w-full">
      <div className="px-6 lg:px-20 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Section 1: Company Branding */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Logo */}
            <Image
              src={logo}
              alt="Logo"
              width={225}
              height={72}
              className="w-36 md:w-56 lg:w-[224px] h-auto"
            />
            {/* Tagline */}
            <p className="text-footerTextColor font-freightNeoMedium text-lg md:text-2xl mt-4 text-center 2xl:text-[] lg:text-left">
              Building Wholesome <br />
              Living Spaces
            </p>
            {/* Recognition - Desktop only */}
            <div className="mt-8 hidden text-3xl lg:block">
              <FooterLink href="">Recognized by</FooterLink>
              <Image
                src={chieverslog}
                alt="chieverslog"
                width={148}
                height={82}
                className="mt-4"
              />
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            {/* Mobile View - Collapsible */}
            <details className="lg:hidden border-b border-gray-700 pb-2">
              <summary className="flex items-center justify-between text-lg text-footerTextColor font-freightNeoSemibold cursor-pointer">
                Quick Links
                <DropdownArrow />
              </summary>
              <ul className="space-y-4 mt-4 text-gray-300">
                <li>
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/projects">Our Projects</FooterLink>
                </li>
                <li>
                  <FooterLink href="/career-application">Careers</FooterLink>
                </li>
              </ul>
            </details>

            {/* Desktop View */}
            <div className="hidden lg:block">
              <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">
                Quick Links
              </SubHeading>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/projects">Our Projects</FooterLink>
                </li>
                <li>
                  <FooterLink href="/career-application">Careers</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Resources */}
          <div>
            {/* Mobile View - Collapsible */}
            <details className="lg:hidden pb-2">
              <summary className="flex items-center justify-between text-lg text-footerTextColor font-freightNeoSemibold cursor-pointer">
                Resources
                <DropdownArrow />
              </summary>
              <ul className="space-y-4 mt-4 text-gray-300">
                <li>
                  <FooterLink href="/resources/media-kit">Media</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Insights</FooterLink>
                </li>
              </ul>
            </details>

            {/* Desktop View */}
            <div className="hidden lg:block">
              <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">
                Resources
              </SubHeading>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <FooterLink href="/resources/media-kit">Media</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Insights</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4: Contact Information and Newsletter */}
          <div>
            <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">
              Get in Touch
            </SubHeading>
            {/* Contact Details */}
            <ul className="space-y-4 text-gray-300">
              <li className="flex  md:flex-row flex-col md:items-start items-center md:gap-0 gap-3">
                <Share />
                <FooterLink href="" className="pl-4">
                  Laxman Commercial Complex Golikatta Bazar, Bunder, Mangalore -{" "}
                  <span className="font-CandideCondensedNormal">575001</span>
                </FooterLink>
              </li>
              <li className="flex  md:flex-row flex-col  md:items-start items-center md:gap-0 gap-3">
                <Phone />
                <FooterLink href="" type="number" className="pl-4">
                  +91 89046 88886
                </FooterLink>
              </li>
              <li className="flex  md:flex-row flex-col md:items-start items-center md:gap-0 gap-3 ">
                <Mail />
                <FooterLink href="" className="pl-4">
                  info@viturealty.com
                </FooterLink>
              </li>
              {/* Social Media Links */}
              <li className="flex gap-2 justify-center md:justify-start">
                <NavLink href="">
                  <Instgram />
                </NavLink>
                <NavLink href="">
                  <Meta />
                </NavLink>
                <NavLink href="">
                  <LinkedIn />
                </NavLink>
                <NavLink href="">
                  <Youtube />
                </NavLink>
              </li>
            </ul>

            {/* Newsletter Signup Form */}
            <div className="mt-8 hidden md:block">
              <div className="flex items-center border-b border-gray-700 w-full">
                <input
                  type="email"
                  placeholder="Sign up for Our Newsletter"
                  className="bg-transparent flex-grow text-footerTextColor text-sm md:text-lg placeholder:text-footerTextColor focus:outline-none"
                />
                <button className="text-footerTextColor">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 mx-auto flex flex-col md:hidden">
        <div className="flex gap-4 mt-4 md:mt-0 mx-auto">
          <a
            href="/terms-of-service"
            className="text-[#FFFFFF66] text-xs font-freightNeoMedium"
          >
            Legal Disclaimer
          </a>
          <span className="text-[#FFFFFF66] text-xs">|</span>
          <a
            href="/terms-of-service"
            className="text-[#FFFFFF66] text-xs font-freightNeoMedium"
          >
            Terms of Service
          </a>
        </div>
        <hr className="w-[90%] border-[#FFFFFF66] mx-auto mt-4" />
        <p className="text-[#FFFFFF66] text-xs text-center 2xl:text-xl md:text-left mt-4">
            © <span className="font-CandideCondensedNormal">2024</span>{" "}
            <span className="font-freightNeoMedium">
              Vitu Realty | All rights reserved.
            </span>
          </p>
      </div>
      {/* Footer Bottom: Copyright and Legal Links */}
      <div className="mt-8 border-t hidden md:block border-gray-800 px-6 lg:px-20 xl:px-40 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#FFFFFF66] text-xs text-center 2xl:text-xl md:text-left">
            © <span className="font-CandideCondensedNormal">2024</span>{" "}
            <span className="font-freightNeoMedium">
              Vitu Realty | All rights reserved.
            </span>
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="/terms-of-service"
              className="text-[#FFFFFF66] text-xs font-freightNeoMedium"
            >
              Legal Disclaimer
            </a>
            <span className="text-[#FFFFFF66] text-xs">|</span>
            <a
              href="/terms-of-service"
              className="text-[#FFFFFF66] text-xs font-freightNeoMedium"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
