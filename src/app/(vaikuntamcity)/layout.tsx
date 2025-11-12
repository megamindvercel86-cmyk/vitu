"use client";
import dynamic from "next/dynamic";
import ScrollToTopButton from "@/components/Common/ScrollToTopButton";
import WhatsappChatWidget from "@/components/Common/WhatsappChatWidget";
import ProjectFooter from "@/components/ProjectsPageComponents/ProjectsPageCommonComponents/ProjectPageFoooter/ProjectPageFooter";
import ProjectNavbar from "@/components/ProjectsPageComponents/ProjectsPageCommonComponents/ProjectPageNavbar/ProjectPageNavbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Loader = dynamic(() => import("../../components/loader"), { ssr: false });
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setShowLoader(true);
    const timeout = setTimeout(() => {
      setShowLoader(false); // Fade out after delay
    }, 2500); // 2.5s loader time, adjust to match Lottie length

    return () => clearTimeout(timeout);
  }, [pathname]);
    const hideNavbar = pathname === "/vaikuntamcity/thank-you";
  return (
    <>
      <div
        className={`fixed inset-0 bg-white z-[9999] flex justify-center items-center transition-opacity duration-700 ${
          showLoader ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Loader />
      </div>
      <div className="min-h-screen flex flex-col">
       {!hideNavbar && <ProjectNavbar />} {/* ✅ Conditionally render navbar */}
        <main className="flex-1">{children}</main>
        <ScrollToTopButton />
        <WhatsappChatWidget />
        <ProjectFooter />
      </div>
    </>
  );
}
