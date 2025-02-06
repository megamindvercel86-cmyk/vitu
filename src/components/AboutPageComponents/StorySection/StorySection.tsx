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
      
      <div ref={containerRef} className="h-[100vh] w-full bg-black/5 relative">
        <div className="relative flex justify-center items-center w-full h-full">
          <svg
            className={`${
              isFixed ? "fixed" : "absolute"
            } w-full h-[200px] pointer-events-none z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              ref={svgPathRef}
              d="M0 54.6723H3.61913C4.03699 49.4478 4.29645 47.5064 4.82551 46.6345L4.92783 41.1086C4.68763 34.5006 4.62933 25.1767 4.71779 19.8935C5.07109 -8.39316 6.27747 0.881152 6.53167 3.81803C6.78587 6.75491 6.96254 14.7071 6.99698 20.5118C7.03143 26.3165 6.90651 38.3649 6.76002 42.8475C7.32603 45.6633 7.60484 47.8688 8.03102 52.972H15.1659V42.7702L20.6721 4.43631L22.2404 52.972L26.1353 91.7696V89.7601H26.2904L26.411 79.8675H27.1176V77.8581H27.7725L28.6859 79.8675V82.3407H29.2977V79.8675H29.7372V76.3123H30.2887V71.2115H30.4696V61.4734H31.5812V76.3123H40C40.0251 84.0533 40.0986 87.3674 40.3705 90.8421C40.6352 98.8256 40.8482 100.008 41.3356 96.4067C41.8489 102.013 42.0673 101.04 42.3611 93.6244C42.687 94.4406 42.86 93.4428 43.1452 89.1418C44.0015 84.5505 44.0085 79.0022 43.7656 67.5017C44.0365 61.9042 44.0043 57.5653 43.7656 48.6439H54.4765L54.7178 46.7891C54.5295 29.9865 54.7605 16.6138 55.5536 13.5561C55.7652 12.7404 56.131 16.1838 56.1913 16.9567C56.7415 8.51673 57.4989 5.24781 57.9061 11.3921C58.408 20.3572 58.4825 29.5597 58.0353 46.7891C58.4358 52.7649 58.6351 56.4878 58.9143 64.2557H62.4817L65.153 41.9973L65.67 43.5431L67.1779 30.7136L70.4782 57.6091H77.4666C77.5733 50.5892 77.8572 46.2811 78.7333 37.9785C78.6097 27.3994 78.6153 23.7147 78.7333 20.3572C78.8802 16.9122 78.977 15.5783 79.1685 14.0198C79.4322 12.2086 79.6308 12.2837 79.8363 14.0198C79.9597 15.0621 80.1622 19.1203 80.1917 26.4242C80.2114 31.2856 80.1168 38.2359 80.0086 44.3159C80.3136 48.8302 80.4592 51.669 80.6463 57.6091H80.991C81.2026 51.7058 81.3331 49.3808 81.5769 46.1708C81.1946 35.5407 81.0634 29.2355 81.3239 21.3134C81.6996 12.4811 81.9668 11.9448 82.5075 16.8021C82.8914 21.4469 82.9388 27.9958 82.8264 44.3159C83.2675 46.692 83.5019 49.0906 83.8863 56.218H89.0392V28.7041H96.9496V56.218H100"
              stroke="#CFA484"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
        
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div ref={galleryRef} className="flex absolute top-1/2 -translate-y-1/2 will-change-transform">
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
