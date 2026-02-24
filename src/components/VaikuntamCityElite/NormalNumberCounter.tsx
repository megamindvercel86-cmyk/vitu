"use client";

import { renderStyledText } from "@/lib/renderStyledText";
import Image from "next/image";

interface NumberCounterProps {
  title: string;
  description: string;
  textColor?: string; // Optional: to customize the text color
  noBorder?: boolean; // Optional: to remove the border
  icon?: string; // Optional: to specify an icon
}

export default function NormalNumberCounter({
  title,
  description,
  textColor = "#37121A",
  noBorder,
  icon = "",
}: NumberCounterProps) {
  const localNoBorder = noBorder || false; // Default to false if noBorder is not provided

  return (
    <div
      className={`text-center py-6 space-y-2 cursor-default lg:py-10 group ${localNoBorder ? "" : "lg:border-r border-[#1C1213]"}`}
    >
      {icon && (
        <Image
          src={`/svgs/${icon}.svg`}
          alt={`${icon} icon`}
          width={64}
          height={64}
          className="mx-auto w-auto h-14 lg:h-16 group-hover:scale-110 transition-all ease-in-out duration-300"
        />
      )}
      <div className="flex gap-6 mx-auto justify-center ">
        <h3
          style={{
            color: textColor,
            opacity: "0.9",
          }}
          className={`text-[32px] group-hover:-translate-y-[2px] transition-transform ease-in-out duration-300 sm:text-[34px] lg2:text-[40px] leading-[100%] font-CandideCondensedNormal tabular-nums animate-[pulse_0.3s_ease-out]`}
        >
          {title}
        </h3>
      </div>

      {description && (
        <p
          className={`font-FreightNeoProNormal group-hover:-translate-y-[2px] transition-transform ease-in-out duration-300 text-[18px] leading-[24px] px-4 `}
          style={{
            color: textColor,
            opacity: "0.9",
          }}
        >
          {renderStyledText(description)}
        </p>
      )}
    </div>
  );
}
