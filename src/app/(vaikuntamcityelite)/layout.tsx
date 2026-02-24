"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ScrollToTopButton from "@/components/Common/ScrollToTopButton";
import WhatsappChatWidget from "@/components/Common/WhatsappChatWidget";
import EliteFooter from "@/components/VaikuntamCityElite/Footer/EliteFooter";
import EliteFooter2 from "@/components/VaikuntamCityElite/Footer/EliteFooter2";

const Loader = dynamic(() => import("../../components/loader"), { ssr: false });
const FOOTER_TWO_PATHNAMES = [
  "/vaikuntam-city-elite/landing-page",
  "/vaikuntam-city-elite/landing-page-1",
  "/vaikuntam-city-elite/landing-page-2",
];
const EXCLUDE_FOOTER_PATHNAMES = [
  "/vaikuntam-city-elite/landing-page-2/thank-you",
  "/vaikuntam-city-elite/landing-page-1/thank-you",
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (EXCLUDE_FOOTER_PATHNAMES.includes(pathname)) {
      setShowLoader(false); // Don't show loader for thank-you pages
      return;
    }
  
    setShowLoader(true);
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2500);
  
    return () => clearTimeout(timeout);
  }, [pathname]);
  


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
        {FOOTER_TWO_PATHNAMES.includes(pathname) ? (
          <EliteFooter2 />
        ) : EXCLUDE_FOOTER_PATHNAMES.includes(pathname) ? null : (
          <EliteFooter />
        )}
      </div>
    </>
  );
}
