"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  textColor?: string;
  className?: string;
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
      className={className}
    >
      {children}
    </motion.h2>
  );
}
