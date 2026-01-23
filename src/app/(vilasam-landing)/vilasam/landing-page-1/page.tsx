"use client";


import React, { useState } from "react";
import ScrollRevealSection from "@/components/VilasamLanding/ScrollRevealSection";
import VilasamAtAGlance from "@/components/VilasamLanding/VilasamAtAGlance";
import WellnessLifestyleSection from "@/components/VilasamLanding/WellnessLifestyleSection";
import MangaloreFrameSection from "@/components/VilasamLanding/MangaloreFrameSection";
import FloorPerspectivesSection from "@/components/VilasamLanding/FloorPerspectivesSection";
import SmartCitySection from "@/components/VilasamLanding/SmartCitySection";
import LandingFooter from "@/components/VilasamLanding/LandingFooter";
import ScrollRevealMobileSection, { SwiperImage } from "@/components/VilasamLanding/ScrollRevealMobileSection";
import MobileMangaloreFloorSection from "@/components/VilasamLanding/MobileMangaloreFloorSection";
import FtScroll, { FtScrollCard } from "@/components/VilasamLanding/FtSection";
import FtSectionMobile, { FtMobileScrollCard } from "@/components/VilasamLanding/FtSectionMobile";
// import { AnimatedConicButton } from "@/components/ui/moving-border";
// import EnquireModal from "@/components/VilasamLanding/EnquireModal";
// import FtSectionTest from "@/components/VilasamLanding/FtSectionTest";
import NewEnquireModal from "@/components/VilasamLanding/NewEnquireModal";
// import { AnimatePresence, motion } from "framer-motion";
// import { X } from "lucide-react";

// Using a placeholder image for the hero background since actual assets are not yet provided
const HERO_BG = "/vilasamImages/heroSectionImages/vilasam.webp";

