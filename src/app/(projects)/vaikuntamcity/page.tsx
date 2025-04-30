// ============= Component Imports =============
import ProjectHeroSection from "@/components/ProjectsPageComponents/ProjectHeroSection/ProjectHeroSection";


import LocationAdvantage from "@/components/ProjectsPageComponents/ProjectLocationAdvantage/ProjectLocationAdvantage";
import CurrentProject from "@/components/ProjectsPageComponents/CurrentProject/CurrentProject";

import LegacyBuiltComponent from "@/components/ProjectsPageComponents/LegacyBuiltComponent/LegacyBuiltComponent";
import ProjectBottomSection from "@/components/ProjectsPageComponents/ProjectBottomSection/ProjectBottomSection";
import PlotWrapper from "@/components/ProjectsPageComponents/Plots/PlotsWrapper";
import ExploreProjectsWrapper from "@/components/ProjectsPageComponents/ExploreProjectsWrapper/ExploreProjectsWrapper";

// ============= Types & Interfaces =============
interface ProjectPageProps {}

export async function generateMetadata() {
  const pageTitle = "Vaikuntam City – Premium Living in Mangaluru | Vitu Realty";
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
    <div className="bg-[#e7dfda]  ">
    <section className="relative">
      <ProjectHeroSection />
    </section>
    <section id="location" className="bg-[#f9f7f5]">
      <LocationAdvantage />
    </section>
    <section className="bg-[#FBFAF8] pt-36">
      <CurrentProject />
    </section>
    <section id="sustainability"  className="bg-[#FBFAF8] pt-36">
      <ExploreProjectsWrapper />
    </section>
    <section id="plots"  className="bg-[#FBFAF8]">
     <PlotWrapper/>
    </section>
    <section className="bg-[#fbfaf8] ">
      <LegacyBuiltComponent />
    </section>
    <section className="">
      <ProjectBottomSection />
    </section>
  </div>
  );
}
