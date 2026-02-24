// ============= Components =============
import CarouselSection from "@/components/LandingPageComponents/VaikuntamCity/CarouselSection";
import EnquirySection from "@/components/LandingPageComponents/VaikuntamCity/EnquirySection";
import HeroSection from "@/components/LandingPageComponents/VaikuntamCity/HeroSection";
import OxygenParkSection from "@/components/LandingPageComponents/VaikuntamCity/OxygenParkSection";
import PlotSection from "@/components/LandingPageComponents/VaikuntamCity/PlotSection";
import SandCastleSection from "@/components/LandingPageComponents/VaikuntamCity/SandCastleSection";
import TypesOfPlotSection from "@/components/LandingPageComponents/VaikuntamCity/TypesOfPlotSection";

// ============= Types & Interfaces =============
interface LandingPageProps {}

export async function generateMetadata() {
  const pageTitle =
    "Vaikuntam City – Premium Living in Mangaluru | Vitu Realty";
  const pageDescription =
    "Discover Vaikuntam City, a premium residential development in Mangaluru, strategically located near major industries and top educational institutions. Developed by the KMK Group, a legacy of over six decades in excellence. Explore modern living today!";
  const imageUrl =
    "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Vitu_Home_Top_Slider_1.jpg";

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

export default function LandingPage({}: LandingPageProps) {
  return (
    <main className="bg-[#fcf9f8]">
      <HeroSection />
      <CarouselSection />
      <SandCastleSection />
      <OxygenParkSection />
      <PlotSection />
      <TypesOfPlotSection />
      <EnquirySection />
    </main>
  );
}
