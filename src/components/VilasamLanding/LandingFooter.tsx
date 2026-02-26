"use client";

import React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function LandingFooter() {
  const scrollToTop = () => {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power4.inOut" });
  };

  return (
    <footer
      style={{
        background: "radial-gradient(circle at center, #0F5B5B 0%, #024854 100%)",
      }}
      className="relative w-full  md:min-h-0 md:h-auto text-white pt-12 pb-8  md:pt-20 px-4 md:px-12 lg:px-10 overflow-hidden flex flex-col items-center"
    >
      {/* =========================================
          DESKTOP ONLY: Top-Left Back to Top Button
          ========================================= */}
      <button
        onClick={scrollToTop}
        className="hidden md:flex absolute top-8 left-8 w-8 h-8 items-center justify-center transition-transform hover:-translate-y-1"
        aria-label="Back to top"
      >
        <svg
          className="hover:text-gray-200"
          width="37"
          height="37"
          viewBox="0 0 37 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1257 16.4427C9.70145 16.7963 9.64413 17.4268 9.99769 17.8511C10.3513 18.2754 10.9818 18.3327 11.4061 17.9792L10.7659 17.2109L10.1257 16.4427ZM18.4999 10.7659L19.1401 9.99769C18.7693 9.68865 18.2306 9.68865 17.8598 9.99769L18.4999 10.7659ZM25.5938 17.9792C26.0181 18.3327 26.6486 18.2754 27.0022 17.8511C27.3558 17.4268 27.2984 16.7963 26.8742 16.4427L26.234 17.2109L25.5938 17.9792ZM17.4999 26.234C17.4999 26.7863 17.9477 27.234 18.4999 27.234C19.0522 27.234 19.4999 26.7863 19.4999 26.234H18.4999H17.4999ZM10.7659 17.2109L11.4061 17.9792L19.1401 11.5341L18.4999 10.7659L17.8598 9.99769L10.1257 16.4427L10.7659 17.2109ZM18.4999 10.7659L17.8598 11.5341L25.5938 17.9792L26.234 17.2109L26.8742 16.4427L19.1401 9.99769L18.4999 10.7659ZM18.4999 10.7659H17.4999V26.234H18.4999H19.4999V10.7659H18.4999ZM30.8744 6.12563L30.1673 6.83274C36.6109 13.2764 36.6109 23.7236 30.1673 30.1673L30.8744 30.8744L31.5815 31.5815C38.8062 24.3568 38.8062 12.6432 31.5815 5.41852L30.8744 6.12563ZM30.8744 30.8744L30.1673 30.1673C23.7236 36.6109 13.2764 36.6109 6.83274 30.1673L6.12563 30.8744L5.41852 31.5815C12.6432 38.8062 24.3568 38.8062 31.5815 31.5815L30.8744 30.8744ZM6.12563 30.8744L6.83274 30.1673C0.389087 23.7236 0.389087 13.2764 6.83274 6.83274L6.12563 6.12563L5.41852 5.41852C-1.80617 12.6432 -1.80617 24.3568 5.41852 31.5815L6.12563 30.8744ZM6.12563 6.12563L6.83274 6.83274C13.2764 0.389087 23.7236 0.389087 30.1673 6.83274L30.8744 6.12563L31.5815 5.41852C24.3568 -1.80617 12.6432 -1.80617 5.41852 5.41852L6.12563 6.12563Z"
            fill="#98D1D0"
          />
        </svg>
      </button>

      <div className="w-full  mx-auto flex flex-col items-center text-center h-full justify-between mt-6 md:mt-0">
        
        {/* Top Section - Logo and Branding */}
        <div className="flex flex-col items-center">
          {/* Vilasam Logo */}
          <div className="relative w-[240px] h-[80px] md:w-[280px] md:h-[90px] mb-8">
            <Image
              src="/svgs/newVilasamFtrLogo.svg"
              alt="Vilasam Logo"
              fill
              className="object-contain"
            />
          </div>

          {/* Brought to Life By */}
          <div className="mb-6 md:mb-12">
            <p className="text-[#98D1D066] text-[12px] md:text-md tracking-wider mb-4">
              Brought to Life by
            </p>
            <div className="relative w-[140px] h-[45px] md:w-[160px] md:h-[50px] mx-auto">
              <Image
                src="/svgs/vituRealtyTmFtrLogo.svg"
                alt="Vitu Realty Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section - Divider & Copyright */}
        <div className="w-full mt-auto md:mt-10 lg:mt-8">
          
          {/* =========================================
              DESKTOP ONLY: Standard Straight Divider
              ========================================= */}
          <div className="hidden md:block w-full h-[1px] bg-white/10 mb-8"></div>

          {/* =========================================
              MOBILE ONLY: Divider with Centered Button
              ========================================= */}
          <div className="flex md:hidden w-full items-center justify-center my-8">
            <div className="flex-grow h-[1px] bg-[#98D1D0] opacity-30"></div>
            <button
              onClick={scrollToTop}
              className="mx-4 w-10 h-10 flex items-center justify-center transition-transform hover:-translate-y-1"
              aria-label="Back to top"
            >
              <svg
                className="hover:text-gray-200"
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1257 16.4427C9.70145 16.7963 9.64413 17.4268 9.99769 17.8511C10.3513 18.2754 10.9818 18.3327 11.4061 17.9792L10.7659 17.2109L10.1257 16.4427ZM18.4999 10.7659L19.1401 9.99769C18.7693 9.68865 18.2306 9.68865 17.8598 9.99769L18.4999 10.7659ZM25.5938 17.9792C26.0181 18.3327 26.6486 18.2754 27.0022 17.8511C27.3558 17.4268 27.2984 16.7963 26.8742 16.4427L26.234 17.2109L25.5938 17.9792ZM17.4999 26.234C17.4999 26.7863 17.9477 27.234 18.4999 27.234C19.0522 27.234 19.4999 26.7863 19.4999 26.234H18.4999H17.4999ZM10.7659 17.2109L11.4061 17.9792L19.1401 11.5341L18.4999 10.7659L17.8598 9.99769L10.1257 16.4427L10.7659 17.2109ZM18.4999 10.7659L17.8598 11.5341L25.5938 17.9792L26.234 17.2109L26.8742 16.4427L19.1401 9.99769L18.4999 10.7659ZM18.4999 10.7659H17.4999V26.234H18.4999H19.4999V10.7659H18.4999ZM30.8744 6.12563L30.1673 6.83274C36.6109 13.2764 36.6109 23.7236 30.1673 30.1673L30.8744 30.8744L31.5815 31.5815C38.8062 24.3568 38.8062 12.6432 31.5815 5.41852L30.8744 6.12563ZM30.8744 30.8744L30.1673 30.1673C23.7236 36.6109 13.2764 36.6109 6.83274 30.1673L6.12563 30.8744L5.41852 31.5815C12.6432 38.8062 24.3568 38.8062 31.5815 31.5815L30.8744 30.8744ZM6.12563 30.8744L6.83274 30.1673C0.389087 23.7236 0.389087 13.2764 6.83274 6.83274L6.12563 6.12563L5.41852 5.41852C-1.80617 12.6432 -1.80617 24.3568 5.41852 31.5815L6.12563 30.8744ZM6.12563 6.12563L6.83274 6.83274C13.2764 0.389087 23.7236 0.389087 30.1673 6.83274L30.8744 6.12563L31.5815 5.41852C24.3568 -1.80617 12.6432 -1.80617 5.41852 5.41852L6.12563 6.12563Z"
                  fill="#98D1D0"
                />
              </svg>
            </button>
            <div className="flex-grow h-[1px] bg-[#98D1D0] opacity-30"></div>
          </div>

          {/* Disclaimer & Copyright */}
          <div className="max-w-[95%] md:max-w-[90%] mx-auto text-center text-[12px] md:text-[12px] leading-relaxed space-y-4 text-[#98D1D066] pb-6 md:pb-8">
            <p>
              Visual representations of the property, layout plans, and other
              materials are for illustration purposes only. All information on
              this website is provided for general informational use and does
              not constitute an offer or any form of binding commitment. All
              materials on this website, including design elements, are the
              intellectual property of the Organization. Any copying,
              reproduction, distribution including reposting to other websites
              or online resources, or other use of these materials is
              prohibited without the prior written consent of the rights
              holder.
            </p>
            <p className="pt-2 md:pt-3">
              © {new Date().getFullYear()} VITU Realty. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}