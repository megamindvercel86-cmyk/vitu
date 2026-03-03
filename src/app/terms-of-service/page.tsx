// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import TermsAndService from "@/components/TermsOfService/TermsAndService";

// ============= Types & Interfaces =============
interface TermsOfServicePageProps {}

// ============= Constants =============
const NAVBAR_CONFIG = {
  props: {
    navbar: "secondary" as const,
    showGetInTouch: true,
  },
};

export async function generateMetadata() {
  const imageUrl =
    "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Project-Enquiry-Hero.jpg";
  return {
    title:
      "Terms of Service - Vitu Realty | Legal Information & User Guidelines",
    description:
      "Read Vitu Realty's Terms of Service to understand our policies, legal agreements, and user guidelines for using our platform and services.",
    keywords: [
      "Terms of Service",
      "Vitu Realty Terms",
      "Legal Information",
      "User Agreement",
      "Privacy Policy",
      "Real Estate Terms",
    ],
    openGraph: {
      title:
        "Terms of Service - Vitu Realty | Legal Information & User Guidelines",
      description:
        "Read Vitu Realty's Terms of Service to understand our policies, legal agreements, and user guidelines for using our platform and services.",
      url: "https://www.viturealty.com/terms-of-service",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Vitu Realty Terms of Service",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Terms of Service - Vitu Realty | Legal Information & User Guidelines",
      description:
        "Read Vitu Realty's Terms of Service to understand our policies, legal agreements, and user guidelines for using our platform and services.",
      images: [imageUrl],
    },
  };
}
/**
 * Terms of Service Page Component
 * Displays the company's terms of service and legal information
 *
 * Features:
 * 1. Terms and conditions content
 * 2. Legal agreements
 * 3. User guidelines
 */
export default function TermsOfServicePage({}: TermsOfServicePageProps) {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
      {/* Terms and Service Content Section */}
      <TermsAndService />
    </Layout>
  );
}
