"use client";

import Image from "next/image";
import styles from "./Plot.module.scss";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { MotionValue } from "framer-motion";

interface PlotProps {
  title: string;
  description: string;
  src: string;
  color?: string;
  i?: number;
  progress: MotionValue<number>; // Add this
  range: number[]; // Add this
  targetScale: number; // Add this
}

const Plot = ({
  title,
  description,
  src,
  color = "#f5f5f5",
  i = 0,
  progress,
  range,
  targetScale,
}: PlotProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]); // Use the passed props

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: "#ffffff",
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={styles.card}
      >
        <div className={styles.body}>
          <div className={styles.description}>
            <h2 className="text-customBrown font-FreightNeoProNormal text-2xl lg:text-4xl">
              {title}
            </h2>
            <p className="text-[#4F373799] font-FreightNeoProNormal pt-6 text-lg sm:text-base">
              {description}
            </p>
            <div >
            <button className="px-5 border py-2 rounded-3xl font-FreightNeoProNormal bg-[#4F3737] text-white mt-4 lg:mt-[40%]">Get the Best Quote</button>
          </div>
          </div>
          

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner}>
              <Image fill src={src} alt={title} priority />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
    
  );
};

export default Plot;