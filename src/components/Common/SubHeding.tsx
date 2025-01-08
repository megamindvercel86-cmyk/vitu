import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SubHeading = ({ children, className = '' }: HeadingProps) => {
  // Combine default classes with any additional classes passed via props
  const combinedClassName = `text-customTextGray font-medium text-xl font-freightNeoMedium ${className}`;

  return <p className={combinedClassName}>{children}</p>;
};

export default SubHeading;
