"use-client";
import Image from "next/image";
import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
    title: "Modern Living",
    description:
      "Experience luxury and comfort in our thoughtfully designed spaces",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&q=80",
    title: "Elegant Design",
    description: "Where sophistication meets functionality in perfect harmony",
  },
  {
    url: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&q=80",
    title: "Natural Beauty",
    description: "Bringing the outdoors in with sustainable design principles",
  },
];

export default function VisionAndMission() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center ">
      <div className="relative w-full">
        <div className="relative h-[600px] overflow-hidden ">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ease-out ${
                index === currentIndex
                  ? "translate-x-0"
                  : index < currentIndex
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={800}
                height={600}
                layout="responsive"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                  <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
                  <p className="text-lg">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
        >
          {/* <ChevronLeft size={24} /> */}sw
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
        >
          {/* <ChevronRight size={24} /> */}sw
        </button>

        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
