"use client";

import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion, AnimatePresence } from "framer-motion";
import animationData from "@/app/lotties/lootieloader.json";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Triggers exit animation
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        onFinish(); // Notify parent after fade-out
      }}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <Player autoplay loop src={animationData} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
