import React from "react";
import classNames from "classnames";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: HeadingProps) => {
  const combinedClassName = classNames(
    "text-customBrown font-semibold text-5xl font-freightNeoSemibold",
    className
  );

  return <h2 className={combinedClassName}>{children}</h2>;
};

export default Heading;
