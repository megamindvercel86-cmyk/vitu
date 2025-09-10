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

  // Regex to detect numeric portion at start of word
  const numberRegex = /^[-+]?(\d{1,3}(,\d{3})*|\d+)(\.\d+)?-?%?/;

  return input.split(" ").map((word, idx) => {
    const match = word.match(numberRegex);

    if (match) {
      // Separate numeric part and remaining text
      const numericPart = match[0];
      const remainingPart = word.slice(numericPart.length);

      return (
        <span key={idx}>
          <span className={numberFontClass}>{numericPart}</span>
          {remainingPart && <span className={textFontClass}>{remainingPart} </span>}
          {!remainingPart && " "}
        </span>
      );
    }

    // No numeric part, full word is text
    return (
      <span key={idx} className={textFontClass}>
        {word + " "}
      </span>
    );
  });
}
