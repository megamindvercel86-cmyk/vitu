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
  variant?: "h1" | "h2" | "h3" | "body" | "small" | "nav" | "custom";
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
      className={`text-[2.5rem] lg:text-[4rem] xl:text-[4.375rem] 2xl:text-[6.25rem] ${
        fontWeight ? fontWeight : "font-semibold"
      } ${className}`}
    >
      {children}
    </h1>
  ) : variant === "h2" ? (
    <h2
      ref={ref}
      style={style}
      className={`text-[32px] lg:text-[44px] 2xl:text-5xl ${
        fontWeight ? fontWeight : "font-medium"
      } ${className}`}
    >
      {children}
    </h2>
  ) : variant === "h3" ? (
    <h3
      ref={ref}
      style={style}
      className={`${className} text-base lg:text-2xl ${
        fontWeight ? fontWeight : "font-semibold"
      } `}
    >
      {children}
    </h3>
  ) : variant === "body" ? (
    <p
      ref={ref}
      style={style}
      className={`text-base lg:text-xl ${
        fontWeight ? fontWeight : "font-normal"
      } ${className}`}
    >
      {children}
    </p>
  ) : variant === "small" ? (
    <p
      ref={ref}
      style={style}
      className={`text-sm lg:text-base ${
        fontWeight ? fontWeight : "font-normal"
      } ${className}`}
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