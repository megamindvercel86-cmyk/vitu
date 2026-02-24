"use client";

import { renderStyledText } from "@/lib/renderStyledText";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// ✅ Counter component (your logic)
const Counter: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const isNumeric = /[0-9]/.test(value); // check if value contains a number
  const isRange = value.includes("-");

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || !isNumeric) return;

    if (isRange) {
      const numbers = value.split("-").map((v) => parseFloat(v.replace(/[^0-9.]/g, "")));
      const start = numbers[0];
      const end = numbers[1];
      const duration = 2000;
      const incrementTime = 150;
      const steps = duration / incrementTime;
      const stepSize = Math.max(1, Math.ceil((end - start) / steps));

      setCount(start);

      const timer = setInterval(() => {
        setCount((prev) => {
          const next = prev + stepSize;
          if (next >= end) {
            clearInterval(timer);
            return end;
          }
          return next;
        });
      }, incrementTime);

      return () => clearInterval(timer);
    } else {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
      const start = numericValue - 5 >= 0 ? numericValue - 5 : 0;
      const end = numericValue;
      const duration = 2000;
      const incrementTime = 150;
      const steps = duration / incrementTime;
      const stepSize = Math.max(1, (end - start) / steps);

      setCount(start);

      const timer = setInterval(() => {
        setCount((prev) => {
          const next = prev + stepSize;
          if (next >= end) {
            clearInterval(timer);
            return end;
          }
          return next;
        });
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, isNumeric, isRange]);

  // Display logic
  const displayValue = !isNumeric
    ? value // show text as-is
    : isRange
      ? `${count.toLocaleString()} - ${value.split("-")[1].trim()}`
      : value.includes("+")
        ? `${count.toLocaleString()}+`
        : value.includes("sq.ft.") || value.includes("sq.m.")
          ? `${count.toLocaleString()} ${inView ? value.match(/sq\.\w+\.?/)?.[0] || "" : ""}`
          : count.toLocaleString();

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="inline-block">
      {displayValue}
    </motion.span>
  );
};

// ✅ Main Component with counter inside
export default function NumberCounter2ELite({
  data,
  noBorder = false,
}: {
  data: {
    description: string;
    title: string;
    subtitle?: string;
    icon?: string;
  }[];
  noBorder?: boolean;
}) {
  return (
    <section className="">
      <div className="container px-4 lg:px-0 mx-auto relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {data?.map((item, index) => (
            <div key={index} className={`text-center py-6 space-y-2 lg:py-10`}>
              <div className="flex gap-6 mx-auto justify-center">
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-[32px] sm:text-[34px] text-customBrown lg2:text-[40px] xl:text-[60px] leading-[100%] font-CandideCondensedNormal tabular-nums animate-[pulse_0.3s_ease-out]`}
                  >
                    {/* Split numeric and text parts */}
                    {(() => {
                      const match = item.title.match(/[0-9,.]+/); // get first number
                      const numberPart = match ? match[0] : "";
                      const textPart = match ? item.title.replace(numberPart, "") : item.title;

                      return (
                        <>
                          {/* Animate only the numeric part */}
                          {numberPart && <Counter value={numberPart} />}
                          {/* Show remaining text */}
                          {textPart && <span>{textPart}</span>}
                        </>
                      );
                    })()}
                  </h3>

                  <h2 className="text-xl font-freightNeoMedium sm:text-xl font-semibold text-customBrown pt-1 md:pt-4">{item.subtitle}</h2>
                </div>
              </div>

              {item.description && (
                <p className={`font-FreightNeoProNormal text-customBrown text-[18px] leading-[24px] px-4`}>{renderStyledText(item.description)}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          {/* Brochure link (still commented) */}
          {/* <Link
            href="/brochure.pdf"
            className="inline-block px-6 py-2 border text-[#1C1213] font-FreightNeoProNormal border-black rounded-full text-sm tracking-wider hover:bg-black hover:text-white transition"
          >
            DOWNLOAD BROCHURE →
          </Link> */}
        </div>
      </div>
    </section>
  );
}
