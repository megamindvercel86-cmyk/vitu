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
    <section ref={container} className="pt-24">
      <h2 className="text-[#0C3E49] text-2xl md:pb-10 lg2:text-[60px] font-medium text-center font-geistSerif pb-20">Begin Where It Feels Right</h2>
      {plots.map((project, i) => {
        const targetScale = 1 - (plots.length - i) * 0.05;
        return <Plot key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} />;
      })}
    </section>
  );
};

export default PlotWrapper;
