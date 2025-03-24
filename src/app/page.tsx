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
import bgImage from "../../../../public/images/backgroundImages/homeHeroImg.jpg";
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

export async function generateMetadata() {
  const pageTitle = "Vitu-Realty | Premium Plotted Developments in Mangalore";
  const pageDescription =
    "Discover thoughtfully designed premium plotted developments in Mangalore by Vitu-Realty. Experience a uniquely authentic lifestyle with our innovative designs and sustainable initiatives.";
  const imageUrl = bgImage;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/",
      siteName: "Vitu-Realty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Vitu-Realty - Premium Plotted Developments in Mangalore",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

export default function HomePage() {
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
