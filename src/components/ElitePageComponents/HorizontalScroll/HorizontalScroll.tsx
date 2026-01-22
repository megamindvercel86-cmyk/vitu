"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Link } from "react-scroll";
import { AnimatedConicButton } from "@/components/ui/moving-border";



gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<GSAPTween | null>(null);
  const lineRef = useRef<SVGSVGElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);

  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const handleStartX = useRef(0);



  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !lineRef.current) return;

    const panels = gsap.utils.toArray<HTMLElement>(".hpanel");
    if (!panels.length) return;

    const totalWidth = panels.reduce((sum, el) => sum + el.offsetWidth, 0);
    gsap.set(trackRef.current, { width: totalWidth });

    // Set SVG line width to section's visible width
    if (sectionRef.current && lineRef.current) {
      const sectionWidth = sectionRef.current.offsetWidth;
      gsap.set(lineRef.current, { width: sectionWidth });
      lineRef.current.setAttribute("width", sectionWidth.toString());
    }

    // Optimize scrub for mobile - smoother on mobile devices
    const isMobile = window.innerWidth < 1024;
    const tween = gsap.to(panels, {
      x: () => `-${totalWidth - sectionRef.current!.offsetWidth}px`,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: isMobile ? 0.5 : 1, // Smoother scrub on mobile
        anticipatePin: 1,
        invalidateOnRefresh: true,
        end: () => "+=" + (totalWidth - sectionRef.current!.offsetWidth),
        // Mobile optimizations
        ...(isMobile && {
          fastScrollEnd: true,
          refreshPriority: -1,
        }),
      },
    });

    tweenRef.current = tween;

    // ✅ Animate images when visible
   // ✅ Animate images when visible
