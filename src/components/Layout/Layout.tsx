"use client";

// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsappChatWidget from "../Common/WhatsappChatWidget";
import ScrollToTopButton from "../Common/ScrollToTopButton";
import { usePathname } from "next/navigation";

// const Loader = dynamic(() => import("../loader"), { ssr: false });

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
  // const [showLoader, setShowLoader] = useState(true);
  // const pathname = usePathname();

  // useEffect(() => {
  //   setShowLoader(true); // Trigger loader again on route change
  // }, [pathname]);

  return (
    <>
      <ToastContainer />
      {/* {showLoader && <Loader onFinish={() => setShowLoader(false)} />} */}

      <div >
        {/* Navbar */}
        <div className={navbarClassName || ""}>
          <Navbar {...navbarProps} />
        </div>

        {/* Main Content */}
        <main>{children}</main>

        <ScrollToTopButton />
        <WhatsappChatWidget />
        <Footer />
      </div>
    </>
  );
}
