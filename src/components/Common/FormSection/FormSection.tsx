"use client";

// ============= Component Imports =============
import React, { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ============= Internal Imports =============
import Button from "@/components/Common/Button";
import { Dropdown, Upload } from "@/components/Icons/Icons";
import Typography from "@/components/Typography/Typography";

// Form Related Imports
import { useFormSubmission } from "../Form/useFormSubmission";
import { JOB_OPTIONS, PROJECT_ENQUIRIES, FORM_TYPES } from "../Form/constants";
import Loader from "@/components/LoaderComponent/LoaderComponent";
import Link from "next/link";

// ============= Types & Interfaces =============
interface FormSectionProps {
  heading: string;
  subheading: string;
  page: "General Enquire" | "Project Enquire" | "Career Application";
}

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
export default function FormSection({ heading, subheading, page }: FormSectionProps) {
  // ============= Refs =============
  const selectRef = useRef<HTMLSelectElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  // ============= Form Handling =============
  const handleSuccess = () => {
    console.log("Form submission complete! Performing additional actions...");
    // You can navigate to another page, show a modal, etc.
  };

  const { formik, isLoading } = useFormSubmission(page, handleSuccess);

  // Base input class with placeholder and value font
  const inputBaseClass =
    "w-full px-1 pb-[7px] text-[#04070799] bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:font-freightNeoMedium font-freightNeoMedium placeholder:text-[#04070799]";
  // Loading animation (you can style this further or use an SVG spinner)
 
  // Rest of your component (JSX) remains exactly the same
  return (
    <div className="flex flex-col sm:flex-row lg:flex-row pt-[4.125rem] px-6 md:px-8 sm:pt-[4.125rem] lg:pt-[9.938rem] xl:pt-[9.938rem] xl:px-[17.312rem] lg:px-[8.250rem] gap-[1.875rem] sm:gap-[2.813rem]">
      <ToastContainer />
      {/* Left Side Content */}
      <div className="flex-1">
        <Typography
          variant="h1"
          className="text-center md:text-left text-customBrown font-semibold leading-[1] w-full md:w-[24.313rem] xl:w-[34.875rem]"
        >
          {heading}
        </Typography>
        <Typography variant="body" className="text-center md:text-left pt-3 md:px-0 px-6 md:pt-12 lg:pt-10 xl:pt-8 w-full md:w-[24.5rem] ">
          {subheading}
        </Typography>
        <div className="hidden md:block">
          <hr className="w-full md:w-[392px] mt-[56px] lg:mt-[38px]  border-black border-opacity-20 text-customTextGray font-medium sm:text-[19px] text-[19px] md:text-xl  font-freightNeoMedium " />
          <Typography className="pt-8 text-customTextGray font-freightNeoMedium">Alternatively, for your queries contact</Typography>
          <Link href="tel:+91 89046 88886">
            <Typography variant="number">+91 89046 88886</Typography>
          </Link>
        </div>
      </div>
      {/* Right Side Form */}
      <div className="flex-1">
        <form>
          <div>
            <input type="text" placeholder="Your Full Name" {...formik.getFieldProps("fullName")} className={inputBaseClass} />
            {formik.touched.fullName && formik.errors.fullName && <p className="text-red-500 text-sm">{formik.errors.fullName}</p>}
          </div>

          <div className="mt-[45px]">
            <input type="email" placeholder="Your Email" {...formik.getFieldProps("email")} className={inputBaseClass} />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
          </div>

          <div className="mt-[45px]">
            <input
              type="number"
              placeholder="Your Phone Number"
              {...formik.getFieldProps("phone")}
              className="w-full px-1 pb-[7px] text-[#04070799] bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:font-freightNeoMedium font-CandideCondensedMedium placeholder:text-[#04070799] 
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
            />
            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
          </div>

          {page === "General Enquire" && (
            <div className="relative mt-[45px]">
              <textarea
                rows={3}
                placeholder="Your Comments"
                {...formik.getFieldProps("comments")}
                className={`${inputBaseClass} pr-12`}
                maxLength={250}
              />
              {formik.touched.comments && formik.errors.comments && <p className="text-red-500 text-sm">{formik.errors.comments}</p>}

              <span className="absolute right-1 top-1 text-xs text-customTextGray font-CandideCondensedMedium">
                {formik.values.comments.length}/250
              </span>
            </div>
          )}
          {page === "Project Enquire" && (
            <div className="relative mt-8 z-10 ">
              {/* Dropdown Button */}
              <div
                className=" text-customTextGray font-freightNeoMedium text-xl   py-3 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <span>{formik.values.option || "Interested In"}</span>
                <Dropdown />
              </div>
              <hr className="border-black border-opacity-20"/>
              {/* Dropdown Menu */}
              {open && (
                <div className="absolute w-full bg-[#F8F6F5] font-freightNeoMedium  rounded-md ">
                  {PROJECT_ENQUIRIES.map((option) => (
                    <div
                      key={option.value}
                      className="px-4 py-2 text-customTextGray text-xl hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        formik.setFieldValue("option", option.label);
                        setOpen(false);
                      }}
                    >
                      {option.label}

                    </div>
                    
                  ))}

                </div>
                
              )}
            </div>
          )}
          {page === FORM_TYPES.CAREER && (
            <>
                <div className="relative mt-8 z-10 ">
                {/* Dropdown Button */}
                <div
                  className=" text-customTextGray font-freightNeoMedium text-lg py-3 rounded-md flex justify-between items-center cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <span>{formik.values.option || "Position Being Applied For"}</span>
                  <Dropdown />
                </div>
                <hr className="border-black border-opacity-20" />

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute w-full bg-[#F8F6F5] rounded-md">
                  {JOB_OPTIONS.map((option) => (
                    <div
                    key={option.value}
                    className="px-4 py-2 text-customTextGray font-freightNeoMedium text-lg hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      formik.setFieldValue("option", option.label);
                      setOpen(false);
                    }}
                    >
                    {option.label}
                    </div>
                  ))}
                  </div>
                )}
                </div>
              <div className="mt-[45px] relative">
                <div className="w-full px-1 pb-2 text-customTextGray bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl font-freightNeoMedium">
                  <label htmlFor="resume-upload" className="flex items-center cursor-pointer text-customTextGray w-full justify-between">
                    {formik.values.resume ? <span>{formik.values.resume.name}</span> : <span>Upload Resume</span>}
                    <Upload />
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => {
                      formik.setFieldValue("resume", event.currentTarget.files?.[0] || null);
                    }}
                    className="sr-only"
                  />
                </div>
              </div>
            </>
          )}
          {page === "General Enquire" && (
            <div className="flex items-center flex-col lg:flex-row justify-between gap-2 pt-[45px] mb-[54px] md:mb-[145px]">
              {isLoading ? (
                <span className="lg:hidden block items-center justify-center">
                  <Loader />
                </span>
              ) : (
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (!formik.isValid || !formik.dirty) {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field as any, true);
                      });
                      return;
                    }
                    try {
                      formik.handleSubmit();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  disabled={isLoading || !formik.isValid || !formik.dirty}
                  className={`lg:hidden block text-[26px] w-full lg:w-[146px] ${
                    !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </Button>
              )}

              <label className="flex items-center mt-3 lg:mt-0 gap-3 cursor-pointer group w-fit">
                <div className="relative">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps("whatsapp")}
                    checked={formik.values.whatsapp} // Ensure controlled behavior
                    onChange={formik.handleChange} // Ensure the change is handled properly
                    className="sr-only peer"
                  />

                  <div className="w-5 h-5 border border-[#A17F5F] rounded-full peer-checked:bg-[#A17F5F] transition-colors relative flex items-center justify-center">
                    {formik.values.whatsapp && <FaCheck className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-base text-gray-600 text-customTextGray font-freightNeoMedium">Receive Updates on WhatsApp</span>
              </label>

              {isLoading ? (
                <span className="lg:block hidden items-center justify-center">
                  <Loader />
                </span>
              ) : (
                <Button
                  onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (!formik.isValid || !formik.dirty) {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field as any, true);
                      });
                      return;
                    }
                    // Start loading
                    try {
                      // setIsLoading(true);

                      await formik.handleSubmit();
                      // setIsLoading(false); // Stop loading after submission
                      // Ensure form submission is awaited
                    } finally {
                    }
                  }}
                  disabled={isLoading || !formik.isValid || !formik.dirty}
                  className={`lg:block hidden text-[26px] w-full lg:w-[146px] ${
                    !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </Button>
              )}
            </div>
          )}
          {page === "Project Enquire" && (
            <div className="flex items-center flex-col lg:flex-row justify-between gap-2 mb-[54px]  pt-[45px] md:mb-[145px]">
              {isLoading ? (
                <span className=" lg:hidden block  items-center justify-center">
                  <Loader />
                </span>
              ) : (
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (!formik.isValid || !formik.dirty) {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field as any, true);
                      });
                      return;
                    }
                    // setIsLoading(true); // Start loading
                    Promise.resolve(formik.handleSubmit()).finally(() =>
                      // setIsLoading(false)
                      console.log("2")
                    ); // Stop loading after submission
                  }}
                  disabled={isLoading || !formik.isValid || !formik.dirty}
                  className={`lg:hidden block text-[26px] pb-[0.5px] w-full lg:w-[146px] ${
                    !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </Button>
              )}

              <label className="flex items-center mt-3 lg:mt-0 gap-3 cursor-pointer group w-fit">
              <div className="relative">
                  <input
                    type="checkbox"
                    {...formik.getFieldProps("whatsapp")}
                    checked={formik.values.whatsapp} // Ensure controlled behavior
                    onChange={formik.handleChange} // Ensure the change is handled properly
                    className="sr-only peer"
                  />

                  <div className="w-5 h-5 border border-[#A17F5F] rounded-full peer-checked:bg-[#A17F5F] transition-colors relative flex items-center justify-center">
                    {formik.values.whatsapp && <FaCheck className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-base text-gray-600 text-customTextGray font-freightNeoMedium">Receive Updates on WhatsApp</span>
             </label>
              {isLoading ? (
                <span className="lg:block hidden items-center justify-center">
                  <Loader />
                </span>
              ) : (
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (!formik.isValid || !formik.dirty) {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field as any, true);
                      });
                      return;
                    }
                    // setIsLoading(true); // Start loading
                    Promise.resolve(formik.handleSubmit()).finally(() =>
                      // setIsLoading(false)
                      console.log("3")
                    ); // Stop loading after submission
                  }}
                  disabled={isLoading || !formik.isValid || !formik.dirty}
                  className={`lg:block pb-[3px] hidden text-[26px] w-full lg:w-[146px] ${
                    !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </Button>
              )}
            </div>
          )}
          {page === FORM_TYPES.CAREER && (
            <div className="flex items-center justify-end  flex-en gap-2 pt-[45px] md:mb-[145px]">
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader />
                </span>
              ) : (
                <Button
                  onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (!formik.isValid || !formik.dirty) {
                      Object.keys(formik.values).forEach((field) => {
                        formik.setFieldTouched(field as any, true);
                      });
                      return;
                    }

                    try {
                      // setIsLoading(true); // Start loading
                      formik.handleSubmit(); // Handle form submission
                    } catch (error) {
                      console.error("Form submission failed", error);
                    } finally {
                      // setIsLoading(false); // Stop loading after submission (whether success or failure)
                    }
                  }}
                  disabled={isLoading || !formik.isValid || !formik.dirty}
                  className={`text-[26px] pt-1 sm:w-full w-full md:w-[146px] ${
                    !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </Button>
              )}
            </div>
          )}
        </form>
        <div className="block md:hidden text-center mt-2 mb-[56px]">
          <hr className="w-full border-black border-opacity-20" />
          <Typography className="pt-8 text-customTextGray font-freightNeoMedium">Alternatively, for your queries contact</Typography>
          <span className="text-customTextGray font-CandideCondensedBold font-bold">+91 89046 88886</span>
        </div>
      </div>
    </div>
  );
}
