import type { Metadata } from "next";
import InvestorsHeroSection from "@/components/VilasamInvestorsPage/InvestorsHeroSection";
import InvestorsOpportunitySection, { type InvestorsOpportunitySectionProps } from "@/components/VilasamInvestorsPage/InvestorsOpportunitySection";
import InvestorsAtAGlanceSection, { type InvestorsAtAGlanceSectionProps } from "@/components/VilasamInvestorsPage/InvestorsAtAGlanceSection";
import InvestorsLocationSection, { type InvestorsLocationSectionProps } from "@/components/VilasamInvestorsPage/InvestorsLocationSection";
import InvestorsStatsSection, { type InvestorsStatsSectionProps } from "@/components/VilasamInvestorsPage/InvestorsStatsSection";
import InvestorsContactSection from "@/components/VilasamInvestorsPage/InvestorsContactSection";
import InvestorsStickyCTA from "@/components/VilasamInvestorsPage/InvestorsStickyCTA";
import {
  ChromotherapyGardenIcon,
  ClubhouseIcon,
  SecurityIcon,
  PavedRoadsIcon,
  BloomingTreesIcon,
} from "@/components/VilasamInvestorsPage/vilamLandingPageIcon";
import LandingFooter from "@/components/VilasamLanding/LandingFooter";

export const metadata: Metadata = {
  title: "Vilasam Investors | Vitu Realty",
  description: "Book your Vilasam site visit and explore premium investment-ready villa plots in Mangaluru.",
  openGraph: {
    title: "Vilasam Investors | Vitu Realty",
    description: "Book your Vilasam site visit and explore premium investment-ready villa plots in Mangaluru.",
    url: "https://www.viturealty.com/vilasam/investors",
    siteName: "Vitu-Realty",
    images: [
      {
        url: "/images/vilasamImages/herobanner.webp",
        width: 1200,
        height: 630,
        alt: "Vilasam Investors",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vilasam Investors | Vitu Realty",
    description: "Book your Vilasam site visit and explore premium investment-ready villa plots in Mangaluru.",
    images: ["/images/vilasamImages/herobanner.webp"],
  },
};

export default function VilasamInvestorsPage() {
  const opportunitySectionData: InvestorsOpportunitySectionProps = {
    heading: (
      <>
        Your Space to <br className="hidden md:block" /> Breathe & Belong
      </>
    ),
    headingMobile: "Secure your legacy in Mangalore’s growth story",
    description:
      "Vilasam offers 24 Boutique Luxury Villa Plots, a limited-edition sanctuary. A strategic asset in one of Karnataka's fastest-growing coastal corridors. Located behind NITK, Surathkal, this project is at the intersection of connectivity and opportunity.",
    ctaLabel: "Download E-Brochure",
    ctaHref: "/downloadingFiles/VITU Realty - Vilasam.pdf",
    imageSrc: "/vilasamImages/basicImages/1.webp",
    imageAlt: "Vilasam gated entrance",
    cards: [
      { title: "10-15 mins to Everyday\nEssentials" },
      { title: "2X growth in the\nlast 3 years" },
      { title: "24x7 Gated Security" },
      { title: "3‑Year Resale\nFlexibility" },
    ],
  };

  const atAGlanceSectionData: InvestorsAtAGlanceSectionProps = {
    title: "Vilasam at a Glance",
    items: [
      {
        id: "1",
        label: "Chromotherapy Garden",
        icon: <ChromotherapyGardenIcon />,
        imageSrc: "/vilasamImages/basicImages/2.webp",
      },
      {
        id: "2",
        label: "20,000 sq.ft. Clubhouse",
        icon: <ClubhouseIcon />,
        imageSrc: "/vilasamImages/basicImages/3.webp",
      },
      {
        id: "3",
        label: "24×7 Security",
        icon: <SecurityIcon />,
        imageSrc: "/vilasamImages/basicImages/4.webp",
      },
      {
        id: "4",
        label: "30 ft. Wide Cobblestone Paved Roads",
        icon: <PavedRoadsIcon />,
        imageSrc: "/vilasamImages/basicImages/5.webp",
      },
      {
        id: "5",
        label: "50+ Blooming Trees",
        icon: <BloomingTreesIcon />,
        imageSrc: "/vilasamImages/basicImages/6.webp",
      },
    ],
  };

  const statsSectionData: InvestorsStatsSectionProps = {
    stats: [
      {
        id: "1",
        value: "67%",
        label: "Residential Area",
        layoutClasses: "order-2 col-span-1 md:order-1 md:col-span-1",
      },
      {
        id: "2",
        value: "24",
        label: "Total Plots",
        layoutClasses: "order-1 col-span-2 md:order-2 md:col-span-1",
      },
      {
        id: "3",
        value: "33%",
        label: "Open Spaces",
        layoutClasses: "order-3 col-span-1 md:order-3 md:col-span-1",
      },
    ],
  };

  const locationSectionData: InvestorsLocationSectionProps = {
    title: "Closer to What Matters",
    locations: [
      { id: "1", name: "Surathkal Lighthouse Beach", distance: "5 mins" },
      { id: "2", name: "Srinivas Hospital", distance: "5 mins" },
      { id: "3", name: "Upcoming McDonald's & KFC", distance: "5 mins" },
      { id: "4", name: "Upcoming DMart", distance: "5 mins" },
      { id: "5", name: "Mukka Beach", distance: "7 mins" },
      { id: "6", name: "Srinivas University", distance: "7 mins" },
      { id: "7", name: "Abish Mall", distance: "10 mins" },
      { id: "8", name: "Bharath Mall", distance: "20 mins" },
    ],
    ctaLabel: "Get to Know Your Neighborhood",
    ctaHref: "#",
    mapImageSrc: "/vilasamImages/mapinverstors2.png",
    mapImageSrcMobile: "/vilasamImages/mapInMobile.png",
  };

  return (
    <main>
      <InvestorsHeroSection
        thankYouRoute="/vilasam/home-buyers/thank-you"
        intent="vilasamHomeBuyersLanding"
        formName="Vilasam Home Buyers Page Form"
      />
      <InvestorsOpportunitySection {...opportunitySectionData} />
      <InvestorsAtAGlanceSection {...atAGlanceSectionData} />
      <InvestorsStatsSection {...statsSectionData} />
      <InvestorsLocationSection {...locationSectionData} />
      <InvestorsContactSection
        thankYouRoute="/vilasam/home-buyers/thank-you"
        intent="vilasamHomeBuyersLanding"
        formName="Vilasam Home Buyers Contact Form"
      />

      {/* Sticky Bottom SnackBar */}
      <InvestorsStickyCTA />
      <LandingFooter />
    </main>
  );
}
