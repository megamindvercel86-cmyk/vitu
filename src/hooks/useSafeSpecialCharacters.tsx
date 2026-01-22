import React from "react";

export const useSafeSpecialCharacters = (text: string | undefined | null) => {
  const SAFE_REGEX = /([0-9+@._\-'",!?;:()&/%*=<>[\]{}|\\]+)/g;

  if (!text) {
    return null;
  }

  return (
    <>
      {text.split(SAFE_REGEX).map((part, index) => {
        if (SAFE_REGEX.test(part)) {
          return (
            <span key={index} className="font-CandideCondensedNormal font-normal">
              {part}
            </span>
          );
        }

        return (
          <span key={index} className="font-normal">
            {part}
          </span>
        );
      })}
    </>
  );
};
