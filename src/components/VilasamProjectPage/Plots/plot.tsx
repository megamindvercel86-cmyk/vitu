"use client";

import Image from "next/image";
import styles from "../../ProjectsPageComponents/Plots/Plot.module.scss";
import { useTransform, motion } from "framer-motion";
import { useRef, useState } from "react";
import { MotionValue } from "framer-motion";
import Link from "next/link";
import ContactFormModal from "@/components/Common/FormModal/FormModal";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";

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
  const safeText = safeSpecialCharacters(title);
  const safeDesc =safeSpecialCharacters(description)



  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="lg:w-1/2 lg2:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-[#0C3E49] text-2xl lg:text-3xl lg2:text-5xl  font-theSeasons">{safeText}</h2>
              <p className="text-[#0C3E49] md:leading-7 lg2:text-[24px]  md:text-lg text-sm text-[#0C3E49]/60  font-ttCommons pt-6   ">{safeDesc}</p>
            </div>
            <div>
             
                <button onClick={() => setIsModalOpen(true)} aria-label="Get the Best Quote" className="px-5 border py-2 rounded-3xl font-ttCommons bg-[#0C3E49] font-semibold text-white mt-4 text-[18px] ">Get the Best Quote</button>
  
            </div>
          </div>

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner}>
              <Image fill src={src} alt={title} priority />
            </motion.div>
          </div>
        </div>
      </motion.div>
      <ContactFormModal isOpen={isModalOpen} onClose={setIsModalOpen} collectionName="vilasam" thankYouRoute="/vilasam/thank-you" downloadFileLink="/downloadingFiles/VITU Realty - Vilasam.pdf" />
    </div>
  );
};

export default Plot;
