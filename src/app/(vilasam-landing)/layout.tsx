"use client";

import LandingNavbar from "@/components/VilasamLanding/LandingNavbar";
import React from "react";
import { usePathname } from "next/navigation";

export default function VilasamLandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Check if the current path ends with '/thank-you'
    const isThankYouPage = pathname?.endsWith("/thank-you");

    return (
        <div className="min-h-screen relative font-ttCommons">
            {!isThankYouPage && <LandingNavbar />}
            <main>{children}</main>
        </div>
    );
}
