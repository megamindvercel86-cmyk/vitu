"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1, // Adjust scrolling speed
    });

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div ref={scrollRef}>
      {children}
    </div>
  );
};

export default SmoothScroll;
