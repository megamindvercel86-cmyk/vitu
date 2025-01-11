"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  navbarProps?: {
    showGetInTouch?: boolean; // Optional prop for Navbar
    navbar?: string; // Type of navbar (e.g., "primary")
    active?: string; // Active link in the navbar
  };
  navbarClassName?: string; // New prop to pass custom class for navbar
}

export default function Layout({
  children,
  navbarProps,
  navbarClassName,
}: LayoutProps) {
  return (
    <>
      <div className={navbarClassName || ""}>
        <Navbar {...navbarProps} />
      </div>
      {children}
      <Footer />
    </>
  );
}
