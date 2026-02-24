import React from "react";

const SAFE_SPLIT_REGEX = /([0-9+@._\-'",!?;:()&/%*=<>[\]{}|\\]+)/g;
const SAFE_TOKEN_REGEX = /^[0-9+@._\-'",!?;:()&/%*=<>[\]{}|\\]+$/;

export const safeSpecialCharacters = (text: string | undefined | null) => {
  if (!text) {
    return null;
  }

  return (
    <>
      {text.split(SAFE_SPLIT_REGEX).map((part, index) => (
        <span key={index} className={SAFE_TOKEN_REGEX.test(part) ? "font-CandideCondensedNormal font-normal" : "font-normal"}>
          {part}
        </span>
      ))}
    </>
  );
};
