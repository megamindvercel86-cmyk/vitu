"use client";

import Image from "next/image";
import Typography from "../Typography/Typography";
import Link from "next/link";
import { LinkedIn, Meta, Youtube } from "../Icons/Icons";
import logo from "../../../public/images/logos/logo.svg";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
export default function Footer() {
  const router = useRouter();
  const [footerNav, setFooterNav] = useState({
    quickMenu: false,
    resources: false,
    disclosure: false,
  });
  return (
    <>
      <footer className="bg-[#000] py-4 lg:pt-24 lg:pb-20 -mt-12 font-openSans hidden lg:block">
        <div className="container">
          <div className="flex lg:flex-wrap justify-center lg:justify-between">
            <div>
              <Image
                src={logo}
                alt="logo"
                width={400}
                height={200}
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
            <div>
              <ul className="space-y-4">
                <li>
                  <Typography className="text-white" fontWeight="font-bold">
                    Quick Menu
                  </Typography>
                </li>
                <li>
                  <Link href="/about">
                    <Typography
                      variant="small"
                      className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      About
                    </Typography>
                  </Link>
                </li>
                <li>
                  <Link href="/our-portfolio">
                    <Typography
                      variant="small"
                      className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      Our Portfolio
                    </Typography>
                  </Link>
                </li>

                <li>
                  <Link href="/reach-out">
                    <Typography
                      variant="small"
                      className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      Contact Us
                    </Typography>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li>
                  <Typography className="text-white" fontWeight="font-bold">
                    Resources
                  </Typography>
                </li>
                <li>
                  <Link href="/blogs">
                    <Typography
                      variant="small"
                      className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      Blogs
                    </Typography>
                  </Link>
                </li>
                <li>
                  <Link href="/media">
                    <Typography
                      variant="small"
                      className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      Media
                    </Typography>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li>
                  <Typography className="text-white" fontWeight="font-bold">
                    Disclosure
                  </Typography>
                </li>
                <li>
                  <Link href="/terms">
                    <Typography
                      variant="small"
                      className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      Privacy Policy
                    </Typography>
                  </Link>
                </li>
                <li>
                  <Link href="/legal-disclosure">
                    <Typography
                      variant="small"
                      className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                    >
                      Legal Disclosure
                    </Typography>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr className="bg-white/20 opacity-20 w-full h-[2px] lg:mt-16" />
          <div className="mt-8 flex items-center gap-4 justify-between">
            <div>
              <Typography variant="small" className="text-white/50">
                ® Ventana Ventures. All Rights Reserved.
              </Typography>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/company/ventana-venture/"
                target="_blank"
                className="inline-block"
              >
                <LinkedIn />
              </Link>
              <Link
                href="https://twitter.com/Ventanaventure"
                target="_blank"
                className="inline-block"
              >
                <Meta />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <footer className="bg-[#000]  py-24 -mt-12 font-openSans lg:hidden">
        <div className="container">
          <div className="mt-16 space-y-4">
            <div>
              <div
                onClick={() => {
                  setFooterNav((prev) => ({
                    ...prev,
                    quickMenu: !prev.quickMenu,
                  }));
                }}
                className="flex items-center justify-between gap-8"
              >
                <Typography variant="custom" className="text-xl text-white">
                  Quick Menu
                </Typography>
                <FaChevronDown
                  className={`h-6 w-6 lg:h-8 lg:w-8 shrink-0 transition-transform duration-300  ${
                    footerNav.quickMenu
                      ? "rotate-180 text-primary"
                      : "text-white"
                  }`}
                />
              </div>
              <div
                className={`mt-4 transition-all duration-300 ease-in-out ${
                  footerNav.quickMenu ? "h-full opacity-100" : " h-0 opacity-0"
                }`}
              >
                {footerNav.quickMenu && (
                  <ul className="space-y-2">
                    <li>
                      <Link href="/about">
                        <Typography
                          variant="small"
                          className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          About
                        </Typography>
                      </Link>
                    </li>
                    <li>
                      <Link href="/our-portfolio">
                        <Typography
                          variant="small"
                          className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          Our Portfolio
                        </Typography>
                      </Link>
                    </li>

                    <li>
                      <Link href="/reach-out">
                        <Typography
                          variant="small"
                          className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          Contact Us
                        </Typography>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <hr className="h-[2px] w-full bg-white/20 opacity-20 mt-6" />
            </div>
            <div>
              <div
                onClick={() => {
                  setFooterNav((prev) => ({
                    ...prev,
                    resources: !prev.resources,
                  }));
                }}
                className="flex items-center justify-between gap-8"
              >
                <Typography variant="custom" className="text-xl text-white">
                  Resources
                </Typography>
                <FaChevronDown
                  className={`h-6 w-6 lg:h-8 lg:w-8 shrink-0 transition-transform duration-300  ${
                    footerNav.resources
                      ? "rotate-180 text-primary"
                      : "text-white"
                  }`}
                />
              </div>
              <div
                className={`mt-4 transition-all duration-300 ease-in-out ${
                  footerNav.resources ? "h-full opacity-100" : " h-0 opacity-0"
                }`}
              >
                {footerNav.resources && (
                  <ul className="space-y-2">
                    <li>
                      <Link href="/blogs">
                        <Typography
                          variant="small"
                          className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          Blogs
                        </Typography>
                      </Link>
                    </li>
                    <li>
                      <Link href="/media">
                        <Typography
                          variant="small"
                          className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          Media
                        </Typography>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <hr className="h-[2px] w-full bg-white/20 opacity-20 mt-6" />
            </div>
            <div>
              <div
                onClick={() => {
                  setFooterNav((prev) => ({
                    ...prev,
                    disclosure: !prev.disclosure,
                  }));
                }}
                className="flex items-center justify-between gap-8"
              >
                <Typography variant="custom" className="text-xl text-white">
                  Disclosure
                </Typography>
                <FaChevronDown
                  className={`h-6 w-6 lg:h-8 lg:w-8 shrink-0 transition-transform duration-300  ${
                    footerNav.disclosure
                      ? "rotate-180 text-primary"
                      : "text-white"
                  }`}
                />
              </div>
              <div
                className={`mt-4 transition-all duration-300 ease-in-out ${
                  footerNav.disclosure ? "h-full opacity-100" : " h-0 opacity-0"
                }`}
              >
                {footerNav.disclosure && (
                  <ul className="space-y-2">
                    <li>
                      <Link href="/terms">
                        <Typography
                          variant="small"
                          className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          Privacy Policy
                        </Typography>
                      </Link>
                    </li>
                    <li>
                      <Link href="/legal-disclosure">
                        <Typography
                          variant="small"
                          className="text-white/80 hover:text-primary transition-colors ease-in-out duration-300"
                        >
                          Legal Disclosure
                        </Typography>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <hr className="h-[2px] w-full bg-white/20 opacity-20 mt-6" />
            </div>
          </div>
          <Typography
            variant="custom"
            className="text-white/100 text-center opacity-50 mt-8"
          >
            ® Ventana Ventures. All Rights Reserved.
          </Typography>
        </div>
      </footer>
    </>
  );
}
