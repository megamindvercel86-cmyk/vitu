// ============= Component Imports =============
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import bgImage from "../../public/images/backgroundImages/homePageBackgroundImageDesktop.webp"
import Link from "next/link";

// ============= Constants =========
const NAVBAR_CONFIG = {
  className: "absolute top-0 left-0 right-0 z-10 w-full",
  props: {
    navbar: "primary" as const,
    showGetInTouch: true,
  },
};


export async function generateMetadata() {
  const pageTitle = "Vitu-Realty | Premium Plotted Developments in Mangalore";
  const pageDescription =
    "Discover thoughtfully designed premium plotted developments in Mangalore by Vitu-Realty. Experience a uniquely authentic lifestyle with our innovative designs and sustainable initiatives.";
  const imageUrl = "https://viturealty.com/vaikuntamcity/wp-content/uploads/2024/03/Vitu_Home_Top_Slider_1.jpg";

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
}export default function NotFound() {
    return (
      <>
        <Layout navbarClassName={NAVBAR_CONFIG.className} navbarProps={NAVBAR_CONFIG.props}>
          <div className="relative" role="img" aria-label="Modern real estate background">
            {/* Background Image */}
            <Image
              src={bgImage}
              alt="Home Hero Background"
              placeholder="blur"
              className="w-full h-full object-cover"
            />
  
            {/* Hero Content */}
            <div className="absolute top-0 left-0 right-0 bottom-36 flex flex-col items-center justify-center text-center text-white">
              {/* 404 Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-freightNeoMedium">
                Oops! Page Not Found
              </h1>
  
              {/* 404 Description */}
              <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light font-CandideCondensedNormal">
                The page you're looking for doesn't exist or has been moved.
              </p>
  
              {/* Go Back to Home Button */}
              {/* <Link href="/" passHref>
                <button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                  Go Back to Home
                </button>
              </Link> */}
            </div>
          </div>
        </Layout>
      </>
    );
  }