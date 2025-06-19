"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backround from "../../../../public/images/backgroundImages/projectpageBg4.png";
import Link from "next/link";

// ============= Types =============
interface AboutHeroConfig {
  titles: {
    main: string;
    sub: string;
  };
  cta: {
    text: string;
  };
}

// ============= Constants =============
const ABOUT_HERO_CONFIG: AboutHeroConfig = {
  titles: {
    main: "Affordable luxury meets",
    sub: "coastal living",
  },
  cta: {
    text: "Enquire Now",
  },
};

const ProjectBottomSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Get all parallax layers
      const layers = gsap.utils.toArray<HTMLElement>(".layer");

      if (layers.length === 0) {
        console.warn("No .layer elements found!");
        return;
      }

      // Parallax effect for background layers
      layers.forEach((layer, i) => {
        const depth = 0.1 * (i + 1); // Adjust depth for smoother parallax

        gsap.fromTo(
          layer,
          { y: `-${depth * 50}vh` }, // Initial offset
          {
            y: `${depth * 50}vh`, // Move based on depth
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
              markers: false, // Set to true for debugging
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Fade in content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 50%", // Adjusted for earlier fade-in
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen  lg:h-[130vh] overflow-hidden bg-black">
      {/* Parallax Layers */}
      <div className="layer absolute inset-0 z-0 h-screen lg:h-[130vh] ">
        <Image src={backround} alt="Top Layer" fill className="object-cover scale-110" priority quality={100} />
      </div>
      <div className="layer absolute inset-0 z-10 h-screen lg:h-[130vh] ">
        <Image src={backround} alt="Middle Layer" fill className="object-cover scale-110" priority quality={100} />
      </div>
      <div className="layer absolute inset-0 z-20 h-screen  lg:h-[130vh] ">
        <Image src={backround} alt="Bottom Layer" fill className="object-cover scale-110" priority quality={100} />
      </div>

      {/* Content */}
      <div ref={contentRef} className="sticky top-0 z-30 flex flex-col items-center justify-center h-screen text-white px-4">
        <h1 className="font-freightNeoSemibold text-4xl md:text-6xl lg:text-6xl lg2:text-8xl  2xl:text-9xl text-center leading-tight mb-4">
          {ABOUT_HERO_CONFIG.titles.main}
        </h1>
        <h2 className="font-freightNeoSemibold text-4xl md:text-6xl lg:text-6xl lg2:text-8xl 2xl:text-9xl text-center leading-tight mb-8">
          {ABOUT_HERO_CONFIG.titles.sub}
        </h2>
        <Link href="/project-enquire" aria-label="Enquire About Project Details">
          <button
            aria-label="Enquire About Project Details"
            type="button"
            className="group relative flex items-center bg-white text-[#2B847D] gap-2 px-6 py-3 rounded-full overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 font-FreightNeoProBold">Enquire About Project</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ProjectBottomSection;
