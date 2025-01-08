import React from "react";

interface ButtonProps {
    onClick: (e: React.FormEvent) => void;  
  children: React.ReactNode;
  className?: string;
}

const Button = ({ onClick, children, className = "" }: ButtonProps) => {
  // Combine the default classes with any additional classes passed via props
  const combinedClassName = `w-[146px] h-[55px] font-FreightNeoProBold text-white   rounded-[27.5px] bg-cusomButtonColor ${className}`;

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default Button;
