"use client";

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import ArticleArea from "@/components/ArticleArea/ArticleArea";
import MediaSection from "@/components/MediaSection/MediaSection";
import MediaKit from "@/components/MediaKit/MediaKit";

// ============= Types & Interfaces =============
interface ResourcePageProps {}

// ============= Constants =============
const NAVBAR_CONFIG = {
  className: "absolute top-0 left-0 right-0 z-10 w-full",
  props: {
    navbar: "primary" as const,
    showGetInTouch: true,
  },
};

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
export default function ResourcePage({}: ResourcePageProps) {
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
