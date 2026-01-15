"use client";

import Button from "@/components/Common/Button";
import { GeneralFormValidationSchema } from "@/components/Common/Form/validations";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
const Loader = dynamic(() => import("@/components/loader"), { ssr: false });
import { useRouter, useSearchParams } from "next/navigation";

export default function EnquirySection(): React.ReactElement {
  const searchParams = useSearchParams();

  const [plots, setPlots] = useState<Array<string>>([]);
  const inputBaseClass =
    "w-full px-1 pb-[7px] text-[#04070799] bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:font-freightNeoMedium font-freightNeoMedium placeholder:text-[#04070799]";
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
    },
    validationSchema: GeneralFormValidationSchema,

    onSubmit: async (values, { resetForm }): Promise<void> => {
      setIsLoading(true);
      try {
        const payload = {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          interestedIn: plots,
          project: "Vaikuntam City",
          createdAt: serverTimestamp(),
        };

        const collectionRef = collection(db, "vaikuntamCityEnquiries");
        await addDoc(collectionRef, payload);

        // Accelr Webhook Integration
        const utmParams = {
          utm_source: searchParams.get("utm_source") || "direct",
          utm_medium: searchParams.get("utm_medium") || "",
          utm_campaign: searchParams.get("utm_campaign") || "",
          utm_term: searchParams.get("utm_term") || "",
          utm_content: searchParams.get("utm_content") || "",
        };

        try {
          await fetch("/api/accelr-webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payload,
              formName: "Vaikuntam City Let's Explore",
              source: "website",
              ...utmParams,
            }),
          });
        } catch (webhookError) {
          console.error("Accelr Webhook Error:", webhookError);
        }

        toast.success("Enquiry submitted successfully!");
        resetForm();
        setPlots([]);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const CheckBox = ({ label }: { label: string }) => (
    <label className="flex items-center mt-3 lg:mt-0 gap-3 cursor-pointer group w-fit">
      <div className="relative">
        <input
          aria-label="File input"
          type="checkbox"
          checked={plots.includes(label)} // Ensure controlled behavior
          onChange={() => {
            if (plots.includes(label)) {
              setPlots((prev) => prev.filter((plot) => plot !== label)); // Remove from plots
            } else {
              setPlots((prev) => [...prev, label]); // Add to plots
            }
          }} // Ensure the change is handled properly
          className="sr-only peer"
        />
        <div className="w-5 h-5 border border-[#A17F5F] rounded-full peer-checked:bg-[#A17F5F] transition-colors relative flex items-center justify-center">
          {plots.includes(label) && <FaCheck className="w-3 h-3 text-white" />}
        </div>
      </div>
      <span className="text-base text-gray-600 text-customTextGray font-freightNeoMedium">{label}</span>
    </label>
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <section className="pb-16 lg:pb-24 container mx-auto">
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-16 mx-4 ">
        <div className="w-full h-auto flex-1 px-2 lg:px-0 lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15549.710703905477!2d74.810124!3d13.008415000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35322066841c7%3A0x52de25504a2ed99b!2sVaikuntam%20City%20by%20Vitu%20Realty!5e0!3m2!1sen!2sus!4v1751897136859!5m2!1sen!2sus"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
          />
        </div>
        <div className="flex-1 mt-4 lg:mt-0">
          <h1 className="font-fsSiena  text-customBrown   lg:leading-none  max-w-4xl text-2xl md:text-3xl lg:text-5xl lg2:text-6xl md:max-w-2xl ">
            Let's Explore
            <br /> Vaikuntam City Today!
          </h1>
          <form className="mt-8 lg:mt-12">
            <div>
              <input aria-label="Name" type="text" placeholder="Your Full Name" {...formik.getFieldProps("fullName")} className={inputBaseClass} />
              {formik.touched.fullName && formik.errors.fullName && <p className="text-red-500 text-sm">{formik.errors.fullName}</p>}
            </div>

            <div className="mt-[45px]">
              <input aria-label="Email" type="email" placeholder="Your Email" {...formik.getFieldProps("email")} className={inputBaseClass} />
              {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
            </div>

            <div className="mt-[45px]">
              <input
                aria-label="Phone Number"
                type="number"
                placeholder="Your Phone Number"
                {...formik.getFieldProps("phone")}
                className="w-full px-1 pb-[7px] text-[#04070799] bg-transparent border-0 border-b border-black/[20%] focus:outline-none text-xl placeholder:font-freightNeoMedium font-CandideCondensedMedium placeholder:text-[#04070799] 
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
              />
              {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
            </div>
            <div className="flex lg:items-center flex-col lg:flex-row lg:justify-between gap-2  mt-[25px] lg:flex-wrap">
              <CheckBox label="Premium Plots" />
              <CheckBox label="Signature Plots" />
              <CheckBox label="Corner Plots" />
              <CheckBox label="Standard Plots" />
            </div>
            <div className="mt-8">
              {isLoading ? (
                <span className="lg:hidden block items-center justify-center">
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
                  className={`lg:hidden block text-[26px] w-full lg:w-[146px] ${
                    !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </Button>
              )}
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
                  className={`lg:block pb-[3px] hidden text-[26px] w-full lg:w-[146px] ${
                    !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
