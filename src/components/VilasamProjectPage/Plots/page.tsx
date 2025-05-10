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
    <section id="plots" ref={container}>
      <h2 className=" md:pb-20 xl:pb-10 lg2:text-[60px] font-medium text-center font-geistSerif text-2xl lg:text-5xl lg2:text-6xl text-[#0C3E49] pb-20">Begin Where It Feels Right</h2>
      {plots.map((project, i) => {
        const targetScale = 1 - (plots.length - i) * 0.05;
        return <Plot key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />;
      })}
    </section>
  );
};

export default PlotWrapper;
