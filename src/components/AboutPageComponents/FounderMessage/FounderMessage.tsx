"use client";

// ============= Library Imports =============
import YouTube from "react-youtube";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // ============= Fetch Video URL =============
  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch("/api/youtube-video");
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Failed to load");
        if (result.data.length > 0) {
          setVideoData(result.data[0]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideo();
  }, []);

  // ============= Extract Video ID from URL =============
  const getVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // ============= Render =============
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-10 lg:pt-48 lg:pb-40 xl:pt-40 xl:pb-40 2xl:h-screen">
      {/* Video Wrapper */}
      <div className="w-[259px] h-[324px] md:w-[850px] md:h-[600px] lg:w-[1150px] lg:h-[657px] xl:w-[1355px] xl:h-[775px] 2xl:w-[90%] 2xl:h-screen rounded-2xl overflow-hidden">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            Loading...
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center text-red-500">
            {error}
          </div>
        ) : videoData && getVideoId(videoData.videoUrl) ? (
          <YouTube
            videoId={getVideoId(videoData.videoUrl) as string} // Type assertion since we check for null
            opts={{
              width: "100%",
              height: "100%",
              ...opts,
            }}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            No video available
          </div>
        )}
      </div>

      {/* Play Button */}
      <button
        className="mt-10 flex items-center justify-center gap-3 bg-[#815C46] text-white text-base font-medium rounded-full px-6 py-2 2xl:px-8 2xl:py-4 2xl:text-2xl"
        onClick={() =>
          videoData &&
          window.open(videoData.videoUrl, "_blank", "noopener,noreferrer")
        }
      >
        Watch the Full Video
        <PlayIcon />
      </button>
    </div>
  );
}
