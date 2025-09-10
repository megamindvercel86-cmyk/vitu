import { cn } from "@/lib/utils";

export const AnimatedConicButton = ({
  children,
  buttonBase="conic-button-base",
  className,
  theme = "dark", // 'dark', 'light', 'mid-dark-light', 'custom'
  ...props
}) => {
  let themeClass;
  if (theme === "light") {
    themeClass = "theme-light";
  } else if (theme === "mid-dark-light") {
    themeClass = "theme-mid-dark-light";
  } else if (theme === "custom") {
    themeClass = "theme-custom"; // our new custom theme
  } else {
    themeClass = "theme-dark"; // default
  }

  return (
    <button className={cn(`${buttonBase}`, themeClass, className)} {...props}>
      <div className="animated-border-overlay-base " />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
};
  