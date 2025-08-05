"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface NumberCounterProps {
  title?: string;
  description?: string;
  targetNumber: number;
  duration?: number; // in milliseconds
  delay?: number; // in milliseconds before starting the animation
  textColor?: string; // Optional: to customize the text color
  decimalPlaces?: number; // Optional: number of decimal places
  noBorder?: boolean; // Optional: to remove the border
}

export default function AnimatedNumberCounter({
  title,
  description,
  targetNumber,
  duration = 2000,
  delay = 0,
  textColor = "#37121A",
  decimalPlaces = 0,
  noBorder,
}: NumberCounterProps) {
  const localNoBorder = noBorder || false; // Default to false if noBorder is not provided
  const [currentValue, setCurrentValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const containerRef = useRef(null);
  const isInViewport = useInView(containerRef, {
    once: true,
  });
  const calculatedDelay = useIsMobile() ? 0 : delay;

  useEffect(() => {
    if (!isInViewport) {
      setCurrentValue(0);
      setHasStarted(false);
      return;
    }
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, calculatedDelay);
    return () => clearTimeout(timer);
  }, [calculatedDelay, isInViewport]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = Date.now();
    const endTime = startTime + duration;
    let lastDisplayed = -1;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Smooth easing
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newValue = easeOutCubic * targetNumber;

      // Round to required decimal places
      const roundedValue = parseFloat(newValue.toFixed(decimalPlaces));

      // Trigger pulse only when visible value changes
      if (roundedValue !== lastDisplayed) {
        setPulseKey((prev) => prev + 1);
        lastDisplayed = roundedValue;
      }

      setCurrentValue(roundedValue);

      if (now < endTime) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }, [targetNumber, duration, hasStarted, decimalPlaces]);

  return (
    <div
      className={`text-center py-6 lg:py-10 ${localNoBorder ? "" : "lg:border-r border-[#1C1213]"}`}
      ref={containerRef}
    >
      <div className="flex gap-6 mx-auto justify-center ">
        <h3
          key={pulseKey}
          style={{
            color: textColor,
            opacity: "0.9",
          }}
          className={`text-[56px] sm:text-[66px] lg2:text-[76px] leading-[100%] font-CandideCondensedNormal tabular-nums animate-[pulse_0.3s_ease-out]`}
        >
          {currentValue.toLocaleString(undefined, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          })}
        </h3>
        {title && (
          <p
            style={{
              color: textColor,
              opacity: "0.9",
            }}
            className={`text-[56px] sm:text-[66px] lg2:text-[76px] leading-[100%] font-FreightNeoProNormal`}
          >
            {title}
          </p>
        )}
      </div>

      {description && (
        <p
          className={`font-FreightNeoProNormal text-[18px] leading-[24px] px-2`}
          style={{
            color: textColor,
            opacity: "0.9",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
