import { useLottie } from "lottie-react";
import animationData from "@/animationAssets/storySection1.json";

const StorySectionAnimation1 = () => {
  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
  });

  return View;
};

export default StorySectionAnimation1;
