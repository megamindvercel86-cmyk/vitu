"use client";

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import AboutHeroSection from "@/components/AboutPageComponents/AboutHeroSection/AboutHeroSection";
import FounderMessage from "@/components/AboutPageComponents/FounderMessage/FounderMessage";
import JoinOurTeamHeroSection from "@/components/Common/JoinOurTeamHeroSection/JoinOurTeamHeroSection";
import StorySection from "@/components/AboutPageComponents/StorySection/StorySection";
import VisionAndMission from "@/components/Common/VisionAndMission/VisionAndMission";
import SEO from "@/components/SEO";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy load heavy components for better performance
const DynamicLeadershipTeam = dynamic(() => import("@/components/AboutPageComponents/LeadershipTeam/LeadershipTeam"), {
  ssr: false,
});

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
 * Displays company information, history, and team details.
 *
 * SEO Enhancements:
 * - Added structured data for better search engine ranking.
 * - Improved semantic HTML and heading structure.
 * - Optimized performance with lazy loading.
 */
export default function AboutPage({}: AboutPageProps) {
  const [structuredData, setStructuredData] = useState("");

  useEffect(() => {
    setStructuredData(
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Vitu Realty",
        "url": "https://yourwebsite.com",
        "logo": "https://yourwebsite.com/logo.png",
        "description": "Vitu Realty is a premium real estate company based in Mangalore, providing top-notch residential and commercial properties.",
        "founder": {
          "@type": "Person",
          "name": "Founder Name",
          "jobTitle": "CEO",
          "sameAs": ["https://linkedin.com/in/foundername", "https://facebook.com/viturealty"],
        },
        "foundingDate": "2015-01-01",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main Street",
          "addressLocality": "Mangalore",
          "addressCountry": "IN",
        },
        "telephone": "+91-9876543210",
      })
    );
  }, []);

  return (
    <>
      {/* SEO Metadata */}
      <SEO
        title="About Vitu Realty - Leading Real Estate in Mangalore"
        description="Learn about Vitu Realty, a trusted real estate company in Mangalore. Explore our mission, leadership team, and commitment to excellence."
        keywords="About Vitu Realty, Real Estate in Mangalore, Vitu Realty Leadership, Mangalore Properties, Company Mission"
        image="https://yourwebsite.com/about-og-image.jpg"
        url="https://yourwebsite.com/about"
      />

      {/* OpenGraph & Twitter Meta Tags */}
      <meta property="og:title" content="About Vitu Realty - Leading Real Estate in Mangalore" />
      <meta property="og:description" content="Learn about Vitu Realty, a trusted real estate company in Mangalore." />
      <meta property="og:image" content="https://yourwebsite.com/about-og-image.jpg" />
      <meta property="og:url" content="https://yourwebsite.com/about" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Structured Data (Loaded After Hydration) */}
      {structuredData && (
        <Script type="application/ld+json" id="structured-data" strategy="afterInteractive">
          {structuredData}
        </Script>
      )}

      <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}>
        {/* Hero Section with <h1> for SEO */}
        <AboutHeroSection />

        {/* Company Story Section */}
        {/* <section>
          <StorySection />
        </section> */}

        {/* Founder's Message Section */}
        <section>
          <FounderMessage />
        </section>

        {/* Vision and Mission Section */}
        <section>
          <VisionAndMission />
        </section>

        {/* Leadership Team Section (Lazy Loaded for Performance) */}
        <section>
          <DynamicLeadershipTeam />
        </section>

        {/* Join Our Team Section */}
        <section>
          <JoinOurTeamHeroSection />
        </section>
      </Layout>
    </>
  );
}
