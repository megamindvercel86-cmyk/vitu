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
      {/* Heading */}
      <Typography
        variant="custom"
        className="text-[1.5rem] py-8 md:py-0 sm:text-[1.5rem] md:text-[2.5rem] lg2:text-[3.5rem] 2xl:text-[5rem] font-freightNeoMedium text-center text-customBrown lg:pb-[84px] sm:pb-[94px]"
      >
        Trusted by Families Like Yours
      </Typography>

      {/* Video or Thumbnail */}
      <div className="w-full px-8 md:px-16 xl:max-w-7xl aspect-video rounded-3xl overflow-hidden relative">
        {!showVideo ? (
          <div
            className="w-full h-full cursor-pointer rounded-3xl relative"
            onClick={() => setShowVideo(true)}
          >
            <img
              src={customThumbnail}
              alt="Video Thumbnail"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-[120px] h-[120px]"
                viewBox="0 0 140 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M70 0.411255C31.6264 0.411255 0.411255 31.6294 0.411255 70C0.411255 108.371 31.6264 139.589 70 139.589C108.374 139.589 139.589 108.371 139.589 70C139.589 31.6294 108.374 0.411255 70 0.411255ZM97.6645 72.438L57.0712 98.5338C56.5955 98.8424 56.0461 98.9954 55.5024 98.9954C55.0267 98.9954 54.5453 98.8763 54.115 98.6415C53.1805 98.1318 52.6028 97.1576 52.6028 96.0958V43.9042C52.6028 42.8424 53.1805 41.8682 54.115 41.3585C55.0324 40.8545 56.182 40.8855 57.0712 41.4662L97.6645 67.562C98.4914 68.0942 98.9954 69.0146 98.9954 70C98.9954 70.9854 98.4914 71.9055 97.6645 72.438Z"
                  fill="#E8E8E8"
                />
              </svg>
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full block rounded-2xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>

      {/* Optional: Watch on YouTube Button (commented) */}
      {/* 
      <button
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
      </button> 
      */}
    </div>
  );
}
