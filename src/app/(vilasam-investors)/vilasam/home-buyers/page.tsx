import type { Metadata } from "next";
import InvestorsHeroSection from "@/components/VilasamInvestorsPage/InvestorsHeroSection";
import InvestorsOpportunitySection, { type InvestorsOpportunitySectionProps } from "@/components/VilasamInvestorsPage/InvestorsOpportunitySection";
import InvestorsAtAGlanceSection, { type InvestorsAtAGlanceSectionProps } from "@/components/VilasamInvestorsPage/InvestorsAtAGlanceSection";
import InvestorsLocationSection, { type InvestorsLocationSectionProps } from "@/components/VilasamInvestorsPage/InvestorsLocationSection";
import InvestorsStatsSection, { type InvestorsStatsSectionProps } from "@/components/VilasamInvestorsPage/InvestorsStatsSection";
import InvestorsContactSection from "@/components/VilasamInvestorsPage/InvestorsContactSection";
import InvestorsStickyCTA from "@/components/VilasamInvestorsPage/InvestorsStickyCTA";
import WhatsappSticky from "@/components/Common/WhatsappSticky";
import {
  ChromotherapyGardenIcon,
  ClubhouseIcon,
  SecurityIcon,
  PavedRoadsIcon,
  BloomingTreesIcon,
} from "@/components/VilasamInvestorsPage/vilamLandingPageIcon";
import LandingFooter from "@/components/VilasamLanding/LandingFooter";

export const metadata: Metadata = {
  alternates: {
    canonical: "/vilasam/home-buyers",
  },
  title: "Vilasam Home Buyers | Vitu Realty",
  description: "Book your Vilasam site visit and explore premium residential villa plots in Mangaluru.",
  openGraph: {
    title: "Vilasam Home Buyers | Vitu Realty",
    description: "Book your Vilasam site visit and explore premium residential villa plots in Mangaluru.",
    url: "https://www.viturealty.com/vilasam/home-buyers",
    siteName: "Vitu-Realty",
    images: [
      {
        url: "/og-image/image.png",
        width: 1200,
        height: 630,
        alt: "Vilasam Home Buyers",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vilasam Home Buyers | Vitu Realty",
    description: "Book your Vilasam site visit and explore premium residential villa plots in Mangaluru.",
    images: ["/og-image/image.png"],
  },
};

export default function VilasamInvestorsPage() {
  const opportunitySectionData: InvestorsOpportunitySectionProps = {
    heading: (
      <>
Build a Home Where<br className="hidden md:block" />You Can Breathe & Belong
      </>
    ),
    headingMobile: "Secure your legacy in Mangalore’s growth story",
    description:
      "Vilasam brings you 24 boutique luxury villa plots in Surathkal, Mangalore - a limited-edition gated community for families who want space, privacy, greenery, and the freedom to build a home around their lifestyle. Located behind NITK, Vilasam offers calm community living with easy access to Mangalore’s key conveniences. Just Starting at ₹ 33.5 Lakhs",
    ctaLabel: "Download E-Brochure",
    images: [
      "/vilasamImages/brochureSection/1.png",
      "/vilasamImages/brochureSection/2.png",
      "/vilasamImages/brochureSection/3.png",
      "/vilasamImages/brochureSection/4.png",
      "/vilasamImages/brochureSection/5.png",
    ],
    imageAlt: "Vilasam gated entrance",
    cards: [
      { title: "10-15 mins to Everyday\nEssentials" },
      { title: "2X growth in the\nlast 3 years" },
      { title: "24x7\nGated Security" },
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
        imageSrc: "/vilasamImages/1.png",
      },
      {
        id: "2",
        label: "20,000 sq.ft. Clubhouse",
        icon: <ClubhouseIcon />,
        imageSrc: "/vilasamImages/2.png",
      },
      {
        id: "3",
        label: "24×7 Security",
        icon: <SecurityIcon />,
        imageSrc: "/vilasamImages/3.png",
      },
      {
        id: "4",
        label: "30 ft. Wide Cobblestone Paved Roads",
        icon: <PavedRoadsIcon />,
        imageSrc: "/vilasamImages/4.png",
      },
      {
        id: "5",
        label: "50+ Blooming Trees",
        icon: <BloomingTreesIcon />,
        imageSrc: "/vilasamImages/5.png",
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
    title: "Connected to Mangalore’s Key Growth Hubs",
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
