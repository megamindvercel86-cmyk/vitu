"use client";

// ============= Core Imports =============
// import dynamic from "next/dynamic";

// ============= Component Imports (Direct) =============
import Layout from "@/components/Layout/Layout";
import VisionAndMission from "@/components/Common/VisionAndMission/VisionAndMission";
import VisionForTheFuture from "@/components/HomePageComponents/VisionForTheFuture/VisionForTheFuture";
import Testimonials from "@/components/HomePageComponents/Testimonial/Testimonial";
import SustainabilityInitiatives from "@/components/HomePageComponents/SustainabilityInitiatives/SustainabilityInitiatives";
import JoinOurTeamHeroSection from "@/components/Common/JoinOurTeamHeroSection/JoinOurTeamHeroSection";
import Typography from "@/components/Typography/Typography";
import dynamic from "next/dynamic";
// ============= Lazy-loaded Components =============
// const VilasamExploreProjects = dynamic(
//   () => import("@/components/VilasamProjectPage/VilasamExploreProject/page"),
//   {
//     ssr: false,
//     loading: () => <p className="text-center py-10">Loading Projects...</p>,
//   }
// );

const CurrentProject = dynamic(
  () => import("@/components/HomePageComponents/CurrentProject/CurrentProject"),
  {
    ssr: false,
    loading: () => <p className="text-center py-10">Loading Current Projects...</p>,
  }
);
const ExploreProjectsWrapper = dynamic(
  () => import("@/components/ProjectsPageComponents/ExploreProjectsWrapper/ExploreProjectsWrapper"),
  {
    ssr: false,
    loading: () => <p className="text-center py-10">Loading Explore Projects...</p>,
  }
);
const HomeHeroSection = dynamic(
  () => import("@/components/HomePageComponents/HomeHeroSection/HomeHeroSection"),
  {
    ssr: false,
    loading: () => <p className="text-center py-10">Loading Video...</p>,
  }
);

// ============= Types & Interfaces =============
const IMAGES = {
  desktop: ["/images/visionAndMissionImages/1.webp", "/images/visionAndMissionImages/2.webp", "/images/visionAndMissionImages/3.webp"],
  mobile: [
    "/images/visionAndMissionImages/mobile2.webp",
    "/images/visionAndMissionImages/mobile1.webp",
    "/images/visionAndMissionImages/mobile3.webp",
  ],
};

const CONTENT = {
  desktop: [
    [
      {
        title: "Prime Locations",
        description: "Strategically located properties offering convenience, connectivity, and high investment value.",
      },
      {
        title: "Accessible Luxury",
        description: "Luxury living that blends comfort and sophistication with value-driven elegance.",
      },
      {
        title: "Trusted Experience",
        description: "Delivering homes where families thrive, backed by years of trust and excellence.",
      },
    ],
    [
      {
        title: "Prime Locations",
        description: "Strategically located properties offering convenience, connectivity, and high investment value.",
      },
      {
        title: "Accessible Luxury",
        description: "Luxury living that blends comfort and sophistication with value-driven elegance.",
      },
      {
        title: "Trusted Experience ",
        description: "Delivering homes where families thrive, backed by years of trust and excellence.",
      },
    ],
    [
      {
        title: "Prime Locations",
        description: "Strategically located properties offering convenience, connectivity and high investment value.",
      },
      {
        title: "Accessible Luxury",
        description: "Luxury living that blends comfort and sophistication with value-driven elegance.",
      },
      {
        title: "Trusted Experience ",
        description: "Delivering homes where families thrive, backed by years of trust and excellence.",
      },
    ],
  ],
  mobile: [
    {
      title: "Prime Locations",
      description: "Strategically located properties offering convenience, connectivity, and high investment value.",
    },
    {
      title: "Accessible Luxury",
      description: "Luxury living at accessible prices, designed to offer comfort and sophistication.",
    },
    {
      title: "Trusted Experience ",
      description: "Delivering homes where families thrive, backed by years of trust and excellence.",
    },
  ],
};

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
 */
export default function HomePage() {
  return (
    <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}>
      {/* Hero Section */}
      <HomeHeroSection />
      

      {/* Intro Section */}
      <article className="px-[1.875rem] pb-[3.75rem] pt-[4rem] text-center sm:px-[1.875rem] sm:pt-[4rem] md:pb-[6.9375rem] md:pt-[5.25rem] lg:pt-[6.5rem] xl:px-[24.125rem] xl:pt-[8rem]">
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-[#040707CC] text-[1rem] px-7 pb-6 sm:text-[1.375rem] md:px-0 md:text-[1.3rem] 2xl:text-[2.125rem]"
        >
          We create thoughtfully designed spaces that blend modern aesthetics with lasting quality.
        </Typography>
        <Typography
          variant="custom"
          className="font-freightNeoMedium text-customBrown text-[1.5rem] px-7 sm:text-[1.5rem] md:px-0 md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem]"
          aria-level={3}
        >
          Where Modern Design Meets Enduring Quality
        </Typography>
      </article>

      {/* Vision and Mission */}
      <VisionAndMission images={IMAGES} content={CONTENT} />

      {/* Future Vision */}
      <VisionForTheFuture />
      <ExploreProjectsWrapper />
      <CurrentProject homePage={true}/>

      {/* Project Explorer (Lazy Loaded) */}
      {/* <VilasamExploreProjects homePage={true} /> */}

      {/* Current Projects (Lazy Loaded) */}
      {/* <CurrentProject homePage={true}/> */}

      {/* Testimonials */}
      <Testimonials />

      {/* Sustainability */}
      <SustainabilityInitiatives />

      {/* Join Our Team */}
      <JoinOurTeamHeroSection />
    </Layout>
  );
}
