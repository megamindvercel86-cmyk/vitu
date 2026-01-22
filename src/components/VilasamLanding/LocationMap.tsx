"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100%",
};

// Default center (Mangalore)
const defaultCenter = {
    lat: 12.9141,
    lng: 74.8560,
};

interface LocationMapProps {
    apiKey?: string;
    center?: { lat: number; lng: number };
    zoom?: number;
}

export default function LocationMap({
    apiKey = "", // Default to empty string if not provided
    center = defaultCenter,
    zoom = 15,
}: LocationMapProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        // This is just an example of getting the map instance
        const bounds = new window.google.maps.LatLngBounds(center);
        map.setZoom(zoom);
        setMap(map);
    }, [center, zoom]);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const handleMarkerClick = () => {
        // Open Google Maps in a new tab
        const url = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
        window.open(url, "_blank");
    };

    if (loadError) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                Error loading maps
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm animate-pulse">
                Loading Map...
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                disableDefaultUI: false, // Keep controls
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: true,
            }}
        >
            <Marker
                position={center}
                onClick={handleMarkerClick}
                title="Click to view on Google Maps"
            // You can add a custom icon here later via the 'icon' prop
            // icon="/path/to/custom-marker.png"
            />
        </GoogleMap>
    );
}
