import Image from "next/image";
import React, { FC, JSX, useRef, useState } from "react";
import logo from "../../../public/images/logos/logolight.svg";
import chieverslog from "../../../public/images/logos/chieverslog.svg";
import SubHeading from "../Common/SubHeding";
import NavLink from "../Common/NavLink";
import FooterLink from "../Common/FooterLinks";
import { Instgram, LinkedIn, Mail, Meta, Phone, Share, Youtube } from "../Icons/Icons";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { RiArrowRightSLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { IoMdHome } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Footer Component
 * - Displays company logo & tagline
 * - Quick links (collapsible on mobile)
 * - Resources section (collapsible on mobile)
 * - Contact information & newsletter
 * - Copyright and legal links
 */

const Footer: FC = () => {
  const [quickIsOpen, setQuickIsOpen] = useState<boolean>(false);
  const [resourcesIsOpen, setResourcesIsOpen] = useState<boolean>(false);
  const [projectIsOpen, setProjectIsOpenIsOpen] = useState<boolean>(false);


  const pathname = usePathname();

  const [mainPage, subPage] = pathname.split("/").filter(Boolean);

  const [email, setEmail] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      try {
        const emailValue = email.trim();
        const collectionRef = collection(db, "newsLetter");
        await addDoc(collectionRef, { email: emailValue });

        toast.success(
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Icon Wrapper */}
            <div style={{ width: "40px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image fill src="/image.png" alt="Success" style={{ width: "40px", height: "24px" }} />
            </div>
      
            {/* Text Content */}
            <div>
              <h2 className="font-freightNeoSemibold text-2xl text-customBrown ">Woo-Hoo</h2>
              <p className="font-CandideCondensedNormal" style={{ margin: 0, fontSize: "14px", color: "#4F373799" }}>You have Successfully Signed Up to our Newsletter</p>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: false,
            progress: undefined,
            style: {
              background: "#f0fdf4",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
            },
          }
        );

        setEmail("");
      } catch (error) {
        toast.error(
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Icon Wrapper */}
            <div style={{ width: "40px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image fill src="/error.png" alt="Success" style={{ width: "40px", height: "24px" }} />
            </div>
      
            {/* Text Content */}
            <div>
              <h2 className="font-freightNeoSemibold text-2xl text-customBrown ">Uh oh.</h2>
              <p className="font-CandideCondensedNormal" style={{ margin: 0, fontSize: "14px", color: "#4F373799" }}>Something went wrong. 
              Give it a Minute and Try Again</p>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: false,
            progress: undefined,
            style: {
              background: "#FFF3F3",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
            },
          }
        );
      }
    }
  };

  return (
    <footer className="bg-black text-white pt-8 lg:pt-10  w-full">
      <div className="px-6 lg:px-20 xl:px-40">
        <div className="flex items-center space-x-2 pb-8">
          <FooterLink href="/">
            <IoMdHome className="text-footerTextColor mb-[8px] lg:mb-0 xl:mb-0 text-lg" />
          </FooterLink>
          <FooterLink className="!text-lg" href="/">Home</FooterLink>
          {mainPage && (
            <>
              <RiArrowRightSLine className="text-lg mb-[3px] lg:mb-0" />
              <span className="text-footerTextColor">
          {!subPage ? (
            <span className="font-FreightNeoProLight font-light text-lg 2xl:text-2xl">
              {mainPage.charAt(0).toLocaleUpperCase() + mainPage.slice(1)}
            </span>
          ) : (
            <FooterLink className="!text-lg" href={`/${mainPage}`}>
              {mainPage.charAt(0).toLocaleUpperCase() + mainPage.slice(1)}
            </FooterLink>
          )}
              </span>
            </>
          )}
          {subPage && (
            <>
              <RiArrowRightSLine className="text-lg mb-[3px] lg:mb-0" />
              <span className="text-footerTextColor font-FreightNeoProLight font-light text-lg 2xl:text-2xl">
          {subPage.charAt(0).toLocaleUpperCase() + subPage.slice(1)}
              </span>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Section 1: Company Branding */}
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/">
              <Image src={logo} alt="Logo" width={225} height={72} className="w-36 md:w-56 lg:w-[224px] h-auto" />
            </Link>
            <p className="text-footerTextColor font-freightNeoMedium text-lg md:text-2xl mt-4 text-center lg:text-left">
              Building Wholesome <br /> Living Spaces
            </p>
            {/* Recognition - Desktop only */}
            <div className="mt-8 hidden text-3xl lg:block">
              <FooterLink href="#">Recognized by</FooterLink>
              <Link href="https://www.daijiworld.com/news/newsDisplay?newsID=1245174" target="_blank">
                {" "}
                <Image src={chieverslog} alt="chieverslog" width={148} height={82} className="mt-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection
            isOpen={quickIsOpen}
            title="Quick Links"
            links={[
              { href: "/about", label: "About Us" },
              { href: "/career-application", label: "Careers" },
            ]}
            setQuickIsOpen={setQuickIsOpen}
          />

          {/* Resources */}

          <FooterSection
            isOpen={resourcesIsOpen}
            title="Resources"
            links={[
              { href: "/resources/media-kit", label: "Media" },
              { href: "/insights", label: "Insights" },
            ]}
            setQuickIsOpen={setResourcesIsOpen}
          />
           <FooterSection
            isOpen={projectIsOpen}
            title="Projects"
            links={[
              { href: "/vaikuntamcity", label: "Vaikuntamcity" },
              { href: "/mithila", label: "Mithila" },
              { href: "/vilasam", label: "Vilasam" },
            ]}
            setQuickIsOpen={setProjectIsOpenIsOpen}
          />

          {/* Contact Information */}
          <div>
            <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">Get in Touch</SubHeading>
            <ul className="space-y-4 text-gray-300">
              <FooterContactItem
                icon={<Share />}
                text="Laxman Commercial Complex, Golikatta Bazar, Bunder, Mangalore - 575001"
                link="https://maps.app.goo.gl/pjwhDAAxb7p4qqCQ7"
              />
              <FooterContactItem icon={<Phone />} text="+91 89046 88886" link="tel:+91 89046 88886" />
              <FooterContactItem icon={<Mail />} text="info@viturealty.com" link="mailto:info@viturealty.com" />
              {/* Social Media Links */}
              <li className="flex gap-2 justify-center md:justify-start">
                <NavLink href="https://www.instagram.com/vitu.realty" target={true} ariaLabel="Visit our Instagram">
                  <Instgram aria-hidden="true" />
                </NavLink>

                <NavLink href="https://www.facebook.com/p/VITU-Realty-61557046860214/" target={true} ariaLabel="Visit our Facebook">
                  <Meta aria-hidden="true" />
                </NavLink>

                <NavLink href="https://www.linkedin.com/company/vitu-realty/" target={true} ariaLabel="Visit our LinkedIn">
                  <LinkedIn aria-hidden="true" />
                </NavLink>

                <NavLink href="https://www.youtube.com/@viturealty/featured" target={true} ariaLabel="Visit our YouTube">
                  <Youtube aria-hidden="true" />
                </NavLink>
              </li>
            </ul>
            <form onSubmit={submitHandler}>
              <div className="pt-16 w-[100%] hidden md:hidden lg:block cursor-pointer relative">
                <div className="flex items-center relative border-b-[1px] border-b-[#EADFD1CC]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="lg:text-[13px] lg2:text-[18px] pb-2 flex-1 outline-none placeholder-[#EADFD1CC] bg-transparent font-FreightNeoProNormal text-[#EADFD1CC]"
                    placeholder="Sign Up for Our Newsletter"
                  />
                  <button type="submit">
                    <BsArrowRight className="text-[#EADFD1CC] lg:text-xl lg2:2xl: absolute right-0 lg:bottom-4 lg2:bottom-5 transform translate-y-1/2" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <FooterBottom />
    </footer>
  );
};

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    className="inline-block ml-2 w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    initial={false} // Prevents animation on mount
    animate={{ rotate: isOpen ? 180 : 0 }} // Rotates 180° when open
    transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7" // Base position (pointing down)
    />
  </motion.svg>
);
/**
 * FooterSection Component
 * - Handles quick links and resource sections with collapsible mobile support
 */
