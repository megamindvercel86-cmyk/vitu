"use client";
import { useEffect, useState } from "react";

const MOBILE_WIDTH = 768;

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= MOBILE_WIDTH;
}

/**
 * Custom React hook that determines if the current viewport is considered mobile.
 *
 * This hook listens for window resize events and updates its state accordingly.
 * It relies on a `getIsMobile` function (not shown here) to determine the mobile status.
 *
 * @returns {boolean} `true` if the viewport is mobile-sized, otherwise `false`.
 *
 * @remarks
 * - Make sure to define and import the `getIsMobile` function, which should return a boolean
 *   indicating whether the current window size matches your mobile criteria.
 * - The hook sets up and cleans up the resize event listener automatically.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    function handleResize() {
      setIsMobile(getIsMobile());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
