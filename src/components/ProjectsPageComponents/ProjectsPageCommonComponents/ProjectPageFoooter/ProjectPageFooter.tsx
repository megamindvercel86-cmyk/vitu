"use client";
import Image from "next/image";
import React, { FC, JSX, useRef } from "react";
import logo from "../../../../../public/images/logos/vaikuntamCityFooter.svg";
import logo2 from "../../../../../public/images/logos/projectfooter.svg";
import { Link } from "react-scroll";

import { Instgram, LinkedIn, Mail, Meta, Phone, Share, Share1, Youtube } from "@/components/Icons/Icons";
import SubHeading from "@/components/Common/SubHeding";
import NavLink from "@/components/Common/NavLink";
import FooterLink from "@/components/Common/FooterLinks";
import { RiArrowRightSLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoMdHome } from "react-icons/io";

/**
 * Footer Component
 * - Displays company logo & tagline
 * - Quick links (collapsible on mobile)
 * - Resources section (collapsible on mobile)
 * - Contact information & newsletter
 * - Copyright and legal links
 */

const ProjectFooter: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [mainPage, subPage] = pathname.split("/").filter(Boolean);

  // SVG Arrow for collapsible sections in mobile view
  // const DropdownArrow: FC = () => (
  //   <svg className="w-5 h-5 text-footerTextColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  //   </svg>
  // );

  // const email = useRef<HTMLInputElement>(null);
  // console.log(email);

  // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (email.current) {
  //     const emailValue = email.current.value;
  //     console.log(emailValue);

  //     const collectionRef = collection(db, "newsLetter");
  //     await addDoc(collectionRef, { email: emailValue });

  //     // await fetch("/api/sendEmail", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify(emailValue),
  //     // });
  //     toast.success("Thank You For The Newsletter SignUp");

  //     email.current.value = "";
  //   }
  // };

  return (
    <footer className="bg-black text-white pt-8 lg:pt-16 w-full">
      <div className="px-6 lg:px-20 xl:px-40">
        <div className="flex items-center  space-x-2 pb-3">
          <FooterLink href="/">
            <IoMdHome className="text-footerTextColor mb-[3px]  text-lg" />
          </FooterLink>
          <FooterLink href="/">Home</FooterLink>
          {mainPage && (
            <>
              <RiArrowRightSLine />
              <span className="text-footerTextColor">
                {!subPage ? (
                  <span className="font-FreightNeoProLight font-light text-base 2xl:text-2xl">
                    {mainPage.charAt(0).toLocaleUpperCase() + mainPage.slice(1)}
                  </span>
                ) : (
                  // <button onClick={() => router.back()}>{mainPage}</button>
                  <FooterLink href={`/${mainPage}`}>{mainPage.charAt(0).toLocaleUpperCase() + mainPage.slice(1)}</FooterLink>
                )}
              </span>
            </>
          )}
          {subPage && (
            <>
              <RiArrowRightSLine />
              <span className="text-footerTextColor font-FreightNeoProLight font-light text-base 2xl:text-2xl">
                {subPage.charAt(0).toLocaleUpperCase() + subPage.slice(1)}
              </span>
            </>
          )}
        </div>
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Section 1: Company Branding */}
          <div className="flex flex-col  items-center lg:items-start">
            <FooterLink href="/">
              <Image src={logo} alt="Logo" width={225} height={72} className="w-36 md:w-56 lg:w-[224px] h-auto" />
            </FooterLink>
            <p className="text-footerTextColor font-freightNeoMedium text-lg md:text-2xl mt-4 text-center lg:text-left">
              Premium Plotted Development
            </p>
            {/* Recognition - Desktop only */}
            <div className="mt-8 hidden text-3xl lg:block">
              <button className="font-FreightNeoProBold text-black text-[22px] bg-[#EADFD1] py-2 px-4 rounded-[56px] "> Get the Best Quote</button>
              <ul className="flex gap-2 pt-[170px] justify-center md:justify-start" aria-label="Social Media Links">
                <li>
                  <NavLink href="https://www.instagram.com/vitu.realty" target={true} ariaLabel="Visit our Instagram">
                    <Instgram aria-hidden="true" />
                  </NavLink>
                </li>

                <li>
                  <NavLink href="https://www.facebook.com/p/VITU-Realty-61557046860214/" target={true} ariaLabel="Visit our Facebook">
                    <Meta aria-hidden="true" />
                  </NavLink>
                </li>

                <li>
                  <NavLink href="https://www.linkedin.com/company/vitu-realty/" target={true} ariaLabel="Visit our LinkedIn">
                    <LinkedIn aria-hidden="true" />
                  </NavLink>
                </li>

                <li>
                  <NavLink href="https://www.youtube.com/@viturealty/featured" target={true} ariaLabel="Visit our YouTube">
                    <Youtube aria-hidden="true" />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}

          {/* Resources */}
          <div className="hidden lg:block">
            <FooterSection
              links={[
                { href: "sustainability", label: "Sustainability" },
                { href: "carousal", label: "Amenities" },
                { href: "location", label: "Location" },
                { href: "plots", label: "Plots" },
              ]}
            />
          </div>

          {/* Contact Information */}
          <div>
            <ul className="space-y-4 text-gray-300 hidden lg:block ">
              <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">Discover Excellence</SubHeading>

              <FooterContactItem
                icon={<Share1 />}
                text="Laxman Commercial Complex, Golikatta Bazar, Bunder, Mangalore - 575001"
                link="https://maps.app.goo.gl/pjwhDAAxb7p4qqCQ7"
              />
              {/* Social Media Links */}
              <SubHeading className="text-lg lg:pt-10 md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">For Enquiries</SubHeading>
              <FooterContactItem icon={<Phone />} text="+91 89046 88886" link="tel:+91 89046 88886" />
              <FooterContactItem icon={<Mail />} text="info@viturealty.com" link="mailto:info@viturealty.com" />
              {/* Social Media Links */}
            </ul>
            <SubHeading className="text-lg text-center md:text-start md:text-xl text-footerTextColor lg:hidden font-freightNeoSemibold mb-4">
              Get in Touch
            </SubHeading>
            <ul className="space-y-4 text-gray-300 lg:hidden">
              <FooterContactItem
                icon={<Share />}
                text="Laxman Commercial Complex, Golikatta Bazar, Bunder, Mangalore - 575001"
                link="https://maps.app.goo.gl/pjwhDAAxb7p4qqCQ7"
              />
              <FooterContactItem icon={<Phone />} text="+91 89046 88886" link="tel:+91 89046 88886" />
              <FooterContactItem icon={<Mail />} text="info@viturealty.com" link="mailto:info@viturealty.com" />
              {/* Social Media Links */}
            </ul>
            <div className="pt-16 w-[100%]  cursor-pointer relative">
              {/* <div className="flex items-center relative border-b-[1px] border-b-[#EADFD1CC]">
                  <input
                  type="email"
                  ref={email}
                  className="lg:text-[13px] lg2:text-[20px] pb-2 flex-1 outline-none placeholder-[#EADFD1CC] bg-transparent font-FreightNeoProNormal text-[#EADFD1CC]"
                  placeholder="Sign Up for Our Newsletter"
                  />
                  <button type="submit">
                  <BsArrowRight className="text-[#EADFD1CC] lg:text-xl lg2:2xl: absolute right-0 lg:bottom-4 lg2:bottom-5 transform translate-y-1/2" />
                  </button>
                </div> */}
              <div className="flex justify-center md:justify-start lg:justify-end   pb-4 text-footerTextColor">
                <h1 className="font-FreightNeoProNormal   text-[16px]">Porject By</h1>
              </div>
              <div className="flex justify-center md:justify-start  lg:justify-end">
                <FooterLink href="/">
                  <Image alt="logo" src={logo2} />
                </FooterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <FooterBottom />
    </footer>
  );
};
const DropdownArrow = () => (
  <svg className="w-5 h-5 text-footerTextColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
/**
 * FooterSection Component
 * - Handles quick links and resource sections with collapsible mobile support
 */
const FooterSection: FC<{
  title?: string;
  links: { href: string; label: string }[];
}> = ({ title, links }) => (
  <div>
    {/* Mobile View */}
    <details className="lg:hidden border-b border-gray-700 pb-2">
      <summary className="flex items-center justify-between text-lg text-[#EADFD1] font-freightNeoSemibold cursor-pointer">
        {title}
        <DropdownArrow />
      </summary>
      <ul className="space-y-4 mt-4 text-[#EADFD1] ">
        {links.map((link) => (
          <li key={link.href} className="cursor-pointer">
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </details>

    {/* Desktop View */}
    <div className="hidden lg:block">
      <SubHeading className="text-xl md:text-xl text-[#EADFD1]  font-freightNeoSemibold mb-4">{title}</SubHeading>
      <ul className="space-y-4 text-[#EADFD1] font-freightNeoSemibold">
        {links.map((link) => (
          <li key={link.href} className="cursor-pointer">
            <Link to={link.href} duration={700} smooth={true}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/**
 * FooterContactItem Component
 * - Renders contact details with icons
 */
const FooterContactItem: FC<{ icon: JSX.Element; text: string; link: string }> = ({ icon, text, link }) => {
  // Check if the text contains the phone number or pincode and apply the custom font
  const isPhoneNumber = text.includes("+91 89046 88886");
  const isPincode = text.includes("575001");
  const email = text.includes("info@viturealty.com");

  return (
    <li
      className={`flex md:flex-row flex-col text-footerTextColor  align-middle ${isPincode && "lg:items-start 2xl:item"} items-center  md:gap-0 gap-3 `}
    >
      {icon}
      <FooterLink href={link} target="_blank" className="pl-4 lg:pe-14 text-center lg:text-left">
        {isPhoneNumber || isPincode || email ? <span className={`font-CandideCondensedNormal`}>{text}</span> : "fdtext"}
      </FooterLink>
    </li>
  );
};

/**
 * FooterBottom Component
 * - Displays legal information & copyright
 */
const FooterBottom: FC = () => (
  <div className="mt-8 border-t border-gray-800 px-6 lg:px-20 xl:px-40 py-4">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-[#FFFFFF66] text-xs text-center 2xl:text-xl md:text-left">
        © <span className="font-CandideCondensedNormal">2025</span> <span className="font-freightNeoMedium">Vitu Realty | All rights reserved.</span>
      </p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a
          href="/terms-of-service"
          className="text-[#FFFFFF66] text-xs font-freightNeoMedium"
          aria-label="Read the legal disclaimer section of our terms of service"
        >
          Legal Disclaimer
        </a>
        <span className="text-[#FFFFFF66] text-xs" aria-hidden="true">
          |
        </span>
        <a href="/terms-of-service" className="text-[#FFFFFF66] text-xs font-freightNeoMedium" aria-label="Read the full terms of service">
          Terms of Service
        </a>
      </div>
    </div>
  </div>
);

export default ProjectFooter;
