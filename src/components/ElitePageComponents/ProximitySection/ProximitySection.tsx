"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Link } from "react-scroll";
import { AnimatedConicButton } from "@/components/ui/moving-border";

gsap.registerPlugin(ScrollTrigger);

const ProximitySection: React.FC = () => {
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let imagesLoaded = 0;
    const totalImages = 3; // 2 animated + 1 map
    const handleImageLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        ScrollTrigger.refresh();
      }
    };

    const ctx = gsap.context(() => {
      if (img1Ref.current && img2Ref.current) {
        gsap.to([img1Ref.current, img2Ref.current], {
          y: (i) => (i === 0 ? -250 : -280),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    // Attach load listeners to images
    const imgEls = Array.from(sectionRef.current?.querySelectorAll("img") || []) as HTMLImageElement[];
    imgEls.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    return () => {
      ctx.revert();
      imgEls.forEach((img) => img.removeEventListener("load", handleImageLoad));
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full pt-12 pb-24 lg:pt-20 lg:pb-20" style={{ minHeight: "100vh" }}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
        <div className="w-full lg:w-1/2 space-y-6 px-6 lg:pl-32">
          <h2 className="text-3xl hidden lg:block sm:text-4xl md:text-5xl lg:text-6xl font-light text-customBrown font-freightNeoMedium leading-snug">
            WHERE <br />
            <span>PROXIMITY FEELS</span> <br />
            EFFORTLESS
          </h2>
          <p className="text-gray-600 hidden lg:block max-w-lg text-base sm:text-lg">
            Perfectly placed between the city and the coast, this address brings you near to everything that matters. From sunlit beaches and reputed
            institutions, being close to everything is simply a part of everyday life.
          </p>
          <Link
            to="elitForm"
            className="hidden lg:inline-flex cursor-pointer items-center justify-center gap-2  mt-10 text-[#1C1213]  border-[0.25px]  border-[#1C1213]/20 rounded-full text-sm font-medium lg:text-lg xl:text-xl  "
          >
            <AnimatedConicButton theme="light" className="hidden !text-[#1C1213] lg:font-medium lg:font-freightNeoMedium md:flex !bg-none">
              <span className="flex gap-2 items-center">
                ENQUIRE NOW{" "}
                <svg width="17" height="16" className="mt-[3.5px]" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.999472 7.00488L8.69482 14.6239L16.3911 7.00488" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
                  <path d="M8.6958 14.6222L8.6958 0.375977" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
                </svg>
              </span>
            </AnimatedConicButton>
          </Link>
          <div className="relative flex flex-col sm:flex-row items-center justify-center lg:absolute lg:bottom-[-100px] lg:left-[180px] z-50 gap-4 mt-10 lg:mt-0">
            <div ref={img1Ref} className="w-60 h-36 z-50 lg:left-20 top-20 lg:top-16 sm:w-72 sm:h-44 lg:w-80 lg:h-48 relative overflow-hidden">
              <Image src="/images/eliteProjectPageImages/ProximitySectionImages/travel.png" alt="Travel" fill className="object-cover" priority />
            </div>
            <div ref={img2Ref} className="w-72 h-48 top-20 lg:top-0 sm:w-[400px] sm:h-[260px] lg:w-[460px] lg:h-[300px] relative overflow-hidden">
              <Image src="/images/eliteProjectPageImages/ProximitySectionImages/family.png" alt="Family" fill className="object-cover" priority />
            </div>
          </div>
        </div>
        <div className="w-full lg:hidden mb-8 lg:w-1/2 space-y-6  lg:pl-32  lg:mt-0 relative px-6 lg:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-customBrown font-freightNeoMedium leading-snug">
            WHERE PROXIMITY FEELS <br />
            EFFORTLESS
          </h2>
          <p className="text-gray-600 max-w-lg mt-3 text-base sm:text-lg">
            Perfectly placed between the city and the coast, this address brings you near to everything that matters. From sunlit beaches and reputed
            institutions, being close to everything is simply a part of everyday life.
          </p>
          <Link
            to="elitForm"
            className="inline-flex lg:hidden cursor-pointer items-center justify-center gap-2  mt-10 px-6 py-4 border text-[#1C1213]  border-black rounded-full text-sm font-medium lg:text-lg xl:text-xl  "
          >
            ENQUIRE NOW{" "}
            <svg  width="17"  className="mt-[3.5px]" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.999472 7.00488L8.69482 14.6239L16.3911 7.00488" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
              <path d="M8.6958 14.6222L8.6958 0.375977" stroke="#1C1213" strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
          </Link>
        </div>
        <div className="w-full lg:w-1/2  lg:mt-0 relative  lg:px-0">
          <div className="absolute top-0 left-0 w-full h-40 lg:h-72 bg-gradient-to-b from-[#F3EAE1] to-transparent pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 lg:h-24 bg-gradient-to-t from-[#F3EAE1] to-transparent pointer-events-none z-10"></div>
          <Image
            src="/images/eliteProjectPageImages/ProximitySectionImages/Location-Advantage1.webp"
            alt="Map"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ProximitySection;
