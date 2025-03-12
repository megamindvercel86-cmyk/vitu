// RootLayout.tsx
import ProjectFooter from "@/components/ProjectsPageCommonComponents/ProjectPageFoooter/ProjectPageFooter";
import ProjectNavbar from "@/components/ProjectsPageCommonComponents/ProjectPageNavbar/ProjectPageNavbar";
import { Geist, Geist_Mono } from "next/font/google";

import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Robots Meta Tag for Indexing */}
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <ProjectNavbar   />
        {children}
        <ProjectFooter/>
      </body>
    </html>
  );
}
