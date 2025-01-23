// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Typography from "../Typography/Typography";

// gsap.registerPlugin(ScrollTrigger);

// type Image = {
//   id: number;
//   url: string;
//   className: string;
//   startPosition: { x?: number; y?: number };
// };

// const images: Image[] = [
//   {
//     id: 1,
//     url: "/images/exploreProjectImages/1.png",
//     className: "absolute top-[644px] left-[70px] w-[348px] h-[435px] rounded-[20px]",
//     startPosition: { x: -100 },
//   },
//   {
//     id: 2,
//     url: "/images/exploreProjectImages/2.png",
//     className: "absolute top-[600px] right-[56px] w-[348px] h-[435px] rounded-[20px]",
//     startPosition: { x: 100 },
//   },
//   {
//     id: 3,
//     url: "/images/exploreProjectImages/3.png",
//     className: "absolute top-[1474px] left-[42px] w-[348px] h-[435px] rounded-[20px]",
//     startPosition: { x: -100 },
//   },
//   {
//     id: 4,
//     url: "/images/exploreProjectImages/5.png",
//     className: "absolute top-[1645px] right-[42px] w-[348px] h-[435px] rounded-[20px]",
//     startPosition: { x: 100 },
//   },
//   {
//     id: 5,
//     url: "/images/exploreProjectImages/4.png",
//     className: "absolute top-[1701px] w-[297px] h-[371px] left-[523px] rounded-[20px]",
//     startPosition: { y: 100 },
//   },
// ];

// const ExploreProjects: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
//   const textRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     // Set initial states
//     gsap.set(imagesRef.current, (index: number) => ({
//       x: images[index].startPosition.x || 0,
//       y: images[index].startPosition.y || 0,
//       opacity: 0,
//     }));
  
//     gsap.set([textRef.current, buttonRef.current], {
//       opacity: 0,
//       y: 50,
//     });
  
//     // Create a timeline for the text and button initial animation
//     const textTimeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top center",
//         end: "top center",
//         once: true,
//       },
//     });
  
//     textTimeline.to([textRef.current, buttonRef.current], {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power3.out",
//       stagger: 0.2,
//     });
  
//     // Create scroll triggers for images
//     imagesRef.current.forEach((image, index) => {
//       gsap.to(image, {
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: `top+=${400 + index * 100} center`,
//           end: "bottom bottom",
//           toggleActions: "play none none reverse",
//         },
//         x: 0,
//         y: 0,
//         opacity: 1,
//         duration: 1.2,
//         ease: "power3.out",
//       });
//     });
  
//     // Ensure sticky text stays visible
//     ScrollTrigger.create({
//       trigger: sectionRef.current,
//       start: "top top",
//       end: "bottom bottom", // Keep the text section pinned throughout the scrolling
//       pin: textRef.current,
//       pinSpacing: true, // Ensure pin spacing is added
//     });
//   }, []);
  

//   return (
//     <div className="h-[2835px]">
//       <div
//         ref={sectionRef}
//         className="relative min-h-screen"
//       >
//         <div className="relative w-full">
//           <div>
//             {images.map((image, index) => (
//               <img
//                 key={image.id}
//                 ref={(el) => {
//                   imagesRef.current[index] = el;
//                 }}
//                 src={image.url}
//                 alt={`Image ${image.id}`}
//                 className={`${image.className} object-cover`}
//               />
//             ))}
//           </div>

//           <div
//             ref={textRef}
//             className="fixed  w-full flex flex-col items-center justify-center z-10 text-center"
//           >
//             <Typography variant="custom" className="text-[120px] text-customBrown font-freightNeoMedium pb-[39px]">
//               A New Home,
//               <br />A New Way of Life
//             </Typography>
//             <button
//               ref={buttonRef}
//               className="items-center w-[287px] h-[56px] rounded-[36px] border-[2px] border-customBrown text-customBrown text-[22px] font-FreightNeoProBold hover:bg-customBrown hover:text-white transition-colors duration-300"
//             >
//               Explore the Project Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExploreProjects;




import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typography from "../Typography/Typography";

gsap.registerPlugin(ScrollTrigger);

type Image = {
  id: number;
  url: string;
  className: string;
  startPosition: { x?: number; y?: number };
};

const images: Image[] = [
  {
    id: 1,
    url: "/images/exploreProjectImages/1.png",
    className: "absolute top-[644px] left-[70px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: -100 },
  },
  {
    id: 2,
    url: "/images/exploreProjectImages/2.png",
    className: "absolute top-[600px] right-[56px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: 100 },
  },
  {
    id: 3,
    url: "/images/exploreProjectImages/3.png",
    className: "absolute top-[1474px] left-[42px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: -100 },
  },
  {
    id: 4,
    url: "/images/exploreProjectImages/5.png",
    className: "absolute top-[1645px] right-[42px] w-[348px] h-[435px] rounded-[20px]",
    startPosition: { x: 100 },
  },
  {
    id: 5,
    url: "/images/exploreProjectImages/4.png",
    className: "absolute top-[1701px] w-[297px] h-[371px] left-[523px] rounded-[20px]",
    startPosition: { y: 100 },
  },
];

const ExploreProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Set initial states
    // gsap.set(imagesRef.current, (index: number) => ({
    //   x: images[index].startPosition.x || 0,
    //   y: images[index].startPosition.y || 0,
    //   opacity: 0,
    // }));
  
    // gsap.set([textRef.current, buttonRef.current], {
    //   opacity: 0,
    //   y: 50,
    // });
  
    // // Create a timeline for the text and button initial animation
    // const textTimeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top center",
    //     end: "top center",
    //     once: true,
    //   },
    // });
  
    // textTimeline.to([textRef.current, buttonRef.current], {
    //   opacity: 1,
    

    // });
  
    // Create scroll triggers for images
    // imagesRef.current.forEach((image, index) => {
    //   gsap.to(image, {
    //     scrollTrigger: {
    //       trigger: sectionRef.current,
    //       start: `top+=${400 + index * 100} center`,
    //       end: "bottom bottom",
    //       toggleActions: "play none none reverse",
    //     },
    //     x: 0,
    //     y: 0,
    //     opacity: 1,
    //     duration: 1.2,
    //     ease: "power3.out",
    //   });
    // });
  
    // Ensure sticky text stays visible
    // ScrollTrigger.create({
    //   trigger: sectionRef.current,
    //   start: "top top",
    //   end: "bottom bottom", // Keep the text section pinned throughout the scrolling
    //   pin: textRef.current,
    //   pinSpacing: true, // Ensure pin spacing is added
    // });
  }, []);
  

  return (
    <div className="h-[2835px]">
      <div
        ref={sectionRef}
        className="relative min-h-screen"
      >
        <div className="relative w-full">
          <div>
            {images.map((image, index) => (
              <img
                key={image.id}
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}
                src={image.url}
                alt={`Image ${image.id}`}
                className={`${image.className} object-cover`}
              />
            ))}
          </div>

          <div
            // ref={textRef}
            className="w-full flex flex-col items-center justify-center z-10 text-center"
          >
            <Typography variant="custom" className="text-[120px] text-customBrown font-freightNeoMedium pb-[39px]">
              A New Home,
              <br />A New Way of Life
            </Typography>
            <button
              ref={buttonRef}
              className="items-center w-[287px] h-[56px] rounded-[36px] border-[2px] border-customBrown text-customBrown text-[22px] font-FreightNeoProBold hover:bg-customBrown hover:text-white transition-colors duration-300"
            >
              Explore the Project Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreProjects;