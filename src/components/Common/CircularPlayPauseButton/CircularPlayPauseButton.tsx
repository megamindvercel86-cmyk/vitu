"use client";

import { FaPlay, FaPause } from "react-icons/fa";
import React from "react";

interface CircularPlayPauseButtonProps {
  isPlay: boolean;
  progress: number; // 0 to 100
  onToggle: () => void;
  size?: number; // default to 50
  strokeColor?: string; // default to #dbc9bc
  className?: string; // optional extra styles
}

const CircularPlayPauseButton: React.FC<CircularPlayPauseButtonProps> = ({
  isPlay,
  progress,
  onToggle,
  size = 50,
  strokeColor = "#dbc9bc",
  className = "",
}) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = (1 - progress / 100) * circumference;

  return (
    <div
      className={`relative hidden lg:block lg:pe-5 pb-7 md:pb-0 md:pe-3 lg:pb-0 cursor-pointer ${className}`}
      onClick={onToggle}
    >
      <svg width={size} height={size} viewBox="0 0 50 50">
        {/* Background Circle */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        {/* Progress Circle */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-100"
          transform="rotate(-90 25 25)"
        />
        {/* Icon */}
        <foreignObject x="14" y="14" width="22" height="22">
          <button
            className="w-full h-full flex items-center justify-center"
            aria-label={isPlay ? "Pause" : "Play"}
          >
            {isPlay ? (
              <FaPause className="text-lg" style={{ color: strokeColor }} />
            ) : (
              <FaPlay className="text-lg" style={{ color: strokeColor }} />
            )}
          </button>
        </foreignObject>
      </svg>
    </div>
  );
};

export default CircularPlayPauseButton;