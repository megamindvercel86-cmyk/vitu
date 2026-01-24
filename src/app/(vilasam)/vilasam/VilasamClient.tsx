"use client";

import dynamic from "next/dynamic";
import ResponsiveLoader from "@/components/Common/ResponsiveLoader";

// Dynamic Imports with ssr: false for interactive/below-fold components
const VilasamCarousel = dynamic(() => import("@/components/VilasamProjectPage/carousel/page"), { ssr: false });
const LocationAdvantage = dynamic(() => import("@/components/VilasamProjectPage/VilasamLocation/page"), { ssr: false });
const ElevatesLiving = dynamic(() => import("@/components/VilasamProjectPage/VilasamDetails/page"), { ssr: false });
const CurrentProject = dynamic(() => import("@/components/VilasamProjectPage/CurrentProject/CurrentProject"), { ssr: false });
const LyfeStyle = dynamic(() => import("@/components/VilasamProjectPage/LyfeStyle/LyfeStyle"), { ssr: false });
const VilasamExploreProjects = dynamic(() => import("@/components/VilasamProjectPage/VilasamExploreProject/page"), { ssr: false });
const VilasamLegacyBuiltComponent = dynamic(() => import("@/components/VilasamProjectPage/LegacyComponent/page"), { ssr: true });
const UrbanAccessSection = dynamic(() => import("@/components/VilasamProjectPage/UrbanAccessSection/UrbanAccessSection"), { ssr: false });

// Conditional Components
const PlotConnection = dynamic(() => import("@/components/VilasamProjectPage/VilasamPlotConnection/PlotConnection"), { ssr: false });
const PlotConnectionMobile = dynamic(() => import("@/components/VilasamProjectPage/PlotConnectionMobile/PlotConnectionMobile"), { ssr: false });
const PlotWrapper = dynamic(() => import("@/components/VilasamProjectPage/Plots/page"), { ssr: false });
const PropertyCard = dynamic(() => import("@/components/VilasamProjectPage/PlotCarousal/PlotCarousal"), { ssr: false });

export default function VilasamClient() {



    return (
        <>
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

            {/* Plot Connection - Responsive Loading */}
            <section className="bg-[#FAFFFD] mb-20 lg2:mb-32">
                <ResponsiveLoader
                    DesktopComponent={PlotConnection}
                    MobileComponent={PlotConnectionMobile}
                />
            </section>

            <section className="bg-[#FAFFFD] ">
                <VilasamExploreProjects />
            </section>

            {/* Plots Wrapper / Property Card - Responsive Loading */}
            <section className="bg-[#FAFFFD] mb-28 lg:mb-23 xl:mb-0">
                <ResponsiveLoader
                    DesktopComponent={PlotWrapper}
                    MobileComponent={PropertyCard}
                />
            </section>

            <section className="mb-20 lg2:mb-36">
                <VilasamLegacyBuiltComponent />
            </section>
            <section className="mt-10 lg2:mt-12">
                <UrbanAccessSection />
            </section>
        </>
    );
}
