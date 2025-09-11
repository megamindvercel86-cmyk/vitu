"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ScrollToTopButton from "@/components/Common/ScrollToTopButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);
const Loader = dynamic(() => import("../../components/loader"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();


  const excludeFooterPathnames = [
    "/vaikuntam-city-elite/landing-page-2/thank-you",
    "/vaikuntam-city-elite/landing-page-1/thank-you",
  ];
  useEffect(() => {
    if (excludeFooterPathnames.includes(pathname)) {
      setShowLoader(false); // Don't show loader for thank-you pages
      return;
    }
  
    setShowLoader(true);
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2500);
  
    return () => clearTimeout(timeout);
  }, [pathname]);
  
useEffect(() => {
  const setAppHeight = () => {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  setAppHeight();
  window.visualViewport?.addEventListener("resize", setAppHeight);
  return () => window.visualViewport?.removeEventListener("resize", setAppHeight);
}, []);


useEffect(() => {
  if (typeof window !== "undefined") {
    ScrollTrigger.normalizeScroll(true); // smooth momentum handling iOS
    ScrollTrigger.config({ ignoreMobileResize: true, autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" });
  }
}, []);


  return (
    <>
      {/* ✅ Loader always shows first regardless of route */}
      <div
        className={`fixed inset-0 bg-[#F3EAE1] z-[9999999] flex justify-center items-center transition-opacity duration-700 ${
          showLoader
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Loader />
      </div>

      <div className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <ScrollToTopButton />
        {/* <WhatsappChatWidget /> */}

        {/* ✅ Show appropriate footer based on path */}
      
      </div>
    </>
  );
}
