"use client";

import YouTube from "react-youtube";
import { PlayIcon } from "@/components/Icons/Icons";

interface YouTubeOptions {
  playerVars: {
    iv_load_policy: number;
    rel: number;
    modestbranding: number;
    playsinline: number;
    autoplay: number;
  };
}

export default function FounderMessage(): React.ReactElement {
  const opts: YouTubeOptions = {
    playerVars: {
      iv_load_policy: 3,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      autoplay: 0,
    },
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[34px] pb-[43px] lg:pt-[200px] lg:pb-[160px] xl:pt-[160px] xl:pb-[164px] 2xl:h-[100vh]">
      <div className="w-[259px] h-[324px] md:w-[850px] md:h-[600px] lg:w-[1150px] lg:h-[657px] xl:w-[1355px] xl:h-[775px] 2xl:w-[90%]  2xl:h-[100vh] rounded-2xl overflow-hidden">
        <YouTube
          videoId="b5hVv7QAXmQ"
          opts={{
            width: "100%",
            height: "100%",
            ...opts,
          }}
          className="w-full h-full"
        />
      </div>
      <button
        className="mt-[60px] flex items-center justify-center gap-[11px] bg-[#815C46] text-white text-base font-freightNeoMedium rounded-full pl-[18px] pr-[10px] py-[3px] 2xl:pt-4 2xl:pb-4 2xl:pl-[28px] 2xl:pr-[20px] 2 2xl:text-[2rem]"
        onClick={() => window.open('https://www.youtube.com/watch?v=b5hVv7QAXmQ', '_blank', 'noopener,noreferrer')}
      >
        Watch the Full Video
        <PlayIcon />
      </button>
    </div>
  );
}
