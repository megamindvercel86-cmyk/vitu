import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useLenis } from "../Common/SmoothScroll";
import AnimatedDropdown from "../ui/AnimatedDropdown";
import { FaCheck } from "react-icons/fa";

interface EnquireModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EnquireModal({ isOpen, onClose }: EnquireModalProps) {
    const [phone, setPhone] = useState("");
    const [dialCode, setDialCode] = useState("91");
    const [plotType, setPlotType] = useState("");
    const [consentChecked, setConsentChecked] = useState(false);
    const { lenis } = useLenis();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
        return () => {
            lenis?.start();
        };
    }, [isOpen, lenis]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto overscroll-contain " data-lenis-prevent>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#FFFAF6] shadow-2xl overflow-hidden my-auto "
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-[#254C54] hover:text-gray-800 transition-colors z-20 bg-[#FFFAF6]/80 backdrop-blur-sm rounded-full"
                        >
                            <IoCloseOutline size={30} />
                        </button>

                        <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <h2 className="font-theSeasons text-3xl md:text-5xl text-[#254C54] mb-8 leading-tight">
                                Book Your<br />Site Visit Today

                            </h2>
                            <p>Fill out the form to download e-Brochure</p>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                {/* Name Field */}
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-sm transition-colors bg-transparent text-[#254C54] placeholder:text-[#254C5499]"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full border-b-2 border-[#254C54CC]/30 focus:border-[#254C5499] outline-none py-3 text-sm transition-colors bg-transparent text-[#254C54] placeholder:text-[#254C5499]"
                                    />
                                </div>

                                {/* Phone Field */}
                                <div className="flex flex-col">
                                    <PhoneInput
                                        defaultCountry="in"
                                        value={phone}
                                        onChange={(phone, data: any) => {
                                            setPhone(phone);
                                            if (data?.country?.dialCode) {
                                                setDialCode(data.country.dialCode);
                                            }
                                        }}
                                        disableDialCodeAndPrefix={true}
                                        className="w-full vilasam-phone-input"
                                        inputClassName="w-full placeholder:text-[#254C5499] placeholder:text-sm"
                                        inputStyle={{
                                            width: "100%",
                                            background: "transparent",
                                            borderBottom: "2px solid #bdc7c6",
                                            borderTop: "0px",
                                            borderRight: "0px",
                                            borderLeft: "0px",
                                            borderRadius: "0px",
                                            padding: "22px",
                                            fontSize: "12px",
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
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                paddingLeft: "0px",
                                                // @ts-ignore
                                                "--dial-code": `"${dialCode}"`,
                                            } as React.CSSProperties,
                                            buttonClassName: "country-selector-button [&_img]:hidden [&_svg]:hidden",
                                            dropdownStyleProps: {
                                                style: {
                                                    maxHeight: "220px",
                                                    overflowY: "auto",
                                                    border: "2px solid #bdc7c6",
                                                    background: "white",
                                                    zIndex: 9999,
                                                    overscrollBehavior: "contain",
                                                },
                                                listItemFlagClassName: "hidden",
                                                listItemCountryNameClassName: "hidden",
                                                listItemDialCodeClassName: "text-[#254C5499]",
                                            },
                                        }}
                                    />
                                    <style jsx global>{`
                                        .country-selector-button::after {
                                            content: "+" var(--dial-code);
                                            color: #254C54;
                                            font-weight: 500;
                                            margin-right: 4px;
                                        }
                                    `}</style>
                                </div>

                                {/* Plot Type Field */}
                                <div>
                                    <AnimatedDropdown
                                        name="Preferred Plot Orientation"
                                        options={[
                                            { label: "East Facing Plots", value: "East Facing Plots" },
                                            { label: "West Facing Plots", value: "West Facing Plots" },
                                            { label: "Corner Plots", value: "Corner Plots" },
                                        ]}
                                        value={plotType}
                                        onChange={setPlotType}
                                        placeholder="Preferred Plot Orientation"
                                    />
                                </div>

                                {/* Consent Checkbox and Submit Button */}
                                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-4">
                                    <label className="flex items-start gap-3 cursor-pointer group w-full sm:max-w-[70%] mt-3">
                                        <div className="relative mt-1 shrink-0">
                                            <input
                                                type="checkbox"
                                                id="modal-consent"
                                                checked={consentChecked}
                                                onChange={() => setConsentChecked(!consentChecked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-4 h-4 border-2 border-[#254C54] rounded-sm transition-colors relative flex items-center justify-center">
                                                {consentChecked && <FaCheck className="w-2 h-2.5 text-[#254C54]" />}
                                            </div>
                                        </div>
                                        <span className="text-xs text-[#254C54] font-normal leading-tight">
                                            Consent to contact me via Call, SMS, Email, or WhatsApp
                                        </span>
                                    </label>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto bg-[#0a5f5f] hover:bg-[#083f3f] text-white font-semibold py-2.5 px-10 rounded-full transition-colors"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
