import React from 'react';
import classNames from "classnames";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}


const SubHeading = ({ children, className }: HeadingProps) => {
  const combinedClassName = classNames(
    "text-customTextGray font-medium sm:text-[19px] text-[19px] md:text-xl  font-freightNeoMedium",
    className
  );

  return <p className={combinedClassName}>{children}</p>;
};

export default SubHeading;


