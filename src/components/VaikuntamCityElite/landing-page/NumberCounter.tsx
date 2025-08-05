"use client";

import AnimatedNumberCounter from "../AnimatedNumberCounter";

export default function NumberCounter({
  data,
  noBorder = false,
}: {
  data: {
    targetNumber: number;
    delay: number;
    description: string;
    title: string;
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
            <AnimatedNumberCounter
              key={index}
              targetNumber={item.targetNumber}
              delay={item.delay}
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
