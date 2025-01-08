import React, { useState } from 'react';
import Heading from '../Common/Heading';
import SubHeading from '../Common/SubHeding';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'What types of properties do you specialize in?',
      answer: "We specialize in a wide range of properties, from luxury homes to affordable apartments, ensuring there's something for everyone."
    },
    {
      question: 'Do you offer property management services?',
      answer: 'Yes, we offer comprehensive property management services including maintenance, tenant screening, and rent collection.'
    },
    {
      question: 'How do I schedule a property viewing?',
      answer: "You can schedule a viewing through our website, by calling our office, or by emailing us. We'll respond within 24 hours."
    },
    {
      question: 'Do you assist with paperwork and legal formalities?',
      answer: 'Yes, our team of experts will guide you through all necessary paperwork and legal procedures to ensure a smooth transaction.'
    }
  ];

  return (
   <section className='bg-blue-300 mt-[200px]'>
    <div className="flex  pt-[170px] px-[277px] xl:pt-[159px] xl:px-[277px] lg:pt-[155px] lg:px-[132px] sm:pt-[364px] sm:px-[27px]">
        {/* Left Section */}
        <div className="flex-1">
          <Heading>Frequently Asked<br/> Questions</Heading>
          <SubHeading >Got questions? We've got answers <br/> no jargon, just clarity.</SubHeading>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-[#E5DED5]">
              <button
                className="w-full py-6 flex justify-between items-center text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <SubHeading className="font-semibold font-freightNeoSemibold text-xl">{item.question}</SubHeading>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40 pb-6' : 'max-h-0'
                }`}
              >
                <SubHeading>{item.answer}</SubHeading>
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>
  );
};

export default FAQ;