gsap.utils.toArray<HTMLElement>(".anim-img").forEach((img) => {
  gsap.fromTo(
    img,
    { scale: 1.2 }, // initial scale 110%
    {
      scale: 1, // scale to 100% when visible
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: img,
        start: "left center",
        end: "right center",
        toggleActions: "play reverse play reverse",
        containerAnimation: tweenRef.current, // sync with horizontal scroll
      },
    }
  );
});


    // Sync handle with scroll progress - optimized for mobile
    let updateTicking = false;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      fastScrollEnd: true,
      end: () => "+=" + (totalWidth - sectionRef.current!.offsetWidth),
      onUpdate: (self) => {
        if (!dragging && handleRef.current && lineRef.current && !updateTicking) {
          updateTicking = true;
          requestAnimationFrame(() => {
            const lineRect = lineRef.current!.getBoundingClientRect();
            const handleWidth = handleRef.current!.offsetWidth;
            const maxLeft = lineRect.width - handleWidth;
            gsap.set(handleRef.current, { left: self.progress * maxLeft });
            updateTicking = false;
          });
        }
      },
    });

    // Handle window resize - debounced for mobile
    let resizeTimeout: NodeJS.Timeout;
    const refresh = () => {
      clearTimeout(resizeTimeout);
      const isMobile = window.innerWidth < 1024;
      resizeTimeout = setTimeout(() => {
        if (lineRef.current && sectionRef.current) {
          const sectionWidth = sectionRef.current.offsetWidth;
          gsap.set(lineRef.current, { width: sectionWidth });
          lineRef.current.setAttribute("width", sectionWidth.toString());
          ScrollTrigger.refresh();
        }
      }, isMobile ? 250 : 100);
    };
    window.addEventListener("resize", refresh, { passive: true });

    return () => {
      window.removeEventListener("resize", refresh);
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [dragging]);

  // --- Dragging logic ---
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!handleRef.current || !lineRef.current) return;

    setDragging(true);
    startX.current = e.clientX;
    handleStartX.current = handleRef.current.offsetLeft;
    handleRef.current.setPointerCapture(e.pointerId);

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging || !lineRef.current || !handleRef.current || !tweenRef.current) return;

    const lineRect = lineRef.current.getBoundingClientRect();
    let newLeft = handleStartX.current + (e.clientX - startX.current);

    const handleWidth = handleRef.current.offsetWidth;
    newLeft = Math.max(0, Math.min(lineRect.width - handleWidth, newLeft));

    gsap.set(handleRef.current, { left: newLeft });

    const progress = newLeft / (lineRect.width - handleWidth);
    tweenRef.current.progress(progress);
  };

  const onPointerUp = (e: PointerEvent) => {
    setDragging(false);
    if (handleRef.current) {
      handleRef.current.releasePointerCapture(e.pointerId);
    }
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!handleRef.current || !lineRef.current) return;

    setDragging(true);
    startX.current = e.clientX;
    handleStartX.current = handleRef.current.offsetLeft;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging || !lineRef.current || !handleRef.current || !tweenRef.current) return;

    const lineRect = lineRef.current.getBoundingClientRect();
    let newLeft = handleStartX.current + (e.clientX - startX.current);

    const handleWidth = handleRef.current.offsetWidth;
    newLeft = Math.max(0, Math.min(lineRect.width - handleWidth, newLeft));

    gsap.set(handleRef.current, { left: newLeft });

    const progress = newLeft / (lineRect.width - handleWidth);
    tweenRef.current.progress(progress);
  };

  const onMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const panels = [
    {
      title: "Chapters of Living",
      description:
        "Every home tells a story and here, each moment unfolds like a chapter in a well-lived life. From quiet mornings to golden evenings, Vaikuntam City Elite is designed to hold space for it all. It’s a neighbourhood where life moves with ease and is shaped by the rhythm of everyday joys.",
      image: "/images/horizontalScroll/chapterMain.png",
      centerImage: "/images/horizontalScroll/chapterCenter.png",
      button: "true",
      width: 1600,
    },
    {
      title: "THE RISE",
      description: "How you begin your day resonates through every moment that follows. It sharpens focus, enhances mental clarity and gently awakens the body. A mindful morning elevates mood, nurtures productivity and cultivates lasting well-being transforming early hours into a deliberate investment in your health and life.",
      image: "/images/horizontalScroll/theRiseMain.png",
      centerImage: "/images/horizontalScroll/theRise.png",
      width: 1500,
    },
    {
      title: "The Hush",
      description: "How you embrace the day reflects balance and refinement. Time in the yoga hall, by the pool, or with a good book restores calm, while tennis, fitness, and outdoor sports keep the spirit energized. With amenities crafted for leisure and vitality, every moment becomes an indulgence in well-being and elevated living.",
      image: "/images/horizontalScroll/hushMain.png",
      centerImage: "/images/horizontalScroll/hush.png",
      width: 1600,
    },
    {
      title: "The Golden Hour",
      description: "As the day draws to a close, evenings invite you into a world of calm and connection. Stroll along landscaped paths, watch children play freely in open parks or gather with loved ones at the amphitheatre. With the setting sun as a backdrop, each moment becomes an elegant pause to slow down and truly be present.",
      image: "/images/horizontalScroll/goldMain.png",
      centerImage: "/images/horizontalScroll/golden.png",
      rightImage: "/images/horizontalScroll/goldRight.png",
      rightImageBottom: "/images/horizontalScroll/goldRightBottom.png",
      isGolden: "true",
      width: 1650,
    },
    {
      title: "The Twilight",
      description: "As night sets in, the enclave glows with quiet grandeur and refined elegance.Gentle lights trace the pathways, creating an atmosphere of warmth, elegance, and assurance. In the open-air barbecue corners, evenings unfold as refined soirees, where laughter mingles with fine flavors beneath a canopy of stars.",
      image: "/images/horizontalScroll/lightMain.png",
      centerImage: "/images/horizontalScroll/light.png",
      rightImage: "/images/horizontalScroll/lightRight.png",
      rightImageBottom: "/images/horizontalScroll/lightRightBottom.png",
      width: 1650,
    },
    {
      title: "",
      description: "",
      image: "/images/horizontalScroll/lastMain.png",
      centerImage: "/images/horizontalScroll/last.jpg",
      titleImage: "/images/horizontalScroll/lastRight.png",
      width: 1700,
    },
  ];

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-x-hidden overflow-y-hidden bg-[#f3eae1]" style={{ zIndex: 0 }}>
      <div ref={trackRef} className="relative h-full flex will-change-transform">
        {panels.map((panel, idx) => (
          <Panel
            key={idx}
            rightImage={panel.rightImage}
            centerImage={panel.centerImage}
            title={panel.title}
            desc={panel.description}
            img={panel.image}
            rightImageBottom={panel.rightImageBottom}
            titleImage={panel.titleImage}
            button={panel.button}
            isGolden={panel.isGolden}
            width={panel.width}
          />
        ))}
      </div>

      {/* SVG Line */}
      <svg ref={lineRef} className="absolute w-full bottom-[85px] left-0" height="3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1.80859" x2="13614" y2="1.80859" stroke="#F3EAE1" strokeWidth="2" />
      </svg>

      {/* Draggable Handle */}
      <div
        ref={handleRef}
        onPointerDown={onPointerDown}
        onMouseDown={onMouseDown}
        className="absolute bottom-[50px] left-0 cursor-grab select-none touch-none"
        style={{ zIndex: 50, pointerEvents: "auto" }}
      >
        <svg width="70" height="70" viewBox="0 0 92 93" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="46" cy="46.8086" r="45.875" stroke="#F3EAE1" strokeWidth="0.25" />
          <path d="M35.875 67.8938L56.7482 46.8115L35.875 25.7266" fill="#C7784D" fillOpacity="0.1" />
          <path d="M35.875 67.8938L56.7482 46.8115L35.875 25.7266" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
        </svg>
      </div>
    </section>
  );
}

