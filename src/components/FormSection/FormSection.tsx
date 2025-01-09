import React, { useRef, useState } from "react";
import Heading from "../Common/Heading";
import SubHeading from "../Common/SubHeding";
import { FaCheck } from "react-icons/fa";
import Button from "../Common/Button";

import { Dropdown, Upload } from "../Icons/Icons";

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
    option: "",
    resume: null,
  });
  const options = [
    { value: "", label: "Interested In", isDisabled: true },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Other", label: "Other" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, option: e.target.value });
  };

  const selectRef = useRef<HTMLSelectElement | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, resume: file });
  };
  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.focus(); // Trigger focus to open the dropdown
    }
  };
  return (
    <div className="flex pt-[159px] px-[277px]">
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
          {page === "General Enquire" && (
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
          )}
          {page === "Project Enquire" && (
            <div className="mt-[45px] relative">
              <select
                ref={selectRef} // Attach ref to select element
                value={formData.option}
                onChange={handleChange}
                className="w-full px-1 pb-2 text-customTextGray placeholder:text-customPlaceHolderGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium pr-8 appearance-none"
              >
                <option value="" disabled>
                  Interested In
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-customTextGray cursor-pointer"
                onClick={handleIconClick} // Trigger dropdown when icon is clicked
              >
                {/* Assuming Dropdown is an imported SVG or React Component */}
                <Dropdown />
              </div>
            </div>
          )}
          {page === "Career Application" && (
            <>
              <div className="mt-[45px] relative">
                <select
                  ref={selectRef} // Attach ref to select element
                  value={formData.option}
                  onChange={handleChange}
                  className="w-full px-1 pb-2 text-customTextGray placeholder:text-customPlaceHolderGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium pr-8 appearance-none"
                >
                  <option value="" disabled>
                    Interested In
                  </option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-customTextGray cursor-pointer"
                  onClick={handleIconClick} // Trigger dropdown when icon is clicked
                >
                  {/* Assuming Dropdown is an imported SVG or React Component */}
                  <Dropdown />
                </div>
              </div>
              <div className="mt-[45px] relative">
                {/* Resume Upload Section */}
                <div className="w-full px-1 pb-2 text-customTextGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium">
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center cursor-pointer text-customTextGray w-full justify-between" // Adjusted for flex layout with justify-between
                  >
                    {formData.resume ? (
                      <span>{formData.resume.name}</span> // Show the file name if selected
                    ) : (
                      <span>Upload Resume</span>
                    )}
                    <Upload/>{" "}
                    {/* Custom Upload Icon on the right */}
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="sr-only" // Hide the default file input
                  />
                </div>
              </div>
            </>
          )}
          {page === "General Enquire" && (
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
          )}
          {page === "Project Enquire" && (
            <div className="flex items-center justify-between gap-2 pt-[45px] mb-[145px]">
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
          )}
          {page === "Career Application" && (
            <div className="flex items-center justify-end  flex-en gap-2 pt-[45px] mb-[145px]">
              <Button onClick={handleSubmit} className="text-[26px] pt-1">
                Submit
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormSection;
