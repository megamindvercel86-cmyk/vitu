"use client";
import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;       // The preview video (looping)
  youtubeUrl: string;     // The full video (modal)
  thumbnail?: string;
  titleClassname?: string;
  isYoutube?: boolean;    // If false, shows "Watch Full Video" button and custom player controls
}

export interface VideoPlayerRef {
  pause: () => void;
  play: () => void;
}

const NewVideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ videoUrl, youtubeUrl, thumbnail, isYoutube = false }, ref) => {

    // Refs
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const fullVideoRef = useRef<HTMLVideoElement | null>(null);

    // State
    const [isPlaying, setIsPlaying] = useState<boolean>(false); // Preview video state
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Full Video State (Modal)
    const [fullVideoPlaying, setFullVideoPlaying] = useState<boolean>(false);
    const [fullVideoProgress, setFullVideoProgress] = useState<number>(0);

    // Expose Play/Pause to parent via Ref
    useImperativeHandle(ref, () => ({
      pause: () => {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      play: () => {
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      },
    }));

    // --- Handlers ---

    const togglePreviewPlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleFullVideoPlay = () => {
      if (fullVideoRef.current) {
        if (fullVideoPlaying) {
          fullVideoRef.current.pause();
        } else {
          fullVideoRef.current.play();
        }
        setFullVideoPlaying(!fullVideoPlaying);
      }
    };

    const handleFullVideoProgress = () => {
      if (fullVideoRef.current) {
        const percent = (fullVideoRef.current.currentTime / fullVideoRef.current.duration) * 100;
        setFullVideoProgress(percent);
      }
    };

    const openModal = () => {
      // Pause preview
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }

      setIsModalOpen(true);

      // Auto-play full video after modal renders
      setTimeout(() => {
        if (fullVideoRef.current) {
          fullVideoRef.current.play()
            .then(() => setFullVideoPlaying(true))
            .catch((e) => console.error("Autoplay prevented:", e));
        }
      }, 100);
    };

    const closeModal = () => {
      if (fullVideoRef.current) {
        fullVideoRef.current.pause();
        fullVideoRef.current.currentTime = 0;
      }
      setFullVideoPlaying(false);
      setFullVideoProgress(0);
      setIsModalOpen(false);
    };

    return (
      <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 xl:px-0 py-10">

        {/* --- Preview Player --- */}
        <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-black">
          <video
            ref={videoRef}
            poster={thumbnail}
            className="w-full h-auto object-cover cursor-pointer"
            loop
            playsInline
            muted={false} // Ensure unmuted if user interacts
            onClick={togglePreviewPlay}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support video.
          </video>

          {/* Big Center Play Button (Visible when paused) */}
          {!isPlaying && (
            <div
              onClick={togglePreviewPlay}
              className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 cursor-pointer hover:bg-black/30 transition-all"
            >
              <svg className="w-[60px] h-[60px] md:w-[120px] md:h-[120px]" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M70 0.411255C31.6264 0.411255 0.411255 31.6294 0.411255 70C0.411255 108.371 31.6264 139.589 70 139.589C108.374 139.589 139.589 108.371 139.589 70C139.589 31.6294 108.374 0.411255 70 0.411255ZM97.6645 72.438L57.0712 98.5338C56.5955 98.8424 56.0461 98.9954 55.5024 98.9954C55.0267 98.9954 54.5453 98.8763 54.115 98.6415C53.1805 98.1318 52.6028 97.1576 52.6028 96.0958V43.9042C52.6028 42.8424 53.1805 41.8682 54.115 41.3585C55.0324 40.8545 56.182 40.8855 57.0712 41.4662L97.6645 67.562C98.4914 68.0942 98.9954 69.0146 98.9954 70C98.9954 70.9854 98.4914 71.9055 97.6645 72.438Z"
                  fill="#E8E8E8"
                />
              </svg>
            </div>
          )}

          {/* Bottom Bar Controls */}
          <div className="absolute bottom-0 w-full p-6 z-20 flex justify-end">
            {!isYoutube && (
              <div className="flex gap-4 items-center">

                {/* Watch Full Video Button */}
                <button
                  aria-label="Watch The Full Video"
                  className="text-white bg-transparent rounded-full border-white border py-2.5 px-4 hidden md:block cursor-pointer"
                  onClick={openModal}
                >
                  Watch the Full Video
                </button>

                {/* Mini Play/Pause with Progress Ring */}
                <div className="cursor-pointer relative" onClick={togglePreviewPlay}>
                  {/* Note: Logic simplified here, relying on preview play state */}
                  <PlayPauseButton isPlaying={isPlaying} progress={0} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- Full Screen Modal (Restored to Old Design) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black z-[100] bg-opacity-75 flex items-center justify-center">
            <div className="relative w-full md:h-screen bg-black rounded-3xl p-4 flex flex-col justify-center">

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-20 right-5 text-white text-2xl z-10 cursor-pointer"
                aria-label="Close Modal"
              >
                <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g style={{ mixBlendMode: "screen" }} opacity={0.8}>
                    <path d="M6.90177 7.6437C15.6841 -1.2601 29.9236 -1.26066 38.706 7.64301C47.4884 16.5469 47.4884 30.9839 38.706 39.8878C29.9236 48.7914 15.6841 48.7909 6.90177 39.8871C-1.88038 30.9832 -1.88038 16.5475 6.90177 7.6437ZM15.0618 15.9263C14.7103 16.2827 14.5125 16.7663 14.5125 17.2703C14.5126 17.7742 14.7103 18.2578 15.0618 18.6142L20.1427 23.7654L15.0618 28.9166C14.7103 29.2729 14.5126 29.7565 14.5125 30.2605C14.5125 30.7645 14.7103 31.248 15.0618 31.6044C15.4134 31.9608 15.8902 32.1613 16.3874 32.1613C16.8846 32.1613 17.3615 31.9608 17.713 31.6044L22.7939 26.4533L27.8748 31.6044C28.2263 31.9608 28.7034 32.1612 29.2005 32.1613C29.6976 32.1613 30.1745 31.9608 30.5261 31.6044C30.8776 31.248 31.0754 30.7645 31.0754 30.2605C31.0753 29.7565 30.8776 29.2729 30.5261 28.9166L25.4451 23.7654L30.5261 18.6142C30.8776 18.2578 31.0753 17.7742 31.0754 17.2703C31.0754 16.7662 30.8776 16.2827 30.5261 15.9263C30.1745 15.57 29.6976 15.3694 29.2005 15.3694C28.7034 15.3695 28.2263 15.57 27.8748 15.9263L27.8838 15.9354L22.8029 21.0865L17.713 15.9263C17.3615 15.5699 16.8846 15.3694 16.3874 15.3694C15.8902 15.3694 15.4134 15.5699 15.0618 15.9263Z" fill="white" />
                  </g>
                </svg>
              </button>

              {/* Modal Video Player */}
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={fullVideoRef}
                  className="w-full md:h-full md:object-contain"
                  playsInline
                  loop
                  onTimeUpdate={handleFullVideoProgress}
                // Removed onClick toggle to match old behavior or keep it simple
                >
                  <source src={youtubeUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Modal Controls */}
                <div className="absolute bottom-0 w-full pr-3 pb-28 flex justify-end">
                  <div className="cursor-pointer" onClick={toggleFullVideoPlay}>
                    <PlayPauseButton isPlaying={fullVideoPlaying} progress={fullVideoProgress} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>
    );
  }
);

const PlayPauseButton = ({ isPlaying, progress, onClick }: { isPlaying: boolean, progress: number, onClick?: () => void }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="22" stroke="#ffff" strokeWidth="2" fill="none" opacity="0.3" />
        <circle
          cx="25"
          cy="25"
          r="22"
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
          strokeDasharray={138}
          strokeDashoffset={(1 - progress / 100) * 138}
          strokeLinecap="round"
          className="transition-all duration-100"
          transform="rotate(-90 25 25)"
        />
        <foreignObject x="9" y="8" width="32" height="32">
          <button className="w-full h-full cursor-pointer flex items-center justify-center" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.851562" width="36" height="36" rx="18" fill="#E8E8ED" />
                <path
                  d="M15.25 11.8516H13.75C12.9216 11.8516 12.25 12.5231 12.25 13.3516V24.3516C12.25 25.18 12.9216 25.8516 13.75 25.8516H15.25C16.0784 25.8516 16.75 25.18 16.75 24.3516V13.3516C16.75 12.5231 16.0784 11.8516 15.25 11.8516Z"
                  fill="black"
                  fillOpacity="0.56"
                />
                <path
                  d="M23.25 11.8516H21.75C20.9216 11.8516 20.25 12.5231 20.25 13.3516V24.3516C20.25 25.18 20.9216 25.8516 21.75 25.8516H23.25C24.0784 25.8516 24.75 25.18 24.75 24.3516V13.3516C24.75 12.5231 24.0784 11.8516 23.25 11.8516Z"
                  fill="black"
                  fillOpacity="0.56"
                />
              </svg>
            ) : (
              <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.140625" y="0.261719" width="36" height="36" rx="18" fill="#E8E8ED" />
                <path
                  d="M13.1441 23.5118V13.0318C13.1184 12.8282 13.1366 12.6214 13.1974 12.4254C13.2582 12.2293 13.3602 12.0485 13.4965 11.8951C13.6329 11.7417 13.8005 11.6192 13.9881 11.5359C14.1756 11.4525 14.3789 11.4102 14.5841 11.4118C14.9776 11.3951 15.3663 11.5036 15.6941 11.7218L24.2241 16.7218C24.9841 17.1618 25.3941 17.5218 25.3941 18.2318C25.3941 18.9418 24.9841 19.3018 24.2241 19.7418L15.6941 24.7418C15.3663 24.9601 14.9776 25.0686 14.5841 25.0518C14.3854 25.0554 14.1882 25.0171 14.0052 24.9396C13.8222 24.8621 13.6575 24.7471 13.5218 24.6019C13.3861 24.4568 13.2823 24.2847 13.2173 24.097C13.1522 23.9092 13.1273 23.7099 13.1441 23.5118Z"
                  fill="black"
                  fillOpacity="0.56"
                />
              </svg>
            )}
          </button>
        </foreignObject>
      </svg>
    </div>
  );
};

NewVideoPlayer.displayName = "NewVideoPlayer";

export default NewVideoPlayer;