"use client";

import Lottie from "react-lottie-player";
import animationData from "@/app/lotties/lotieloader.json";
import mobileAnimationData from "@/app/lotties/mobileLotie.json"


export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="hidden md:block">
      <Lottie
        animationData={animationData}
        play
        loop={false}
       className="md:w-full md:h-full "
      />
      </div>
      <div className="md:hidden">
      <Lottie
        animationData={mobileAnimationData}
        play
        loop={false}
        className="w-[174%] h-[400%]" 
      />
      </div>
    </div>
  );
}
