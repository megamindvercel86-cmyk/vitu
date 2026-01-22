import VilasamCarousel from "@/components/VilasamProjectPage/carousel/page";
import CurrentProject from "@/components/VilasamProjectPage/CurrentProject/CurrentProject";
import VilasamLegacyBuiltComponent from "@/components/VilasamProjectPage/LegacyComponent/page";
import LyfeStyle from "@/components/VilasamProjectPage/LyfeStyle/LyfeStyle";
import PropertyCard from "@/components/VilasamProjectPage/PlotCarousal/PlotCarousal";
import PlotConnectionMobile from "@/components/VilasamProjectPage/PlotConnectionMobile/PlotConnectionMobile";
import PlotWrapper from "@/components/VilasamProjectPage/Plots/page";
import UrbanAccessSection from "@/components/VilasamProjectPage/UrbanAccessSection/UrbanAccessSection";
import ElevatesLiving from "@/components/VilasamProjectPage/VilasamDetails/page";
import VilasamExploreProjects from "@/components/VilasamProjectPage/VilasamExploreProject/page";
import VilasamHeroSection from "@/components/VilasamProjectPage/VilasamHeroBanner/page";
import LocationAdvantage from "@/components/VilasamProjectPage/VilasamLocation/page";
import PlotConnection from "@/components/VilasamProjectPage/VilasamPlotConnection/PlotConnection";


// ============= Types & Interfaces =============
interface ProjectPageProps { }

export async function generateMetadata() {
  const pageTitle = "Vilasam – Premium Living in Mangaluru | Vitu Realty";
  const pageDescription =
    "Discover Vilasam City, a premium residential development in Mangaluru, strategically located near major industries and top educational institutions. Developed by the KMK Group, a legacy of over six decades in excellence. Explore modern living today!";
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2Fimage.png?alt=media&token=50905517-237f-40e6-bc40-0d55a6cddfc8";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/vilasam",
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

export default function ProjectPage({ }: ProjectPageProps) {
  return (
    <div className="bg-[#FAFFFD] flex flex-col">
      <section className="relative mb-20 lg2:mb-32">
        <VilasamHeroSection />
      </section>
      <section className="bg-white mb-20 lg2:mb-32">
        <VilasamCarousel />
      </section>
      <section id="sustainability" className="mb-20 lg2:mb-32">
        <LocationAdvantage />
      </section>
      <section className="bg-[#FAFFFD] mb-20 lg2:mb-32">
        <ElevatesLiving />
      </section>
      <section  className="bg-[#FAFFFD] mb-20 lg2:mb-32">
        <CurrentProject />
      </section>
      <section className="bg-[#FAFFFD] mb-20 lg:mb-0 ">
        <LyfeStyle />
      </section>
      <section className="bg-[#FAFFFD] md:block hidden mb-20 lg2:mb-32">
        <PlotConnection />
      </section>
      <section className="bg-[#FAFFFD] md:hidden block mb-20 lg2:mb-32">
        <PlotConnectionMobile />
      </section>
      <section className="bg-[#FAFFFD] ">
        <VilasamExploreProjects />
      </section>
      <section className="bg-[#FAFFFD] hidden md:block mb-28 lg:mb-23 xl:mb-0">
        <PlotWrapper />
      </section>
      <section className="bg-[#FAFFFD] md:hidden mb-20 lg2:mb-3">
        <PropertyCard />
      </section>
      <section className="mb-20 lg2:mb-36">
        <VilasamLegacyBuiltComponent />
      </section>
      <section className="mt-10 lg2:mt-12">
        <UrbanAccessSection />
      </section>
    </div>
  );
}
