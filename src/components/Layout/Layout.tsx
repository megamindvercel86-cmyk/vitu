"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  navbarProps?: {
    showGetInTouch?: boolean; // Optional prop for Navbar
  };
}

export default function Layout({ children, navbarProps }: LayoutProps) {
  return (
    <>
      <Navbar {...navbarProps} />
      {children}
      <Footer />
    </>
  );
}
