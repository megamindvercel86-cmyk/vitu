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
    const pathLength = path.getTotalLength();
    
    // Set initial path state
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    // Create timeline for gallery scroll
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setProgress(progress);
          path.style.strokeDashoffset = `${pathLength - progress * pathLength}`;

          const imageIndex = Math.min(
            Math.floor(progress * images.length),
            images.length - 1
          );
          setCurrentYear(images[imageIndex].year);
          setCurrentMessage(images[imageIndex].message);
          setIsFixed(progress > 0 && progress < 1);
        },
      },
    });

    // Animate gallery horizontally
    scrollTimeline.to(gallery, {
      x: () => -(totalWidth - windowWidth),
      ease: "none"
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

      <div ref={containerRef} className="h-[100vh] w-full bg-black/5 relative">
          <svg
            className={`absolute w-full h-[500px] pointer-events-none z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              ref={svgPathRef}
              d="M-1.57178 4.26862H2.1611C2.59209 3.96822 2.85971 3.85659 3.40539 3.80646L3.51093 3.48872C3.26319 3.10876 3.20305 2.57265 3.29429 2.26886C3.65869 0.642399 4.90299 1.17567 5.16518 1.34453C5.42737 1.5134 5.60959 1.97065 5.64512 2.30442C5.68064 2.63818 5.5518 3.33096 5.4007 3.5887C5.98451 3.75061 6.27208 3.87743 6.71165 4.17086H14.0708V3.58426L19.7501 1.38009L21.3676 4.17086L25.3849 6.40169V6.28615H25.5449L25.6693 5.71733H26.3981V5.60179H27.0736L28.0157 5.71733V5.85954H28.6468V5.71733H29.1V5.51291H29.6688V5.21962H29.8555V4.65968H31.002V5.51291H39.6854C39.7113 5.95801 39.7871 6.14857 40.0676 6.34837C40.3405 6.80741 40.5602 6.87538 41.063 6.66833C41.5924 6.99067 41.8176 6.93472 42.1207 6.50835C42.4569 6.55528 42.6353 6.49791 42.9294 6.2506C43.8126 5.9866 43.8199 5.66758 43.5694 5.00631C43.8488 4.68445 43.8155 4.43497 43.5694 3.922H54.6169L54.8658 3.81534C54.6715 2.84921 54.9099 2.08028 55.7279 1.90447C55.9461 1.85757 56.3234 2.05556 56.3856 2.1C56.9531 1.61471 57.7343 1.42675 58.1543 1.78004C58.672 2.29553 58.7488 2.82466 58.2876 3.81534C58.7006 4.15895 58.9062 4.37301 59.1941 4.81966H62.8737L65.6289 3.53982L66.1622 3.6287L67.7175 2.89101L71.1216 4.43749H78.3296C78.4396 4.03385 78.7324 3.78614 79.6361 3.30874C79.5086 2.70045 79.5144 2.48858 79.6361 2.29553C79.7876 2.09744 79.8875 2.02074 80.0849 1.93113C80.3569 1.82699 80.5617 1.83131 80.7737 1.93113C80.901 1.99106 81.1099 2.22441 81.1403 2.64438C81.1606 2.9239 81.063 3.32354 80.9515 3.67314C81.2661 3.93271 81.4162 4.09593 81.6092 4.43749H81.9647C82.183 4.09805 82.3176 3.96437 82.569 3.77979C82.1747 3.16857 82.0394 2.80602 82.3081 2.35051C82.6956 1.84266 82.9712 1.81182 83.5289 2.09111C83.9249 2.35818 83.9738 2.73474 83.8578 3.67314C84.3128 3.80976 84.5546 3.94768 84.951 4.3575H90.2659V2.77547H98.4249V4.3575H101.571"
              stroke="#CFA484"
              strokeWidth="2"
              fill="none"
              className="absolute"
            />
          </svg>
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

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

      <YearDisplay number={currentYear} isFixed={isFixed} />
      <MessageDisplay message={currentMessage} isFixed={isFixed} />
    </div>
  );
}
