"use client";

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import FormSection from "@/components/FormSection/FormSection";

// ============= Types & Interfaces =============
interface ProjectEnquirePageProps {}

// ============= Constants =============
const NAVBAR_CONFIG = {
  props: {
    showGetInTouch: false,
  },
};

const FORM_CONFIG = {
  heading: "Your dream home is closer than you think!",
  subheading: "Begin your journey to a new home—fill out the form & let's get started.",
  page: "Project Enquire" as const,
};

/**
 * Project Enquire Page Component
 * Handles specific project and property inquiries
 * 
 * Features:
 * 1. Project inquiry form
 * 2. Hidden "Get in Touch" button
 * 3. Custom heading and subheading for projects
 */
export default function ProjectEnquirePage({}: ProjectEnquirePageProps) {
  return (
    <Layout navbarProps={NAVBAR_CONFIG.props}>
      {/* Project Inquiry Form Section */}
      <FormSection
        heading={FORM_CONFIG.heading}
        subheading={FORM_CONFIG.subheading}
        page={FORM_CONFIG.page}
      />
    </Layout>
  );
}
