import { useLottie } from "lottie-react";
import animationData from "@/animationAssets/storySection2.json";

const StorySectionAnimation2 = () => {
  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
  });

  return View;
};

export default StorySectionAnimation2;
