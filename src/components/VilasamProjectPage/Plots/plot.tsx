"use client";

import Image from "next/image";
import styles from "../../ProjectsPageComponents/Plots/Plot.module.scss";
import { useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { MotionValue } from "framer-motion";
import Link from "next/link";

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

const Plot = ({ title, description, src, color = "#f5f5f5", i = 0, progress, range, targetScale }: PlotProps) => {
  const container = useRef(null);

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
          <div className="w-1/2 lg2:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-[#0C3E49] text-2xl lg:text-3xl lg2:text-5xl  font-geistSerif">{title}</h2>
              <p className="text-[#0C3E49] md:leading-7 flg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-sourceSans3 pt-6  ">{description}</p>
            </div>
            <div>
              <Link href="project-enquire">
                <button className="px-5 border py-2 rounded-3xl font-sourceSans3 bg-[#0C3E49] font-semibold text-white mt-4 ">Get the Best Quote</button>
              </Link>
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
