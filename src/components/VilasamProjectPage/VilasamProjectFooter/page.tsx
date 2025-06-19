"use client";
import Image from "next/image";
import React, { FC, JSX, useState } from "react";
import logo2 from "../../../../public/images/logos/projectfooter.svg";
import logo from "../../../../public/images/logos/vilasamWhiteLogo.svg";
import { Link } from "react-scroll";
import { Instgram, LinkedIn, Mail, MailVilasam, Meta, Phone, PhoneVilasam, Share, Share1, ShareVilasam, Youtube } from "@/components/Icons/Icons";
import SubHeading from "@/components/Common/SubHeding";
import NavLink from "@/components/Common/NavLink";
import FooterLink from "@/components/Common/FooterLinks";
import { RiArrowRightSLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoMdHome } from "react-icons/io";
import ContactFormModal from "@/components/Common/FormModal/FormModal";

/**
 * Footer Component
 * - Displays company logo & tagline
 * - Quick links (collapsible on mobile)
 * - Resources section (collapsible on mobile)
 * - Contact information & newsletter
 * - Copyright and legal links
 */

const VilasamProjectFooter: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [mainPage, subPage] = pathname.split("/").filter(Boolean);

  // SVG Arrow for collapsible sections in mobile view
  // const DropdownArrow: FC = () => (
  //   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <footer className="bg-black text-white pt-8 lg:pt-12 w-full">
      <div className="px-6 lg:px-20 xl:px-40">
        <div className="flex items-center   space-x-2 pb-6 lg:pb-8">
          <FooterLink aria-label={`${mainPage} page`} href="/">
            <IoMdHome className="mb-[3px] text-white  text-lg" />
          </FooterLink>
          <FooterLink aria-label={`${mainPage} page`} className="text-white" href="/">
            Home
          </FooterLink>
          {mainPage && (
            <>
              <RiArrowRightSLine />
              <span className="text-white">
                {!subPage ? (
                  <span className="font-FreightNeoProLight font-light text-base 2xl:text-2xl">
                    {mainPage.charAt(0).toLocaleUpperCase() + mainPage.slice(1)}
                  </span>
                ) : (
                  // <button onClick={() => router.back()}>{mainPage}</button>
                  <FooterLink aria-label={`${mainPage} page`} href={`/${mainPage}`}>
                    {mainPage.charAt(0).toLocaleUpperCase() + mainPage.slice(1)}
                  </FooterLink>
                )}
              </span>
            </>
          )}
          {subPage && (
            <>
              <RiArrowRightSLine />
              <span className="text-white font-FreightNeoProLight font-light text-base 2xl:text-2xl">
                {subPage.charAt(0).toLocaleUpperCase() + subPage.slice(1)}
              </span>
            </>
          )}
        </div>
        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Section 1: Company Branding */}
          <div className="flex flex-col  items-center lg:items-start">
            <FooterLink aria-label={`${mainPage} page`} href="/">
              <Image src={logo} alt="Logo" width={225} height={72} className="w-36 md:w-56 lg:w-[224px] h-auto" />
            </FooterLink>
            <p className="text-[#cdcdcd] font-freightNeoMedium text-lg md:text-2xl mt-4 text-center lg:text-left">Homes that Breathe with you</p>
            {/* Recognition - Desktop only */}
            <div className="mt-8 hidden text-3xl lg:block">
              <button
                onClick={() => setShowModal(true)}
                aria-label="Download"
                className="font-FreightNeoProBold text-black text-[22px] bg-[#98D1D0] py-2 px-4 rounded-[56px] "
              >
                Download E-Brochure
              </button>
              <ul className="flex gap-2 pt-[170px] justify-center md:justify-start" aria-label="Social Media Links">
                <li>
                  <NavLink href="https://www.instagram.com/vitu.realty" target={true} ariaLabel="Visit our Instagram">
                    <Instgram color="#cdcdcd" aria-hidden="true" />
                  </NavLink>
                </li>

                <li>
                  <NavLink href="https://www.facebook.com/p/VITU-Realty-61557046860214/" target={true} ariaLabel="Visit our Facebook">
                    <Meta color="#cdcdcd" aria-hidden="true" />
                  </NavLink>
                </li>

                <li>
                  <NavLink href="https://www.linkedin.com/company/vitu-realty/" target={true} ariaLabel="Visit our LinkedIn">
                    <LinkedIn color="#cdcdcd" aria-hidden="true" />
                  </NavLink>
                </li>

                <li>
                  <NavLink href="https://www.youtube.com/@viturealty/featured" target={true} ariaLabel="Visit our YouTube">
                    <Youtube color="#cdcdcd" aria-hidden="true" />
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
            <ul className="space-y-4 text-gray-300 hidden lg:block">
              <li>
                <SubHeading className="text-lg md:text-xl text-white font-sourceSans3 mb-4">Discover Excellence</SubHeading>
              </li>
              <li>
                <FooterContactItem
                  icon={<ShareVilasam />}
                  text="Laxman Commercial Complex, Golikatta Bazar, Bunder, Mangalore - 575001"
                  link="https://maps.app.goo.gl/pjwhDAAxb7p4qqCQ7"
                />
              </li>
              <li>
                <SubHeading className="text-lg lg:pt-10 md:text-xl text-white font-sourceSans3 mb-4">For Enquiries</SubHeading>
              </li>
              <li>
                <FooterContactItem icon={<PhoneVilasam />} text="+91 89046 88886" link="tel:+91 89046 88886" />
              </li>
              <li>
                <FooterContactItem icon={<MailVilasam />} text="info@viturealty.com" link="mailto:info@viturealty.com" />
              </li>
            </ul>
            <SubHeading className="text-lg text-center md:text-start md:text-xl text-white lg:hidden font-sourceSans3 mb-4">Get in Touch</SubHeading>
            <ul className="space-y-4 text-gray-300 lg:hidden">
              <li>
                <FooterContactItem
                  name="Location"
                  icon={<ShareVilasam />}
                  text="Laxman Commercial Complex, Golikatta Bazar, Bunder, Mangalore - 575001"
                  link="https://maps.app.goo.gl/pjwhDAAxb7p4qqCQ7"
                />
              </li>
              <li>
                <FooterContactItem icon={<PhoneVilasam />} name="Phone" text="+91 89046 88886" link="tel:+91 89046 88886" />
              </li>
              <li>
                <FooterContactItem icon={<MailVilasam />} name="Mail" text="info@viturealty.com" link="mailto:info@viturealty.com" />
              </li>
              <li className="flex gap-2 justify-center md:hidden">
                <NavLink href="https://www.instagram.com/vitu.realty" target={true} ariaLabel="Visit our Instagram">
                  <Instgram color="#cdcdcd" aria-hidden="true" />
                </NavLink>
                <NavLink href="https://www.facebook.com/p/VITU-Realty-61557046860214/" target={true} ariaLabel="Visit our Facebook">
                  <Meta color="#cdcdcd" aria-hidden="true" />
                </NavLink>
                <NavLink href="https://www.linkedin.com/company/vitu-realty/" target={true} ariaLabel="Visit our LinkedIn">
                  <LinkedIn color="#cdcdcd" aria-hidden="true" />
                </NavLink>
                <NavLink href="https://www.youtube.com/@viturealty/featured" target={true} ariaLabel="Visit our YouTube">
                  <Youtube color="#cdcdcd" aria-hidden="true" />
                </NavLink>
              </li>
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
              <div className="flex justify-center md:justify-start lg:justify-end   pb-4 text-white">
                <h1 className="font-FreightNeoProNormal text-[#808080]   text-[16px]">Porject By</h1>
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
      <ContactFormModal isOpen={showModal} onClose={setShowModal} />
    </footer>
  );
};
const DropdownArrow = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <summary className="flex items-center justify-between text-lg text-white font-sourceSans3 cursor-pointer">
        {title}
        <DropdownArrow />
      </summary>
      <ul className="space-y-4 mt-4 text-white ">
        {links.map((link) => (
          <li key={link.href} className="cursor-pointer">
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </details>

    {/* Desktop View */}
    <div className="hidden lg:block">
      <SubHeading className="text-xl md:text-xl text-white  font-sourceSans3 mb-4">{title}</SubHeading>
      <ul className="space-y-4  font-sourceSans3">
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
const FooterContactItem: FC<{ icon: JSX.Element; text: string; link: string; name?: string }> = ({ icon, text, link, name }) => {
  const isPhoneNumber = text.includes("+91 89046 88886");
  const isPincode = text.includes("575001");
  const email = text.includes("info@viturealty.com");

  return (
    <>
      <div
        className={`text-white flex lg:hidden  flex-col items-center md:flex-row justify-center align-middle gap-3 md:gap-0 ${isPincode ? "lg:items-start" : ""}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="lg:hidden text-white/80 text-[14px] font-freightNeoSemibold">{name}</span>
        </div>
        <FooterLink href={link} target="_blank" className="pl-4 lg:pe-14 text-white/80 text-center lg:text-left">
          {isPhoneNumber || isPincode || email ? <span className="font-CandideCondensedNormal">{text}</span> : text}
        </FooterLink>
      </div>
      <div className={`text-white hidden lg:flex  flex-col md:flex-row align-middle gap-3 md:gap-0 ${isPincode ? "lg:items-start" : ""}`}>
        <div className="flex items-center gap-3">
          {icon}
          <span className="lg:hidden text-white/80 text-[14px] font-freightNeoSemibold">{name}</span>
        </div>
        <FooterLink href={link} target="_blank" className="pl-4 lg:pe-14 text-white/80 text-center lg:text-left">
          {isPhoneNumber || isPincode || email ? <span className="font-CandideCondensedNormal">{text}</span> : text}
        </FooterLink>
      </div>
    </>
  );
};

/**
 * FooterBottom Component
 * - Displays legal information & copyright
 */
const FooterBottom: FC = () => (
  <div className="mt-8 border-t border-gray-800 px-6 lg:px-20 xl:px-40 py-4">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-[#808080] text-xs text-center 2xl:text-xl md:text-left">
        © <span className="font-CandideCondensedNormal">2025</span> <span className="font-freightNeoMedium">VITU Realty | All rights reserved.</span>
      </p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="/terms-of-service" className="text-[#808080] text-xs font-freightNeoMedium" aria-label="Read the legal disclaimer">
          Legal Disclaimer
        </a>
        <span className="text-[#808080] text-xs" aria-hidden="true">
          |
        </span>
        <a href="/terms-of-service" className="text-[#808080] text-xs font-freightNeoMedium" aria-label="View the terms of service">
          Terms of Service
        </a>
      </div>
    </div>
  </div>
);

export default VilasamProjectFooter;
