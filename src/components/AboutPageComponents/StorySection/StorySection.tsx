import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import SubHeading from "@/components/Common/SubHeding";
import Heading from "@/components/Common/Heading";
import "./StorySection.css";
import StorySectionAnimation1 from "@/components/Animations/StorySectionAnimation1";
import StorySectionAnimation2 from "@/components/Animations/StorySectionAnimation2";
gsap.registerPlugin(ScrollTrigger);

const lottieAnimationURL =
  "https://lottie.host/05df5b69-ac59-4204-af22-91c745dfe4dd/AQsEcUz4mq.lottie";

const images = [
  {
    src: "/images/timelineImages/timelineImage1.png",
    year: "1956",
    message: "KMK Group founded by Mr. K Madhav Kamath",
  },
  {
    src: "/images/timelineImages/timelineImage2.png",
    year: "1959",
    message: "Distribution of Major FMCG Products & WeTwo Matches",
  },
  {
    src: "/images/timelineImages/timelineImage3.png",
    year: "1974",
    message: "Established Maya Traders and affiliated ventures",
  },
  {
    src: "/images/timelineImages/timelineImage4.png",
    year: "1975",
    message: "Entered into Coffee Plantations Market",
  },
  {
    src: "/images/timelineImages/timelineImage5.png",
    year: "1990",
    message:
      "Expanded into wholesale distribution of WeTwo Fireworks under Mr K Ananth Kamath's ledership",
  },
  {
    src: "/images/timelineImages/timelineImage6.png",
    year: "2003",
    message:
      "Expanded into real-estate by trading land, partnering with MUDA on a 75-Acre development",
  },
  {
    src: "/images/timelineImages/timelineImage7.png",
    year: "2023",
    message:
      "Mr Laxman Kamath made a significant entry and established Vitu Realty",
  },
  {
    src: "/images/timelineImages/timelineImage8.png",
    year: "2024",
    message: "Launched Vaikuntam City, a premium plotted Development",
  },
];

