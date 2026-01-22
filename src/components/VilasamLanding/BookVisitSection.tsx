"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookVisitSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const formContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !formContentRef.current) return;

        const ctx = gsap.context(() => {
            // Reveal form content on scroll
            gsap.fromTo(formContentRef.current,
                {
                    clipPath: "inset(0% 0% 100% 0%)",
                    y: 50
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "top 20%",
                        scrub: 1,
                    },
                    clipPath: "inset(0% 0% 0% 0%)",
                    y: 0,
                    ease: "power2.out"
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex flex-col md:flex-row"
        >
            {/* Left Side: Map */}
            <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative">
                <Image
                    src="https://placehold.co/1920x1080/teal/white?text=Location+Map"
                    alt="Location Map"
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>

            {/* Right Side: Form Content */}
            <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center bg-white p-10 md:p-20">
                <div
                    ref={formContentRef}
                    className="w-full max-w-lg"
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-[#254C54] mb-8 leading-tight">
                      sa  Book Your<br />Site Visit Today
                    </h2>
                    <p>Fill out the form to download e-Brochure</p>

                    <form className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border-b-2 border-gray-300 focus:border-[#2a4a3a] outline-none py-3 text-lg transition-colors bg-transparent"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border-b-2 border-gray-300 focus:border-[#2a4a3a] outline-none py-3 text-lg transition-colors bg-transparent"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="flex gap-4">
                            <select className="border-b-2 border-gray-300 focus:border-[#2a4a3a] outline-none py-3 text-lg bg-transparent">
                                <option>91+</option>
                            </select>
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="flex-1 border-b-2 border-gray-300 focus:border-[#2a4a3a] outline-none py-3 text-lg transition-colors bg-transparent"
                            />
                        </div>

                        {/* Plot Type Field */}
                        <div>
                            <select className="w-full border-b-2 border-gray-300 focus:border-[#2a4a3a] outline-none py-3 text-lg bg-transparent text-gray-500">
                                <option value="">Plot Type</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>

                        {/* Consent Checkbox */}
                        <div className="flex items-start gap-3 pt-4">
                            <input
                                type="checkbox"
                                id="consent"
                                className="mt-1 w-4 h-4"
                            />
                            <label htmlFor="consent" className="text-sm text-gray-600">
                                Consent to contact me via Call, SMS, Email, or WhatsApp
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#0a5f5f] hover:bg-[#083f3f] text-white font-semibold py-4 px-8 rounded-full transition-colors mt-6"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
