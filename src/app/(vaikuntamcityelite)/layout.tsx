"use client";
import dynamic from "next/dynamic";
import ScrollToTopButton from "@/components/Common/ScrollToTopButton";
import WhatsappChatWidget from "@/components/Common/WhatsappChatWidget";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import EliteFooter from "@/components/VaikuntamCityElite/Footer/EliteFooter";
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
  return (
    <>
      
      <div className="min-h-screen flex flex-col">

        <main className="flex-1">{children}</main>
        <ScrollToTopButton />
        <WhatsappChatWidget />
        <EliteFooter />
        
      </div>
    </>
  );
}
