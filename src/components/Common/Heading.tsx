import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className = '' }: HeadingProps) => {
  // Combine default classes with any additional classes passed via props
  const combinedClassName = `text-customBrown font-semibold text-5xl font-freightNeoSemibold ${className}`;

  return <h2 className={combinedClassName}>{children}</h2>;
};

export default Heading;
