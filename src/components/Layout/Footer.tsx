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

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8 lg:pt-16 w-full">
      <div className="px-6 lg:px-20 xl:px-40">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Tagline Section */}
          <div className="flex flex-col items-center lg:items-start">
            <Image
              src={logo}
              alt="Logo"
              width={225}
              height={72}
              className="w-36 md:w-56 lg:w-[224px] h-auto"
            />
            <p className="text-footerTextColor font-freightNeoMedium text-lg md:text-2xl mt-4 text-center lg:text-left">
              Building Wholesome <br />
              Living Spaces
            </p>
            <div className="mt-8 hidden lg:block">
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

          {/* Quick Links - Dropdown for mobile */}
          <div>
            <details className="lg:hidden border-b border-gray-700 pb-2">
              <summary className="flex items-center justify-between text-lg text-footerTextColor font-freightNeoSemibold cursor-pointer">
                Quick Links
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
              </summary>
              <ul className="space-y-4 mt-4 text-gray-300">
                <li>
                  <FooterLink href="">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Our Projects</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Careers</FooterLink>
                </li>
              </ul>
            </details>

            <div className="hidden lg:block">
              <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">
                Quick Links
              </SubHeading>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <FooterLink href="">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Our Projects</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Careers</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Resources - Dropdown for mobile */}
          <div>
            {/* Resources */}
            <details className="lg:hidden pb-2">
              <summary className="flex items-center justify-between text-lg text-footerTextColor font-freightNeoSemibold cursor-pointer">
                Resources
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
              </summary>
              <ul className="space-y-4 mt-4 text-gray-300">
                <li>
                  <FooterLink href="">Media</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Insights</FooterLink>
                </li>
              </ul>
            </details>
            <div className="hidden lg:block">
              <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">
                Resources
              </SubHeading>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <FooterLink href="">Media</FooterLink>
                </li>
                <li>
                  <FooterLink href="">Insights</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">
              Get in Touch
            </SubHeading>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <Share />
                <FooterLink href="" className="pl-4">
                  Laxman Commercial Complex Golikatta Bazar, Bunder, Mangalore -
                  575001
                </FooterLink>
              </li>
              <li className="flex items-center">
                <Phone />
                <FooterLink href="" className="pl-4">
                  +91 89046 88886
                </FooterLink>
              </li>
              <li className="flex items-center">
                <Mail />
                <FooterLink href="" className="pl-4">
                  info@viturealty.com
                </FooterLink>
              </li>
              <li className="flex gap-2">
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

            {/* Newsletter Signup */}
            <div className="mt-8">
              <div className="flex items-center border-b border-gray-700 w-full">
                <input
                  type="email"
                  placeholder="Sign up for Our Newsletter"
                  className="bg-transparent flex-grow text-footerTextColor text-sm md:text-lg placeholder:text-gray-400 focus:outline-none"
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

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-800 px-6 lg:px-20 xl:px-40 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-xs text-center md:text-left">
            © <span className="font-CandideCondensedNormal">2024</span>{" "}
            <span className="font-freightNeoMedium">
              Vitu Realty | All rights reserved.
            </span>
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-white text-xs font-freightNeoMedium">
              Legal Disclaimer
            </a>
            <span className="text-white text-xs">|</span>
            <a href="#" className="text-white text-xs font-freightNeoMedium">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
