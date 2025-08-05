"use client";

import { renderStyledText } from "@/lib/renderStyledText";

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
  icon="",
}: NumberCounterProps) {
  const localNoBorder = noBorder || false; // Default to false if noBorder is not provided

  return (
    <div
      className={`text-center py-6 space-y-2 lg:py-10 ${localNoBorder ? "" : "lg:border-r border-[#1C1213]"}`}
    >
      <img src={`/svgs/${icon}.svg`} className="mx-auto w-auto h-14 lg:h-16" />
      <div className="flex gap-6 mx-auto justify-center ">
        <h3
          style={{
            color: textColor,
            opacity: "0.9",
          }}
          className={`text-[32px] sm:text-[34px] lg2:text-[40px] leading-[100%] font-CandideCondensedNormal tabular-nums animate-[pulse_0.3s_ease-out]`}
        >
          {title}
        </h3>
      </div>

      {description && (
        <p
          className={`font-FreightNeoProNormal text-[18px] leading-[24px] px-4 `}
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
