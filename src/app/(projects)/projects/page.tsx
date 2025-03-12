// ============= Component Imports =============
"use client";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import Layout from "@/components/Layout/Layout";
import ProjectHeroSection from "@/components/ProjectsPageComponents/ProjectHeroSection/ProjectHeroSection";
import { plots } from "../../../data/plotsData";
import Plot from "@/components/ProjectsPageComponents/Plots/Plots";

import LocationAdvantage from "@/components/ProjectsPageComponents/ProjectLocationAdvantage/ProjectLocationAdvantage";
import CurrentProject from "@/components/ProjectsPageComponents/CurrentProject/CurrentProject";

import LegacyBuiltComponent from "@/components/ProjectsPageComponents/LegacyBuiltComponent/LegacyBuiltComponent";
import ProjectBottomSection from "@/components/ProjectsPageComponents/ProjectBottomSection/ProjectBottomSection";
import ExploreProjectsWrapper from "@/components/ExploreProjectsWrapper/ExploreProjectsWrapper";

// ============= Types & Interfaces =============
interface ProjectPageProps {}

// ============= Constants =========
const NAVBAR_CONFIG = {
  className: "absolute top-0 left-0 right-0 z-10 w-full",
  props: {
    navbar: "primary" as const,
    showGetInTouch: true,
  },
};

/**
 * Home Page Component
 * Main landing page of the application
 *
 * Sections:
 * 1. Hero Section
 * 2. Vision and Mission
 * 3. Future Vision
 * 4. Project Explorer
 * 5. Current Projects
 * 6. Testimonials
 * 7. Sustainability
 * 8. Team Recruitment
 */

// export async function generateMetadata() {
//   const pageTitle = "Vitu-Realty | Premium Plotted Developments in Mangalore";
//   const pageDescription =
//     "Discover thoughtfully designed premium plotted developments in Mangalore by Vitu-Realty. Experience a uniquely authentic lifestyle with our innovative designs and sustainable initiatives.";
//   const imageUrl =
//     "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Vitu_Home_Top_Slider_1.jpg";

//   return {
//     title: pageTitle,
//     description: pageDescription,
//     openGraph: {
//       title: pageTitle,
//       description: pageDescription,
//       url: "https://viturealty.vercel.app/",
//       siteName: "Vitu-Realty",
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: "Vitu-Realty - Premium Plotted Developments in Mangalore",
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: pageTitle,
//       description: pageDescription,
//       images: [imageUrl],
//     },
//   };
// }

export default function ProjectPage({}: ProjectPageProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup function to prevent multiple animation frames running
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#e4dcd6]">
      {/* Layout section */}
      {/* <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}> */}
      {/* Hero Section (Should contain an <h1> inside the component) */}

      <section className="relative">
        {" "}
        {/* Add relative positioning context */}
        <ProjectHeroSection />
      </section>
      <section className="bg-[#ffffff]">
        <LocationAdvantage />
      </section>
      <section className="bg-[#FBFAF8] pt-36">
        <CurrentProject />
      </section>
      <section className="bg-[#FBFAF8] pt-36">
        <ExploreProjectsWrapper />
      </section>
      <section ref={container} className="bg-[#FBFAF8] pt-24">
        {plots.map((project, i) => {
          const targetScale = 1 - (plots.length - i) * 0.05;
          return <Plot key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />;
        })}
      </section>
      <section className="bg-[#fbfaf8] ">
        <LegacyBuiltComponent />
      </section>
      <section className="pt-28">
        <ProjectBottomSection />
      </section>
      {/* </Layout> */}
    </div>
  );
}
