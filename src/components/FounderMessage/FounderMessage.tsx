import YouTube from "react-youtube";
import { PlayIcon } from "../Icons/Icons";

export default function FounderMessage() {
  const opts = {
    playerVars: {
      iv_load_policy: 3, // Hides video annotations
      rel: 0, // Prevents showing related videos
      modestbranding: 1, // Minimizes YouTube branding
      playsinline: 1, // Allows inline playback on iOS
      autoplay: 0, // Disables autoplay
    },
  };

  return (
    <div className="flex justify-center flex-col items-center lg:pt-[200px] lg:pb-[160px] xl:pt-[160px] xl:pb-[164px] sm:pb-[43px] sm:pt-[34px]">
      <div className="xl:w-[1355.89px] xl:h-[775.07px] lg:w-[1150.28px] lg:h-[657.54px] rounded-2xl overflow-hidden">
        {/* Wrapper with rounded corners and hidden overflow */}
        <YouTube
          videoId="UKag4LVAEdU"
          opts={{
            width: "100%",
            height: "100%",
            ...opts,
          }}
          className="w-full h-full"
        />
      </div>
      <div>
        <button
          className="mt-[60px] bg-[#815C46] text-white pr-1  pl-[18px] py-[3px] rounded-full flex items-center justify-center gap-[11px] text-base font-freightNeoMedium"
          onClick={() => console.log("Button clicked")}
        >
          Watch the Full Video
          <PlayIcon />
        </button>
      </div>
    </div>
  );
}
