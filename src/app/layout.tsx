// RootLayout.tsx
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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
  theSeasons,
  ttCommons,
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
    "image": [
      "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2Fimage.png?alt=media&token=50905517-237f-40e6-bc40-0d55a6cddfc8"
    ],
    "url": "https://www.viturealty.com",
    "telephone": "+918904688886",
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No 10-10-427/4, Laxman Commercial Complex, Golikatta Bazaar, Bunder",
      "addressLocality": "Mangalore",
      "addressRegion": "Karnataka",
      "postalCode": "575001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.865208703988602,
      "longitude": 74.83302272565935
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Vaikuntam City Elite",
        "url": "https://www.viturealty.com/elite",
        "availability": "https://schema.org/InStock",
        "category": "Premium Plotted Development"
      },
      {
        "@type": "Offer",
        "name": "Vaikuntam City",
        "url": "https://www.viturealty.com/vaikuntamcity",
        "category": "Plotted Development"
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
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '929942736319525');
fbq('track', 'PageView');
`
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=929942736319525&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${sourceSans3.variable} ${FS_Siena_Regular.variable} ${FS_Split_Sans_Trial_Regular.variable} ${hankenGrotesk.variable} ${tenorSans.variable} ${theSeasons.variable} ${ttCommons.variable} antialiased`}
      >
        {/* Inject Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <SmoothScroll>{children}</SmoothScroll>
        <GoogleTagManager gtmId="GTM-TVLJSG6D" />
        <Analytics />
      </body>
    </html>
  );
}