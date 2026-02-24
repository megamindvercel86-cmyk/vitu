"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Typography from "@/components/Typography/Typography";

export default function LegacyYouCanLiveIN() {
  const [showVideo, setShowVideo] = useState(false);

  const videoId = "PS3l9zTvLgI";
  const customThumbnail =
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/vitu%20images%2FGroup%201845.png?alt=media&token=a5c30a12-766b-4fc2-a5cc-9e3b2bcd42b1";

  return (
    <section className="">
      <div className=" text-center px-4 py-16   container mx-auto">
        {/* Headline */}
        <div className="w-[90%] mx-auto">
          <h2 className="text-3xl text-[#1C1213] md:text-[82px] font-light font-FreightNeoProNormal uppercase tracking-wide leading-tight">
            <span className="block">A Testament to Distinction</span>
          </h2>
          <Typography variant="custom" className="font-freightNeoMedium  mt-3 mb-20 md:mx-12 xl:text-[24px] md:text-lg text-sm text-[#1C121399]">
            At VITU Realty, every residence begins with a vision of trust and refinement. Our communities are defined by thoughtful design, enduring
            quality, and an attention to detail that elevates everyday living.
          </Typography>
        </div>
        {/* YouTube Video */}
        {!showVideo ? (
          <div
            className="mt-10 relative w-full max-w-7xl mx-auto aspect-video"
            onClick={() => setShowVideo(true)}
          >
            <Image
              src={customThumbnail}
              alt="Video Thumbnail"
              fill
              unoptimized
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-10 h-10 lg:w-[120px] lg:h-[120px]"
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
            className=" h-full block mt-10 relative w-full max-w-7xl mx-auto aspect-video"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}

        {/* Download Button */}
        {/* <div className="mt-6">
        <Link
          href="/brochure.pdf"
          className="inline-block px-6 py-2 border text-[#1C1213] font-FreightNeoProNormal border-black rounded-full text-sm tracking-wider hover:bg-black hover:text-white transition"
        >
          DOWNLOAD BROCHURE →
        </Link>
      </div> */}
      </div>
    </section>
  );
}
