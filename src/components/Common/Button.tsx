import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  defaultTextColor?: string;
  onClick?: () => void;  // Make onClick optional
}

const Button = ({
  onClick,
  children,
  className,
  defaultTextColor = "text-white",
}: ButtonProps) => {
  const combinedClassName = classNames(
    "w-[146px] h-[55px] font-FreightNeoProBold rounded-[27.5px] bg-cusomButtonColor transition-colors pt-1",
    defaultTextColor,
    className,
  );

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
