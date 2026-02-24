"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Airport, EducationalInstitutions, EmergencyService, HolySpaces, RecreationalAreas } from "@/components/Icons/Icons";
import { safeSpecialCharacters } from "@/lib/safeSpecialCharacters";

// Import Images
import defaultBg from "../../../../public/images/plotLocations/default-bg.png";
import educationalBg from "../../../../public/images/plotLocations/educational-bg.png";
import emergencyBg from "../../../../public/images/plotLocations/emergency-bg.png";
import holyBg from "../../../../public/images/plotLocations/holy-bg.png";
import recreationalBg from "../../../../public/images/plotLocations/recreational-bg.png";

const legendItems = [
    { label: "Emergency Services", image: emergencyBg },
    { label: "Educational Institutions", image: educationalBg },
    { label: "Recreational Areas", image: recreationalBg },
    { label: "Holy Spaces", image: holyBg },
];

const ACTIVE_COLOR = "#0C3E49";
const INACTIVE_COLOR = "#0C3E4966";

const legendVariants = {
    active: { color: ACTIVE_COLOR, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    inactive: { color: INACTIVE_COLOR, opacity: 0.5, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

const NewPlotConnection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Determine which image to show
    const currentImage: StaticImageData = activeIndex !== null ? legendItems[activeIndex].image : defaultBg;


    // Handle click outside to reset selection
    useEffect(() => {
        // Function to reset when clicking anywhere
        // The tabs will stopPropagation so this won't fire when they are clicked
        // BUT wait, if we use stopPropagation on tabs, we might block other things. 
        // Better: just check if the target is NOT inside the tabs container or is a tab.
        // Actually simplest: if we click document, reset. If we click tab, we update state.
        // But React Synthetic events bubble. If tab click bubbles to document, it clears immediately.
        // So we need to stop prop on the tab click or check event target.

        const handleGlobalClick = (event: MouseEvent) => {
            // We can rely on the fact that if a tab was clicked, we handle it there.
            // But we need to distinguish.
            // Let's use a ref for the legend container.
        };
    }, []);

    // Actually, let's just make the whole container onClick reset to null, 
    // and the legend items stopPropagation.
    // That covers "clicking section other than those tabs".

    const handleContainerClick = () => {
        setActiveIndex(null);
    };

    const handleTabClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setActiveIndex(activeIndex === index ? null : index);
    };


    return (
        <div
            id="location"
            className="relative flex flex-col lg:flex-row h-screen w-full bg-white overflow-hidden"
            onClick={() => setActiveIndex(null)}
        >

            {/* Left Section: Text & Controls */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-36 py-12 lg:py-0 z-10 bg-white lg:bg-transparent">
                <div>
                    <h2 className="text-3xl lg:text-5xl lg2:text-6xl text-[#0C3E49] font-medium font-theSeasons">
                        Truly Well<span className="font-CandideCondensedNormal">-</span> <br />
                        Connected Living
                    </h2>
                    <p className="font-ttcommons font-medium text-lg lg2:text-2xl text-[#0C3E4999] leading-relaxed mb-8 pt-6 max-w-xl">
                        A perfect blend of nature<span className="font-sans">&apos;</span>s calm and urban ease, just 3 minutes from scenic beaches and thoughtfully connected to business parks,
                        landmarks, airports, hospitals, and more.
                    </p>
                </div>

                {/* Legend */}
                <div className="space-y-4 lg2:space-y-8 mt-8">
                    {legendItems.map((item, idx) => {
                        const isActive = activeIndex === idx;
                        let IconComponent;
                        switch (item.label) {
                            case "Emergency Services":
                                IconComponent = EmergencyService;
                                break;
                            case "Educational Institutions":
                                IconComponent = EducationalInstitutions;
                                break;
                            case "Recreational Areas":
                                IconComponent = RecreationalAreas;
                                break;
                            case "Holy Spaces":
                                IconComponent = HolySpaces;
                                break;
                            default:
                                IconComponent = null;
                        }
                        return (
                            <motion.div
                                key={item.label}
                                className="flex items-center gap-3 text-lg lg2:text-2xl font-semibold font-theSeasons cursor-pointer select-none"
                                variants={legendVariants}
                                animate={isActive ? "active" : "inactive"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIndex(isActive ? null : idx);
                                }}
                            >
                                {IconComponent && <IconComponent active={isActive} />}
                                {item.label}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Right Section: Visual Map */}
            <div className="relative w-full lg:w-1/2 h-full bg-gray-50">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage.src}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={currentImage}
                            alt="Plot Location Map"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NewPlotConnection;
