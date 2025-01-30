"use client";

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import FormSection from "@/components/FormSection/FormSection";
import FAQ from "@/components/FAQ/FAQ";

// ============= Types & Interfaces =============
interface GeneralEnquirePageProps {}

// ============= Constants =============
const NAVBAR_CONFIG = {
  props: {
    showGetInTouch: false,
  },
};

const FORM_CONFIG = {
  heading: "Excited about the possibilities your next home could offer?",
  subheading: "Take the first step towards the home of your dreams. Fill in the form and begin your Journey.",
  page: "General Enquire" as const,
};

/**
 * General Enquire Page Component
 * Handles general inquiries about homes and properties
 * 
 * Features:
 * 1. Inquiry form for potential customers
 * 2. FAQ section for common questions
 * 3. Hidden "Get in Touch" button
 */
export default function GeneralEnquirePage({}: GeneralEnquirePageProps) {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
      {/* General Inquiry Form Section */}
      <FormSection
        heading={FORM_CONFIG.heading}
        subheading={FORM_CONFIG.subheading}
        page={FORM_CONFIG.page}
      />

      {/* FAQ Section */}
      <FAQ />
    </Layout>
  );
}
