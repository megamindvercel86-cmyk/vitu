"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function InvestorsStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the sticky CTA after scrolling down a bit, but hide when footer is visible
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      let isFooterVisible = false;

      if (footer) {
        const rect = footer.getBoundingClientRect();
        // Check if the top of the footer has entered the viewport
        isFooterVisible = rect.top <= window.innerHeight;
      }

      if (window.scrollY > 300 && !isFooterVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check in case they loaded the page scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex container items-center justify-between px-5 py-4 md:px-8 lg:px-12">
          <div className="flex items-center">
            <h3 className="font-ttCommons text-[16px] font-bold text-[#222]   decoration-2 underline-offset-4 md:text-[18px]">
              Book a Site Visit Today
            </h3>
          </div>

          <button
            onClick={() => {
              const contactSection = document.getElementById("contact-section");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex py-3 items-center justify-center rounded-[4px] bg-[#064747] px-8 font-ttCommons text-[16px] font-bold tracking-wide text-white transition hover:bg-[#084943] w-auto md:h-10 md:px-10"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
