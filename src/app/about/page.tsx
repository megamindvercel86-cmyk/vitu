"use client";


import AboutHeroSection from "@/components/AboutHeroSection/AboutHeroSection";

import Layout from "@/components/Layout/Layout";
import StorySection from "@/components/StorySection/StorySection";

export default function About() {
  return (
    <Layout
      navbarClassName="absolute top-0 left-0 right-0 z-10 w-full"
      navbarProps={{
        navbar: "primary", 
        active: "resources", 
        showGetInTouch: true,
      }}
    >
      <AboutHeroSection />
      <StorySection />
    </Layout>
  );
}
