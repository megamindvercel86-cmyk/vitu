import React from "react";
import Image from "next/image";

export default function VilasamVisualSection() {
    return (
        <section className="relative w-full h-[80vh] md:h-screen">
            {/* Background Image Placeholder */}
            <Image
                src="https://placehold.co/1920x1080/2a4a3a/white?text=Vilasam+Entrance+Render"
                alt="Vilasam Entrance"
                fill
                className="object-cover"
                unoptimized
            />

            {/* Overlay Gradient for text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Text Overlay - Bottom Right */}
            <div className="absolute bottom-10 right-6 md:right-12 lg:right-20 text-white text-right z-10 flex flex-col items-end">
                <h2 className="font-serif text-6xl md:text-7xl lg:text-9xl leading-none">
                    Vilasam
                </h2>
                <span className="text-sm md:text-lg font-light tracking-widest uppercase mt-2">
                    at a Glance
                </span>
            </div>
        </section>
    );
}
