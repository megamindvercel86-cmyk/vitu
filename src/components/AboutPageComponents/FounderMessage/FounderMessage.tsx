"use client";

// ============= Library Imports =============
// import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import { YouTubeEmbed } from "@next/third-parties/google";
// ============= Component Imports =============
import { PlayIcon } from "@/components/Icons/Icons";
import VideoPlayer from "@/components/Common/VideoPlayer/page";

interface VideoData {
  id?: string;
  videoUrl: string;
}

/**
 * FounderMessage Component
 * Displays an embedded YouTube video with a play button to watch the full video.
 *
 * Features:
 * 1. Responsive YouTube video wrapper
 * 2. Styled button with PlayIcon
 * 3. Tailwind CSS optimized for different screen sizes
 * 4. Fetches video URL from API
 *
 * @returns {React.ReactElement} The FounderMessage component
 */
export default function FounderMessage(): React.ReactElement {
  // ============= State =============
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  // ============= Render =============
  return (
    <div className="flex flex-col items-center justify-center pb-32 lg:py-32     2xl:h-screen">
      {/* Video Wrapper */}
      <div className=" rounded-2xl overflow-hidden">
         <VideoPlayer
            videoUrl="https://res.cloudinary.com/dvandhsai/video/upload/v1746688204/fjfhm5y8jzcsjpccwxbd.mp4"
            youtubeUrl="https://youtu.be/PS3l9zTvLgI?si=6NMZo9kPJLBk6sPo"
            thumbnail="https://res.cloudinary.com/dvandhsai/image/upload/v1746687928/duofamyi5ruy7q2siuua.png"
            titleClassname="font-bold"
          />
      </div>

      {/* Play Button */}
      <button
        className="md:mt-10 flex items-center justify-center gap-3 bg-[#815C46] text-white text-base font-medium rounded-full px-6 py-2 2xl:px-8 2xl:py-4 2xl:text-2xl"
        onClick={() => videoData && window.open("https://youtu.be/PS3l9zTvLgI?si=6NMZo9kPJLBk6sPo", "_blank", "noopener,noreferrer")}
      >
        Watch the Full Video
        <PlayIcon />
      </button>
    </div>
  );
}
