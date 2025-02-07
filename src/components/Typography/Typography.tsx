"use client";

import React from "react";

export default function Typography({
  variant,
  className,
  children,
  style,
  fontWeight,
  ref,
}: {
  variant?: "h1" | "h2" | "h3" | "body" | "small" | "nav" | "custom" | "number";
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  fontWeight?: string;
  ref?: any;
}) {
  return variant === "h1" ? (
    <h1
      ref={ref}
      style={style}
      className={`xl:text-[3.25rem] lg:text-5xl md:text-[3rem] font-freightNeoSemibold  text-3xl ${className}`}
    >
      {children}
    </h1>
  ) : variant === "h2" ? (
    <h2
      ref={ref}
      style={style}
      className={`text-[32px] lg2:text-[44px] 2xl:text-5xl ${
        fontWeight ? fontWeight : "font-medium"
      } ${className}`}
    >
      {children}
    </h2>
  ) : variant === "h3" ? (
    <h3
      ref={ref}
      style={style}
      className={`${className} text-base lg2:text-2xl ${
        fontWeight ? fontWeight : "font-semibold"
      } `}
    >
      {children}
    </h3>
  ) : variant === "body" ? (
    <p
      ref={ref}
      style={style}
      className={`text-lg lg:text-xl md:text-lg  font-freightNeoMedium text-customTextGray font-medium ${className}`}
    >
      {children}
    </p>
  ) : variant === "small" ? (
    <p
      ref={ref}
      style={style}
      className={`text-customTextGray font-medium sm:text-[19px] text-[19px] md:text-xl  font-freightNeoMedium ${className}`}
    >
      {children}
    </p>
  ) : variant === "nav" ? (
    <p
      ref={ref}
      style={style}
      className={`text-base 2xl:text-xl ${
        fontWeight ? fontWeight : "font-normal"
      } ${className}`}
    >
      {children}
    </p>
  ) : variant === "custom" ? (
    <p ref={ref} style={style} className={className}>
      {children}
    </p>
  ) : variant === "number" ? (
    <p
      ref={ref}
      style={style}
      className={`text-customTextGray font-CandideCondensedBold font-bold ${className}`}
    >
      {children}
    </p>
  ) : (
    <p
      ref={ref}
      style={style}
      className={`text-base ${
        fontWeight ? fontWeight : "font-normal"
      } ${className}`}
    >
      {children}
    </p>
  );
}
