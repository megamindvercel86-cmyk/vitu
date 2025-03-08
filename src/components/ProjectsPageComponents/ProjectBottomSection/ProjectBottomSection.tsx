"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButtonIcon from "@/components/Icons/Icons";

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
    main: "Embrace the Serenity",
    sub: "of Coastal Living",
  },
  cta: {
    text: "Discover our Vision",
  },
};

const ProjectBottomSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for background layers
      gsap.utils.toArray<HTMLElement>(".layer").forEach((layer, i) => {
        const depth = 0.15 * (i + 1); // Reduced depth for smoother parallax
        
        gsap.fromTo(layer, 
          { y: `-${depth * 50}%` }, // Start slightly offset upwards
          {
            y: `${depth * 100}%`,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Fade in content
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[200vh] overflow-hidden bg-black"
    >
      {/* Parallax Layers */}
      <div className="layer absolute inset-0 z-0 h-[120vh] -top-[10vh]">
        <Image
          src="/images/backgroundImages/projectPagetoplayer.png"
          alt="Top Layer"
          fill
          className="object-cover scale-110"
          priority
          quality={100}
        />
      </div>
      <div className="layer absolute inset-0 z-10 h-[120vh] -top-[10vh]">
        <Image
          src="/images/backgroundImages/projectPagemiddlelayer.png"
          alt="Middle Layer"
          fill
          className="object-cover scale-110"
          priority
          quality={100}
        />
      </div>
      <div className="layer absolute inset-0 z-20 h-[120vh] -top-[10vh]">
        <Image
          src="/images/backgroundImages/projectPageBottomlayer.png"
          alt="Bottom Layer"
          fill
          className="object-cover scale-110"
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="sticky top-0 z-30 flex flex-col items-center justify-center h-screen text-white px-4"
      >
        <h1 className="font-freightNeoSemibold text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl text-center leading-tight mb-4">
          {ABOUT_HERO_CONFIG.titles.main}
        </h1>
        <h2 className="font-freightNeoSemibold text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl text-center leading-tight mb-8">
          {ABOUT_HERO_CONFIG.titles.sub}
        </h2>
        <p className="font-freightNeoMedium text-lg md:text-xl lg:text-2xl text-center mb-12">
          Discover <span className="font-CandideCondensedMedium">21,587</span> SqM 
          of Luxuriously Affordable Coastal Bliss
        </p>

        {/* CTA Button */}
        <button
          type="button"
          className="group relative flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden transition-all duration-300"
        >
          <div className="absolute inset-0 bg-[#A0BCAE] rounded-full transition-transform duration-300"></div>
          <div className="absolute inset-0 bg-[#4B9480] rounded-full transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
          <span className="relative z-10 font-freightNeoMedium">
            Scroll to Learn More
          </span>
          <CTAButtonIcon fill="#4B9480" />
        </button>
      </div>
    </section>
  );
};

export default ProjectBottomSection;