import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Real Estate Company in Mangalore | VITU REALTY",
  description:
    "Looking for the best real estate company in Mangalore? Vitu Realty offers premium properties, expert real estate services, and investment opportunities.",
  keywords:
    "real estate in Mangalore, buy property Mangalore, Vitu Realty, Mangalore real estate, real estate company",
  authors: [{ name: "Vitu Realty" }],
  openGraph: {
    title: "Best Real Estate Company in Mangalore | VITU REALTY",
    description:
      "Discover premium properties and investment opportunities in Mangalore with Vitu Realty, the leading real estate company.",
    url: "https://yourwebsite.com",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vitu Realty - Best Real Estate Company in Mangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Real Estate Company in Mangalore | VITU REALTY",
    description:
      "Find your dream home with Vitu Realty, Mangalore's top real estate company.",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Robots Meta Tag for Indexing */}
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
