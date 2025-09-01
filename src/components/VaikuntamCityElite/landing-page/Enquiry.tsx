"use client";

import Button from "@/components/Common/Button";
import { landingPageFormValidationSchema } from "@/components/Common/Form/validations";
import { UnderlineSelect } from "@/components/Common/UnderlineText";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import AnimatedHeading from "./AnimatedHeading";
import { handleFormSubmitVCE } from "@/lib/functionHelpers";
import { useRouter } from "next/navigation";

interface EnquiryProps {
  userType: "Home Buyer" | "Investor" | ""; // or make it optional if needed
}
export default function Enquiry({ userType }: EnquiryProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputBaseClass =
    "w-full px-1 pb-[7px] text-[#F3EAE1] bg-transparent border-0 border-b border-[#F3EAE1] focus:outline-none text-xl placeholder:font-FreightNeoProNormal font-FreightNeoProNormal placeholder:text-[#F3EAE1]";
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      prefferedPlotOrientation: "",
    },
    validationSchema: landingPageFormValidationSchema,

    onSubmit: async (values, { resetForm }): Promise<void> => {
      // Handle form submission logic here
      let payload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        whatsapp: false,
        option: values.prefferedPlotOrientation,
        userType: userType || "", // Use the userType prop or an empty string if not provided
      };
      setIsLoading(true);
      handleFormSubmitVCE(payload)
        .then(() => {
          formik.setFieldValue("prefferedPlotOrientation", "");
          resetForm();
          if (userType === "Investor") {
            router.push("/vaikuntam-city-elite/landing-page-1/thank-you");
          } else {
            router.push("/vaikuntam-city-elite/landing-page-2/thank-you");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const plotOptions = [
    { value: "Signature Plots", label: "Signature Plots" },
    { value: "Sunrise Plots", label: "Sunrise Plots" },
    { value: "Sunset Plots", label: "Sunset Plots" },
  ];
  return (
    <section id="enquiry" className="bg-[#1C1213] relative z-50 ">
      <div className="py-20 pb-28 lg:py-28 container mx-auto lg:border-l lg:border-r border-[#C7784D]">
        <div className="px-4 lg:px-12">
          <AnimatedHeading className="text-[#E0D9C7] text-pretty text-center font-FreightNeoProNormal mt-1 text-[32px] lg:text-[42px] leading-[100%] lg2:text-5xl max-w-lg mx-auto">
            Step Into Elite Living Today
          </AnimatedHeading>
        </div>
        <div className="px-12 lg:px-12 mt-8 lg:mt-20">
          <form className="mt-8 lg:mt-12 space-y-6 lg:space-y-0 lg:grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <input
                aria-label="Name"
                type="text"
                placeholder="Full Name"
                {...formik.getFieldProps("fullName")}
                className={inputBaseClass}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
              )}
            </div>

            <div className="">
              <input
                aria-label="Email"
                type="email"
                placeholder="Email Address"
                {...formik.getFieldProps("email")}
                className={inputBaseClass}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            <div className="">
              <input
                aria-label="Phone Number"
                type="number"
                placeholder="Phone Number"
                {...formik.getFieldProps("phone")}
                className={inputBaseClass}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>
            <UnderlineSelect
              options={plotOptions}
              value={formik.values.prefferedPlotOrientation}
              onChange={(value) =>
                formik.setFieldValue("prefferedPlotOrientation", value)
              }
              placeholder="Preferred Plot Orientation"
            />

            <div className="mt-8 mx-auto col-span-2">
              <button
                type="submit"
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
                className={`text-xl font-FreightNeoProNormal uppercase bg-transparent min-w-36 border flex items-center justify-center gap-2 px-6 mx-auto py-2 border-[#F3EAE1] text-[#F3EAE1] ${
                  !formik.isValid || !formik.dirty
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? (
                  <div className="loader" />
                ) : (
                  <>
                    Submit <BsArrowRight />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
