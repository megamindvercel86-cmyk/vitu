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
    <footer className="bg-black text-white pt-[95px] w-full ">
      <div className="px-[277px]">
        <div className="flex flex-col md:flex-row items-start justify-between w-full">
          {/* Logo and Tagline Section */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={logo}
                alt="Logo"
                width={225}
                height={72}
                className="w-[225px] h-[72px] lg:w-[224px] lg:h-[72px] sm:w-[95px] sm:h-[30px]  md:w-[105px] md:h-[60px]"
              />
            </div>
            <p className="text-footerTextColor font-freightNeoMedium text-[32px] mt-[39px]">
              Building Wholesome <br />
              Living Spaces
            </p>
            <div className="mt-[90px]">
              <FooterLink href="">Recognized by</FooterLink>
              <Image
                src={chieverslog}
                alt="chieverslog"
                width={148}
                height={82}
                className="pt-5"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="ml-[216px]">
            <SubHeading className="text-xl text-footerTextColor font-freightNeoSemibold mb-[15px] whitespace-nowrap">
              Quick Links
            </SubHeading>
            <ul className="space-y-[19px] text-gray-300">
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

          {/* Resources */}
          <div className="ml-[181px]">
            <SubHeading className="text-xl text-footerTextColor font-freightNeoSemibold mb-[15px]">
              Resources
            </SubHeading>
            <ul className="space-y-[19px] text-gray-300">
              <li>
                <FooterLink href="">Media</FooterLink>
              </li>
              <li>
                <FooterLink href="">Insights</FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="ml-[165px]">
            <SubHeading className="text-xl text-footerTextColor font-freightNeoSemibold mb-[15px]">
              Get in Touch
            </SubHeading>
            <ul className="space-y-[19px] text-gray-300">
              <li className="flex">
                <div className="mt-1">
                  <Share />
                </div>
                <FooterLink href="" className="pl-[17px]">
                  Laxman Commercial Complex Golikatta Bazar, Bunder, Mangalore -
                  575001
                </FooterLink>
              </li>
              <li className="flex">
                <div className="mt-1">
                  <Phone />
                </div>
                <FooterLink href="" className="pl-[17px]">
                  +91 89046 88886
                </FooterLink>
              </li>
              <li className="flex">
                <div className="mt-1">
                  <Mail />
                </div>
                <FooterLink href="" className="pl-[17px]">
                  info@viturealty.com
                </FooterLink>
              </li>
              <li className="flex gap-2.5">
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
            <div className="mt-[164px] mb-[54px]">
              <div className="flex items-center border-b border-gray-700 w-full">
                <input
                  type="email"
                  placeholder="Sign up for Our Newsletter"
                  className="bg-transparent flex-grow text-footerTextColor text-xl placeholder:text-footerTextColor placeholder:font-FreightNeoProLight placeholder:font-light focus:outline-none"
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
      <div className="mx-[166px] pt-[29px] border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center  px-[14px] pb-8">
          <p className="font-CandideCondensedMedium text-[rgba(255,255,255,0.4)] text-xs">
            ©&nbsp;
            <span className="font-CandideCondensedMedium">2024</span>
            &nbsp;Vitu Realty | All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="font-CandideCondensedMedium text-[rgba(255,255,255,0.4)] text-xs">
              Legal Disclaimer
            </a>
            <span className="font-CandideCondensedMedium text-[rgba(255,255,255,0.4)] text-xs">|</span>
            <a href="#" className="font-CandideCondensedMedium text-[rgba(255,255,255,0.4)] text-xs">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
