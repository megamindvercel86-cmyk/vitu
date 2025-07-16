"use client";

import Typography from "../Typography/Typography";

interface StatsComponentProps {
  postfix: string;
  items: Array<{
    value: string;
    label: string;
  }>;
}

export default function StatsComponent({
  postfix = "+",
  items,
}: StatsComponentProps): React.ReactElement {
  return (
    <div className="lg:mt-32  mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 pb-7 ">
      {items.map(({ value, label }, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <h2 className="font-fsSiena text-customCongoBrown text-[1.5rem] lg:text-4xl lg2:text-7xl">
            {value}
            {postfix}
          </h2>
          <Typography
            variant="custom"
            className="font-fsSplitSans text-customCongoBrown/60 mt-2 text-sm  lg:text-xl lg2:text-3xl"
          >
            {label}
          </Typography>
        </div>
      ))}
    </div>
  );
}
