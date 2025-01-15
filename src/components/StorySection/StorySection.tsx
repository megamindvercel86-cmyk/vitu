import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "1956",
    description: "KMK Group founded by Mr. K Madhav Kamath",
    image: "/images/timlneImages/timelineImage1.png"
  },
  {
    year: "1959",
    description: "First major project completed",
    image: "/images/timlneImages/timelineImage2.png"
  },
  {
    year: "1962",
    description: "Expansion into new territories",
    image: "/images/timlneImages/timelineImage3.png"
  },
  {
    year: "1965",
    description: "Innovation in design practices",
    image: "/images/timlneImages/timelineImage4.png"
  },
  {
    year: "1968",
    description: "Landmark development launched",
    image: "/images/timlneImages/timelineImage5.png"
  },
  {
    year: "1971",
    description: "International recognition achieved",
    image: "/images/timlneImages/timelineImage6.png"
  },
  {
    year: "1971",
    description: "International recognition achieved",
    image: "/images/timlneImages/timelineImage7.png"
  },
  {
    year: "1971",
    description: "International recognition achieved",
    image: "/images/timlneImages/timelineImage8.png"
  }
];

function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineInstance = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  const goToSlide = (index: number) => {
    if (index < 0 || index >= timelineData.length) return;
    
    const progress = index / (timelineData.length - 1);
    scrollTriggerInstance.current?.scroll(progress * scrollTriggerInstance.current.end);
    setCurrentIndex(index);
  };

  const handleNext = () => goToSlide(currentIndex + 1);
  const handlePrev = () => goToSlide(currentIndex - 1);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  useEffect(() => {
    const gap = 200;
    const totalWidth = (timelineData.length - 1) * (window.innerWidth + gap);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${timelineData.length * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const newIndex = Math.round((self.progress * (timelineData.length - 1)));
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
          }
        }
      }
    });

    timelineInstance.current = tl;
    scrollTriggerInstance.current = ScrollTrigger.getById(containerRef.current?.dataset.scrollTriggerId || '');

    gsap.set(imagesRef.current, { 
      opacity: 0.3,
      scale: 0.8
    });
    
    gsap.set(lineRef.current, { 
      scaleX: 0,
      transformOrigin: "left"
    });

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: timelineData.length,
      ease: "none"
    });

    tl.to(".images-track", {
      x: -totalWidth,
      duration: timelineData.length,
      ease: "none"
    }, 0);

    imagesRef.current.forEach((image, index) => {
      tl.to(image, {
        opacity: 1,
        scale: 1,
        duration: 1,
      }, index);

      if (index < imagesRef.current.length - 1) {
        tl.to(image, {
          opacity: 0.3,
          scale: 0.8,
          duration: 1,
        }, index + 1);
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Header text */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center px-4">
          <p className="text-sm text-[#8B6B5D] mb-2">From the welcoming comfort at your doorstep to the serene spaces designed just for you</p>
          <h2 className="text-2xl md:text-3xl font-serif">At Vitu, Every Design Feels Like Home—Because It Is</h2>
        </div>

        {/* Navigation controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-6 py-2 rounded-full border border-[#8B6B5D] text-[#8B6B5D] hover:bg-[#8B6B5D] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {timelineData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-[#8B6B5D]' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentIndex === timelineData.length - 1}
            className="px-6 py-2 rounded-full border border-[#8B6B5D] text-[#8B6B5D] hover:bg-[#8B6B5D] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="absolute inset-0">
          {/* The connecting line */}
          <div 
            ref={lineRef}
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#8B6B5D] -translate-y-1/2 z-10"
          />

          {/* Images container */}
          <div className="images-track flex h-screen" style={{ gap: '200px' }}>
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                ref={el => imagesRef.current[index] = el}
                className="relative w-screen h-screen flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt={`Historical photo ${item.year}`}
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                />
                <div className="absolute bottom-16 left-16 z-10">
                  <div className="text-7xl font-bold mb-4">{item.year}</div>
                  <p className="text-xl text-[#8B6B5D] max-w-xl">{item.description}</p>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorySection;