import VilasamHeroSection from "@/components/VilasamProjectPage/VilasamHeroBanner/page";
import VilasamClient from "./VilasamClient";

// ============= Types & Interfaces =============
interface ProjectPageProps { }

export async function generateMetadata() {
  const pageTitle = "Vilasam – Premium Living in Mangaluru | Vitu Realty";
  const pageDescription =
    "Discover Vilasam City, a premium residential development in Mangaluru, strategically located near major industries and top educational institutions. Developed by the KMK Group, a legacy of over six decades in excellence. Explore modern living today!";
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/vitu-realty--website.firebasestorage.app/o/AnimatedVideos%2Fimage.png?alt=media&token=50905517-237f-40e6-bc40-0d55a6cddfc8";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://viturealty.vercel.app/vilasam",
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

export default function ProjectPage({ }: ProjectPageProps) {
  return (
    <div className="bg-[#FAFFFD] flex flex-col">
      <section className="relative mb-20 lg2:mb-32">
        <VilasamHeroSection />
      </section>
      <VilasamClient />
    </div>
  );
}
