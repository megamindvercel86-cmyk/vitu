// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import FormSection from "@/components/Common/FormSection/FormSection";
import FAQ from "@/components/GeneralEnquireComopnents/FAQ/FAQ";

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
  subheading:
    "Take the first step towards the home of your dreams. Fill in the form and begin your Journey.",
  page: "General Enquire" as const,
};

/**
 * Metadata for the General Enquire Page
 */
export async function generateMetadata() {
  const pageTitle =
    "Enquire Now | Vitu-Realty - Find Your Dream Home in Mangalore";
  const pageDescription =
    "Take the first step towards your dream home with Vitu-Realty. Fill out our inquiry form and explore premium plotted developments in Mangalore.";
  const imageUrl =
    "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Dream-Home-Hero.jpg";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/general-enquire",
      siteName: "Vitu-Realty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Enquire Now - Vitu-Realty Dream Homes in Mangalore",
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
