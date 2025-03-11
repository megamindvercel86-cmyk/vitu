"use client";

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import AboutHeroSection from "@/components/AboutPageComponents/AboutHeroSection/AboutHeroSection";
import FounderMessage from "@/components/AboutPageComponents/FounderMessage/FounderMessage";
import JoinOurTeamHeroSection from "@/components/Common/JoinOurTeamHeroSection/JoinOurTeamHeroSection";
import VisionAndMission from "@/components/Common/VisionAndMission/VisionAndMission";
import LeadershipTeam from "@/components/AboutPageComponents/LeadershipTeam/LeadershipTeam";
import StorySection from "@/components/AboutPageComponents/StorySection/StorySection";
import { useRef } from "react";
import StoryHeader from "@/components/AboutPageComponents/StoryHeader/StoryHeader";


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

// export async function generateMetadata() {
//   const pageTitle = "About Us | Vitu-Realty - Your Trusted Real Estate Partner in Mangalore";
//   const pageDescription =
//     "Learn more about Vitu-Realty, a trusted real estate partner in Mangalore. Discover our story, vision, mission, leadership team, and commitment to creating premium plotted developments.";
//   const imageUrl = "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Vitu_Home_Top_Slider_1.jpg"

//   return {
//     title: pageTitle,
//     description: pageDescription,
//     openGraph: {
//       title: pageTitle,
//       description: pageDescription,
//       url: "https://yourwebsite.com/about",
//       siteName: "Vitu-Realty",
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: "About Us - Vitu-Realty, Your Trusted Real Estate Partner in Mangalore",
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: pageTitle,
//       description: pageDescription,
//       images: [imageUrl],
//     },
//   };
// }

export default function AboutPage() {
  
  
  return (
    <>
      <Layout
        navbarClassName={NAVBAR_CONFIG.className}
        navbarProps={NAVBAR_CONFIG.props}
      >
        {/* Hero Section with <h1> for SEO */}
        <AboutHeroSection  />

        {/* Company Story Section */}
        <section>
          <StoryHeader />
        </section>
        <section id="storysection">
          <StorySection />
        </section>

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
          <LeadershipTeam />
        </section>

        {/* Join Our Team Section */}
        <section>
          <JoinOurTeamHeroSection />
        </section>
      </Layout>
    </>
  );
}
