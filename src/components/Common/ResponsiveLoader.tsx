"use client";

import React, { Suspense } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ResponsiveLoaderProps {
    DesktopComponent: React.ComponentType<any>;
    MobileComponent: React.ComponentType<any>;
    desktopProps?: any;
    mobileProps?: any;
    fallback?: React.ReactNode;
}

export default function ResponsiveLoader({
    DesktopComponent,
    MobileComponent,
    desktopProps = {},
    mobileProps = {},
    fallback = <div className="min-h-[300px] w-full bg-transparent" />,
}: ResponsiveLoaderProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <>{fallback}</>;
    }

    return (
        <Suspense fallback={fallback}>
            {isDesktop ? (
                <DesktopComponent {...desktopProps} />
            ) : (
                <MobileComponent {...mobileProps} />
            )}
        </Suspense>
    );
}
