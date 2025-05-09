"use client";

import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1000); // Show button after scrolling 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({ smooth: true, duration: 1500 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-50  rounded-full transition-colors"
          aria-label="Scroll to top"
        >
          <svg width="49" height="50" viewBox="0 0 49 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24.5" cy="25" r="24.5" fill="#4A4A4A" />
            <path
              d="M29.9088 27.7188H18.8658C18.0924 27.7188 17.7057 26.8164 18.2643 26.2578L23.7643 20.7578C24.108 20.4141 24.6666 20.4141 25.0104 20.7578L30.5104 26.2578C31.069 26.8164 30.6822 27.7188 29.9088 27.7188Z"
              fill="#040707"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
