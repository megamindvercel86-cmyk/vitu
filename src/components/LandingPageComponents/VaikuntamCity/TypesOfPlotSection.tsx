"use client";

//============ Component Imports =============
import Accordion, { AccordionItem } from "@/components/Common/Accordian";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";

// ============ Function to generate Accordian Item Content =============
// This function generates the content for each accordion item
// It takes an array of strings and returns a list of items with a tick icon
// Each item is styled with a specific font and color
const AccordianItemContent = (content: string) => {
  return (
    <p className="font-fsSplitSans text-pretty text-customCongoBrown/60 text-sm md:text-base ">
      {content}
    </p>
  );
};

// Accordian data for the Oxygen Park section
const accordianData = [
  {
    value: "1",
    trigger: "Corner Plots - 10",
    content: AccordianItemContent(
      "Corner plots offer unique advantages such as enhanced cross ventilation, increased natural light, and dual access points. Their design flexibility allows for versatile architectural layouts and landscaping options. They also provide potential for higher property value due to their desirability and distinct features, making them sought-after choices for homeowners and developers alike."
    ),
  },
  {
    value: "2",
    trigger: "Signature Plots - 46",
    content: AccordianItemContent(
      "Introducing our exclusive Signature Plots, strategically positioned to offer prime vistas facing the park, proximity to the clubhouse, and easy access from the main road. Experience unparalleled luxury and convenience in these meticulously selected locations, where every plot is a testament to sophistication and prestige."
    ),
  },
  {
    value: "3",
    trigger: "Premium Plots - 43",
    content: AccordianItemContent(
      "Discover our premium plots, meticulously crafted with impeccable design and optimal shape. These plots boast superior aesthetics and functionality, offering discerning buyers the opportunity to build their dream home with ease and elegance. Experience the epitome of luxury living with our selection of premium plots, where quality meets perfection."
    ),
  },
  {
    value: "4",
    trigger: "Standard Plots - 7",
    content: AccordianItemContent(
      "Unlock your dream lifestyle with our standard plots, offering the perfect canvas to create your ideal home. Situated in prime locations, these plots provide the foundation for your vision, whether it's a cozy family retreat or a modern masterpiece. Embrace endless possibilities and start building your future today with our standard plots, where every square foot is filled with potential."
    ),
  },
];

export default function TypesOfPlotSection(): React.ReactElement {
  return (
    <section className="pb-8 lg:py-24 lg:pb-48 container mx-auto  ">
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 md:mx-4">
        <div className="relative w-full max-w-xl hidden lg:block ">
          {/* Top left image - meditation woman */}
          <div className="relative lg:w-64 lg:h-72 lg2:w-80 lg2:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/VaikuntamCityLandingPage/yogaPosture.jpg"
              alt="Woman meditating in peaceful morning light"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Bottom right image - man in chair */}
          <div className="absolute top-32 z-10 left-32 lg2:left-48 lg:w-64 lg:h-72 lg2:w-80 lg2:h-96  rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/VaikuntamCityLandingPage/relaxingPosture.jpg"
              alt="Person relaxing in modern chair by window"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="max-w-xl mt-8 lg:mt-0 mx-4 lg:mx-0">
          <h1 className="font-fsSiena  text-customBrown   lg:leading-none  max-w-4xl text-2xl md:text-3xl lg:text-5xl lg2:text-6xl md:max-w-2xl ">
            Choose the Plot That Suits You Best
          </h1>
          <Typography
            variant="custom"
            className="font-fsSplitSans uppercase text-customTextGray md:text-xl  text-sm  max-w-6xl  mt-2 lg:mt-4"
          >
            Types Of Plots
          </Typography>
          <div>
            <Accordion value={null}>
              {accordianData.map((item) => (
                <AccordionItem
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
