"use client";
import AnimatedHeading from "@/components/VaikuntamCityElite/landing-page/AnimatedHeading";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {  useRef, useState } from "react";

export default function ThankYouPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.setAttribute("controls", "true");
      setIsPlaying(true); // Hide the play icon
    }
  };

  return (
    <>
   
          <section className=" bg-[#F3EAE1] relative z-[80] ">
           <div className="container px-12 lg:px-0 mx-auto lg:border-l lg:border-r border-[#1C1213] py-10 lg:py-14 h-full ">
              <Link href="/vaikuntam-city-elite/landing-page"><Image
               src="/svgs/vituEliteLogo2.svg"
               alt="vitu logo"
               width={313}
               height={88}
               className="mx-auto w-[14rem] h-auto lg:w-[20rem] object-contain"
             />
             </Link>
           </div>
         </section>
         <section className=" bg-[#F3EAE1] relative z-[80]  lg:h-full">
           <div className="container px-12 lg:px-0 mx-auto lg:border-l lg:border-r border-[#1C1213]  h-full flex items-center justify-center flex-col">
                <div className=" lg:px-0   relative">
               <video
                 ref={videoRef}
                 poster="/images/vaikuntamCityEliteLandingPage/thankyou-video-placeholder.jpg"
                 className="mx-auto w-full rounded-xl max-w-[800px] h-auto "
               >
                 <source
                   src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/elitevideos%2FELITE%20Walkthrough%20video.mp4?alt=media&token=84a994cd-64ad-417f-9883-f31c4f2464cf"
                   type="video/mp4"
                 />
                 Your browser does not support the video tag.
               </video>
               {!isPlaying && (
                 <img
                   src="/svgs/play-button.svg"
                   alt="play button"
                   width={134}
                   height={134}
                   onClick={handlePlayVideo}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-80 h-10 w-10 lg:h-24 lg:w-24 z-10"
                 />
               )}
             </div>
             <div className="  py-8 lg:py-[55px] lg:px-12 ">
               <AnimatedHeading className="text-[#37121A] text-[26px] lg:text-[45px] lg2:text-[58px] font-FreightNeoProNormal leading-[100%] text-center">
                 Thank You for Showing Interest
                 <br className="hidden lg:block" /> in Vaikuntam City Elite
               </AnimatedHeading>
   
               <p className="text-[#37121A]/60 font-FreightNeoProNormal text-base lg:text-[24px] lg2:text-[28px] leading-snug max-w-2xl lg2:max-w-4xl text-pretty flex-1 text-center mt-8 lg:mt-12 mx-auto">
                 Your details have been successfully received. <br />
                 <br />
                 Our team will get in touch with you shortly to share more information and assist you further.
               </p>
             </div>
           </div>
         </section>
         {/* <section className="bg-[#1C1213] relative z-50 ">
           <div className="py-16 lg:py-28 container mx-auto lg:border-l lg:border-r border-[#C7784D]">
             <div className="px-4 lg:px-12">
               <AnimatedHeading className="text-[#E0D9C7] text-center font-FreightNeoProNormal mt-3 lg:mt-1 text-[32px] leading-[100%] lg:text-[42px] lg2:text-5xl">
                 Watch The Project Walkthrough
               </AnimatedHeading>
             </div>
             <div className="px-12 lg:px-0 mt-8 lg:mt-20 relative">
               <video
                 ref={videoRef}
                 poster="/images/vaikuntamCityEliteLandingPage/thankyou-video-placeholder.jpg"
                 className="mx-auto w-full max-w-[1110px] h-auto"
               >
                 <source
                   src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/elitevideos%2FELITE%20Walkthrough%20video.mp4?alt=media&token=84a994cd-64ad-417f-9883-f31c4f2464cf"
                   type="video/mp4"
                 />
                 Your browser does not support the video tag.
               </video>
               {!isPlaying && (
                 <img
                   src="/svgs/play-button.svg"
                   alt="play button"
                   width={134}
                   height={134}
                   onClick={handlePlayVideo}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-80 h-10 w-10 lg:h-24 lg:w-24 z-10"
                 />
               )}
             </div>
           </div>
         </section> */}
         <footer className="bg-[#1A1212] text-center relative overflow-hidden">
           <div className="container mx-auto px-4 lg:px-0 py-6 lg:py-10 lg:border-l lg:border-r lg:border-b border-[#C7784D]">
             <Image
               src={"/svgs/viturealtyfooterlogo.svg"}
               alt="Vitu Realty Logo"
               width={167}
               height={53}
               className="mx-auto w-[8rem] h-full lg:w-[13rem] object-contain"
             />
           </div>
           <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center lg:px-12 py-4  lg:border-l lg:border-r  border-[#C7784D]">
             <p className="text-[#E0D9C766] font-FreightNeoProNormal text-xs">
               © <span className="font-CandideCondensedNormal">{new Date().getFullYear()}</span> Vitu Realty | All rights reserved
             </p>
               <div className="flex mt-4 lg:mt-0 flex-col lg:flex-row gap-2 text-[#E0D9C766] font-FreightNeoProNormal text-xs relative z-20">
               Designed and Maintained by{" "}
               <a href="https://megamind.studio" target="_blank" rel="noopener noreferrer" className="text-[#E0D9C766] hover:underline  font-FreightNeoProNormal text-xs">
                 Megamind Studios
               </a>
             </div>
             <div className="flex mt-4 lg:mt-0 flex-col lg:flex-row gap-2 text-[#E0D9C766] font-FreightNeoProNormal text-xs relative z-20">
               <Link href="/terms-of-service">
                 <p className="cursor-pointer">Terms of Service</p>
               </Link>
             </div>
           </div>
         </footer>
    </>
  );
}
