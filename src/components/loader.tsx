"use client";

import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion, AnimatePresence } from "framer-motion";
import animationData from "@/app/lotties/lotieloader.json";
import mobileAnimationData from "@/app/lotties/mobileLotie.json"
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
        <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
          <div className="hidden md:block">
            <Player autoplay loop src={animationData} className="md:w-full md:h-full " />
          </div>
          <div className="md:hidden">
            <Player autoplay loop src={mobileAnimationData} className="w-[174%] h-[400%]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
