"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsappChatWidget from "../Common/WhatsappChatWidget";
import ScrollToTopButton from "../Common/ScrollToTopButton";
import { usePathname } from "next/navigation";

const Loader = dynamic(() => import("../loader"), { ssr: false });

type NavbarType = "primary" | "secondary";

interface NavbarProps {
  showGetInTouch?: boolean;
  navbar?: NavbarType;
}

interface LayoutProps {
  children: React.ReactNode;
  navbarProps?: NavbarProps;
  navbarClassName?: string;
}

export default function Layout({ children, navbarProps, navbarClassName }: LayoutProps) {
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
      <ToastContainer />

      {/* Loader Overlay (Does not block rendering) */}
      <div
        className={`fixed inset-0 bg-white z-50 flex justify-center items-center transition-opacity duration-700 ${showLoader ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <Loader />
      </div>

      {/* Main Page Content */}
      <div className="relative z-0">
        <div className={navbarClassName || ""}>
          <Navbar {...navbarProps} />
        </div>

        <main>{children}</main>

        <ScrollToTopButton />
        <WhatsappChatWidget />
        <Footer />
      </div>
    </>
  );
}
