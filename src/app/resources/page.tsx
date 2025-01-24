"use client";

import React from "react";
import ArticleArea from "@/components/ArticleArea/ArticleArea";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Layout from "@/components/Layout/Layout";
import MediaSection from "@/components/MediaSection/MediaSection";
import MediaKit from "@/components/MediaKit/MediaKit";

// Define the types for navbarProps
interface NavbarProps {
  navbar: "primary" | "secondary"; // Example values, modify based on actual usage
  active: "resources" | "home" | "about" | string; // Add other values as needed
  showGetInTouch: boolean;
}

const Resource: React.FC = () => {
  return (
    <Layout
      navbarClassName="absolute top-0 left-0 right-0 z-10 w-full"
      navbarProps={{
        navbar: "primary", // Adjust the value based on actual requirements
        active: "resources", // Active state for the navbar
        showGetInTouch: true, // Pass the showGetInTouch flag
      }}
    >
      <HeroBanner />
      <ArticleArea />
      <MediaSection />
      <MediaKit />
    </Layout>
  );
};

export default Resource;
