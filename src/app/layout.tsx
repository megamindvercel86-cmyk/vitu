// RootLayout.tsx
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import SmoothScroll from "@/components/Common/SmoothScroll";
import {
  FS_Siena_Regular,
  FS_Split_Sans_Trial_Regular,
  geistMono,
  geistSans,
  hankenGrotesk,
  notoSerif,
  sourceSans3,
  tenorSans,
} from "../../styles/font";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

// 1. DEFINE YOUR REAL DOMAIN
const BASE_URL = "https://www.viturealty.com";

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = "Vitu-Realty | Premium Plotted Developments in Mangalore";
  const pageDescription =
    "Discover thoughtfully designed premium plotted developments in Mangalore by Vitu-Realty. Experience a uniquely authentic lifestyle with our innovative designs and sustainable initiatives.";
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2Fimage.png?alt=media&token=50905517-237f-40e6-bc40-0d55a6cddfc8";

  return {
    // 2. SET METADATA BASE (Critical for Next.js SEO)
    metadataBase: new URL(BASE_URL),
    
    // 3. ADD CANONICAL TAG (Tells Google this is the master copy)
    alternates: {
        canonical: '/',
    },

    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      // 4. FIX: Point to real domain, NOT vercel.app
      url: BASE_URL, 
      siteName: "Vitu-Realty",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Vitu-Realty - Premium Plotted Developments in Mangalore",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  // 5. STRUCTURED DATA: Explicitly list your Elite Project
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Vitu-Realty",
    "url": BASE_URL,
    "logo": "https://www.viturealty.com/logo.png", // Update with your actual logo path
    "description": "Premium Plotted Developments in Mangalore",
    // This section tells Google about your specific offerings
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Vaikuntam City Elite", 
        "url": "https://www.viturealty.com/vaikuntam-city-elite/landing-page-1",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Vaikuntam City Elite",
        "url": "https://www.viturealty.com/elite"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${sourceSans3.variable} ${FS_Siena_Regular.variable} ${FS_Split_Sans_Trial_Regular.variable} ${hankenGrotesk.variable} ${tenorSans.variable} antialiased`}
      >
        {/* Inject Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <SmoothScroll>{children}</SmoothScroll>
        <GoogleAnalytics gaId="G-B662JPJ850" />
        <Analytics />
      </body>
    </html>
  );
}