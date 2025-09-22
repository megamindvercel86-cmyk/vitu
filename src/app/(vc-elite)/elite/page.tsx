
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/ElitePageComponents/HeroBanner/Hero";
import React, { useEffect } from "react";
import herobg from "../../../../public/images/vaikuntamCityEliteLandingPage/Hero (5).webp";
import herobgMobile from "../../../../public/images/vaikuntamCityEliteLandingPage/hero-bg1.webp";
import EliteNavbar2 from "@/components/VaikuntamCityElite/Navbar/EliteNavbar-2";
import DesignedForLiving from "@/components/ElitePageComponents/InspiredLiving/inspioredLiving";
import NumberCounter2ELite from "@/components/ElitePageComponents/ElitePageCounter/ElitePageCOunter";
import ProximitySection from "@/components/ElitePageComponents/ProximitySection/ProximitySection";
import GracefullyConnected from "@/components/ElitePageComponents/GracefullyConnected/GracefullyConnected";
import SustainabilityCards from "@/components/ElitePageComponents/SustainabilityCards/SustainabilityCards";
import HorizontalScroll from "@/components/ElitePageComponents/HorizontalScroll/HorizontalScroll";
import EliteCurrentProject from "@/components/ElitePageComponents/EliteMapComponents/EliteMapComponents";
import VisionAndMissionElite from "@/components/ElitePageComponents/EliteVisionAndMission/EliteVIsionAndMission";
import LegacyYouCanLiveIN from "@/components/ElitePageComponents/LegacyYouCanLive/LegacyYouCanLive";
import EliteForm from "@/components/ElitePageComponents/EliteFormSubmission/EliteFormSubmission";
import ImageGrid from "@/components/ElitePageComponents/imageGrid/ImageGrid";
import EliteFooter3 from "@/components/VaikuntamCityElite/Footer/EliteFooter3";
import SvgButton from "@/components/ElitePageComponents/SvgButton/SvgButton";
import ImageGridMobile from "@/components/ElitePageComponents/ImageGridMobile/ImageGridMobile";
import { AnimatedConicButton } from "@/components/ui/moving-border";
import { Link } from "react-scroll";

const numberCounterData = [
  {
    description: "Total Project Area",
    title: "1 Acre ",
    subtitle: "(Approx.)",
  },
  {
    description: "Parks & Open Spaces",
    title: "38.3%",
  },
  {
    description: "Growth in past 3 years",
    title: "2X",
  },
  {
    description: "Luxury Villa Plots",
    title: "11",
  },
];
const numberCounterData2 = [
  {
    description: "Total Project Area ",
    title: "1 Acre ",
    subtitle: "(Approx.)",
  },
  {
    description: "Parks & Open Spaces",
    title: "38.3%",
  },
  {
    description: "Blooming Trees",
    title: "25+",
  },
  {
    description: "Available Plot Size (in sqft)",
    title: "1,600 - 2,600",
  },
];
const IMAGES = {
  desktop: [
    "/images/eliteProjectPageImages/eliteVissionAndMission/3.png",

    "/images/eliteProjectPageImages/eliteVissionAndMission/2.png",
    "/images/eliteProjectPageImages/eliteVissionAndMission/1.png",
  ],
  mobile: [
    "/images/eliteProjectPageImages/eliteVissionAndMission/3.png",

    "/images/eliteProjectPageImages/eliteVissionAndMission/2.png",
    "/images/eliteProjectPageImages/eliteVissionAndMission/1.png",
  ],
};
/** Content data for desktop and mobile */
const CONTENT = {
  desktop: [
    [
      {
        title: "SUNSET PLOTS",
        description:
          "Sunsets mark more than the end of a day, they symbolize renewal and the quiet promise of what comes next. These west-facing, vastu-aligned plots capture the soft glow of dusk, shaping homes that open to warmth and reflection. Each plot is planned to support a lifestyle that values ease in the evenings and a deeper connection to the rhythms of nature.",
      },

      {
        title: "SIGNATURE PLOTS",
        description:
          "Created for those who seek distinction, the Signature Plots bring together prime positioning and thoughtful planning. Each plot is laid out to maximize space, light, and privacy, offering the freedom to design a home that reflects individual taste. With their unique placement within the enclave, they stand apart as addresses of prestige and personal expression.",
      },

      {
        title: "SUNRISE PLOTS",
        description:
          "Positioned to welcome the morning sun, these plots create a foundation for mindful and harmonious living. The east-facing alignment invites natural light and a steady flow of energy, while vastu principles ensure balance and positivity. Designed to support early routines and a thoughtful pace of life, they offer an ideal setting for homes that value clarity and purpose.",
      },
    ],
    [
      {
        title: "SUNSET PLOTS",
        description:
          "Sunsets mark more than the end of a day, they symbolize renewal and the quiet promise of what comes next. These west-facing, vastu-aligned plots capture the soft glow of dusk, shaping homes that open to warmth and reflection. Each plot is planned to support a lifestyle that values ease in the evenings and a deeper connection to the rhythms of nature.",
      },

      {
        title: "SIGNATURE PLOTS",
        description:
          "Created for those who seek distinction, the Signature Plots bring together prime positioning and thoughtful planning. Each plot is laid out to maximize space, light, and privacy, offering the freedom to design a home that reflects individual taste. With their unique placement within the enclave, they stand apart as addresses of prestige and personal expression.",
      },

      {
        title: "SUNRISE PLOTS",
        description:
          "Positioned to welcome the morning sun, these plots create a foundation for mindful and harmonious living. The east-facing alignment invites natural light and a steady flow of energy, while vastu principles ensure balance and positivity. Designed to support early routines and a thoughtful pace of life, they offer an ideal setting for homes that value clarity and purpose.",
      },
    ],
    [
      {
        title: "SUNSET PLOTS",
        description:
          "Sunsets mark more than the end of a day, they symbolize renewal and the quiet promise of what comes next. These west-facing, vastu-aligned plots capture the soft glow of dusk, shaping homes that open to warmth and reflection. Each plot is planned to support a lifestyle that values ease in the evenings and a deeper connection to the rhythms of nature.",
      },

      {
        title: "SIGNATURE PLOTS",
        description:
          "Created for those who seek distinction, the Signature Plots bring together prime positioning and thoughtful planning. Each plot is laid out to maximize space, light, and privacy, offering the freedom to design a home that reflects individual taste. With their unique placement within the enclave, they stand apart as addresses of prestige and personal expression.",
      },

      {
        title: "SUNRISE PLOTS",
        description:
          "Positioned to welcome the morning sun, these plots create a foundation for mindful and harmonious living. The east-facing alignment invites natural light and a steady flow of energy, while vastu principles ensure balance and positivity. Designed to support early routines and a thoughtful pace of life, they offer an ideal setting for homes that value clarity and purpose.",
      },
    ],
  ],
  mobile: [
    {
      title: "SUNSET PLOTS",
      description:
        "Sunsets mark more than the end of a day, they symbolize renewal and the quiet promise of what comes next. These west-facing, vastu-aligned plots capture the soft glow of dusk, shaping homes that open to warmth and reflection. Each plot is planned to support a lifestyle that values ease in the evenings and a deeper connection to the rhythms of nature.",
    },

    {
      title: "SIGNATURE PLOTS",
      description:
        "Created for those who seek distinction, the Signature Plots bring together prime positioning and thoughtful planning. Each plot is laid out to maximize space, light, and privacy, offering the freedom to design a home that reflects individual taste. With their unique placement within the enclave, they stand apart as addresses of prestige and personal expression.",
    },
    {
      title: "SUNRISE PLOTS",
      description:
        "Positioned to welcome the morning sun, these plots create a foundation for mindful and harmonious living. The east-facing alignment invites natural light and a steady flow of energy, while vastu principles ensure balance and positivity. Designed to support early routines and a thoughtful pace of life, they offer an ideal setting for homes that value clarity and purpose.",
    },
  ],
};

