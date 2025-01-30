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
import "./globals.css";

// ============= Types & Interfaces =============
interface HomePageProps {}

// ============= Constants =============
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
export default function HomePage({}: HomePageProps) {
  return (
    <Layout
      navbarClassName={NAVBAR_CONFIG.className}
      navbarProps={NAVBAR_CONFIG.props}
    >
      {/* Hero Section */}
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
  );
}
