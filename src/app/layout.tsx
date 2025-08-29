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
} from "../../styles/font";

export async function generateMetadata() {
  const pageTitle = "Vitu-Realty | Premium Plotted Developments in Mangalore";
  const pageDescription =
    "Discover thoughtfully designed premium plotted developments in Mangalore by Vitu-Realty. Experience a uniquely authentic lifestyle with our innovative designs and sustainable initiatives.";
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2Fimage.png?alt=media&token=50905517-237f-40e6-bc40-0d55a6cddfc8";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/",
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${sourceSans3.variable} ${FS_Siena_Regular.variable} ${FS_Split_Sans_Trial_Regular.variable} ${hankenGrotesk.variable} ${tenorSans.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      
        <GoogleAnalytics gaId="G-B662JPJ850" />
      </body>
    </html>
  );
}
