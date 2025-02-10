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
import SEO from "@/components/SEO";
import Script from "next/script";

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
    <>
      {/* SEO Metadata */}
      <SEO
        title="Vitu Realty - Best Real Estate in Mangalore"
        description="Find your dream home with Vitu Realty, Mangalore's top real estate company. Explore premium properties today!"
        keywords="real estate, Mangalore, properties, Vitu Realty, buy home, best real estate company"
        image="https://yourwebsite.com/og-image.jpg"
        url="https://yourwebsite.com"
      />

      {/* Schema Markup for Rich Snippets */}
      <Script type="application/ld+json" id="structured-data" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Vitu Realty",
          "url": "https://yourwebsite.com",
          "logo": "https://yourwebsite.com/logo.png",
          "description": "Find premium real estate properties in Mangalore with Vitu Realty.",
          "address": {
            "@type": "Laxman Commercial Complex, Golikatta Bazar",
            "streetAddress": "123 Main Street",
            "addressLocality": "Mangalore",
            "addressCountry": "IN"
          },
          "telephone": "+91-8904688886"
        })}
      </Script>

      <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}>
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
