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
 * Metadata for the Media Kit Page
 */
export async function generateMetadata() {
  return {
  title: "Media Kit - Vitu Realty | Download Logos, Branding & Assets",
  description:
    "Access Vitu Realty's official media kit, including high-quality logos, branding guidelines, and press materials for media use.",
  keywords: [
    "Media Kit",
    "Vitu Realty Branding",
    "Real Estate Media Resources",
    "Download Logos",
    "Brand Guidelines",
    "Marketing Assets",
  ],
  openGraph: {
    title: "Media Kit - Vitu Realty | Download Logos, Branding & Assets",
    description:
      "Access Vitu Realty's official media kit, including high-quality logos, branding guidelines, and press materials for media use.",
    url: "https://viturealty.vercel.app/media-kit",
    type: "website",
    images: [
      {
        url: "https://viturealty.vercel.app/images/media-kit-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Vitu Realty Media Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Kit - Vitu Realty | Download Logos, Branding & Assets",
    description:
      "Access Vitu Realty's official media kit, including high-quality logos, branding guidelines, and press materials for media use.",
    images: ["https://viturealty.vercel.app/images/media-kit-banner.jpg"],
  },
}
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
