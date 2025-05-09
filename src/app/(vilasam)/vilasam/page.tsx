import VilasamCarousel from "@/components/VilasamProjectPage/carousel/page";
import CurrentProject from "@/components/VilasamProjectPage/CurrentProject/CurrentProject";
import VilasamLegacyBuiltComponent from "@/components/VilasamProjectPage/LegacyComponent/page";
import LyfeStyle from "@/components/VilasamProjectPage/LyfeStyle/LyfeStyle";
import PropertyCard from "@/components/VilasamProjectPage/PlotCarousal/PlotCarousal";
import PlotWrapper from "@/components/VilasamProjectPage/Plots/page";
import UrbanAccessSection from "@/components/VilasamProjectPage/UrbanAccessSection/UrbanAccessSection";
import ElevatesLiving from "@/components/VilasamProjectPage/VilasamDetails/page";
import VilasamExploreProjects from "@/components/VilasamProjectPage/VilasamExploreProject/page";
import VilasamHeroSection from "@/components/VilasamProjectPage/VilasamHeroBanner/page";
import LocationAdvantage from "@/components/VilasamProjectPage/VilasamLocation/page";

// ============= Types & Interfaces =============
interface ProjectPageProps {}

export async function generateMetadata() {
  const pageTitle = "Vilasam – Premium Living in Mangaluru | Vitu Realty";
  const pageDescription =
    "Discover Vilasam City, a premium residential development in Mangaluru, strategically located near major industries and top educational institutions. Developed by the KMK Group, a legacy of over six decades in excellence. Explore modern living today!";
  const imageUrl = "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Vitu_Home_Top_Slider_1.jpg";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/",
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

export default function ProjectPage({}: ProjectPageProps) {
  return (
    <div className="bg-[#FAFFFD]">
      <section className="relative">
        <VilasamHeroSection />
      </section>
      <section className="bg-white">
        <VilasamCarousel />
      </section>
      <section id="location">
        <LocationAdvantage />
      </section>
      <section className="bg-[#FAFFFD]">
        <ElevatesLiving />
      </section>
      <section className="bg-[#FAFFFD] pb-36">
        <CurrentProject />
      </section>
      <section className="bg-[#FAFFFD] pb-14 lg:pb-36">
        <LyfeStyle />
      </section>
      <section id="sustainability" className="bg-[#FAFFFD]">
        <VilasamExploreProjects />
      </section>
      <section  className="bg-[#FAFFFD] hidden md:block">
        <PlotWrapper/>
      </section>
      <section className="bg-[#FAFFFD] mx-6 md:hidden">
      <PropertyCard/>
      </section>
      <section>
        <VilasamLegacyBuiltComponent/>
      </section>
      <section>
        <UrbanAccessSection/>
      </section>
    </div>
  );
}
