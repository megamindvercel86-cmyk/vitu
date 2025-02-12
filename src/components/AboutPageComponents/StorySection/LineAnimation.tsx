"use client"

import { useLottie, useLottieInteractivity } from "lottie-react";
import lineAnimationData from "@/animationAssets/line-animation.json";

const style = {
  height: 300,
  border: 3,
  borderStyle: "solid",
  borderRadius: 7,
};

const options = {
  animationData: lineAnimationData,
};

const LineAnimation = () => {
  const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0, 1],
        type: "seek",
        frames: [0, 150],
      },
    ],
  });

  return Animation;
};

export default LineAnimation;