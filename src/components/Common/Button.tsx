import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  defaultTextColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button = ({
  onClick,
  children,
  className,
  defaultTextColor = "text-white",
  disabled = false,
}: ButtonProps) => {
  const combinedClassName = classNames(
    "w-[146px] h-[55px] pt-[3px] font-FreightNeoProBold rounded-[27.5px] bg-cusomButtonColor transition-color",
    defaultTextColor,
    className,
  );

  return (
    <button onClick={onClick} disabled={disabled} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
