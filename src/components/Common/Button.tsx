import React from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  const combinedClassName = classNames(
    "w-[146px] h-[55px] font-FreightNeoProBold text-white rounded-[27.5px] bg-cusomButtonColor",
    className
  );

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
