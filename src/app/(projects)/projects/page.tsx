// ============= Component Imports =============
"use client";
import ProjectHeroSection from "@/components/ProjectsPageComponents/ProjectHeroSection/ProjectHeroSection";


import LocationAdvantage from "@/components/ProjectsPageComponents/ProjectLocationAdvantage/ProjectLocationAdvantage";
import CurrentProject from "@/components/ProjectsPageComponents/CurrentProject/CurrentProject";

import LegacyBuiltComponent from "@/components/ProjectsPageComponents/LegacyBuiltComponent/LegacyBuiltComponent";
import ProjectBottomSection from "@/components/ProjectsPageComponents/ProjectBottomSection/ProjectBottomSection";
import ExploreProjectsWrapper from "@/components/ExploreProjectsWrapper/ExploreProjectsWrapper";
import PlotWrapper from "@/components/ProjectsPageComponents/Plots/PlotsWrapper";

// ============= Types & Interfaces =============
interface ProjectPageProps {}


export default function ProjectPage({}: ProjectPageProps) {


  return (
    <div className="bg-[#e4dcd6]">
      <section className="relative">
        <ProjectHeroSection />
      </section>
      <section className="bg-[#f9f7f5]">
        <LocationAdvantage />
      </section>
      <section className="bg-[#FBFAF8] pt-36">
        <CurrentProject />
      </section>
      <section className="bg-[#FBFAF8] pt-36">
        <ExploreProjectsWrapper />
      </section>
      <section  className="bg-[#FBFAF8]">
       <PlotWrapper/>
      </section>
      <section className="bg-[#fbfaf8] ">
        <LegacyBuiltComponent />
      </section>
      <section className="pt-28">
        <ProjectBottomSection />
      </section>
    </div>
  );
}
