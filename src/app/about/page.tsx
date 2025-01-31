"use client";

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import AboutHeroSection from "@/components/AboutPageComponents/AboutHeroSection/AboutHeroSection";
import FounderMessage from "@/components/AboutPageComponents/FounderMessage/FounderMessage";
import JoinOurTeamHeroSection from "@/components/Common/JoinOurTeamHeroSection/JoinOurTeamHeroSection";
import LeadershipTeam from "@/components/AboutPageComponents/LeadershipTeam/LeadershipTeam";
import StorySection from "@/components/AboutPageComponents/StorySection/StorySection";
import VisionAndMission from "@/components/Common/VisionAndMission/VisionAndMission";


// ============= Types & Interfaces =============
interface AboutPageProps {}

// ============= Constants =============
const NAVBAR_CONFIG = {
  className: "absolute top-0 left-0 right-0 z-10 w-full",
  props: {
    navbar: "primary" as const,
    showGetInTouch: true,
  },
};

/**
 * About Page Component
 * Displays company information, history, and team details
 * 
 * Sections:
 * 1. Hero Section
 * 2. Company Story
 * 3. Founder's Message
 * 4. Vision and Mission
 * 5. Leadership Team
 * 6. Join Our Team CTA
 */
export default function AboutPage({}: AboutPageProps) {
  return (
    <Layout
      navbarClassName={NAVBAR_CONFIG.className}
      navbarProps={NAVBAR_CONFIG.props}
    >
      {/* Hero Section */}
      <AboutHeroSection />

      {/* Company Story Section */}
      <StorySection />

      {/* Founder's Message Section */}
      <FounderMessage />

      {/* Vision and Mission Section */}
      <VisionAndMission />

      {/* Leadership Team Section */}
      <LeadershipTeam />

      {/* Join Our Team Section */}
      <JoinOurTeamHeroSection />
    </Layout>
  );
}
