import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { handleFormSubmitVilasam } from "@/lib/functionHelpers";
import { useRouter, useSearchParams } from "next/navigation";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useLenis } from "../Common/SmoothScroll";
import AnimatedDropdown from "../ui/AnimatedDropdown";
import { FaCheck } from "react-icons/fa";
import { AnimatedConicButton } from "../ui/moving-border";
import {
    getLandingUtmParams,
} from "@/lib/vilasamLandingForm";
import { useVilasamLandingForm } from "@/hooks/useVilasamLandingForm";



gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealSectionProps {
    imageSrc: string;
    overlayImageSrc?: string;
    overlayImageSrcLeft?: string;
    overlayImageSrc2?: string;
    // Text Content 1
    intro1?: string;
    title1: React.ReactNode;
    description1: React.ReactNode;
    stats1?: React.ReactNode;
    contentImage1?: string; // New prop for image under heading
    // Text Content 2
    title2?: React.ReactNode;
    description2?: React.ReactNode;
    children?: React.ReactNode; // Fallback for custom content if needed
    ft1num?: string;
    ft2num?: string;
    ft3num?: string;
    ft1?: string;
    ft2?: string;
    ft3?: string;
    ft1desc?: string;
    ft2desc?: string;
    ft3desc?: string;
    maxWidth?: string;
    heroTitle?: React.ReactNode;
    onEnquireClick?: () => void;
}

