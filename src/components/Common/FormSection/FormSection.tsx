"use client";

// ============= Component Imports =============
import React, { useRef } from "react";
import { FaCheck } from "react-icons/fa";

// ============= Internal Imports =============
import Button from "@/components/Common/Button";
import { Dropdown, Upload } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";

// Form Related Imports
import { useFormSubmission } from "../Form/useFormSubmission";
import { JOB_OPTIONS } from "../Form/constants";

// ============= Types & Interfaces =============
interface FormSectionProps {
  heading: string;
  subheading: string;
  page: "General Enquire" | "Project Enquire" | "Career Application";
}

// Update FORM_TYPES in constants.ts to match:
export const FORM_TYPES = {
  GENERAL: "General Enquire",
  PROJECT: "Project Enquire",
  CAREER: "Career Application",
} as const;

/**
 * Form Section Component
 * Handles different types of inquiry forms (General, Project, Career)
 *
 * Features:
 * 1. Form validation with Formik
 * 2. File upload for resumes
 * 3. WhatsApp updates opt-in
 * 4. Firebase integration
 */
export default function FormSection({
  heading,
  subheading,
  page,
}: FormSectionProps) {
  // ============= Refs =============
  const selectRef = useRef<HTMLSelectElement>(null);

  // ============= Form Handling =============
  const formik = useFormSubmission(page);

  // ============= Helper Functions =============
  const handleIconClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click(); // Simulates a user click
    }
  };

  // Base input class with placeholder and value font
  const inputBaseClass =
    "w-full px-1 pb-[7px] text-[#04070799] bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:font-freightNeoMedium font-freightNeoMedium placeholder:text-[#04070799]";

  // Rest of your component (JSX) remains exactly the same
  return (
    <div className="flex flex-col sm:flex-row lg:flex-row pt-[4.125rem] px-6 md:px-8 sm:pt-[4.125rem] lg:pt-[9.938rem] xl:pt-[9.938rem] xl:px-[17.312rem] lg:px-[8.250rem] gap-[1.875rem] sm:gap-[2.813rem]">
      {/* Left Side Content */}
      <div className="flex-1">
        <Typography
          variant="h1"
          className="text-center md:text-left text-customBrown font-semibold leading-[1] w-full md:w-[24.313rem] xl:w-[34.875rem]"
        >
          {heading}
        </Typography>
        <Typography
          variant="body"
          className="text-center md:text-left pt-3 md:px-0 px-6 md:pt-12 lg:pt-10 xl:pt-8 w-full md:w-[24.5rem] "
        >
          {subheading}
        </Typography>
        <div className="hidden md:block">
          <hr className="w-full md:w-[392px] mt-[56px] lg:mt-[38px]  border-black border-opacity-20 text-customTextGray font-medium sm:text-[19px] text-[19px] md:text-xl  font-freightNeoMedium " />
          <Typography className="pt-8 text-customTextGray font-freightNeoMedium">
            Alternatively, for your queries contact
          </Typography>
          <Typography variant="number">+91 89046 88886</Typography>
        </div>
      </div>
      {/* Right Side Form */}
      <div className="flex-1">
        <form>
          <div>
            <input
              type="text"
              placeholder="Your Full Name"
              {...formik.getFieldProps("fullName")}
              className={inputBaseClass}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>

          <div className="mt-[45px]">
            <input
              type="email"
              placeholder="Your Email"
              {...formik.getFieldProps("email")}
              className={inputBaseClass}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div className="mt-[45px]">
            <input
              type="text"
              placeholder="Your Phone Number"
              {...formik.getFieldProps("phone")}
              className={
                "w-full px-1 pb-[7px] text-[#04070799] bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:font-freightNeoMedium font-CandideCondensedMedium placeholder:text-[#04070799]"
              }
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>
          {page === "General Enquire" && (
            <div className="relative mt-[45px]">
              <textarea
                rows={3}
                placeholder="Your Comments"
                {...formik.getFieldProps("comments")}
                className={inputBaseClass}
              />
              {formik.touched.comments && formik.errors.comments && (
                <p className="text-red-500 text-sm">{formik.errors.comments}</p>
              )}

              <span className="absolute right-1 top-1 text-xs text-customTextGray font-CandideCondensedMedium">
                {formik.values.comments.length}/250
              </span>
            </div>
          )}
          {page === "Project Enquire" && (
            <div className="mt-[45px] relative">
              {/* Select Box */}
              <select
                ref={selectRef}
                {...formik.getFieldProps("option")}
                className={`${inputBaseClass} pb-2 pr-10 appearance-none w-full border rounded-md`}
              >
                <option value="" disabled>
                  Interested In
                </option>
                {JOB_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Dropdown Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <Dropdown />
              </div>
            </div>
          )}
          {page === FORM_TYPES.CAREER && (
            <>
              <div className="mt-[45px] relative">
                <select
                  ref={selectRef}
                  {...formik.getFieldProps("option")}
                  className="w-full px-1 pb-2 text-customTextGray placeholder:text-customPlaceHolderGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium pr-8 appearance-none"
                >
                  <option value="" disabled>
                    Position Being Applied For
                  </option>
                  {JOB_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-customTextGray cursor-pointer"
                  onClick={handleIconClick}
                >
                  <Dropdown />
                </div>
              </div>
              <div className="mt-[45px] relative">
                <div className="w-full px-1 pb-2 text-customTextGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium">
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center cursor-pointer text-customTextGray w-full justify-between"
                  >
                    {formik.values.resume ? (
                      <span>{formik.values.resume.name}</span>
                    ) : (
                      <span>Upload Resume</span>
                    )}
                    <Upload />
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "resume",
                        event.currentTarget.files?.[0] || null
                      );
                    }}
                    className="sr-only"
                  />
                </div>
              </div>
            </>
          )}
          {page === "General Enquire" && (
            <div className="flex items-center flex-col lg:flex-row justify-between gap-2 pt-[45px] mb-[54px] md:mb-[145px]">
              <Button
                onClick={() => formik.handleSubmit()}
                className="lg:hidden block text-[26px] w-full lg:w-[146px] pt-1"
              >
                Submit
              </Button>
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <div className="relative">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps("whatsapp")}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border border-[#A17F5F] rounded-full peer-checked:bg-[#A17F5F] transition-colors">
                    {formik.values.whatsapp && (
                      <FaCheck className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
                <span className="text-base text-gray-600 text-customTextGray font-freightNeoMedium">
                  Receive Updates on WhatsApp
                </span>
              </label>
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  if (!formik.isValid || !formik.dirty) {
                    Object.keys(formik.values).forEach((field) => {
                      formik.setFieldTouched(field as any, true);
                    });
                    return;
                  }
                  formik.handleSubmit();
                }}
                className="lg:block hidden text-[26px] w-full lg:w-[146px] pt-1"
              >
                Submit
              </Button>
            </div>
          )}
          {page === "Project Enquire" && (
            <div className="flex items-center flex-col lg:flex-row justify-between gap-2 mb-[54px]  pt-[45px] md:mb-[145px]">
              <Button
                onClick={() => formik.handleSubmit()}
                className="lg:hidden block text-[26px] w-full lg:w-[146px] pt-1"
              >
                Submit
              </Button>
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <div className="relative">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps("whatsapp")}
                    className="sr-only peer"
                  />

                  <div className="w-5 h-5 border border-[#A17F5F] rounded-full peer-checked:bg-[#A17F5F] transition-colors">
                    {formik.values.whatsapp && (
                      <FaCheck className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>
                <span className="text-base text-gray-600 text-customTextGray font-freightNeoMedium">
                  Receive Updates on WhatsApp
                </span>
              </label>
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  if (!formik.isValid || !formik.dirty) {
                    Object.keys(formik.values).forEach((field) => {
                      formik.setFieldTouched(field as any, true);
                    });
                    return;
                  }
                  formik.handleSubmit();
                }}
                className="lg:block hidden text-[26px] w-full lg:w-[146px] pt-1"
              >
                Submit
              </Button>
            </div>
          )}
          {page === FORM_TYPES.CAREER && (
            <div className="flex items-center justify-end  flex-en gap-2 pt-[45px] md:mb-[145px]">
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  if (!formik.isValid || !formik.dirty) {
                    Object.keys(formik.values).forEach((field) => {
                      formik.setFieldTouched(field as any, true);
                    });
                    return;
                  }
                  formik.handleSubmit();
                }}
                className="text-[26px] pt-1 sm:w-full w-full md:w-[146px]"
              >
                Submit
              </Button>
            </div>
          )}
        </form>
        <div className="block md:hidden text-center mt-2 mb-[56px]">
          <hr className="w-full border-black border-opacity-20" />
          <Typography className="pt-8 text-customTextGray font-freightNeoMedium">
            Alternatively, for your queries contact
          </Typography>
          <span className="text-customTextGray font-CandideCondensedBold font-bold">
            +91 89046 88886
          </span>
        </div>
      </div>
    </div>
  );
}
