
"use client";

import React, { useState, Suspense } from "react";
import { AnimatedConicButton } from "@/components/ui/moving-border";
import EnquireModal from "@/components/VilasamLanding/EnquireModal";

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
import NewEnquireModal from "@/components/VilasamLanding/NewEnquireModal";

// Using a placeholder image for the hero background since actual assets are not yet provided
const HERO_BG = "/vilasamImages/heroSectionImages/vilasam.webp";

export default function VaikuntamCityEliteLandingPage2() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const cards: FtScrollCard[] = [
    {
      id: 1,
      video: "/vilasamVideos/1-2.mp4",
      title: "30ft Wide Roads",
      title2: "",
      subtitle: "in the European Cobblestone-paved Style",
      image: "/vilasamImages/basicImages/30ft.png",
      theme: "darkteal",
      textColor: "text-white",
    },
    {
      id: 2,
      video: "/vilasamVideos/2-2.mp4",
      title: "Chromotherapy Garden ",
      title2: "",
      image: "/vilasamImages/basicImages/50.webp",
      theme: "teal",
      textColor: "text-white",
    },
    {
      id: 3,
      video: "/vilasamVideos/2-3.mp4",
      title: "24x7 Security",
      title2: "",
      subtitle: "to protect what matters",
      image: "/vilasamImages/basicImages/24x7.png",
      theme: "orange",
      textColor: "text-white",
    },
  ];

  const mobileCards: FtMobileScrollCard[] = [
    {
      id: 1,
      bgImage: "/vilasamImages/basicImages/scroll2-1.jpeg",
      title: "30ft Wide Roads",
      title2: "",
      subtitle: "in the European Cobblestone-paved Style",
      image: "/vilasamImages/basicImages/30ft.webp",
      theme: "darkteal",
      textColor: "text-white",
    },
    {
      id: 2,
      bgImage: "/vilasamImages/basicImages/scroll2-2.jpeg",
      title: "Chromotherapy Garden",
      title2: "",
      subtitle: "",
      image: "/vilasamImages/basicImages/50.webp",
      theme: "teal",
      textColor: "text-white",
    },
    {
      id: 3,
      bgImage: "/vilasamImages/basicImages/scroll1-2.jpeg",
      title: "24x7 Security ",
      title2: "",
      subtitle: "to protect what matters",
      image: "/vilasamImages/basicImages/24x7.webp",
      theme: "orange",
      textColor: "text-white",
    },
  ];

  const SECTION_DATA = [
    {
      id: "atmosphere",
      label: "Atmosphere",
      title: "Atmosphere",
      description: "The Chromotherapy Garden sets a gentle rhythm where shifting hues and living greens come together, allowing color, light, and nature to inspire natural healing, emotional balance, and a sense of calm that lingers through the day.",
      imageSrc: "/vilasamImages/basicImages/5.webp"
    },
    {
      id: "lifestyle",
      label: "Lifestyle",
      title: "Lifestyle",
      description: "Life gathers around The Club, a 20,000 sq.ft lifestyle destination under one roof, where wellness, recreation, and shared moments blend seamlessly into an everyday experience shaped by comfort and connection.",
      imageSrc: "/vilasamImages/basicImages/lifestyle2.webp"
    },
    {
      id: "security",
      label: "Security",
      title: "Security",
      description: "A quiet assurance defines the environment, with 24x7 security woven into a gated setting, round the clock surveillance, and controlled access creating a constant sense of safety and peace of mind.",
      imageSrc: "/vilasamImages/basicImages/7.webp"
    },
    {
      id: "sustainability",
      label: "Sustainability",
      title: "Sustainability",
      description: "Sustainable living forms the foundation, guided by smart infrastructure and eco friendly design that work in harmony to conserve resources, reduce impact, and shape a future ready way of life.",
      imageSrc: "/vilasamImages/basicImages/8.webp"
    }
  ];

  const mobileSwiperImages: SwiperImage[] = [
    { src: "/vilasamImages/basicImages/mobileSwipe1.webp", alt: "Building Perspective Top" },
    { src: "/vilasamImages/basicImages/mobileSwipe2.webp", alt: "Building Perspective Bottom" },
    { src: "/vilasamImages/basicImages/mobileSwipe3.webp", alt: "Building Perspective Bottom" }
  ];


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="overflow-x-hidden">
          <NewEnquireModal isOpen={isModalOpen} onClose={closeModal} />
          <div className="md:block hidden">
            <ScrollRevealSection
              imageSrc={HERO_BG}
              overlayImageSrc="/vilasamImages/basicImages/1.webp"
              overlayImageSrcLeft="https://placehold.co/600x400/purple/white?text=Left+Image"
              overlayImageSrc2="/vilasamImages/basicImages/2.webp"
              title1={<>Limited Edition <br /> Luxury Villa Plots</>}
              description1={<>Vilasam offers 24 Boutique Luxury Villa Plots, a limited-edition sanctuary for families seeking peace and space. Thoughtfully planned layouts in a gated community create a setting where serenity meets modern living. Located behind NITK, Surathkal, Vilasam keeps you close to beaches, schools and city conveniences while surrounding you with greenery and calm. </>}
              contentImage1="/vilasamImages/basicImages/limitedImg.png"
              title2={<>Enclave of peace <br /> and quiet</>}
              description2="Your personal happy place, where deep relaxation helps you connect to your thoughts and feelings. Here, you will unveil hidden possibilities that the future holds just for you."
              ft1num="30ft"
              ft2num="50+"
              ft3num="24x7"
              ft1="Wide Roads"
              ft2="Blooming"
              ft3="Security"
              ft1desc="in the European Cobblestone-paved Style"
              ft2desc="Trees"
              ft3desc="to protect what matters"
              maxWidth="max-w-2xl"
              heroTitle={<>Your Space to <br /> <span>Breathe and Belong</span></>}
            />
          </div>
          <div className="md:hidden block">
            <ScrollRevealMobileSection
              mobtitle1=" Your Space to"
              mobtitle2="Breathe and Belong"
              mobsubtitle1="Limited Edition"
              mobsubtitle2="Luxury Villa Plots"
              mobiledesc1="Vilasam offers 24 Boutique Luxury Villa Plots, a limited-edition sanctuary for families seeking peace and space. Thoughtfully planned layouts in a gated community create a setting where serenity meets modern living. Located behind NITK, Surathkal, Vilasam keeps you close to beaches, schools and city conveniences while surrounding you with greenery and calm."
              ft1num="30ft"
              ft2num="50+"
              ft3num="24x7"
              ft1="Wide Roads"
              ft2="Blooming"
              ft3="Security"
              ft1desc="in the European Cobblestone-paved Style"
              ft2desc="Trees"
              ft3desc="to protect what matters"
              swiperImages={mobileSwiperImages}
              onEnquireClick={openModal}
            />
          </div>


          {/* Desktop: Show FtScroll with video backgrounds */}
          <div className="hidden md:block">
            <FtScroll cards={cards} />
          </div>

          {/* Mobile: Show FtSectionMobile with image backgrounds */}
          {/* <div className="block md:hidden">
          <FtSectionMobile mobileCards={mobileCards} />
        </div> */}


          <div className="block md:hidden">
            <FtSectionMobile mobileCards={mobileCards} />
          </div>
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
      </Suspense>
    </>
  );
}
