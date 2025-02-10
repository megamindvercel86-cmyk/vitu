// CareerApplicationPage.tsx

import Layout from "@/components/Layout/Layout";
import FormSection from "@/components/Common/FormSection/FormSection";
import SEO from "@/components/SEO";

// Define the props type (if needed)
interface CareerApplicationPageProps {}

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

export default function CareerApplicationPage({}: CareerApplicationPageProps) {
  return (
    <>
      {/* SEO Metadata */}
      <SEO
        title="Career Application | Vitu Realty"
        description="Apply for exciting career opportunities at Vitu Realty. Fill out the career application form and join our dynamic team."
        keywords="career, Vitu Realty, job application, real estate jobs, Mangalore"
        image="https://yourwebsite.com/career-og-image.jpg"
        url="https://yourwebsite.com/career-application"
      />
      <Layout navbarProps={NAVBAR_CONFIG.props}>
        {/* Career Application Form Section */}
        <FormSection
          heading={FORM_CONFIG.heading}
          subheading={FORM_CONFIG.subheading}
          page={FORM_CONFIG.page}
        />
      </Layout>
    </>
  );
}
