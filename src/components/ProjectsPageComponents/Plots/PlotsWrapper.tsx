// PlotWrapper.tsx
"use client";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { plots } from "@/data/plotsData";
import Plot from "./Plots";


const PlotWrapper = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="bg-[#FBFAF8] pt-24">
      {plots.map((project, i) => {
        const targetScale = 1 - (plots.length - i) * 0.05;
        return (
          <Plot
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress} // MotionValue
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
};

export default PlotWrapper;