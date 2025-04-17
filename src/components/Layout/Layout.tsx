"use client";

import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./Navbar";
import WhatsappChatWidget from "../Common/WhatsappChatWidget";

// ============= Types & Interfaces =============
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

/**
 * Layout component that wraps the entire application
 * Provides consistent layout structure with Navbar and Footer
 */
export default function Layout({
  children,
  navbarProps,
  navbarClassName,
}: LayoutProps) {
  return (
    <>
    <ToastContainer />
      {/* Navbar Section */}
      <div className={navbarClassName || ""}>
        <Navbar {...navbarProps} />
      </div>

      {/* Main Content */}
      <main>{children}</main>
<WhatsappChatWidget/>
      {/* Footer Section */}
      <Footer />
    </>
  );
}
