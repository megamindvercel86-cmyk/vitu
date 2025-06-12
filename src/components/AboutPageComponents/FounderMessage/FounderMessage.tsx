"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";

export default function FounderMessage(): React.ReactElement {
  const [showVideo, setShowVideo] = useState(false);

  const videoId = "PS3l9zTvLgI";
  const customThumbnail =
    "https://res.cloudinary.com/dvandhsai/image/upload/v1746771292/sy6cbijjnks8v018xurj.png";

  return (
    <div className="flex flex-col items-center justify-center pb-32 lg:py-32 2xl:h-screen">
      {/* Video or Thumbnail */}
      <Typography
          variant="custom"
          className="text-[1.5rem] sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium text-center text-customBrown lg:pb-[84px] sm:pb-[94px]"
        >
         Trusted by Families Like Yours 
        </Typography>

      <div className="w-full max-w-7xl aspect-video rounded-2xl overflow-hidden relative">
        {!showVideo ? (
          <div
            className="w-full h-full cursor-pointer"
            onClick={() => setShowVideo(true)}
          >
            <img
              src={customThumbnail}
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
          
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>

      {/* Watch on YouTube Button */}
      {/* <button
        aria-label="Watch the full video"
        className="md:mt-10 flex items-center justify-center gap-3 bg-[#815C46] text-white text-base font-medium rounded-full px-6 py-2 2xl:px-8 2xl:py-4 2xl:text-2xl"
        onClick={() =>
          window.open(
            "https://youtu.be/PS3l9zTvLgI?si=rJqqBv6ZHni3I-xx",
            "_blank",
            "noopener,noreferrer"
          )
        }
      >
        Watch the Full Video
        <PlayIcon />
      </button> */}
    </div>
  );
}
