import Layout from "@/components/Layout/Layout";
import MediaKits from "@/components/MediaKits/MediaKits";
import MediaSectionIntro from "@/components/MediaSectionIntro/MediaSectionIntro";
import React from "react";

const page = () => {
  return (
    <Layout>
      <MediaSectionIntro />
      <MediaKits />
    </Layout>
  );
};

export default page;
