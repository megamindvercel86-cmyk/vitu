// ============= Component Imports =============

import FormSection from "@/components/Common/FormSection/FormSection";
import EliteHeroSection from "@/components/VaikuntamCityElite/EliteHeroSection/EliteHeroSection";
import EliteNavbar from "@/components/VaikuntamCityElite/Navbar/EliteNavbar";

// ============= Types & Interfaces =============
interface ProjectPageProps {}

export async function generateMetadata() {
  const pageTitle = "Vaikuntam City – Premium Living in Mangaluru | Vitu Realty";
  const pageDescription =
    "Discover Vaikuntam City, a premium residential development in Mangaluru, strategically located near major industries and top educational institutions. Developed by the KMK Group, a legacy of over six decades in excellence. Explore modern living today!";
  const imageUrl = "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Vitu_Home_Top_Slider_1.jpg";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://www.viturealty.com/",
      siteName: "Vitu-Realty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Vitu-Realty - Premium Plotted Developments in Mangalore",
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
const FORM_CONFIG = {
  heading: "Your dream home is closer than you think!",
  subheading: "Begin your journey to a new home—fill out the form & let's get started.",
  page: "Vaikuntam City Elite" as const,
};

export default function ProjectPage({}: ProjectPageProps) {
  return (
    <div>
      <EliteNavbar />
      <EliteHeroSection />
      <div id="apply-form">
        <FormSection heading={FORM_CONFIG.heading} subheading={FORM_CONFIG.subheading} page={FORM_CONFIG.page} />
      </div>
    </div>
  );
}
