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
  title: "Vilasam Investors | Vitu Realty",
  description: "Book your Vilasam site visit and explore premium investment-ready villa plots in Mangaluru.",
  openGraph: {
    title: "Vilasam Investors | Vitu Realty",
    description: "Book your Vilasam site visit and explore premium investment-ready villa plots in Mangaluru.",
    url: "https://www.viturealty.com/vilasam/investors",
    siteName: "Vitu-Realty",
    images: [
      {
        url: "/og-image/image.png",
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
    images: ["/og-image/image.png"],
  },
};

export default function VilasamInvestorsPage() {
  const opportunitySectionData: InvestorsOpportunitySectionProps = {
    heading: (
      <>
        Invest in Mangalore's <br className="hidden md:block" /> Fast-Growing Corridor
      </>
    ),
    headingMobile: "Secure your legacy in Mangalore’s growth story",
    description:
      "24 Limited Edition Luxury Villa Plots in Surathkal, Mangalore. A rare asset in a rapidly growing coastal corridor.",
    ctaLabel: "Download E-Brochure",
    images: ["/vilasamImages/brochureSection/1.png", "/vilasamImages/brochureSection/2.png", "/vilasamImages/brochureSection/3.png", "/vilasamImages/brochureSection/4.png", "/vilasamImages/brochureSection/5.png"],
    imageAlt: "Vilasam gated entrance",
    cards: [
      { title: "2X growth in the\nlast 3 years" },
      { title: "10X future potential", subtitle: "from SEZs, Port & Expressway" },
      { title: "3-year resale\nflexibility" },
      { title: "15 mins away\nfrom city" },
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
    title: "Location Proximities",
    locations: [
      { id: "1", name: "Surathkal Railway Station", distance: "5 mins" },
      { id: "2", name: "Mangalore International Airport", distance: "15 mins" },
      { id: "3", name: "New Mangalore Port", distance: "15 mins" },
      { id: "4", name: "Haleyangadi Junction", distance: "15 mins" },
    ],
    ctaLabel: "Get to Know Your Neighborhood",
    ctaHref: "#",
    mapImageSrc: "/vilasamImages/mapinverstors1.png",
    mapImageSrcMobile: "/vilasamImages/mapInMobile.png",
  };

  return (
    <main>
      <InvestorsHeroSection />
      <InvestorsOpportunitySection {...opportunitySectionData} />
      <InvestorsAtAGlanceSection {...atAGlanceSectionData} />
      <InvestorsStatsSection {...statsSectionData} />
      <InvestorsLocationSection {...locationSectionData} />
      <InvestorsContactSection thankYouRoute="/vilasam/investors/thank-you" intent="vilasamLanding" formName="Vilasam Investors Contact Form" />
      {/* Sticky Bottom SnackBar */}
      <InvestorsStickyCTA />
    
      <LandingFooter />
    </main>
  );
}
