"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocationMap from "./LocationMap";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

import { useState } from "react";
import AnimatedDropdown from "../ui/AnimatedDropdown";
import { FaCheck } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { AnimatedConicButton } from "../ui/moving-border";
import Link from "next/link";

export default function SmartCitySection() {
    const [plotType, setPlotType] = useState("");
    const [consentChecked, setConsentChecked] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const mobileHeroRef = useRef<HTMLDivElement>(null);
    const mobileImageRef = useRef<HTMLDivElement>(null);
    const mobileTextRef = useRef<HTMLDivElement>(null);
    const rightImageRef = useRef<HTMLDivElement>(null);
    const beachImageRef = useRef<HTMLDivElement>(null);
    const firstScreenRef = useRef<HTMLDivElement>(null);
    const secondScreenRef = useRef<HTMLDivElement>(null);
    const [phone, setPhone] = useState("");
    const [dialCode, setDialCode] = useState("91");

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        interstedIn: "",
        whatsapp: true,
    });
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phone: "",
        interstedIn: "",
    });
    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        phone: false,
        interstedIn: false,
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case "fullName":
                if (!value.trim()) return "Full name is required";
                if (value.length < 2) return "Full name must be at least 2 characters";
                if (!/^[a-zA-Z\s]+$/.test(value)) return "Full name can only contain letters and spaces";
                return "";
            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
                return "";
            case "phone":
                if (!value.trim()) return "Phone number is required";
                {
                    const digitsOnly = value.replace(/\D/g, "");
                    if (digitsOnly.length < 10) return "Phone number must be at least 10 digits";
                }
                return "";
            case "interstedIn":
                if (!value.trim()) return "Please select an option";
                return "";
            default:
                return "";
        }
    };

    const validateForm = React.useCallback((): boolean => {
        const newErrors = {
            fullName: validateField("fullName", formData.fullName),
            email: validateField("email", formData.email),
            phone: validateField("phone", formData.phone),
            interstedIn: validateField("interstedIn", formData.interstedIn),
        };
        setErrors(newErrors);
        const valid = !Object.values(newErrors).some((e) => e !== "");
        setIsFormValid(valid);
        return valid;
    }, [formData]);

    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const handleSubmit = async () => {
        if (!validateForm()) {
            setTouched({ fullName: true, email: true, phone: true, interstedIn: true });
            return;
        }

        setIsLoading(true);
        try {
            const downloadFileLink = "/downloadingFiles/VITU Realty - Vilasam.pdf";
            const collectionName = "projectEnquiries";
            const thankYouRoute = "/vilasam/landing-page-1/thank-you";

            router.push(thankYouRoute);

            const collectionRef = collection(db, collectionName);
            const dataWithTimestamp = {
                ...formData,
                createdAt: serverTimestamp(),
            };
            await addDoc(collectionRef, dataWithTimestamp);

            if (collectionName === "projectEnquiries") {
                await fetch("/api/sendEmail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...formData, page: "Project Enquire" }),
                });
                await fetch("/api/send-whatsapp-vaikuntamcity", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.fullName,
                        phone: formData.phone,
                    }),
                });
            }

            if (downloadFileLink) {
                const link = document.createElement("a");
                link.href = downloadFileLink;
                link.download = downloadFileLink?.split("/").pop()?.toString() || "";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            setFormData({ fullName: "", email: "", phone: "", interstedIn: "", whatsapp: false });
            setTouched({ fullName: false, email: false, phone: false, interstedIn: false });
            setErrors({ fullName: "", email: "", phone: "", interstedIn: "" });
            setPlotType("");
            setPhone("");
            setConsentChecked(true);
        } catch (error) {
            console.error("Error adding document: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // Desktop Animations & Pinning
            mm.add("(min-width: 768px)", () => {
                if (!rightImageRef.current || !beachImageRef.current) return;

                // Snap Point 1: First Desktop Screen (when it first enters viewport)
                if (firstScreenRef.current) {
                    ScrollTrigger.create({
                        id: "smart-city-first-screen",
                        trigger: firstScreenRef.current,
                        start: "top bottom", // When first screen enters viewport
                        end: "top top", // When it reaches top
                        snap: {
                            snapTo: (progress: number) => {
                                progress = gsap.utils.clamp(0, 1, progress);

                                const trigger = ScrollTrigger.getById("smart-city-first-screen");
                                const velocity = trigger?.getVelocity() || 0;
                                const scrollingDown = velocity > 0;

                                // Snap to start (0) or end (1) based on scroll direction and progress
                                const SNAP_THRESHOLD = 0.15;

                                if (scrollingDown) {
                                    return progress >= SNAP_THRESHOLD ? 1 : 0;
                                } else {
                                    return progress <= (1 - SNAP_THRESHOLD) ? 0 : 1;
                                }
                            },
                            duration: 1.2,
                            ease: "power2.inOut",
                        },
                    });
                }

                // Initial reveal timeline - synced with pinning
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom", // Start animation when section enters viewport
                        end: "top top", // End when section hits top
                        scrub: 0,
                    },
                });

                // Bottom-to-Top reveal with Scale effect - Linear easing for perfect sync with scroll
                tl.fromTo(rightImageRef.current,
                    { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
                    { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "none" },
                    0
                );

                tl.fromTo(beachImageRef.current,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out" },
                    0.2
                );

                // Parallax effect for Beach Image after reveal
                gsap.to(beachImageRef.current, {
                    y: 200, // Move down slightly (parallax) as user scrolls down
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top", // Starts after clipping completes (at top)
                        end: "bottom top",
                        scrub: true
                    }
                });

                // JS Pinning removed in favor of CSS Fixed positioning

                // Snap Point 2: Second Desktop Screen (Map + Form)
                if (secondScreenRef.current) {
                    ScrollTrigger.create({
                        id: "smart-city-second-screen",
                        trigger: secondScreenRef.current,
                        start: "top bottom", // When second screen enters viewport
                        end: "top top", // When it reaches top
                        snap: {
                            snapTo: (progress: number) => {
                                progress = gsap.utils.clamp(0, 1, progress);

                                const trigger = ScrollTrigger.getById("smart-city-second-screen");
                                const velocity = trigger?.getVelocity() || 0;
                                const scrollingDown = velocity > 0;

                                // Snap to start (0) or end (1) based on scroll direction and progress
                                const SNAP_THRESHOLD = 0.15;

                                if (scrollingDown) {
                                    return progress >= SNAP_THRESHOLD ? 1 : 0;
                                } else {
                                    return progress <= (1 - SNAP_THRESHOLD) ? 0 : 1;
                                }
                            },
                            duration: 1.2,
                            ease: "power2.inOut",
                        },
                    });
                }
            });

            // Mobile Animations (New Zoom Out Hero)
            mm.add("(max-width: 767px)", () => {
                if (mobileHeroRef.current && mobileImageRef.current) {
                    gsap.fromTo(mobileImageRef.current,
                        { scale: 1.2 }, // Start zoomed in
                        {
                            scale: 1, // Zoom out to normal
                            ease: "none",
                            scrollTrigger: {
                                trigger: mobileHeroRef.current,
                                start: "top top",
                                end: "bottom center",
                                scrub: true,
                            }
                        }
                    );
                    // Text fade animation removed as per request to have it follow naturally
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#FFFAF6] overflow-hidden"
        >
            {/* --- MOBILE: First Screen (Hero Image) --- */}
            {/* <div ref={mobileHeroRef} className="md:hidden relative w-full h-[100vh] overflow-hidden">
                <div ref={mobileImageRef} className="absolute inset-0 w-full h-full"> 
                    <Image
                        src="/vilasamImages/basicImages/12.webp"
                        alt="Smart Cityscape"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            </div> */}

            {/* --- MOBILE: Content Text (Below Image) --- */}
            <div className="md:hidden w-full   bg-[#FFFAF6] relative flex flex-col">
                <p className=" px-3 max-w-md text-xl text-[#254C54] leading-[1.1]  text-start mb-12">
                    Industrial and IT Boom, Smart City Projects Phase 2, the Silicon Beach Program, and the Coastal Tourism Program converge to shape a city in motion. Innovation meets infrastructure, opportunity aligns with vision, and Mangalore emerges as a future focused landscape of growth, intelligence, and lasting value.
                </p>


                {/* Right Aligned Image (Matches user request) */}
                <div className="self-end w-[70%] aspect-[4/5] relative">
                    <Image
                        src="/vilasamImages/basicImages/13.webp"
                        alt="Silicon Beach"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            </div>

            {/* --- DESKTOP: First Screen (Original Split Layout) --- */}
            <div ref={firstScreenRef} className="hidden md:flex relative w-full min-h-screen flex-col md:flex-row">
                {/* Left Column: Content (NOT PINNED) */}
                <div className="w-full md:w-1/2 p-6 md:p-20 flex flex-col justify-center relative z-20 order-2 md:order-1">
                    {/* Small Top Image (Beach) */}
                    <div ref={beachImageRef} className="md:absolute top-10 right-36 w-full md:w-52 md:h-64 lg2:w-64 lg2:h-80 mb-8 md:mb-0 overflow-hidden ">
                        <div className="w-full h-full relative">
                            <Image
                                src="/vilasamImages/basicImages/13.webp"
                                alt="Silicon Beach"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="mt-4 lg2:mt-[22rem] md:mt-[17rem] lg2:max-w-md lg:max-w-sm"  >
                        <p className="font-normal text-lg md:text-lg lg:text-lg lg2:text-xl text-[#254C54] leading-relaxed">
                            Industrial and IT Boom, Smart City Projects Phase 2, the Silicon Beach Program,
                            and the Coastal Tourism Program converge to shape a city in motion.
                            Innovation meets infrastructure, opportunity aligns with vision, and Mangalore
                            emerges as a future focused landscape of growth, intelligence, and lasting value.
                        </p>
                    </div>
                </div>

                {/* Right Column: Smart City Image (Fixed) - Always pinned to screen */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen md:fixed md:top-0 md:right-0 order-1 md:order-2 z-0">
                    <div
                        ref={rightImageRef}
                        className="w-full h-full relative overflow-hidden"
                    >
                        <Image
                            src="/vilasamImages/basicImages/12.webp"
                            alt="Smart Cityscape"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                </div>
            </div>

            {/* Second Screen - Map + Form (Scrolls over pinned city) */}
            <div ref={secondScreenRef} className="relative z-30 w-full min-h-screen flex flex-col md:flex-row">
                {/* Left Side: Map */}
                <div className="relative w-full md:w-1/2 h-[50vh] md:min-h-screen overflow-hidden">
                    {/* <LocationMap
                        zoom={14}
                        apiKey=""
                    /> */}

                    <iframe
                        title="Vilasam by VITU Realty - Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.825041708064!2d74.79960776325774!3d13.008543960252123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba353f36865457b%3A0x5b7c3104c03bd7f0!2sVilasam%20by%20VITU%20Realty!5e0!3m2!1sen!2sin!4v1769071330316!5m2!1sen!2sin"
                        className="absolute inset-0 w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 min-h-full py-16 flex items-center justify-center bg-[#FFFAF6] p-6 md:p-20">
                    <div className="w-full max-w-lg">
                        <h2 className="font-theSeasons text-3xl md:text-5xl text-[#254C54] mb-6 leading-tight">
                            Book Your<br />Site Visit Today
                        </h2>
                        <p className="text-[#254C54] mb-6 text-lg font-ttCommons ">Fill out the form to download e-Brochure</p>


                        <form className="space-y-6 text-[#254C5499]" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({ ...prev, fullName: value }));
                                        setTouched((prev) => ({ ...prev, fullName: true }));
                                        setErrors((prev) => ({ ...prev, fullName: validateField("fullName", value) }));
                                    }}
                                    onBlur={(e) => {
                                        const value = e.target.value;
                                        setTouched((prev) => ({ ...prev, fullName: true }));
                                        setErrors((prev) => ({ ...prev, fullName: validateField("fullName", value) }));
                                    }}
                                    className="w-full border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-lg transition-colors bg-transparent "
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData((prev) => ({ ...prev, email: value }));
                                        setTouched((prev) => ({ ...prev, email: true }));
                                        setErrors((prev) => ({ ...prev, email: validateField("email", value) }));
                                    }}
                                    onBlur={(e) => {
                                        const value = e.target.value;
                                        setTouched((prev) => ({ ...prev, email: true }));
                                        setErrors((prev) => ({ ...prev, email: validateField("email", value) }));
                                    }}
                                    className="w-full border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-lg transition-colors bg-transparent"
                                />
                                {touched.email && errors.email && (
                                    <p className="text-red-500 text-xs mt-2 font-ttCommons">{errors.email}</p>
                                )}
                            </div>

                            {/* <div className="flex gap-4">
                                <select className="border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-lg bg-transparent">
                                    <option>91+</option>
                                </select>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="flex-1 border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-lg transition-colors bg-transparent"
                                />
                            </div> */}
                           <div className="flex flex-col" data-lenis-prevent>
                                <PhoneInput
                                    defaultCountry="in"
                                    value={phone}
                                    onChange={(phone, data: any) => {
                                        setPhone(phone);
                                        setFormData((prev) => ({ ...prev, phone }));
                                        if (touched.phone) {
                                            setErrors((prev) => ({ ...prev, phone: validateField("phone", phone) }));
                                        }
                                        if (data?.country?.dialCode) {
                                            setDialCode(data.country.dialCode);
                                        }
                                    }}
                                    onBlur={() => {
                                        setTouched((prev) => ({ ...prev, phone: true }));
                                        setErrors((prev) => ({ ...prev, phone: validateField("phone", formData.phone) }));
                                    }}
                                    disableDialCodeAndPrefix={true}
                                    className="w-full vilasam-phone-input text-lg"
                                    inputClassName="w-full placeholder:text-[#254C5499] placeholder:text-lg text-lg"
                                    inputStyle={{
                                        width: "100%",
                                        background: "transparent",
                                        borderBottom: "2px solid #bdc7c6",
                                        borderTop: "0px",
                                        borderRight: "0px",
                                        borderLeft: "0px",
                                        borderRadius: "0px",
                                        padding: "22px",
                                        fontSize: "18px",
                                        color: "#254C54",
                                    }}
                                    countrySelectorStyleProps={{
                                        buttonStyle: {
                                            background: "transparent",
                                            borderBottom: "2px solid #bdc7c6",
                                            borderTop: "0px",
                                            borderRight: "0px",
                                            borderLeft: "0px",
                                            borderRadius: "0px",
                                            padding: "22px",
                                            width: "80px",
                                            color: "#254C5499",
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                            paddingLeft: "0px",
                                            gap: "4px",
                                            // @ts-ignore
                                            "--dial-code": `"${dialCode}"`,
                                        } as React.CSSProperties,
                                        buttonClassName: "country-selector-button [&_img]:hidden [&_svg]:hidden",
                                        dropdownStyleProps: {
                                            style: {
                                                maxHeight: "220px",
                                                overflowY: "scroll",
                                                overflowX: "hidden",
                                                border: "2px solid #bdc7c6",
                                                background: "white",
                                                zIndex: 9999,
                                                overscrollBehavior: "contain",
                                                WebkitOverflowScrolling: "touch",
                                            } as React.CSSProperties,
                                            listItemFlagClassName: "hidden",
                                            listItemCountryNameClassName: "hidden",
                                            listItemDialCodeClassName: "text-[#254C5499]",
                                            className: "country-dropdown-list",
                                        },
                                    }}
                                />
                                {touched.phone && errors.phone && (
                                    <p className="text-red-500 text-xs mt-2 font-ttCommons">{errors.phone}</p>
                                )}
                                <style jsx global>{`
                                                                .country-selector-button::after {
                                                                    content: "+" var(--dial-code);
                                                                    color: #254C54;
                                                                    font-weight: 500;
                                                                    margin-left: 0px;
                                                                }
                                                                
                                                                /* Ensure dropdown is scrollable */
                                                                .country-dropdown-list {
                                                                    overflow-y: scroll !important;
                                                                    overflow-x: hidden !important;
                                                                }
                                                                
                                                                /* Custom scrollbar styling */
                                                                .country-dropdown-list::-webkit-scrollbar {
                                                                    width: 6px;
                                                                }
                                                                
                                                                .country-dropdown-list::-webkit-scrollbar-track {
                                                                    background: #f1f1f1;
                                                                    border-radius: 3px;
                                                                }
                                                                
                                                                .country-dropdown-list::-webkit-scrollbar-thumb {
                                                                    background: #bdc7c6;
                                                                    border-radius: 3px;
                                                                }
                                                                
                                                                .country-dropdown-list::-webkit-scrollbar-thumb:hover {
                                                                    background: #254C54;
                                                                }
                                                            `}</style>
                            </div>


                            <div>
                                <AnimatedDropdown
                                    name="Preferred Plot Orientation"
                                    options={[

                                        { label: "East Facing Plots", value: "East Facing Plots" },
                                        { label: "West Facing Plots", value: "West Facing Plots" },
                                        { label: "Corner Plots", value: "Corner Plots" },

                                    ]}
                                    value={plotType}
                                    onChange={(value) => {
                                        setPlotType(value);
                                        setFormData((prev) => ({ ...prev, interstedIn: value }));
                                        setTouched((prev) => ({ ...prev, interstedIn: true }));
                                        setErrors((prev) => ({ ...prev, interstedIn: validateField("interstedIn", value) }));
                                    }}
                                    placeholder="Preferred Plot Orientation"
                                />
                                {touched.interstedIn && errors.interstedIn && (
                                    <p className="text-red-500 text-xs mt-2 font-ttCommons">{errors.interstedIn}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-4">
                                <label className="flex items-center gap-3 cursor-pointer group w-fit mt-3">
                                    <div className="relative mt-1">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            checked={consentChecked}
                                            onChange={() => {
                                                const next = !consentChecked;
                                                setConsentChecked(next);
                                                setFormData((prev) => ({ ...prev, whatsapp: next }));
                                            }}
                                            className="sr-only peer"
                                        />
                                        <div className="w-4 h-4 border-2 border-[#254C54] rounded-sm peer-checked:bg- transition-colors relative flex items-center justify-center">
                                            {consentChecked && <FaCheck className="w-2 h-2.5 text-[#254C54]" />}
                                        </div>
                                    </div>
                                    <span className="text-xs mt-1 text-[#254C54] font-normal">
                                        Consent to contact me via Call, SMS, Email, or WhatsApp
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    className={`" bg-[#0a5f5f] hover:bg-[#083f3f] text-white font-semibold py-2 px-8 rounded-full transition-colors mt-6"${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={handleSubmit}
                                    disabled={!isFormValid || isLoading}
                                >
                                    {isLoading ? "Sending..." : "Submit"}
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
