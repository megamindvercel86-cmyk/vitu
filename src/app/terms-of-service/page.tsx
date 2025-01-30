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
