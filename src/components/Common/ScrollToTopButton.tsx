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
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24.5244 0.21875C38.0554 0.21875 49.0244 11.1878 49.0244 24.7188C49.0244 38.2497 38.0554 49.2188 24.5244 49.2188C10.9934 49.2188 0.0244141 38.2497 0.0244141 24.7188C0.0244141 11.1878 10.9934 0.21875 24.5244 0.21875ZM25.0352 20.4766C24.6915 20.1329 24.1328 20.133 23.7891 20.4766L18.2891 25.9766C17.7305 26.5352 18.1172 27.4375 18.8906 27.4375H29.9336C30.7067 27.4372 31.0934 26.5351 30.5352 25.9766L25.0352 20.4766Z"
              fill="#4A4A4A"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
