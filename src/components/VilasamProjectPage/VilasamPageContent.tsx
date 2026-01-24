"use client";

import VilasamHeroSection from "@/components/VilasamProjectPage/VilasamHeroBanner/page";
import dynamic from "next/dynamic";

const VilasamCarousel = dynamic(() => import("@/components/VilasamProjectPage/carousel/page"), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-transparent" />
});

const CurrentProject = dynamic(() => import("@/components/VilasamProjectPage/CurrentProject/CurrentProject"), {
    ssr: false,
    loading: () => <div className="w-full h-[100vh] bg-transparent" />
});

const VilasamLegacyBuiltComponent = dynamic(() => import("@/components/VilasamProjectPage/LegacyComponent/page"), {
    ssr: false,
    loading: () => <div className="w-full h-[60vh] bg-transparent" />
});

const LyfeStyle = dynamic(() => import("@/components/VilasamProjectPage/LyfeStyle/LyfeStyle"), {
    ssr: false,
    loading: () => <div className="w-full h-[70vh] bg-transparent" />
});

const PropertyCard = dynamic(() => import("@/components/VilasamProjectPage/PlotCarousal/PlotCarousal"), {
    ssr: false,
    loading: () => <div className="w-full h-[500px] bg-transparent" />
});

// Mobile Plot Connection - Loads only on mobile
const PlotConnectionMobile = dynamic(() => import("@/components/VilasamProjectPage/PlotConnectionMobile/PlotConnectionMobile"), {
    ssr: false,
    loading: () => <div className="md:hidden block w-full h-[600px] bg-transparent" />
});

const PlotWrapper = dynamic(() => import("@/components/VilasamProjectPage/Plots/page"), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-transparent" />
});

const UrbanAccessSection = dynamic(() => import("@/components/VilasamProjectPage/UrbanAccessSection/UrbanAccessSection"), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-transparent" />
});

const ElevatesLiving = dynamic(() => import("@/components/VilasamProjectPage/VilasamDetails/page"), {
    ssr: false,
    loading: () => <div className="w-full h-[80vh] bg-transparent" />
});

const VilasamExploreProjects = dynamic(() => import("@/components/VilasamProjectPage/VilasamExploreProject/page"), {
    ssr: false,
    loading: () => <div className="w-full h-[600px] bg-transparent" />
});

const LocationAdvantage = dynamic(() => import("@/components/VilasamProjectPage/VilasamLocation/page"), {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-transparent" />
});

// Desktop Plot Connection - Loads only on desktop
const PlotConnection = dynamic(() => import("@/components/VilasamProjectPage/VilasamPlotConnection/PlotConnection"), {
    ssr: false,
    loading: () => <div className="hidden md:block w-full h-[100vh] bg-transparent" />
});

export default function VilasamPageContent() {
    return (
        <div className="bg-[#FAFFFD] flex flex-col">
            <section className="relative mb-20 lg2:mb-32">
                <VilasamHeroSection />
            </section>
            <section className="bg-white mb-20 lg2:mb-32">
                <VilasamCarousel />
            </section>
            <section id="sustainability" className="mb-20 lg2:mb-32">
                <LocationAdvantage />
            </section>
            <section className="bg-[#FAFFFD] mb-20 lg2:mb-32">
                <ElevatesLiving />
            </section>
            <section className="bg-[#FAFFFD] mb-20 lg2:mb-32">
                <CurrentProject />
            </section>
            <section className="bg-[#FAFFFD] mb-20 lg:mb-0 ">
                <LyfeStyle />
            </section>
            <section className="bg-[#FAFFFD] md:block hidden mb-20 lg2:mb-32">
                <PlotConnection />
            </section>
            <section className="bg-[#FAFFFD] md:hidden block mb-20 lg2:mb-32">
                <PlotConnectionMobile />
            </section>
            <section className="bg-[#FAFFFD] ">
                <VilasamExploreProjects />
            </section>
            <section className="bg-[#FAFFFD] hidden md:block mb-28 lg:mb-23 xl:mb-0">
                <PlotWrapper />
            </section>
            <section className="bg-[#FAFFFD] md:hidden mb-20 lg2:mb-3">
                <PropertyCard />
            </section>
            <section className="mb-20 lg2:mb-36">
                <VilasamLegacyBuiltComponent />
            </section>
            <section className="mt-10 lg2:mt-12">
                <UrbanAccessSection />
            </section>
        </div>
    );
}
