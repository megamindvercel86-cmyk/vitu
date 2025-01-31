// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";

import MediaSectionIntro from "@/components/MediaSectionIntro/MediaSectionIntro";
import MediaKits from "@/components/ResourcesPageComponents/MediaKits/MediaKits";

// ============= Types & Interfaces =============
interface MediaKitPageProps {}

// ============= Constants =============
const NAVBAR_CONFIG = {
  props: {
    navbar: "secondary" as const,
    showGetInTouch: true,
  },
};

/**
 * Media Kit Page Component
 * Displays downloadable media resources and introductory content
 * 
 * Sections:
 * 1. Media Section Introduction
 * 2. Downloadable Media Kits
 */
export default function MediaKitPage({}: MediaKitPageProps) {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
      {/* Media Introduction Section */}
      <MediaSectionIntro />

      {/* Media Kits Section */}
      <MediaKits />
    </Layout>
  );
}
