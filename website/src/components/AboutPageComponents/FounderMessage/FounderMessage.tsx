"use client";

// ============= Library Imports =============
import YouTube from "react-youtube";

// ============= Component Imports =============
import { PlayIcon } from "@/components/Icons/Icons";

// ============= Types & Interfaces =============
interface YouTubeOptions {
  playerVars: {
    iv_load_policy: number;
    rel: number;
    modestbranding: number;
    playsinline: number;
    autoplay: number;
  };
}

/**
 * FounderMessage Component
 * Displays an embedded YouTube video with a play button to watch the full video.
 *
 * Features:
 * 1. Responsive YouTube video wrapper
 * 2. Styled button with PlayIcon
 * 3. Tailwind CSS optimized for different screen sizes
 *
 * @returns {React.ReactElement} The FounderMessage component
 */
export default function FounderMessage(): React.ReactElement {
  // ============= YouTube Options =============
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
    <div className="flex flex-col items-center justify-center pt-8 pb-10 lg:pt-48 lg:pb-40 xl:pt-40 xl:pb-40 2xl:h-screen">
      {/* Video Wrapper */}
      <div className="w-[259px] h-[324px] md:w-[850px] md:h-[600px] lg:w-[1150px] lg:h-[657px] xl:w-[1355px] xl:h-[775px] 2xl:w-[90%] 2xl:h-screen rounded-2xl overflow-hidden">
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
      
      {/* Play Button */}
      <button
        className="mt-10 flex items-center justify-center gap-3 bg-[#815C46] text-white text-base font-medium rounded-full px-6 py-2 2xl:px-8 2xl:py-4 2xl:text-2xl"
        onClick={() => window.open('https://www.youtube.com/watch?v=b5hVv7QAXmQ', '_blank', 'noopener,noreferrer')}
      >
        Watch the Full Video
        <PlayIcon />
      </button>
    </div>
  );
}