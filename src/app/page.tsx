"use client"

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import HomeHeroSection from "@/components/HomePageComponents/HomeHeroSection/HomeHeroSection";
import VisionAndMission from "@/components/Common/VisionAndMission/VisionAndMission";
import VisionForTheFuture from "@/components/HomePageComponents/VisionForTheFuture/VisionForTheFuture";
import CurrentProject from "@/components/HomePageComponents/CurrentProject/CurrentProject";
import Testimonials from "@/components/HomePageComponents/Testimonial/Testimonial";
import SustainabilityInitiatives from "@/components/HomePageComponents/SustainabilityInitiatives/SustainabilityInitiatives";
import JoinOurTeamHeroSection from "@/components/Common/JoinOurTeamHeroSection/JoinOurTeamHeroSection";
import ExploreProjectsWrapper from "@/components/ExploreProjectsWrapper/ExploreProjectsWrapper";
import { useEffect, useState } from "react";


// ============= Types & Interfaces =============


// ============= Constants =========
const NAVBAR_CONFIG = {
  className: "absolute top-0 left-0 right-0 z-10 w-full",
  props: {
    navbar: "primary" as const,
    showGetInTouch: true,
  },
};

/**
 * Home Page Component
 * Main landing page of the application
 *
 * Sections:
 * 1. Hero Section
 * 2. Vision and Mission
 * 3. Future Vision
 * 4. Project Explorer
 * 5. Current Projects
 * 6. Testimonials
 * 7. Sustainability
 * 8. Team Recruitment
 */



export default function HomePage() {

  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true); // Start fade out
    }, 7000); // Start fade out at 7s

    const hideTimer = setTimeout(() => {
      setShowLoader(false); // Hide loader fully
    }, 9000); // Fully hide at 9s

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);


  return (
    <>
      <Layout
        navbarClassName={NAVBAR_CONFIG.className}
        navbarProps={NAVBAR_CONFIG.props}
      >
        {/* Hero Section (Should contain an <h1> inside the component) */}
        <HomeHeroSection />

        {/* Vision and Mission Section */}
        <VisionAndMission />

        {/* Future Vision Section */}
        <VisionForTheFuture />

        {/* Project Explorer Section */}
        <ExploreProjectsWrapper />

        {/* Current Projects Section */}
        <CurrentProject />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Sustainability Section */}
        <SustainabilityInitiatives />

        {/* Team Recruitment Section */}
        <JoinOurTeamHeroSection />
      </Layout>
    </>
  );
}
