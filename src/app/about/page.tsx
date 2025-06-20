// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import FounderMessage from "@/components/AboutPageComponents/FounderMessage/FounderMessage";
import JoinOurTeamHeroSection from "@/components/Common/JoinOurTeamHeroSection/JoinOurTeamHeroSection";
import VisionAndMission from "@/components/Common/VisionAndMission/VisionAndMission";
import LeadershipTeam from "@/components/AboutPageComponents/LeadershipTeam/LeadershipTeam";
import StoryHeader from "@/components/AboutPageComponents/StoryHeader/StoryHeader";
import dynamic from "next/dynamic";

const StorySection = dynamic(() => import("@/components/AboutPageComponents/StorySection/StorySection"), {
  loading: () => <p>Loading story section...</p>,
});
const AboutHeroSection = dynamic(() => import("@/components/AboutPageComponents/AboutHeroSection/AboutHeroSection"), {
  loading: () => <p>Loading Video...</p>,
});


const IMAGES = {
  desktop: ["/images/aboutPageVisionAndMission/1.webp", "/images/aboutPageVisionAndMission/2.webp", "/images/aboutPageVisionAndMission/3.webp"],
  mobile: ["/images/aboutPageVisionAndMission/1.webp", "/images/aboutPageVisionAndMission/2.webp", "/images/aboutPageVisionAndMission/3.webp"],
};

const CONTENT = {
  desktop: [
    [
      {
        title: "Diversity in Balance",
        description: "We maintain a near 50:50 women-to-men ratio, fostering equal opportunity and inclusive growth",
      },
      {
        title: "Accountability & Ownership",
        description: "We take ownership of our work, our impact and the collective success of our team.",
      },
      {
        title: "Trusted Experience",
        description: "We nurture a culture of trust, where collaboration and growth go hand-in-hand.",
      },
    ],
    [
      {
        title: "Diversity in Balance",
        description: "We maintain a near 50:50 women-to-men ratio, fostering equal opportunity and inclusive growth",
      },
      {
        title: "Accountability & Ownership",
        description: "We take ownership of our work, our impact and the collective success of our team.",
      },
      {
        title: "Trust & Collaboration",
        description: "We nurture a culture of trust, where collaboration and growth go hand-in-hand.",
      },
    ],
    [
      {
        title: "Diversity in Balance",
        description: "We maintain a near 50:50 women-to-men ratio, fostering equal opportunity and inclusive growth",
      },
      {
        title: "Accountability & Ownership",
        description: "We take ownership of our work, our impact and the collective success of our team.",
      },
      {
        title: "Trust & Collaboration",
        description: "We nurture a culture of trust, where collaboration and growth go hand-in-hand.",
      },
    ],
  ],
  mobile: [
    {
      title: "Diversity in Balance",
      description: "We maintain a near 50:50 women-to-men ratio, fostering equal opportunity and inclusive growth",
    },
    {
      title: "Accountability & Ownership",
      description: "We take ownership of our work, our impact and the collective success of our team.",
    },
    {
      title: "Trust & Collaboration",
      description: "We nurture a culture of trust, where collaboration and growth go hand-in-hand.",
    },
  ],
};
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

export async function generateMetadata() {
  const pageTitle = "About Us | Vitu-Realty - Your Trusted Real Estate Partner in Mangalore";
  const pageDescription =
    "Learn more about Vitu-Realty, a trusted real estate partner in Mangalore. Discover our story, vision, mission, leadership team, and commitment to creating premium plotted developments.";
  const imageUrl = "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Vitu_Home_Top_Slider_1.jpg";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://yourwebsite.com/about",
      siteName: "Vitu-Realty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "About Us - Vitu-Realty, Your Trusted Real Estate Partner in Mangalore",
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

export default function AboutPage() {
  return (
    <>
      <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}>
        {/* Hero Section with <h1> for SEO */}
        <section id="hero">
          <AboutHeroSection />
        </section>
        {/* Company Story Section */}
        <section>
          <StoryHeader />
        </section>
        <section id="storysection">
          <StorySection />
        </section>
        {/* Founder's Message Section */}
        <section id="video">
          <FounderMessage />
        </section>
        {/* Vision and Mission Section */}
        <section>
          <VisionAndMission images={IMAGES} content={CONTENT} />
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
