"use client";

import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Layout from "@/components/Layout/Layout";

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
    </Layout>
  );
}
