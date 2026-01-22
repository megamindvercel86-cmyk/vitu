// PlotWrapper.tsx
"use client";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { plots } from "@/data/vilasamPlotData";
import Plot from "./plot";

const PlotWrapper = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="" id="plots" ref={container}>
      <h2 className="  xl:pb-0 lg2:text-[60px] font-medium text-center font-theSeasons text-4xl lg:text-5xl lg2:text-6xl text-[#0C3E49] md:pb-10 pb-20 mt-8  ">Begin Where It Feels Right</h2>
      {plots.map((project, i) => {
        const targetScale = 1 - (plots.length - i) * 0.05;
        return <Plot key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />;
      })}
    </section>
  );
};

export default PlotWrapper;
