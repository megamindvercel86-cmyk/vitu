"use client";

import Layout from "@/components/Layout/Layout";
import "./globals.css";
import HomeHeroSection from "@/components/HomeHeroSection/HomeHeroSection";
import VisionAndMission from "@/components/VisionAndMission/VisionAndMission";
import VisionForTheFuture from "@/components/VisionForTheFuture/VisionForTheFuture";
import CurrentProject from "@/components/CurrentProject/CurrentProject";
import Testimonials from "@/components/Testimonial/Testimonial";
import SustainabilityInitiatives from "@/components/SustainabilityInitiatives/SustainabilityInitiatives";
import JoinOurTeamHeroSection from "@/components/JoinOurTeamHeroSection/JoinOurTeamHeroSection";

export default function Home() {
  return (
    <Layout
      navbarClassName="absolute top-0 left-0 right-0 z-10 w-full"
      navbarProps={{
        navbar: "primary",
        active: "resources",
        showGetInTouch: true,
      }}
    >
      <HomeHeroSection />
      <VisionAndMission />
      <VisionForTheFuture />
      <CurrentProject />
      <Testimonials />
      <SustainabilityInitiatives />
      <JoinOurTeamHeroSection />
    </Layout>
  );
}
