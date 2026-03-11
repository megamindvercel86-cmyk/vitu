// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import HeroBanner from "@/components/ResourcesPageComponents/HeroBanner/HeroBanner";
import ArticleArea from "@/components/ResourcesPageComponents/ArticleArea/ArticleArea";
import MediaSection from "@/components/ResourcesPageComponents/MediaSection/MediaSection";
import MediaKit from "@/components/MediaKit/MediaKit";

// ============= Types & Interfaces =============
interface ResourcePageProps { }

// ============= Constants =============
const NAVBAR_CONFIG = {
  className: "absolute top-0 left-0 right-0 z-10 w-full",
  props: {
    navbar: "primary" as const,
    showGetInTouch: true,
  },
};

export async function generateMetadata() {
  const imageUrl =
    "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Project-Enquiry-Hero.jpg";
  const pageUrl = "https://viturealty.com/resources"
  return {
    title: "Resources - Vitu Realty | Articles, Media & Downloads",
    description:
      "Explore Vitu Realty's resources, including insightful articles, media content, and downloadable media kits. Stay informed with our latest updates.",
    keywords: [
      "real estate resources",
      "property articles",
      "Vitu Realty media",
      "real estate insights",
      "download media kit",
    ],
    openGraph: {
      title: "Resources - Vitu Realty | Articles, Media & Downloads",
      description:
        "Explore Vitu Realty's resources, including insightful articles, media content, and downloadable media kits. Stay informed with our latest updates.",
      url: pageUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Vitu Realty Resources",
        },
      ],
    },
    alternates: {
      canonical: '/resources', 
    },
    twitter: {
      card: "summary_large_image",
      title: "Resources - Vitu Realty | Articles, Media & Downloads",
      description:
        "Explore Vitu Realty's resources, including insightful articles, media content, and downloadable media kits. Stay informed with our latest updates.",
      images: [imageUrl],
    },
  };
}
/**
 * Resources Page Component
 * Displays various media resources and articles
 *
 * Sections:
 * 1. Hero Banner
 * 2. Articles Area
 * 3. Media Content
 * 4. Media Kit Downloads
 */
export default function ResourcePage({ }: ResourcePageProps) {
  return (
    <Layout
      navbarClassName={NAVBAR_CONFIG.className}
      navbarProps={NAVBAR_CONFIG.props}
    >
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Articles Section */}
      <ArticleArea />

      {/* Media Content Section */}
      <MediaSection />

      {/* Media Kit Section */}
      <MediaKit />
    </Layout>
  );
}