const FooterSection: FC<{
  title: string;
  links: { href: string; label: string }[];
  isOpen: boolean;
  setQuickIsOpen: (isOpen: boolean) => void;
}> = ({ title, links, isOpen, setQuickIsOpen }) => (
  <div>
    {/* Mobile View */}
    <div className="lg:hidden border-b border-gray-700 pb-2">
      <div
        onClick={() => setQuickIsOpen(!isOpen)}
        className="flex items-center justify-between text-lg text-footerTextColor font-freightNeoSemibold cursor-pointer"
      >
        {title}
        <ArrowIcon isOpen={isOpen} />
      </div>
      {isOpen && (
        <ul className="space-y-4 mt-4 text-gray-300 cursor-pointer">
          {links.map((link) => (
            <li key={link.href}>
              <FooterLink href={link.href}>{link.label}</FooterLink>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Desktop View */}
    <div className="hidden lg:block">
      <SubHeading className="text-lg md:text-xl text-footerTextColor font-freightNeoSemibold mb-4">{title}</SubHeading>
      <ul className="space-y-4 text-gray-300">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
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
      className={`flex md:flex-row flex-col text-footerTextColor  align-middle ${isPincode && "lg:items-start 2xl:items-center"} items-center md:gap-0 gap-3 `}
    >
      {icon}
      <Link href={link} target="_blank" className="pl-4 text-center lg:text-left">
        {/* Apply the custom font for phone number and pincode */}
        {isPhoneNumber || isPincode || email ? <span className={`font-CandideCondensedNormal`}>{text}</span> : "fdtext"}
      </Link>
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
        <a href="/terms-of-service" className="text-[#FFFFFF66] text-xs font-freightNeoMedium ">
          Legal Disclaimer
        </a>
        <span className="text-[#FFFFFF66] text-xs">|</span>
        <a href="/terms-of-service" className="text-[#FFFFFF66] text-xs font-freightNeoMedium">
          Terms of Service
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
