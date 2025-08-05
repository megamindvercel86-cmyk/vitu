// utils/renderStyledText.tsx
import React, { JSX } from "react";

interface RenderStyledTextOptions {
  numberFontClass?: string;
  textFontClass?: string;
}

export function renderStyledText(
  input: string,
  options?: RenderStyledTextOptions
): JSX.Element[] {
  const {
    numberFontClass = "font-CandideCondensedNormal",
    textFontClass = "font-FreightNeoProNormal",
  } = options || {};

  return input.split(" ").map((word, idx) => {
    const isNumeric = /^[\d,.%+-]+$/.test(word);
    const className = isNumeric ? numberFontClass : textFontClass;

    return (
      <span key={idx} className={className}>
        {word + " "}
      </span>
    );
  });
}