function Panel({
  title,
  desc,
  img,
  centerImage,
  rightImage,
  rightImageBottom,
  titleImage,
  button,
  isGolden,
  width = 1200,
}: {
  title?: string;
  desc?: string;
  img: string;
  centerImage: string;
  rightImage?: string;
  rightImageBottom?: string;
  titleImage?: string;
  button?: string;
  isGolden?: string;
  width?: number;
}) {
  return (
    <div className="hpanel relative h-screen shrink-0 flex" style={{ width: `${width}px` }}>
      {!rightImage && !titleImage && (
        <div className="grid grid-cols-12 w-full h-full">
          <div className={`${button ? "col-span-5 " : "col-span-4 "} pt-10 px-12 bg-[#f3eae1] relative z-10`}>
            <div className="pb-20 lg:w-auto w-[60%]">
              <h2
                className={`${
                  button ? "text-7xl  w-[80%]" : "text-4xl w-full"
                } font-[400] leading-[1] font-FreightNeoProNormal uppercase tracking-tight mb-6 text-gray-900`}
              >
                {title}
              </h2>
              <p className={`text-lg font-[400] ${button ? "w-[100%]" : "w-[100%]"} text-justify font-FreightNeoProNormal text-gray-700`}>{desc}</p>
            </div>
            {button && (
                <div className="mt-6 flex ">
                        <Link  to="elitForm"  className="inline-flex cursor-pointer items-center justify-center gap-2  mt-10   text-[#1C1213] border-[0.25px]  border-[#1C1213]/20 rounded-full text-sm font-medium lg:text-xl  ">
                          <AnimatedConicButton theme="light" className="hidden !text-[#1C1213] lg:font-medium lg:font-freightNeoMedium md:flex !bg-none">
                            <span className="flex gap-2 items-center">
                              ENQUIRE NOW{" "}
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2753 16.7061L16.2213 5.87717L5.39175 5.82251" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                  <path d="M16.2195 5.87756L6.1459 15.9512" stroke="#F3EAE1" strokeWidth="1.5" strokeMiterlimit="10" />
                </svg>
                            </span>
                          </AnimatedConicButton>
                          </Link>
                        </div>
            )}
          </div>
          {centerImage && (
            <div className="absolute inset-y-0 left-[18%] items-end mb-10   lg2:mb-20 flex z-20">
              <div className="relative overflow-hidden w-[500px] h-[180px] lg2:h-[250px]">
                <Image src={centerImage} alt="center image" fill className="object-cover overflow-hidden  anim-img" />
              </div>
            </div>
          )}
          <div className={`${button ? "col-span-7" : "col-span-8"} overflow-hidden relative `}>
            <Image src={img} alt={title || "panel"} fill className="object-cover overflow-hidden anim-img" />
          </div>
        </div>
      )}

      {rightImage && (
        <div className="grid grid-cols-12 w-full h-full">
          <div className={`col-span-7 flex flex-col lg:w-auto w-[80%] ${isGolden ? "pl-56" : "pl-[430px]"} pt-20 px-12 bg-[#f3eae1] relative z-10`}>
            <h2
              className={`text-4xl  font-[400] ${isGolden ? "w-[70%]" : ""} font-FreightNeoProNormal uppercase tracking-tight mb-4 text-gray-900`}
            >
              {title}
            </h2>
            <p className={`lg2:text-lg font-[400] ${isGolden ? "w-[70%]" : ""} text-justify font-FreightNeoProNormal text-gray-700`}>{desc}</p>
          </div>
          <div className="col-span-5 overflow-hidden w relative  ">
            <Image src={img} alt={title || "panel"} fill className="object-cover overflow-hidden anim-img" />
          </div>
          {rightImageBottom && (
            <div className={`absolute inset-y-0 left-[3%] ${isGolden ? "items-end mb-20" : "items-end mb-16"} flex z-20`}>
              <div className={`relative ${isGolden ? "w-[450px]" : "w-[500px]"} h-[150px] lg2:h-[250px] overflow-hidden `}>
                <Image src={rightImageBottom} alt="bottom right" fill className="object-cover overflow-hidden anim-img" />
              </div>
            </div>
          )}
          <div className="absolute inset-y-0 left-[-20%] top-[30px] flex z-20">
            <div className="relative w-[500px] h-[250px] overflow-hidden ">
              <Image src={rightImage} alt="right image" fill className="object-cover overflow-hidden anim-img" />
            </div>
          </div>
          {centerImage && (
            <div className={`absolute inset-y-0 left-[40%] items-end mb-28 flex z-20`}>
              <div className={`relative ${!isGolden ? "w-[400px] h-[200px] lg2:h-[250px]" : "w-[500px] h-[200px] lg2:h-[250px]"} overflow-hidden `}>
                <Image src={centerImage} alt="center image" fill className="object-cover anim-img overflow-hidden" />
              </div>
            </div>
          )}
        </div>
      )}

      {titleImage && (
        <div className="grid grid-cols-12 w-full h-full">
         
          <div className="col-span-12 relative  flex justify-end bg-[#f3eae1]">
  <div className="relative w-[60%] pt-32 overflow-hidden px-12">
    <Image src={img} alt={title || "panel"} fill className="object-cover overflow-hidden anim-img" />
  </div>
</div>
          <div className="absolute inset-y-0 left-[-5%] top-[120px] flex z-20">
            <div className="relative overflow-hidden w-[650px] h-[300px] ">
              <Image src={titleImage} alt="title image" fill className="object-cover overflow-hidden anim-img" />
            </div>
          </div>
          {centerImage && (
            <div className="absolute inset-y-0 left-[30%] items-end xl:items-center xl:mb-0 mb-32  flex z-20">
              <div className="relative  w-[400px] overflow-hidden h-[200px] lg:h-[250px] ">
                <Image src={centerImage} alt="center image" fill className="object-cover overflow-hidden anim-img" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
