"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappSticky() {
    return (
        <div className="fixed bottom-[90px] right-5 z-50 md:bottom-28 md:right-8">
            <a
                href="https://wa.me/918904688886?text=Hi!%20I'm%20exploring%20your%20project%20and%20have%20a%20few%20queries.%20Could%20you%20guide%20me?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-110"
                aria-label="Chat with us on WhatsApp"
            >
                <FaWhatsapp className="text-[32px]" />
            </a>
        </div>
    );
}
