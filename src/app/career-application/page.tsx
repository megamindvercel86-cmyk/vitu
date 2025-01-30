"use client";

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import FormSection from "@/components/Common/FormSection/FormSection";

// ============= Types & Interfaces =============
interface CareerApplicationPageProps {}

// ============= Constants =============
const NAVBAR_CONFIG = {
  props: {
    showGetInTouch: false,
  },
};

const FORM_CONFIG = {
  heading: "The career you've been waiting for starts here!",
  subheading: "Begin your journey to a rewarding career—fill out the form & let's get started",
  page: "Career Application" as const,
};

/**
 * Career Application Page Component
 * Handles the career application process with a form
 * 
 * Features:
 * 1. Form for career applications
 * 2. Hidden "Get in Touch" button
 * 3. Custom heading and subheading
 */
export default function CareerApplicationPage({}: CareerApplicationPageProps) {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
      {/* Career Application Form Section */}
      <FormSection
        heading={FORM_CONFIG.heading}
        subheading={FORM_CONFIG.subheading}
        page={FORM_CONFIG.page}
      />
    </Layout>
  );
}
