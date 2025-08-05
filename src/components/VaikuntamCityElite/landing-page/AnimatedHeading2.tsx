"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedHeading2({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="text-[26px] lg:text-[36px] lg2:text-[43px] leading-[100%] text-[#37121A] font-tenorSans"
    >
      {children}
    </motion.h2>
  );
}
