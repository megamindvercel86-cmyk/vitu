"use client";

import Accordion, { AccordionItem } from "@/components/Common/Accordian";
import AnimatedNumberCounter from "../AnimatedNumberCounter";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Features2({
  accordianData,
  style = "1",
}: {
  accordianData: {
    value: string;
    trigger: string;
    content: React.ReactNode;
    image: string | StaticImport;
  }[];
  style?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <section className="bg-[#1C1213] relative z-50 ">
      <div className="pt-16 pb-0 lg:pb-0   lg:pt-28 container mx-auto lg:border-l lg:border-r border-[#C7784D]">
        <div className="px-4 lg:px-12">
          <h6 className="text-[#DAA37A] text-center lg:text-left uppercase lg:text-lg leading-[24px] font-FreightNeoProNormal">
            Project amenities
          </h6>
          <AnimatedHeading className="text-[#E0D9C7] text-center font-FreightNeoProNormal mt-3 lg:mt-1 text-[32px] leading-[100%] lg:text-[42px] lg2:text-5xl">
            A World Of Comfort Within
          </AnimatedHeading>
        </div>
        <div
          className={`grid grid-cols-1 ${style === "1" ? "lg:grid-cols-3" : "lg:grid-cols-4"} lg2:grid-cols-4 mt-4 lg:mt-20 lg:border-t lg:border-b border-[#C7784D]`}
        >
          <div className={`${style === "1" ? "lg2:min-w-[27rem]" : ""}`}>
            <p className="py-6 lg:py-10 text-lg leading-[24px] font-FreightNeoProNormal text-[#E0D9C7E5] text-pretty text-justify px-12 lg:border-r border-[#C7784D] ">
              A lifestyle that flows as freely as the spaces around you. Live in
              a community that feels expansive and calm, with nature woven into
              everyday living. From shaded walkways to green zones and refined
              amenities, everything is designed for luxury and ease.
            </p>
          </div>
          {style === "1" ? (
            <div className="lg:border-r border-[#C7784D] hidden lg2:block"></div>
          ) : (
            <div className="lg:border-r border-[#C7784D] flex items-center justify-center">
              <AnimatedNumberCounter
                textColor="#E0D9C7"
                targetNumber={3800}
                decimalPlaces={0}
                description="Total Project Area (in SQM)"
              />
            </div>
          )}
          <div className="lg:border-r border-[#C7784D] flex items-center justify-center">
            <AnimatedNumberCounter
              textColor="#E0D9C7"
              targetNumber={38.3}
              title="%"
              decimalPlaces={1}
              description="Parks and Open Spaces"
            />
          </div>
          <div className="flex items-center justify-center">
            <AnimatedNumberCounter
              staticTitle="20:80"
              textColor="#E0D9C7"
              targetNumber={10.67}
              decimalPlaces={2}
              description="Payment Plan Ideal for investors seeking long-term value"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-stretch mt-8 lg:mt-0 gap-8">
          <div className="lg:basis-1/2 relative lg:h-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={accordianData[activeIndex ?? 0].value}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="lg:absolute inset-0 h-[400px] lg:h-auto"
              >
                <Image
                  src={accordianData[activeIndex ?? 0].image}
                  fill
                  placeholder="blur"
                  style={{ objectFit: "cover" }}
                  alt="Accordion Image"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:basis-1/2 px-12 lg:px-12">
            <Accordion value={"1"} className="lg:space-y-8">
              {accordianData.map((item, index) => (
                <AccordionItem
                  onClick={() => setActiveIndex(index)}
                  fontFamily="font-tenorSans"
                  fontWeight="font-normal"
                  textColor="#E0D9C7"
                  textSize="text-[26px] lg:text-[36px] leading-[100%]"
                  className="border-[#C7784D] border-b "
                  key={item.value}
                  value={item.value}
                  trigger={item.trigger}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
     
    </section>
  );
}
