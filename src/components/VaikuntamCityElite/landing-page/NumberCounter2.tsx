"use client";

import NormalNumberCounter from "../NormalNumberCounter";

export default function NumberCounter2({
  data,
  noBorder = false,
}: {
  data: {
    description: string;
    title: string;
    icon?: string; // Optional: to specify an icon
  }[];
  noBorder?: boolean;
}) {
  return (
    <section className="bg-[#F3EAE1]">
      <div
        className={`container px-4 lg:px-0 mx-auto ${noBorder ? "" : "lg:border-l"} lg:border-t lg:border-b border-[#1C1213] relative z-30`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 ">
          {data?.map((item, index) => (
            <NormalNumberCounter
              icon={item.icon}
              key={index}
              description={item.description}
              title={item.title}
              noBorder={noBorder && index === data.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
