"use client";

import Image from "next/image";

import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { BiLogoMeta } from "react-icons/bi";
import eliteLogo from "../../../../public/images/logos/vikuntamCityEliteFooter.svg";
import vitulogo from "../../../../public/images/logos/vituLogoLight.svg";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Link as ScrollLink } from "react-scroll";

import { AnimatedConicButton } from "@/components/ui/moving-border";
import Link from "next/link";
// import "./eliteFooter3.css"

export default function EliteFooter3() {
  const handleClick = () => {
    sessionStorage.setItem("eliteFormTitle", "DOWNLOAD E-BROCHURE");
    window.dispatchEvent(new Event("storageChange")); // Custom event
  };

  useEffect(() => {
    // Clear session storage on page refresh
    sessionStorage.removeItem("eliteFormTitle");
  }, []);

  return (
    <footer className=" text-[#f3eae1] relative z-50">
      {/* <button className="hover-glow-button">
        Hover Me
      </button> */}
      <div className="container mx-auto px-6 pt-12 pb-10 lg:pt-16 ">
        <div className="flex items-center justify-center lg:justify-start">
          <div className="flex uppercase mb-10 lg:font-freightNeoMedium text-lg items-center gap-3 text-[#E0D9C799]">
            <Link href={"/"}>
              {" "}
              <h1>Home</h1>
            </Link>
            <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.36328 16.1885L8.9823 8.4932L1.36328 0.796875"
                stroke="#F3EAE1"
                strokeOpacity="0.6"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
            <h1 onClick={handleClick}>Vaikuntam city elite</h1>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between">
          {/* Left section */}
          <div className="space-y-6 text-center lg:text-start">
            {/* Logo */}
            <div className="flex flex-col items-center lg:items-start">
              <Image
                src={eliteLogo} // replace with actual logo
                alt="Vaikuntam City Elite"
                width={270}
                height={270}
                className="cursor-pointer"
              />
              <p className="text-[20px] font-tenorSans mt-5 mb-7 opacity-80">Designed for Inspired Living</p>
            </div>
            <div className="mt-6 flex justify-center border-[#F3EAE1]/30">
              <ScrollLink
                to="elitForm"
                onClick={handleClick}
                className="inline-flex cursor-pointer !bg-none items-center justify-center gap-2  mt-10 border-[#F3EAE1]/30   text-white border-[0.25px]   rounded-full text-sm font-medium lg:text-xl  "
              >
                <AnimatedConicButton
                  theme="custom"
                  className="hidden !text-white lg:font-medium lg:font-freightNeoMedium  !border-white md:flex hover:!bg-[#26170f] !bg-[#5a3623] lg:!bg-[#26170f]"
                >
                  <span className="flex gap-2 text-xl lg:font-freightNeoMedium items-center">
                    DOWNLOAD E-BROCHURE
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.2753 16.7061L16.2213 5.87717L5.39175 5.82251" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                      <path d="M16.2195 5.87756L6.1459 15.9512" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                    </svg>
                  </span>
                </AnimatedConicButton>
              </ScrollLink>
            </div>
            {/* Brochure Button */}
          </div>

          {/* Middle section */}
          <div className="flex flex-col mt-10 lg:mt-0  items-center lg:items-end justify-between  space-y-6">
            {/* Vitu Logo */}
            <Link href="/">
              <Image
                src={vitulogo} // replace with actual logo
                alt="Vitu Realty"
                width={200}
                height={200}
                className="opacity-90 mb-7 lg:mb-0"
              />
            </Link>

            <div className="flex items-center justify-center lg:-space-x-3 ">
              {/* Instagram */}

              <Link href="https://www.instagram.com/vitu.realty" target="_blank" rel="noopener noreferrer">
                <AnimatedConicButton
                  buttonBase="conic-button-base1"
                  theme="custom"
                  className="w-16 h-16 flex items-center justify-center rounded-full border border-[#F3EAE1] text-[#f3eae1] hover:text-[#1a0f0a] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M26.4992 13.4159C26.4966 14.5211 26.4841 15.6263 26.4689 16.7314C26.4507 18.0647 26.4301 19.3986 26.0957 20.7091C25.7451 22.0833 25.0535 23.2685 23.9775 24.1459C22.8437 25.0705 21.4733 25.5565 19.9941 25.6464C18.0323 25.7658 16.0696 25.8129 14.107 25.8083C12.1443 25.8129 10.1817 25.7658 8.2199 25.6464C6.74076 25.5565 5.37032 25.0705 4.23649 24.1459C3.16054 23.2685 2.46896 22.0833 2.11829 20.7091C1.7839 19.3986 1.76331 18.0647 1.74509 16.7314C1.72997 15.6263 1.71742 14.5211 1.71484 13.4159C1.71742 12.3108 1.72997 11.2055 1.74509 10.1004C1.76331 8.76713 1.7839 7.43323 2.11829 6.12276C2.46896 4.74853 3.16054 3.56335 4.23649 2.68594C5.37032 1.76132 6.74076 1.27532 8.2199 1.18537C10.1817 1.06606 12.1443 1.01891 14.107 1.02353C16.0696 1.01891 18.0323 1.06606 19.9941 1.18537C21.4733 1.27532 22.8437 1.76132 23.9775 2.68594C25.0535 3.56335 25.7451 4.74853 26.0957 6.12276C26.4301 7.43323 26.4507 8.76713 26.4689 10.1004C26.4841 11.2055 26.4966 12.3108 26.4992 13.4159Z"
                      stroke="#E0D9C7"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M19.5704 13.416C19.5704 16.4611 17.1018 18.9297 14.0567 18.9297C11.0115 18.9297 8.54297 16.4611 8.54297 13.416C8.54297 10.3709 11.0115 7.90229 14.0567 7.90229C17.1018 7.90229 19.5704 10.3709 19.5704 13.416Z"
                      stroke="#E0D9C7"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M22.928 6.327C22.928 7.19701 22.2227 7.90234 21.3527 7.90234C20.4827 7.90234 19.7773 7.19701 19.7773 6.327C19.7773 5.45699 20.4827 4.75166 21.3527 4.75166C22.2227 4.75166 22.928 5.45699 22.928 6.327Z"
                      fill="#E0D9C7"
                    />
                  </svg>
                </AnimatedConicButton>
              </Link>

              {/* Meta */}
              <Link href="https://www.facebook.com/p/VITU-Realty-61557046860214/" target="_blank" rel="noopener noreferrer">
                <AnimatedConicButton
                  buttonBase="conic-button-base1"
                  theme="custom"
                  className="w-16 h-16 flex items-center justify-center rounded-full border border-[#F3EAE1] text-[#f3eae1] hover:text-[#1a0f0a] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.38409 3.10787C6.74669 3.10787 5.26988 4.09241 4.64011 5.60386C4.06549 6.98294 3.28993 10.4019 2.93932 12.0343C2.84224 12.4864 2.80186 12.8747 2.83301 13.2234C2.93741 14.3913 3.29941 14.9492 3.6376 15.2359C3.99266 15.537 4.53197 15.7179 5.31988 15.7179C6.18729 15.7179 6.99351 15.2711 7.45325 14.5355L9.63635 11.0425L12.5388 6.20503L11.862 5.07701C11.862 5.077 11.862 5.07703 11.862 5.07701C11.129 3.85538 9.80879 3.10787 8.38409 3.10787ZM14.0868 3.6265C12.8643 1.65539 10.7082 0.453125 8.38409 0.453125C5.67497 0.453125 3.23154 2.08208 2.18957 4.5828C1.49908 6.24 0.673297 9.94264 0.343777 11.4769C0.216734 12.0684 0.124947 12.7451 0.188807 13.4596C0.335866 15.1051 0.90434 16.3991 1.92077 17.2608C2.92034 18.1084 4.15977 18.3726 5.31988 18.3726C7.10262 18.3726 8.75961 17.4542 9.70446 15.9425L11.894 12.4393L11.9066 12.4187L14.0868 8.78504L16.267 12.4187L16.2796 12.4393L18.4691 15.9425C19.414 17.4542 21.0709 18.3726 22.8537 18.3726C24.1583 18.3726 25.5142 18.0006 26.5324 16.9315C27.5421 15.8712 28.0242 14.3297 28.0242 12.3995C28.0242 11.1747 27.5598 9.39151 27.1292 7.96406C26.6804 6.47634 26.1962 5.15023 26.0474 4.74956C26.0127 4.65616 25.9712 4.54943 25.9209 4.43625C24.8457 2.01853 22.4453 0.453125 19.7895 0.453125C17.4654 0.453125 15.3093 1.65541 14.0868 3.6265ZM15.6348 6.20504L18.5372 11.0425L20.7204 14.5355C21.18 15.2711 21.9863 15.7179 22.8537 15.7179C23.6716 15.7179 24.2372 15.492 24.61 15.1007C24.9912 14.7005 25.3695 13.919 25.3695 12.3995C25.3695 11.624 25.0315 10.2025 24.5875 8.73075C24.1618 7.31936 23.6991 6.05171 23.5588 5.6741C23.5341 5.60755 23.5142 5.55772 23.4952 5.51499C22.8455 4.05402 21.3947 3.10787 19.7895 3.10787C18.3648 3.10787 17.0446 3.85538 16.3116 5.07705L15.6348 6.20504Z"
                      fill="#E0D9C7"
                    />
                  </svg>
                </AnimatedConicButton>
              </Link>

              {/* LinkedIn */}
              <Link href="https://www.linkedin.com/company/vitu-realty/" target="_blank" rel="noopener noreferrer">
                <AnimatedConicButton
                  buttonBase="conic-button-base1"
                  theme="custom"
                  className="w-16 h-16 flex items-center justify-center rounded-full border border-[#F3EAE1] text-[#f3eae1] hover:text-[#1a0f0a] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3.12166 18.3164H1.54632C0.966281 18.3164 0.496094 17.8462 0.496094 17.2662V7.49905C0.496094 6.91901 0.966281 6.44883 1.54632 6.44883H3.12166C3.70165 6.44883 4.17189 6.91901 4.17189 7.49905V17.2662C4.17189 17.8462 3.70165 18.3164 3.12166 18.3164Z"
                      fill="#E0D9C7"
                    />
                    <path
                      d="M2.38824 4.82812C1.19591 4.82812 0.234375 3.8636 0.234375 2.675C0.234375 1.48672 1.19591 0.522189 2.38824 0.522189C3.57583 0.522189 4.54 1.48672 4.54 2.675C4.54 3.8636 3.57583 4.82812 2.38824 4.82812Z"
                      fill="#E0D9C7"
                    />
                    <path
                      d="M16.8816 18.3164H15.3588C14.7788 18.3164 14.3086 17.8462 14.3086 17.2662V12.5222C14.3086 11.1506 14.2475 9.38595 12.3608 9.38595C10.4479 9.38595 10.0552 10.8809 10.0552 12.424V17.2662C10.0552 17.8462 9.58496 18.3164 9.00492 18.3164H7.5346C6.95456 18.3164 6.48438 17.8462 6.48438 17.2662V7.49905C6.48438 6.91901 6.95456 6.44883 7.5346 6.44883H9.00492C9.58496 6.44883 10.0552 6.91901 10.0552 7.49905V8.06308H10.0586C10.5487 7.13321 11.7489 6.23878 13.5374 6.23878C17.259 6.23878 17.9319 8.60169 17.9319 11.7873V17.2662C17.9319 17.8462 17.4617 18.3164 16.8816 18.3164Z"
                      fill="#E0D9C7"
                    />
                  </svg>
                </AnimatedConicButton>
              </Link>

              {/* YouTube */}
              <Link href="https://www.youtube.com/@viturealty/featured" target="_blank" rel="noopener noreferrer">
                <AnimatedConicButton
                  buttonBase="conic-button-base1"
                  theme="custom"
                  className="w-16 h-16 flex items-center justify-center rounded-full border border-[#F3EAE1] text-[#f3eae1] hover:text-[#1a0f0a] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M26.4612 11.4151C26.4612 13.4888 26.2773 15.3786 26.0675 16.8605C25.7949 18.7853 24.24 20.2716 22.3053 20.461C20.2524 20.662 17.352 20.8672 14.0685 20.8672C10.785 20.8672 7.88452 20.662 5.83169 20.461C3.89691 20.2716 2.34205 18.7853 2.06946 16.8605C1.85962 15.3786 1.67578 13.4888 1.67578 11.4151C1.67578 9.34146 1.85962 7.45162 2.06946 5.9698C2.34205 4.045 3.89691 2.55866 5.83169 2.36925C7.88452 2.16829 10.785 1.96308 14.0685 1.96308C17.352 1.96308 20.2524 2.16829 22.3053 2.36925C24.24 2.55866 25.7949 4.045 26.0675 5.9698C26.2773 7.45162 26.4612 9.34146 26.4612 11.4151Z"
                      stroke="#E0D9C7"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5182 15.1145L17.5045 12.7428C18.5258 12.1353 18.5258 10.6677 17.5045 10.0601L13.5182 7.68846C12.4667 7.06289 11.1289 7.81396 11.1289 9.02981V13.7732C11.1289 14.989 12.4667 15.7401 13.5182 15.1145Z"
                      stroke="#E0D9C7"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </AnimatedConicButton>
              </Link>
            </div>
          </div>

          {/* Right section */}
        </div>
        <div className="flex flex-col items-center lg:flex-row  lg:justify-between text-lg font-FreightNeoProLight text-[#E0D9C7] mt-24">
          <a href="mailto:info@viturealty.com" className="flex items-center gap-2">
            <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.2669 0.873203H2.10025C1.32106 0.873203 0.683594 1.51071 0.683594 2.28986V11.9233C0.683594 12.7025 1.32106 13.3398 2.10025 13.3398H16.267C17.0461 13.3398 17.6836 12.7025 17.6836 11.9233V2.28986C17.6836 1.51071 17.0461 0.873203 16.2669 0.873203Z"
                stroke="#C7784D"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.6836 2.57626L10.3624 7.4571C9.71402 7.8893 8.65317 7.8893 8.00494 7.4571L0.683594 2.57626"
                stroke="#C7784D"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>{" "}
            INFO@VITUREALTY.COM
          </a>
          <div className="hidden md:flex justify-center ml-5 lg:ml-0">
<p className="flex justify-center md:items-center items-start  gap-2 ">
              <svg className="lg:w-5 w-8 h-8 lg:h-5" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.25781 8.90234L16.2912 0.869" stroke="#C7784D" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M8.25572 8.90053C8.25572 8.90053 3.74334 7.61128 1.94941 7.09872C1.52153 6.97647 1.22656 6.58544 1.22656 6.14041V6.14016C1.22656 5.6925 1.52019 5.29784 1.949 5.16922C4.95159 4.26844 16.2891 0.867188 16.2891 0.867188C16.2891 0.867188 12.8878 12.2047 11.987 15.2073C11.8584 15.6361 11.4638 15.9297 11.0161 15.9297H11.0158C10.5708 15.9297 10.1798 15.6347 10.0575 15.2068C9.54497 13.4129 8.25572 8.90053 8.25572 8.90053Z"
                  stroke="#C7784D"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              VAIKUNTAM CITY ELITE, BEHIND NITK CAMPUS,  SURATHKAL, MANGALORE
            </p>
          </div>


           <div className="flex flex-col md:hidden justify-center  lg:ml-0">
  <p className="flex items-center text-center gap-2">
    <svg className="w-5 h-5" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.25781 8.90234L16.2912 0.869" stroke="#C7784D" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8.25572 8.90053C8.25572 8.90053 3.74334 7.61128 1.94941 7.09872C1.52153 6.97647 1.22656 6.58544 1.22656 6.14041V6.14016C1.22656 5.6925 1.52019 5.29784 1.949 5.16922C4.95159 4.26844 16.2891 0.867188 16.2891 0.867188C16.2891 0.867188 12.8878 12.2047 11.987 15.2073C11.8584 15.6361 11.4638 15.9297 11.0161 15.9297H11.0158C10.5708 15.9297 10.1798 15.6347 10.0575 15.2068C9.54497 13.4129 8.25572 8.90053 8.25572 8.90053Z"
        stroke="#C7784D"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span>
      VAIKUNTAM CITY ELITE,
      BEHIND NITK <br/> CAMPUS, SURATHKAL, MANGALORE
    </span>
  </p>
</div>

          <a
            href="tel:+918904688886"
            className="flex items-center  opacity-[85%] lg:opacity-[100%] text-[#E0D9C7] font-CandideCondensedNormal font-[300]  gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.43612 12.2776C1.74897 8.587 -0.15831 4.52612 1.28303 3.08343L3.31074 1.05383C3.51258 0.851847 3.84177 0.851847 4.04361 1.05383L7.07293 4.08598C7.27476 4.288 7.27476 4.61755 7.07293 4.81953L5.77813 6.11553C5.37446 6.51958 5.37446 7.17867 5.77813 7.58268L10.1266 11.9352C10.5303 12.3393 11.1887 12.3393 11.5925 11.9352L12.8872 10.6392C13.089 10.4372 13.4183 10.4372 13.6201 10.6392L16.6494 13.6714C16.8512 13.8734 16.8512 14.203 16.6494 14.4049L14.6217 16.4345C13.217 17.8406 9.12327 15.9682 5.43612 12.2776Z"
                stroke="#C7784D"
                strokeMiterlimit="22.926"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            +91 89046 88886
          </a>
        </div>
        {/* Divider */}
        <div className="border-t border-[#f3eae1]/20 my-5" />

        {/* Bottom text */}
        <div className="flex flex-col font-hankenGrotesk text-[12px] text-[#E0D9C799]  font-medium lg:flex-row justify-between text-center lg:text-start text-xs  space-y-4 lg:space-y-0">
          <p>© 2025 Vitu Realty | All rights reserved</p>
          <p>
            Designed and Maintained by{" "}
            <a href="https://megamind.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#f3eae1]">
              Megamind Advertising Private Limited
            </a>
          </p>
          <div className="flex gap-3 justify-center lg:justify-normal">
            <a href="#" className="hover:text-[#f3eae1]">
              Legal Disclaimers
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#f3eae1]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BorderDotButton({ button }: { button?: any }) {
  const dotRef = useRef<SVGRectElement | null>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    if (dotRef.current) {
      const length = dotRef.current.getTotalLength ? dotRef.current.getTotalLength() : 600;

      // Initially hide the colored stroke
      gsap.set(dotRef.current, { strokeDasharray: "40 600", strokeDashoffset: 600, opacity: 0 });

      // Create a repeating timeline but paused by default
      const tl = gsap.timeline({ repeat: -1, paused: true });
      tl.to(dotRef.current, {
        strokeDashoffset: -600,
        duration: 10,
        ease: "linear",
      });

      tlRef.current = tl;

      // Hover handlers
      const btn = dotRef.current.closest("button");
      if (btn) {
        btn.addEventListener("mouseenter", () => {
          gsap.to(dotRef.current, { opacity: 1, duration: 0.2 });
          // Restart timeline if it was paused
          tlRef.current?.restart();
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
          // Pause the timeline when not hovering
          tlRef.current?.pause();
        });
      }
    }
  }, []);

  return (
    <motion.button className="relative px-6 py-3 text-white bg-red-400 font-semibold rounded-lg overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Static White Border */}
        <rect x="1" y="1" width="198" height="58" rx="12" stroke="white" strokeWidth="2" />

        {/* Colored Dot Animation */}
        <rect ref={dotRef} x="1" y="1" width="198" height="58" rx="12" stroke="#C7784D" strokeWidth="3" />
      </svg>
    </motion.button>
  );
}
