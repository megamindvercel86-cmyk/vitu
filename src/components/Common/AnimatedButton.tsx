"use client";

import Link from "next/link";
import CTAButtonIcon from "../Icons/Icons";

interface CTAButtonProps {
  iconDirection?: "left" | "right" | "down"; // Prop for arrow direction
  fill?: string;
}

export default function AnimatedButton({
  CTAButtonProps,
  children,
  ariaLabel,
  href,
}: {
  CTAButtonProps: CTAButtonProps;
  children: any;
  ariaLabel: string;
  href: string;
}): React.ReactElement {
  return (
    <Link href={href} aria-label={ariaLabel}>
      {/* ================================================== */}

      <div className="relative group cursor-pointer">
        <button
          aria-label={ariaLabel}
          type="button"
          className="
  relative group
  flex items-center justify-center
  gap-[0.6875rem]
  rounded-full
  pl-[10px] pr-[1rem] py-[0.1875rem]  /* Increased right padding */
  text-base font-freightNeoMedium text-white
  2xl:pt-4 2xl:pb-4 2xl:pr-6 2xl:text-[2rem]  /* Adjusted for larger screens */
  overflow-hidden
"
        >
          {/* Default background */}
          <div className="absolute inset-0 bg-[#A0BCAE] rounded-full"></div>

          {/* Hover effect starts from the icon */}
          <div className="relative z-10 flex items-center justify-center w-[2rem] h-[2rem]">
            {/* Expanding hover background */}
            <div
              className="
      absolute w-0 h-0 bg-[#4B9480] rounded-full
      group-hover:w-[30rem] group-hover:h-[30rem]
      transition-all duration-500 ease-out
    "
            ></div>

            {/* Icon stays above the expanding background */}
            <div className="relative z-20">
              <CTAButtonIcon
                direction={CTAButtonProps.iconDirection}
                fill={CTAButtonProps.fill}
              />
            </div>
          </div>

          {/* Button text (added margin-right for spacing) */}
          <span className="relative z-20 mt-[2px] md:mt-0 min-w-max">{children}</span>
        </button>
      </div>

      {/* ============================================================ */}
    </Link>
  );
}
