// CareerApplicationPage.tsx

import Layout from "@/components/Layout/Layout";
import FormSection from "@/components/Common/FormSection/FormSection";

// Define the props type (if needed)
interface CareerApplicationPageProps {}

const NAVBAR_CONFIG = {
  props: {
    showGetInTouch: false,
  },
};

const FORM_CONFIG = {
  heading: "The career you've been waiting for starts here!",
  subheading:
    "Begin your journey to a rewarding career—fill out the form & let's get started",
  page: "Career Application" as const,
};
export async function generateMetadata() {
  const pageTitle =
    "Join Our Team | Vitu-Realty - Start Your Rewarding Career Today";
  const pageDescription =
    "Begin your journey to a rewarding career with Vitu-Realty. Fill out our application form and take the first step toward professional growth and success.";
  const imageUrl =
    "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Career-Application-Hero.jpg";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/career-application",
      siteName: "Vitu-Realty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Join Our Team - Vitu-Realty Career Opportunities",
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
export default function CareerApplicationPage({}: CareerApplicationPageProps) {
  return (
    <>
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