export default function VaikuntamCityEliteLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = React.useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  }, []);
  const closeModal = React.useCallback(() => setIsModalOpen(false), []);

  // const [isIdModalOpen, setIsIdModalOpen] = useState(false);



  const cards: FtScrollCard[] = [
    {
      id: 1,
      video: "/vilasamVideos/1-1.mp4",
      title: "100% Appreciation",
      title2: "",
      subtitle: "in the past 3 years",
      image: "/vilasamImages/basicImages/100.png",
      theme: "darkteal",
      textColor: "text-white",
    },
    {
      id: 2,
      video: "/vilasamVideos/2-3.mp4",
      title: "3 Years",
      title2: "Resale Flexibility",
      image: "/vilasamImages/basicImages/3yr.png",
      theme: "teal",
      textColor: "text-white",
    },
    {
      id: 3,
      video: "/vilasamVideos/1-3.mp4",
      title: "10X Growth",
      title2: "",
      subtitle: "in the future from SEZs, Port & Expressway",
      image: "/vilasamImages/basicImages/10growth.png",
      theme: "orange",
      textColor: "text-white",
    },
  ];

  const mobileCards: FtMobileScrollCard[] = [
    {
      id: 1,
      bgImage: "/vilasamImages/basicImages/scroll1-1.jpeg",
      title: "100% Appreciation",
      title2: "",
      subtitle: "in the past 3 years",
      image: "/vilasamImages/basicImages/100.png",
      theme: "darkteal",
      textColor: "text-white",
    },
    {
      id: 2,
      bgImage: "/vilasamImages/basicImages/scroll1-2.jpeg",
      title: "3 Years ",
      title2: "Resale Flexibility",
      subtitle: "",
      image: "/vilasamImages/basicImages/3yr.png",
      theme: "teal",
      textColor: "text-white",
    },
    {
      id: 3,
      bgImage: "/vilasamImages/basicImages/scroll1-3.jpeg",
      title: "10X Growth",
      title2: "",
      subtitle: "in the future from SEZs, Port & Expressway",
      image: "/vilasamImages/basicImages/10growth.png",
      theme: "orange",
      textColor: "text-white",
    },
  ];

  const wellnessSectionData = [
    {
      id: "atmosphere",
      label: "Safety",
      title: "Safety",
      description: "Comprehensive security measures, combining advanced technology and continuous monitoring, safeguard the community, strengthening trust and peace of mind, while enhancing the project’s desirability, long-term market positioning, and enduring investment value throughout the lifecycle of the development.",
      imageSrc: "/vilasamImages/basicImages/7.webp"
    },
    {
      id: "lifestyle",
      label: "Proximity",
      title: "Proximity",
      description: "Situated behind NITK, Surathkal, the project offers effortless access to the beach,  hospitals, premier educational institutions and the airport, combining convenience with  lifestyle appeal while reinforcing sustained demand, premium positioning and enduring  investment value over time.",
      imageSrc: "/vilasamImages/basicImages/Proxi1.png"
    },

    {
      id: "security",
      label: "Appreciation",
      title: "Appreciation",
      description: "Positioned at the heart of Surathkal’s emerging growth corridor, the project offers  premium limited plots with strong ROI potential, benefiting from infrastructure  expansion, rising demand and lifestyle-led differentiation, securing long-term value  appreciation and sustained investment appeal.",
      imageSrc: "/vilasamImages/basicImages/newapp1.png"
    },
    {
      id: "sustainability",
      label: "Lifestyle",
      title: "Lifestyle",
      description: "The location has recorded 100% growth over the past three years, with NH 66 connecting key cities including Mumbai, Goa and Kochi offering a rare balance of city access and coastal calm that strengthens demand and long-term investment potential.",
      imageSrc: "/vilasamImages/basicImages/lifestyle.webp"
    }
  ];

  const SECTION_DATA = [
    {
      id: "atmosphere",
      label: "Safety",
      title: "Safety",
      description: "Comprehensive security measures, combining advanced technology and continuous monitoring, safeguard the community, strengthening trust and peace of mind, while enhancing the project’s desirability, long-term market positioning, and enduring investment value throughout the lifecycle of the development.",
      imageSrc: "/vilasamImages/basicImages/7.webp"
    },
    {
      id: "lifestyle",
      label: "Proximity",
      title: "Proximity",
      description: "Situated behind NITK, Surathkal, the project offers effortless access to the beach,  hospitals, premier educational institutions and the airport, combining convenience with  lifestyle appeal while reinforcing sustained demand, premium positioning and enduring  investment value over time.",
      imageSrc: "/vilasamImages/basicImages/Proxi1.webp"
    },
    {
      id: "security",
      label: "Appreciation",
      title: "Appreciation",
      description: "Positioned at the heart of Surathkal’s emerging growth corridor, the project offers  premium limited plots with strong ROI potential, benefiting from infrastructure  expansion, rising demand and lifestyle-led differentiation, securing long-term value  appreciation and sustained investment appeal.",
      imageSrc: "/vilasamImages/basicImages/newapp1.webp"
    },
    {
      id: "sustainability",
      label: "Lifestyle",
      title: "Lifestyle",
      description: "The location has recorded 100% growth over the past three years, with NH 66 connecting key cities including Mumbai, Goa and Kochi offering a rare balance of city access and coastal calm that strengthens demand and long-term investment potential.",
      imageSrc: "/vilasamImages/basicImages/lifestyle.webp"
    }
  ];

  const mobileSwiperImages: SwiperImage[] = [
    { src: "/vilasamImages/basicImages/mobileSwipe1.png", alt: "Building Perspective Top" },
    { src: "/vilasamImages/basicImages/mobileSwipe2.png", alt: "Building Perspective Bottom" },
    { src: "/vilasamImages/basicImages/mobileSwipe3.png", alt: "Building Perspective Bottom" }
  ];



  return (
    <>
      <main className="overflow-x-hidden">
        <NewEnquireModal isOpen={isModalOpen} onClose={closeModal} />
        <div className="md:block hidden">
          <ScrollRevealSection
            imageSrc={HERO_BG}
            overlayImageSrc="/vilasamImages/basicImages/1.webp"
            overlayImageSrcLeft="https://placehold.co/600x400/purple/white?text=Left+Image"
            overlayImageSrc2="/vilasamImages/basicImages/2.webp"
            contentImage1="/vilasamImages/basicImages/limitedImg.png"

            title1={<>Limited Edition <br /> Luxury Villa Plots</>}
            description1={<>Vilasam presents 24 Boutique Luxury Villa Plots, a limited-edition investment sanctuary.
              A strategic land asset in one of Karnataka’s fastest-growing coastal corridors, designed
              for capital appreciation and long-term value. Located behind NITK, Surathkal, this asset
              offers investors early positioning in a location primed for value expansion. </>}
            title2={<>Enclave of peace <br /> and quiet</>}
            description2="Your personal happy place, where deep relaxation helps you connect to your thoughts and feelings. Here, you will unveil hidden possibilities that the future holds just for you."
            ft1num="100"
            ft2num="3"
            ft3num="10"
            ft1="% Appreciation"
            ft2="Years"
            ft3="X Growth"
            ft1desc="In the past 3 years"
            ft2desc="Resale Flexibility"
            ft3desc="in the future from SEZs, Port Expressway"
            maxWidth="max-w-xl"
            heroTitle={<>Secure your Legacy in <br /> <span>Mangalore<span className="font-CandideCondensedNormal">&apos;</span>s Growth Story</span></>}
          />
        </div>
        <div className="md:hidden block">
          <ScrollRevealMobileSection
            mobtitle1="Secure your Legacy "
            mobtitle2=" in Mangalore’s Growth Story"
            mobsubtitle1="Limited Edition"
            mobsubtitle2="Luxury Villa Plots"
            mobiledesc1="Vilasam presents 24 Boutique Luxury Villa Plots, a limited-edition investment sanctuary. A strategic land asset in one of Karnataka’s fastest-growing coastal corridors, designed for capital appreciation and long-term value. Located behind NITK, Surathkal, this asset offers investors early positioning in a location primed for value expansion."
            ft1num="100"
            ft2num="3"
            ft3num="10"
            ft1="% Appreciation"
            ft2="Years"
            ft3="X Growth"
            ft1desc="In the past 3 years"
            ft2desc="Resale Flexibility"
            ft3desc="in the future from SEZs, Port Expressway"
            swiperImages={mobileSwiperImages}
            onEnquireClick={openModal}
          />
          {/* <VilasamAtAGlance /> */}
        </div>


        {/* Desktop: Show FtScroll with video backgrounds */}
        <div className="hidden md:block">
          <FtScroll cards={cards} />
        </div>

        {/* Mobile: Show FtSectionMobile with image backgrounds */}
        <div className="block md:hidden">
          <FtSectionMobile mobileCards={mobileCards} />
        </div>

        {/* 
        <div className="block md:hidden">
              <FtSectionMobile mobileCards={mobileCards} />
            </div> */}
        <WellnessLifestyleSection sectionData={SECTION_DATA} />

        <div className="hidden md:block">
          <MangaloreFrameSection />
          <div className="h-screen w-full bg-transparent pointer-events-none" />
          <FloorPerspectivesSection onEnquireClick={openModal} />
        </div>

        <div className="block md:hidden">
          <MobileMangaloreFloorSection onEnquireClick={openModal} />
        </div>

        <SmartCitySection />
        <LandingFooter />
      </main>
    </>
  );
}
