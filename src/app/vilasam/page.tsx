import Layout from "@/components/Layout/Layout";
import HeroComponent from "@/components/VilasamPageComponents/HeroComponent/HeroComponent";
import React from "react";

const NAVBAR_CONFIG = {
  className: "absolute top-0 left-0 right-0 z-10 w-full",
  props: {
    navbar: "secondary" as const,
    showGetInTouch: true,
  },
};

const VilasamPage = () => {
  return (
    <div className="bg-[#f8f6f5]  ">
      <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}>
        {" "}
        <HeroComponent />
      </Layout>
    </div>
  );
};

export default VilasamPage;
