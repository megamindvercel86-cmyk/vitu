

// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import FormSection from "@/components/Common/FormSection/FormSection";

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

export async function generateMetadata() {
  const pageTitle = "Project Enquiry | Vitu-Realty - Find Your Perfect Property in Mangalore";
  const pageDescription =
    "Start your journey to owning your dream property with Vitu-Realty. Fill out our project enquiry form and explore premium plotted developments tailored to your needs.";
  const imageUrl = "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Project-Enquiry-Hero.jpg";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/project-enquire",
      siteName: "Vitu-Realty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Project Enquiry - Vitu-Realty Properties in Mangalore",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

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
