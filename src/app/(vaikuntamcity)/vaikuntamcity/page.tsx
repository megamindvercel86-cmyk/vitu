// ============= Component Imports =============
import ProjectHeroSection from "@/components/ProjectsPageComponents/ProjectHeroSection/ProjectHeroSection";
import LocationAdvantage from "@/components/ProjectsPageComponents/ProjectLocationAdvantage/ProjectLocationAdvantage";
import LegacyBuiltComponent from "@/components/ProjectsPageComponents/LegacyBuiltComponent/LegacyBuiltComponent";
import ProjectBottomSection from "@/components/ProjectsPageComponents/ProjectBottomSection/ProjectBottomSection";
import ExploreProjectsWrapper from "@/components/ProjectsPageComponents/ExploreProjectsWrapper/ExploreProjectsWrapper";
import ProjectHeader from "@/components/ProjectsPageComponents/ProjectsHeader/ProjectsHeader";
import dynamic from "next/dynamic";
// ============= Types & Interfaces =============
interface ProjectPageProps {}
const BeachAnimation = dynamic(() => import("@/components/ProjectsPageComponents/BeachAnimation/BeachAnimation"), {
  loading: () => <p>Loading Video...</p>,
});

const ProjectCarousel = dynamic(() => import("@/components/ProjectsPageComponents/ProjectCarousels/ProjectCarousels"), {
  loading: () => <p>Loading Carousal...</p>,
});
const CurrentProject = dynamic(() => import("@/components/ProjectsPageComponents/CurrentProject/CurrentProject"), {
  loading: () => <p>Loading Current Projects...</p>,
});
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
    <div className="bg-[#e6ddd6]">
      <BeachAnimation/>
      <section className="relative">
        <ProjectHeroSection />
      <section className="relative z-10">
        <ProjectHeader />
      </section>
      </section>
      <ProjectCarousel />
      <section id="sustainability" className="">
        <LocationAdvantage />
      </section>
      <section className="bg-[#FBFAF8] pt-20 pb-[1.5rem] lg:py-36">
        <CurrentProject />
      </section>
      <section id="carousal"className="bg-[#FBFAF8]">
        <ExploreProjectsWrapper />
      </section>
      {/* <section id="plots"  className="bg-[#FBFAF8]">
     <PlotWrapper/>
    </section> */}
      <section className="bg-[#fbfaf8] pt-[10px] lg:pt-0 pb-20 lg:pb-36">
        <LegacyBuiltComponent />
      </section>
      <section className="">
        <ProjectBottomSection />
      </section>
    </div>
  );
}
