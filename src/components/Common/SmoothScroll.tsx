"use client";

 import { useEffect, useRef, createContext, useContext, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Create Context
const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null });

// Hook to use Lenis
export const useLenis = () => useContext(LenisContext);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1, // Adjust scrolling speed
    });

    setLenisInstance(lenis);

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker for the RAF loop to ensure perfect sync
    // Lenis requires time in milliseconds
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Prevent GSAP from catching up with large jumps

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      <div ref={scrollRef}>
        {children}
      </div>
    </LenisContext.Provider>
  );
};

export default SmoothScroll;
