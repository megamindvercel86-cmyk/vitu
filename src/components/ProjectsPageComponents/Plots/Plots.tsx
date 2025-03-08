"use client";

import Image from "next/image";
import styles from "./Plot.module.scss";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

interface PlotProps {
  title: string;
  description: string;
  src: string;
  color?: string;
  i?: number;
}

const Plot = ({
  title,
  description,
  src,
  color = "#f5f5f5",
  i = 0,
}: PlotProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [1, 1], [1, 1]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={styles.card}
      >
        <div className={styles.body}>
          <div className={styles.description}>
            <h2 className="text-customBrown font-FreightNeoProNormal !text-4xl sm:!text-2xl">
              {title}
            </h2>
            <p className="text-[#4F373799] font-FreightNeoProNormal pt-6 text-lg sm:text-base">
              {description}
            </p>
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