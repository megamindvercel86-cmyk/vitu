import React from "react";
import classNames from "classnames";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className }: HeadingProps) => {
  const combinedClassName = classNames(
    "text-customBrown font-semibold xl:text-[52px] font-freightNeoSemibold lg:text-5xl text-3xl ",
    className,
  );

  return <h2 className={combinedClassName}>{children}</h2>;
};

export default Heading;
