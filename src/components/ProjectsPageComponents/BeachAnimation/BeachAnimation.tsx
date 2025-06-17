import React from "react";

const BeachAnimation = () => {
  return (
    <div className="h-[200vh] absolute w-full">
      <video className="w-full h-full object-cover hidden md:block" loop playsInline autoPlay>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2FBeach.mp4?alt=media&token=f42e9fa8-9137-4fca-ad6d-3cd53ef384ee"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#e6ddd6] via-transparent to-transparent" />
    </div>
  );
};

export default BeachAnimation;
