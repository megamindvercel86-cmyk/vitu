import React, { useState } from "react";
import Heading from "../Common/Heading";
import SubHeading from "../Common/SubHeding";
import { FaCheck } from "react-icons/fa";
import Button from "../Common/Button";

interface FormSectionProps {
  heading: React.ReactNode;
  subheading: React.ReactNode;
  page: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  heading,
  subheading,
  page,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    comments: "",
    whatsapp: false,
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex  pt-[159px] px-[277px] xl:pt-[159px] xl:px-[277px] lg:pt-[155px] lg:px-[132px] sm:pt-[364px] sm:px-[27px]">
      {/* Left Side Content */}
      <div className="flex-1 p-4">
        <Heading>{heading}</Heading>
        <SubHeading className="pt-10">{subheading}</SubHeading>
        <hr className="w-full md:w-[392px] mt-[38px]  border-black border-opacity-20" />
        <SubHeading className="pt-8">
          Alternatively, for your queries contact
        </SubHeading>
        <span className="text-customTextGray  font-CandideCondensedBold font-bold">
          +91 89046 88886
        </span>
      </div>
      {/* Right Side Form */}
      <div className="flex-1">
        <form>
          <div>
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full px-1 pb-[7px] text-customTextGray placeholder:text-customPlaceHolderGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium"
            />
          </div>

          <div className="mt-[45px]">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-1 pb-[7px] text-customTextGray placeholder:text-customPlaceHolderGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium "
            />
          </div>

          <div className="mt-[45px]">
            <input
              type="tel"
              placeholder="Your Phone Number"
              className="w-full px-1 pb-2 text-customTextGray placeholder:text-customPlaceHolderGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium"
            />
          </div>

          <div className="mt-[45px]">
            <div className="pl-1 flex justify-between items-center mb-1">
              <span className="text-xl text-customTextGray font-freightNeoMedium">
                Your Comments
              </span>
              <span className="text-xs text-customTextGray font-CandideCondensedMedium">
                {formData.comments.length}/250
              </span>
            </div>
            <textarea
              value={formData.comments}
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
              maxLength={250}
              rows={4}
              className="w-full px-1 pb-2 text-customTextGray placeholder:text-customPlaceHolderGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium"
            />
          </div>
          <div className="flex items-center justify-between gap-2 pt-[45px]">
            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border border-[#A17F5F] rounded-full peer-checked:bg-[#A17F5F] transition-colors">
                  {formData.whatsapp && (
                    <FaCheck className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <span className="text-bae text-gray-600 text-customTextGray font-freightNeoMedium">
                Receive Updates on WhatsApp
              </span>
            </label>

            <Button onClick={handleSubmit} className="text-[26px] pt-1">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
