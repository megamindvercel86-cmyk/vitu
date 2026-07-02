// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";

// ============= Types & Interfaces =============
interface PrivacyPolicyPageProps {}

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
    title: "Privacy Policy - Vitu Realty | Data Privacy & Policy Guidelines",
    description:
      "Read Vitu Realty's Privacy Policy to understand how we collect, process, secure, and store your personal information and preferences.",
    keywords: [
      "Privacy Policy",
      "Vitu Realty Privacy",
      "Legal Information",
      "Data Protection",
      "User Agreement",
      "Real Estate Policies",
    ],
    openGraph: {
      title: "Privacy Policy - Vitu Realty | Data Privacy & Policy Guidelines",
      description:
        "Read Vitu Realty's Privacy Policy to understand how we collect, process, secure, and store your personal information and preferences.",
      url: "https://www.viturealty.com/privacy-policy",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Vitu Realty Privacy Policy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy - Vitu Realty | Data Privacy & Policy Guidelines",
      description:
        "Read Vitu Realty's Privacy Policy to understand how we collect, process, secure, and store your personal information and preferences.",
      images: [imageUrl],
    },
  };
}

/**
 * Privacy Policy Page Component
 * Displays the company's privacy policy and legal compliance details
 */
export default function PrivacyPolicyPage({}: PrivacyPolicyPageProps) {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
      <PrivacyPolicy />
    </Layout>
  );
}