export default function ScrollRevealSection({
    imageSrc,
    overlayImageSrc,
    overlayImageSrc2,
    overlayImageSrcLeft,
    intro1 = "Intro",
    title1,
    description1,
    stats1,
    contentImage1,
    title2,
    description2,
    children,
    ft1num,
    ft2num,
    ft3num,
    ft1,
    ft2,
    ft3,
    ft1desc,
    ft2desc,
    ft3desc,
    maxWidth,
    heroTitle,
    onEnquireClick
}: ScrollRevealSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayImageRef = useRef<HTMLDivElement>(null);
    const overlayImageInnerRef = useRef<HTMLDivElement>(null);
    const overlayImage2Ref = useRef<HTMLDivElement>(null);
    const overlayImage2InnerRef = useRef<HTMLDivElement>(null);
    const overlayImageLeftRef = useRef<HTMLDivElement>(null);

    // Text Refs
    const textGroup1Ref = useRef<HTMLDivElement>(null);
    const textGroup2Ref = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = useState(false);
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

    const [dialCode, setDialCode] = useState("91");
    const [consentChecked, setConsentChecked] = useState(true);
    const { lenis } = useLenis();

    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const {
        formData,
        errors,
        touched,
        isFormValid,
        validateForm,
        setFieldValue,
        blurField,
        setPhoneValue,
        setWhatsappConsent,
        markAllTouched,
        resetForm,
    } = useVilasamLandingForm();

    const handleSubmit = async () => {
        if (!validateForm()) {
            markAllTouched();
            return;
        }

        setIsLoading(true);
        try {
            const thankYouRoute = "/vilasam/landing-page-1/thank-you";

            // Webhook and Data Submission
            const utmParams = getLandingUtmParams(searchParams);

            await handleFormSubmitVilasam(formData, utmParams);

            router.push(thankYouRoute);
            resetForm();
            setConsentChecked(true);
            setIsBrochureModalOpen(false);
        } catch (error) {
            console.error("Error submitting form: ", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isBrochureModalOpen) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
        return () => {
            lenis?.start();
        };
    }, [isBrochureModalOpen, lenis]);

    useEffect(() => {
        if (!containerRef.current || !imageContainerRef.current || !imageRef.current || !contentRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Calculate steps and duration based on props
            let totalSteps = 1; // Base step (Phase 1)
            // Phase 2 is triggered if a second image exists
            if (overlayImageSrc2) totalSteps++;

            // Create a timeline linked to ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${totalSteps * 200}%`, // Balanced distance
                    pin: true,
                    scrub: 1, // Increased scrub for smoother transition
                    snap: {
                        snapTo: 1 / totalSteps,
                        duration: { min: 0.2, max: 0.5 },
                        delay: 0.1,
                        ease: "power2.inOut"
                    }
                },
                defaults: { ease: "power2.inOut", duration: 1 }
            });

            // Phase 1 Part A: Reveal Background by clipping hero image (0 -> 0.5 time)
            tl.to(
                imageContainerRef.current,
                {
                    clipPath: "inset(0% 0% 0% 50%)", // Clips the left 50%
                    ease: "none",
                    duration: 0.5
                },
                0
            )
                .to(
                    imageRef.current,
                    {
                        scale: 1.15,
                        yPercent: -35, // Background vertical parallax
                        ease: "none",
                        duration: totalSteps
                    },
                    0
                );

            // Left Overlay Image
            // If totalSteps = 1, it must finish by 1.0 (start 0.5 -> duration 0.5).
            // If totalSteps = 2, it finishes by 2.0 (start 0.5 -> duration 1.5).
            if (overlayImageLeftRef.current) {
                const overlayDuration = totalSteps === 1 ? 0.5 : 1.5;
                tl.fromTo(
                    overlayImageLeftRef.current,
                    {
                        xPercent: 0,
                        yPercent: 100, // Start fully below
                        autoAlpha: 1
                    },
                    {
                        yPercent: 0, // Slide up to position
                        ease: "none",
                        duration: overlayDuration
                    },
                    0.5 // Start after Panel finishes
                );
            }

            // Hero Content Exit (Sync with Panel)
            tl.to(
                contentRef.current,
                {
                    y: -100,
                    opacity: 0,
                    ease: "none",
                    duration: 0.5
                },
                0
            );

            // Text Reveal (Appears as Panel finishes)
            tl.to(
                ".reveal-text-1",
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.2,
                },
                0.25 // Start halfway through panel slide
            );

            // Phase 1 Part B: Right Image 1 Reveal (0.5 -> 1.0)
            if (overlayImageRef.current && overlayImageInnerRef.current) {
                // Clipping Animation (Container)
                tl.fromTo(
                    overlayImageRef.current,
                    {
                        clipPath: "inset(100% 0% 0% 0%)",
                        autoAlpha: 1
                    },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "none", // Linear for better sync with scroll
                        duration: 0.5
                    },
                    0.5
                );

                // Zoom Animation (Inner Image)
                tl.fromTo(
                    overlayImageInnerRef.current,
                    {
                        scale: 1.3
                    },
                    {
                        scale: 1,
                        ease: "none",
                        duration: 0.5
                    },
                    0.5
                );
            }

            // Phase 2: Right Image 2 Slides Up & Text Swap (1.0 -> 2.0)
            if (overlayImageSrc2) {
                const startTime = 1;

                // Image 2 Reveal
                if (overlayImage2Ref.current && overlayImage2InnerRef.current) {
                    // Image 1 Clips OUT
                    if (overlayImageRef.current) {
                        tl.to(
                            overlayImageRef.current,
                            {
                                clipPath: "inset(0% 0% 100% 0%)",
                                ease: "none",
                                duration: 1.0
                            },
                            startTime
                        );
                    }

                    // Image 2 Clips IN
                    tl.fromTo(
                        overlayImage2Ref.current,
                        {
                            clipPath: "inset(100% 0% 0% 0%)",
                            autoAlpha: 1
                        },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            ease: "none",
                            duration: 1.0
                        },
                        startTime
                    );

                    // Zoom Animation (Inner Image)
                    tl.fromTo(
                        overlayImage2InnerRef.current,
                        {
                            scale: 1.3
                        },
                        {
                            scale: 1,
                            ease: "none",
                            duration: 1.0
                        },
                        startTime
                    );
                }

                // Text Transition: Fade Out Group 1
                if (textGroup1Ref.current) {
                    tl.to(
                        textGroup1Ref.current,
                        {
                            opacity: 0,
                            y: -20,
                            duration: 0.5,
                            ease: "power2.in"
                        },
                        startTime
                    );
                }

                // Text Transition: Fade In Group 2
                if (textGroup2Ref.current) {
                    tl.fromTo(
                        textGroup2Ref.current,
                        {
                            opacity: 0,
                            y: 20
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out"
                        },
                        startTime + 0.5 // Start fading in as Group 1 is leaving
                    );
                }
            }
        });

        return () => mm.revert();
    }, [overlayImageSrc2]);

    // VilasamAtAGlance Logic
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const glanceSectionRef = useRef<HTMLDivElement>(null);

    const stats_data = [
        {
            start: "2X Growth",
            end: "In the past 3 years",
        },
        {
            start: "3 Years",
            end: "Resale Flexibility",
            isCenter: true,
        },
        {
            start: "10X Growth",
            end: "in the future from SEZs, Port & Expressway",
        },
    ];

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (!glanceSectionRef.current) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const ctx = gsap.context(() => {
                itemsRef.current.forEach((item, index) => {
                    if (!item) return;

                    gsap.fromTo(item,
                        {
                            autoAlpha: 1,
                            clipPath: "inset(100% 0% 0% 0%)",
                            y: 30
                        },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            y: 0,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 85%", // Start animation when item is near bottom of viewport
                                toggleActions: "play none none reverse"
                            },
                            delay: index * 0.2 // Stagger the revealed
                        }
                    );
                });

                // Snap at the end of ScrollRevealSection (VilasamAtAGlance section)
                ScrollTrigger.create({
                    id: "scroll-reveal-end",
                    trigger: glanceSectionRef.current,
                    start: "top bottom", // When section enters viewport
                    end: "top top", // When it reaches top
                    snap: {
                        snapTo: (progress: number) => {
                            progress = gsap.utils.clamp(0, 1, progress);

                            const trigger = ScrollTrigger.getById("scroll-reveal-end");
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
            }, glanceSectionRef);

            return () => {
                ctx.revert();
            };
        });

        return () => mm.revert();
    }, []);

    return (
        <>
            <div style={{ background: 'radial-gradient(circle at center, #0F5B5B 0%, #024854 100%)' }}>
                <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden">
                    {/* Bottom Layer: Image (Pinned Background) */}
                    <div ref={imageContainerRef} className="absolute inset-0 w-full h-full overflow-hidden z-10" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
                        <div ref={imageRef} className="w-full h-full scale-110 relative">
                            <Image
                                src={imageSrc}
                                alt="Background"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            {/* Optional Bottom Layer Content (e.g. Hero Text) */}
                            <div ref={contentRef} className="absolute inset-0 z-0">
                                {children ? (
                                    children
                                ) : (
                                    <div className="relative z-0 flex flex-col justify-end h-full px-6 pb-20 md:px-12 md:pb-24 lg:px-26 lg:pb-21 text-white text-right">
                                        <div className="flex justify-between md:px-20 lg2:px-24 items-center w-full">
                                            <div className="inline-flex items-center justify-center gap-2 text-white border-[0.25px] border-white/30 transition-colors duration-500 rounded-full text-sm font-medium lg:text-sm lg2:text-md">
                                                <AnimatedConicButton
                                                    onClick={() => setIsBrochureModalOpen(true)}
                                                    theme="vilasam-brochure"
                                                    className="hidden lg:font-medium lg:font-sans md:flex p-6 !bg-white/10 backdrop-blur-md"
                                                >
                                                    <span className="flex gap-2 items-center">
                                                        DOWNLOAD E-BROCHURE
                                                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.2753 16.7061L16.2213 5.87717L5.39175 5.82251" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" />
                                                            <path d="M16.2195 5.87756L6.1459 15.9512" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10" />
                                                        </svg>
                                                    </span>
                                                </AnimatedConicButton>
                                            </div>
                                            <h1 className="font-normal font-theSeasons text-4xl md:text-5xl lg:text-5xl lg2:text-6xl xl:text-7xl lg:leading-tight lg2:leading-snug ">
                                                {heroTitle}
                                            </h1>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Left Layer: Content Revealed by clipping hero image above */}

                    {/* Right Layer 1: Image (Slides from Bottom) */}
                    {overlayImageSrc && (
                        <div
                            ref={overlayImageRef}
                            className="absolute top-0 right-0 w-[50%] h-full z-20 overflow-hidden"
                            style={{ visibility: 'hidden' }} // GSAP will handle visibility
                        >
                            <div ref={overlayImageInnerRef} className="relative w-full h-full">
                                <Image
                                    src={overlayImageSrc}
                                    alt="Detail View 1"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    )}
                    {overlayImageSrcLeft && (
                        <div
                            ref={overlayImageLeftRef}
                            className="absolute bottom-0 left-0 w-[50%] h-[105vh] z-20"
                            style={{ visibility: 'hidden' }} // GSAP will handle visibility
                        >
                            {/* Content Layer with matching background for a cohesive slide-up block */}
                            <div className="w-full h-full flex flex-col justify-between py-16 md:py-8 lg:py-12 xl:py-16   text-white" >
                                {/* Content Group 1 */}
                                <div className="flex flex-col gap-8 md:mt-20 lg:mt-20 lg2:mt-6  ">
                                    <h2 className="reveal-text-1 opacity-0 translate-y-[30px] pl-12 md:pl-20 lg:pl-16 xl:pl-36 2xl:pl-48 font-theSeasons text-4xl md:text-4xl lg:text-4xl lg2:text-5xl lg:leading-tight xl:leading-[4.5rem]">
                                        {title1}
                                    </h2>

                                    {contentImage1 && (
                                        <div className="reveal-text-1  opacity-0 translate-y-[30px] relative w-[80%] md:w-[70%] lg:w-[60%] xl:w-[59%] aspect-[16/11] overflow-hidden rounded-sm ">
                                            <Image
                                                src={contentImage1}
                                                alt="Content"
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                    )}

                                    <div className={`reveal-text-1 mt-1 pl-12 pr-6 md:pl-16 lg:pl-22 xl:pl-24 py-22 ${maxWidth}`}>
                                        <p className="font-normal font-ttCommons text-base md:text-md lg:text-md lg2:text-lg lg:leading-tight opacity-80 ">
                                            {description1}
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    )}

                    {/* Right Layer 2: Image (Slides from Bottom over Image 1) */}
                    {overlayImageSrc2 && (
                        <div
                            ref={overlayImage2Ref}
                            className="absolute top-0 right-0 w-[50%] h-full z-30 overflow-hidden" // z-30 to be above image 1
                            style={{ visibility: 'hidden' }} // GSAP will handle visibility
                        >
                            <div ref={overlayImage2InnerRef} className="relative w-full h-full">
                                <Image
                                    src={overlayImageSrc2}
                                    alt="Detail View 2"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    )}
                </div>



            </div>
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {isBrochureModalOpen && (
                            <div
                                className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto overscroll-contain "
                                data-lenis-prevent
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsBrochureModalOpen(false)}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                                />

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative w-full max-w-lg bg-[#FFFAF6] shadow-2xl overflow-hidden my-auto "
                                >
                                    <button
                                        onClick={() => setIsBrochureModalOpen(false)}
                                        className="absolute top-4 right-4 p-2 text-[#254C54] hover:text-gray-800 transition-colors z-20 bg-[#FFFAF6]/80 backdrop-blur-sm rounded-full"
                                    >
                                        <IoCloseOutline size={30} />
                                    </button>

                                    <div className="p-8 md:p-16  max-h-[90vh] overflow-y-auto custom-scrollbar">
                                        <h2 className="font-theSeasons text-3xl md:text-5xl text-[#254C54] mb-4 leading-tight">
                                            Book Your
                                            <br />
                                            Site Visit Today
                                        </h2>
                                        <p
                                            className="
                text-[#254C54]
                mb-6
                font-ttCommons
                text-sm
                sm:text-base
                  md:text-lg
                lg:text-lg
"
                                        >
                                            Fill out the form to download e-Brochure
                                        </p>

                                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    value={formData.fullName}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setFieldValue("fullName", value);
                                                    }}
                                                    onBlur={() => blurField("fullName")}
                                                    className="w-full border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-lg transition-colors bg-transparent text-[#254C54] placeholder:text-[#254C5499]"
                                                />
                                            </div>

                                            <div>
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    value={formData.email}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setFieldValue("email", value);
                                                    }}
                                                    onBlur={() => blurField("email")}
                                                    className="w-full border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-lg transition-colors bg-transparent text-[#254C54] placeholder:text-[#254C5499]"
                                                />
                                                {touched.email && errors.email && (
                                                    <p className="text-red-500 text-xs mt-2 font-ttCommons">{errors.email}</p>
                                                )}
                                            </div>

                                            <div className="flex flex-col">
                                                <PhoneInput
                                                    defaultCountry="in"
                                                    value={formData.phone}
                                                    onChange={(phone, data: any) => {
                                                        setPhoneValue(phone);
                                                        if (data?.country?.dialCode) {
                                                            setDialCode(data.country.dialCode);
                                                        }
                                                    }}
                                                    onBlur={() => blurField("phone")}
                                                    disableDialCodeAndPrefix={true}
                                                    className="w-full vilasam-phone-input"
                                                    inputClassName="w-full placeholder:text-[#254C5499] placeholder:text-lg"
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
                                                        buttonClassName:
                                                            "country-selector-button [&_img]:hidden [&_svg]:hidden",
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
                      color: #254c54;
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
                      background: #254c54;
                    }
                  `}</style>
                                            </div>

                                            <div>
                                                <AnimatedDropdown
                                                    name="Preferred Plot Orientation"
                                                    options={[
                                                        {
                                                            label: "East Facing Plots",
                                                            value: "East Facing Plots",
                                                        },
                                                        {
                                                            label: "West Facing Plots",
                                                            value: "West Facing Plots",
                                                        },
                                                        { label: "Corner Plots", value: "Corner Plots" },
                                                    ]}
                                                    value={formData.interstedIn}
                                                    onChange={(value) => {
                                                        setFieldValue("interstedIn", value);
                                                    }}
                                                    placeholder="Preferred Plot Orientation"
                                                />
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-4">
                                                <label className="flex items-start gap-3 cursor-pointer group w-full sm:max-w-[70%] mt-3">
                                                    <div className="relative mt-1 shrink-0">
                                                        <input
                                                            type="checkbox"
                                                            id="modal-consent"
                                                            checked={consentChecked}
                                                            onChange={() => {
                                                                const next = !consentChecked;
                                                                setConsentChecked(next);
                                                                setWhatsappConsent(next);
                                                            }}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-4 h-4 border-2 border-[#254C54] rounded-sm transition-colors relative flex items-center justify-center">
                                                            {consentChecked && (
                                                                <FaCheck className="w-2 h-2.5 text-[#254C54]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-[#254C54] font-normal leading-tight">
                                                        Consent to contact me via Call, SMS, Email, or WhatsApp
                                                    </span>
                                                </label>

                                                <button
                                                    type="submit"
                                                    className={`w-full sm:w-auto bg-[#0a5f5f] hover:bg-[#083f3f] text-white font-semibold py-2.5 px-10 rounded-full transition-colors ${isLoading || !isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    onClick={handleSubmit}
                                                    disabled={!isFormValid || isLoading}
                                                >
                                                    {isLoading ? "Sending..." : "Submit"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}
