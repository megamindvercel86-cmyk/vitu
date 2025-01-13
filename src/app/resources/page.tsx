"use client";

import ArticleArea from "@/components/ArticleArea/ArticleArea";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Layout from "@/components/Layout/Layout";
import MediaSection from "@/components/MediaSection/MediaSection";

export default function Resource() {
  return (
    <Layout
      navbarClassName="absolute top-0 left-0 right-0 z-10 w-full"
      navbarProps={{
        navbar: "primary", 
        active: "resources", 
        showGetInTouch: true,
      }}
    >
      <HeroBanner />
      <ArticleArea />
      <MediaSection/>
    </Layout>
  );
}
