import React, { useState } from "react";
import Heading from "../Common/Heading";
import SubHeading from "../Common/SubHeding";
import { RiArrowUpSLine } from "react-icons/ri";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What types of properties do you specialize in?",
      answer:
        "We specialize in a wide range of properties, from luxury homes to affordable apartments, ensuring there's something for everyone.",
    },
    {
      question: "Do you offer property management services?",
      answer:
        "Yes, we offer comprehensive property management services including maintenance, tenant screening, and rent collection.",
    },
    {
      question: "How do I schedule a property viewing?",
      answer:
        "You can schedule a viewing through our website, by calling our office, or by emailing us. We'll respond within 24 hours.",
    },
    {
      question: "Do you assist with paperwork and legal formalities?",
      answer:
        "Yes, our team of experts will guide you through all necessary paperwork and legal procedures to ensure a smooth transaction.",
    },
  ];

  return (
    <section className="bg-white mt-[200px]">
       <div className="flex flex-col lg:flex-row pt-[66px] px-[27px] md:pt-[66px] lg:pt-[155px] xl:pt-[159px] xl:px-[277px] lg:px-[132px] gap-[30px] md:gap-[45px]">
        {/* Left Section */}
        <div className="flex-1">
        <Heading className="text-center lg:text-left">
            Frequently Asked
            <br /> Questions
          </Heading>
          <SubHeading className="sm:pt-[13px]  lg:pt-[24px] xl:pt-[40px] text-center lg:text-left">
            Got questions? We've got answers <br /> no jargon, just clarity.
          </SubHeading>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-black border-opacity-20 mb-[21px]"
            >
              <button
                className={`w-full flex justify-between items-center text-left transition-all ${
                  openIndex === index ? "pb-[12px]" : "pb-[21px]"
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <SubHeading className="font-semibold font-freightNeoSemibold text-xl">
                  {item.question}
                </SubHeading>
                <div>
                  <RiArrowUpSLine
                    style={{
                      transform:
                        openIndex === index ? "rotate(0deg)" : "rotate(180deg)",
                      transition: "transform 0.3s ease",
                      width: "30px",
                      height: "30px",
                    }}
                    color="#4F3737"
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 pb-[21px]" : "max-h-0"
                }`}
              >
                <SubHeading>{item.answer}</SubHeading>
              </div>
            </div>
          ))}

          {/* Read More Section */}
          <div className="flex justify-end mt-[46px] mr-[19px] mb-[162px]">
            <button
              className="font-freightNeoSemibold text-xl text-customTextGray"
              onClick={() => alert("Navigating to more FAQs or another page")}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