function YearDisplay({
  number,
  isFixed,
}: {
  number: string;
  isFixed: boolean;
}) {
  return (
    <div
      className={`${isFixed ? "fixed bottom-28 left-48" : "absolute bottom-28 left-48"} pointer-events-none z-50`}
    >
      <span className="text-[80px] font-bold text-white font-CandideCondensedMedium">
        {number.split("").map((digit, index) => (
          <span key={index} className="inline-block w-[1ch]">
            {digit}
          </span>
        ))}
      </span>
    </div>
  );
}
function MessageDisplay({
  message,
  isFixed,
}: {
  message: string;
  isFixed: boolean;
}) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0,
          ease: "power2.out",
        }
      );
    }
  }, [message]); // Re-run animation when message changes

  return (
    <div
      className={`${
        isFixed ? "fixed bottom-32 right-10" : "absolute bottom-28 right-10"
      } pointer-events-none z-50 max-w-[450px]`}
    >
      <div ref={messageRef}>
        <span className="text-[32px] font-bold text-white font-freightNeoSemibold leading-tight block text-right">
          {message}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const [currentYear, setCurrentYear] = useState(images[0].year);
  const [currentMessage, setCurrentMessage] = useState(images[0].message);
  const [progress, setProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const [animation1Completed, setAnimation1Completed] = useState(false);
  let svgWidth = galleryRef.current?.scrollWidth;
  useEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;
    const path = svgPathRef.current;

    if (!container || !gallery || !path) return;

    const totalWidth = gallery.scrollWidth;
    const windowWidth = window.innerWidth;

    // Set up the SVG path initial state
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // Create the scroll animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Animate SVG path fill
            const progress = self.progress;
            setProgress(progress);
            path.style.strokeDashoffset = pathLength - progress * pathLength;

            // Calculate which image is currently in view
            const imageIndex = Math.min(
              Math.floor(progress * images.length),
              images.length - 1
            );

            // Update year and message
            setCurrentYear(images[imageIndex].year);
            setCurrentMessage(images[imageIndex].message);

            // Set isFixed when scrolling is in progress
            setIsFixed(progress > 0 && progress < 1);
          },
        },
      })
      .to(gallery, {
        x: -(totalWidth - windowWidth),
        ease: "none",
      });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  useEffect(() => {
    const animation = gsap.timeline({
      onComplete: () => {
        setAnimation1Completed(true); // Trigger second animation
      },
    });

    animation.fromTo(
      ".story-animation-1",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  console.log(svgWidth);
  return (
    <div className="relative">
      <div className="pt-[128px] pb-[107px] text-center">
        <SubHeading className="pb-6 text-2xl">
          From the welcoming comfort at your doorstep to the serene spaces
          designed just for you
        </SubHeading>
        <Heading className="">
          At Vitu, Every Design Feels Like Home—Because It Is
        </Heading>
      </div>
      <div className="relative flex justify-center items-center w-full h-full">
  <svg
    className={`${
      isFixed ? "fixed" : "absolute"
    } bottom-0 left-0 w-full h-full pointer-events-none z-20`}
    viewBox="0 0 100 100" // You can adjust this based on the actual width of your path
    preserveAspectRatio="none"
  >
    <path
      ref={svgPathRef}
      d="M87.0383 49.8118H89.4849V48.3495H97.4602V49.8118H100.525M74.7705 49.9067H77.7308C77.8887 49.5141 78.1456 49.2829 79.0194 48.8433C78.958 48.4813 78.8091 48.0488 79.1239 47.7715C79.481 47.457 80.0027 47.3704 80.2906 47.6718C80.5785 47.9731 80.4623 48.648 80.2906 49.1756C80.6152 49.4313 80.7771 49.5837 80.9523 49.9067H81.3006C81.4925 49.6065 81.6266 49.4653 81.91 49.2753C81.389 48.6508 81.3947 48.0743 81.91 47.7133C82.2883 47.4484 82.5686 47.4748 82.92 47.7715C83.3173 48.1069 83.2353 48.6692 83.129 49.1756C83.6066 49.3086 83.8387 49.4519 84.2086 49.807H88.4227M76.094 49.9115H70.6958L67.335 48.4659L65.8201 49.1388L65.3064 49.0558L62.5812 50.2605H62.0588M49.3034 49.4294H54.5623L54.78 49.3213C54.6199 48.7432 54.6379 48.239 55.0412 47.8258C55.4217 47.4359 55.661 47.4723 56.2601 47.7095C56.486 47.4772 56.6506 47.3821 57.0002 47.2941C57.5006 47.2123 57.8641 47.2265 58.1669 47.5766C58.3574 47.7969 58.3667 47.938 58.4019 48.1914C58.4649 48.6448 58.2803 48.9059 58.0798 49.3213C58.5121 49.6246 58.7128 49.8281 58.9853 50.2602H62.6247M37.1576 50.9168H39.9089C39.887 51.3274 39.977 51.488 40.2746 51.6812C40.5347 52.1453 40.7605 52.1768 41.2497 51.9803C41.6696 52.2638 41.9014 52.292 42.2858 51.839C42.6473 51.8784 42.8176 51.8062 43.0869 51.5815C43.9252 51.3694 43.967 51.0762 43.6876 50.41C44.0134 50.1046 43.8812 49.8974 43.7224 49.4296H50.2873M12.0823 49.6373H14.8075V49.0973L20.3624 47.0368L21.9296 49.6373L24.9247 51.2325M-0.525024 49.7266H3.1405C3.55671 49.4562 3.82874 49.3659 4.35944 49.2904L4.45521 49.0162C4.12495 48.4441 4.16948 48.3292 4.23754 47.8946C4.29173 47.5485 4.36744 47.3627 4.66417 47.0471C5.18279 46.7152 5.64025 46.7539 6.1356 47.0471C6.47227 47.4653 6.56223 47.7783 6.56223 48.0774C6.56223 48.3765 6.46662 48.76 6.30103 49.1076C6.85113 49.2442 7.13221 49.3594 7.58092 49.6394H12.387M21.9644 49.6706L25.865 51.7144V51.623H26.0391L26.161 51.0913H26.875V50.9833H27.5193L28.4683 51.0913V51.2242H29.0865V51.0913H29.5305V50.9168H30.079V50.6177H30.2706V50.1192H31.3589V50.9168H37.2272"
      stroke="#CFA484"
      strokeWidth="2"
      fill="none"
    />
  </svg>
</div>


      {/* Year Display (Fixed only when in view) */}
      <YearDisplay number={currentYear} isFixed={isFixed} />
      <MessageDisplay message={currentMessage} isFixed={isFixed} />
      {/* Animation 1 (Triggers Animation 2 after completion) */}

      <div ref={containerRef} className="h-[100vh] w-full bg-black/5 relative">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Image Gallery */}
        <div
          ref={galleryRef}
          className="flex absolute top-1/2 -translate-y-1/2 will-change-transform"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-none w-[100vw] h-[100vh] overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 gallery-image z-10">
                <Image
                  width={1594}
                  height={904}
                  src={image.src}
                  alt={`Landscape ${image.year}`}
                  className="w-full h-full object-fill"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="h-2 w-2 bg-primary rounded-full absolute -top-[150px] left-1/2 transform -translate-x-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