const page = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Debounce resize events
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("ScrollTrigger refreshed, Scroll Height:", document.documentElement.scrollHeight);
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    // Initial refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

    const handleClick = () => {
    sessionStorage.setItem("eliteFormTitle", "DOWNLOAD E-BROCHURE");
    window.dispatchEvent(new Event("storageChange")); // Custom event
  };

  return (
    <div className="bg-[#F3EAE1] overflow-hidden">
      <EliteNavbar2 />
      <Hero herobg={herobg} herobgMobile={herobgMobile} />
      <DesignedForLiving />
      <NumberCounter2ELite data={numberCounterData2} noBorder />
      <div className="mt-5 mb-4">
        <SvgButton button="LOCATION" />
      </div>
      <ProximitySection />
      <GracefullyConnected />
      <div className="flex items-center z-50 justify-center mb-20">
        <Link
          to="elitForm"
           onClick={handleClick}
          className=" lg:inline-flex cursor-pointer items-center justify-center gap-2  mt-10 text-[#1C1213]  border-[0.25px]  border-[#1C1213]/20 rounded-full text-sm font-medium lg:text-lg xl:text-xl  "
        >
          <AnimatedConicButton theme="light" className=" !text-[#1C1213] lg:font-medium lg:font-freightNeoMedium md:flex !bg-none">
            <span className="flex gap-2 items-center">
          DOWNLOAD BROCHURE{" "}
              <svg width="17" height="16" className="mt-[3.5px]" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999472 7.00488L8.69482 14.6239L16.3911 7.00488" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
                <path d="M8.6958 14.6222L8.6958 0.375977" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
              </svg>
            </span>
          </AnimatedConicButton>
        </Link>
      </div>
      <div className="mt-20 xl:mt-0">
        <SvgButton button="Investment Potential" />
      </div>
      <div className="hidden lg:block">
        <ImageGrid />
      </div>
      <div className="block  lg:hidden">
        <ImageGridMobile />
      </div>
      <div className="lg:hidden">
        <SvgButton button="SUSTAINABILTY" />
      </div>
      <SustainabilityCards />
      <div className="lg:mb-20">
        <SvgButton button="AMENITIES" />
      </div>
      <HorizontalScroll />
      <div className="mt-10">
        <SvgButton button="MASTERPLAN" />
      </div>
      <EliteCurrentProject />
      <div className="lg:mb-10 lg:-mt-10">
        <NumberCounter2ELite data={numberCounterData} noBorder />
      </div>
      <VisionAndMissionElite content={CONTENT} images={IMAGES} />
      <div className="mt-20 mb-8">
        <SvgButton button="ABOUT VITU REALTY" />
      </div>
      <div className=" h-full  bg-gradient-to-b from-transparent via-[#b96f48] to-black">
        <LegacyYouCanLiveIN />
        <SvgButton button="CONTACT" isWhite={true} />
        <EliteForm />
        <EliteFooter3 />
      </div>
    </div>
  );
};

export default page;
